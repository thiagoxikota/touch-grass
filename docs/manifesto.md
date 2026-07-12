# Manifesto do Touch-Grass v2

## O que é touch-grass

Touch-grass é um design system orientado pela soberania cognitiva do usuário. Não é um bloqueador de aplicativos. Não é um timer de foco. É um conjunto de regras de design que qualquer produto pode herdar para rejeitar padrões que capturam atenção sem consentimento explícito.

O sistema nasce da observação simples: a capacidade de tomar decisões sobre seu próprio tempo e atenção é um direito fundamental. Interfaces éticas deixam a decisão com o usuário. Interfaces extrativistas decidem pelo usuário. Touch-grass existe para tornar fácil escolher o lado ético.

## Atenção e fricção

Atenção é recurso finito. Interfaces que competem por atenção sem resistência extraem valor que o usuário não ofereceu.

Rejeitamos padrões que capturam atenção reflexivamente: infinite scroll, auto-play, notificações em tempo real, badges vermelhas pulsantes, pull-to-refresh. Esses padrões funcionam. Não é acidente.

Em lugar deles, impomos fricção. Fricção bem desenhada não bloqueia ação legítima, apenas força o usuário a escolher com intenção. Estruturamos fricção em camadas.

A camada reflexiva é uma pergunta. Antes de qualquer ação cujo efeito é capturar atenção, o usuário responde "Por quê?". Não é punição. É reflexão. O ato de verbalizar intenção muda a decisão que se segue.

A camada visual usa redução de contraste e blur até que o usuário demonstre intenção. Uma notificação desfocada não chama atenção. Requer movimento consciente para trazer em foco. Isso não é obstáculo: é honestidade de interface.

A camada cognitiva garante que qualquer ação de baixa intenção (um clique acidental) não resulta em captura de atenção. Se a ação exigir mais do que um gesto reflexo, mais cognição, o usuário já estava escolhendo.

A camada temporal impõe espera. Três a cinco segundos. Tempo suficiente para mudança de estado mental. Tempo insuficiente para frustração. O atraso não bloqueia ação, apenas cria espaço para arrependimento.

A fricção adapta-se. Usuários com capacidade de trabalho reduzida (cansaço, lesão, neurodiferença) têm a opção de reduzir fricção localmente sem renunciar aos seus próprios padrões de defesa.

## Cor e saturação

Vivemos em interfaces hipersaturadas. Cores clamam por atenção. Movimento também. Movimento em cores saturadas é prédio em chamas.

Touch-grass usa 90% monocolor. Tons de cinza em diferentes brilhos. Sem decoração. Sem gradientes. Sem sombras: elas implicam movimento tátil.

A cor que não é cinza serve função específica. Vermelho (<1% da interface) sinaliza ação irreversível: "você não pode desfazer isso". Nunca usamos vermelho para criar urgência ou chamar atenção casualmente.

Verde (4% alocado) existe para um propósito único: celebrar desconexão. Quando você completa uma sessão de tempo offline, uma conquista, verde aparece. Verde não celebra engagement. Celebra ausência.

Essa economia de cor muda como o olho interpreta a interface. Cada cor tem peso semântico. Saturação não é decoração: é instrução. O usuário aprende: "Quando vejo cor aqui, algo acontece que importa."

Implementamos isso através de tokens. Nenhuma cor é hardcoded. Tudo referencia `--token-*`. A restrição não é limitação. É clareza.

## Métricas e privacidade

Existem duas categorias de métrica: as que medem se o sistema funciona e as que medem se o usuário está sendo extraído.

A primeira categoria importa. A segunda não.

Rejeitamos: engagement, time-on-app, DAU/MAU, comprimento de sessão, taxa de abertura de notificação, retenção em cohort, qualquer proxy para "quanto tempo você passa aqui". Métricas assim recompensam design extrativista.

O que medimos em lugar:

- **Qualidade de atenção**: o usuário sai com melhor compreensão do que entrou?
- **Hesitação pré-decisão**: quanto tempo leva para escolher. Fricção que muda padrão é fricção que funciona.
- **Variação entre estados de atenção**: padrões mais distribuídos, menos presos a extremos.
- **Sessões curtas concluídas**: se o usuário disse 5 minutos e gastou 5 minutos, sucesso não é mais tempo: é previsibilidade honesta.

