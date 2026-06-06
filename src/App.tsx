import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Suspense, lazy, useLayoutEffect } from 'react';
import { Layout } from '@/components/Layout';
import { CartProvider } from '@/store/CartContext';
import { WishlistProvider } from '@/store/WishlistContext';

const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })));
const Shop = lazy(() => import('@/pages/Shop').then((module) => ({ default: module.Shop })));
const ProductDetail = lazy(() =>
    import('@/pages/ProductDetail').then((module) => ({ default: module.ProductDetail }))
);
const Cart = lazy(() => import('@/pages/Cart').then((module) => ({ default: module.Cart })));
const Wishlist = lazy(() => import('@/pages/Wishlist').then((module) => ({ default: module.Wishlist })));
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));
const Contact = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.Contact })));
const Faq = lazy(() => import('@/pages/Faq').then((module) => ({ default: module.Faq })));
const PolicyShipping = lazy(() =>
    import('@/pages/PolicyShipping').then((module) => ({ default: module.PolicyShipping }))
);
const PolicyPrivacy = lazy(() =>
    import('@/pages/PolicyPrivacy').then((module) => ({ default: module.PolicyPrivacy }))
);
const PolicyTerms = lazy(() =>
    import('@/pages/PolicyTerms').then((module) => ({ default: module.PolicyTerms }))
);

function RouteLoadingFallback() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[60vh]">
            <div className="h-4 w-28 bg-[var(--surface)] rounded mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-[var(--surface)] rounded animate-pulse" />
        </div>
    );
}

function ScrollManager() {
    const location = useLocation();
    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        return () => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useLayoutEffect(() => {
        if (navigationType !== 'POP') {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }, [location.pathname, location.search, navigationType]);

    return null;
}

function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <BrowserRouter>
                    <ScrollManager />
                    <Layout>
                        <Suspense fallback={<RouteLoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/product/:slug" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/faq" element={<Faq />} />
                                <Route path="/policies/shipping" element={<PolicyShipping />} />
                                <Route path="/policies/privacy" element={<PolicyPrivacy />} />
                                <Route path="/policies/terms" element={<PolicyTerms />} />
                            </Routes>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </WishlistProvider>
        </CartProvider>
    );
}

export default App;
