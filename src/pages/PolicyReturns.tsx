import { usePageMeta } from '@/hooks/usePageMeta';

export function PolicyReturns() {
    usePageMeta({
        title: 'Qaytarma',
        description: 'RingForBaku qaytarma və dəyişdirmə siyasəti.',
    });

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-16 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    Siyasətlər
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl tracking-widest uppercase text-white mb-6">
                    Qaytarma Siyasəti
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto" />
            </header>

            <div className="space-y-10 text-muted leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Qaytarma şərtləri
                    </h2>
                    <p>
                        Məhsulu aldıqdan sonra 14 gün ərzində qaytara bilərsiniz. Qaytarılan
                        məhsul istifadə olunmamış, orijinal qablaşdırmasında və etiketləri
                        qorunmuş vəziyyətdə olmalıdır.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Qaytarılmayan məhsullar
                    </h2>
                    <ul className="space-y-3 list-none">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Xüsusi sifariş əsasında hazırlanmış məhsullar</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>İstifadə olunmuş və ya zədələnmiş məhsullar</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Endirimli məhsullar (son satış)</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Qaytarma prosesi
                    </h2>
                    <ol className="space-y-3 list-none counter-reset-none">
                        <li className="flex items-start gap-3">
                            <span className="text-accent2 font-serif text-sm mt-0.5 flex-shrink-0">01.</span>
                            <span>WhatsApp vasitəsilə bizimlə əlaqə saxlayın</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent2 font-serif text-sm mt-0.5 flex-shrink-0">02.</span>
                            <span>Sifariş nömrəsini və qaytarma səbəbini bildirin</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent2 font-serif text-sm mt-0.5 flex-shrink-0">03.</span>
                            <span>Təsdiq aldıqdan sonra məhsulu göndərin</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-accent2 font-serif text-sm mt-0.5 flex-shrink-0">04.</span>
                            <span>Geri ödəniş 5–7 iş günü ərzində həyata keçirilir</span>
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Dəyişdirmə
                    </h2>
                    <p>
                        Ölçü uyğun gəlmirsə, mövcud olduğu halda dəyişdirmə mümkündür.
                        Dəyişdirmə üçün əlavə çatdırılma haqqı tətbiq oluna bilər.
                    </p>
                </section>
            </div>
        </article>
    );
}
