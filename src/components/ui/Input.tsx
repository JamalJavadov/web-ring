import { InputHTMLAttributes, forwardRef, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        const id = useId();

        return (
            <div className={`flex flex-col gap-1.5 ${className}`}>
                <label htmlFor={id} className="text-sm font-medium text-text">
                    {label}
                </label>
                <input
                    id={id}
                    ref={ref}
                    className={`
            bg-surface border text-text rounded-sm px-4 py-2.5 min-h-[44px]
            focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent
            transition-colors
            ${error ? 'border-accent2' : 'border-border hover:border-muted'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...props}
                />
                {error && (
                    <p id={`${id}-error`} className="text-xs text-accent2 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
