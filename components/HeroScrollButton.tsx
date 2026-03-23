'use client';

type HeroScrollButtonProps = {
  targetId: string;
};

const scrollToTarget = (targetId: string) => {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const HeroScrollButton = ({ targetId }: HeroScrollButtonProps) => {
  const handleClick = () => scrollToTarget(targetId);

  return (
    <button
      type="button"
      aria-label="Scroll to page content"
      onClick={handleClick}
      className="hero-scroll-button"
    >
      <span className="sr-only">Scroll to page content</span>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 10l6 6 6-6" />
      </svg>
    </button>
  );
};

export default HeroScrollButton;
