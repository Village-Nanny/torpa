import React from 'react';
import { cn } from '@/src/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms/popover';

interface SelectProps {
  options: Array<{ value: string | number; label: string }>;
  value: string | number;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onFocus, onBlur, onChange, placeholder, error, className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    const selectedOption = options.find(option => option.value.toString() === value?.toString());

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className={cn('relative w-full', className)}>
          <PopoverTrigger
            ref={ref}
            className={cn(
              'w-full rounded-lg border-2 bg-white/80 backdrop-blur-sm',
              'transition-all duration-200 text-left',
              'px-4 py-3 pr-8 text-gray-700',
              focused || open
                ? 'border-purple-500/50 shadow-[0_0_0_4px_rgba(168,85,247,0.1)]'
                : error
                  ? 'border-red-500/50 bg-red-50/30'
                  : 'border-gray-200 hover:border-gray-300'
            )}
            onFocus={() => {
              setFocused(true);
              onFocus();
            }}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}>
            <span className={cn(!selectedOption && 'text-gray-400')}>{selectedOption?.label || placeholder}</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className={cn('w-4 h-4 text-gray-500 transform transition-transform', open ? 'rotate-180' : 'rotate-0')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={4}
            className={cn(
              'w-[var(--radix-popover-trigger-width)] p-0 rounded-lg',
              'bg-white/95 text-gray-700 backdrop-blur-sm'
            )}>
            <div className="max-h-60 overflow-y-auto">
              {options.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value.toString());
                    setOpen(false);
                    setFocused(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm',
                    'hover:bg-purple-50 transition-colors',
                    option.value.toString() === value?.toString() && 'bg-purple-50 text-purple-600'
                  )}>
                  {option.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </div>
      </Popover>
    );
  }
);

Select.displayName = 'Select';

export { Select };
