import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestSellers } from '@/components/home/BestSellers';
import { TrustStrip } from '@/components/home/TrustStrip';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND_NAME } from '@/lib/brand';

export function Home() {
    usePageMeta({
        title: BRAND_NAME,
        description: 'RingForBaku premium gothic üzüklər və sepələr üçün mobil-first alış təcrübəsi təqdim edir.',
    });

    return (
        <>
            <Hero />
            <FeaturedCollections />
            <BestSellers />
            <TrustStrip />
        </>
    );
}
