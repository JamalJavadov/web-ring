import { ReactNode } from 'react';

export interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'accent';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider';

    const variants = {
        default: 'bg-surface text-muted border border-border',
        accent: 'bg-accent2 text-white',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
