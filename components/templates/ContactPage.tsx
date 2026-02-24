import SectionRenderer from '../SectionRenderer';
import { Page } from '@/types/page';

export type TemplateProps = {
  page: Page<'contact'>;
};

const ContactPage = ({ page }: TemplateProps) => {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-green-50 py-8">
      <h1 className="text-center text-4xl sm:text-5xl font-bold leading-tight mb-4 text-foreground font-sans relative inline-block">
        {page.title}
        <span className="block h-1 w-240 mx-auto mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
      </h1>

      {page.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default ContactPage;
