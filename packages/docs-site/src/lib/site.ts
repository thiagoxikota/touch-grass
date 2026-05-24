import docsSitePkg from '../../package.json' with { type: 'json' };
import { SITE_URLS } from './siteUrls';

export { SITE_URLS };

type PageModule = { title?: string; slug?: string };

function getLinkInfo(path: string, category: string, module: PageModule) {
  const name = path.split('/').pop()!.replace('.tsx', '');
  const label = module.title || name.replace('Page', '').replace(/([A-Z])/g, ' $1').trim().toUpperCase();
  const slug =
    module.slug ||
    (name === 'BeRealStampPage'
      ? 'bereal-stamp'
      : name.replace('Page', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
  return { label, href: `/${category}/${slug}` };
}

const foundationsGlob = import.meta.glob('../pages/foundations/*.tsx', { eager: true }) as Record<string, PageModule>;
const primitivesGlob = import.meta.glob('../pages/primitives/*.tsx', { eager: true }) as Record<string, PageModule>;
const patternsGlob = import.meta.glob('../pages/patterns/*.tsx', { eager: true }) as Record<string, PageModule>;
const recipesGlob = import.meta.glob('../pages/recipes/*.tsx', { eager: true }) as Record<string, PageModule>;

export const foundationsLinks = [
  { label: 'OVERVIEW', href: '/' },
  ...Object.entries(foundationsGlob).map(([p, m]) => getLinkInfo(p, 'foundations', m)),
];
export const primitivesLinks = Object.entries(primitivesGlob).map(([p, m]) => getLinkInfo(p, 'primitives', m));
export const patternsLinks = Object.entries(patternsGlob).map(([p, m]) => getLinkInfo(p, 'patterns', m));
export const recipesLinks = [
  { label: 'ALL RECIPES', href: '/recipes' },
  ...Object.entries(recipesGlob)
    .filter(([p]) => !p.endsWith('/Index.tsx'))
    .map(([p, m]) => getLinkInfo(p, 'recipes', m)),
];

const TOKEN_FAMILIES = ['COLOR', 'TYPE', 'SPACE', 'BORDER', 'GRID', 'MOTION', 'COLOR-LIGHT'] as const;

function getReactMajor(versionRange: string | undefined): string {
  if (!versionRange) return '—';
  const match = versionRange.match(/\d+/);
  return match ? match[0] : '—';
}

export const SITE_FACTS = {
  tokenFamilies: TOKEN_FAMILIES,
  tokenFilesCount: TOKEN_FAMILIES.length,
  reactMajor: getReactMajor(docsSitePkg.dependencies?.react),
} as const;
