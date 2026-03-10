'use client';

import {
  BookingAddOn,
  BookingBundle,
  BookingBundleSuggestion,
  BookingEventType,
  BookingService,
  BookingSettings,
  BookingTravelRegion,
} from '@/types/booking';
import { BookingFormValues, SetField } from './types';
import { formatEuro } from './helpers';

interface EventDetailsStepProps {
  eventTypes: BookingEventType[];
  travelRegions: BookingTravelRegion[];
  values: BookingFormValues;
  setField: SetField;
}

export const EventDetailsStep = ({
  eventTypes,
  travelRegions,
  setField,
  values,
}: EventDetailsStepProps) => (
  <div className="grid gap-5 md:grid-cols-2">
    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Event Type
      <select
        className="input-base"
        value={values.eventType}
        onChange={(event) => setField('eventType', event.target.value)}
      >
        {eventTypes.map((eventType) => (
          <option key={eventType.value} value={eventType.value}>
            {eventType.title}
          </option>
        ))}
      </select>
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Event Date
      <input
        className="input-base"
        type="date"
        value={values.eventDate}
        onChange={(event) => setField('eventDate', event.target.value)}
      />
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Start Time (optional)
      <input
        className="input-base"
        type="time"
        value={values.startTime}
        onChange={(event) => setField('startTime', event.target.value)}
      />
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Duration (hours)
      <input
        className="input-base"
        type="number"
        min={1}
        max={24}
        value={values.durationHours}
        onChange={(event) => setField('durationHours', Number(event.target.value || 0))}
      />
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Estimated Guests
      <input
        className="input-base"
        type="number"
        min={1}
        value={values.guestCount}
        onChange={(event) => setField('guestCount', Number(event.target.value || 0))}
      />
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80">
      Travel / Logistics
      <select
        className="input-base"
        value={values.travelRegion}
        onChange={(event) => setField('travelRegion', event.target.value)}
      >
        {travelRegions.map((band) => (
          <option key={band.value} value={band.value}>
            {band.title}
          </option>
        ))}
      </select>
    </label>

    <label className="grid gap-2 text-sm tracking-tight text-text/80 md:col-span-2">
      Venue
      <input
        className="input-base"
        type="text"
        placeholder="City, venue, or area"
        value={values.venue}
        onChange={(event) => setField('venue', event.target.value)}
      />
    </label>
  </div>
);

interface ServicesStepProps {
  services: BookingService[];
  selectedServices: string[];
  toggleService: (service: string) => void;
}

export const ServicesStep = ({ services, selectedServices, toggleService }: ServicesStepProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {services.map((service) => {
      const checked = selectedServices.includes(service.value);
      const fromPrice = formatEuro(service.basePrice);
      return (
        <label
          key={service.value}
          className={`surface-radius flex cursor-pointer items-start gap-3 border p-4 transition ${
            checked ? 'border-accent bg-accent/10' : 'border-border bg-bg/60 hover:border-accent/50'
          }`}
        >
          <input
            type="checkbox"
            className="mt-1"
            checked={checked}
            onChange={() => toggleService(service.value)}
          />
          <span className="grid gap-1">
            <span className="font-display text-xl tracking-tight text-text">{service.title}</span>
            {service.description && (
              <span className="text-sm text-text/70">{service.description}</span>
            )}
            {(fromPrice || service.priceNote) && (
              <span className="text-sm font-medium text-text/80">
                {fromPrice ? `From ${fromPrice}` : service.priceNote}
                {fromPrice && service.priceNote ? ` · ${service.priceNote}` : ''}
              </span>
            )}
          </span>
        </label>
      );
    })}
  </div>
);

interface BundleSelectionStepProps {
  bundleSuggestions: BookingBundleSuggestion[];
  selectedBundleCode: string;
  applyBundle: (suggestion: BookingBundleSuggestion) => void;
  clearBundle: () => void;
  servicesByValue: Map<string, string>;
}

