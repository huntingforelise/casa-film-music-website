'use client';

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
import {
  PRICE_SEPARATOR,
  TIME_OPTION_START_MINUTES,
  TIME_OPTION_END_MINUTES,
  TIME_OPTION_STEP_MINUTES,
  GUEST_COUNT_MIN,
  GUEST_COUNT_STEP,
} from '@/lib/booking/constants';
import FormListbox from './FormListBox';
import { buildTimeOptions } from '@/lib/booking/helpers/dateTime';
import FormDatePicker from './FormDatePicker';

const timeOptions = buildTimeOptions(
  TIME_OPTION_START_MINUTES,
  TIME_OPTION_END_MINUTES,
  TIME_OPTION_STEP_MINUTES,
);

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
    startTimeLabel,
    durationLabel,
    guestCountLabel,
    travelRegionLabel,
    venueLabel,
    venuePlaceholder,
  } = copy;

  const [durationIsFocused, setDurationIsFocused] = useState(false);
  const [guestCountIsFocused, setGuestCountIsFocused] = useState(false);

  const shouldRetainFocus = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;
    return relatedTarget && event.currentTarget.contains(relatedTarget);
  };

  const handleDurationBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (shouldRetainFocus(event)) return;
    setDurationIsFocused(false);
  };

  const handleGuestBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (shouldRetainFocus(event)) return;
    setGuestCountIsFocused(false);
  };

  return (
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

      <FormListbox
        label={startTimeLabel ?? ''}
        value={values.startTime}
        placeholder="Select a time"
        onChange={(value) => setField('startTime', value)}
        options={timeOptions.map((time) => ({
          value: time,
          label: time,
        }))}
      />

      <div className="grid gap-2 text-sm tracking-tight text-80">
        <label>{durationLabel ?? ''}</label>

        <div
          className="input-base form-counter flex items-center justify-between h-10 focus-within:border-accent"
          onFocus={() => setDurationIsFocused(true)}
          onBlur={handleDurationBlur}
          data-active={durationIsFocused ? 'true' : undefined}
        >
          <button
            type="button"
            onClick={() => setField('durationHours', Math.max(1, values.durationHours - 1))}
            className="text-xl text-text/60 hover:text-text"
          >
            −
          </button>

          <span>{values.durationHours}</span>

          <button
            type="button"
            onClick={() => setField('durationHours', Math.min(24, values.durationHours + 1))}
            className="text-xl text-text/60 hover:text-text"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-2 text-sm tracking-tight text-80">
        <label>{guestCountLabel ?? ''}</label>

        <div
          className="input-base form-counter flex items-center justify-between h-10 focus-within:border-accent"
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
            className="text-xl text-text/60 hover:text-text"
          >
            −
          </button>

          <span>{values.guestCount}</span>

          <button
            type="button"
            onClick={() => setField('guestCount', values.guestCount + GUEST_COUNT_STEP)}
            className="text-xl text-text/60 hover:text-text"
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

      <label className="grid gap-2 text-sm tracking-tight text-80 md:col-span-2">
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

  return (
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
            className={`surface-card surface-card--ghost surface-radius flex cursor-pointer items-start gap-3 p-4 transition ${
              checked ? 'border-accent bg-accent/10' : 'hover:border-accent/50'
            }`}
          >
            <input
              type="checkbox"
              className="mt-1"
              checked={checked}
              onChange={() => toggleService(service.value)}
            />
            <span className="grid gap-1">
              <span className="font-display text-xl tracking-tight">{service.title}</span>
              {service.description && (
                <span className="text-sm text-muted">{service.description}</span>
              )}
              {displayPrice && <span className="text-sm font-medium text-80">{displayPrice}</span>}
            </span>
          </label>
        );
      })}
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
  return (
    <div className="grid gap-4">
      {copy.bundleIntro && (
        <p className="text-sm leading-relaxed text-text/75">{copy.bundleIntro}</p>
      )}

      {!!bundleSuggestions.length
        ? bundleSuggestions.map((suggestion) => {
            const selected = selectedBundleCode === suggestion.bundle.code;
            const includedTitles = suggestion.bundle.includedServices
              .map((service) => servicesByValue.get(service) ?? service)
              .join(', ');
            const missingServices = suggestion.missingServices
              .map((service) => servicesByValue.get(service) ?? service)
              .join(', ');

            const bundleButtonLabel = selected
              ? (copy.bundleSelectedLabel ?? '')
              : (copy.bundleSelectLabel ?? '');

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
                className={`surface-card surface-card--ghost surface-radius p-4 md:p-5 transition ${
                  selected ? 'border-accent bg-accent/10' : 'hover:border-accent/50'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl tracking-tight">
                    {suggestion.bundle.title}
                  </h3>
                  {suggestion.bundle.highlightLabel && (
                    <span className="surface-radius border border-accent/40 bg-accent/15 px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-80">
                      {suggestion.bundle.highlightLabel}
                    </span>
                  )}
                </div>

                {suggestion.bundle.description && (
                  <p className="pt-2 text-sm text-text/75">{suggestion.bundle.description}</p>
                )}

                {includesLine && <p className="pt-2 text-sm text-text/75">{includesLine}</p>}

                {hasPriceLine && (
                  <p className="pt-2 text-sm font-medium text-text/85">
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
                  <p className="pt-2 text-sm text-muted">{priceNote}</p>
                )}

                {suggestion.isEligible ? (
                  <button
                    type="button"
                    className="btn-primary mt-4"
                    onClick={() => applyBundle(suggestion)}
                  >
                    {bundleButtonLabel}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary mt-4"
                    onClick={() => applyBundle(suggestion)}
                  >
                    {copy.bundleAddMissingLabel && (
                      <>
                        {copy.bundleAddMissingLabel}
                        {missingServices ? ` ${missingServices}` : ''}
                      </>
                    )}
                    {!copy.bundleAddMissingLabel && missingServices}
                  </button>
                )}
              </article>
            );
          })
        : copy.bundleNoSuggestions && (
            <p className="text-sm text-muted">{copy.bundleNoSuggestions}</p>
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

  return (
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
              className={`surface-card surface-card--ghost surface-radius flex cursor-pointer items-start gap-3 p-4 transition ${
                checked ? 'border-accent bg-accent/10' : 'hover:border-accent/50'
              }`}
            >
              <input
                type="checkbox"
                className="mt-1"
                checked={checked}
                onChange={() => toggleAddOn(addOn.code)}
              />
              <span className="grid gap-1">
                <span className="font-display text-xl tracking-tight">{addOn.title}</span>
                {addOn.description && (
                  <span className="text-sm text-muted">{addOn.description}</span>
                )}
                <span className="text-sm font-medium text-80">{displayPrice}</span>
              </span>
            </label>
          );
        })
      ) : copy.addOnsEmptyText ? (
        <p className="text-sm text-muted">{copy.addOnsEmptyText}</p>
      ) : null}
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
  setField: SetField;
}

export const SummaryStep = ({
  activeBundle,
  config,
  copy,
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

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface-card surface-card--ghost surface-radius p-5">
        <h3 className="font-display text-2xl tracking-tight">{copy.summaryTitle ?? ''}</h3>
        {copy.summarySubtitle && (
          <p className="pt-1 text-sm text-text/75">{copy.summarySubtitle}</p>
        )}

        <ul className="pt-4 text-sm leading-relaxed text-text/75">
          <li>{renderListItem(copy.summaryLabelEvent, selectedEventTypeTitle)}</li>
          <li>{renderListItem(copy.summaryLabelDate, values.eventDate)}</li>
          <li>{renderListItem(copy.summaryLabelTime, values.startTime || notProvidedText)}</li>
          <li>{renderListItem(copy.summaryLabelDuration, values.durationHours.toString())}</li>
          <li>{renderListItem(copy.summaryLabelGuests, values.guestCount.toString())}</li>
          <li>{renderListItem(copy.summaryLabelVenue, values.venue || notProvidedText)}</li>
          <li>{renderListItem(copy.summaryLabelTravel, selectedTravelBandTitle)}</li>
          <li>{renderListItem(copy.summaryLabelServices, servicesValue)}</li>
          <li>{renderListItem(copy.summaryLabelPackage, activeBundle?.title || noPackageText)}</li>
          <li>{renderListItem(copy.summaryLabelAddOns, addOnsValue)}</li>
        </ul>

        <p className="pt-5 text-xs leading-relaxed text-text/65">{config.disclaimer}</p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm tracking-tight text-80">
          {copy.summaryContactNameLabel ?? ''}
          <input
            className="input-base"
            type="text"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-80">
          {copy.summaryContactEmailLabel ?? ''}
          <input
            className="input-base"
            type="email"
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-80">
          {copy.summaryContactPhoneLabel ?? ''}
          <input
            className="input-base"
            type="tel"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-80">
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
