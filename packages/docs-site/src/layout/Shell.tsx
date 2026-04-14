import type { ReactNode } from 'react';
import { Nav } from './Nav';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg)] text-[var(--color-fg)]">
      <Nav />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-[var(--color-fg)] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <FooterCol
          label="DS"
          items={[
            { label: 'OVERVIEW', href: '/' },
            { label: 'TOKENS', href: '/foundations/color' },
            { label: 'PRIMITIVES', href: '/primitives/button' },
            { label: 'PATTERNS', href: '/patterns/leaderboard-row' },
          ]}
        />
        <FooterCol
          label="PRODUCT"
          items={[
            { label: 'TIMEOUTS.APP', href: 'https://timeouts.app', external: true },
            { label: 'WAITLIST', href: 'https://timeouts.app#waitlist', external: true },
            { label: 'CASE STUDY', href: 'https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code', external: true },
          ]}
        />
        <FooterCol
          label="REPO"
          items={[
            { label: 'GITHUB', href: 'https://github.com/thiagoxikota/touch-grass', external: true },
            { label: 'NPM', href: 'https://www.npmjs.com/package/@touch-grass-ds/react', external: true },
            { label: 'CHANGELOG', href: 'https://github.com/thiagoxikota/touch-grass/blob/main/CHANGELOG.md', external: true },
            { label: 'LICENSE', href: 'https://github.com/thiagoxikota/touch-grass/blob/main/LICENSE', external: true },
          ]}
        />
        <FooterCol
          label="AUTHOR"
          items={[
            { label: 'THIAGOXIKOTA.COM', href: 'https://thiagoxikota.com', external: true },
            { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/thiagoxikota', external: true },
            { label: 'X / TWITTER', href: 'https://x.com/thiagoxikota', external: true },
          ]}
        />
      </div>
      <div className="border-t border-[var(--color-hairline)] px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[var(--color-fg)]">
        <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em]">
          // TOUCH GRASS DS — BRUTALIST. NO MERCY. MIT LICENSED.
        </span>
        <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
          © {new Date().getFullYear()} THIAGO XIKOTA
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] border-b border-[var(--color-hairline)] pb-2 mb-3">
        // {label}
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noreferrer noopener' : undefined}
              className="font-mono text-[13px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] inline-block px-1 -mx-1"
            >
              {it.label} {it.external ? '↗' : '→'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
