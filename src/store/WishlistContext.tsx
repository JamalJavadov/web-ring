import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WishlistContextType {
    items: Array<string | number>; // Array of product IDs
    toggleWishlist: (productId: string | number) => void;
    isInWishlist: (productId: string | number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Array<string | number>>(() => {
        const saved = localStorage.getItem('ringforbaku-wishlist');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('ringforbaku-wishlist', JSON.stringify(items));
    }, [items]);

    const toggleWishlist = (productId: string | number) => {
        setItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            }
            return [...prev, productId];
        });
    };

    const isInWishlist = (productId: string | number) => items.includes(productId);

    const clearWishlist = () => setItems([]);

    return (
        <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
