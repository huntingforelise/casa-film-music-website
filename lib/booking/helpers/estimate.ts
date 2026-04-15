import type { BookingAddOn, BookingBundle, BookingFormSettings } from '@/types/booking';
import { formatEuro } from './formatters';

export interface EstimateLineItem {
  label: string;
  amount: number;
  formattedAmount: string;
}

export interface BookingEstimate {
  lineItems: EstimateLineItem[];
  total: number;
}

const toEstimateLineItem = (label: string, amount?: number): EstimateLineItem | null => {
  if (typeof amount !== 'number') return null;

  return {
    label,
    amount,
    formattedAmount: formatEuro(amount) ?? '',
  };
};

const getBundleAmount = (bundle: BookingBundle) =>
  typeof bundle.startingPrice === 'number' ? bundle.startingPrice : bundle.originalPrice;

export const getBookingEstimate = (
  settings: BookingFormSettings,
  selectedServices: string[],
  selectedAddOns: string[],
  selectedBundle?: BookingBundle | null,
): BookingEstimate => {
  const serviceByValue = new Map(settings.services.map((service) => [service.value, service]));
  const addOnByCode = new Map(settings.addOns.map((addOn) => [addOn.code, addOn]));
  const lineItems: EstimateLineItem[] = [];
  const bundleCoveredServices = new Set(selectedBundle?.includedServices ?? []);

  selectedServices.forEach((serviceValue) => {
    if (bundleCoveredServices.has(serviceValue)) return;

    const service = serviceByValue.get(serviceValue);
    const lineItem = service ? toEstimateLineItem(service.title, service.basePrice) : null;
    if (lineItem) {
      lineItems.push(lineItem);
    }
  });

  selectedAddOns.forEach((addOnCode) => {
    const addOn: BookingAddOn | undefined = addOnByCode.get(addOnCode);
    const lineItem = addOn ? toEstimateLineItem(addOn.title, addOn.price) : null;
    if (lineItem) {
      lineItems.push(lineItem);
    }
  });

  if (selectedBundle) {
    const bundleAmount = getBundleAmount(selectedBundle);
    const lineItem = toEstimateLineItem(`Package ${selectedBundle.title}`, bundleAmount);
    if (lineItem) {
      lineItems.push(lineItem);
    }
  }

  return {
    lineItems,
    total: lineItems.reduce((sum, item) => sum + item.amount, 0),
  };
};
