import { BookingSettings } from '@/types/booking'

const emptyBookingSettings: BookingSettings = {
  introTitle: '',
  introText: '',
  disclaimer: '',
  eventTypes: [],
  services: [],
  bundles: [],
  addOns: [],
  travelRegions: [],
}

export const withBookingDefaults = (
  settings?: BookingSettings | null,
): BookingSettings => {
  return settings ?? emptyBookingSettings
}
