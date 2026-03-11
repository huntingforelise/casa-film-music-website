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
      className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/10 p-3 text-white shadow-[0_0_30px_rgba(0,0,0,0.4)] transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
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