Privacidade não é seção de política. É decisão de arquitetura. Coletamos o mínimo necessário. Nada é compartilhado sem consentimento explícito. O usuário vê o que foi armazenado e pode solicitar apagamento a qualquer momento. Retenção tem data de expiração automática.

Não há monetização de dados de usuário. Nenhuma.

## Notificações

Notificações em tempo real criam expectativa de resposta em tempo real. Essa expectativa é estresse.

Notificações em touch-grass são agrupadas em blocos diários (padrão: três; manhã, meio do dia, noite). O agrupamento é temático, não cronológico: notificações do mesmo tipo ficam juntas.

Nenhuma notificação é visual por padrão. Todas são ambientes: sons, vibrações sutis, indicadores de luz. Visuais exigem opt-in explícito.

Nenhuma notificação traz medo. Sem "Você perdeu..." sem "Seus amigos estão..." sem qualquer construção de FOMO. Se notificação existe, é porque o usuário pediu para saber disso.

O padrão é opt-in: nenhuma notificação começa ligada. O usuário habilita o que quer. Isso inverte o padrão que dominou a indústria nos últimos 15 anos. É o ponto.

## Linguagem e agentes

Linguagem inflada combate clareza. A maioria dos textos em interfaces usa 30% mais palavras do que precisa.

Touch-grass rejeita: termos inventados, jargão emprestado, acrônimos sem definição no texto, metáforas quando frases diretas funcionam.

Um exemplo concreto: não dizemos "dopamina digital." Dizemos "seu corpo se habitua a resposta rápida." Conceitual, verificável, não-pseudocientífico.

Nenhum texto em touch-grass usa primeira pessoa do sistema ("Eu gosto de..."). O sistema não pensa. Não sente. Não quer nada de você. Então não fala em primeira pessoa.

IA dentro de produtos herda as mesmas regras. Nenhuma manipulação de tom para parecer mais humana. Sem emoji. Sem entusiasmo artificial. Sem fingimento de relação. IA em touch-grass diz o que faz. Isso é suficiente.

## Como produtos herdam

Qualquer produto que escolha touch-grass como design system não herda uma visão de negócio. Herda um compromisso arquitetural.

Cada decisão de feature passa por: "Isso captura atenção sem consentimento?" Se a resposta é sim, ou não é permitida, ou exige fricção. "Isso incentiva comparação social?" Rejeitado. "Isso cria dependência de feedback visual?" Redesenhe.

Produtos carregam a marca do sistema mas escolhem cor, tipografia e densidade. O que não podem usar: infinite scroll, notificação em tempo real, métrica de engagement, "earn unlock", streak counter em vermelho, qualquer padrão que funciona porque explora reflexo involuntário.

A herdança é restrição deliberada. Restrição é o ponto.

## Métricas que rejeitamos

- Engagement (tempo, abertura, cliques, qualquer proxy para "quanto você usa isso")
- Time-on-app (medida direta de que você está sendo extraído)
- DAU/MAU (cohort retenção incentiva design extrativista)
- Comprimento de sessão (mais longo nunca é melhor design)
- Taxa de abertura de notificação (métrica que recompensa FOMO)
- Retenção em N dias (modelo incentiva agendamento de vício)
- Número de ações por sessão (ação não é valor; valor é resultado)
- Frequência de retorno (se volta, é porque condiciona, não porque escolhe)

## O que não fazemos

- Infinite scroll (captura reflexiva)
- Red pulsing badges (urgência artificial)
- Pull-to-refresh (ilusão de controle do usuário)
- Auto-play ou auto-expand (consentimento não é silêncio)
- Predictive autocomplete que "ajuda" escolhendo por você
- Variable ratio rewards (slot machine design)
- Upward social comparison (fotos dos outros ganham, seu feed faz você perder)
- Streak counters em vermelho (fomenta hábito sem escolha)
- "You're all caught up" com recomendações de novo conteúdo logo abaixo
- Progress bars que nunca chegam (Zeno's paradox como manipulação)
- Haptic feedback em resposta a ações triviais (treina reflexo)
- Confirmação imediata e celebração de ação com fricção zero (double-down)

---

Touch-grass não promete que usuários vão gastar menos tempo em seus produtos: esse compromisso não seria honesto. Promete que o tempo gasto é escolhido por eles. É o que design ético significa.
