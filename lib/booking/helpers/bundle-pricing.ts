import type { BookingBundle, BookingFormCopy } from '@/types/booking';
import { formatEuro } from './formatters';

type PriceFormatter = (value?: number) => string | null;

export interface BundlePriceRow {
  label: string;
  isStrikethrough: boolean;
}

export interface BundlePriceDetails {
  hasPriceLine: boolean;
  hasPrimaryPrice: boolean;
  priceRows: BundlePriceRow[];
  priceNote?: string;
}

interface BundlePriceOptions {
  formatPrice?: PriceFormatter;
}

const formatPriceLabel = (prefix: string, price: string) => (prefix ? `${prefix} ${price}` : price);

export const getBundlePriceDetails = (
  bundle: BookingBundle,
  copy: BookingFormCopy,
  options: BundlePriceOptions = {},
): BundlePriceDetails => {
  const formatPrice: PriceFormatter = options.formatPrice ?? formatEuro;
  const startingPrice = formatPrice(bundle.startingPrice);
  const originalPrice = formatPrice(bundle.originalPrice);

  const startingPriceLabel = startingPrice
    ? formatPriceLabel(copy.bundleStartingPricePrefix ?? '', startingPrice)
    : undefined;
  const originalPricePrefix = startingPrice
    ? copy.bundleOriginalPricePrefix ?? ''
    : copy.bundleRegularPricePrefix ?? '';
  const originalPriceLabel = originalPrice
    ? formatPriceLabel(originalPricePrefix, originalPrice)
    : undefined;

  const priceRows: BundlePriceRow[] = [];
  if (startingPriceLabel) {
    priceRows.push({ label: startingPriceLabel, isStrikethrough: false });
  }
  if (originalPriceLabel) {
    priceRows.push({ label: originalPriceLabel, isStrikethrough: Boolean(startingPriceLabel) });
  }

  const hasPrimaryPrice = priceRows.length > 0;
  const priceNote = bundle.priceNote;

  return {
    hasPriceLine: hasPrimaryPrice || Boolean(priceNote),
    hasPrimaryPrice,
    priceRows,
    priceNote,
  };
};
