import { SelectHTMLAttributes, forwardRef, useId } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, className = '', ...props }, ref) => {
        const id = useId();

        return (
            <div className={`flex flex-col gap-1.5 ${className}`}>
                <label htmlFor={id} className="text-sm font-medium text-text">
                    {label}
                </label>
                <div className="relative">
                    <select
                        id={id}
                        ref={ref}
                        className={`
              appearance-none w-full bg-surface border text-text rounded-sm px-4 py-2.5 min-h-[44px]
              focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent
              transition-colors cursor-pointer
              ${error ? 'border-accent2' : 'border-border hover:border-muted'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        {...props}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                {error && (
                    <p id={`${id}-error`} className="text-xs text-accent2 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
