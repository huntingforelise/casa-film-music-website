import type { QuoteSection as QuoteSectionType } from '@/types/sections';

import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

interface Props {
  section: QuoteSectionType;
}

const QuoteSection = ({ section }: Props) => {
  const quote = section.quote.trim();
  const author = section.author.trim();
  const year = Number.isFinite(section.year) ? section.year : null;
  const eyebrow = section.eyebrow?.trim();
  const title = section.title?.trim();
  const intro = section.intro;

  if (!quote || !author || year === null) {
    return null;
  }

  return (
    <SectionShell>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,149,85,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(18,18,18,0.08),transparent_36%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-5">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

        <p className="quote-section-text italic" style={{ textWrap: 'balance' }}>
          &ldquo;{quote}&rdquo;
        </p>

        <p className="self-end text-right text-fluid-body-sm font-medium not-italic tracking-[0.06em] text-80 sm:text-fluid-body">
          - {author}, {year}
        </p>
      </div>
    </SectionShell>
  );
};

export default QuoteSection;
