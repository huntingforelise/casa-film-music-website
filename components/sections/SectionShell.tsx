import clsx from 'clsx';
import type { ReactNode } from 'react';

type SectionShellVariant = 'default' | 'wide' | 'none';

interface SectionShellProps {
  variant?: SectionShellVariant;
  container?: boolean;
  className?: string;
  children: ReactNode;
}

const spacingClassMap: Record<SectionShellVariant, string | undefined> = {
  default: 'section-spacing',
  wide: 'section-spacing-wide',
  none: undefined,
};

const SectionShell = ({
  variant = 'wide',
  container = true,
  className,
  children,
}: SectionShellProps) => {
  return (
    <section className={clsx(spacingClassMap[variant], container && 'layout-container', className)}>
      {children}
    </section>
  );
};

export default SectionShell;
