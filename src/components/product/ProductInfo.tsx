import { Badge } from '@/components/ui/Badge';
import { formatPriceAZN } from '@/lib/format';
import { type Product } from '@/types/product';

interface ProductInfoProps {
    product: Product;
    selectedVariants: Record<string, string>;
    onVariantChange: (type: string, value: string) => void;
}

export function ProductInfo({ product, selectedVariants, onVariantChange }: ProductInfoProps) {
    return (
        <div className="space-y-5">
            <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
                {product.category}
            </p>

            <h1 className="font-serif text-2xl md:text-3xl tracking-widest uppercase">
                {product.name}
            </h1>

            <div className="flex items-center gap-3">
                <span className="text-xl font-medium text-white">
                    {formatPriceAZN(product.priceAZN)}
                </span>
                {product.oldPriceAZN && (
                    <span className="text-sm text-[var(--muted)] line-through">
                        {formatPriceAZN(product.oldPriceAZN)}
                    </span>
                )}
                {product.oldPriceAZN && (
                    <Badge variant="accent">Endirim</Badge>
                )}
            </div>

            <div className="flex items-center gap-2">
                <span
                    className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}
                />
                <span className="text-sm text-[var(--muted)]">
                    {product.inStock ? 'Stokda var' : 'Stokda yoxdur'}
                </span>
            </div>

            <p className="text-sm text-[var(--muted)] leading-relaxed">
                {product.descriptionShort}
            </p>

            {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 pt-2">
                    {product.variants.map((variant) => (
                        <div key={variant.type}>
                            <label className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                                {variant.label}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {variant.options.map((option) => {
                                    const isSelected = selectedVariants[variant.type] === option;
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => onVariantChange(variant.type, option)}
                                            className={`px-4 py-2 text-sm border transition-all duration-200 ${isSelected
                                                ? 'border-[var(--accent)] text-white bg-[var(--surface)]'
                                                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-white'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
