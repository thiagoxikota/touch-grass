# Touch Grass: Princípios Universais para Produtos Éticos

Princípios extraídos dos manifestos v1 (EN/PT) aplicáveis a qualquer produto do ecossistema touch-grass que priorize soberania cognitiva do usuário. Excluídos: padrões específicos de bloqueadores/detox que removem agência voluntária.

---

## 1. Anti-Dark Patterns

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Sem Infinite Scroll | Toda página/feed tem fim visível. Exigir clique explícito "carregar mais" ou paginação numérica. Nunca carregar conteúdo automático ao scroll. | Infinite scroll; carregamento automático disfarçado de "natural"; feeds bottomless ("sopa sem fundo") | Section 5: Five Absolute Prohibitions |
| Sem Nudging Preditivo | Interface nunca "pré-decide" intenção do usuário. Proibido auto-complete de ações, sugestões que simulam escolha autônoma, ou "completar por você". | Predictive nudging; auto-completion que ilude agência; defaults que fingem ser neutros | Section 5: Five Absolute Prohibitions |
| Sem Feedback Imediato não-Essencial | "Pull-to-refresh", haptic rewards para ações triviais, badges piscantes: eliminados. Feedback apenas para ações significativas e solicitadas. | Immediate feedback loops; variable ratio reinforcement; pull-to-refresh loops | Section 5: Five Absolute Prohibitions |
| Métricas Privadas por Padrão | Progresso, streaks, "dias desconectado", foco: visíveis APENAS ao usuário. Zeroed por padrão: likes, shares, views públicos (opt-in explícito, não default). | Vanity metrics; public streaks; upward social comparison; extraction via social proof | Section 3: Privatization of Success |
| Sem Reforço de Comparação Social | Architecura social: cooperativa, não competitiva. Nenhuma "placar", "ranking", "mais que seus amigos". Mostrar progresso compartilhado (coletivo) em vez de individual + adversarial. | Competitive metrics; vanity metrics; upward anxiety; social comparison loops | Section 3: Relatedness & Cooperative Relationships |

---

## 2. Calm Tech / Redução de Saturação Sensória

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Palette Monochromatic por Padrão | Cinza, branco, preto: palette padrão. Cor saturada (incluindo vermelho) APENAS para dados críticos de segurança. Nunca para notificações rotineiras. | Vibrant colors on notifications; saturated saliency (Holte & Ferraro research); "visual feast" that hijacks attention | Section 5: Grayscale and Contrast |
| Redução de Saturação Cognitiva | Interface mínima: menos elementos, menos movimento. Cada cor, ícone, animação deve justificar-se por função, não por "pop". Aesthetic silence é default. | Dense UIs; decorative motion; gratuitous animations; high visual entropy (fora de contexto de comparação ativa) | Section 5: Calm Interface; Neuroergonomics |
| Sem Badges Dinâmicos de Notificação | Red badges, pulsing indicators, dot animations: proibidos. Notificações urgentes: design quieto (haptic subtil, auditory "glance"). | High-saliency notifications; badges designed to capture foveal attention; color-based alerts | Section 5: Notification Architecture |
| Sem Movimento Que Demanda Foco | Parallax, infinite carousels, auto-playing content: removido. Movimento APENAS se user intenciona (clique, scroll deliberado). | Autoplay content; infinite carousels; parallax that hijacks gaze; decorative animation | Section 5: Calm Interface |

---

