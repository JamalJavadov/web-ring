import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_NAME } from '@/lib/brand';

export function PolicyTerms() {
    usePageMeta({
        title: 'Şərtlər',
        description: 'RingForBaku istifadə şərtləri, hüquq və məsuliyyət bölmələri.',
    });

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-16 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    Siyasətlər
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl tracking-widest uppercase text-white mb-6">
                    İstifadə Şərtləri
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto" />
            </header>

            <div className="space-y-10 text-muted leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Ümumi şərtlər
                    </h2>
                    <p>
                        Bu veb-saytdan istifadə etməklə aşağıdakı şərtləri qəbul edirsiniz.
                        Şərtlərlə razı deyilsinizsə, xahiş edirik saytdan istifadə etməyin.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Məhsullar və qiymətlər
                    </h2>
                    <p>
                        Bütün qiymətlər AZN ilə göstərilir və dəyişdirilə bilər. Məhsul
                        şəkilləri və təsvirləri mümkün qədər dəqiq olsa da, kiçik rəng və
                        ölçü fərqləri ola bilər. Stok məhdud olduğundan, bəzi məhsullar
                        qəflətən tükənə bilər.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Əqli mülkiyyət
                    </h2>
                    <p>
                        Bu saytdakı bütün məzmun — o cümlədən şəkillər, mətnlər, loqo və
                        dizaynlar — {BRAND_NAME}-a məxsusdur. İcazəsiz istifadə,
                        kopyalama və ya yayımlanma qadağandır.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Məsuliyyətin məhdudlaşdırılması
                    </h2>
                    <p>
                        {BRAND_NAME} saytın fasiləsiz və ya xətasız işləməsinə
                        zəmanət vermir. Texniki nasazlıqlardan və ya üçüncü tərəf
                        xidmətlərindən yaranan zərərə görə məsuliyyət daşımırıq.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-lg tracking-widest uppercase text-white mb-4">
                        Dəyişikliklər
                    </h2>
                    <p>
                        Bu şərtlər əvvəlcədən xəbərdarlıq etmədən dəyişdirilə bilər.
                        Saytdan davam edən istifadəniz yenilənmiş şərtləri qəbul etdiyiniz
                        anlamına gəlir.
                    </p>
                </section>
            </div>
        </article>
    );
}
