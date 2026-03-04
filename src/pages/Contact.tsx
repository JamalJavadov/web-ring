import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_EMAIL, BRAND_NAME, WHATSAPP_ORDER_URL } from '@/lib/brand';

export function Contact() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    usePageMeta({
        title: 'Əlaqə',
        description: `${BRAND_NAME} ilə əlaqə saxlayın. WhatsApp sifariş xətti və e-poçt alternativi ilə sürətli geri dönüş alın.`,
    });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const subject = encodeURIComponent(`${BRAND_NAME} — əlaqə müraciəti`);
        const body = encodeURIComponent(
            `Ad/Soyad: ${fullName}
Telefon: ${phone}
Ünvan: ${address}

Mesaj:
${message}`
        );
        window.location.href = `mailto:${BRAND_EMAIL}?subject=${subject}&body=${body}`;
    }

    return (
        <article className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-14 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">Əlaqə</span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-white mb-6">
                    Bizimlə əlaqə saxlayın
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto mb-6" />
                <p className="text-[var(--muted)] max-w-2xl mx-auto">
                    Sifariş, ölçü və çatdırılma sualları üçün birbaşa WhatsApp xəttimizdən istifadə edin. Alternativ olaraq formanı doldurub e-poçtla müraciət edə bilərsiniz.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14">
                <section className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                    <h2 className="font-serif text-xl tracking-widest uppercase text-white mb-4">Sürətli sifariş</h2>
                    <p className="text-sm text-[var(--muted)] mb-6">
                        WhatsApp düyməsi ilə birbaşa sifariş söhbətinə keçin.
                    </p>
                    <a
                        href={WHATSAPP_ORDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center min-h-[44px] w-full px-6 text-sm uppercase tracking-wider bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                    >
                        WhatsApp ilə sifariş
                    </a>
                    <a
                        href={`mailto:${BRAND_EMAIL}`}
                        className="inline-flex items-center justify-center min-h-[44px] w-full px-6 text-sm uppercase tracking-wider border border-[var(--border)] text-white hover:border-[var(--accent)] transition-colors mt-3"
                    >
                        E-poçt alternativi
                    </a>
                </section>

                <section className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
                    <h2 className="font-serif text-xl tracking-widest uppercase text-white mb-6">Mesaj formu</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="contact-name" className="text-sm text-[var(--text)]">
                                Ad/Soyad
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                required
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-sm px-4 py-2.5 min-h-[44px] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="contact-phone" className="text-sm text-[var(--text)]">
                                Telefon
                            </label>
                            <input
                                id="contact-phone"
                                type="tel"
                                required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-sm px-4 py-2.5 min-h-[44px] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="contact-address" className="text-sm text-[var(--text)]">
                                Ünvan
                            </label>
                            <input
                                id="contact-address"
                                type="text"
                                required
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-sm px-4 py-2.5 min-h-[44px] focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="contact-message" className="text-sm text-[var(--text)]">
                                Mesaj
                            </label>
                            <textarea
                                id="contact-message"
                                required
                                rows={5}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-sm px-4 py-2.5 focus-visible:outline-none focus-visible:border-[var(--accent)] focus-visible:ring-1 focus-visible:ring-[var(--accent)] transition-colors resize-none"
                            />
                        </div>
                        <Button type="submit" variant="primary" fullWidth>
                            Göndər
                        </Button>
                    </form>
                </section>
            </div>
        </article>
    );
}
