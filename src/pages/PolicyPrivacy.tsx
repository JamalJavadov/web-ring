import { usePageMeta } from '@/hooks/usePageMeta';

export function PolicyPrivacy() {
    usePageMeta({
        title: 'Məxfilik',
        description: 'RingForBaku məxfilik siyasəti və şəxsi məlumatların qorunması.',
    });

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-16 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    Siyasətlər
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl tracking-widest uppercase text-white mb-6">
                    Məxfilik siyasəti
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto" />
            </header>

            <div className="space-y-10 text-muted leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Toplanan məlumatlar
                    </h2>
                    <p>
                        Sifariş zamanı adınız, WhatsApp əlaqə nömrəniz və çatdırılma
                        ünvanınız toplanır. Bu məlumatlardan yalnız sifarişinizi emal etmək və
                        çatdırılmanı təmin etmək üçün istifadə olunur.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Məlumatların istifadəsi
                    </h2>
                    <ul className="space-y-3 list-none">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Sifarişlərin emalı və çatdırılması</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Müştəri dəstəyi və əlaqə</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent2 mt-2 flex-shrink-0" />
                            <span>Yalnız razılığınız olduqda yenilik və kampaniyalar haqqında bildirişlər</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Üçüncü tərəflər
                    </h2>
                    <p>
                        Şəxsi məlumatlarınız heç bir üçüncü tərəfə satılmır və
                        paylaşılmır. Yalnız çatdırılma üzrə tərəfdaşlarımızla zəruri
                        məlumatlar paylaşılır.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Məlumat təhlükəsizliyi
                    </h2>
                    <p>
                        Məlumatlarınızı qorumaq üçün müasir təhlükəsizlik tədbirləri
                        tətbiq edirik. Bununla belə, internet üzərindən məlumat
                        ötürülməsi heç vaxt 100% təhlükəsiz ola bilməz.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Sizin hüquqlarınız
                    </h2>
                    <p>
                        İstənilən vaxt məlumatlarınızın düzəldilməsini, silinməsini və ya
                        emalın dayandırılmasını tələb edə bilərsiniz. Bunun üçün bizimlə
                        əlaqə saxlayın.
                    </p>
                </section>
            </div>
        </article>
    );
}
