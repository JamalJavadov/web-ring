import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@/data/products.generated';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { StickyBottomBar } from '@/components/product/StickyBottomBar';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { formatPriceAZN } from '@/lib/format';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_NAME } from '@/lib/brand';

export function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const product = products.find((entry) => entry.slug === slug);

    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    usePageMeta(
        product
            ? {
                  title: product.name,
                  description: product.descriptionShort,
                  image: product.images[0],
              }
            : {
                  title: 'Məhsul tapılmadı',
                  description: 'Axtardığınız məhsul mövcud deyil. RingForBaku mağazasından digər modellərə baxın.',
              }
    );

    useEffect(() => {
        if (!product) {
            return;
        }

        const defaults: Record<string, string> = {};
        product.variants?.forEach((variant) => {
            if (variant.options.length > 0) {
                defaults[variant.type] = variant.options[0];
            }
        });
        setSelectedVariants(defaults);
        setQuantity(1);
    }, [product]);

    const variantString = Object.entries(selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

    const structuredData = useMemo(() => {
        if (!product) {
            return null;
        }

        return JSON.stringify(
            {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.name,
                image: product.images,
                description: product.descriptionShort,
                sku: product.id,
                brand: {
                    '@type': 'Brand',
                    name: BRAND_NAME,
                },
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'AZN',
                    price: product.priceAZN,
                    availability: product.inStock
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                    url: typeof window !== 'undefined' ? window.location.href : '',
                },
            },
            null,
            2
        );
    }, [product]);

    if (!product) {
        return (
            <section className="max-w-4xl mx-auto px-4 py-10">
                <EmptyState
                    icon={
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    }
                    title="Məhsul tapılmadı"
                    message="Axtardığınız məhsul mövcud deyil və ya silinib."
                    actionLabel="Mağazaya keç"
                    actionHref="/shop"
                />
            </section>
        );
    }

    const isWishlisted = isInWishlist(product.id);
    const total = product.priceAZN * quantity;

    const whatsappUrl = buildWhatsAppOrderUrl(
        [{ name: product.name, quantity, variant: variantString || undefined }],
        total
    );

    const handleVariantChange = (type: string, value: string) => {
        setSelectedVariants((previous) => ({ ...previous, [type]: value }));
    };

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            variant: variantString || undefined,
            priceAZN: product.priceAZN,
            quantity,
        });
    };

    return (
        <>
            {structuredData && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
            )}

            <section className="max-w-7xl mx-auto px-0 md:px-8 py-6 md:py-10 flex flex-col md:flex-row gap-8 lg:gap-16">
                <div className="w-full md:w-1/2">
                    <ProductGallery images={product.images} productName={product.name} />
                </div>

                <div className="w-full md:w-1/2 px-4 md:px-0 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <ProductInfo
                            product={product}
                            selectedVariants={selectedVariants}
                            onVariantChange={handleVariantChange}
                        />
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className="ml-4 p-2 min-h-[44px] min-w-[44px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label={isWishlisted ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'}
                        >
                            <svg className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col gap-4 mt-8 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-[var(--border)] shrink-0 h-11">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-11 h-11 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
                                    aria-label="Miqdarı azalt"
                                >
                                    −
                                </button>
                                <span className="w-11 h-11 flex items-center justify-center text-sm font-medium border-x border-[var(--border)]">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-11 h-11 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
                                    aria-label="Miqdarı artır"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="flex-1 h-11 bg-white text-black text-sm font-medium uppercase tracking-wider transition-all hover:bg-[var(--accent)] disabled:opacity-40"
                            >
                                {product.inStock ? 'Səbətə əlavə et' : 'Stokda yoxdur'}
                            </button>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 h-11 bg-[#25D366] text-white hover:opacity-90 transition-opacity font-medium tracking-wide"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ilə sifariş
                        </a>
                        <p className="text-xs text-[var(--muted)]">Cəm: {formatPriceAZN(total)}</p>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <ProductAccordion product={product} />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <RelatedProducts currentProduct={product} />
            </div>

            <StickyBottomBar
                product={product}
                quantity={quantity}
                variant={variantString || undefined}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
            />
        </>
    );
}
