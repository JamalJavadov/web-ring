import { InputHTMLAttributes, forwardRef, useId } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = '', ...props }, ref) => {
        const id = useId();

        return (
            <div className={`flex items-center gap-3 min-h-[44px] ${className}`}>
                <div className="relative flex items-center justify-center">
                    <input
                        id={id}
                        type="checkbox"
                        ref={ref}
                        className={`
              appearance-none w-5 h-5 bg-surface border border-border rounded-sm
              checked:bg-accent2 checked:border-accent2
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
                        {...props}
                    />
                    {/* Custom checkmark overlay */}
                    <svg className="absolute w-3 h-3 text-white pointer-events-none peer-checked:block opacity-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: props.checked ? 1 : 0 }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <label htmlFor={id} className="text-sm font-medium text-text cursor-pointer select-none">
                    {label}
                </label>
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
