import { useState } from 'react';
import { type Product } from '@/types/product';

interface AccordionItem {
    title: string;
    content: string;
}

interface ProductAccordionProps {
    product: Product;
}

function buildSections(product: Product): AccordionItem[] {
    return [
        {
            title: 'Təsvir',
            content: product.descriptionLong,
        },
        {
            title: 'Material',
            content: product.materials.join(', '),
        },
        {
            title: 'Çatdırılma',
            content: 'Bakı daxili 1-2 iş günü. Rayonlara 3-5 iş günü. Göndəriş statusu WhatsApp üzərindən paylaşılır.',
        },
        {
            title: 'Qulluq',
            content: 'Məhsulu rütubətdən və birbaşa günəş işığından qoruyun. Təmizləmək üçün yumşaq parçadan istifadə edin.',
        },
    ];
}

export function ProductAccordion({ product }: ProductAccordionProps) {
    const sections = buildSections(product);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="border-t border-[var(--border)]">
            {sections.map((section, i) => (
                <div key={section.title} className="border-b border-[var(--border)]">
                    <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between py-4 text-left transition-colors hover:text-[var(--accent)]"
                        aria-expanded={openIndex === i}
                    >
                        <span className="text-sm uppercase tracking-wider font-medium">
                            {section.title}
                        </span>
                        <svg
                            className={`w-4 h-4 text-[var(--muted)] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'
                            }`}
                    >
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
