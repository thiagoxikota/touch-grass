import { Link } from 'react-router-dom';
import { Breadcrumb, Eyebrow } from '../../ui/DocPage';

export const title = 'ALL RECIPES';
export const slug = 'index';

const RECIPES = [
  { slug: 'poster-hero', label: 'POSTER HERO', desc: 'Big mono headline, muted subcopy, one brutal CTA.' },
  { slug: 'settings-panel', label: 'SETTINGS PANEL', desc: 'Dense but readable: labels in fg-subtle, values in fg.' },
  { slug: 'form-block', label: 'FORM BLOCK', desc: 'Field + Input + error/help states done cleanly.' },
  { slug: 'stats-dashboard', label: 'STATS DASHBOARD', desc: 'Stat + Divider rhythm; tabular numbers.' },
  { slug: 'empty-state', label: 'EMPTY STATE', desc: 'When there is nothing to show — intentional void.' },
  { slug: 'interrupt-flow', label: 'INTERRUPT FLOW', desc: 'Modal interrupt with two-button row, brutal emphasis.' },
  { slug: 'dense-table', label: 'DENSE TABLE', desc: 'Leaderboard in dense mode — tight rows, hairline rhythm.' },
  { slug: 'focus-timer-screen', label: 'FOCUS TIMER SCREEN', desc: 'Full-screen focus session with timer + meta stats.' },
];

export function RecipesIndex() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / GALLERY</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          RECIPES<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)] mb-4">
          Complete UI compositions built from Touch Grass primitives and patterns.
          Each recipe includes a rationale, token callouts, and a copy/paste snippet.
        </p>
        <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] max-w-[62ch] leading-relaxed">
          Use these as starting points for your own screens. Every recipe respects
          the core constraints: radius 0, no motion, tokens-only, 48px tap targets.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)]">
        {RECIPES.map((r, i) => (
          <Link
            key={r.slug}
            to={`/recipes/${r.slug}`}
            className={`block p-8 border-[var(--color-hairline)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] group ${
              i % 2 === 0 ? 'border-r' : ''
            } ${i < RECIPES.length - 2 ? 'border-b' : ''}`}
          >
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3 group-hover:text-[var(--color-bg)]">
              // {String(i + 1).padStart(2, '0')} — RECIPE
            </div>
            <div className="font-mono text-[20px] font-black uppercase tracking-[0.02em] mb-3">
              {r.label}
            </div>
            <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] leading-relaxed group-hover:text-[var(--color-bg)]">
              {r.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
