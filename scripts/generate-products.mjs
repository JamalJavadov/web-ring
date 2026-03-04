import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ROOT = process.cwd();
const SUPPORTED_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);
const MANIFEST_PATH = path.join(ROOT, 'scripts', '.products-manifest.json');
const GENERATED_DATA_PATH = path.join(ROOT, 'src', 'data', 'products.generated.ts');

const CATEGORIES = [
    {
        key: 'uzukler',
        label: 'Üzüklər',
        priceAZN: 13,
        namePrefix: 'Gothic Üzük — ',
        fallbackName: 'Qara Metal',
        descriptionShort: 'Premium gothic üslubda hazırlanmış üzük.',
        descriptionLong:
            'RingForBaku kolleksiyası üçün seçilən bu gothic üzük qara estetikanı metal parlaqlıqla birləşdirir. Gündəlik və gecə üslubunda fərqlənmək üçün premium seçimdir.',
    },
    {
        key: 'sepler',
        label: 'Sepələr',
        priceAZN: 15,
        namePrefix: 'Gothic Sepə — ',
        fallbackName: 'Metal Zəncir',
        descriptionShort: 'Premium gothic üslubda hazırlanmış sepə.',
        descriptionLong:
            'RingForBaku kolleksiyasının bu gothic sepəsi qaranlıq estetikaya zərif metal toxunuş qatır. Dayanıqlı material və balanslı dizaynla gündəlik istifadə üçün idealdır.',
    },
];

