# Doutrina de Produto: Timeouts

## Tese

Timeouts é um app de accountability social para desconexão. Herda a arquitetura ética do touch-grass — rejeição de engajamento, fricção bem desenhada, celebração de ausência — mas inverte o escopo: enquanto touch-grass proíbe métricas de tempo no app, Timeouts usa mecânicas sociais para recompensar tempo *fora* do celular. A contradição é aparente. Streaks, fotos de prova, ranking de grupo e kudos não capturam atenção do app — celebram desconexão no mundo físico. A regra que distingue carve-out legítimo de regressão é simples: se a mecânica faz o usuário fechar o app rápido e voltar ao capim com sentimento de conquista, é touch-grass. Se faz ele checar o app constantemente esperando validação, é extração.

## Herança touch-grass

Timeouts não herda uma visão de negócio. Herda compromisso arquitetural. Cada feature passa por: "Isso captura atenção do app?" Sim → fricção ou rejeição. "Recompensa tempo online ou offline?" Offline → legítimo. Online → regressão. Usamos os mesmos princípios: friction layers, economia de cor, privacidade de arquitetura, métricas que medem autonomia (não vício).

## As 9 mecânicas: guardrails e testes de sanidade

### Streaks (7 dias / milestones)

**Por que parece violar touch-grass:** Streaks em apps são o padrão clássico de habit-loop: gamificação vermelha, contadores urgentes, notificações no último segundo.

**Por que serve desconexão:** Um streak de 7 dias não é meta do app — é meta de *estar desligado*. Quebrar significa "falhei a mim mesmo e meu grupo", não "perdi pontos". Cria intenção física: "estou no dia 14 desconectado".

**Guardrails:** Sem notificação às 23h55 tipo "seu streak vai quebrar". Sem badge variável. Streak visível só depois de fechar o app. Efeito visual monocromo. Sem countdown timer ansiogênico.

**Teste de sanidade:** Usuário abre o app 5x/dia para confirmar streak? → regressão. Mantém desconexão porque o grupo conta com ele? → legítimo.

### Proof photos (geoloc + selfie offline)

**Por que parece violar:** Fotos são reflexo social; redes sociais exploram vanidade.

**Por que serve desconexão:** Exige 30 segundos mínimo: tirar foto, geolocalizar, enviar. Transforma desconexão abstrata em evidência física. Grupo vê prova visual ("você realmente desligou"), não conta de curtidas.

**Guardrails:** Privadas por padrão. Visíveis só para pack (4-6 pessoas) dentro de 24h. Sem contador de vistas. Sem notificação quando alguém comentar. Sem "trending".

**Teste de sanidade:** Parou de sair porque foto não tá bonita? → regressão. Quer sair porque pack vai validar prova? → legítimo.

### Kudos (reconhecimento direto, 1 por pessoa/dia)

**Por que parece violar:** Reconhecimento público é sistema de recompensa.

**Por que serve desconexão:** Uma pessoa só pode dar kudos 1x/dia (sem variable ratio). Feedback é textual ("você não falhou a nós"), não numérico. Ativa relatedness (ser visto) sem criar adição.

**Guardrails:** Máx 1 por pessoa/dia. Sem agregador público de totais. Visível só pra recipiente, não em leaderboard. Sem notif quando receber.

**Teste de sanidade:** Usuário abre o app toda hora para dar kudos? → regressão. Saiu mais porque o pack validou? → legítimo.

### Group ranking (posição no pack, 1x/dia)

**Por que parece violar:** Leaderboards exploram comparação social.

**Por que serve desconexão:** Ranking mede dias desconectado, não horas no app. Posição 1 = mais tempo no mundo real. Cooperativo (pack vs. desafio), não competitivo (eu vs. você). Atualiza 1x/dia (sem obsessão real-time).

**Guardrails:** Sem atualização real-time. Só entre pack-mates (4-6 pessoas), não global. Sem notif de "subiu/desceu". Visual monócromo.

**Teste de sanidade:** Anula meta desconexão pra ficar top 1? → regressão. Mantém 7 dias porque pack conta? → legítimo.

### Brand color (verde earned)

**Por que parece violar:** Cores saturadas estimulam reflexo.

**Por que serve desconexão:** O verde de marca do Timeouts é o mesmo verde "earned" do DS (`--color-earned`, Bloomberg lime `#A6FF00`). Identidade visual = celebração de desconexão — uma cor só, dois usos coerentes. Ver o verde Timeouts é reconhecer "isso celebra tempo fora do celular".

**Guardrails:** Verde só em: logo/wordmark, pack card, border de proof photo, confirmação de milestone/streak, ilustrações editoriais. Nunca em notificação, countdown, badge de pendência, CTA de erro. Vermelho continua reservado para ação irreversível (perda de streak, deletar conta).

**Teste de sanidade:** Verde começa a aparecer em contextos de urgência artificial ou ação cotidiana? → regressão, auditar paleta. Verde marca identidade de pack e conquista de desconexão? → legítimo.

### Social notifications (1x daily digest, 18h)

**Por que parece violar:** Notificações são mecanismo de captura clássico.

**Por que serve desconexão:** Agrupa tudo (kudos, proofs, checkpoints) em 1 blast diário às 18h. Ambient awareness sem hijacking. Usuário vê "o que rolou no pack", volta ao mundo feliz.

**Guardrails:** Máx 1 notif/dia, horário fixo (não aleatório). Batch digest, não pops individuais. Sem badge vermelha. Sem auto-expand em lock screen.

