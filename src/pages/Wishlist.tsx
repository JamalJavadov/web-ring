import { Link } from 'react-router-dom';
import { useWishlist } from '@/store/WishlistContext';
import { useCart } from '@/store/CartContext';
import { products } from '@/data/products.generated';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPriceAZN } from '@/lib/format';
import { usePageMeta } from '@/hooks/usePageMeta';

export function Wishlist() {
    usePageMeta({
        title: 'Seçilmişlər',
        description: 'RingForBaku seçilmiş məhsullar siyahısı və sürətli səbətə əlavə etmə.',
    });

    const { items: wishlistItems, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <EmptyState
                    icon={
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    }
                    title="Seçilmişlər boşdur"
                    message="İstədiyiniz məhsulları seçilmişlərə əlavə edərək burada baxa bilərsiniz."
                    actionLabel="Mağazaya keç"
                    actionHref="/shop"
                />
            </div>
        );
    }

    const handleMoveToCart = (productId: string | number) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        let variantString: string | undefined = undefined;
        if (product.variants && product.variants.length > 0) {
            const defaults = product.variants.map(v => `${v.type}: ${v.options[0]}`);
            variantString = defaults.join(', ');
        }

        addToCart({
            productId: product.id,
            variant: variantString,
            priceAZN: product.priceAZN,
            quantity: 1
        });

        // Remove from wishlist after moving
        toggleWishlist(productId);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <h1 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-8 text-center md:text-left">
                Seçilmişlər
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlistItems.map((id) => {
                    const product = products.find((p) => p.id === id);
                    if (!product) return null;

                    return (
                        <div key={id} className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="relative aspect-[4/5] bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-3 transition-all duration-300 group-hover:border-[var(--accent)]">
                                <Link to={`/product/${product.slug}`}>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        loading="lazy"
                                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-60' : ''}`}
                                    />
                                </Link>

                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-3 right-3 p-1.5 bg-[var(--surface)] border border-[var(--border)] text-white hover:text-red-500 hover:border-red-500 transition-colors z-10"
                                    aria-label="Sil"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
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
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={!product.inStock}
                                onClick={() => handleMoveToCart(product.id)}
                                className="mt-3 w-full min-h-[44px] text-xs uppercase tracking-wider border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {product.inStock ? 'Səbətə köçür' : 'Tükənib'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
