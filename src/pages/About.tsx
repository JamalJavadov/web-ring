import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_NAME } from '@/lib/brand';

export function About() {
    usePageMeta({
        title: 'Haqqımızda',
        description: 'RingForBaku hekayəsi, qotik ilhamı və premium aksessuar sənətkarlığı haqqında məlumat.',
    });

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-20 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    {BRAND_NAME}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-white mb-6">
                    Haqqımızda
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto" />
            </header>

            <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase text-white mb-8 text-center">
                    Bizim Hekayəmiz
                </h2>
                <div className="space-y-6 text-muted leading-relaxed text-base sm:text-lg">
                    <p>
                        RingForBaku 2024-cü ildə Bakıda doğulub — qaranlığın estetikasını
                        gündəlik üsluba gətirmək missiyası ilə. Biz inanırıq ki, hər aksessuar bir
                        hekayə danışmalıdır: cəsarətli, sirli və unudulmaz.
                    </p>
                    <p>
                        Brendimiz qotik arxitekturadan, gecə göyünün dərinliyindən və orta əsr
                        sənətkarlığının incəliyindən ilham alır. Hər bir parça qaranlığın zərifliyini
                        əks etdirmək üçün dizayn edilib.
                    </p>
                </div>
            </section>

            <div className="grid sm:grid-cols-2 gap-12 sm:gap-16 mb-20">
                <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="w-12 h-12 border border-border rounded-sm flex items-center justify-center mb-6">
                        <svg
                            className="w-6 h-6 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                            />
                        </svg>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl tracking-widest uppercase text-white mb-4">
                        Sənətkarlıq
                    </h2>
                    <div className="space-y-4 text-muted leading-relaxed">
                        <p>
                            Hər üzüyümüz, hər boyunbağımız əl ilə hazırlanır. Biz kütləvi istehsala
                            deyil, fərdi sənətkarlığa üstünlük veririk. Paslanmaz polad, 925 gümüş
                            və təbii daşlar — yalnız premium materiallar istifadə olunur.
                        </p>
                        <p>
                            Detallara diqqət bizim prinsipimizdir: hər oyma, hər cilalanma müştəriyə
                            çatmadan əvvəl usta tərəfindən yoxlanılır.
                        </p>
                    </div>
                </section>

                <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="w-12 h-12 border border-border rounded-sm flex items-center justify-center mb-6">
                        <svg
                            className="w-6 h-6 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                            />
                        </svg>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl tracking-widest uppercase text-white mb-4">
                        Qotik İlham
                    </h2>
                    <div className="space-y-4 text-muted leading-relaxed">
                        <p>
                            Qotik üslub sadəcə moda deyil — bu, fəlsəfədir. Orta əsr
                            katedralarının naxışları, viktorian dövrünün zərifliyi və müasir
                            minimalizmin birləşməsi bizim dizayn dilimizi formalaşdırır.
                        </p>
                        <p>
                            Kəllə, xaç, ilan və qanad motivləri — hər simvol bir məna daşıyır.
                            RingForBaku ilə siz sadəcə aksessuar taxmırsınız, bir dünyagörüşü
                            ifadə edirsiniz.
                        </p>
                    </div>
                </section>
            </div>

            <section
                className="text-center border-t border-border pt-16 animate-fade-in"
                style={{ animationDelay: '0.8s' }}
            >
                <h2 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase text-white mb-6">
                    Missiyamız
                </h2>
                <p className="text-muted leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                    Hər kəsin öz qaranlıq tərəfini zərifliklə ifadə edə biləcəyi aksessuarlar
                    yaratmaq. Biz keyfiyyət, orijinallıq və cəsarəti bir araya gətiririk — çünki
                    üslub qaydaları pozanlar üçündür.
                </p>
            </section>
        </article>
    );
}
