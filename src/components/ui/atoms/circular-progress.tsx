'use client';

import React from 'react';

interface CircularProgressProps {
  value: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label: string;
  labelColor?: string;
}

export function CircularProgress({
  value,
  total,
  size = 120,
  strokeWidth = 12,
  color = '#22c55e',
  backgroundColor = '#e2e8f0',
  label,
  labelColor = '#1f2937',
}: CircularProgressProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at center, white, ${backgroundColor}05)`,
        }}>
        {/* Glassy background effect */}
        <div
          className="absolute inset-2 rounded-full opacity-50"
          style={{
            background: `linear-gradient(145deg, ${backgroundColor}40, transparent)`,
          }}
        />

        {/* SVG Progress */}
        <svg
          className="rotate-[-90deg] absolute"
          width={size}
          height={size}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.1))',
            }}
          />
        </svg>

        {/* Center content */}
        <div className="relative flex flex-col items-center justify-center z-10" style={{ color: labelColor }}>
          <span className="text-2xl font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            {value}/{total}
          </span>
        </div>
      </div>
      <span
        className="mt-3 font-medium text-sm"
        style={{
          color: labelColor,
          textShadow: '0 1px 2px rgba(255,255,255,0.5)',
        }}>
        {label}
      </span>
    </div>
  );
}
