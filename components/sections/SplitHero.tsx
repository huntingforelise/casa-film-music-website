import { SplitHeroSection } from '@/types/sections';
import Link from 'next/link';
import SanityImage from '../SanityImage';

interface Props {
  section: SplitHeroSection;
}

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#f4f4f5',
  fontSize: '2rem',
  fontWeight: 'bold',
  textShadow: '0 2px 16px rgba(9,9,11,0.5)',
  zIndex: 2,
};

const SplitHero = ({ section }: Props) => {
  return (
    <section style={{ flex: 1, display: 'flex', minHeight: '100vh' }}>
      {/* OPTION ONE */}
      <Link
        href={section.optionOne.link}
        style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
      >
        <SanityImage
          value={section.optionOne.image}
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />

        <div style={overlayStyle}>{section.optionOne.title}</div>
      </Link>

      {/* OPTION TWO */}
      <Link
        href={section.optionTwo.link}
        style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
      >
        <SanityImage
          value={section.optionTwo.image}
          fill
          style={{ objectFit: 'cover', zIndex: 1 }}
        />

        <div style={overlayStyle}>{section.optionTwo.title}</div>
      </Link>
    </section>
  );
};

export default SplitHero;
