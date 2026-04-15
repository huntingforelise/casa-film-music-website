'use client';

import { useMemo, useState } from 'react';
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
  const defaultValues = useMemo(() => getDefaultValues(config), [config]);
  const [overrides, setOverrides] = useState<Partial<BookingFormValues>>({});
  const values = useMemo(() => ({ ...defaultValues, ...overrides }), [defaultValues, overrides]);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const copy = useMemo(() => withBookingCopyDefaults(settings?.copy), [settings]);
  const eyebrowLabel = config.eyebrow?.trim();
  const stepLabel = `Step ${step} of ${TOTAL_STEPS}`;

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
    setOverrides((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
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
    const exists = values.addOns.includes(addOn);
    const addOns = exists
      ? values.addOns.filter((value) => value !== addOn)
      : [...values.addOns, addOn];
    setOverrides((prev) => ({ ...prev, addOns }));
  };

  const applyBundle = (suggestion: BookingBundleSuggestion) => {
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
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== TOTAL_STEPS || !stepIsValid || status === 'submitting') return;

    setStatus('submitting');
    setFeedback('');

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
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      website: values.website.trim(),
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
        setStatus('error');
        setFeedback(result.error ?? copy.feedbackGenericErrorText ?? '');
        return;
      }

      setStatus('success');
      const successMessage =
        result.persisted === false
          ? (copy.feedbackNotPersistedText ?? '')
          : (copy.feedbackPersistedText ?? '');
      setFeedback(successMessage);
      setOverrides({});
      setStep(1);
    } catch {
      setStatus('error');
      setFeedback(copy.feedbackNetworkErrorText ?? '');
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
              <p className="text-fluid-body-sm tracking-tight text-text/60 uppercase">
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
                  disabled={!stepIsValid || status === 'submitting'}
                >
                  {status === 'submitting'
                    ? (copy.buttonSubmittingText ?? '')
                    : (copy.buttonSubmitText ?? '')}
                </button>
              )}
            </div>

            {feedback && (
              <p
                className={`text-fluid-body-sm ${status === 'error' ? 'text-red-700' : 'text-text/75'}`}
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
