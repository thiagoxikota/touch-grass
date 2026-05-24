# Fact-check dos manifestos v1

## Sumário executivo

23 claims verificados. 11 `ok`, 4 `sourced-but-misstated`, 3 `unsourced-dubious`, 3 `jargão-popular/neologismo`, 1 `retratável por contaminação` (Wansink), 1 `reescrever`. Riscos principais: (a) citação de Wansink num manifesto de design ético é contradição reputacional, (b) números sem fonte ("400ms", "7s") dão aparência de rigor sem suportá-lo, (c) "HDDM", "Dorsal Vagal Drift" e "Epistemic Sovereignty" são jargão emprestado/inventado que infla o texto sem agregar verificabilidade.

## Tabela

| # | Claim | Status | Fonte real | Recomendação |
|---|-------|--------|-----------|--------------|
| 1 | Chiriatti et al. "System 0" | ok | Chiriatti, Ganapini, Panai, Corti, Ganguli, Musi (2024) "The case for human–AI interaction as system 0 thinking", Nature Human Behaviour | manter conceito mas simplificar vocabulário |
| 2 | Kahneman System 1 / System 2 | ok | Kahneman, "Thinking, Fast and Slow" (2011); origens em Stanovich & West | manter |
| 3 | B.J. Fogg Behavior Model (B=MAT) | ok | Fogg, "A Behavior Model for Persuasive Design" (2009); hoje preferido B=MAP (Motivation-Ability-Prompt) | manter; atualizar para MAP se quiser precisão |
| 4 | Wansink "Bottomless Soup Bowl" (2005) | retratável por contaminação | Wansink, Painter, North (2005) Obesity Research; paper específico não retratado mas Wansink teve 18+ retratações pós-Cornell 2018 | **remover** — citar Wansink num manifesto de design ético é contradição reputacional; substituir por Brian Hallett/Center for Humane Technology ou simplesmente descrever o fenômeno sem citar autor |
| 5 | Lembke — downregulation de dopamina por estímulo digital | sourced-but-misstated | "Dopamine Nation" (2021) popularizou; o mecanismo de downregulation D2 é real (Volkow et al. em vício clássico), mas aplicação específica a "dopamina digital" é debatida e não foi demonstrada causalmente | reescrever-sem-número; descrever neuroplasticidade sem atribuir a Lembke o "efeito digital" |
| 6 | Nir Eyal Hook Model | ok | "Hooked" (2014); nota: Eyal se distanciou da framing viciante em "Indistractable" (2019) | manter; opcionalmente nota de contexto |
| 7 | Deci & Ryan SDT (autonomia, competência, relacionamento) | ok | Deci & Ryan (1985, 2000, 2017) — macro-teoria sólida | manter |
| 8 | Miller "5-9 chunks" (memória de trabalho) | sourced-but-misstated | Miller (1956) "Magical Number Seven"; pesquisa posterior (Cowan 2001) sugere capacidade real ~4 chunks. Miller falou de "absolute judgment" e "immediate memory span", não capacity geral | reescrever-sem-número; usar "capacidade limitada" sem numerar |
| 9 | Sweller Cognitive Load Theory | ok | Sweller (1988); cargas intrínseca/extrínseca/germânica estabelecidas | manter |
| 10 | Hallnäs & Redström Slow Technology | ok | Hallnäs & Redström (2001) "Slow Technology – Designing for Reflection" | manter |
| 11 | Holte & Ferraro 2020 — grayscale -37,9 a 40 min/dia | sourced-but-misstated | Existe estudo sobre grayscale + screen time; o número 37,9 min/dia aparece em press coverage mas não é replicado em literatura sólida. Possivelmente Holte 2022 small-sample | reescrever-sem-número; dizer "reduz uso autorreferido" sem dar minuto exato |
| 12 | Fitz et al. batched notifications | ok | Fitz, Lyngs, Lutz, Ruggeri (2019) "Batching smartphone notifications can improve well-being", Computers in Human Behavior | manter |
| 13 | Alter & Oppenheimer disfluency + CRT | ok | Alter, Oppenheimer, Epley, Eyre (2007) "Overcoming intuition"; Diemand-Yauman et al. (2011); nota: alguns efeitos de disfluência tiveram problemas de replicação (Meyer et al. 2015) | manter com cautela |
| 14 | Aza Raskin inventou infinite scroll | ok | Raskin assumiu publicamente (Humane/CHT); confirmado em múltiplos perfis de imprensa | manter |
| 15 | Nextdoor — fricção em denúncia racial | ok | 2016-2017 Nextdoor implementou campos obrigatórios em formulário de "suspicious activity"; redução reportada de ~75% em relatos com viés racial | manter |
| 16 | Twitter "read before retweet" | ok | Twitter (junho 2020); feature real, relatada na imprensa e blog oficial | manter |
| 17 | "400ms — janela de resposta motora" | unsourced-dubious | Sem fonte identificável. "Motor habit window" é conceito geral mas o número específico parece construído | remover número; falar de "quebra do ritmo motor" sem precisar ms |
| 18 | "7 segundos de atraso sistêmico após distrator" | unsourced-dubious | Sem fonte identificável. Research em attention switching costs existe (Rubinstein, Meyer, Evans 2001) mas não sustenta "7s" específicos | remover número; descrever custo de switching sem número |
| 19 | "37,9–40 min/dia com grayscale" | duplicado com #11 | — | idem |
| 20 | "Dorsal Vagal Drift" aplicado a doomscrolling | jargão-popular | Polyvagal Theory (Porges 1995, 2011) é real; "dorsal vagal shutdown" é conceito clínico. Aplicação metafórica a scrolling não é uso acadêmico padrão | remover termo; descrever dissociação ou "checked out scrolling" em linguagem simples |
| 21 | Gaze Transition Entropy (GTE) como KPI | ok com caveat | GTE é métrica real de eye-tracking (Krejtz et al. 2015); uso como KPI de ética de UI é novo e não-padronizado | manter conceito mas não prometer instrumentação sem plano real |
| 22 | HDDM aplicado a decisões de UI | jargão-popular | Hierarchical Drift Diffusion Model (Wiecki, Sofer, Frank 2013) é framework estatístico real para decisão perceptual. Aplicar a "UI decision under friction" é metáfora, não uso técnico | **remover** — pseudo-rigor; texto fica mais honesto sem |
| 23 | "Attention Hijacking Effect (AHE)", "Epistemic Sovereignty" | neologismo | AHE não é termo consagrado. "Epistemic Sovereignty" tem uso em filosofia política/direitos indígenas mas não em HCI | **remover** — substituir por "captura da atenção" e "autonomia do usuário" |

