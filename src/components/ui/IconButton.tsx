import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ children, className = '', ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 min-h-[44px] min-w-[44px] rounded-full text-text hover:text-accent hover:bg-surface active:scale-95 disabled:opacity-50';

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';
