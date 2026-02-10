import * as React from 'react';
import { cn } from '~/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-md border border-border-medium-alpha bg-gray-875 px-3 py-2',
        'text-sm text-text-primary placeholder:text-text-quaternary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50',
        'hover:border-border-heavy-alpha transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className ?? '',
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
