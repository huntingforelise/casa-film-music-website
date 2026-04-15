import { describe, expect, it } from 'vitest';

import type { BookingFormSettings } from '@/types/booking';
import { getBookingEstimate } from './estimate';

const baseSettings: BookingFormSettings = {
  eyebrow: 'Private bookings',
  title: 'Get an online estimate',
  disclaimer: '',
  eventTypes: [],
  services: [
    { value: 'dj', title: 'DJ', basePrice: 150 },
    { value: 'photography', title: 'Photography', basePrice: 300 },
    { value: 'livestream', title: 'Livestream', basePrice: 100 },
    { value: 'lighting', title: 'Lighting' },
  ],
  bundles: [
    {
      code: 'bundle-a',
      title: 'Bundle A',
      includedServices: ['dj', 'photography'],
      startingPrice: 500,
      originalPrice: 650,
    },
    {
      code: 'bundle-b',
      title: 'Bundle B',
      includedServices: [],
      originalPrice: 700,
    },
  ],
  addOns: [
    { code: 'extra-hours', title: 'Extra hours', price: 120 },
    { code: 'photo-wall', title: 'Photo wall', price: 80 },
    { code: 'vip-support', title: 'VIP support', priceNote: 'Price on request' },
  ],
  travelRegions: [],
};

describe('getBookingEstimate', () => {
  it('treats the bundle as covering its included services', () => {
    const estimate = getBookingEstimate(
      baseSettings,
      ['dj', 'photography', 'livestream'],
      ['extra-hours'],
      baseSettings.bundles[0],
    );

    expect(estimate.lineItems).toEqual([
      { label: 'Livestream', amount: 100, formattedAmount: '€100' },
      { label: 'Extra hours', amount: 120, formattedAmount: '€120' },
      { label: 'Package Bundle A', amount: 500, formattedAmount: '€500' },
    ]);
    expect(estimate.total).toBe(720);
  });

  it('falls back to the original price when no starting price exists', () => {
    const estimate = getBookingEstimate(baseSettings, ['dj'], ['photo-wall'], baseSettings.bundles[1]);

    expect(estimate.lineItems).toEqual([
      { label: 'DJ', amount: 150, formattedAmount: '€150' },
      { label: 'Photo wall', amount: 80, formattedAmount: '€80' },
      { label: 'Package Bundle B', amount: 700, formattedAmount: '€700' },
    ]);
    expect(estimate.total).toBe(930);
  });

  it('ignores selected items that do not have a numeric price', () => {
    const estimate = getBookingEstimate(baseSettings, ['lighting'], ['vip-support'], undefined);

    expect(estimate.lineItems).toEqual([]);
    expect(estimate.total).toBe(0);
  });
});
