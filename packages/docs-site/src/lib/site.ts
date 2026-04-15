import docsSitePkg from '../../package.json' with { type: 'json' };
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

export const SITE_URLS = {
  timeoutsApp: 'https://timeouts.app',
  waitlist: 'https://timeouts.app#waitlist',
  githubRepo: 'https://github.com/thiagoxikota/touch-grass',
  npmReact: 'https://www.npmjs.com/package/@touch-grass-ds/react',
  npmTokens: 'https://www.npmjs.com/package/@touch-grass-ds/tokens',
  figmaCommunity: 'https://www.figma.com/community/file/1625695815996602388/touch-grass-ds',
  changelog: 'https://github.com/thiagoxikota/touch-grass/blob/main/CHANGELOG.md',
  changelogReact: 'https://github.com/thiagoxikota/touch-grass/blob/main/packages/ds/CHANGELOG.md',
  changelogTokens: 'https://github.com/thiagoxikota/touch-grass/blob/main/packages/tokens/CHANGELOG.md',
  githubReleases: 'https://github.com/thiagoxikota/touch-grass/releases',
  license: 'https://github.com/thiagoxikota/touch-grass/blob/main/LICENSE',
  portfolio: 'https://thiagoxikota.com',
  caseStudy: 'https://thiagoxikota.com/projects/touch-grass',
  caseStudyPtBr: 'https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code',
  linkedIn: 'https://br.linkedin.com/in/thiagoxikota',
  xTwitter: 'https://x.com/thiagoxikota',
  authorGithub: 'https://github.com/thiagoxikota',
  byteByteGoDesignToCode: 'https://blog.bytebytego.com/p/figma-design-to-code-code-to-design',
} as const;

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
