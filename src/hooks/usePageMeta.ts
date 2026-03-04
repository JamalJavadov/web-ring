import { useEffect } from 'react';
import { BRAND_NAME } from '@/lib/brand';

interface PageMetaOptions {
    title: string;
    description: string;
    image?: string;
}

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
    let meta = document.head.querySelector<HTMLMetaElement>(selector);
    if (!meta) {
        meta = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => {
            meta?.setAttribute(key, value);
        });
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

export function usePageMeta({ title, description, image }: PageMetaOptions) {
    useEffect(() => {
        const fullTitle = title === BRAND_NAME ? title : `${title} | ${BRAND_NAME}`;
        document.title = fullTitle;
        document.documentElement.lang = 'az';

        upsertMeta('meta[name="description"]', { name: 'description' }, description);
        upsertMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle);
        upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
        upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, BRAND_NAME);
        upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
        upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle);
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);

        if (image) {
            upsertMeta('meta[property="og:image"]', { property: 'og:image' }, image);
            upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image);
        }
    }, [title, description, image]);
}