## 3. Fricção Ética (Scaffolded Cognitive Friction)

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Fricção Reflexiva | Antes de ação de alto-custo cognitivo, prompt: "Qual seu objetivo específico agora?" ou "Por que abrir isso?". Força retorno a System 2 (análise) antes de System 1 (heurística). | Frictionless conclusions; System 1 dominance; bypassing deliberation | Section 4: Reflexive Friction |
| Fricção Visual | Conteúdo desfocado até ação intencional de "reveal". Blurring força escolha consciente antes de consumo. Applica-se a feeds, conteúdo sensivelmente-charged. | Immediate access; bypassing deliberation; System 0 pre-processing without evidence accumulation | Section 4: Visual Friction |
| Fricção Cognitiva | Tarefa de esforço baixo antes de acesso (ex: resumir em 5 palavras "por que abro X?", responder pergunta simples). Acumula evidência antes de decisão. | Effortless access; evidence vacuum; zero barrier to compulsive action | Section 4: Cognitive Friction |
| Pausa Temporal (3-5s) | Lockout curto (3-5s, não 12-24h) entre trigger e ação para "sistema nervoso esfriar". Quebra automaticidade, permite pré-frontal cortex intervir. NÃO usa como punição. | Automatic action; habituality; prefrontal cortex bypass | Section 4: Temporal Friction; Dorsal Vagal Drift |
| Modulação Adaptativa (HDDM) | Sistema monitora Working Memory Capacity (WMC) do usuário. Fricção aumenta se WMC saturada; diminui se user demonstra atenção plena. Bayesian: não static friction "shock". | Friction shock (excessive resistance → reactance); one-size-fits-all barriers | Section 4: Bayesian Adaptive Moderation |

---

## 4. Arquitetura de Notificações

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Batching Assíncrono | Comunicações em blocos agendados (ex: 3x/dia, não em tempo real). Reduz interrupção cognitiva, permite ritmo do usuário. | Real-time push; variable ratio reinforcement; dopaminergic seeking kept in constant alert | Section 5: Notification Architecture: Batching |
| Ambient Awareness | Status updates via pistas não-visuais (haptic subtil, auditory glance) na periferia. NÃO requer foveal attention até user-initiated shift. | High-saliency visual notifications; immediate foveal capture; attention hijacking | Section 5: Ambient Awareness |
| Opting In para Notificações (Não Opt-Out) | Default: nenhuma notificação, não batidas de periferia. Usuário EXPLICITLY habilita categorias desejadas. Never resort a "turn everything off", esse é o default. | Notification defaults enable; opt-out friction; dark pattern of pre-enabled alerts | Section 5: Notification Architecture |
| Sem Notificações de "Você Perdeu" | Nada do tipo "X pessoas curtiram seu post" ou "Você ficou inativo 2 dias". Notificações apenas para ações solicitadas ou marcos pessoais (não sociais). | FOMO-inducing notifications; upward social comparison; extraction via absence | Implicit in Section 3: Privatization of Success |

---

## 5. Privacidade & Defaults Éticos

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Privacy by Default | Dados pessoais NUNCA compartilhados sem consentimento explícito, pré-ação. Padrão: máxima privacidade. Opt-in, não opt-out. | Privacy through obscurity; deep menu navigation; dark patterns de consent | Implicit in Section 3: Epistemic Justice; Organismic Integration |
| Transparência de Dados Coletados | Se app coleta (gaze tracking, behavioral telemetry), usuário SABE o quê, por quê, e como usar. Explicação simples: nada ofuscado em legal docs. | Obfuscated data practices; hidden telemetry; consent theater | Section 4: Bayesian Adaptive Moderation; Telemetry mentioned |
| Controle de Retenção de Dados | Usuário define quanto tempo dados são guardados (ex: 30d, 90d, deletar imediatamente). Default: mínimo. | Data hoarding; indefinite retention; "data as product" mindset | Implicit in Section 3: Autonomy |
| Sem Compartilhamento Secundário | Dados nunca vendidos, alugados, ou usados para fins não-conssentidos. Se dados alimentam ML, usuário OPTA e recebe benefício direto. | Data extraction; secondary monetization; algorithmic labor without consent | Implicit in Section 6: Verification Protocol (user justification, not machine extraction) |

---

