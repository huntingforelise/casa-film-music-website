export const formatEuro = (value?: number) => {
  if (typeof value !== 'number') return null
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}
