import { Link } from 'react-router-dom';

export function EmptyState({
    icon,
    title,
    message,
    actionLabel,
    actionHref,
}: {
    icon: React.ReactNode;
    title: string;
    message: string;
    actionLabel?: string;
    actionHref?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in-up">
            <div className="text-[var(--border)] mb-6">{icon}</div>
            <h2 className="font-serif text-xl tracking-widest uppercase text-white mb-2">{title}</h2>
            <p className="text-sm text-[var(--muted)] max-w-xs mb-6">{message}</p>
            {actionLabel && actionHref && (
                <Link
                    to={actionHref}
                    className="inline-flex items-center justify-center min-h-[44px] px-6 text-sm uppercase tracking-widest font-medium bg-[var(--accent2)] text-white hover:bg-red-800 active:scale-[0.97] transition-all duration-200"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
