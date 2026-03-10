import { BookingSettings } from '@/types/booking';
import { BookingFormValues } from './types';

const emptyBookingSettings: BookingSettings = {
  introTitle: '',
  introText: '',
  disclaimer: '',
  eventTypes: [],
  services: [],
  bundles: [],
  addOns: [],
  travelRegions: [],
};

export const withBookingDefaults = (settings?: BookingSettings | null): BookingSettings => {
  return settings ?? emptyBookingSettings;
};
export const getDefaultValues = (config: BookingSettings): BookingFormValues => ({
  eventType: config.eventTypes[0]?.value ?? '',
  eventDate: '',
  startTime: '',
  durationHours: 10,
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
