import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

type FormListboxOption = {
  value: string;
  label: string;
};

type FormListboxProps = {
  label: string;
  value: string;
  placeholder?: string;
  options: FormListboxOption[];
  onChange: (value: string) => void;
};

const FormListbox = ({
  label,
  value,
  placeholder = 'Select an option',
  options,
  onChange,
}: FormListboxProps) => {
  const selectedLabel = options.find((option) => option.value === value)?.label ?? '';

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="grid gap-2 text-sm tracking-tight text-text/80">
          <Label>{label}</Label>

          <div className="relative">
            <ListboxButton
              className="input-base flex w-full items-center justify-between gap-3 text-left"
              style={{ borderColor: open ? 'var(--theme-accent)' : undefined }}
            >
              <span className="truncate">{selectedLabel || placeholder}</span>
              <ChevronDown className="h-5 w-5 shrink-0 text-text/50" />
            </ListboxButton>

            <ListboxOptions className="booking-dropdown booking-scrollbar surface-radius absolute left-0 top-full z-20 mt-2 max-h-60 w-full overflow-auto border border-border bg-bg/95 p-1 shadow-lg backdrop-blur-sm focus:outline-none">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-md px-4 py-2 text-sm text-text/85 transition data-[focus]:bg-accent/15 data-[selected]:bg-accent/20"
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default FormListbox;
