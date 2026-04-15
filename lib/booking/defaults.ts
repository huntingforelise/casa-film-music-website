import { BookingFormCopy, BookingFormSettings } from '@/types/booking';
import { BookingFormValues } from './types';

const emptyBookingSettings: BookingFormSettings = {
  eyebrow: 'Private bookings',
  title: 'Get an online estimate',
  disclaimer: '',
  eventTypes: [],
  services: [],
  bundles: [],
  addOns: [],
  travelRegions: [],
};

export const defaultCopy: Required<BookingFormCopy> = {
  eventTypeLabel: 'Event type',
  eventDateLabel: 'Event date',
  guestCountLabel: 'Guest count',
  travelRegionLabel: 'Travel region',
  venueLabel: 'Venue',
  venuePlaceholder: 'Venue name or location',
  serviceFromLabel: 'From',
  priceOnRequestText: 'Price on request',
  servicesIntro: 'Choose the services you would like included.',
  bundleIntro: 'See which bundle best matches the services you selected.',
  bundleNoSuggestions: 'No bundle suggestions available.',
  bundleSelectLabel: 'Select bundle',
  bundleSelectedLabel: 'Bundle selected',
  bundleIncludesLabel: 'Includes',
  bundleStartingPricePrefix: 'From',
  bundleOriginalPricePrefix: 'Was',
  bundleRegularPricePrefix: 'Regularly',
  eventDetailsIntro: 'Tell us the basics about your event so we can shape the quote.',
  addOnsIntro: 'Choose any extras you want to include.',
  addOnsEmptyText: 'No add-ons available for the selected services.',
  summaryTitle: 'Review your details',
  summarySubtitle: 'Review your estimate and contact details before sending the enquiry.',
  summaryNoneSelectedText: 'None selected',
  summaryNotProvidedText: 'Not provided',
  summaryNoPackageText: 'No package selected',
  summaryLabelEvent: 'Event',
  summaryLabelDate: 'Date',
  summaryLabelGuests: 'Guests',
  summaryLabelVenue: 'Venue',
  summaryLabelTravel: 'Travel',
  summaryLabelServices: 'Services',
  summaryLabelPackage: 'Package',
  summaryLabelAddOns: 'Add-ons',
  summaryContactNameLabel: 'Name',
  summaryContactEmailLabel: 'Email',
  summaryContactPhoneLabel: 'Phone',
  summaryNotesLabel: 'Notes',
  buttonBackText: 'Back',
  buttonContinueText: 'Continue',
  buttonSubmitText: 'Submit',
  buttonSubmittingText: 'Submitting...',
  feedbackNetworkErrorText:
    'We could not send your enquiry. Please check your connection and try again.',
  feedbackGenericErrorText: 'Something went wrong. Please try again.',
  feedbackPersistedText: 'Thanks, your enquiry has been sent.',
  feedbackNotPersistedText: 'Thanks, your enquiry was received.',
};

export const withBookingCopyDefaults = (
  copy?: BookingFormCopy | null,
): Required<BookingFormCopy> => ({
  ...defaultCopy,
  ...(copy ?? {}),
});

export const withBookingDefaults = (settings?: BookingFormSettings | null): BookingFormSettings => {
  return settings ?? emptyBookingSettings;
};
export const getDefaultValues = (config: BookingFormSettings): BookingFormValues => ({
  eventType: config.eventTypes[0]?.value ?? '',
  eventDate: '',
  guestCount: 80,
  venue: '',
  travelRegion: config.travelRegions[0]?.value ?? '',
  services: [],
  bundleCode: '',
  addOns: [],
  notes: '',
  name: '',
  email: '',
  phone: '',
  website: '',
});
