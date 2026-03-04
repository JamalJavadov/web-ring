import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { formatPriceAZN } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
    product: Product;
    onQuickAdd: (product: Product) => void;
}

function resolveBadge(product: Product): { label: string; variant: 'default' | 'accent' } | null {
    if (!product.inStock) return { label: 'Tükənib', variant: 'default' };
    if (product.oldPriceAZN) return { label: 'Endirim', variant: 'accent' };
    if (product.tags.includes('yeni')) return { label: 'Yeni', variant: 'default' };
    return null;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
    const badge = resolveBadge(product);

    return (
        <div className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
            <Link
                to={`/product/${product.slug}`}
                className="relative aspect-[4/5] bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-3 transition-all duration-300 group-hover:border-[var(--accent)]"
            >
                <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-60' : ''}`}
                />

                {badge && (
                    <div className="absolute top-3 left-3">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                )}
            </Link>

            <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
                    {product.category}
                </p>
                <Link
                    to={`/product/${product.slug}`}
                    className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors line-clamp-1"
                >
                    {product.name}
                </Link>
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

            <button
                type="button"
                disabled={!product.inStock}
                onClick={() => onQuickAdd(product)}
                className="mt-3 w-full min-h-[44px] text-xs uppercase tracking-wider border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
                {product.inStock ? 'Səbətə əlavə et' : 'Tükənib'}
            </button>
        </div>
    );
}
