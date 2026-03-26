import clsx from 'clsx';
import type { ReactNode } from 'react';

type SectionShellVariant = 'default' | 'wide' | 'none';

interface SectionShellProps {
  children: ReactNode;
  variant?: SectionShellVariant;
  container?: boolean;
  className?: string;
  id?: string;
}

const spacingClassMap: Record<SectionShellVariant, string | undefined> = {
  default: 'section-spacing',
  wide: 'section-spacing-wide',
  none: undefined,
};

const SectionShell = ({
  variant = 'default',
  container = true,
  className,
  children,
  id,
}: SectionShellProps) => {
  return (
    <section
      id={id}
      className={clsx(spacingClassMap[variant], container && 'layout-container', className)}
    >
      {children}
    </section>
  );
};

export default SectionShell;
