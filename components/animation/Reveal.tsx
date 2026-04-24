'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import type { AnchorHTMLAttributes } from 'react';

type RevealVariant = 'up' | 'fade' | 'left' | 'right';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  viewportAmount?: number;
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  viewportAmount?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
};

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
};

type HoverMotionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | 'onDrag'> & {
    children: ReactNode;
  };

type ParentHoverLiftProps = {
  children: ReactNode;
  className?: string;
};

const MotionLink = motion.create(Link) as ComponentType<
  HoverMotionLinkProps & {
    initial?: string;
    whileHover?: string;
  }
>;

const getOffset = (variant: RevealVariant) => {
  switch (variant) {
    case 'left':
      return { x: -28, y: 0 };
    case 'right':
      return { x: 28, y: 0 };
    case 'fade':
      return { x: 0, y: 0 };
    case 'up':
    default:
      return { x: 0, y: 24 };
  }
};

const getRevealVariants = (variant: RevealVariant, delay = 0): Variants => {
  const offset = getOffset(variant);

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration: 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

export const Reveal = ({
  children,
  className,
  delay = 0,
  variant = 'up',
  viewportAmount = 0.2,
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={getRevealVariants(variant, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  className,
  delay = 0,
  style,
  viewportAmount = 0.16,
}: StaggerProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className, variant = 'up' }: StaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={getRevealVariants(variant)}>
      {children}
    </motion.div>
  );
};

export const HoverLift = ({ children, className }: HoverLiftProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const HoverMotionLink = ({ children, className, ...props }: HoverMotionLinkProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Link className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink className={className} initial="rest" whileHover="hover" {...props}>
      {children}
    </MotionLink>
  );
};

export const ParentHoverLift = ({ children, className }: ParentHoverLiftProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        rest: { y: 0 },
        hover: {
          y: -4,
          transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
