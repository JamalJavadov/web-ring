import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, process.env.PRODUCT_SOURCE_ROOT ?? 'aliexpress-product-images');
const GENERATED_DATA_PATH = path.join(ROOT, 'src', 'data', 'products.generated.ts');
const MANIFEST_PATH = path.join(ROOT, 'scripts', '.products-manifest.json');
const PRODUCT_IMAGE_COUNT = 3;
const MAX_OUTPUT_IMAGE_SIDE = 900;
const WEBP_QUALITY = 72;

const execFileAsync = promisify(execFile);

// AVIF copies are intentionally ignored because this source folder also contains
// JPEG copies for the same AliExpress gallery images.
const SOURCE_IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);
const OUTPUT_IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

const CATEGORIES = [
    {
        sourcePrefix: 'ring',
        key: 'uzukler',
        label: 'Üzüklər',
        priceAZN: 13,
        namePrefix: 'Gothic Üzük — ',
        fallbackName: 'Qara Metal',
        descriptionShort: 'Premium qotik üslubda hazırlanmış üzük.',
        descriptionLong:
            'RingForBaku kolleksiyası üçün seçilmiş bu qotik üzük qara estetikanı metal parıltısı ilə birləşdirir. Gündəlik və gecə üslubunda fərqlənmək üçün premium seçimdir.',
    },
    {
        sourcePrefix: 'necklace',
        key: 'sepler',
        label: 'seplər',
        priceAZN: 15,
        namePrefix: 'Gothic Sepə — ',
        fallbackName: 'Metal Zəncir',
        descriptionShort: 'Premium qotik üslubda hazırlanmış sepə.',
        descriptionLong:
            'RingForBaku kolleksiyasının bu qotik sepəsi qaranlıq estetikaya zərif metal toxunuşu qatır. Dayanıqlı materialı və balanslı dizaynı ilə gündəlik istifadə üçün idealdır.',
    },
];

const KEYWORD_DICTIONARY = [
    { key: 'cross', labelAz: 'Xaç', tokens: ['cross', 'crucifix', 'xac', 'xaç', 'крест'] },
    { key: 'skull', labelAz: 'Kəllə', tokens: ['skull', 'kelle', 'kəllə', 'череп'] },
    { key: 'dragon', labelAz: 'Əjdaha', tokens: ['dragon', 'ejdaha', 'əjdaha', 'дракон'] },
    { key: 'wolf', labelAz: 'Canavar', tokens: ['wolf', 'canavar', 'волк'] },
    { key: 'snake', labelAz: 'İlan', tokens: ['snake', 'serpent', 'ouroboros', 'uroboros', 'ilan', 'змея', 'уроборос'] },
    { key: 'raven', labelAz: 'Qarğa', tokens: ['raven', 'crow', 'qarğa', 'qarga'] },
    { key: 'moon', labelAz: 'Ay', tokens: ['moon', 'luna', 'ay'] },
    { key: 'rose', labelAz: 'Gül', tokens: ['rose', 'gul', 'gül', 'роза'] },
    { key: 'spike', labelAz: 'Tikan', tokens: ['spike', 'thorn', 'tikan'] },
    { key: 'chain', labelAz: 'Zəncir', tokens: ['chain', 'zencir', 'zəncir', 'link', 'цепь', 'цепочка'] },
    { key: 'heart', labelAz: 'Ürək', tokens: ['heart', 'urek', 'ürək'] },
    { key: 'star', labelAz: 'Ulduz', tokens: ['star', 'ulduz', 'звезда'] },
    { key: 'bat', labelAz: 'Yarasa', tokens: ['bat', 'yarasa'] },
    { key: 'viking', labelAz: 'Vikinq', tokens: ['viking', 'vikinq', 'викинг', 'руны'] },
    { key: 'gothic', labelAz: 'Qotik', tokens: ['gothic', 'qotik', 'готик'] },
];

const AZ_CHAR_MAP = {
    ə: 'e',
    Ə: 'e',
    ı: 'i',
    İ: 'i',
    ş: 's',
    Ş: 's',
    ğ: 'g',
    Ğ: 'g',
    ç: 'c',
    Ç: 'c',
    ö: 'o',
    Ö: 'o',
    ü: 'u',
    Ü: 'u',
};

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function naturalCompare(left, right) {
    return collator.compare(left, right);
}

function toPosix(filePath) {
    return filePath.split(path.sep).join('/');
}

function normalizeSlug(input) {
    const transliterated = Array.from(input)
        .map((char) => AZ_CHAR_MAP[char] ?? char)
        .join('');

    return transliterated
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/-{2,}/g, '-');
}

