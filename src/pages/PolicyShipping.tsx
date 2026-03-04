import { usePageMeta } from '@/hooks/usePageMeta';

export function PolicyShipping() {
    usePageMeta({
        title: 'Çatdırılma',
        description: 'RingForBaku çatdırılma müddəti, qaydaları və izləmə məlumatları.',
    });

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-16 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    Siyasətlər
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl tracking-widest uppercase text-white mb-6">
                    Çatdırılma Siyasəti
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto" />
            </header>

            <div className="space-y-10 text-muted leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Çatdırılma müddəti
                    </h2>
                    <ul className="space-y-3 list-none">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Bakı daxili: 1–3 iş günü</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Regionlar: 3–7 iş günü</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Xüsusi sifarişlər: 7–14 iş günü (istehsal müddəti daxil)</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Çatdırılma haqqı
                    </h2>
                    <p>
                        Bakı daxili çatdırılma pulsuz. Regionlara çatdırılma haqqı sifariş
                        zamanı hesablanır. 100 AZN-dən yuxarı sifarişlərdə bütün Azərbaycan
                        üzrə çatdırılma pulsuzdur.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Sifariş izləmə
                    </h2>
                    <p>
                        Sifarişiniz göndərildikdən sonra izləmə nömrəsi WhatsApp
                        vasitəsilə paylaşılacaq. Çatdırılma statusunu istənilən vaxt
                        bizdən soruşa bilərsiniz.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Qeydlər
                    </h2>
                    <p>
                        Bayram günləri və yüksək tələb dövrlərində çatdırılma müddəti uzana
                        bilər. Gecikmələr barəsində əvvəlcədən məlumatlandırılacaqsınız.
                    </p>
                </section>
            </div>
        </article>
    );
}
