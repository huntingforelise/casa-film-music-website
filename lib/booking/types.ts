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

export type SetField = <K extends keyof BookingFormValues>(
  field: K,
  value: BookingFormValues[K],
) => void
