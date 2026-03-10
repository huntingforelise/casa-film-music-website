import { BookingBundle, BookingBundleSuggestion, BookingSettings } from '@/types/booking';

const getBundleSuggestion = (
  bundle: BookingBundle,
  selectedServices: string[],
): BookingBundleSuggestion => {
  const selected = new Set(selectedServices);
  const missingServices = bundle.includedServices.filter((service) => !selected.has(service));

  return {
    bundle,
    isEligible: missingServices.length === 0,
    selectedServicesCount: bundle.includedServices.length - missingServices.length,
    missingServices,
  };
};

export const getBundleSuggestions = (
  settings: BookingSettings,
  selectedServices: string[],
): BookingBundleSuggestion[] => {
  if (!selectedServices.length) return [];

  return settings.bundles
    .map((bundle) => getBundleSuggestion(bundle, selectedServices))
    .filter((suggestion) => suggestion.selectedServicesCount > 0)
    .sort((a, b) => {
      if (a.isEligible && !b.isEligible) return -1;
      if (!a.isEligible && b.isEligible) return 1;
      return b.selectedServicesCount - a.selectedServicesCount;
    });
};
