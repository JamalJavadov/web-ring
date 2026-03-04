// AUTO-GENERATED FILE. DO NOT EDIT.

export interface ProductVariant {
    type: 'size' | 'color';
    label: string;
    options: string[];
}

export type Product = {
    id: string;
    slug: string;
    name: string;
    priceAZN: number;
    oldPriceAZN?: number;
    category: 'Üzüklər' | 'Sepələr';
    tags: string[];
    materials: string[];
    descriptionShort: string;
    descriptionLong: string;
    images: string[];
    featured: boolean;
    inStock: boolean;
    variants?: ProductVariant[];
    createdAt: string;
};

export const products: Product[] = [
    {
        "id": "sepler_gemini-generated-image-rdg7jlrdg7jlrdg7",
        "slug": "gemini-generated-image-rdg7jlrdg7jlrdg7",
        "name": "Gothic Sepə — Metal Zəncir II",
        "priceAZN": 15,
        "category": "Sepələr",
        "tags": [
            "gothic"
        ],
        "materials": [
            "metal"
        ],
        "descriptionShort": "Premium gothic üslubda hazırlanmış sepə.",
        "descriptionLong": "RingForBaku kolleksiyasının bu gothic sepəsi qaranlıq estetikaya zərif metal toxunuş qatır. Dayanıqlı material və balanslı dizaynla gündəlik istifadə üçün idealdır.",
        "images": [
            "/products/sepler/Gemini_Generated_Image_rdg7jlrdg7jlrdg7.png"
        ],
        "featured": false,
        "inStock": true,
        "createdAt": "2026-03-02T17:50:52.462Z"
    },
    {
        "id": "sepler_gemini-generated-image-41ixh41ixh41ixh4",
        "slug": "gemini-generated-image-41ixh41ixh41ixh4",
        "name": "Gothic Sepə — Metal Zəncir",
        "priceAZN": 15,
        "category": "Sepələr",
        "tags": [
            "gothic"
        ],
        "materials": [
            "metal"
        ],
        "descriptionShort": "Premium gothic üslubda hazırlanmış sepə.",
        "descriptionLong": "RingForBaku kolleksiyasının bu gothic sepəsi qaranlıq estetikaya zərif metal toxunuş qatır. Dayanıqlı material və balanslı dizaynla gündəlik istifadə üçün idealdır.",
        "images": [
            "/products/sepler/Gemini_Generated_Image_41ixh41ixh41ixh4.png"
        ],
        "featured": false,
        "inStock": true,
        "createdAt": "2026-03-02T17:50:31.128Z"
    },
    {
        "id": "uzukler_gemini-generated-image-sj4u35sj4u35sj4u",
        "slug": "gemini-generated-image-sj4u35sj4u35sj4u",
        "name": "Gothic Üzük — Qara Metal II",
        "priceAZN": 13,
        "category": "Üzüklər",
        "tags": [
            "gothic"
        ],
        "materials": [
            "metal"
        ],
        "descriptionShort": "Premium gothic üslubda hazırlanmış üzük.",
        "descriptionLong": "RingForBaku kolleksiyası üçün seçilən bu gothic üzük qara estetikanı metal parlaqlıqla birləşdirir. Gündəlik və gecə üslubunda fərqlənmək üçün premium seçimdir.",
        "images": [
            "/products/uzukler/Gemini_Generated_Image_sj4u35sj4u35sj4u.png"
        ],
        "featured": false,
        "inStock": true,
        "createdAt": "2026-03-02T17:48:04.549Z"
    },
    {
        "id": "uzukler_gemini-generated-image-35hi7v35hi7v35hi",
        "slug": "gemini-generated-image-35hi7v35hi7v35hi",
        "name": "Gothic Üzük — Qara Metal",
        "priceAZN": 13,
        "category": "Üzüklər",
        "tags": [
            "gothic"
        ],
        "materials": [
            "metal"
        ],
        "descriptionShort": "Premium gothic üslubda hazırlanmış üzük.",
        "descriptionLong": "RingForBaku kolleksiyası üçün seçilən bu gothic üzük qara estetikanı metal parlaqlıqla birləşdirir. Gündəlik və gecə üslubunda fərqlənmək üçün premium seçimdir.",
        "images": [
            "/products/uzukler/Gemini_Generated_Image_35hi7v35hi7v35hi.png"
        ],
        "featured": false,
        "inStock": true,
        "createdAt": "2026-03-02T17:47:48.568Z"
    }
];
