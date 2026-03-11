// TODO not being used
export interface BookingEventType {
  _key?: string;
  value: string;
  title: string;
}

// TODO not being used
export interface BookingService {
  _key?: string;
  value: string;
  title: string;
  description?: string;
  basePrice?: number;
  priceNote?: string;
}

export interface BookingBundle {
  _key?: string;
  code: string;
  title: string;
  description?: string;
  includedServices: string[];
  startingPrice?: number;
  originalPrice?: number;
  priceNote?: string;
  highlightLabel?: string;
}

// TODO not being used
export interface BookingAddOn {
  _key?: string;
  code: string;
  title: string;
  description?: string;
  price?: number;
  priceNote?: string;
  applicableServices?: string[];
}

// TODO not being used
export interface BookingTravelRegion {
  _key?: string;
  value: string;
  title: string;
  description?: string;
  fee?: number;
  feeNote?: string;
}

export interface BookingFormCopy {
  eventTypeLabel?: string;
  eventDateLabel?: string;
  startTimeLabel?: string;
  durationLabel?: string;
  guestCountLabel?: string;
  travelRegionLabel?: string;
  venueLabel?: string;
  venuePlaceholder?: string;
  serviceFromLabel?: string;
  priceOnRequestText?: string;
  bundleIntro?: string;
  bundleNoSuggestions?: string;
  bundleSelectLabel?: string;
  bundleSelectedLabel?: string;
  bundleAddMissingLabel?: string;
  bundleIncludesLabel?: string;
  bundleStartingPricePrefix?: string;
  bundleOriginalPricePrefix?: string;
  bundleRegularPricePrefix?: string;
  addOnsEmptyText?: string;
  summaryTitle?: string;
  summarySubtitle?: string;
  summaryNoneSelectedText?: string;
  summaryNotProvidedText?: string;
  summaryNoPackageText?: string;
  summaryLabelEvent?: string;
  summaryLabelDate?: string;
  summaryLabelTime?: string;
  summaryLabelDuration?: string;
  summaryLabelGuests?: string;
  summaryLabelVenue?: string;
  summaryLabelTravel?: string;
  summaryLabelServices?: string;
  summaryLabelPackage?: string;
  summaryLabelAddOns?: string;
  summaryContactNameLabel?: string;
  summaryContactEmailLabel?: string;
  summaryContactPhoneLabel?: string;
  summaryNotesLabel?: string;
  buttonBackText?: string;
  buttonContinueText?: string;
  buttonSubmitText?: string;
  buttonSubmittingText?: string;
  feedbackNetworkErrorText?: string;
  feedbackGenericErrorText?: string;
  feedbackPersistedText?: string;
  feedbackNotPersistedText?: string;
}

export interface BookingFormSettings {
  introTitle: string;
  introText: string;
  disclaimer: string;
  eventTypes: BookingEventType[];
  services: BookingService[];
  bundles: BookingBundle[];
  addOns: BookingAddOn[];
  travelRegions: BookingTravelRegion[];
}

export interface BookingForm extends BookingFormSettings {
  _id?: string;
  _type?: 'bookingSettings';
  copy?: BookingFormCopy;
}

export interface BookingBundleSuggestion {
  bundle: BookingBundle;
  isEligible: boolean;
  selectedServicesCount: number;
  missingServices: string[];
}

export interface BookingEnquiryPayload {
  eventType: string;
  eventDate: string;
  startTime: string;
  durationHours: number;
  guestCount: number;
  venue: string;
  travelRegion: string;
  services: string[];
  bundleCode?: string;
  addOns: string[];
  notes: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}
