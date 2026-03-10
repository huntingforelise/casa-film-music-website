'use client';

import { useMemo, useState } from 'react';
import { BookingBundleSuggestion, BookingEnquiryPayload, BookingSettings } from '@/types/booking';
import { getDefaultValues, withBookingDefaults } from '@/lib/booking/defaults';
import { getBundleSuggestions } from '@/lib/booking/bundles';
import { BookingFormValues, SetField, Status } from '@/lib/booking/types';
import { TOTAL_STEPS } from '@/lib/booking/constants';
import {
  EventDetailsStep,
  ServicesStep,
  BundleSelectionStep,
  AddOnsStep,
  SummaryStep,
} from './BookingSteps';
import { isValidEmail } from '@/lib/booking/helpers';

interface Props {
  settings?: BookingSettings | null;
}

const BookingEnquiryForm = ({ settings }: Props) => {
  const config = useMemo(() => withBookingDefaults(settings), [settings]);
  const [step, setStep] = useState(1);
  const defaultValues = useMemo(() => getDefaultValues(config), [config]);
  const [overrides, setOverrides] = useState<Partial<BookingFormValues>>({});
  const values = useMemo(() => ({ ...defaultValues, ...overrides }), [defaultValues, overrides]);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const bundleSuggestions = useMemo(
    () => getBundleSuggestions(config, values.services),
    [config, values.services],
  );

  const activeBundle = useMemo(
    () => config.bundles.find((bundle) => bundle.code === values.bundleCode),
    [config.bundles, values.bundleCode],
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
    const mergedServices = Array.from(new Set([...values.services, ...suggestion.missingServices]));
    setOverrides((prev) => ({
      ...prev,
      services: mergedServices,
      bundleCode: suggestion.bundle.code,
    }));
  };

  const clearBundle = () => setField('bundleCode', '');

  const stepIsValid = useMemo(() => {
    if (step === 1) {
      return (
        values.eventType.trim() !== '' &&
        values.eventDate.trim() !== '' &&
        values.durationHours > 0 &&
        values.guestCount > 0 &&
        values.venue.trim() !== '' &&
        values.travelRegion.trim() !== ''
      );
    }
    if (step === 2) return values.services.length > 0;
    if (step === 3 || step === 4) return true;
    return values.name.trim() !== '' && isValidEmail(values.email) && values.phone.trim() !== '';
  }, [step, values]);

  const goNext = () => {
    if (!stepIsValid || step >= TOTAL_STEPS) return;
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stepIsValid || status === 'submitting') return;

    setStatus('submitting');
    setFeedback('');

    const payload: BookingEnquiryPayload = {
      eventType: values.eventType,
      eventDate: values.eventDate,
      startTime: values.startTime,
      durationHours: values.durationHours,
      guestCount: values.guestCount,
      venue: values.venue.trim(),
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
      const response = await fetch('/api/booking/enquiry', {
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
        setFeedback(result.error || 'Could not submit your enquiry. Please try again.');
        return;
      }

      setStatus('success');
      setFeedback(
        result.persisted === false
          ? 'Thanks, your enquiry has been sent. We will contact you shortly.'
          : 'Thanks, your enquiry has been sent and saved.',
      );
      setOverrides({});
      setStep(1);
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
    }
  };

  return (
    <section className="section-spacing-wide">
      <div className="surface-radius border border-border bg-surface/30 p-6 md:p-8">
        <header className="pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-text/60">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2 className="pt-2 font-display text-3xl tracking-tight text-text md:text-4xl">
            {config.introTitle}
          </h2>
          <p className="pt-3 max-w-3xl text-sm leading-relaxed text-text/80 md:text-base">
            {config.introText}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6"
          noValidate
          aria-busy={status === 'submitting'}
        >
          {step === 1 && (
            <EventDetailsStep
              eventTypes={config.eventTypes}
              travelRegions={config.travelRegions}
              values={values}
              setField={setField}
            />
          )}

          {step === 2 && (
            <ServicesStep
              services={config.services}
              selectedServices={values.services}
              toggleService={toggleService}
            />
          )}

          {step === 3 && (
            <BundleSelectionStep
              bundleSuggestions={bundleSuggestions}
              selectedBundleCode={values.bundleCode}
              applyBundle={applyBundle}
              clearBundle={clearBundle}
              servicesByValue={servicesByValue}
            />
          )}

          {step === 4 && (
            <AddOnsStep
              availableAddOns={availableAddOns}
              selectedAddOns={values.addOns}
              toggleAddOn={toggleAddOn}
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
              setField={setField}
            />
          )}

          <footer className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cta-button disabled:cursor-not-allowed disabled:opacity-50"
                onClick={goBack}
                disabled={step === 1 || status === 'submitting'}
              >
                Back
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={goNext}
                  disabled={!stepIsValid || status === 'submitting'}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!stepIsValid || status === 'submitting'}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Enquiry'}
                </button>
              )}
            </div>

            {feedback && (
              <p className={`text-sm ${status === 'error' ? 'text-red-700' : 'text-text/75'}`}>
                {feedback}
              </p>
            )}
          </footer>
        </form>
      </div>
    </section>
  );
};

export default BookingEnquiryForm;
