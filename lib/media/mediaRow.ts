export const getMediaRowGridClass = (count: number) => {
  if (count <= 1) return 'grid grid-cols-1';
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
};
