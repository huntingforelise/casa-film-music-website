'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Turnstile } from 'react-turnstile';
import { BookingBundleSuggestion, BookingEnquiryPayload } from '@/types/booking';
import type { BookingForm } from '@/types/booking';
import {
  getDefaultValues,
  withBookingCopyDefaults,
  withBookingDefaults,
} from '@/lib/booking/defaults';
import { getBundleSuggestions } from '@/lib/booking/bundles';
import { BookingFormValues, SetField, Status } from '@/lib/booking/types';
import { getBookingEstimate, isValidEmail } from '@/lib/booking/helpers';
import { TOTAL_STEPS } from '@/lib/booking/constants';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile/client';
import { canTrackGoogleAnalytics, trackAnalyticsEvent } from '@/lib/analytics';
import {
  EventDetailsStep,
  ServicesStep,
  BundleSelectionStep,
  AddOnsStep,
  SummaryStep,
} from './BookingSteps';
import SectionHeader from './sections/SectionHeader';
import SectionShell from './sections/SectionShell';

interface Props {
  settings?: BookingForm | null;
}

const BookingForm = ({ settings }: Props) => {
  const config = useMemo(() => withBookingDefaults(settings), [settings]);
  const [step, setStep] = useState(1);
  const [submittedAt, setSubmittedAt] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileWidgetKey, setTurnstileWidgetKey] = useState(0);
  const defaultValues = useMemo(() => getDefaultValues(config), [config]);
  const [overrides, setOverrides] = useState<Partial<BookingFormValues>>({});
  const values = useMemo(() => ({ ...defaultValues, ...overrides }), [defaultValues, overrides]);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const copy = useMemo(() => withBookingCopyDefaults(settings?.copy), [settings]);
  const eyebrowLabel = config.eyebrow?.trim();
  const stepLabel = `Step ${step} of ${TOTAL_STEPS}`;
  const isTurnstileEnabled = Boolean(TURNSTILE_SITE_KEY);
  const hasSubmittedRef = useRef(false);
  const hasProgressedRef = useRef(false);
  const hasTrackedAbandonmentRef = useRef(false);
  const lastTrackedStepRef = useRef<number | null>(null);
  const latestAnalyticsSnapshotRef = useRef({
    step,
    servicesCount: values.services.length,
    addOnsCount: values.addOns.length,
    bundleSelected: Boolean(values.bundleCode),
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => setSubmittedAt(Date.now()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    latestAnalyticsSnapshotRef.current = {
      step,
      servicesCount: values.services.length,
      addOnsCount: values.addOns.length,
      bundleSelected: Boolean(values.bundleCode),
    };
  }, [step, values.services.length, values.addOns.length, values.bundleCode]);

  useEffect(() => {
    if (!canTrackGoogleAnalytics() || hasSubmittedRef.current) return;

    const snapshot = latestAnalyticsSnapshotRef.current;

    if (lastTrackedStepRef.current === snapshot.step) return;

    lastTrackedStepRef.current = snapshot.step;
    trackAnalyticsEvent('booking_form_step_view', {
      form_name: 'booking',
      step: snapshot.step,
      total_steps: TOTAL_STEPS,
      services_selected_count: snapshot.servicesCount,
      add_ons_selected_count: snapshot.addOnsCount,
      bundle_selected: snapshot.bundleSelected,
    });
  }, [
    step,
    values.services.length,
    values.addOns.length,
    values.bundleCode,
  ]);

  useEffect(() => {
    const trackAbandonment = () => {
      if (
        !canTrackGoogleAnalytics() ||
        hasSubmittedRef.current ||
        !hasProgressedRef.current ||
        hasTrackedAbandonmentRef.current
      ) {
        return;
      }

      hasTrackedAbandonmentRef.current = true;
      const snapshot = latestAnalyticsSnapshotRef.current;

      trackAnalyticsEvent(
        'booking_form_abandon',
        {
          form_name: 'booking',
          last_step: snapshot.step,
          total_steps: TOTAL_STEPS,
          services_selected_count: snapshot.servicesCount,
          add_ons_selected_count: snapshot.addOnsCount,
          bundle_selected: snapshot.bundleSelected,
        },
        {
          transportType: 'beacon',
        },
      );
    };

    const handlePageHide = () => {
      trackAbandonment();
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      trackAbandonment();
    };
  }, []);

  const bundleSuggestions = useMemo(
    () => getBundleSuggestions(config, values.services),
    [config, values.services],
  );

  const activeBundle = useMemo(
    () => config.bundles.find((bundle) => bundle.code === values.bundleCode),
    [config.bundles, values.bundleCode],
  );

  const estimate = useMemo(
    () => getBookingEstimate(config, values.services, values.addOns, activeBundle),
    [activeBundle, config, values.addOns, values.services],
  );

  const bundleIsStillValid = (serviceList: string[], bundleCode?: string) => {
    if (!bundleCode) return '';
    const bundle = config.bundles.find((item) => item.code === bundleCode);
    if (!bundle) return '';
    const eligible = bundle.includedServices.every((service) => serviceList.includes(service));
    return eligible ? bundleCode : '';
  };

  const availableAddOns = useMemo(
    () =>
      config.addOns.filter(
        (addOn) =>
          !addOn.applicableServices?.length ||
          addOn.applicableServices.some((service) => values.services.includes(service)),
      ),
    [config.addOns, values.services],
  );

  const servicesByValue = useMemo(
    () => new Map(config.services.map((service) => [service.value, service.title])),
    [config.services],
  );

  const addOnsByCode = useMemo(
    () => new Map(config.addOns.map((addOn) => [addOn.code, addOn.title])),
    [config.addOns],
  );

  const selectedServiceTitles = useMemo(
    () => values.services.map((service) => servicesByValue.get(service) ?? service),
    [servicesByValue, values.services],
  );

  const selectedAddOnTitles = useMemo(
    () => values.addOns.map((addOn) => addOnsByCode.get(addOn) ?? addOn),
    [addOnsByCode, values.addOns],
  );

  const selectedEventType = useMemo(
    () => config.eventTypes.find((eventType) => eventType.value === values.eventType),
    [config.eventTypes, values.eventType],
  );

  const selectedEventTypeTitle = selectedEventType?.title ?? values.eventType;

  const selectedTravelBandTitle = useMemo(
    () =>
      config.travelRegions.find((band) => band.value === values.travelRegion)?.title ??
      values.travelRegion,
    [config.travelRegions, values.travelRegion],
  );

  const setField: SetField = (field, value) => {
    hasProgressedRef.current = true;
    setOverrides((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    hasProgressedRef.current = true;
    const exists = values.services.includes(service);
    const services = exists
      ? values.services.filter((value) => value !== service)
      : [...values.services, service];
    setOverrides((prev) => ({
      ...prev,
      services,
      bundleCode: bundleIsStillValid(services, prev.bundleCode),
    }));
  };

  const toggleAddOn = (addOn: string) => {
    hasProgressedRef.current = true;
    const exists = values.addOns.includes(addOn);
    const addOns = exists
      ? values.addOns.filter((value) => value !== addOn)
      : [...values.addOns, addOn];
    setOverrides((prev) => ({ ...prev, addOns }));
  };

  const applyBundle = (suggestion: BookingBundleSuggestion) => {
    hasProgressedRef.current = true;
    const isSameBundle = values.bundleCode === suggestion.bundle.code;
    if (isSameBundle) {
      setField('bundleCode', '');
      return;
    }

    const mergedServices = Array.from(new Set([...values.services, ...suggestion.missingServices]));
    setOverrides((prev) => ({
      ...prev,
      services: mergedServices,
      bundleCode: suggestion.bundle.code,
    }));
  };

  const stepIsValid = useMemo(() => {
    if (step === 1) return values.services.length > 0;
    if (step === 2 || step === 3) return true;
    if (step === 4) {
      return (
        values.eventType.trim() !== '' &&
        values.eventDate.trim() !== '' &&
        values.guestCount > 0 &&
        values.travelRegion.trim() !== ''
      );
    }
    return values.name.trim() !== '' && isValidEmail(values.email) && values.phone.trim() !== '';
  }, [step, values]);

  const goNext = () => {
    if (!stepIsValid || step >= TOTAL_STEPS) return;
    hasProgressedRef.current = true;
    trackAnalyticsEvent('booking_form_step_continue', {
      form_name: 'booking',
      from_step: step,
      to_step: step + 1,
      total_steps: TOTAL_STEPS,
      services_selected_count: values.services.length,
      add_ons_selected_count: values.addOns.length,
      bundle_selected: Boolean(values.bundleCode),
    });
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 1 || status === 'submitting') return;

    hasProgressedRef.current = true;
    trackAnalyticsEvent('booking_form_step_back', {
      form_name: 'booking',
      from_step: step,
      to_step: Math.max(1, step - 1),
      total_steps: TOTAL_STEPS,
      services_selected_count: values.services.length,
      add_ons_selected_count: values.addOns.length,
      bundle_selected: Boolean(values.bundleCode),
    });

    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== TOTAL_STEPS || !stepIsValid || status === 'submitting' || !submittedAt) return;

    hasProgressedRef.current = true;
    setStatus('submitting');
    setFeedback('');
    trackAnalyticsEvent('booking_form_submit_attempt', {
      form_name: 'booking',
      step,
      total_steps: TOTAL_STEPS,
      services_selected_count: values.services.length,
      add_ons_selected_count: values.addOns.length,
      bundle_selected: Boolean(values.bundleCode),
    });

    const payload: BookingEnquiryPayload = {
      eventType: values.eventType,
      eventDate: values.eventDate,
      guestCount: values.guestCount,
      venue: values.venue.trim() || undefined,
      travelRegion: values.travelRegion,
      services: values.services,
      bundleCode: values.bundleCode || undefined,
      addOns: values.addOns,
      notes: values.notes.trim(),
      estimateTotal: estimate.total,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      website: values.website.trim(),
      submittedAt,
      turnstileToken,
    };

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        persisted?: boolean;
      };
      if (!response.ok || !result.ok) {
        trackAnalyticsEvent('booking_form_submit_error', {
          form_name: 'booking',
          error_source: 'api',
          status_code: response.status,
          step,
          total_steps: TOTAL_STEPS,
          services_selected_count: values.services.length,
          add_ons_selected_count: values.addOns.length,
          bundle_selected: Boolean(values.bundleCode),
        });
        setStatus('error');
        setFeedback(result.error ?? copy.feedbackGenericErrorText ?? '');
        return;
      }

      hasSubmittedRef.current = true;
      trackAnalyticsEvent('booking_form_submit_success', {
        form_name: 'booking',
        persisted: result.persisted !== false,
        step,
        total_steps: TOTAL_STEPS,
        services_selected_count: values.services.length,
        add_ons_selected_count: values.addOns.length,
        bundle_selected: Boolean(values.bundleCode),
      });

      setStatus('success');
      const successMessage =
        result.persisted === false
          ? (copy.feedbackNotPersistedText ?? '')
          : (copy.feedbackPersistedText ?? '');
      setFeedback(successMessage);
      setOverrides({});
      setStep(1);
      setTurnstileToken('');
      setSubmittedAt(Date.now());
    } catch {
      trackAnalyticsEvent('booking_form_submit_error', {
        form_name: 'booking',
        error_source: 'network',
        step,
        total_steps: TOTAL_STEPS,
        services_selected_count: values.services.length,
        add_ons_selected_count: values.addOns.length,
        bundle_selected: Boolean(values.bundleCode),
      });
      setStatus('error');
      setFeedback(copy.feedbackNetworkErrorText ?? '');
    } finally {
      setTurnstileToken('');
      if (isTurnstileEnabled) {
        setTurnstileWidgetKey((value) => value + 1);
      }
    }
  };

  return (
    <SectionShell>
      <div className="surface-card surface-radius p-5 sm:p-6 md:p-8">
        <header className="pb-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-8">
            <SectionHeader
              compact
              eyebrow={eyebrowLabel}
              title={config.title}
              intro={config.intro}
            />

            <div className="flex flex-col gap-3 lg:items-end lg:text-right">
              <p className="text-fluid-body-sm tracking-tight text-muted uppercase">
                {stepLabel}
              </p>
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6"
          noValidate
          aria-busy={status === 'submitting'}
        >
          {step === 1 && (
            <ServicesStep
              services={config.services}
              selectedServices={values.services}
              toggleService={toggleService}
              copy={copy}
            />
          )}

          {step === 2 && (
            <BundleSelectionStep
              bundleSuggestions={bundleSuggestions}
              selectedBundleCode={values.bundleCode}
              applyBundle={applyBundle}
              servicesByValue={servicesByValue}
              copy={copy}
            />
          )}

          {step === 3 && (
            <AddOnsStep
              availableAddOns={availableAddOns}
              selectedAddOns={values.addOns}
              toggleAddOn={toggleAddOn}
              copy={copy}
            />
          )}

          {step === 4 && (
            <EventDetailsStep
              eventTypes={config.eventTypes}
              travelRegions={config.travelRegions}
              values={values}
              setField={setField}
              copy={copy}
            />
          )}

          {step === 5 && (
            <SummaryStep
              config={config}
              values={values}
              selectedEventTypeTitle={selectedEventTypeTitle}
              selectedTravelBandTitle={selectedTravelBandTitle}
              selectedServiceTitles={selectedServiceTitles}
              selectedAddOnTitles={selectedAddOnTitles}
              activeBundle={activeBundle}
              estimate={estimate}
              setField={setField}
              copy={copy}
            />
          )}

          {step === 5 && isTurnstileEnabled && (
            <div className="pt-2">
              <Turnstile
                key={turnstileWidgetKey}
                sitekey={TURNSTILE_SITE_KEY}
                responseField={false}
                fixedSize
                refreshExpired="auto"
                theme="light"
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken('')}
                onError={() => setTurnstileToken('')}
              />
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={goBack}
                disabled={step === 1 || status === 'submitting'}
              >
                {copy.buttonBackText ?? ''}
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={goNext}
                  disabled={!stepIsValid || status === 'submitting'}
                >
                  {copy.buttonContinueText ?? ''}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={
                    !stepIsValid ||
                    status === 'submitting' ||
                    !submittedAt ||
                    (isTurnstileEnabled && !turnstileToken)
                  }
                >
                  {status === 'submitting'
                    ? (copy.buttonSubmittingText ?? '')
                    : (copy.buttonSubmitText ?? '')}
                </button>
              )}
            </div>

            {feedback && (
              <p
                className={`text-fluid-body-sm ${status === 'error' ? 'text-red-700' : 'text-75'}`}
              >
                {feedback}
              </p>
            )}
          </footer>
        </form>
      </div>
    </SectionShell>
  );
};

export default BookingForm;