**Teste de sanidade:** Usuário começa a abrir o app antes das 18h esperando a notificação? → regressão. Abre o digest uma vez, vê o grupo, segue a vida? → legítimo.

### Pack competition (desafio grupal, 14 dias)

**Por que parece violar:** Competição é engagement driver clássico.

**Por que serve desconexão:** 4-6 pessoas vs. objetivo compartilhado (ex: "100 horas desconectadas em 2 semanas"). Métrica é conjunta, não individual. Todos remam pro mesmo lado.

**Guardrails:** Sem leaderboard interno. Métrica é "meta do grupo" (sim/não), não "posição individual". Sem notif de atraso. Sem "catch-up mechanics".

**Teste de sanidade:** Usuário abre o app 3x/dia só para ver o progresso do desafio? → regressão. Se desliga com mais disciplina porque o grupo conta? → legítimo.

### AI coach (assíncrono, parceiro de decisão)

**Por que parece violar:** IA que "sugere" cria dependência de system advice.

**Por que serve desconexão:** Coach responde *depois* ("como foi?"), não *antes* ("desligue, confie em mim"). Força reflexão cognitiva. Conversas async (sem real-time chat).

**Guardrails:** Sem push notifications. Sem auto-suggestions. Sem real-time messaging. Coach aparece em screen dedicada, não inline. Conversas privadas.

**Teste de sanidade:** Coach virou notificador obsessivo? → regressão. Usuário planeja desconexão com coach, desliga, reflete depois? → legítimo.

### Activity feed (pessoal, privado, por período)

**Por que parece violar:** Feeds são engines de scroll infinito e adição.

**Por que serve desconexão:** Feed é pessoal (só seu histórico), não social. Formato: "Semana 18-24 Abr: 22h desconectado, 4 saídas, 3 notches". Sem scroll infinito. Agrupa por período (semana/mês), fim visível.

**Guardrails:** Privado (só usuário vê). Períodos fixos. Sem auto-expand. Atualiza 1x/semana, não diariamente. Design tabular (dados claros), não visual-heavy.

**Teste de sanidade:** Feed virou obsessão de refresh diário? → regressão. Usuário revisa semana, sente pride, desliga app? → legítimo.

## Sinais de regressão a vigiar

- Usuários abrindo o app >3x/dia para conferir mecânica (streak, ranking, kudos)
- Sessão média >2 minutos (deveria ser: entrou → validou → saiu)
- Notification open rate >40% (sinal de urgência artificial, não ambient awareness)
- Usuários adiam desconexão para "proteger streak" ou "ver update de ranking"
- Pico de logins logo após evento social do pack (<5 min)
- Tempo no Timeouts cresce junto com o tempo total de tela do usuário (deveria crescer em direção oposta)
- Feedback em entrevista: "sinto falta quando não consigo checar meu ranking" / "quero mais notificações para não perder nada"
- Competição vira pessoal: "eu vs. fulano" em vez de "pack vs. desafio"
- Usuários adiam saída até ter a foto "perfeita" para postar

## Saturation budget aplicado a Timeouts

Timeouts respeita a economia de cor touch-grass com uma decisão de consolidação: o verde de marca e o verde "earned" são o mesmo token. Uma cor, dois usos coerentes.

| Zona | % | Função | Token |
| --- | --- | --- | --- |
| Base (monocromo) | ~90% | Backgrounds, tipografia, estrutura | `--color-bg`, `--color-fg`, `--color-fgMuted` |
| Verde (marca + earned) | ~6% | Identidade Timeouts (logo, pack card, proof border) + celebração de desconexão (streak atingido, milestone, confirmação de proof) | `--color-earned` (#A6FF00, Bloomberg lime) |
| Vermelho (danger) | <1% | Ações irreversíveis (reset de streak, deletar conta) | `--color-danger` — nunca em notificação, badge ou CTA |
| Muted semântico | ~3% | Status secundário (pending, inactive, metadata) | `--color-fgMuted`, `--color-hairlineStrong` — sem saturação |

Regra: nenhuma cor hardcoded. Tudo via `var(--color-*)`. Linter rejeita hex direto. SVGs usam `currentColor`. A consolidação verde = marca + earned corta ambiguidade: um dev vê `--color-earned` no código e sabe que está tanto celebrando desconexão quanto reforçando identidade de marca.

## Carry-over para o DS

Como consequência desta doutrina, o lado DS (touch-grass) absorve:

- `--color-earned` permanece a única entrada verde do sistema; Timeouts não pede token de marca adicional.
- Regras de escopo (`logo`, `pack card`, `proof border`, `milestone`, ilustração) moram aqui, não no DS — o DS mantém "max one earned hit per component".
- Qualquer surface Timeouts (app iOS, landing, docs-site quando mencionar Timeouts) usa os mesmos tokens do DS sem fork de paleta.

## O que Timeouts não faz

- Infinite scroll ou bottomless feed
- Red pulsing badges
- Notificações variáveis em timing/quantidade
- Auto-play ou auto-expand
- Variable ratio rewards
- Upward social comparison (feed do grupo mostrando "vidas perfeitas")
- Leaderboard competitivo global
- Countdown timers pra deadline de streak
- "Você perdeu..." ou construção de FOMO
- Real-time chat (todas conversas são async)
- Metrics de "engagement", "time-on-app", "DAU/MAU"
- Celebração de tempo gasto no Timeouts (só do tempo *fora*)

---

*Doutrina v2 — fonte de verdade para toda surface Timeouts (app, landing, docs quando mencionar o produto). Revisar se qualquer sinal de regressão do bloco acima aparecer em telemetria ou entrevista.*
