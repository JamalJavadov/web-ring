import { useState, useRef, useEffect, type TouchEvent } from 'react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToIndex = (index: number) => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
        setActiveIndex(index);
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            const next = diff > 0
                ? Math.min(activeIndex + 1, images.length - 1)
                : Math.max(activeIndex - 1, 0);
            scrollToIndex(next);
        }
    };

    return (
        <div className="w-full">
            <div
                ref={scrollRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full snap-center"
                    >
                        <div className="aspect-square bg-[var(--surface)] overflow-hidden">
                            <img
                                src={src}
                                alt={`${productName} - ${i + 1}`}
                                className="w-full h-full object-cover"
                                loading={i === 0 ? 'eager' : 'lazy'}
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <div className="flex justify-center gap-2 mt-3">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToIndex(i)}
                                aria-label={`Şəkil ${i + 1}`}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex
                                        ? 'bg-[var(--accent)] w-6'
                                        : 'bg-[var(--border)]'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide px-4 md:px-0">
                        {images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToIndex(i)}
                                className={`flex-shrink-0 w-16 h-16 border-2 overflow-hidden transition-all duration-200 ${i === activeIndex
                                        ? 'border-[var(--accent)] opacity-100'
                                        : 'border-[var(--border)] opacity-60 hover:opacity-90'
                                    }`}
                            >
                                <img
                                    src={src}
                                    alt={`${productName} miniatür ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    width={160}
                                    height={160}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
