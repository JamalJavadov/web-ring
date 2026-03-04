import { Link } from 'react-router-dom';
import { BRAND_NAME } from '@/lib/brand';
import { Button } from '@/components/ui/Button';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent)] mb-6">
                    {BRAND_NAME}
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-widest uppercase leading-tight text-white mb-6">
                    Qaranlığın Estetikası
                </h1>

                <p className="text-[var(--muted)] text-base sm:text-lg max-w-md mb-10 leading-relaxed">
                    Üslubunuzu qaranlığın zərifliyi ilə tamamlayın. Premium metal üzüklər və sepələr ilə fərqlənin.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link to="/shop">
                        <Button variant="primary" fullWidth>
                            Mağazaya keç
                        </Button>
                    </Link>
                    <Link to="/shop">
                        <Button variant="ghost" fullWidth>
                            İndi sifariş et
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