## Alternativas de fonte recomendadas

- **Para infinite scroll / sopa sem fundo**: em vez de Wansink, citar Tristan Harris / Center for Humane Technology, ou descrever fenômeno sem atribuição pessoal.
- **Para efeitos de cor saturada**: Center for Humane Technology publicou guia de grayscale; também Tom Stafford (U Sheffield) tem trabalho sobre saliência e atenção.
- **Para notificações em lote**: Kushlev & Dunn (2015) "Checking email less frequently reduces stress" é mais sólido que alguns; Fitz et al. 2019 também.
- **Para vício digital / dopamina**: Volkow & Morales (2015) para mecanismo real; evitar popular science que atribui mecanismo idêntico a "dopamina digital".
- **Para fricção ética**: Cass Sunstein & Richard Thaler ("Nudge"); também Adam Alter ("Irresistible", 2017).

## Red flags (claims mais perigosos de manter como estão)

1. **Wansink** — reputacionalmente incompatível com manifesto de design ético. Remover.
2. **Números específicos sem fonte** ("400ms", "7 segundos", "37,9 min") — dão aparência de rigor sem suportá-lo. Remover ou reescrever como qualitativo.
3. **HDDM, Dorsal Vagal Drift, Epistemic Sovereignty, AHE** — jargão importado/inventado que infla o texto. Remover em favor de linguagem chã.
4. **Claims sobre "dopamina digital"** estilo Lembke — a neuroplasticidade é real mas a atribuição causal específica a "interfaces" não foi demonstrada. Moderar.
5. **Disfluência + CRT** — use com cautela; literatura tem problemas de replicação.
