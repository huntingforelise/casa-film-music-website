import clsx from 'clsx';
import type { ReactNode } from 'react';

type SectionShellVariant = 'default' | 'bottom' | 'wide';

interface SectionShellProps {
  children: ReactNode;
  variant?: SectionShellVariant;
  className?: string;
  id?: string;
  fullBleed?: boolean;
}

const spacingClassMap: Record<SectionShellVariant, string> = {
  default: 'section-spacing',
  bottom: 'section-spacing-bottom',
  wide: 'section-spacing-wide',
};

const SectionShell = ({
  variant = 'default',
  className,
  children,
  id,
  fullBleed = false,
}: SectionShellProps) => {
  return (
    <section id={id} className={clsx(spacingClassMap[variant], !fullBleed && 'layout-container', className)}>
      {children}
    </section>
  );
};

export default SectionShell;
