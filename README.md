# RingForBaku

Premium, mobile-first gothic accessories storefront (Vite + React + TypeScript + TailwindCSS).

## Setup

```bash
npm install
npm run dev
```

## Adding Products

Məhsullar yalnız şəkillərdən avtomatik yaradılır.

### 1) Şəkilləri daxil edin (`_incoming`)

- Üzüklər (raw): `public/products/_incoming/uzukler/`
- Sepələr (raw): `public/products/_incoming/sepler/`
- Dəstəklənən formatlar: `.webp .jpg .jpeg .png`

### 2) Generatoru işə salın

```bash
npm run gen:products
```

Generator bunları edir:

- `_incoming` qovluqlarını scan edir.
- Fayl hash-i (`SHA-256`) hesablayır.
- Eyni hash-li şəkilləri dedupe edir (təkrarı köçürmür/üzərinə yazmır).
- Şəkilləri final qovluqlara deterministik adla daşıyır:
- Üzüklər output: `public/products/uzukler/`
- Sepələr output: `public/products/sepler/`
- `src/data/products.generated.ts` faylını yeniləyir.
- Dəyişiklik yoxdursa `No changes` çıxır və faylı yenidən yazmır.

### 3) Avtomatik qruplaşdırma və adlandırma

- Explicit multi-image pattern:
- `slug-1.png`, `slug-2.png` və ya `slug_1.png`, `slug_2.png` eyni məhsul sayılır.
- Random adlar (`IMG_1234`, `photo(2)` və s.) hash əsaslı `p-<hash>` slug ilə ayrıca məhsula çevrilir.
- Məhsul adları AZ dilində avtomatik qurulur:
- Üzüklər: `Gothic Üzük — <Açar söz>`
- Sepələr: `Gothic Sepə — <Açar söz>`
- Açar söz tapılmazsa fallback istifadə olunur:
- `Gothic Üzük — Qara Metal`
- `Gothic Sepə — Metal Zəncir`

### 4) Qiymət qaydası

- Üzüklər: `13 ₼`
- Sepələr: `15 ₼`

### Avtomatik script trigger-ləri

`package.json` artıq aşağıdakı axını istifadə edir:

- `npm run gen:products`
- `npm run predev` → `gen:products`
- `npm run prebuild` → `gen:products`

Yəni `npm run dev` və `npm run build` öncəsi generator avtomatik işləyir.

## Build

```bash
npm run lint
npm run build
```

Build output: `dist/`

## Cloudflare Pages Deploy

1. Repo-nu GitHub-a push edin.
2. Cloudflare Dashboard → Pages → **Create project** → repo-nu qoşun.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy edin.
6. (İstəyə bağlı) Custom domain əlavə edin.

SPA deep route refresh dəstəyi aktivdir:

- `public/_redirects` faylı ilə `/product/:slug`, `/shop`, `/cart`, `/policies/*` kimi routelarda refresh işləyir.
