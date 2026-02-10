import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gray-800 text-text-primary hover:bg-gray-700 border border-border-light-alpha',
        primary: 'bg-accent-purple text-white hover:bg-accent-purple-hover',
        success: 'bg-accent-green text-white hover:bg-accent-green-hover',
        destructive:
          'bg-surface-destructive text-white hover:bg-surface-destructive-hover',
        outline:
          'text-text-primary border border-border-medium-alpha bg-transparent hover:bg-gray-875',
        secondary: 'bg-gray-850 text-text-secondary hover:bg-gray-800',
        ghost: 'hover:bg-gray-850 text-text-secondary',
        link: 'text-accent-purple underline-offset-4 hover:underline hover:text-accent-purple-hover',
        submit: 'bg-accent-green text-white hover:bg-accent-green-hover',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
