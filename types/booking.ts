// TODO not being used
export interface BookingEventType {
  _key?: string;
  value: string;
  title: string;
  description?: string;
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

export interface BookingSettings {
  _id?: string;
  _type?: 'bookingSettings';
  introTitle: string;
  introText: string;
  disclaimer: string;
  eventTypes: BookingEventType[];
  services: BookingService[];
  bundles: BookingBundle[];
  addOns: BookingAddOn[];
  travelRegions: BookingTravelRegion[];
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
