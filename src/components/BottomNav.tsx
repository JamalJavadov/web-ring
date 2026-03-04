import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';

export function BottomNav() {
    const location = useLocation();
    const { itemCount } = useCart();
    const { items: wishlistItems } = useWishlist();

    const baseClass = 'flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px] py-2.5 text-xs uppercase tracking-wider transition-all duration-200 active:scale-95';
    const activeClass = 'text-[var(--accent)]';
    const inactiveClass = 'text-[var(--muted)]';

    if (location.pathname.startsWith('/product/')) {
        return null;
    }

    return (
        <nav
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex bg-[var(--surface)] border-t border-[var(--border)]"
            aria-label="Mobil alt naviqasiya"
        >
            <NavLink
                to="/"
                end
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
                <span>Ana səhifə</span>
            </NavLink>
            <NavLink
                to="/shop"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
                <span>Mağaza</span>
            </NavLink>
            <NavLink
                to="/wishlist"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
                <span>Seçilmişlər {wishlistItems.length > 0 && `(${wishlistItems.length})`}</span>
            </NavLink>
            <NavLink
                to="/cart"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
                <span>Səbət {itemCount > 0 && `(${itemCount})`}</span>
            </NavLink>
        </nav>
    );
}
