import { Link } from 'react-router-dom';
import { products } from '@/data/products.generated';
import { formatPriceAZN } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

const featuredProducts = products.filter((p) => p.featured);
const latestProducts = [...products]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 4);

export function BestSellers() {
    const showcaseProducts = featuredProducts.length > 0 ? featuredProducts : latestProducts;

    if (showcaseProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-center mb-12">
                    Seçilmiş məhsullar
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:gap-6">
                    {showcaseProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            className="group flex-shrink-0 w-[260px] md:w-auto snap-start"
                        >
                            <div className="relative aspect-[4/5] bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-3 transition-all duration-300 group-hover:border-[var(--accent)]">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    loading="lazy"
                                    width={800}
                                    height={1000}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {product.oldPriceAZN && (
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="accent">Endirim</Badge>
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                                    {product.category}
                                </p>
                                <h3 className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors mb-1">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                        {formatPriceAZN(product.priceAZN)}
                                    </span>
                                    {product.oldPriceAZN && (
                                        <span className="text-xs text-[var(--muted)] line-through">
                                            {formatPriceAZN(product.oldPriceAZN)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
