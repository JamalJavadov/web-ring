import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { BackToTop } from '@/components/ui/BackToTop';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const hasProductStickyBar = location.pathname.startsWith('/product/');

    return (
        <div className="min-h-screen flex flex-col bg-base text-text">
            <Header />
            <main className={`flex-1 ${hasProductStickyBar ? 'pb-24' : 'pb-16'} md:pb-0`}>{children}</main>
            <Footer />
            <BottomNav />
            <BackToTop />
        </div>
    );
}
