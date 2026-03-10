import { BookingSettings } from '@/types/booking'

export type Status = 'idle' | 'submitting' | 'success' | 'error'

export type BookingFormValues = {
  eventType: string
  eventDate: string
  startTime: string
  durationHours: number
  guestCount: number
  venue: string
  travelRegion: string
  services: string[]
  bundleCode: string
  addOns: string[]
  notes: string
  name: string
  email: string
  phone: string
  website: string
}

export const TOTAL_STEPS = 5

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
})

export type SetField = <K extends keyof BookingFormValues>(
  field: K,
  value: BookingFormValues[K],
) => void
