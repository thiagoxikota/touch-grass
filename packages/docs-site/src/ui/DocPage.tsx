import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ============================================================
 * Shared doc-page primitives — the building blocks every
 * foundations/primitives/patterns page composes from.
 * Keep everything here. One source of truth, brutalist defaults.
 * ========================================================== */

/* ---------------- Breadcrumb ---------------- */

export function Breadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [{ label: 'TOUCH GRASS', href: '/' }];
  let href = '';
  parts.forEach((p) => {
    href += '/' + p;
    crumbs.push({ label: p.replace(/-/g, ' ').toUpperCase(), href });
  });
  return (
    <nav
      aria-label="Breadcrumb"
      className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-fg-muted)] pb-3 mb-10 flex flex-wrap items-center gap-2"
    >
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-[var(--color-earned)]">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="text-[var(--color-earned)]">{c.label}</span>
          ) : (
            <Link
              to={c.href}
              className="hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] px-1 -mx-1"
            >
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ---------------- Eyebrow ---------------- */

export function Eyebrow({
  children,
  color = 'earned',
}: {
  children: ReactNode;
  color?: 'earned' | 'fg' | 'danger';
}) {
  const c =
    color === 'earned'
      ? 'text-[var(--color-earned)]'
      : color === 'danger'
      ? 'text-[var(--color-danger)]'
      : 'text-[var(--color-fg)]';
  return (
    <div className={`font-mono text-[13px] font-black uppercase tracking-[0.12em] ${c}`}>
      // {children}
    </div>
  );
}

/* ---------------- DocPage shell ---------------- */

export interface DocPageMeta {
  status?: 'stable' | 'beta' | 'draft';
  version?: string;
  tapTarget?: string;
  role?: string;
  importPath?: string;
}

export function DocPage({
  eyebrow,
  title,
  kicker,
  meta,
  children,
}: {
  eyebrow: ReactNode;
  title: string;
  kicker?: ReactNode;
  meta?: DocPageMeta;
  children: ReactNode;
}) {
  return (
    <article className="w-full">
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          {title}
          <span className="text-[var(--color-earned)]">.</span>
        </h1>
        {kicker && (
          <p className="text-[18px] font-mono font-bold max-w-[60ch] leading-relaxed text-[var(--color-fg)] mb-8">
            {kicker}
          </p>
        )}
        {meta && <MetaRow meta={meta} />}
      </header>
      {children}
    </article>
  );
}

function MetaRow({ meta }: { meta: DocPageMeta }) {
  const items: [string, string | undefined][] = [
    ['STATUS', meta.status?.toUpperCase()],
    ['VERSION', meta.version],
    ['TAP TARGET', meta.tapTarget],
    ['ROLE', meta.role?.toUpperCase()],
    ['IMPORT', meta.importPath],
  ];
  const present = items.filter(([, v]) => !!v) as [string, string][];
  if (present.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 border-2 border-[var(--color-fg)] border-r-0">
      {present.map(([k, v]) => (
        <div key={k} className="p-5 border-r-2 border-[var(--color-fg)]">
          <div className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-earned)] mb-2">
            // {k}
          </div>
          <div className="font-mono text-[14px] font-black uppercase tracking-[0.04em] text-[var(--color-fg)] break-all leading-tight">
            {v}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Section ---------------- */

export function Section({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow?: ReactNode;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  const slug = id ?? title.toLowerCase().replace(/\s+/g, '-');
  return (
    <section id={slug} className="mt-20 scroll-mt-24">
      <div className="flex items-baseline justify-between border-b-2 border-[var(--color-fg)] pb-3 mb-8">
        <div>
          {eyebrow && (
            <div className="mb-1">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h2 className="text-[32px] font-black tracking-[-0.02em]">{title}</h2>
        </div>
        <a
          href={`#${slug}`}
          aria-label={`Link to ${title}`}
          className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] px-1"
        >
          #
        </a>
      </div>
      {children}
    </section>
  );
}

/* ---------------- Preview ---------------- */

export function Preview({
  label = 'PREVIEW',
  children,
  className = '',
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className="border border-[var(--color-hairline)]">
      <figcaption className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] border-b border-[var(--color-hairline)] px-4 py-2">
        // {label}
      </figcaption>
      <div className={`p-8 bg-[var(--color-bg-alt)] ${className}`}>{children}</div>
    </figure>
  );
}

/* ---------------- CodeBlock with copy ---------------- */

export function CodeBlock({
  code,
  language = 'tsx',
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* noop — clipboard not available */
    }
  };
  return (
    <div className="border border-[var(--color-hairline)]">
      <div className="flex items-center justify-between border-b border-[var(--color-hairline)] px-5 py-3 bg-[var(--color-bg-alt)]">
        <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
          // {language.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] border-2 border-[var(--color-hairline)] px-3 py-1.5 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] focus-visible:outline-2 focus-visible:outline-[var(--color-earned)] focus-visible:[outline-offset:3px] cursor-pointer"
        >
          {copied ? 'COPIED ✓' : 'COPY'}
        </button>
      </div>
      <pre className="p-6 font-mono text-[14px] text-[var(--color-fg)] overflow-x-auto leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ---------------- PropsTable ---------------- */

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="border border-[var(--color-hairline)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[13px] min-w-[640px]">
          <thead>
            <tr className="border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              {['PROP', 'TYPE', 'DEFAULT', 'DESCRIPTION'].map((h) => (
                <th
                  key={h}
                  className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]"
                >
                  // {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-[var(--color-hairline)] last:border-b-0 align-top hover:bg-[var(--color-bg-alt)]">
                <td className="p-5 font-black text-[var(--color-fg)] text-[14px]">
                  {r.name}
                  {r.required && <span className="text-[var(--color-danger)]" aria-label="required">*</span>}
                </td>
                <td className="p-5 text-[var(--color-earned)]">{r.type}</td>
                <td className="p-5 text-[var(--color-fg)]">{r.default ?? '—'}</td>
                <td className="p-5 text-[var(--color-fg)] font-semibold max-w-[44ch] leading-relaxed">
                  {r.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p
        aria-hidden="true"
        className="md:hidden font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-fg-muted)] border-t border-[var(--color-hairline)] px-5 py-2 bg-[var(--color-bg-alt)]"
      >
        // SCROLL HORIZONTALLY →
      </p>
    </div>
  );
}

/* ---------------- DoDontGrid ---------------- */

export function DoDontGrid({
  dos,
  donts,
}: {
  dos: { label: string; node: ReactNode }[];
  donts: { label: string; node: ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)]">
      <div className="border-r-0 md:border-r border-b md:border-b-0 border-[var(--color-hairline)]">
        <header className="flex items-center justify-between px-4 py-2 border-b-2 border-[var(--color-earned)]">
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
            // DO
          </span>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
            ✓
          </span>
        </header>
        <ul className="divide-y divide-[var(--color-hairline)]">
          {dos.map((d) => (
            <li key={d.label} className="p-6">
              <div className="mb-3">{d.node}</div>
              <p className="font-mono text-[13px] font-bold text-[var(--color-fg)]">{d.label}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <header className="flex items-center justify-between px-4 py-2 border-b-2 border-[var(--color-danger)]">
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-danger)]">
            // DON'T
          </span>
          <span className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-danger)]">
            ✗
          </span>
        </header>
        <ul className="divide-y divide-[var(--color-hairline)]">
          {donts.map((d) => (
            <li key={d.label} className="p-6">
              <div className="mb-3">{d.node}</div>
              <p className="font-mono text-[13px] font-bold text-[var(--color-fg)]">{d.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- RelatedLinks ---------------- */

export interface RelatedItem {
  label: string;
  to: string;
  kind?: 'primitive' | 'pattern' | 'foundation' | 'external';
}

export function RelatedLinks({
  title = 'RELATED',
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  return (
    <section className="mt-20">
      <Eyebrow>{title}</Eyebrow>
      <nav
        aria-label={title}
        className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-hairline)] mt-4"
      >
        {items.map((r) => {
          const isExt = r.kind === 'external';
          const className =
            'block p-6 border-r border-b border-[var(--color-hairline)] h-full hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] cursor-pointer';
          const content = (
            <>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                // {(r.kind ?? 'related').toUpperCase()}
              </div>
              <div className="font-mono text-[18px] font-black uppercase tracking-[0.02em]">
                {r.label} →
              </div>
            </>
          );
          return isExt ? (
            <a key={r.to} href={r.to} target="_blank" rel="noreferrer noopener" className={className}>
              {content}
            </a>
          ) : (
            <Link key={r.to} to={r.to} className={className}>
              {content}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

/* ---------------- StatGrid ---------------- */

export interface StatItem {
  label: string;
  value: string;
  sub?: string;
}

export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border border-[var(--color-hairline)] border-r-0 border-b-0">
      {items.map((s) => (
        <div
          key={s.label}
          className="p-6 border-r border-b border-[var(--color-hairline)]"
        >
          <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
            // {s.label}
          </div>
          <div className="font-black text-[48px] leading-none tracking-[-0.04em] text-[var(--color-fg)] mb-2">
            {s.value}
          </div>
          {s.sub && (
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)]">
              {s.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- VariantsMatrix ---------------- */

export function VariantsMatrix<V extends string, S extends string>({
  variants,
  states,
  renderCell,
  variantLabel = 'VARIANT',
}: {
  variants: readonly V[];
  states: readonly S[];
  renderCell: (variant: V, state: S) => ReactNode;
  variantLabel?: string;
}) {
  return (
    <div className="border border-[var(--color-hairline)] overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-left p-4 border-r border-b border-[var(--color-hairline)] font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] w-[120px]"
            >
              // {variantLabel}
            </th>
            {states.map((s, i) => (
              <th
                key={s}
                scope="col"
                className={`text-left p-4 border-b border-[var(--color-hairline)] ${
                  i < states.length - 1 ? 'border-r' : ''
                } font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]`}
              >
                {s.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v, vi) => {
            const isLastRow = vi === variants.length - 1;
            return (
              <tr key={v}>
                <th
                  scope="row"
                  className={`text-left p-4 border-r border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)] ${
                    !isLastRow ? 'border-b' : ''
                  }`}
                >
                  {v.toUpperCase()}
                </th>
                {states.map((s, si) => (
                  <td
                    key={`${v}-${s}`}
                    className={`p-6 align-middle ${
                      si < states.length - 1 ? 'border-r' : ''
                    } ${!isLastRow ? 'border-b' : ''} border-[var(--color-hairline)] bg-[var(--color-bg-alt)]`}
                  >
                    {renderCell(v, s)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
