import { useState, useMemo } from 'react';
import { products } from '@/data/products.generated';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Drawer } from '@/components/ui/Drawer';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/CartContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatPriceAZN } from '@/lib/format';

type SortOption = 'newest' | 'price-asc' | 'price-desc';

const allCategories = [...new Set(products.map((p) => p.category))];
const allTags = [...new Set(products.flatMap((p) => p.tags))];
const allMaterials = [...new Set(products.flatMap((p) => p.materials))];

const PRICE_MIN = 0;
const PRICE_MAX = products.length > 0 ? Math.ceil(Math.max(...products.map((p) => p.priceAZN))) : 0;

function sortProducts(items: Product[], sortBy: SortOption): Product[] {
    const sorted = [...items];
    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'price-asc':
            return sorted.sort((a, b) => a.priceAZN - b.priceAZN);
        case 'price-desc':
            return sorted.sort((a, b) => b.priceAZN - a.priceAZN);
        default:
            return sorted;
    }
}

export function Shop() {
    usePageMeta({
        title: 'Mağaza',
        description: 'RingForBaku mağazasında premium gothic üzüklər və sepələr üçün filtrləmə və sürətli səbətə əlavə etmə imkanı.',
    });

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { addToCart } = useCart();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [priceMax, setPriceMax] = useState(PRICE_MAX);

    const [isLoading] = useState(false);

    function toggleArrayItem(arr: string[], item: string): string[] {
        return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
    }

    function resetFilters() {
        setSelectedCategories([]);
        setSelectedTags([]);
        setSelectedMaterials([]);
        setOnlyInStock(false);
        setPriceMax(PRICE_MAX);
    }

    const activeFilterCount =
        selectedCategories.length +
        selectedTags.length +
        selectedMaterials.length +
        (onlyInStock ? 1 : 0) +
        (priceMax < PRICE_MAX ? 1 : 0);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (search.trim()) {
            const query = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.tags.some((t) => t.toLowerCase().includes(query))
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.category));
        }

        if (selectedTags.length > 0) {
            result = result.filter((p) => p.tags.some((t) => selectedTags.includes(t)));
        }

        if (selectedMaterials.length > 0) {
            result = result.filter((p) => p.materials.some((m) => selectedMaterials.includes(m)));
        }

        if (onlyInStock) {
            result = result.filter((p) => p.inStock);
        }

        result = result.filter((p) => p.priceAZN <= priceMax);

        return sortProducts(result, sortBy);
    }, [search, sortBy, selectedCategories, selectedTags, selectedMaterials, onlyInStock, priceMax]);

    function handleQuickAdd(product: Product) {
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
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
            <h1 className="font-serif text-3xl md:text-4xl tracking-widest uppercase text-center mb-8">
                Mağaza
            </h1>

            <div className="sticky top-16 z-20 bg-[var(--bg)] border-b border-[var(--border)] -mx-4 px-4 py-3 flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Axtar..."
                        className="w-full min-h-[44px] pl-10 pr-4 bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setIsFilterOpen(true)}
                    className="relative min-h-[44px] min-w-[44px] flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label="Filtrlər"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent2)] text-white text-[10px] flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="min-h-[44px] px-3 bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none cursor-pointer"
                    aria-label="Sırala"
                >
                    <option value="newest">Ən yeni</option>
                    <option value="price-asc">Qiymət ↑</option>
                    <option value="price-desc">Qiymət ↓</option>
                </select>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="aspect-[4/5]" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
                    <svg className="w-16 h-16 text-[var(--border)] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <h2 className="font-serif text-xl tracking-widest uppercase text-white mb-2">Məhsul tapılmadı</h2>
                    <p className="text-sm text-[var(--muted)] max-w-xs">Filtrləri dəyişdirin və ya axtarışı yeniləyin.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickAdd={handleQuickAdd}
                        />
                    ))}
                </div>
            )}

            <Drawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                title="Filtrlər"
            >
                <div className="flex flex-col gap-6 pb-24">
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-3">Kateqoriya</h3>
                        <div className="flex flex-col gap-2">
                            {allCategories.map((cat) => (
                                <Checkbox
                                    key={cat}
                                    label={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => setSelectedCategories(toggleArrayItem(selectedCategories, cat))}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-3">Qiymət (maks)</h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={1}
                                value={priceMax}
                                onChange={(e) => setPriceMax(Number(e.target.value))}
                                className="flex-1 accent-[var(--accent)]"
                            />
                            <span className="text-sm text-[var(--muted)] min-w-[60px] text-right">
                                {formatPriceAZN(priceMax)}
                            </span>
                        </div>
                    </div>

                    <Checkbox
                        label="Yalnız stokda olanlar"
                        checked={onlyInStock}
                        onChange={() => setOnlyInStock(!onlyInStock)}
                    />

                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-3">Etiketlər</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTags(toggleArrayItem(selectedTags, tag))}
                                    className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${selectedTags.includes(tag)
                                        ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
                                        : 'bg-transparent text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)]'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-3">Materiallar</h3>
                        <div className="flex flex-col gap-2">
                            {allMaterials.map((mat) => (
                                <Checkbox
                                    key={mat}
                                    label={mat}
                                    checked={selectedMaterials.includes(mat)}
                                    onChange={() => setSelectedMaterials(toggleArrayItem(selectedMaterials, mat))}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-[var(--bg)] border-t border-[var(--border)] flex gap-3">
                    <Button variant="ghost" fullWidth onClick={resetFilters}>
                        Sıfırla
                    </Button>
                    <Button variant="primary" fullWidth onClick={() => setIsFilterOpen(false)}>
                        Tətbiq et ({filteredProducts.length})
                    </Button>
                </div>
            </Drawer>
        </div>
    );
}
