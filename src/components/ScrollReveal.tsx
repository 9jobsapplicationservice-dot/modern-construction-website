'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type AnimationVariant =
  | 'fadeUp'
  | 'fadeIn'
  | 'fadeLeft'
  | 'fadeRight'
  | 'fadeDown'
  | 'slideTop'
  | 'slideBottom'
  | 'zoomIn'
  | 'scrollReveal';

// Custom cubic-bezier easing for that premium, luxury "slow-start fast-glide slow-end" feel.
const luxuryTransition = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.85
};

const variants: Record<AnimationVariant, any> = {
  fadeUp: {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 45 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: -45 },
    visible: { opacity: 1, x: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -35 },
    visible: { opacity: 1, y: 0 }
  },
  slideTop: {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0 }
  },
  slideBottom: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 }
  },
  scrollReveal: {
    hidden: { opacity: 0, clipPath: 'inset(12% 0 12% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0% 0 0% 0)' }
  }
};

interface ScrollAnimateProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.85,
  className = '',
  viewportMargin = '-10px',
  once = true
}) => {
  const chosenVariant = variants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={chosenVariant}
      transition={{
        ...luxuryTransition,
        duration,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delayChildren = 0,
  staggerChildren = 0.12,
  className = '',
  viewportMargin = '-10px',
  once = true
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  className?: string;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  variant = 'fadeUp',
  className = '',
  duration = 0.85
}) => {
  const chosenVariant = variants[variant];
  return (
    <motion.div
      variants={chosenVariant}
      transition={{
        ...luxuryTransition,
        duration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverScaleProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverScale: React.FC<HoverScaleProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -6, borderColor: '#0B2341', boxShadow: '0 15px 30px -10px rgba(11, 35, 65, 0.12)' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MagneticProps {
  children: React.ReactElement;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