export const BundleSelectionStep = ({
  bundleSuggestions,
  selectedBundleCode,
  applyBundle,
  clearBundle,
  servicesByValue,
}: BundleSelectionStepProps) => (
  <div className="grid gap-4">
    <p className="text-sm leading-relaxed text-text/75">
      Choose a package if it fits. We will still tailor the final proposal to your exact plan.
    </p>

    {!!bundleSuggestions.length ? (
      bundleSuggestions.map((suggestion) => {
        const selected = selectedBundleCode === suggestion.bundle.code;
        const startingPrice = formatEuro(suggestion.bundle.startingPrice);
        const originalPrice = formatEuro(suggestion.bundle.originalPrice);
        const includedTitles = suggestion.bundle.includedServices
          .map((service) => servicesByValue.get(service) ?? service)
          .join(', ');

        return (
          <article
            key={suggestion.bundle.code}
            className={`surface-radius border p-4 md:p-5 ${
              selected ? 'border-accent bg-accent/10' : 'border-border bg-bg/60'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-2xl tracking-tight text-text">
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

            <p className="pt-2 text-sm text-text/75">Includes: {includedTitles}</p>

            {(startingPrice || originalPrice || suggestion.bundle.priceNote) && (
              <p className="pt-2 text-sm font-medium text-text/85">
                {startingPrice ? `Starting at ${startingPrice}` : ''}
                {startingPrice && originalPrice ? ` (instead of ${originalPrice})` : ''}
                {!startingPrice && originalPrice ? `Regularly ${originalPrice}` : ''}
                {suggestion.bundle.priceNote ? ` · ${suggestion.bundle.priceNote}` : ''}
              </p>
            )}

            {suggestion.isEligible ? (
              <button
                type="button"
                className="btn-primary mt-4"
                onClick={() => applyBundle(suggestion)}
              >
                {selected ? 'Package Selected' : 'Select Package'}
              </button>
            ) : (
              <button
                type="button"
                className="cta-button mt-4"
                onClick={() => applyBundle(suggestion)}
              >
                Add missing:{' '}
                {suggestion.missingServices
                  .map((service) => servicesByValue.get(service) ?? service)
                  .join(', ')}
              </button>
            )}
          </article>
        );
      })
    ) : (
      <p className="text-sm text-text/70">
        Select at least one service to see package suggestions.
      </p>
    )}

    {selectedBundleCode && (
      <div>
        <button type="button" className="text-link text-sm" onClick={clearBundle}>
          Remove selected package
        </button>
      </div>
    )}
  </div>
);

interface AddOnsStepProps {
  availableAddOns: BookingAddOn[];
  selectedAddOns: string[];
  toggleAddOn: (addOn: string) => void;
}

export const AddOnsStep = ({ availableAddOns, selectedAddOns, toggleAddOn }: AddOnsStepProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {availableAddOns.length ? (
      availableAddOns.map((addOn) => {
        const checked = selectedAddOns.includes(addOn.code);
        const addOnPrice = formatEuro(addOn.price);
        const displayPrice = addOnPrice
          ? addOn.priceNote
            ? `${addOnPrice} · ${addOn.priceNote}`
            : addOnPrice
          : addOn.priceNote || 'Price on request';

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
              <span className="font-display text-xl tracking-tight text-text">{addOn.title}</span>
              {addOn.description && (
                <span className="text-sm text-text/70">{addOn.description}</span>
              )}
              <span className="text-sm font-medium text-text/80">{displayPrice}</span>
            </span>
          </label>
        );
      })
    ) : (
      <p className="text-sm text-text/70">
        No add-ons available for the currently selected services.
      </p>
    )}
  </div>
);

interface SummaryStepProps {
  config: BookingSettings;
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
  selectedAddOnTitles,
  selectedEventTypeTitle,
  selectedServiceTitles,
  selectedTravelBandTitle,
  setField,
  values,
}: SummaryStepProps) => (
  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="surface-radius border border-border bg-bg/60 p-5">
      <h3 className="font-display text-2xl tracking-tight text-text">Enquiry Summary</h3>
      <p className="pt-1 text-sm text-text/75">
        We review this manually and send you the best matching options.
      </p>

      <ul className="pt-4 text-sm leading-relaxed text-text/75">
        <li>Event: {selectedEventTypeTitle}</li>
        <li>Date: {values.eventDate}</li>
        <li>Time: {values.startTime || 'Not provided'}</li>
        <li>Duration: {values.durationHours} hours</li>
        <li>Guests: {values.guestCount}</li>
        <li>Venue: {values.venue || 'Not provided'}</li>
        <li>Travel: {selectedTravelBandTitle}</li>
        <li>
          Services:{' '}
          {selectedServiceTitles.length ? selectedServiceTitles.join(', ') : 'None selected'}
        </li>
        <li>Package: {activeBundle?.title || 'No package selected'}</li>
        <li>
          Add-ons: {selectedAddOnTitles.length ? selectedAddOnTitles.join(', ') : 'None selected'}
        </li>
      </ul>

      <p className="pt-5 text-xs leading-relaxed text-text/65">{config.disclaimer}</p>
    </div>

    <div className="grid gap-4">
      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        Name
        <input
          className="input-base"
          type="text"
          value={values.name}
          onChange={(event) => setField('name', event.target.value)}
        />
      </label>
      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        Email
        <input
          className="input-base"
          type="email"
          value={values.email}
          onChange={(event) => setField('email', event.target.value)}
        />
      </label>
      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        Phone
        <input
          className="input-base"
          type="tel"
          value={values.phone}
          onChange={(event) => setField('phone', event.target.value)}
        />
      </label>
      <label className="grid gap-2 text-sm tracking-tight text-text/80">
        Additional Notes
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
