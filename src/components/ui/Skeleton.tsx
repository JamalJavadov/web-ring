interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-[var(--surface)] border border-[var(--border)] ${className}`}
        />
    );
}
