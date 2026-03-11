import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

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

    assert.strictEqual(details.startingPriceLabel, 'From 120');
    assert.strictEqual(details.originalPriceLabel, undefined);
    assert.strictEqual(details.hasPrimaryPrice, true);
    assert.strictEqual(details.priceNote, undefined);
    assert.strictEqual(details.showOriginalAsStrikethrough, false);
  });

  it('uses the regular prefix when only the original price is available', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, originalPrice: 200 },
      { bundleRegularPricePrefix: 'Regularly' },
      { formatPrice: stubFormatPrice },
    );

    assert.strictEqual(details.originalPriceLabel, 'Regularly 200');
    assert.strictEqual(details.startingPriceLabel, undefined);
    assert.strictEqual(details.hasPrimaryPrice, true);
    assert.strictEqual(details.showOriginalAsStrikethrough, false);
  });

  it('marks the original price as strikethrough when a starting price exists', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, startingPrice: 110, originalPrice: 150 },
      { bundleStartingPricePrefix: 'From', bundleOriginalPricePrefix: 'Instead of' },
      { formatPrice: stubFormatPrice },
    );

    assert.strictEqual(details.startingPriceLabel, 'From 110');
    assert.strictEqual(details.originalPriceLabel, 'Instead of 150');
    assert.strictEqual(details.showOriginalAsStrikethrough, true);
    assert.strictEqual(details.hasPrimaryPrice, true);
  });

  it('keeps the price note even when no primary price is present', () => {
    const details = getBundlePriceDetails(
      { ...baseBundle, priceNote: 'Price on request' },
      {},
      { formatPrice: stubFormatPrice },
    );

    assert.strictEqual(details.priceNote, 'Price on request');
    assert.strictEqual(details.hasPrimaryPrice, false);
    assert.strictEqual(details.hasPriceLine, true);
  });

  it('returns false for hasPriceLine when there is no price or note', () => {
    const details = getBundlePriceDetails(baseBundle, {}, { formatPrice: stubFormatPrice });
    assert.strictEqual(details.hasPriceLine, false);
  });
});
