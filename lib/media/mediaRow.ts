export const getMediaRowGridClass = (count: number) => {
  if (count <= 1) return 'grid grid-cols-1';
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2';
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
};

export const getMediaRowSizes = (count: number) => {
  if (count <= 1) return '100vw';
  if (count === 2) return '(min-width: 640px) 50vw, 100vw';
  if (count === 3) return '(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw';
  return '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw';
};
