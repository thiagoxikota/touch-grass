import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TouchGrassLogo from '@brand/touch-grass/logo.svg?react';
import { DS_VERSION } from '../lib/version';

// Eager glob — no async boundary, page modules expose optional `title`/`slug`.
const foundationsGlob = import.meta.glob('../pages/foundations/*.tsx', { eager: true }) as Record<string, { title?: string; slug?: string }>;
const primitivesGlob = import.meta.glob('../pages/primitives/*.tsx', { eager: true }) as Record<string, { title?: string; slug?: string }>;
const patternsGlob = import.meta.glob('../pages/patterns/*.tsx', { eager: true }) as Record<string, { title?: string; slug?: string }>;

interface LinkInfo {
  label: string;
  href: string;
}

function getLinkInfo(path: string, category: string, module: { title?: string; slug?: string }): LinkInfo {
  const name = path.split('/').pop()!.replace('.tsx', '');
  const label = module.title || name.replace('Page', '').replace(/([A-Z])/g, ' $1').trim().toUpperCase();
  const slug =
    module.slug ||
    (name === 'BeRealStampPage'
      ? 'bereal-stamp'
      : name.replace('Page', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
  return { label, href: `/${category}/${slug}` };
}

const foundations: LinkInfo[] = [
  { label: 'OVERVIEW', href: '/' },
  ...Object.entries(foundationsGlob).map(([p, m]) => getLinkInfo(p, 'foundations', m)),
];
const primitives: LinkInfo[] = Object.entries(primitivesGlob).map(([p, m]) => getLinkInfo(p, 'primitives', m));
const patterns: LinkInfo[] = Object.entries(patternsGlob).map(([p, m]) => getLinkInfo(p, 'patterns', m));

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block pl-5 pr-4 py-3 font-mono text-[12px] font-black uppercase tracking-[0.12em] border-b border-[var(--color-hairline)] border-l-2 ${
    isActive
      ? 'bg-[var(--color-earned)] text-[var(--color-bg)] border-l-[var(--color-earned)]'
      : 'text-[var(--color-fg)] border-l-transparent hover:border-l-[var(--color-earned)] hover:bg-[var(--color-bg-alt)]'
  }`;

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-hairline)] font-mono text-[10px] font-black uppercase tracking-[0.16em] bg-[var(--color-bg-alt)]">
      <span className="text-[var(--color-earned)]">// {label}</span>
      <span className="text-[var(--color-fg)]">{String(count).padStart(2, '0')}</span>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      {/* Mobile bar */}
      <div className="md:hidden flex items-center justify-between border-b-2 border-[var(--color-fg)] px-4 py-3 bg-[var(--color-bg)] sticky top-0 z-30">
        <TouchGrassLogo className="h-6" style={{ color: 'var(--color-earned)' }} />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[11px] font-black uppercase tracking-[0.14em] border-2 border-[var(--color-fg)] px-3 py-1 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] cursor-pointer"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      <nav
        aria-label="Primary"
        className={`${
          open ? 'block' : 'hidden'
        } md:block border-r border-[var(--color-hairline)] md:w-[260px] flex-shrink-0 bg-[var(--color-bg)] md:sticky md:top-0 md:self-start md:h-screen md:overflow-y-auto z-20`}
      >
        <div className="p-6 border-b-2 border-[var(--color-fg)]">
          <TouchGrassLogo className="block w-full mb-4" style={{ color: 'var(--color-earned)' }} />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
              // {DS_VERSION.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="font-mono text-[10px] font-black uppercase tracking-[0.14em] border-2 border-[var(--color-hairline)] px-2 py-1 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] cursor-pointer"
            >
              THEME
            </button>
          </div>
        </div>

        <SectionHeader label="FOUNDATIONS" count={foundations.length} />
        <ul>
          {foundations.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href} end className={linkClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <SectionHeader label="PRIMITIVES" count={primitives.length} />
        <ul>
          {primitives.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href} end className={linkClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <SectionHeader label="PATTERNS" count={patterns.length} />
        <ul>
          {patterns.map(({ label, href }) => (
            <li key={href}>
              <NavLink to={href} end className={linkClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-[var(--color-hairline)] mt-4">
          <a
            href="https://github.com/thiagoxikota/touch-grass"
            target="_blank"
            rel="noreferrer noopener"
            className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] px-1 -mx-1"
          >
            GITHUB ↗
          </a>
          <a
            href="https://timeouts.app"
            target="_blank"
            rel="noreferrer noopener"
            className="block mt-1 font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] px-1 -mx-1"
          >
            TIMEOUTS.APP ↗
          </a>
        </div>
      </nav>
    </>
  );
}
