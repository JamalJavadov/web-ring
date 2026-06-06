const AZERBAIJANI_CHAR_MAP: Record<string, string> = {
    ə: 'e',
    Ə: 'E',
    ı: 'i',
    I: 'I',
    İ: 'I',
    ö: 'o',
    Ö: 'O',
    ü: 'u',
    Ü: 'U',
    ç: 'c',
    Ç: 'C',
    ş: 's',
    Ş: 'S',
    ğ: 'g',
    Ğ: 'G',
};

export function normalizeSearchText(value: string): string {
    return value
        .replace(/[əƏıIİöÖüÜçÇşŞğĞ]/g, (char) => AZERBAIJANI_CHAR_MAP[char] ?? char)
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();
}
