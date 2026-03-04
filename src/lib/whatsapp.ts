import { BRAND_NAME, WHATSAPP_ORDER_URL } from '@/lib/brand';
import { formatPriceAZN } from '@/lib/format';

export interface OrderLine {
    name: string;
    quantity: number;
    variant?: string;
}

export function buildOrderText(lines: OrderLine[], totalAZN: number): string {
    const productLines = lines
        .map((line, index) => {
            const variantPart = line.variant ? ` (${line.variant})` : '';
            return `${index + 1}) ${line.name}${variantPart} x${line.quantity}`;
        })
        .join('\n');

    return `Salam, ${BRAND_NAME}-dan sifariş etmək istəyirəm:
${productLines}
Cəm: ${formatPriceAZN(totalAZN)}
Zəhmət olmasa əlaqə nömrəmi və çatdırılma ünvanımı təsdiqləmək üçün yazın.`;
}

export function buildWhatsAppOrderUrl(lines: OrderLine[], totalAZN: number): string {
    const text = encodeURIComponent(buildOrderText(lines, totalAZN));
    return `${WHATSAPP_ORDER_URL}?text=${text}`;
}

export function buildMailtoOrderUrl(lines: OrderLine[], totalAZN: number): string {
    const subject = encodeURIComponent(`${BRAND_NAME} sifarişi`);
    const body = encodeURIComponent(buildOrderText(lines, totalAZN));
    return `mailto:?subject=${subject}&body=${body}`;
}
