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
import { PRICE_SEPARATOR } from '@/lib/booking/constants';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const GUEST_COUNT_STEP = 5;
const GUEST_COUNT_MIN = 1;

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
      <Listbox value={values.eventType} onChange={(value) => setField('eventType', value)}>
        {({ open }) => (
          <div className="grid gap-2 text-sm tracking-tight text-text/80">
            <Label>{eventTypeLabel ?? ''}</Label>

            <div className="relative">
              <ListboxButton
                className="input-base flex w-full items-center justify-between gap-3 text-left"
                style={{ borderColor: open ? 'var(--theme-accent)' : undefined }}
              >
                <span className="truncate">
                  {eventTypes.find((eventType) => eventType.value === values.eventType)?.title ?? ''}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-text/50" />
              </ListboxButton>

              <ListboxOptions className="surface-radius absolute z-20 mt-2 max-h-60 w-full overflow-auto border border-border bg-bg/95 p-1 shadow-lg backdrop-blur-sm focus:outline-none">
                {eventTypes.map((eventType) => (
                  <ListboxOption
                    key={eventType.value}
                    value={eventType.value}
                    className="cursor-pointer rounded-md px-4 py-2 text-sm text-text/85 transition hover:bg-accent/15 data-[focus]:bg-accent/15 data-[selected]:bg-accent/20"
                  >
                    {eventType.title}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </div>
        )}
      </Listbox>

      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        {eventDateLabel ?? ''}
        <input
          className="input-base"
          type="date"
          value={values.eventDate}
          onChange={(event) => setField('eventDate', event.target.value)}
        />
      </label>

      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        {startTimeLabel ?? ''}
        <input
          className="input-base"
          type="time"
          value={values.startTime}
          onChange={(event) => setField('startTime', event.target.value)}
        />
      </label>

      <div className="grid gap-2 text-sm tracking-tight text-text/80">
        <label>{durationLabel ?? ''}</label>

        <div
          className="input-base flex items-center justify-between h-10 focus-within:border-accent"
          onFocus={() => setDurationIsFocused(true)}
          onBlur={handleDurationBlur}
          style={{
            borderColor: durationIsFocused ? 'var(--theme-accent)' : 'var(--theme-border)',
          }}
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

      <div className="grid gap-2 text-sm tracking-tight text-text/80">
        <label>{guestCountLabel ?? ''}</label>

        <div
          className="input-base flex items-center justify-between h-10 focus-within:border-accent"
          onFocus={() => setGuestCountIsFocused(true)}
          onBlur={handleGuestBlur}
          style={{
            borderColor: guestCountIsFocused ? 'var(--theme-accent)' : 'var(--theme-border)',
          }}
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

      <Listbox value={values.travelRegion} onChange={(value) => setField('travelRegion', value)}>
        {({ open }) => (
          <div className="grid gap-2 text-sm tracking-tight text-text/80">
            <Label>{travelRegionLabel ?? ''}</Label>

            <div className="relative">
              <ListboxButton
                className="input-base flex w-full items-center justify-between gap-3 text-left"
                style={{ borderColor: open ? 'var(--theme-accent)' : undefined }}
              >
                <span className="truncate">
                  {travelRegions.find((region) => region.value === values.travelRegion)?.title ?? ''}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-text/50" />
              </ListboxButton>

              <ListboxOptions className="surface-radius absolute z-20 mt-2 max-h-60 w-full overflow-auto border border-border bg-bg/95 p-1 shadow-lg backdrop-blur-sm focus:outline-none">
                {travelRegions.map((region) => (
                  <ListboxOption
                    key={region.value}
                    value={region.value}
                    className="cursor-pointer rounded-md px-4 py-2 text-sm text-text/85 transition hover:bg-accent/15 data-[focus]:bg-accent/15 data-[selected]:bg-accent/20"
                  >
                    {region.title}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </div>
        )}
      </Listbox>

      <label className="grid gap-2 text-sm tracking-tight text-text/80 md:col-span-2">
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
            className={`surface-radius flex cursor-pointer items-start gap-3 border p-4 transition ${
              checked
                ? 'border-accent bg-accent/10'
                : 'border-border bg-bg/60 hover:border-accent/50'
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
                <span className="text-sm text-text/70">{service.description}</span>
              )}
              {displayPrice && (
                <span className="text-sm font-medium text-text/80">{displayPrice}</span>
              )}
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
                className={`surface-radius border p-4 md:p-5 ${
                  selected ? 'border-accent bg-accent/10' : 'border-border bg-bg/60'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl tracking-tight">
                    {suggestion.bundle.title}
                  </h3>
                  {suggestion.bundle.highlightLabel && (
                    <span className="surface-radius border border-accent/40 bg-accent/15 px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-text/80">
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
                            className={
                              row.isStrikethrough ? 'line-through text-text/70' : undefined
                            }
                          >
                            {row.label}
                          </span>
                        ))}
                      </span>
                    )}
                  </p>
                )}

                {priceNote && hasPrimaryPrice && (
                  <p className="pt-2 text-sm text-text/70">{priceNote}</p>
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
                    className="cta-button mt-4"
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
            <p className="text-sm text-text/70">{copy.bundleNoSuggestions}</p>
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
              className={`surface-radius flex cursor-pointer items-start gap-3 border p-4 transition ${
                checked
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-bg/60 hover:border-accent/50'
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
                  <span className="text-sm text-text/70">{addOn.description}</span>
                )}
                <span className="text-sm font-medium text-text/80">{displayPrice}</span>
              </span>
            </label>
          );
        })
      ) : copy.addOnsEmptyText ? (
        <p className="text-sm text-text/70">{copy.addOnsEmptyText}</p>
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
      <div className="surface-radius border border-border bg-bg/60 p-5">
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
        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          {copy.summaryContactNameLabel ?? ''}
          <input
            className="input-base"
            type="text"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          {copy.summaryContactEmailLabel ?? ''}
          <input
            className="input-base"
            type="email"
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-text/80">
          {copy.summaryContactPhoneLabel ?? ''}
          <input
            className="input-base"
            type="tel"
            value={values.phone}
            onChange={(event) => setField('phone', event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm tracking-tight text-text/80">
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
