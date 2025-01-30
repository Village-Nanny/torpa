import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="relative w-full">
        <label
          htmlFor={inputId}
          className={cn(
            'relative block w-full rounded-xl border-2 bg-white/80 backdrop-blur-sm',
            'transition-all duration-200',
            focused
              ? 'border-purple-500/50 shadow-[0_0_0_4px_rgba(168,85,247,0.1)]'
              : error
                ? 'border-red-500/50 bg-red-50/30'
                : 'border-gray-200 hover:border-gray-300'
          )}>
          <input
            aria-label="text"
            id={inputId}
            ref={ref}
            {...props}
            onFocus={e => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              onBlur?.(e);
            }}
            placeholder=" "
            className={cn('w-full bg-transparent pt-6 pb-2 px-5 text-gray-700 focus:outline-none', className)}
          />
          <span
            className={cn(
              'absolute left-5 transition-all duration-200',
              'pointer-events-none select-none origin-top-left',
              focused || props.value ? 'top-2 text-xs scale-90' : 'top-4 text-base',
              focused ? 'text-purple-500' : error ? 'text-red-500' : 'text-gray-400'
            )}>
            {label}
          </span>
        </label>

        {error && <p className="mt-1.5 text-xs text-red-500 pl-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
