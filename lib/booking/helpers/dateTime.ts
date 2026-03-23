const formatTimeOption = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const buildTimeOptions = (startMinutes: number, endMinutes: number, stepMinutes: number) => {
  const options: string[] = [];
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += stepMinutes) {
    options.push(formatTimeOption(minutes));
  }
  return options;
};

export const parseDateString = (value: string): Date | undefined => {
  if (!value) return undefined;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

export const formatDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateLabel = (value: string): string => {
  const date = parseDateString(value);
  if (!date) return '';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
