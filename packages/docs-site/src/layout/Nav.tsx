import { NavLink } from 'react-router-dom';
import TouchGrassLogo from '@brand/touch-grass/logo.svg?react';

// Use eager loading to access module.title without async boundary
const foundationsGlob = import.meta.glob('../pages/foundations/*.tsx', { eager: true }) as Record<string, any>;
const primitivesGlob = import.meta.glob('../pages/primitives/*.tsx', { eager: true }) as Record<string, any>;
const patternsGlob = import.meta.glob('../pages/patterns/*.tsx', { eager: true }) as Record<string, any>;

function getLinkInfo(path: string, category: string, module: any) {
  const name = path.split('/').pop()!.replace('.tsx', '');
  
  const label = module.title || name.replace('Page', '').replace(/([A-Z])/g, ' $1').trim().toUpperCase();
  const slug = module.slug || (name === 'BeRealStampPage' ? 'bereal-stamp' : name.replace('Page', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
  
  return { label, href: `/${category}/${slug}` };
}

const foundations = [
  { label: 'OVERVIEW', href: '/' },
  ...Object.entries(foundationsGlob).map(([p, m]) => getLinkInfo(p, 'foundations', m))
];
const primitives = Object.entries(primitivesGlob).map(([p, m]) => getLinkInfo(p, 'primitives', m));
const patterns = Object.entries(patternsGlob).map(([p, m]) => getLinkInfo(p, 'patterns', m));

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-6 py-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] border-b border-hairline ${
    isActive ? 'bg-earned text-black' : 'text-white hover:bg-bg-alt'
  }`;

const sectionClass = 'px-6 py-3 border-b border-hairline font-mono text-[11px] font-black uppercase tracking-[0.14em] text-earned';

import { useEffect } from 'react';

export function Nav() {
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
    <nav className="border-r border-hairline w-[240px] flex-shrink-0">
      <div className="p-6 border-b border-hairline font-mono text-[11px] font-black uppercase tracking-[0.12em]">
        <TouchGrassLogo
          className="block w-full mb-4"
          style={{ color: 'var(--color-earned)' }}
        />
        <div className="flex items-center justify-between">
          <span className="text-earned">// V0.0.3</span>
          <button 
            onClick={toggleTheme} 
            className="border-2 border-hairline px-2 py-1 hover:bg-fg hover:text-bg transition-none text-[9px] cursor-pointer"
          >
            THEME
          </button>
        </div>
      </div>
      <div className={sectionClass}>FOUNDATIONS</div>
      <ul className="list-none m-0 p-0">
        {foundations.map(({ label, href }) => (
          <li key={label}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
      <div className={sectionClass}>PRIMITIVES</div>
      <ul className="list-none m-0 p-0">
        {primitives.map(({ label, href }) => (
          <li key={label}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
      <div className={sectionClass}>PATTERNS</div>
      <ul className="list-none m-0 p-0">
        {patterns.map(({ label, href }) => (
          <li key={label}><NavLink to={href} end className={linkClass}>{label}</NavLink></li>
        ))}
      </ul>
    </nav>
  );
}
