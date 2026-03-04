import { NavLink } from 'react-router-dom';
import { BRAND_NAME } from '@/lib/brand';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';

const navLinks = [
    { to: '/', label: 'Ana səhifə', exact: true },
    { to: '/shop', label: 'Mağaza' },
    { to: '/about', label: 'Haqqımızda' },
    { to: '/faq', label: 'Suallar' },
    { to: '/contact', label: 'Əlaqə' },
];

export function Header() {
    const { itemCount } = useCart();
    const { items: wishlistItems } = useWishlist();

    return (
        <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink
                        to="/"
                        className="font-serif text-lg sm:text-xl tracking-widest uppercase text-white hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center"
                    >
                        {BRAND_NAME}
                    </NavLink>

                    <nav className="hidden md:flex items-center gap-8" aria-label="Əsas naviqasiya">
                        {navLinks.map(({ to, label, exact }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={exact}
                                className={({ isActive }) =>
                                    [
                                        'text-xs lg:text-sm uppercase tracking-wider transition-colors min-h-[44px] flex items-center',
                                        isActive
                                            ? 'text-[var(--accent)]'
                                            : 'text-[var(--muted)] hover:text-[var(--text)]',
                                    ].join(' ')
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <NavLink
                            to="/wishlist"
                            aria-label="Seçilmişlər"
                            className="min-h-[44px] flex items-center gap-1.5 text-sm uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                        >
                            Seçilmişlər {wishlistItems.length > 0 && <span>({wishlistItems.length})</span>}
                        </NavLink>

                        <NavLink
                            to="/cart"
                            aria-label="Səbət"
                            className="min-h-[44px] flex items-center gap-1.5 text-sm uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                        >
                            Səbət {itemCount > 0 && <span>({itemCount})</span>}
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
