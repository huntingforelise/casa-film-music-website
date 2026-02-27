import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'about'>;
};

const AboutPage = ({ page }: TemplateProps) => {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-28 md:pb-16 md:pt-32 lg:pb-24 lg:pt-36">
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