## 6. Ética de Métricas (Regenerative KPIs)

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| KPI: Resilência Epistêmica | Métrica principal: profundidade de escrutínio que usuário exerce APÓS interagir com app. Medir: hesitação pré-decisão, entropia de gaze (ativa comparação), latência pós-interação. | "Engagement"; time-on-app; "speed to answer" | Section 7: Metrics of Success: Epistemic Resilience |
| KPI: Entropia de Transição de Gaze (GTE) | High visual entropy = user ativamente comparando/cross-referencing, não staring passivo. Isso é saudável. Medir, não punir. | Passive staring; low entropy = System 1 dominance | Section 7: Gaze Transition Entropy |
| KPI: Latência de Hesitação Pré-Decisão | Pause deliberativo ANTES de ação = System 2 ativado. Medir como saudável, não como "friction to remove". | Frictionless decisions; instant action; System 1 over-reliance |  Section 7: Pre-decision Hesitation Latency |
| KPI: Vitalidade Pós-Interação | Métrica ultimate: user consegue desconectar rápido e voltar ao mundo físico sentindo-se melhor (ou igual), não pior. Medir via auto-report ou contextual signals. | Addiction; "engagement" that leaves user drained; dopaminergic deficit post-use | Section 7: Post-Interaction Vitality; Touch Grass |
| Sem Métricas de Vaidade | Nenhum KPI que seja "MAUs", "DAUs", "engagement", "session length". Esses estão proibidos. | Extractive metrics; time-on-app; "stickiness"; engagement-as-success | Section 7 (entire); Section 1 (rejection of engagement) |

---

## 7. Padrões de Interação

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Sem Auto-Complete ou Sugestões Pré-Decididas | Usuário digita, pesquisa, escolhe. Interface oferece opções, NÃO pre-decide. Sugestões aparecem como lista, usuário seleciona, não como "completada por default". | Predictive nudging; auto-complete masquerading as convenience; pre-decided intent | Section 5: Five Absolute Prohibitions |
| Confirmação Explícita para Ações Irreversíveis | Delete, submit, share público, logout: SEMPRE confirmação. Sem "undo após 5s (after which it's gone)". User controls reversibility. | Sneaky deletions; undo windows; "oops" traps | Implicit in Section 3: Autonomy |
| Reversibilidade Máxima | Onde possível, ações são reversíveis. Se não (ex: delete), user tem janela clara ("dados deletados, recuperáveis por 30d") ou backup. | Irreversible defaults; data loss without recovery; "point of no return" UX |  Implicit in Section 3: Autonomy |
| Sem Pressurizações Temporais | "Essa oferta expira em 60s" ou "Apenas 3 vagas" para ações rotineiras: proibido. Urgência APENAS para eventos realmente urgentes (ex: segurança). | Scarcity/urgency dark patterns; FOMO-inducing countdowns; artificial time pressure | Section 1: Rejection of "frictionless trap" via engineered pressure |
| Ação Única por Tela | Cada tela tem UMA ação primária. Botões secundários/terciários sub-destacados. Reduz cognitive load, força escolha clara. | Too many CTAs; competing buttons; decision paralysis | Implicit in Section 4: Cognitive Load; Miller's Law |

---

## 8. Linguagem & Tom

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Honestidade Radical | Copy NUNCA oculta fricção ou trade-offs. Se ação tem custo (dados, tempo, esforço), menciona. Se benefício é para app (não user), diz. | Dark patterns in microcopy; hidden costs; bait-and-switch language | Implicit in Section 6: Verification Protocol ("partner in sensemaking") |
| Sem Gaslighting Motivacional | Copy NÃO finge que o app é sua culpa se não engaja, ou que user "precisa" disso. Sem nudges disfarçados de conselhos ("You have time for 5 min!"). | Introjected regulation; guilt-inducing copy; pseudo-motivational messages | Section 3: Introjected Regulation rejection |
| Tom Direto & Acessível | Sem jargão acadêmico, sem pseudo-científico (ex: "nosso algoritmo de AI detecta..."). Explica mecânicas em português simples: "mostramos X porque você pediu Y". | Opaque language; algorithmic mystification; pseudo-scientific marketing speak | Implicit in Section 6: Verification Protocol (transparency) |
| Sem Apelos Emocionais Manipuladores | Copy não exagera benefício ou apela a insegurança. Descreve função neutramente. Se app ajuda foco, diz "rastreia tempo de concentração", não "mude sua vida em 30 dias". | Emotional manipulation; overblown claims; aspirational marketing | Implicit in Section 1: Epistemic Justice (user chooses, not convinced) |

---

## 9. Agentes de IA (Optional, se aplicável)