function hashString(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

function hashBuffer(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function fileExists(absolutePath) {
    try {
        await fs.access(absolutePath);
        return true;
    } catch {
        return false;
    }
}

async function ensureDir(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
}

function inferCategory(folderName) {
    return CATEGORIES.find((category) => folderName.toLowerCase().startsWith(category.sourcePrefix));
}

function inferKeywordKeys(hintText) {
    const normalized = hintText.toLowerCase();
    const found = [];

    for (const keyword of KEYWORD_DICTIONARY) {
        if (keyword.tokens.some((token) => normalized.includes(token))) {
            found.push(keyword.key);
        }
    }

    return [...new Set(found)];
}

function keywordLabelAz(keywordKey) {
    return KEYWORD_DICTIONARY.find((item) => item.key === keywordKey)?.labelAz;
}

function toRoman(index) {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

    if (index <= 0) {
        return '';
    }

    if (index <= roman.length) {
        return roman[index - 1];
    }

    return `(${index})`;
}

function parseCsv(content) {
    const rows = [];
    let row = [];
    let value = '';
    let insideQuotes = false;

    for (let index = 0; index < content.length; index += 1) {
        const char = content[index];
        const next = content[index + 1];

        if (char === '"') {
            if (insideQuotes && next === '"') {
                value += '"';
                index += 1;
            } else {
                insideQuotes = !insideQuotes;
            }
            continue;
        }

        if (char === ',' && !insideQuotes) {
            row.push(value);
            value = '';
            continue;
        }

        if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (char === '\r' && next === '\n') {
                index += 1;
            }
            row.push(value);
            if (row.some((cell) => cell !== '')) {
                rows.push(row);
            }
            row = [];
            value = '';
            continue;
        }

        value += char;
    }

    if (value !== '' || row.length > 0) {
        row.push(value);
        if (row.some((cell) => cell !== '')) {
            rows.push(row);
        }
    }

    return rows;
}

async function readReportByFolder() {
    const reportPath = path.join(SOURCE_ROOT, 'report.csv');
    if (!(await fileExists(reportPath))) {
        return new Map();
    }

    const rows = parseCsv(await fs.readFile(reportPath, 'utf8'));
    const [header, ...records] = rows;
    if (!header) {
        return new Map();
    }

    const indexes = Object.fromEntries(header.map((name, index) => [name, index]));
    const byFolder = new Map();

    for (const record of records) {
        const folderName = record[indexes.folder_name];
        if (!folderName) {
            continue;
        }

        byFolder.set(folderName, {
            productNumber: Number(record[indexes.product_number]) || 0,
            productTitle: record[indexes.product_title] ?? '',
            itemId: record[indexes.item_id] ?? '',
            productUrl: record[indexes.product_url] ?? '',
        });
    }

    return byFolder;
}

async function collectSourceImageEntries(folderPath) {
    const dirents = await fs.readdir(folderPath, { withFileTypes: true });
    const entries = [];

    for (const dirent of dirents) {
        if (!dirent.isFile()) {
            continue;
        }

        const extension = path.extname(dirent.name).toLowerCase();
        if (!SOURCE_IMAGE_EXTENSIONS.has(extension)) {
            continue;
        }

        const absolutePath = path.join(folderPath, dirent.name);
        const [stat, buffer] = await Promise.all([fs.stat(absolutePath), fs.readFile(absolutePath)]);

        entries.push({
            absolutePath,
            fileName: dirent.name,
            baseName: path.basename(dirent.name, extension),
            extension,
            hash: hashBuffer(buffer),
            mtimeMs: stat.mtimeMs,
        });
    }

    entries.sort((left, right) => naturalCompare(left.fileName, right.fileName));
    return entries;
}

async function collectSourceFolders(reportByFolder) {
    const dirents = await fs.readdir(SOURCE_ROOT, { withFileTypes: true });
    const folders = [];

    for (const dirent of dirents) {
        if (!dirent.isDirectory() || dirent.name.startsWith('.')) {
            continue;
        }

        const category = inferCategory(dirent.name);
        if (!category) {
            continue;
        }

        const absolutePath = path.join(SOURCE_ROOT, dirent.name);
        const images = await collectSourceImageEntries(absolutePath);
        const report = reportByFolder.get(dirent.name);

        folders.push({
            name: dirent.name,
            slug: normalizeSlug(dirent.name),
            absolutePath,
            category,
            images,
            report,
        });
    }

    folders.sort((left, right) => {
        const categoryDiff = CATEGORIES.indexOf(left.category) - CATEGORIES.indexOf(right.category);
        if (categoryDiff !== 0) {
            return categoryDiff;
        }
        return naturalCompare(left.name, right.name);
    });

    return folders;
}

function selectUniqueImages(folders) {
    const usedGlobalHashes = new Map();
    const selected = [];
    const skipped = [];
    const stats = {
        localDuplicates: 0,
        globalDuplicates: 0,
        excessImages: 0,
    };

    for (const folder of folders) {
        const seenLocalHashes = new Set();
        const uniqueImages = [];
        const skipReasons = [];

        for (const image of folder.images) {
            if (seenLocalHashes.has(image.hash)) {
                stats.localDuplicates += 1;
                skipReasons.push(`${image.fileName}: local duplicate`);
                continue;
            }
            seenLocalHashes.add(image.hash);

            const firstUse = usedGlobalHashes.get(image.hash);
            if (firstUse) {
                stats.globalDuplicates += 1;
                skipReasons.push(`${image.fileName}: duplicates ${firstUse}`);
                continue;
            }

            uniqueImages.push(image);
        }

        if (uniqueImages.length < PRODUCT_IMAGE_COUNT) {
            skipped.push({
                folderName: folder.name,
                category: folder.category.key,
                sourceImages: folder.images.length,
                uniqueImages: uniqueImages.length,
                reasons: skipReasons,
            });
            continue;
        }

        const chosenImages = uniqueImages.slice(0, PRODUCT_IMAGE_COUNT);
        stats.excessImages += Math.max(0, uniqueImages.length - PRODUCT_IMAGE_COUNT);

        for (const image of chosenImages) {
            usedGlobalHashes.set(image.hash, `${folder.name}/${image.fileName}`);
        }

        selected.push({
            ...folder,
            selectedImages: chosenImages,
        });
    }

    return { selected, skipped, stats };
}

async function clearGeneratedProductImages() {
    for (const category of CATEGORIES) {
        const outputDir = path.join(ROOT, 'public', 'products', category.key);
        await ensureDir(outputDir);

        const dirents = await fs.readdir(outputDir, { withFileTypes: true });
        await Promise.all(
            dirents.map(async (dirent) => {
                if (!dirent.isFile()) {
                    return;
                }

                const extension = path.extname(dirent.name).toLowerCase();
                if (!OUTPUT_IMAGE_EXTENSIONS.has(extension)) {
                    return;
                }

                await fs.unlink(path.join(outputDir, dirent.name));
            })
        );
    }
}

async function copySelectedImages(selectedFolders) {
    const productsByFolder = new Map();

    for (const folder of selectedFolders) {
        const outputDir = path.join(ROOT, 'public', 'products', folder.category.key);
        await ensureDir(outputDir);

        const images = [];
        for (let index = 0; index < folder.selectedImages.length; index += 1) {
            const sourceImage = folder.selectedImages[index];
            const { targetPath } = await writeOptimizedProductImage(sourceImage, outputDir, folder.slug, index);
            images.push(`/${toPosix(path.relative(path.join(ROOT, 'public'), targetPath))}`);
        }

        productsByFolder.set(folder.name, images);
    }

    return productsByFolder;
}

async function readImageDimensions(sourcePath) {
    try {
        const { stdout } = await execFileAsync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', sourcePath]);
        const width = Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
        const height = Number(stdout.match(/pixelHeight:\s*(\d+)/)?.[1]);

        if (Number.isFinite(width) && Number.isFinite(height)) {
            return { width, height };
        }
    } catch {
        return null;
    }

    return null;
}

async function buildResizeArgs(sourcePath) {
    const dimensions = await readImageDimensions(sourcePath);
    if (!dimensions) {
        return [];
    }

    const { width, height } = dimensions;
    if (width <= MAX_OUTPUT_IMAGE_SIDE && height <= MAX_OUTPUT_IMAGE_SIDE) {
        return [];
    }

    if (width >= height) {
        return ['-resize', String(MAX_OUTPUT_IMAGE_SIDE), '0'];
    }

    return ['-resize', '0', String(MAX_OUTPUT_IMAGE_SIDE)];
}

async function writeOptimizedProductImage(sourceImage, outputDir, slug, index) {
    const targetWebpPath = path.join(outputDir, `${slug}-${index + 1}.webp`);

    try {
        const resizeArgs = await buildResizeArgs(sourceImage.absolutePath);
        await execFileAsync('cwebp', [
            '-quiet',
            '-q',
            String(WEBP_QUALITY),
            '-m',
            '6',
            ...resizeArgs,
            sourceImage.absolutePath,
            '-o',
            targetWebpPath,
        ]);

        return { targetPath: targetWebpPath };
    } catch {
        const fallbackPath = path.join(outputDir, `${slug}-${index + 1}${sourceImage.extension}`);
        await fs.copyFile(sourceImage.absolutePath, fallbackPath);
        return { targetPath: fallbackPath };
    }
}

function buildProductName(category, keywordKeys, usedNames) {
    const leadKeyword = keywordKeys[0];
    const label = leadKeyword ? keywordLabelAz(leadKeyword) : category.fallbackName;
    const baseName = `${category.namePrefix}${label}`;
    const existingCount = usedNames.get(baseName) ?? 0;

    usedNames.set(baseName, existingCount + 1);

    if (existingCount === 0) {
        return baseName;
    }

    return `${baseName} ${toRoman(existingCount + 1)}`;
}

function buildProducts(selectedFolders, productsByFolder) {
    const usedNamesByCategory = new Map(CATEGORIES.map((category) => [category.key, new Map()]));
    const baseDateMs = Date.UTC(2026, 2, 5, 12, 0, 0);

    return selectedFolders.map((folder, index) => {
        const reportText = [folder.report?.productTitle, folder.report?.itemId, folder.report?.productUrl]
            .filter(Boolean)
            .join(' ');
        const hintText = `${folder.name} ${reportText} ${folder.selectedImages.map((image) => image.baseName).join(' ')}`;
        const keywordKeys = inferKeywordKeys(hintText);
        const usedNames = usedNamesByCategory.get(folder.category.key);
        const images = productsByFolder.get(folder.name) ?? [];
        const createdAtOffset = (folder.report?.productNumber || index + 1) * 60 * 1000;

        return {
            id: `${folder.category.key}_${folder.slug}`,
            slug: folder.slug,
            name: buildProductName(folder.category, keywordKeys, usedNames),
            priceAZN: folder.category.priceAZN,
            category: folder.category.label,
            tags: ['qotik', ...keywordKeys.filter((key) => key !== 'gothic')],
            materials: ['Metal'],
            descriptionShort: folder.category.descriptionShort,
            descriptionLong: folder.category.descriptionLong,
            images,
            featured: index < 8,
            inStock: true,
            createdAt: new Date(baseDateMs + createdAtOffset).toISOString(),
        };
    });
}

function buildGeneratedContent(products) {
    return `// AUTO-GENERATED FILE. DO NOT EDIT.

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
    category: 'Üzüklər' | 'seplər';
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

export const products: Product[] = ${JSON.stringify(products, null, 4)};
`;
}

async function writeManifest(products, selectedFolders, skipped, stats) {
    const manifest = {
        sourceRoot: toPosix(path.relative(ROOT, SOURCE_ROOT)),
        generatedHash: hashString(buildGeneratedContent(products)),
        productImageCount: PRODUCT_IMAGE_COUNT,
        ignoredExtensions: ['.avif'],
        products: selectedFolders.map((folder) => ({
            folderName: folder.name,
            category: folder.category.key,
            slug: folder.slug,
            imageHashes: folder.selectedImages.map((image) => image.hash),
            sourceImages: folder.selectedImages.map((image) => image.fileName),
        })),
        skipped,
        stats,
    };

    await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function run() {
    if (!(await fileExists(SOURCE_ROOT))) {
        if (await fileExists(GENERATED_DATA_PATH)) {
            console.log(`Source folder not found, keeping generated products: ${toPosix(path.relative(ROOT, SOURCE_ROOT))}`);
            return;
        }

        throw new Error(`Source folder not found and generated data is missing: ${SOURCE_ROOT}`);
    }

    const reportByFolder = await readReportByFolder();
    const sourceFolders = await collectSourceFolders(reportByFolder);
    const { selected, skipped, stats } = selectUniqueImages(sourceFolders);

    await clearGeneratedProductImages();
    const productsByFolder = await copySelectedImages(selected);
    const products = buildProducts(selected, productsByFolder);
    const generatedContent = buildGeneratedContent(products);

    await ensureDir(path.dirname(GENERATED_DATA_PATH));
    await fs.writeFile(GENERATED_DATA_PATH, generatedContent, 'utf8');
    await writeManifest(products, selected, skipped, stats);

    const countsByCategory = Object.fromEntries(
        CATEGORIES.map((category) => [category.label, products.filter((product) => product.category === category.label).length])
    );

    console.log('--- Products Generated ---');
    for (const [categoryName, count] of Object.entries(countsByCategory)) {
        console.log(`${categoryName}: ${count}`);
    }
    console.log(`Source folders: ${sourceFolders.length}`);
    console.log(`Images per product: ${PRODUCT_IMAGE_COUNT}`);
    console.log(`Skipped folders: ${skipped.length}`);
    console.log(`Local duplicates skipped: ${stats.localDuplicates}`);
    console.log(`Global duplicates skipped: ${stats.globalDuplicates}`);
    console.log(`Excess unique images ignored: ${stats.excessImages}`);
    console.log(`Total: ${products.length}`);
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
