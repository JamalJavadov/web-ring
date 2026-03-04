import { Link } from 'react-router-dom';
import { BRAND_EMAIL, BRAND_NAME, WHATSAPP_ORDER_URL } from '@/lib/brand';

const navLinks = [
    { to: '/', label: 'Ana səhifə' },
    { to: '/shop', label: 'Mağaza' },
    { to: '/cart', label: 'Səbət' },
    { to: '/about', label: 'Haqqımızda' },
    { to: '/contact', label: 'Əlaqə' },
    { to: '/faq', label: 'Suallar' },
];

const policyLinks = [
    { to: '/policies/shipping', label: 'Çatdırılma' },
    { to: '/policies/returns', label: 'Qaytarma' },
    { to: '/policies/privacy', label: 'Məxfilik' },
    { to: '/policies/terms', label: 'Şərtlər' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <Link
                            to="/"
                            className="font-serif text-2xl tracking-widest uppercase text-white hover:text-[var(--accent)] transition-colors"
                        >
                            {BRAND_NAME}
                        </Link>
                        <p className="text-sm text-[var(--muted)] mt-4 leading-relaxed max-w-sm">
                            Premium gothic üslubunda üzüklər və sepələr. Mobil-first alış təcrübəsi və sürətli sifariş üçün WhatsApp xəttimiz aktivdir.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-white mb-4">Naviqasiya</h3>
                        <ul className="grid grid-cols-2 gap-y-2">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-[var(--muted)] hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-white mb-4">Sifariş və siyasətlər</h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={WHATSAPP_ORDER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm uppercase tracking-wider bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                            >
                                WhatsApp ilə sifariş
                            </a>
                            <a
                                href={`mailto:${BRAND_EMAIL}`}
                                className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm uppercase tracking-wider border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                            >
                                E-poçt ilə yazın
                            </a>
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-y-2">
                            {policyLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-[var(--muted)] hover:text-white transition-colors min-h-[44px] inline-flex items-center"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-xs text-[var(--muted)]">&copy; {currentYear} {BRAND_NAME}</p>
                    <p className="text-xs text-[var(--muted)]">Qaranlıq estetika, premium detal, RingForBaku imzası.</p>
                </div>
            </div>
        </footer>
    );
}
