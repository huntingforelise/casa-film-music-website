import { describe, expect, it } from 'vitest';

import type { BookingBundle } from '@/types/booking';
import { getBundlePriceDetails } from './bundle-pricing';

const stubFormatPrice = (value?: number) => (typeof value === 'number' ? `${value}` : null);

const baseBundle: BookingBundle = {
  code: 'bundle-a',
  title: 'Bundle A',
  includedServices: [],
};

describe('getBundlePriceDetails', () => {
  it('returns a single row for the starting price when only that value exists', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, startingPrice: 120 },
      { bundleStartingPricePrefix: 'From' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.priceRows).toEqual([{ label: 'From 120', isStrikethrough: false }]);
    expect(details.hasPrimaryPrice).toBe(true);
    expect(details.priceNote).toBeUndefined();
    expect(details.hasPriceLine).toBe(true);
  });

  it('uses the regular prefix when only the original price is available', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, originalPrice: 200 },
      { bundleRegularPricePrefix: 'Regularly' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.priceRows).toEqual([{ label: 'Regularly 200', isStrikethrough: false }]);
    expect(details.hasPrimaryPrice).toBe(true);
    expect(details.priceNote).toBeUndefined();
  });

  it('shows both prices and strikethroughs the original amount when a starting price exists', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, startingPrice: 110, originalPrice: 150 },
      { bundleStartingPricePrefix: 'From', bundleOriginalPricePrefix: 'Instead of' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.priceRows).toEqual([
      { label: 'From 110', isStrikethrough: false },
      { label: 'Instead of 150', isStrikethrough: true },
    ]);
    expect(details.hasPrimaryPrice).toBe(true);
  });

  it('keeps the price note even when no primary price is present', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, priceNote: 'Price on request' },
      {},
      { formatPrice: stubFormatPrice },
    );

    expect(details.priceNote).toBe('Price on request');
    expect(details.hasPrimaryPrice).toBe(false);
    expect(details.priceRows).toEqual([]);
    expect(details.hasPriceLine).toBe(true);
  });

  it('returns false for hasPriceLine when there is no price or note', () => {
    const details = getBundlePriceDetails(baseBundle, {}, { formatPrice: stubFormatPrice });
    expect(details.hasPriceLine).toBe(false);
    expect(details.priceRows).toEqual([]);
  });
});
