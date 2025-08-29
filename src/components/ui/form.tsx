import * as React from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { cn } from '../../lib/cn';

export { FormProvider };

export function Form({ className, ...props }: React.ComponentProps<'form'>) {
  return <form className={cn('space-y-4', className)} {...props} />;
}

export function FormField({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

export function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{children}</label>;
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="text-sm text-red-500">{children}</p>;
}

