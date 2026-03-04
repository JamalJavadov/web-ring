import { Link } from 'react-router-dom';
import { useCart } from '@/store/CartContext';
import { products } from '@/data/products.generated';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPriceAZN } from '@/lib/format';
import type { OrderLine } from '@/lib/whatsapp';
import { buildMailtoOrderUrl, buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { usePageMeta } from '@/hooks/usePageMeta';

export function Cart() {
    usePageMeta({
        title: 'Səbət',
        description: 'RingForBaku səbəti: məhsul miqdarını dəyişin və WhatsApp ilə sifarişi tamamlayın.',
    });

    const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <EmptyState
                    icon={
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    }
                    title="Səbət boşdur"
                    message="Hazırda səbətinizdə məhsul yoxdur."
                    actionLabel="Mağazaya keç"
                    actionHref="/shop"
                />
            </div>
        );
    }

    const orderLines: OrderLine[] = [];
    items.forEach((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) {
                return;
            }
            orderLines.push({
                name: product.name,
                quantity: item.quantity,
                variant: item.variant,
            });
        });

    const whatsappUrl = buildWhatsAppOrderUrl(orderLines, cartTotal);
    const emailUrl = buildMailtoOrderUrl(orderLines, cartTotal);

    return (
        <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <h1 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-8">Səbət</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 flex flex-col gap-6">
                    {items.map((item) => {
                        const product = products.find((entry) => entry.id === item.productId);
                        if (!product) {
                            return null;
                        }

                        return (
                            <div key={`${item.productId}-${item.variant || 'default'}`} className="flex gap-4 md:gap-6 pb-6 border-b border-[var(--border)]">
                                <Link to={`/product/${product.slug}`} className="w-24 md:w-32 aspect-[4/5] shrink-0 bg-[var(--surface)]">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" width={800} height={1000} />
                                </Link>

                                <div className="flex flex-col flex-1 justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">{product.category}</p>
                                            <Link to={`/product/${product.slug}`} className="font-medium text-white hover:text-[var(--accent)] transition-colors line-clamp-2 md:line-clamp-1">
                                                {product.name}
                                            </Link>
                                            {item.variant && (
                                                <p className="text-sm text-[var(--muted)] mt-1">{item.variant}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId, item.variant)}
                                            className="text-[var(--muted)] hover:text-red-500 transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                            aria-label="Məhsulu sil"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="flex items-center border border-[var(--border)] h-11">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)}
                                                className="w-11 h-11 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
                                                aria-label="Miqdarı azalt"
                                            >
                                                −
                                            </button>
                                            <span className="w-11 h-11 flex items-center justify-center text-sm font-medium border-x border-[var(--border)]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                                                className="w-11 h-11 flex items-center justify-center text-[var(--muted)] hover:text-white transition-colors"
                                                aria-label="Miqdarı artır"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="font-medium text-white md:text-lg">
                                            {formatPriceAZN(item.priceAZN * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <button
                        onClick={clearCart}
                        className="self-start text-sm uppercase tracking-wider text-[var(--muted)] hover:text-white transition-colors flex items-center gap-2 mt-2 min-h-[44px]"
                    >
                        Səbəti sıfırla
                    </button>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-[var(--surface)] border border-[var(--border)] p-6 sticky top-20">
                        <h2 className="font-serif text-xl tracking-widest uppercase mb-6">Sifariş xülasəsi</h2>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between text-[var(--muted)]">
                                <span>Məhsullar</span>
                                <span>{formatPriceAZN(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg text-white border-t border-[var(--border)] pt-4 mt-4">
                                <span>Cəm</span>
                                <span>{formatPriceAZN(cartTotal)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#25D366] text-white text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp ilə sifariş
                            </a>
                            <a
                                href={emailUrl}
                                className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-transparent border border-[var(--border)] text-white text-sm font-medium uppercase tracking-wider hover:bg-[var(--surface)] transition-colors"
                            >
                                E-poçt alternativi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
