import { Link } from 'react-router-dom';
import { products } from '@/data/products.generated';
import { formatPriceAZN } from '@/lib/format';
import { type Product } from '@/types/product';

interface RelatedProductsProps {
    currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
    const related = products
        .filter(
            (p) =>
                p.id !== currentProduct.id &&
                (p.category === currentProduct.category ||
                    p.tags.some((t) => currentProduct.tags.includes(t)))
        )
        .slice(0, 4);

    if (related.length === 0) return null;

    return (
        <section className="mt-16 md:mt-24">
            <h2 className="font-serif text-xl md:text-2xl tracking-widest uppercase text-center mb-8">
                Bənzər məhsullar
            </h2>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:gap-6">
                {related.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="group flex-shrink-0 w-[200px] md:w-auto snap-start"
                    >
                        <div className="relative aspect-[4/5] bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-3 transition-all duration-300 group-hover:border-[var(--accent)]">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                            {product.category}
                        </p>
                        <h3 className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors mb-1">
                            {product.name}
                        </h3>
                        <span className="text-sm font-medium text-white">
                            {formatPriceAZN(product.priceAZN)}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
