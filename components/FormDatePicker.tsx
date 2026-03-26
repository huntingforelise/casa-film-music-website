'use client';

import { formatDateLabel, formatDateValue, parseDateString } from '@/lib/booking/helpers/dateTime';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CalendarDays } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

type FormDatePickerProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function FormDatePicker({
  label,
  value,
  placeholder = 'Select a date',
  onChange,
}: FormDatePickerProps) {
  const selectedDate = parseDateString(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <div className="form-field">
          <label>{label}</label>

          <PopoverButton
            className="input-base form-trigger"
            data-open={open ? 'true' : undefined}
          >
            <span className="truncate">{value ? formatDateLabel(value) : placeholder}</span>
            <CalendarDays className="h-5 w-5 shrink-0 text-text/50" />
          </PopoverButton>

          <PopoverPanel className="surface-radius absolute left-0 top-full z-20 mt-2 booking-dropdown p-3">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;
                onChange(formatDateValue(date));
                close();
              }}
              disabled={{ before: today }}
            />
          </PopoverPanel>
        </div>
      )}
    </Popover>
  );
}
