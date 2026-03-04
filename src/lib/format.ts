export function formatPriceAZN(value: number): string {
    const rounded = Number.isInteger(value);
    const formatter = new Intl.NumberFormat('az-AZ', {
        minimumFractionDigits: rounded ? 0 : 2,
        maximumFractionDigits: 2,
    });

    return `${formatter.format(value)} ₼`;
}