| Princípio | Regra Acionável | O que Rejeita | Origem no Manifesto |
|-----------|-----------------|---------------|-------------------|
| Agente como Advogado do Diabo Computacional | IA NÃO responde com "respostas melhores" ou resumos executivos. Apresenta opções conflitantes, força usuário a adjudicar trade-offs. | Frictionless AI answers; premature consensus; System 0 as answer engine | Section 6: Logical Divergence; Adversarial Retrieval |
| Divergência Lógica Estruturada | Se há 3+ argumentos válidos para decisão, IA apresenta matriz de conflito, não síntese. Usuário navega divergência, ativa System 2. | Consensus-enforcing AI; "best answer"; single-path reasoning | Section 6: Structured Disagreement Matrix |
| Protocolo de Verificação Pré-Execução | Ações flagged como "compulsivas" (ex: automatizar algo rotineiro) requerem justificação do usuário ANTES que IA execute. IA é partner em sensemaking, não substituto. | AI as executor without user reasoning; frictionless automation; agency surrender | Section 6: Verification Protocol |
| KPI de IA: Resiliência Epistêmica | Sucesso do agente NÃO é "velocidade da resposta" ou "taxa de acurácia". É profundidade de escrutínio provocada no usuário. | Speed-to-answer metrics; accuracy obsession; AI-centric KPIs | Section 6: Agentic KPI: Epistemic Resilience |

---

## Excluídos: Princípios Específicos de Bloqueadores/Detox

Estes aparecem em um ou ambos manifestos mas são inaplicáveis a produtos éticos general-purpose (ex: app social, app produtividade). Motivo de exclusão: requerem remoção de agência voluntária, apropriados apenas para usuários que ESCOLHEM bloqueio total.

| Princípio Detox-Específico | Por Que Excluído | Seção de Origem |
|---------------------------|-----------------|-----------------|
| Bloqueios de Carga Fisiológica (12-24h) | Remove agência completamente. Apropriado só se usuário OPTA por app bloqueador; social app / produtividade app nunca pode forçar isso. | Pt manifesto: Fricção Cognitiva, Table row 2 |
| Ocultamento em Camadas Profundas de Menu | "Enterrar" settings para desativar app atrás de N clicks: funciona APENAS se bloqueador. Social app faria isso = dark pattern. | Pt manifesto: Estrutura Minimalista (implied) |
| Digitação Obrigatória de Frases Complexas para Sair | "Digite por que quer desativar" com ≥5 palavras: só funciona em app que QUER bloquear. Se app permite opt-out fácil, essa fricção = hostil. | Pt manifesto: Fricção Cognitiva, Table row 3 |
| Notificações de "Você Ficou Inativo X Dias" | Guilt-tripping ausência: apropriado para user que ELEGEU detox; totalmente hostil em app que vende "conexão". | Pt manifesto: Prova Social Segura (implicit rejection) |
| Desativação Gradual Obrigatória ("Taper Protocol") | Reduzir acesso lentamente, mesmo se user quer parar instantly: infantiliza user. Apropriado em contexto médico; not for consumer products. | Pt manifesto: Implied via friction tiers |
| Algoritmo que Oculta Conteúdo "Adictivo" | "Our AI decides what you shouldn't see": remove agência total. User deve decidir o que ver; app oferece ferramentas, não decides por user. | Both manifestos (implicit): todas seções de fricção assumem user autonomy |

---

## Notas de Implementação

1. **Aplicar a Todos os Produtos**: Estes princípios são agnósticos a formato (mobile, web, desktop), categoria (social, produtividade, criatividade), ou público (B2C, B2B).

2. **Hierarquia em Conflito**: Se dois princípios conflitam (ex: fricção ética vs acessibilidade), acessibilidade vence. Fricção nunca prejudica usuário com neurodivergência ou mobilidade reduzida.

3. **Métricas como Guardrails**: KPIs em Section 6 são GUARDRAILS, não targets. Um produto "bem-sucedido" por Epistemic Resilience pode ter menor engagement, DAUs, session length — isso é esperado e saudável.

4. **Auditoria Contínua**: Revisar app a cada release contra estes princípios. Se novo feature viola um, rejeitar ou redesenhar antes de ship.

5. **Tradução vs Filosofia**: Apesar de tom português-BR, filosofia é universal. Translate para idiomas do produto sem perder nuance.

---

**Data de Criação**: 2026-04-24  
**Versão**: 1.0  
**Status**: Draft para review cross-produto
