import SplitHero from "./sections/SplitHero";

const SectionRenderer =  ({ section }: any) => {
  switch (section._type) {
    case "splitHeroSection":
      return <SplitHero section={section} />;

    default:
      return null;
  }
}

export default SectionRenderer;