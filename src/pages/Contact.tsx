import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_NAME, WHATSAPP_ORDER_URL } from '@/lib/brand';

export function Contact() {
    usePageMeta({
        title: 'Əlaqə',
        description: `${BRAND_NAME} ilə WhatsApp üzərindən birbaşa əlaqə saxlayın və sifarişinizi rəsmiləşdirin.`,
    });

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-14 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">Əlaqə</span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-white mb-6">
                    Bizimlə əlaqə saxlayın
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto mb-6" />
                <p className="text-[var(--muted)] max-w-2xl mx-auto">
                    Sifariş, ölçü və çatdırılma sualları üçün yalnız WhatsApp xəttimiz aktivdir.
                </p>
            </header>

            <section className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="font-serif text-xl tracking-widest uppercase text-white mb-4">WhatsApp dəstəyi</h2>
                <p className="text-sm text-[var(--muted)] mb-6">
                    Düyməyə keçid edərək birbaşa söhbət pəncərəsini açın. Komandamız sifariş və çatdırılma detallarını WhatsApp üzərindən təsdiqləyəcək.
                </p>
                <a
                    href={WHATSAPP_ORDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] w-full px-6 text-sm uppercase tracking-wider bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                >
                    WhatsApp ilə əlaqə
                </a>
            </section>
        </article>
    );
}
