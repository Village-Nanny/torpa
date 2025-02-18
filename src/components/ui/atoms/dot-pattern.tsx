'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface DotPatternProps {
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

export function DotPattern({ className, style, animate = false }: DotPatternProps) {
  // Use the animated element only if animate is true; otherwise use a standard SVG element.
  const PatternComponent = animate ? motion.pattern : 'pattern';

  // Conditional animation props
  const animationProps = animate
    ? {
        animate: { rotate: [30, 60, 30] },
        transition: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
      }
    : {};

  return (
    <svg
      className={className}
      style={style}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice">
      <PatternComponent
        id="dotPattern"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
        {...animationProps}>
        <circle cx="2" cy="2" r="2" className="fill-current opacity-50" />
      </PatternComponent>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  );
}
