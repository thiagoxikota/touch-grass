# Touch Grass DS — LinkedIn launch post draft

> Draft generated 2026-04-14 after publishing v1.0.0 to npm.
> groq.py / gemini.py both unavailable, written by hand in your voice.
> Revise before posting. Replace placeholder image with screenshot of P1 BUTTON or the Index hero.

---

Acabei de publicar o Touch Grass DS no npm.

É um design system React open-source feito contra tudo que virou padrão no design de produto: zero cantos arredondados, zero animação, zero hex code fora dos tokens, zero texto cinza. Se um componente precisa parecer "macio" pra funcionar, o componente está errado.

O que tem na caixa:
— 10 primitives (Button, Input, Stat, Switch, Badge, Tag, Divider, Avatar, Checkbox, Icon)
— 8 patterns prontos (LeaderboardRow, FocusTimerDisplay, BeRealStamp, SessionSummaryCard, Field, PatternInterruptModal, Sparkline)
— 74 testes vitest + RTL + axe rodando em todo primitive
— React 19, types co-shipped, ESM, tree-shakeable, MIT
— Tokens compilam pra CSS, Tailwind v4, Figma Variables e Swift, da mesma fonte

Por que existe: pra rodar o Timeouts.app — uma academia social pro tempo longe do celular. Não é timer de foco. Não é bloqueador. É Strava pra horas offline, com prova fotográfica e leaderboard. O DS é agnóstico ao produto, mas o produto é o motivo do DS existir.

A premissa: iOS e Material Design viraram o mesmo pântano de cantos 12px e fades de 200ms. Software de produtividade não devia parecer SaaS. Devia parecer ferramenta.

Quem quiser instalar:

  pnpm add @touch-grass-ds/react @touch-grass-ds/tokens

Repo: github.com/thiagoxikota/touch-grass
Docs ao vivo: timeouts.app

Pergunta honesta pra quem chegou até aqui: qual foi a última vez que você abriu um app e pensou "isso é uma ferramenta", não "isso é um produto"? Eu quero saber qual foi.
