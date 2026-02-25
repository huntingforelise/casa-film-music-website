import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'about'>;
};

const AboutPage = ({ page }: TemplateProps) => {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16 lg:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-text md:text-5xl">
        {page.title}
      </h1>
      <div className="mt-6 border-t border-border" />

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default AboutPage;
