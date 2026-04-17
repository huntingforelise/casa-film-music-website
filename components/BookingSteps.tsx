'use client';

import clsx from 'clsx';
import { FocusEvent, useState } from 'react';
import {
  BookingAddOn,
  BookingBundle,
  BookingBundleSuggestion,
  BookingEventType,
  BookingFormCopy,
  BookingFormSettings,
  BookingService,
  BookingTravelRegion,
} from '@/types/booking';
import { BookingFormValues, SetField } from '@/lib/booking/types';
import { formatEuro, getBundlePriceDetails } from '@/lib/booking/helpers';
import type { BookingEstimate } from '@/lib/booking/helpers';
import { PRICE_SEPARATOR, GUEST_COUNT_MIN, GUEST_COUNT_STEP } from '@/lib/booking/constants';
import FormListbox from './FormListBox';
import FormDatePicker from './FormDatePicker';

interface EventDetailsStepProps {
  eventTypes: BookingEventType[];
  travelRegions: BookingTravelRegion[];
  values: BookingFormValues;
  setField: SetField;
  copy: BookingFormCopy;
}

export const EventDetailsStep = ({
  eventTypes,
  travelRegions,
  setField,
  values,
  copy,
}: EventDetailsStepProps) => {
  const {
    eventTypeLabel,
    eventDateLabel,
    guestCountLabel,
    travelRegionLabel,
    venueLabel,
    venuePlaceholder,
  } = copy;

  const [guestCountIsFocused, setGuestCountIsFocused] = useState(false);

  const shouldRetainFocus = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;
    return relatedTarget && event.currentTarget.contains(relatedTarget);
  };

  const handleGuestBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (shouldRetainFocus(event)) return;
    setGuestCountIsFocused(false);
  };
  const introText =
    copy.eventDetailsIntro ?? 'Tell us the basics about your event so we can shape the quote.';

  return (
    <div className="grid gap-4">
      <p className="text-fluid-body-lg">{introText}</p>

      <div className="grid gap-5 md:grid-cols-2">
        <FormListbox
          label={eventTypeLabel ?? ''}
          value={values.eventType}
          placeholder="Select an event type"
          onChange={(value) => setField('eventType', value)}
          options={eventTypes.map((eventType) => ({
            value: eventType.value,
            label: eventType.title,
          }))}
        />

        <FormDatePicker
          label={eventDateLabel ?? ''}
          value={values.eventDate}
          placeholder="Select a date"
          onChange={(value) => setField('eventDate', value)}
        />

        <div className="form-field">
          <label>{guestCountLabel ?? ''}</label>

          <div
            className="input-base form-counter"
            onFocus={() => setGuestCountIsFocused(true)}
            onBlur={handleGuestBlur}
            data-active={guestCountIsFocused ? 'true' : undefined}
          >
            <button
              type="button"
              onClick={() =>
                setField(
                  'guestCount',
                  Math.max(GUEST_COUNT_MIN, values.guestCount - GUEST_COUNT_STEP),
                )
              }
              className="text-lg text-text/60 hover:text-text sm:text-xl"
            >
              −
            </button>

            <span>{values.guestCount}</span>

            <button
              type="button"
              onClick={() => setField('guestCount', values.guestCount + GUEST_COUNT_STEP)}
              className="text-lg text-text/60 hover:text-text sm:text-xl"
            >
              +
            </button>
          </div>
        </div>

        <FormListbox
          label={travelRegionLabel ?? ''}
          value={values.travelRegion}
          placeholder="Select a travel region"
          onChange={(value) => setField('travelRegion', value)}
          options={travelRegions.map((region) => ({
            value: region.value,
            label: region.title,
          }))}
        />

        <label className="form-field md:col-span-2">
          {venueLabel ?? ''}
          <input
            className="input-base"
            type="text"
            placeholder={venuePlaceholder ?? ''}
            value={values.venue}
            onChange={(event) => setField('venue', event.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

interface ServicesStepProps {
  services: BookingService[];
  selectedServices: string[];
  toggleService: (service: string) => void;
  copy: BookingFormCopy;
}

export const ServicesStep = ({
  services,
  selectedServices,
  toggleService,
  copy,
}: ServicesStepProps) => {
  const onRequestText = copy.priceOnRequestText ?? '';
  const fromLabel = (copy.serviceFromLabel ?? '').trim();
  const introText = copy.servicesIntro ?? 'Choose the services you would like included.';

  return (
    <div className="grid gap-4">
      <p className="text-fluid-body-lg text-text/85">{introText}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const checked = selectedServices.includes(service.value);
          const formattedPrice = formatEuro(service.basePrice);
          const priceParts: string[] = [];

          if (formattedPrice) {
            priceParts.push(fromLabel ? `${fromLabel} ${formattedPrice}` : formattedPrice);
          }
          if (service.priceNote) {
            priceParts.push(service.priceNote);
          }

          const displayPrice =
            priceParts.length > 0 ? priceParts.join(PRICE_SEPARATOR) : onRequestText;

            return (
              <label
                key={service.value}
                className={clsx(
                  'surface-card surface-card--ghost surface-radius booking-choice-card',
                  checked ? 'border-accent bg-accent/10' : 'hover:border-accent/50',
                )}
              >
              <input
                type="checkbox"
                className="mt-1"
                checked={checked}
                onChange={() => toggleService(service.value)}
              />
              <span className="grid gap-1">
                <span className="text-fluid-heading-sm">{service.title}</span>
                {service.description && (
                  <span className="text-fluid-body-sm text-muted">{service.description}</span>
                )}
                {displayPrice && (
                  <span className="text-fluid-body-sm font-medium text-80">{displayPrice}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

interface BundleSelectionStepProps {
  bundleSuggestions: BookingBundleSuggestion[];
  selectedBundleCode: string;
  applyBundle: (suggestion: BookingBundleSuggestion) => void;
  servicesByValue: Map<string, string>;
  copy: BookingFormCopy;
}

export const BundleSelectionStep = ({
  bundleSuggestions,
  selectedBundleCode,
  applyBundle,
  servicesByValue,
  copy,
}: BundleSelectionStepProps) => {
  const introText = copy.bundleIntro ?? 'See which bundle best matches the services you selected.';

  return (
    <div className="grid gap-4">
      <p className="text-fluid-body-lg text-text/85">{introText}</p>

      {!!bundleSuggestions.length
        ? bundleSuggestions.map((suggestion) => {
            const selected = selectedBundleCode === suggestion.bundle.code;
            const includedTitles = suggestion.bundle.includedServices
              .map((service) => servicesByValue.get(service) ?? service)
              .join(', ');

            const bundleButtonLabel = selected
              ? (copy.bundleSelectedLabel ?? 'Package selected')
              : (copy.bundleSelectLabel ?? 'Select package');

            const { priceNote, hasPriceLine, hasPrimaryPrice, priceRows } = getBundlePriceDetails(
              suggestion.bundle,
              copy,
            );

            const includesLine =
              includedTitles && copy.bundleIncludesLabel
                ? `${copy.bundleIncludesLabel} ${includedTitles}`
                : includedTitles;

            return (
              <article
                key={suggestion.bundle.code}
                className={clsx(
                  'surface-card surface-card--ghost surface-radius p-4 md:p-5 transition',
                  selected ? 'border-accent bg-accent/10' : 'hover:border-accent/50',
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-fluid-heading-md">{suggestion.bundle.title}</h3>
                  {suggestion.bundle.highlightLabel && (
                    <span className="surface-radius border border-accent/40 bg-accent/15 px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-80">
                      {suggestion.bundle.highlightLabel}
                    </span>
                  )}
                </div>

                {suggestion.bundle.description && (
                  <p className="pt-2 text-fluid-body-sm text-text/75">
                    {suggestion.bundle.description}
                  </p>
                )}

                {includesLine && (
                  <p className="pt-2 text-fluid-body-sm text-text/75">{includesLine}</p>
                )}

                {hasPriceLine && (
                  <p className="pt-2 text-fluid-body-sm font-medium text-text/85">
                    {hasPrimaryPrice && priceRows.length > 0 && (
                      <span className="flex flex-wrap items-baseline gap-2">
                        {priceRows.map((row, index) => (
                          <span
                            key={`${row.label}-${index}`}
                            className={row.isStrikethrough ? 'line-through text-muted' : undefined}
                          >
                            {row.label}
                          </span>
                        ))}
                      </span>
                    )}
                  </p>
                )}

                {priceNote && hasPrimaryPrice && (
                  <p className="pt-2 text-fluid-body-sm text-muted">{priceNote}</p>
                )}

                <button
                  type="button"
                  className={clsx(selected ? 'btn-primary' : 'btn-secondary', 'mt-4')}
                  onClick={() => applyBundle(suggestion)}
                >
                  {bundleButtonLabel}
                </button>
              </article>
            );
          })
        : copy.bundleNoSuggestions && (
            <p className="text-fluid-body-sm text-muted">{copy.bundleNoSuggestions}</p>
          )}
    </div>
  );
};

interface AddOnsStepProps {
  availableAddOns: BookingAddOn[];
  selectedAddOns: string[];
  toggleAddOn: (addOn: string) => void;
  copy: BookingFormCopy;
}

export const AddOnsStep = ({
  availableAddOns,
  selectedAddOns,
  toggleAddOn,
  copy,
}: AddOnsStepProps) => {
  const priceOnRequest = copy.priceOnRequestText ?? '';
  const introText = copy.addOnsIntro ?? 'Choose any extras you want to include.';

  return (
    <div className="grid gap-4">
      <p className="text-fluid-body-lg text-text/85">{introText}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {availableAddOns.length ? (
          availableAddOns.map((addOn) => {
            const checked = selectedAddOns.includes(addOn.code);
            const addOnPrice = formatEuro(addOn.price);
            const priceParts: string[] = [];

            if (addOnPrice) {
              priceParts.push(addOnPrice);
            }
            if (addOn.priceNote) {
              priceParts.push(addOn.priceNote);
            }

            const displayPrice =
              priceParts.length > 0 ? priceParts.join(PRICE_SEPARATOR) : priceOnRequest;

            return (
              <label
                key={addOn.code}
                className={clsx(
                  'surface-card surface-card--ghost surface-radius booking-choice-card',
                  checked ? 'border-accent bg-accent/10' : 'hover:border-accent/50',
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={checked}
                  onChange={() => toggleAddOn(addOn.code)}
                />
                <span className="grid gap-1">
                  <span className="text-fluid-heading-sm">{addOn.title}</span>
                  {addOn.description && (
                    <span className="text-fluid-body-sm text-muted">{addOn.description}</span>
                  )}
                  <span className="text-fluid-body-sm font-medium text-80">{displayPrice}</span>
                </span>
              </label>
            );
          })
        ) : copy.addOnsEmptyText ? (
          <p className="text-fluid-body-sm text-muted">{copy.addOnsEmptyText}</p>
        ) : null}
      </div>
    </div>
  );
};

interface SummaryStepProps {
  config: BookingFormSettings;
  copy: BookingFormCopy;
  values: BookingFormValues;
  selectedEventTypeTitle: string;
  selectedTravelBandTitle: string;
  selectedServiceTitles: string[];
  selectedAddOnTitles: string[];
  activeBundle?: BookingBundle;
  estimate: BookingEstimate;
  setField: SetField;
}

export const SummaryStep = ({
  activeBundle,
  config,
  copy,
  estimate,
  selectedAddOnTitles,
  selectedEventTypeTitle,
  selectedServiceTitles,
  selectedTravelBandTitle,
  setField,
  values,
}: SummaryStepProps) => {
  const noneSelectedText = copy.summaryNoneSelectedText ?? '';
  const notProvidedText = copy.summaryNotProvidedText ?? '';
  const noPackageText = copy.summaryNoPackageText ?? '';

  const renderListItem = (label: string | undefined, value: string) =>
    label ? `${label} ${value}` : value;

  const servicesValue = selectedServiceTitles.length
    ? selectedServiceTitles.join(', ')
    : noneSelectedText;
  const addOnsValue = selectedAddOnTitles.length
    ? selectedAddOnTitles.join(', ')
    : noneSelectedText;
  const hasEstimate = estimate.lineItems.length > 0;
  const estimateTotal = hasEstimate ? (formatEuro(estimate.total) ?? '') : '';
  const estimateFallback = copy.priceOnRequestText ?? 'Estimate available on request';
  const summaryIntroText =
    copy.summarySubtitle ?? 'Review your estimate and contact details before sending the enquiry.';

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="lg:col-span-2">
        <p className="text-fluid-body-lg text-text/85">{summaryIntroText}</p>
      </div>

      <div className="surface-card surface-card--ghost surface-radius p-8">
        <h3 className="text-fluid-heading-sm">{copy.summaryTitle ?? ''}</h3>

        <ul className="pt-4 text-fluid-body-md text-text/75">
          <li>{renderListItem(copy.summaryLabelEvent, selectedEventTypeTitle)}</li>
          <li>{renderListItem(copy.summaryLabelDate, values.eventDate)}</li>
          <li>{renderListItem(copy.summaryLabelGuests, values.guestCount.toString())}</li>
          <li>{renderListItem(copy.summaryLabelVenue, values.venue || notProvidedText)}</li>
          <li>{renderListItem(copy.summaryLabelTravel, selectedTravelBandTitle)}</li>
          <li>{renderListItem(copy.summaryLabelServices, servicesValue)}</li>
          <li>{renderListItem(copy.summaryLabelPackage, activeBundle?.title || noPackageText)}</li>
          <li>{renderListItem(copy.summaryLabelAddOns, addOnsValue)}</li>
        </ul>

        <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/5 p-4">
          <p className="text-fluid-eyebrow" style={{ color: 'var(--theme-accent)' }}>
            Estimate
          </p>
          {hasEstimate ? (
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
              <span className="text-fluid-heading-sm">Estimated total</span>
              <span className="text-fluid-heading-md">{estimateTotal}</span>
            </div>
          ) : (
            <p className="mt-2 text-fluid-body-sm text-text/75">{estimateFallback}</p>
          )}

          {hasEstimate && (
            <ul className="mt-4 grid gap-2 text-fluid-body-sm text-text/75">
              {estimate.lineItems.map((item) => (
                <li
                  key={`${item.label}-${item.formattedAmount}`}
                  className="flex justify-between gap-4"
                >
                  <span>{item.label}</span>
                  <span className="whitespace-nowrap">{item.formattedAmount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="pt-5 text-fluid-body-xsm text-text/65">{config.disclaimer}</p>
      </div>

      <div className="grid gap-4">
        <label className="form-field">
          {copy.summaryContactNameLabel ?? ''}
          <input
            className="input-base"
            type="text"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
          />
        </label>
        <label className="form-field">
          {copy.summaryContactEmailLabel ?? ''}
          <input
            className="input-base"
            type="email"
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
          />
        </label>
        <label className="form-field">
          {copy.summaryContactPhoneLabel ?? ''}
          <input
            className="input-base"
            type="tel"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
          />
        </label>
        <label className="form-field">
          {copy.summaryNotesLabel ?? ''}
          <textarea
            className="input-base resize-y"
            rows={5}
            value={values.notes}
            onChange={(event) => setField('notes', event.target.value)}
          />
        </label>

        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={values.website}
          onChange={(event) => setField('website', event.target.value)}
        />
      </div>
    </div>
  );
};
