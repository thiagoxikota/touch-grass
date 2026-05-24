export interface BridgeStage {
  id: string;
  stage: string;
  source: string;
  transform: string;
  target: string;
  proof: string;
}

export interface BridgeMapping {
  codeArtifact: string;
  figmaArtifact: string;
  rule: string;
}

import { SITE_URLS } from '../../lib/siteUrls';

export const FIGMA_CODE_BRIDGE = {
  title: 'Code ↔ Figma parity loop',
  summary:
    'Touch Grass uses code as source of truth, then mirrors tokens and components into Figma for design review, case-study storytelling, and implementation parity.',
  codeToFigma: [
    {
      id: '01',
      stage: 'TOKENS COMPILE',
      source: 'packages/tokens/src/*.json',
      transform: 'Style Dictionary build',
      target: 'tokens.css + figma-tokens.json + TouchGrassTokens.swift',
      proof: 'Same semantic token names ship to web, Figma, and iOS.',
    },
    {
      id: '02',
      stage: 'COMPONENT MIRROR',
      source: 'packages/ds/src/**/*.{ts,tsx}',
      transform: 'Primitive/pattern APIs mapped to variant axes',
      target: 'Figma component sets (P* and X* pages)',
      proof: 'Variant names and states match React props and states.',
    },
    {
      id: '03',
      stage: 'BRAND IMPORT',
      source: 'brand/**/*.svg',
      transform: 'SVG import + token-bound recolor',
      target: 'Foundation brand page assets',
      proof: 'Brand assets stay token-driven (no hardcoded color drift).',
    },
  ] satisfies BridgeStage[],
  figmaToCode: [
    {
      id: '01',
      stage: 'PARITY AUDIT',
      source: 'Figma variables/components',
      transform: 'Detect naming drift, missing states, wrong bindings',
      target: 'Actionable parity deltas',
      proof: 'Every mismatch is expressed as a code change request.',
    },
    {
      id: '02',
      stage: 'CODE PATCH',
      source: 'Parity deltas',
      transform: 'Update tokens/components in repo',
      target: 'Source files + tests',
      proof: 'Changes land in git, not only in design files.',
    },
    {
      id: '03',
      stage: 'REBUILD + RESYNC',
      source: 'Updated codebase',
      transform: 'Regenerate token outputs and remirror to Figma',
      target: 'Fresh parity state',
      proof: 'Round-trip closes with no unresolved deltas.',
    },
  ] satisfies BridgeStage[],
  mappings: [
    {
      codeArtifact: '--color-bg',
      figmaArtifact: 'color/bg (WEB syntax: var(--color-bg))',
      rule: 'Variable codeSyntax must match CSS variable name exactly.',
    },
    {
      codeArtifact: 'Button variant + state props',
      figmaArtifact: 'Button set axes: Variant, State',
      rule: 'Variant naming follows Property=Value pairs for combinable sets.',
    },
    {
      codeArtifact: 'Disabled + focus classes',
      figmaArtifact: 'DISABLED + FOCUS variants',
      rule: 'State semantics must be explicit in both surfaces.',
    },
    {
      codeArtifact: 'brand/touch-grass/*.svg',
      figmaArtifact: 'Imported vectors bound to color tokens',
      rule: 'Use token-bound recolor; never leave literal fills/strokes.',
    },
  ] satisfies BridgeMapping[],
  aiCaseStudyPayload: {
    narrativePages: ['GENESIS', 'PIPELINE', 'DECISION LOG'],
    evidenceTypes: ['token parity', 'component parity', 'state parity', 'brand parity'],
    keyQuestion: 'Can this design system prove that implementation and design stay in lockstep?',
    references: [SITE_URLS.byteByteGoDesignToCode],
    ingestion: {
      registryPath: 'docs/superpowers/specs/case-study.registry.json',
      canonicalSpecPath: 'docs/superpowers/specs/figma-code-bridge.case-study.json',
    },
  },
} as const;
