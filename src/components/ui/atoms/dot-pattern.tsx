//this is the dot pattern that is used in the background of the page

import React from 'react';
export function DotPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice">
      <pattern
        id="dotPattern"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)">
        <circle cx="3" cy="3" r="3" className="fill-current" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dotPattern)" className="opacity-20" />
    </svg>
  );
}
