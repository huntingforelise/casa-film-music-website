import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OverlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="overlay" />
      {children}
      <Footer />
    </>
  );
}
