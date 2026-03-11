import { describe, expect, it } from 'vitest';

import type { BookingBundle } from '../../../types/booking';
import { getBundlePriceDetails } from './bundle-pricing';

const stubFormatPrice = (value?: number) => (typeof value === 'number' ? `${value}` : null);

const baseBundle: BookingBundle = {
  code: 'bundle-a',
  title: 'Bundle A',
  includedServices: [],
};

describe('getBundlePriceDetails', () => {
  it('builds a starting price when only startingPrice is provided', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, startingPrice: 120 },
      { bundleStartingPricePrefix: 'From' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.startingPriceLabel).toBe('From 120');
    expect(details.originalPriceLabel).toBeUndefined();
    expect(details.hasPrimaryPrice).toBe(true);
    expect(details.priceNote).toBeUndefined();
    expect(details.showOriginalAsStrikethrough).toBe(false);
  });

  it('uses the regular prefix when only the original price is available', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, originalPrice: 200 },
      { bundleRegularPricePrefix: 'Regularly' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.originalPriceLabel).toBe('Regularly 200');
    expect(details.startingPriceLabel).toBeUndefined();
    expect(details.hasPrimaryPrice).toBe(true);
    expect(details.showOriginalAsStrikethrough).toBe(false);
  });

  it('marks the original price as strikethrough when a starting price exists', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, startingPrice: 110, originalPrice: 150 },
      { bundleStartingPricePrefix: 'From', bundleOriginalPricePrefix: 'Instead of' },
      { formatPrice: stubFormatPrice },
    );

    expect(details.startingPriceLabel).toBe('From 110');
    expect(details.originalPriceLabel).toBe('Instead of 150');
    expect(details.showOriginalAsStrikethrough).toBe(true);
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
    expect(details.hasPriceLine).toBe(true);
  });

  it('returns false for hasPriceLine when there is no price or note', () => {
    const details = getBundlePriceDetails(baseBundle, {}, { formatPrice: stubFormatPrice });
    expect(details.hasPriceLine).toBe(false);
  });
});
