import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const alertVariants = cva(
  'relative w-full rounded-md border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[1.25rem_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'text-red-600 border-red-200 bg-red-50 dark:text-red-200 dark:border-red-900 dark:bg-red-950/30',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('col-start-2 font-medium tracking-tight', className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-muted-foreground col-start-2 text-sm', className)} {...props} />;
}

