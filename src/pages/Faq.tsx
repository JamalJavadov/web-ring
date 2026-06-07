import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    title: string;
    items: FaqItem[];
}

const faqData: FaqCategory[] = [
    {
        title: 'Sifarişlər',
        items: [
            {
                question: 'Necə sifariş verə bilərəm?',
                answer: 'Məhsulu seçin, səbətə əlavə edin və WhatsApp sifariş düyməsindən istifadə edin. Komandamız çatdırılma üçün lazım olan məlumatları WhatsApp vasitəsilə təsdiqləyəcək.',
            },
            {
                question: 'Ödəniş üsulları hansılardır?',
                answer: 'Nağd ödəniş (çatdırılma zamanı), bank köçürməsi və onlayn ödəniş qəbul edirik.',
            },
            {
                question: 'Sifarişimi ləğv edə bilərəm?',
                answer: 'Bəli, sifariş təsdiqlənməzdən əvvəl onu ləğv edə bilərsiniz. Bunun üçün dərhal WhatsApp xəttimizə yazın.',
            },
        ],
    },
    {
        title: 'Ölçülər',
        items: [
            {
                question: 'Üzük ölçümü necə müəyyən edim?',
                answer: 'İpi və ya kağız zolağını barmağınıza dolayıb işarələyin, sonra xətkeşlə ölçün. Diametri millimetrlə bizə göndərin — sizə uyğun ölçünü təklif edəcəyik.',
            },
            {
                question: 'Boyunbağı uzunluqları hansılardır?',
                answer: 'Standart uzunluqlarımız 45 sm, 50 sm və 60 sm-dir. Xüsusi uzunluq sifarişi də qəbul edirik.',
            },
            {
                question: 'Bilərziklərin ölçüsünü dəyişmək olarmı?',
                answer: 'Bəzi modellərdə zəncir uzunluğu tənzimlənə bilir. Məhsul səhifəsindəki təfərrüatlara baxın və ya bizimlə əlaqə saxlayın.',
            },
        ],
    },
    {
        title: 'Materiallar',
        items: [
            {
                question: 'Hansı materiallardan istifadə edirsiniz?',
                answer: 'Bütün məhsullarımız yüksək keyfiyyətli 316L STAINLESS STEEL materialdan hazırlanır.',
            },
            {
                question: 'Məhsullar allergiyaya səbəb olurmu?',
                answer: '316L STAINLESS STEEL gündəlik istifadə üçün rahat və dəri ilə təmasa uyğun materialdır. Xüsusi həssaslığınız varsa, sifarişdən əvvəl bizimlə əlaqə saxlayın.',
            },
            {
                question: 'Rəng dəyişikliyi olurmu?',
                answer: '316L STAINLESS STEEL rəng dəyişikliyinə davamlıdır və düzgün istifadə ilə uzun illər boyu formasını qoruyur.',
            },
        ],
    },
    {
        title: 'Qulluq',
        items: [
            {
                question: 'Aksessuarlarıma necə qulluq edim?',
                answer: 'Məhsullar yağışa, suya və spirtə qarşı dözümlüdür. Təmasdan sonra yumşaq parça ilə qurulamaq kifayətdir.',
            },
            {
                question: 'Su ilə təmasda qala bilərmi?',
                answer: 'Bəli. 316L STAINLESS STEEL suya və yağışa davamlıdır, gündəlik istifadə üçün uyğundur.',
            },
            {
                question: 'Saxlama tövsiyələri nədir?',
                answer: 'Hər aksessuarı ayrıca yumşaq torbada və ya qutumuzdakı astarlı bölmədə saxlayın. Birbaşa günəş işığından uzaq tutun.',
            },
        ],
    },
];

function AccordionItem({ item }: { item: FaqItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={isOpen}
            >
                <span className="text-text text-sm sm:text-base pr-4 group-hover:text-white transition-colors">
                    {item.question}
                </span>
                <svg
                    className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
            >
                <p className="text-muted text-sm leading-relaxed">{item.answer}</p>
            </div>
        </div>
    );
}

export function Faq() {
    usePageMeta({
        title: 'Suallar',
        description: 'RingForBaku sifariş, ölçü, material və qulluqla bağlı suallara cavablar.',
    });

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <header className="text-center mb-16 animate-fade-in">
                <span className="text-xs uppercase tracking-[0.4em] text-accent mb-4 block">
                    Kömək mərkəzi
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-white mb-6">
                    Tez-tez verilən suallar
                </h1>
                <div className="w-16 h-px bg-accent2 mx-auto mb-6" />
                <p className="text-muted max-w-lg mx-auto">
                    Sifariş, ölçü, material və qulluqla bağlı ən çox verilən suallara cavablar.
                </p>
            </header>

            <div className="space-y-12">
                {faqData.map((category, categoryIndex) => (
                    <section
                        key={category.title}
                        className="animate-fade-in"
                        style={{ animationDelay: `${categoryIndex * 0.15}s` }}
                    >
                        <h2 className="font-serif text-xl sm:text-2xl tracking-widest uppercase text-white mb-6">
                            {category.title}
                        </h2>
                        <div className="border-t border-border">
                            {category.items.map((item) => (
                                <AccordionItem key={item.question} item={item} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <section
                className="mt-16 text-center border-t border-border pt-12 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
            >
                <p className="text-muted mb-4">Sualınızın cavabını tapa bilmirsiniz?</p>
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-accent hover:text-white transition-colors"
                >
                    Bizimlə əlaqə saxlayın
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </section>
        </article>
    );
}
