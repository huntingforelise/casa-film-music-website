import type { BookingBundle, BookingFormCopy } from '../../../types/booking';
import { formatEuro } from './formatters';

type PriceFormatter = (value?: number) => string | null;

export interface BundlePriceDetails {
  hasPriceLine: boolean;
  hasPrimaryPrice: boolean;
  startingPriceLabel?: string;
  originalPriceLabel?: string;
  priceNote?: string;
  showOriginalAsStrikethrough: boolean;
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

  const hasPrimaryPrice = Boolean(startingPriceLabel || originalPriceLabel);
  const priceNote = bundle.priceNote;

  return {
    hasPriceLine: hasPrimaryPrice || Boolean(priceNote),
    hasPrimaryPrice,
    startingPriceLabel,
    originalPriceLabel,
    priceNote,
    showOriginalAsStrikethrough: Boolean(startingPriceLabel && originalPriceLabel),
  };
};
