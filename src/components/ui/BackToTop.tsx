import { useEffect, useState } from 'react';

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setVisible(window.scrollY > 400);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Yuxarı qayıt"
            className={`md:hidden fixed right-4 bottom-20 z-40 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] shadow-lg transition-all duration-300 active:scale-95 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    );
}
