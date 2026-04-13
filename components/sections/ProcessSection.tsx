import type { ProcessSection as ProcessSectionType } from '@/types/sections';

import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: ProcessSectionType;
}

const ProcessSection = ({ section }: Props) => {
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;
  const steps = (section.steps ?? []).map((step) => step.trim()).filter(Boolean);

  if (!steps.length) {
    return null;
  }

  const content = (
    <div className="layout-container relative z-10">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          return (
            <article
              key={`${step}-${stepNumber}`}
              className="group flex h-full items-center gap-4 rounded-[1.75rem] border border-black/10 bg-surface/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] hover:ring-accent/20 sm:p-6"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg text-fluid-body-sm font-semibold text-text shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 group-hover:border-accent/60 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
                aria-hidden="true"
              >
                {stepNumber}
              </div>

              <div className="min-w-0">
                <p className="section-copy text-text/85">{step}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  return <SectionShell id="process">{content}</SectionShell>;
};

export default ProcessSection;