const KEYWORD_DICTIONARY = [
    { key: 'cross', labelAz: 'Xaç', tokens: ['cross', 'crucifix', 'xac', 'xaç'] },
    { key: 'skull', labelAz: 'Kəllə', tokens: ['skull', 'kelle', 'kəllə'] },
    { key: 'raven', labelAz: 'Qarğa', tokens: ['raven', 'crow', 'qarğa', 'qarga'] },
    { key: 'moon', labelAz: 'Ay', tokens: ['moon', 'luna', 'ay'] },
    { key: 'rose', labelAz: 'Gül', tokens: ['rose', 'gul', 'gül'] },
    { key: 'spike', labelAz: 'Tikan', tokens: ['spike', 'thorn', 'tikan'] },
    { key: 'chain', labelAz: 'Zəncir', tokens: ['chain', 'zencir', 'zəncir', 'link'] },
    { key: 'heart', labelAz: 'Ürək', tokens: ['heart', 'urek', 'ürək'] },
    { key: 'star', labelAz: 'Ulduz', tokens: ['star', 'ulduz'] },
    { key: 'bat', labelAz: 'Yarasa', tokens: ['bat', 'yarasa'] },
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

function parseIndexedBase(baseName) {
    const match = baseName.match(/^(.*?)[-_](\d+)$/);
    if (!match || !match[1]) {
        return { baseRaw: baseName, index: null };
    }

    const index = Number(match[2]);
    if (Number.isNaN(index) || index < 1 || index > 20) {
        return { baseRaw: baseName, index: null };
    }

    return { baseRaw: match[1], index };
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

async function moveFile(source, target) {
    try {
        await fs.rename(source, target);
    } catch (error) {
        if (error && error.code === 'EXDEV') {
            await fs.copyFile(source, target);
            await fs.unlink(source);
            return;
        }
        throw error;
    }
}

async function readManifest() {
    if (!(await fileExists(MANIFEST_PATH))) {
        return {
            incoming: {},
            output: {},
            generatedHash: '',
            slugHints: {},
        };
    }

    try {
        const manifestRaw = await fs.readFile(MANIFEST_PATH, 'utf8');
        const parsed = JSON.parse(manifestRaw);
        return {
            incoming: parsed.incoming ?? {},
            output: parsed.output ?? {},
            generatedHash: parsed.generatedHash ?? '',
            slugHints: parsed.slugHints ?? {},
        };
    } catch {
        return {
            incoming: {},
            output: {},
            generatedHash: '',
            slugHints: {},
        };
    }
}

async function writeManifest(manifest) {
    await ensureDir(path.dirname(MANIFEST_PATH));
    await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function collectImageEntries(rootDir) {
    const entries = [];

    async function walk(currentDir) {
        let dirents = [];
        try {
            dirents = await fs.readdir(currentDir, { withFileTypes: true });
        } catch {
            return;
        }

        for (const dirent of dirents) {
            const absolutePath = path.join(currentDir, dirent.name);

            if (dirent.isDirectory()) {
                await walk(absolutePath);
                continue;
            }

            const extension = path.extname(dirent.name).toLowerCase();
            if (!SUPPORTED_EXTENSIONS.has(extension)) {
                continue;
            }

            const stat = await fs.stat(absolutePath);
            const fileBuffer = await fs.readFile(absolutePath);

            entries.push({
                absolutePath,
                relativePath: toPosix(path.relative(ROOT, absolutePath)),
                fileName: dirent.name,
                baseName: path.basename(dirent.name, extension),
                extension,
                hash: hashBuffer(fileBuffer),
                mtimeMs: stat.mtimeMs,
            });
        }
    }

    await walk(rootDir);
    entries.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
    return entries;
}

function buildSnapshot(entries) {
    const snapshot = {};

    for (const entry of entries) {
        snapshot[entry.relativePath] = {
            hash: entry.hash,
            mtimeMs: Math.round(entry.mtimeMs),
        };
    }

    const sorted = {};
    for (const key of Object.keys(snapshot).sort()) {
        sorted[key] = snapshot[key];
    }

    return sorted;
}

function snapshotsEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
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
    const keyword = KEYWORD_DICTIONARY.find((item) => item.key === keywordKey);
    return keyword?.labelAz;
}

function toRoman(index) {
    const roman = [
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
        'X',
    ];

    if (index <= 0) {
        return '';
    }

    if (index <= roman.length) {
        return roman[index - 1];
    }

    return `(${index})`;
}

function groupIncomingEntries(entries) {
    const grouped = new Map();

    for (const entry of entries) {
        const parsed = parseIndexedBase(entry.baseName);
        const normalizedBase = normalizeSlug(parsed.baseRaw);
        const explicit = parsed.index !== null;
        const key = explicit ? `explicit:${normalizedBase || parsed.baseRaw.toLowerCase()}` : `single:${entry.hash}`;

        if (!grouped.has(key)) {
            grouped.set(key, {
                explicit,
                baseRaw: parsed.baseRaw,
                items: [],
            });
        }

        grouped.get(key).items.push({
            entry,
            index: parsed.index,
        });
    }

    const groups = [...grouped.entries()]
        .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
        .map(([, group]) => group);

    for (const group of groups) {
        group.items.sort((left, right) => {
            if (group.explicit) {
                const leftIndex = left.index ?? Number.MAX_SAFE_INTEGER;
                const rightIndex = right.index ?? Number.MAX_SAFE_INTEGER;
                if (leftIndex !== rightIndex) {
                    return leftIndex - rightIndex;
                }
            }
            return left.entry.relativePath.localeCompare(right.entry.relativePath);
        });
    }

    return groups;
}

function deriveGroupSlug(group) {
    if (group.explicit) {
        const explicitSlug = normalizeSlug(group.baseRaw);
        if (explicitSlug) {
            return explicitSlug;
        }
    }

    return `p-${group.items[0].entry.hash.slice(0, 12)}`;
}

function buildCandidateFileNames(group, slug) {
    return group.items.map((item, index) => {
        const suffix = group.items.length > 1 ? `-${index + 1}` : '';
        return `${slug}${suffix}${item.entry.extension}`;
    });
}

function deriveSlugFromOutputBase(baseName) {
    const parsed = parseIndexedBase(baseName);
    if (parsed.index === null) {
        return normalizeSlug(baseName) || baseName.toLowerCase();
    }

    return normalizeSlug(parsed.baseRaw) || parsed.baseRaw.toLowerCase();
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

export const products: Product[] = ${JSON.stringify(products, null, 4)};
`;
}

async function buildCategoryState(category) {
    const incomingDir = path.join(ROOT, 'public', 'products', '_incoming', category.key);
    const outputDir = path.join(ROOT, 'public', 'products', category.key);

    await ensureDir(incomingDir);
    await ensureDir(outputDir);

    const incomingEntries = await collectImageEntries(incomingDir);
    const outputEntries = await collectImageEntries(outputDir);

    return {
        incomingDir,
        outputDir,
        incomingEntries,
        outputEntries,
    };
}

async function processIncomingImages(category, state, slugHints, stats) {
    const outputByHash = new Map();
    const outputByPath = new Map();

    for (const outputEntry of state.outputEntries) {
        outputByHash.set(outputEntry.hash, outputEntry.relativePath);
        outputByPath.set(outputEntry.relativePath, outputEntry.hash);
    }

    const groups = groupIncomingEntries(state.incomingEntries);

    for (const group of groups) {
        let groupSlugBase = deriveGroupSlug(group);
        let groupSlug = groupSlugBase;
        const groupHash = group.items[0].entry.hash.slice(0, 12);

        let attempt = 0;
        while (true) {
            const fileNames = buildCandidateFileNames(group, groupSlug);
            const hasConflict = fileNames.some((fileName, index) => {
                const targetAbsolute = path.join(state.outputDir, fileName);
                const targetRelative = toPosix(path.relative(ROOT, targetAbsolute));
                const existingHash = outputByPath.get(targetRelative);
                return existingHash && existingHash !== group.items[index].entry.hash;
            });

            if (!hasConflict) {
                break;
            }

            attempt += 1;
            groupSlug = `${groupSlugBase}-${groupHash.slice(0, Math.min(6 + attempt, 12))}`;
        }

        const hintFragments = [group.baseRaw];

        for (let i = 0; i < group.items.length; i += 1) {
            const item = group.items[i];
            const fileNames = buildCandidateFileNames(group, groupSlug);
            const fileName = fileNames[i];
            const sourcePath = item.entry.absolutePath;
            const hash = item.entry.hash;

            hintFragments.push(item.entry.baseName);

            if (outputByHash.has(hash)) {
                stats.deduped += 1;
                await fs.unlink(sourcePath).catch(() => {});
                continue;
            }

            const targetPath = path.join(state.outputDir, fileName);
            const targetRelative = toPosix(path.relative(ROOT, targetPath));

            const existingHash = outputByPath.get(targetRelative);
            if (existingHash && existingHash === hash) {
                stats.deduped += 1;
                await fs.unlink(sourcePath).catch(() => {});
                continue;
            }

            await moveFile(sourcePath, targetPath);
            stats.moved += 1;
            outputByHash.set(hash, targetRelative);
            outputByPath.set(targetRelative, hash);
        }

        const hintKey = `${category.key}:${groupSlug}`;
        slugHints[hintKey] = hintFragments.join(' ');
    }
}

function buildProductsForCategory(category, outputEntries, slugHints) {
    const grouped = new Map();

    for (const entry of outputEntries) {
        const slug = deriveSlugFromOutputBase(entry.baseName);
        if (!grouped.has(slug)) {
            grouped.set(slug, []);
        }
        grouped.get(slug).push(entry);
    }

    const products = [];
    const usedNames = new Map();

    for (const [slug, entries] of [...grouped.entries()].sort(([left], [right]) => left.localeCompare(right))) {
        entries.sort((left, right) => {
            const leftParsed = parseIndexedBase(left.baseName);
            const rightParsed = parseIndexedBase(right.baseName);
            if (leftParsed.index !== null && rightParsed.index !== null && leftParsed.index !== rightParsed.index) {
                return leftParsed.index - rightParsed.index;
            }
            return left.fileName.localeCompare(right.fileName);
        });

        const hintKey = `${category.key}:${slug}`;
        const hintText = `${slug} ${slugHints[hintKey] ?? ''} ${entries.map((entry) => entry.baseName).join(' ')}`;
        const keywordKeys = inferKeywordKeys(hintText);
        const leadKeyword = keywordKeys[0];
        const label = leadKeyword ? keywordLabelAz(leadKeyword) : category.fallbackName;
        let productName = `${category.namePrefix}${label}`;

        const existingCount = usedNames.get(productName) ?? 0;
        if (existingCount > 0) {
            productName = `${productName} ${toRoman(existingCount + 1)}`;
        }
        usedNames.set(`${category.namePrefix}${label}`, existingCount + 1);

        const lowerSlug = slug.toLowerCase();
        const featured = lowerSlug.includes('featured') || entries.some((entry) => entry.baseName.toLowerCase().includes('_feat'));
        const inStock = !(lowerSlug.includes('soldout') || lowerSlug.includes('outofstock'));
        const createdAtMs = Math.max(...entries.map((entry) => entry.mtimeMs));

        products.push({
            id: `${category.key}_${slug}`,
            slug,
            name: productName,
            priceAZN: category.priceAZN,
            category: category.label,
            tags: ['gothic', ...keywordKeys],
            materials: ['metal'],
            descriptionShort: category.descriptionShort,
            descriptionLong: category.descriptionLong,
            images: entries.map((entry) => `/${toPosix(path.relative(path.join(ROOT, 'public'), entry.absolutePath))}`),
            featured,
            inStock,
            createdAt: new Date(createdAtMs).toISOString(),
        });
    }

    return products;
}

async function ensureGeneratedFileExists() {
    if (await fileExists(GENERATED_DATA_PATH)) {
        const file = await fs.readFile(GENERATED_DATA_PATH, 'utf8');
        return hashString(file);
    }
    return '';
}

async function run() {
    const manifest = await readManifest();
    const categoryStates = [];

    for (const category of CATEGORIES) {
        categoryStates.push({
            category,
            ...(await buildCategoryState(category)),
        });
    }

    const currentIncomingSnapshot = buildSnapshot(categoryStates.flatMap((state) => state.incomingEntries));
    const currentOutputSnapshot = buildSnapshot(categoryStates.flatMap((state) => state.outputEntries));
    const currentGeneratedHash = await ensureGeneratedFileExists();

    const isNoChange =
        snapshotsEqual(currentIncomingSnapshot, manifest.incoming) &&
        snapshotsEqual(currentOutputSnapshot, manifest.output) &&
        currentGeneratedHash === (manifest.generatedHash ?? '');

    if (isNoChange) {
        console.log('No changes');
        return;
    }

    const stats = { moved: 0, deduped: 0 };
    const slugHints = { ...(manifest.slugHints ?? {}) };

    for (const state of categoryStates) {
        await processIncomingImages(state.category, state, slugHints, stats);
    }

    const refreshedStates = [];
    for (const category of CATEGORIES) {
        refreshedStates.push({
            category,
            ...(await buildCategoryState(category)),
        });
    }

    const products = refreshedStates.flatMap((state) =>
        buildProductsForCategory(state.category, state.outputEntries, slugHints)
    );

    products.sort((left, right) => {
        const timeDiff = new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
        if (timeDiff !== 0) {
            return timeDiff;
        }
        return left.id.localeCompare(right.id);
    });

    const generatedContent = buildGeneratedContent(products);
    await ensureDir(path.dirname(GENERATED_DATA_PATH));
    await fs.writeFile(GENERATED_DATA_PATH, generatedContent, 'utf8');

    const generatedHash = hashString(generatedContent);
    const finalIncomingSnapshot = buildSnapshot(refreshedStates.flatMap((state) => state.incomingEntries));
    const finalOutputSnapshot = buildSnapshot(refreshedStates.flatMap((state) => state.outputEntries));
    const retainedSlugHints = {};

    for (const product of products) {
        const categoryKey = product.id.split('_')[0];
        const hintKey = `${categoryKey}:${product.slug}`;
        if (slugHints[hintKey]) {
            retainedSlugHints[hintKey] = slugHints[hintKey];
        }
    }

    await writeManifest({
        incoming: finalIncomingSnapshot,
        output: finalOutputSnapshot,
        generatedHash,
        slugHints: retainedSlugHints,
    });

    const countsByCategory = Object.fromEntries(
        CATEGORIES.map((category) => [category.label, products.filter((product) => product.category === category.label).length])
    );

    console.log('--- Products Generated ---');
    for (const [categoryName, count] of Object.entries(countsByCategory)) {
        console.log(`${categoryName}: ${count}`);
    }
    console.log(`Moved/Renamed: ${stats.moved}`);
    console.log(`Deduped: ${stats.deduped}`);
    console.log(`Total: ${products.length}`);
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
