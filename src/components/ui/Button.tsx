import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost';
    fullWidth?: boolean;
    children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', fullWidth = false, className = '', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 uppercase tracking-widest text-sm min-h-[44px] px-6 py-2 active:scale-[0.97]';

        const variants = {
            primary: 'bg-accent2 text-white hover:bg-red-800 disabled:opacity-50 disabled:hover:bg-accent2',
            ghost: 'bg-transparent text-text hover:bg-surface border border-transparent hover:border-border disabled:opacity-50',
        };

        const widthStyle = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
