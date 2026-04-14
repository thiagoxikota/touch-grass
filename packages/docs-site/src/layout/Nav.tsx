import { NavLink } from 'react-router-dom';
import TouchGrassLogo from '@brand/touch-grass/logo.svg?react';

const foundations = [
  { label: 'OVERVIEW',  href: '/' },
  { label: 'BRAND',     href: '/foundations/brand' },
  { label: 'COLOR',     href: '/foundations/color' },
  { label: 'TYPE',      href: '/foundations/typography' },
  { label: 'SPACING',   href: '/foundations/spacing' },
  { label: 'BORDERS',   href: '/foundations/borders' },
  { label: 'GRID',      href: '/foundations/grid' },
  { label: 'MOTION',    href: '/foundations/motion' },
  { label: 'STATES',    href: '/foundations/states' },
];

const primitives = [
  { label: 'BUTTON',  href: '/primitives/button'  },
  { label: 'INPUT',   href: '/primitives/input'   },
  { label: 'BADGE',   href: '/primitives/badge'   },
  { label: 'CARD',    href: '/primitives/card'    },
  { label: 'TAG',     href: '/primitives/tag'     },
  { label: 'DIVIDER', href: '/primitives/divider' },
  { label: 'STAT',    href: '/primitives/stat'    },
  { label: 'TIMER',   href: '/primitives/timer'   },
];

const patterns = [
  { label: 'LEADERBOARD ROW', href: '/patterns/leaderboard-row' },
  { label: 'FOCUS TIMER',     href: '/patterns/focus-timer-display' },
  { label: 'BEREAL STAMP',    href: '/patterns/bereal-stamp' },
  { label: 'INTERRUPT',       href: '/patterns/pattern-interrupt-modal' },
  { label: 'SESSION SUMMARY', href: '/patterns/session-summary-card' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-6 py-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] border-b border-[var(--color-hairline)] ${
    isActive ? 'bg-[var(--color-earned)] text-black' : 'text-white hover:bg-[var(--color-bg-alt)]'
  }`;

const sectionClass = 'px-6 py-3 border-b border-[var(--color-hairline)] font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]';

export function Nav() {
  return (
    <nav className="border-r border-[var(--color-hairline)] w-[240px] flex-shrink-0">
      <div className="p-6 border-b border-[var(--color-hairline)] font-mono text-[11px] font-black uppercase tracking-[0.12em]">
        <TouchGrassLogo
          className="block w-full mb-4"
          style={{ color: 'var(--color-earned)' }}
        />
        <span className="text-[var(--color-earned)]">// V0.0.3</span>
      </div>
      <div className={sectionClass}>FOUNDATIONS</div>
      <ul className="list-none m-0 p-0">
        {foundations.map(({ label, href }) => (
          <li key={href}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
      <div className={sectionClass}>PRIMITIVES</div>
      <ul className="list-none m-0 p-0">
        {primitives.map(({ label, href }) => (
          <li key={href}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
      <div className={sectionClass}>PATTERNS</div>
      <ul className="list-none m-0 p-0">
        {patterns.map(({ label, href }) => (
          <li key={href}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
    </nav>
  );
}
