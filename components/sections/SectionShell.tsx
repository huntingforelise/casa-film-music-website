import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullBleed?: boolean;
}

const SectionShell = ({
  className,
  children,
  id,
  fullBleed = false,
}: SectionShellProps) => {
  return (
    <section id={id} className={clsx('section-spacing', !fullBleed && 'layout-container', className)}>
      {children}
    </section>
  );
};

export default SectionShell;
