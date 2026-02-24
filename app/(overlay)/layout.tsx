import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OverlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="overlay" />
      {children}
      <Footer />
    </>
  );
};

export default OverlayLayout;
