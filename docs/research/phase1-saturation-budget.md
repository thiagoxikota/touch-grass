# Saturation Budget do DS touch-grass

## Princípio geral

O touch-grass é um design system monocromático-primeiro: 90% da UI deve usar a base grayscale (preto, brancos, cinzentos). Saturação é reservada para momentos específicos de semântica e celebração. Esta restrição intencional reduz carga cognitiva, reforça a ética de design focado em tempo bem-gasto, e evita a maximização de engagement através de cor. O Timeouts (produto construído sobre touch-grass) celebra desconexão — não engagement. Saturação é alocada com parcimônia: apenas para estados irreversíveis de risco (vermelho) e conquistas de desconexão (verde). Nenhuma outra cor.

---

## Zona 1 — Base monocromática (90% da UI)

**Propósito:** Neutralidade perceptual. A UI desaparece em favor do conteúdo.

**Tokens:**
- `color.bg` (#000000) — fundo primário
- `color.bgAlt` (#0A0A0A) — superfície interna, dividers
- `color.fg` (#FFFFFF) — texto primário, headings, corpo
- `color.fgMuted` (#B3B3B3) — texto secundário, labels, metadata (>7:1 em preto)
- `color.fgSubtle` (#808080) — texto terciário, timestamps, placeholders (>4.5:1 em preto, metadata/labels apenas)
- `color.hairline` (#1A1A1A) — border padrão, dividers
- `color.hairlineStrong` (#333333) — border ênfase, focus ring, selected states

**Permitido em:**
- Backgrounds de containers, sections, full-page layouts
- Texto em todos os pesos semânticos (heading, body, secondary, metadata)
- Borders, dividers, grids
- UI chrome (buttons default state, tabs inactive, toggles off)
- Icons de ação neutra (chevrons, arrows, close, menu)
- Placeholders, ghost text, skeletons
- Inputs sem foco, form labels
- Tables, lists, cards estruturais

**Proibido em:**
- Estados semânticos (erro, alerta, sucesso, info) — usar zonas específicas
- Celebração ou reconhecimento — usar zona 5
- Badges ou notificações críticas — usar zona 3 ou 4
- Badges de "nova funcionalidade" ou "experimental" — usar zona 3 apenas
- Backgrounds de avatares de usuário — ver zona 5 (celebração)

---

## Zona 2 — Marca / Accent (máximo 2% da UI)

**Propósito:** identidade visual única de cada produto. Cada produto decide se usa ou não; o DS permite, com guardrails.

**Tokens (por produto):**

- `color.brand.primary` — cor principal da marca do produto
- `color.brand.secondary` — cor secundária opcional
- Nomes reais definidos em `brand/<produto>/tokens.*`, nunca em hex direto no código

**Permitido em (Timeouts, exemplo):**

- Logo e wordmark
- Pack card (identidade do grupo)
- Border/acento em proof photo
- Ilustrações editoriais em onboarding e páginas de landing

**Proibido em:**

- Notification badges (sempre monocromo)
- Countdown timers, contadores de streak
- Botões de erro/perigo (vermelho manda, não marca)
- Estados de urgência artificial
- Hover/active de elementos não-identitários (mantém monocromo)

**Rationale:**
O touch-grass é austero por padrão. Produtos que herdam o DS podem reservar até 2% da UI para marca se a cor serve identidade (reconhecer "isso é meu pack") e não engajamento (chamar atenção para notificação). A doutrina de cada produto declara explicitamente onde a marca aparece.

---

## Zona 3 — Estados semânticos muted (5% da UI)

**Propósito:** Comunicar estado de transação ou informação, sem urgência visual. Info, dicas, contexto.

**Tokens:**
- `color.fgMuted` (#B3B3B3 no dark) — para rótulos informativos
- `color.hairlineStrong` (#333333 no dark) — para borders informativos

*Nota: Estados semânticos "puros" (info blue, warning orange) não existem no touch-grass. Se necessário info visual saturada, elevar para zona 4 ou 5.*

**Permitido em:**
- Helper text (explicações debaixo de inputs)
- Hint icons com `currentColor` (monocromáticos)
- Labels informativos ("opcional", "beta", "novo")
- Borders informativos de cards
- Toast messages informativos (sem ícone colorido)

**Proibido em:**
- Ícones de erro ou perigo
- Badges críticas
- Estados que exigem atenção imediata

---

## Zona 4 — Perigo crítico (vermelho, <1% da UI)

**Propósito:** Marcar estados irreversíveis. Perda de dados. Ação destrutiva sem volta.

**Token:**
- `color.danger` (#FF6B6B no dark, #D11010 no light) — WCAG AAA em preto

**Permitido em:**
- "Deletar conta" button (estado final, não hover)
- "Deletar foto prova" confirmation modal (botão vermelho)
- "Sair do grupo" destrutivo (apenas confirmação final)
- "Resetar progresso" de streak (desconexão irreversível)
- Border/icon em "Atenção: ação irreversível" dialogs
- Ícone de "crítico" ou "erro crítico" (currentColor = danger)
- Toast de erro crítico (falha de rede, servidor down)

**Proibido em:**
- Botões de "cancelar" ou "voltar" (não são irreversíveis)
- Estados de desabilitar (usar fgSubtle)
- Avisos de "limite próximo" (usar zona 3)
- Notificações normais de erro (usar zona 3)
- Streak badges (celebração, não perigo) — usar zona 5
- Primary CTAs

**Rationale:**
Vermelho é visual heavy. Se aparecer toda hora, perde efetividade. O Timeouts reserva perigo para operações que, se clicadas por acidente, não podem ser revertidas (deletar foto de prova, sair de grupo, resetar streak). Avisos menos críticos (falha de sínc, erro de rede) mostram erro em monocromático com ícone red apenas.

---

## Zona 5 — Celebração e earned states (4% da UI)

**Propósito:** Reconhecer e celebrar desconexão. Streaks, goals atingidas, fotos de prova aprovadas, badges de achievement. Verde saturado = "você conquistou tempo desconectado".

**Token:**
- `color.earned` (#A6FF00 Bloomberg lime no dark, #18B019 no light)

**Permitido em:**
- Streak counter (número, ícone, glow) quando ativo
- Badge/chip de "7 dias", "30 dias" (achievement)
- Ícone de "prova aprovada" (checkmark verde)
- Background de card de "semana completa"
- Border + ícone de "novo recorde"
- Avatar ring de "ativo essa semana" (user profile)
- Toast positivo: "Foto adicionada!", "Streak mantida!"
- Animated "confetti" ou celebração visual (ícone verde)
- Números em progresso: dias sem app, horas ganhas
- Button de "confirmar prova" (ação de capture de momento desconectado)

**Proibido em:**
- Buttons padrão ou hover states
- Backgrounds de cards estruturais
- Texto de corpo ou descrições
- Primary CTAs em modo inativo (apenas active/earned)
- Menus ou chrome de navegação
- Form inputs ou labels
- Anything que celebrate engagement com o app (screen time, notifications opened, etc.)

**Rationale:**
Verde é reservado para celebração de desconexão. Em Timeouts, "earned" significa "tempo OFF do telefone, conseguido". Saturação verde só aparece quando há conquista real (streak cumprida, prova enviada, grupo completou meta). Não aparece em CTAs padrão porque não está "ganhado" ainda — aparece quando feito.

---

## Zona 6 — Proibições explícitas

Nunca use:

| Item | Por quê |
|------|---------|
| Azul (sky, navy, cyan, etc.) | BRAND.md §2.1 bane it. Evita cliché de tech/social. Timeouts não é app, é anti-app. |
| Laranja, amarelo saturado | Color creep. Uma vez que abre laranja, demanda orange badges, orange icons, orange hover. Não escala. |
| Roxo, rosa, turquesa | Nenhuma semântica. Puro decorativo. Violates mono-first principle. |
| Gradientes com cor saturada | Shadows/gradients imply 3D ou skeuomorphism. touch-grass é flat. BRAND.md bane it. |
| Drop shadows | BRAND.md explícito: brutalist, flat. Zero depth cues. |
| Opacity para dimming de texto | Use tokens de cor (fgMuted, fgSubtle). Opacity é trick. Tokens are truth. |
| Greys arbitrárias fora de tokens | Todas as greys vêm de: bg, bgAlt, fg, fgMuted, fgSubtle, hairline, hairlineStrong. Ponto. Se não existe, add token a color.json, não use hex. |
| Saturação em disabled states | Disabled = monocromático + opacity reduzida (fgSubtle). Never colored-out disabled. |
| Color overlays em imagens (user-generated content) | Fotos de prova são unfiltered. Sem vignette, color cast, ou grain. Puro conteúdo. |
| Animação de color (color.earned pulsing, etc.) | BRAND.md bane motion. Estático apenas. |
| Accessibility overrides (high-contrast mode custom colors) | Sistema já está em WCAG AAA. Não customizar. |

---

## Matriz de decisão UI

| Contexto UI | Zona | Token | Rationale |
|---|---|---|---|
| Background página | 1 | `color.bg` | Neutral. |
| Heading, título | 1 | `color.fg` | Primário legível. |
| Body text, descrição | 1 | `color.fg` | Standard weight. |
| Metadata, timestamp | 1 | `color.fgSubtle` | Secondary visual hierarchy. |
| Label input | 1 | `color.fgMuted` | >7:1 contrast. |
| Border padrão | 1 | `color.hairline` | Structural, not statement. |
| Border ênfase (focus ring) | 1 | `color.hairlineStrong` | Visible but understated. |
| Button primary — default state | 1 | `color.bg` + `color.hairlineStrong` border | Monocromático, quiet. |
| Button primary — hover | 1 | `color.bgAlt` (invert to lighter) | Interactive hint. |
| Button primary — disabled | 1 | `color.fgSubtle` + dimmed icon | Clearly inert. |
| Button secundário — default | 1 | `color.fg` text + `color.hairline` border | Lower visual priority. |
| Divider, separator | 1 | `color.hairline` | Structural. |
| Input field — unfocused | 1 | `color.bg` + `color.hairline` border | Quiet. |
| Input field — focused | 1 | `color.bg` + `color.hairlineStrong` border | Interactive hint. |
| Input field — error state | 4 | `color.danger` border | Only if data loss risk. |
| Toast error message | 3 | `color.fgMuted` text + icon monocromático | Info-level, not panic. |
| Toast error CRITICAL | 4 | `color.danger` text/border | Only server down, data loss. |
| Toast success | 5 | `color.earned` text + checkmark icon | Celebración. |
| Badge "novo" | 3 | `color.hairlineStrong` bg + `color.fg` text | Info-level. |
| Badge "beta" | 3 | `color.hairlineStrong` bg + `color.fg` text | Info-level. |
| Badge "ativo hoje" | 5 | `color.earned` bg + white text | Celebración. |
| Streak counter (número) | 5 | `color.earned` text | Active. |
| Streak counter (ícone) | 5 | `color.earned` (currentColor) | Active. |
| Streak broken / reset | 4 | `color.danger` text | Irreversible event. |
| Progress bar — filled | 5 | `color.earned` | Goal progress = earned. |
| Progress bar — unfilled | 1 | `color.hairline` | Structural. |
| Avatar ring — inactive | 1 | `color.hairlineStrong` | Neutral. |
| Avatar ring — active/ativo essa semana | 5 | `color.earned` | Celebración. |
| Proof image — approved checkmark | 5 | `color.earned` (currentColor) | Celebración. |
| Proof image — rejected/pending | 3 | `color.fgMuted` | Info. |
| Photo delete button — modal | 4 | `color.danger` button | Irreversible. |
| Group delete button — modal | 4 | `color.danger` button | Irreversible. |
| Group leave button — modal | 4 | `color.danger` button | Irreversible. |
| Confirmação de "sair grupo" | 4 | `color.danger` text + border | Irreversible. |
| Icon (generic, UI chrome) | 1 | currentColor (inherit fg) | Neutral. |
| Icon (success state) | 5 | currentColor = `color.earned` | Celebración. |
| Icon (error state) | 4 | currentColor = `color.danger` | Critical only. |
| Icon (info/hint) | 1 | currentColor = `color.fgMuted` | Secondary. |

---

## Guardrails de implementação

### 1. Token-only enforcement

**Regra:** Nenhum hex hardcoded em CSS ou código. Todos color references vêm de `var(--color-*)`.

**Linter (Stylelint):**
```yaml
rules:
  color-no-invalid-hex: true
  # Ban hardcoded colors:
  declaration-property-value-disallowed-list:
    - color: [/^(?!var\()/]  # Only allow var(), reject all other values
    - background-color: [/^(?!var\()/]
    - border-color: [/^(?!var\()/]
    - fill: [/^(?!var\()/]
    - stroke: [/^(?!var\()/]
```

**Exception:** Design tokens JSON (color.json, color-light.json) are source of truth. Never edit color values in CSS.

### 2. SVG currentColor enforcement

**Regra:** SVG `<svg>`, `<path>`, `<circle>`, `<line>` never have hardcoded fill/stroke. Use `currentColor` or `var(--color-*)`.

**Permitted:**
```jsx
<svg viewBox="0 0 24 24">
  <path d="M..." fill="currentColor" />  <!-- ✓ Inherits from text color -->
</svg>

<svg style={{ color: 'var(--color-earned)' }}>
  <path d="M..." fill="currentColor" />  <!-- ✓ Inherits from inline style -->
</svg>
```

**Banned:**
```jsx
<svg viewBox="0 0 24 24">
  <path d="M..." fill="#FF6B6B" />  <!-- ✗ Hardcoded. Use currentColor. -->
</svg>

<svg viewBox="0 0 24 24">
  <path d="M..." stroke="red" />  <!-- ✗ Named color. Not allowed. -->
</svg>
```

**Linter (ESLint for React/JSX):**
```js
// Plugin rule: ban hardcoded colors in SVG
'no-hardcoded-svg-colors': {
  checkFill: true,
  checkStroke: true,
  allowedValues: ['currentColor', /^var\(--color-/],
}
```

### 3. Product positioning check

**Regra:** Antes de usar `color.earned` ou `color.danger`, pergunta:

- **Earned (verde):** Isso celebra desconexão? (streak, prova aprovada, goal alcançado) → ✓ Use verde.
- **Earned (verde):** Isso celebra engagement com o app? (notificação lida, msg respondida) → ✗ Use monocromático.
- **Danger (vermelho):** Isso é irreversível? (deletar, sair, resetar) → ✓ Use vermelho.
- **Danger (vermelho):** Isso é um aviso ou erro reversível? (falha de rede, validation) → ✗ Use zona 3.

**Rationale:** Timeouts é anti-engagement. Verde only quando desconexão. Vermelho only quando não pode dar undo.

### 4. Light mode parity

**Regra:** Todos os tokens têm versão light (color-light.json). Nunca hardcode "light version" de color.

**Exemplo:**
```jsx
// ✓ Correct: use token, let CSS handle light/dark
<span style={{ color: 'var(--color-fg-muted)' }}>Metadata</span>

// ✗ Wrong: hardcoding light version
const lightColor = isDarkMode ? '#808080' : '#6E6E6E';
<span style={{ color: lightColor }}>Metadata</span>
```

Dark/light switch é CSS-level (prefers-color-scheme media query) ou data-* attribute. JavaScript never branches on color values.

### 5. Contrast audit (automated)

**Regra:** CI check deve validar que all text colors meet WCAG AAA on their background.

**Allowed combinations:**
- `color.fg` (#FFF) on `color.bg` (#000) = 21:1 ✓
- `color.fgMuted` (#B3B3B3) on `color.bg` (#000) = 7.2:1 ✓
- `color.fgSubtle` (#808080) on `color.bg` (#000) = 4.5:1 ✓ (metadata only)
- `color.earned` (#A6FF00) on `color.bg` (#000) = 12.6:1 ✓
- `color.danger` (#FF6B6B) on `color.bg` (#000) = 5.8:1 ✓

**CI rule (axe, pa11y, or custom):**
```js
// Automated: every DOM node with text must pass WCAG AAA
// White text on dark bg, or muted/subtle tokens, always pass.
// If custom colors are found, fail hard.
```

### 6. No opacity text dimming

**Regra:** Nunca use opacity para secondary text. Use color tokens.

**✗ Wrong:**
```css
.metadata {
  color: #ffffff;
  opacity: 0.6;  /* Crutch. Don't. */
}
```

**✓ Correct:**
```css
.metadata {
  color: var(--color-fg-subtle);  /* Already muted. */
}
```

**Rationale:** Opacity is a trick. Tokens are truth. If you need secondary text, use fgMuted or fgSubtle token.

### 7. No color in hover/active on monocromatic elements

**Regra:** Button hover/active states stay monocromático. No color swing.

**✗ Wrong:**
```css
button:hover {
  background-color: var(--color-earned);  /* Don't introduce color on hover. */
}
```

**✓ Correct:**
```css
button:hover {
  background-color: var(--color-bg-alt);  /* Brightness shift only. */
}
```

**Exception:** Earned (green) buttons in celebration zones (streak counter, goal reached) can stay green on hover. Danger buttons stay red.

### 8. Icon saturation rule

**Regra:** Icon color must match semantic meaning or inherit from text.

| Icon Type | Color | Rule |
|---|---|---|
| Chevron, arrow, menu | currentColor | Inherits text color |
| Checkmark (success/earned) | `var(--color-earned)` | Only for approved/completed states |
| X, close, cancel | currentColor | Neutral action |
| Trash, delete | `var(--color-danger)` | Only in delete confirmation modals |
| Warning, alert | currentColor or `var(--color-fgMuted)` | Never saturated unless critical |
| Info, help | currentColor | Neutral |
| Streak badge | `var(--color-earned)` | Celebración context |

### 9. Notification/toast rules

| Toast Type | Background | Text | Icon |
|---|---|---|---|
| Info (new feature, hint) | `var(--color-bg-alt)` | `var(--color-fg-muted)` | currentColor |
| Success (prova aprovada, streak kept) | `var(--color-bg-alt)` | `var(--color-earned)` | `var(--color-earned)` currentColor |
| Error (validation, network) | `var(--color-bg-alt)` | `var(--color-fg-muted)` | currentColor |
| Error Critical (server down, data loss) | `var(--color-bg-alt)` | `var(--color-danger)` | `var(--color-danger)` currentColor |

---

## Transição e rollout

### Phase 1 (Immediate)
- [ ] Merge `phase1-saturation-budget.md` ao repo como norma
- [ ] Atualizar BRAND.md com referência a saturation budget
- [ ] Ativar Stylelint rules para ban hardcoded colors
- [ ] Audit codebase para hex violations

### Phase 2 (Sprint N)
- [ ] Fix todos hardcoded colors em codebase para tokens
- [ ] Fix todos SVG hardcoded colors para currentColor
- [ ] Add CI checks (contrast, no hardcoded hex)

### Phase 3 (Sprint N+1)
- [ ] If product strategy changes (needs brand color in UI), add new token to color.json, document in saturation budget, DO NOT use hex in code
- [ ] Evergreen: code review checklist includes "color from token? SVG currentColor?"

---

## FAQ

**P: Posso usar uma cor customizada de um usuário (avatar background)?**
R: Não em superfícies estruturais. User-generated content (profile photo, proof image) é unfiltered. Chrome ao redor disso (avatar ring, border) usa tokens apenas. Se um usuário seta "cor favorita de streak", deve vir de uma paleta de opções pré-definida em color.json, não arbitrary user input.

**P: A marca do Timeouts pode usar cor saturada?**
R: Sim. O Timeouts consolida marca + earned no mesmo verde (`--color-earned` = `#A6FF00`, Bloomberg lime). A cor aparece em logo, pack card, borda de proof photo, ilustrações editoriais e nos momentos de celebração (streak atingido, milestone). Nunca em notificação, badge de pendência, countdown ou botão de erro. Vermelho continua reservado para ação irreversível.

**P: Animação de streak pulsing em verde é permitida?**
R: Não. BRAND.md bane motion. Estático apenas. O streak é verde, point. Sem animation, sem glow, sem pulse.

**P: Usuários que têm 0 dias de streak — badge em vermelho?**
R: Não. 0 streak é estado neutro, não perigo. Badge é monocromático (fgMuted ou hairlineStrong) ou sem badge. Vermelho é para irreversível (deletar), não para "zero".

**P: Form validation error em input — qual cor?**
R: Depende de risco. Validation standard (email inválido, campo vazio): monocromático + helper text. Form submit error por server: monocromático + toast info. Data loss risk (deletar batch de photos): danger red em modal confirm. Continuum: zona 3, zona 3, zona 4.

---

## Versão

- **v0.1** — 2026-04-24. Draft para review. Seis zonas definidas, matriz completa, guardrails de implementação. Não committed ainda.
