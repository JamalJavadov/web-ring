import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
    productId: string | number;
    variant?: string;
    quantity: number;
    priceAZN: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeFromCart: (productId: string | number, variant?: string) => void;
    updateQuantity: (productId: string | number, quantity: number, variant?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('ringforbaku-cart');
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
        localStorage.setItem('ringforbaku-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setItems(prev => {
            const existingItemIndex = prev.findIndex(
                item => item.productId === newItem.productId && item.variant === newItem.variant
            );

            if (existingItemIndex >= 0) {
                const updated = [...prev];
                updated[existingItemIndex].quantity += (newItem.quantity || 1);
                return updated;
            }

            return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
        });
    };

    const removeFromCart = (productId: string | number, variant?: string) => {
        setItems(prev => prev.filter(item => !(item.productId === productId && item.variant === variant)));
    };

    const updateQuantity = (productId: string | number, quantity: number, variant?: string) => {
        if (quantity < 1) {
            removeFromCart(productId, variant);
            return;
        }
        setItems(prev => prev.map(item =>
            (item.productId === productId && item.variant === variant)
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => total + (item.priceAZN * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
