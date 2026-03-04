import { ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
    const baseStyles = 'bg-surface border border-border overflow-hidden transition-all duration-200';
    const interactiveStyles = onClick ? 'cursor-pointer hover:border-accent hover:-translate-y-0.5 active:scale-[0.99]' : '';

    return (
        <div
            onClick={onClick}
            className={`${baseStyles} ${interactiveStyles} ${className}`}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        >
            {children}
        </div>
    );
}
