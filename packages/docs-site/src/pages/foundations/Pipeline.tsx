import { CodeBlock, DocPage, RelatedLinks, Section } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';
import { SITE_URLS } from '../../lib/site';
import { FIGMA_CODE_BRIDGE } from '../../content/caseStudies/figmaCodeBridge';

export const title = 'PIPELINE';
export const slug = 'pipeline';

function StageTable({
  title,
  rows,
}: {
  title: string;
  rows: readonly {
    id: string;
    stage: string;
    source: string;
    transform: string;
    target: string;
    proof: string;
  }[];
}) {
  return (
    <div className="border border-[var(--color-hairline)]">
      <div className="border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)] p-4">
        <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
          // {title}
        </div>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.id}
          className={`grid grid-cols-1 md:grid-cols-[80px_220px_1fr] ${
            index < rows.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
          }`}
        >
          <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)] font-black text-[30px] leading-none text-[var(--color-earned)]">
            {row.id}
          </div>
          <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // STAGE
            </div>
            <div className="font-mono text-[14px] font-black uppercase tracking-[0.06em] text-[var(--color-fg)]">
              {row.stage}
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ['SOURCE', row.source],
                ['TRANSFORM', row.transform],
                ['TARGET', row.target],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-earned)] mb-1">
                    // {k}
                  </div>
                  <div className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-[var(--color-hairline)] pt-4 font-mono text-[12px] font-black uppercase tracking-[0.08em] text-[var(--color-fg)]">
              PROOF: {row.proof}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Pipeline() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / PIPELINE"
      title="CODE ↔ FIGMA"
      kicker={FIGMA_CODE_BRIDGE.summary}
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'parity-loop',
      }}
    >
      <Section eyebrow="LOOP" title="TWO-WAY SYSTEM">
        <div className="grid grid-cols-1 gap-8">
          <StageTable title="CODE → FIGMA" rows={FIGMA_CODE_BRIDGE.codeToFigma} />
          <StageTable title="FIGMA → CODE" rows={FIGMA_CODE_BRIDGE.figmaToCode} />
        </div>
      </Section>

      <Section eyebrow="CONTRACT" title="ARTIFACT MAPPINGS">
        <div className="border border-[var(--color-hairline)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] bg-[var(--color-bg-alt)] border-b border-[var(--color-hairline)]">
            {['CODE', 'FIGMA', 'RULE'].map((h, i) => (
              <div
                key={h}
                className={`p-4 font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] ${
                  i < 2 ? 'md:border-r border-[var(--color-hairline)]' : ''
                }`}
              >
                // {h}
              </div>
            ))}
          </div>
          {FIGMA_CODE_BRIDGE.mappings.map((mapping, i) => (
            <div
              key={mapping.codeArtifact}
              className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] ${
                i < FIGMA_CODE_BRIDGE.mappings.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-4 md:border-r border-[var(--color-hairline)] font-mono text-[13px] font-black text-[var(--color-fg)]">
                {mapping.codeArtifact}
              </div>
              <div className="p-4 md:border-r border-[var(--color-hairline)] font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                {mapping.figmaArtifact}
              </div>
              <div className="p-4 font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                {mapping.rule}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="AI CASE STUDY" title="DISPLAY-READY PAYLOAD">
        <CodeBlock
          language="json"
          code={JSON.stringify(FIGMA_CODE_BRIDGE.aiCaseStudyPayload, null, 2)}
        />
      </Section>

      <RelatedLinks
        items={[
          { label: 'RELEASES', to: '/foundations/releases', kind: 'foundation' },
          { label: 'BRAND', to: '/foundations/brand', kind: 'foundation' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
          {
            label: 'BYTEBYTEGO · DESIGN↔CODE',
            to: SITE_URLS.byteByteGoDesignToCode,
            kind: 'external',
          },
        ]}
      />
    </DocPage>
  );
}
