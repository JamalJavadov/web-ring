import { Link } from 'react-router-dom';
import { products } from '@/data/products.generated';
import { formatPriceAZN } from '@/lib/format';

const collections = [
    {
        category: 'Üzüklər',
        subtitle: 'Qara metal və gümüş tonlu detailing',
        href: '/shop',
        basePrice: 13,
    },
    {
        category: 'Sepələr',
        subtitle: 'Gothic zəncir və simvolik asqı dizaynları',
        href: '/shop',
        basePrice: 15,
    },
];

export function FeaturedCollections() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <h2 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-center mb-3">
                Kolleksiyalar
            </h2>
            <p className="text-center text-sm text-[var(--muted)] mb-10">
                RingForBaku-da bütün məhsullar əlçatan qiymət və premium görünüş balansı ilə təqdim olunur.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {collections.map((collection) => {
                    const count = products.filter((product) => product.category === collection.category).length;
                    return (
                        <Link
                            key={collection.category}
                            to={collection.href}
                            className="group relative min-h-[220px] md:min-h-[300px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,201,208,0.12),transparent_45%)] opacity-70" />
                            <div className="relative z-10 flex h-full flex-col justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-3">{collection.category}</p>
                                    <h3 className="font-serif text-3xl md:text-4xl tracking-wider text-white mb-3">
                                        {count} model
                                    </h3>
                                    <p className="text-sm text-[var(--muted)] max-w-xs">{collection.subtitle}</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm uppercase tracking-wider text-[var(--muted)]">
                                        Başlanğıc: {formatPriceAZN(collection.basePrice)}
                                    </span>
                                    <span className="text-sm uppercase tracking-wider text-white group-hover:text-[var(--accent)]">
                                        Mağazaya keç
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
