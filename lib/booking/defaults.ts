import { BookingFormSettings } from '@/types/booking';
import { BookingFormValues } from './types';

const emptyBookingSettings: BookingFormSettings = {
  title: '',
  disclaimer: '',
  eventTypes: [],
  services: [],
  bundles: [],
  addOns: [],
  travelRegions: [],
};

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
