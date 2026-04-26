# PROMPT — Reclassificação das áreas do TED + ocultar subárea durante questão

## CONTEXTO

O sistema atual exibe `area` e `subarea` como tags visíveis durante a questão.
Isso prejudica o aprendizado: ver "Sífilis secundária" ou "Melanoma" antes de responder entrega a resposta.

Este prompt faz duas coisas:
1. Reclassifica todas as questões para uma nova taxonomia morfológica/clínica
2. Oculta a `subarea` da visualização durante a sessão (exibir apenas após a resposta)

---

## PARTE 1 — NOVA TAXONOMIA DE ÁREAS

Substituir **todo** o array `tedAreas` (ou `tedAreaCatalog`) em `src/data/ted.ts` por este:

```ts
export const tedAreas = [
  {
    id: "dermatoses-inflamatorias",
    nome: "Dermatoses inflamatórias",
    descricao: "Eczemas, psoríase, pitiríases, farmacodermias e dermatoses papuloescamosas sem padrão pustuloso ou de interface predominante.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-vesico-bolhosas",
    nome: "Dermatoses vésico-bolhosas",
    descricao: "Doenças autoimunes, genéticas e infecciosas com formação de vesículas ou bolhas como padrão principal.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-pustulosas-neutrofilicas",
    nome: "Dermatoses pustulosas e neutrofílicas",
    descricao: "Dermatoses com formação de pústulas estéreis ou infiltrado neutrofílico predominante.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-granulomatosas",
    nome: "Dermatoses granulomatosas",
    descricao: "Reações granulomatosas não infecciosas: granuloma anular, sarcoidose, rosácea granulomatosa e corpo estranho.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "hanseniase",
    nome: "Hanseníase",
    descricao: "Espectro clínico, histopatológico, neurológico, reações hansênicas e manejo terapêutico.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-interface-liquenoides",
    nome: "Dermatoses de interface e liquenoides",
    descricao: "Padrões histológicos de interface: dano vacuolar e infiltrado em banda na junção dermoepidérmica.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "vasculites-vasculopatias",
    nome: "Vasculites e vasculopatias",
    descricao: "Inflamação vascular, oclusões, malformações e proliferações vasculares reativas ou neoplásicas.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "paniculites",
    nome: "Paniculites",
    descricao: "Inflamações da hipoderme: padrão septal, lobular ou misto.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "infeccoes-cutaneas",
    nome: "Infecções cutâneas",
    descricao: "Infecções bacterianas, virais, parasitárias e micobacterioses não tuberculosas com expressão dermatológica.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "micoses",
    nome: "Micoses",
    descricao: "Micoses superficiais, subcutâneas e profundas. Correlação clínico-micológica e histopatológica.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "neoplasias-melanociticas",
    nome: "Neoplasias melanocíticas",
    descricao: "Nevos, melanoma e lesões melanocíticas benignas e malignas.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "neoplasias-epiteliais-anexiais",
    nome: "Neoplasias epiteliais e anexiais",
    descricao: "Tumores queratinocíticos, anexiais, neuroendócrinos e lesões pré-malignas da epiderme.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "neoplasias-mesenquimais-hematologicas",
    nome: "Neoplasias mesenquimais e hematológicas",
    descricao: "Tumores fibrosos, vasculares, neurais, linfomas cutâneos e histiocitoses neoplásicas.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "alopecias-tricopatologia",
    nome: "Alopécias e tricopatologia",
    descricao: "Alopecias cicatriciais e não cicatriciais, histopatologia do folículo e doenças do couro cabeludo.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-sistemicas-metabolicas",
    nome: "Dermatoses sistêmicas e metabólicas",
    descricao: "Doenças de depósito, mucinoses, amiloidoses, porfirias, paraneoplasias e histiocitoses não neoplásicas.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatoses-tecido-conjuntivo",
    nome: "Dermatoses do tecido conjuntivo",
    descricao: "Esclerodermias, elastopatias, mucinoses fibrosantes e outras doenças com alteração estrutural do colágeno e elástica.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "genodermatoses-malformacoes",
    nome: "Genodermatoses e malformações",
    descricao: "Ictioses, displasias ectodérmicas, facomatoses e outras doenças genéticas com expressão cutânea.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatologia-cirurgica",
    nome: "Dermatologia cirúrgica e procedimentos",
    descricao: "Princípios cirúrgicos, retalhos, enxertos, lasers e procedimentos dermatológicos.",
    numeroQuestoes: 0,
    subareas: [],
  },
  {
    id: "dermatopatologia-metodos",
    nome: "Dermatopatologia e métodos complementares",
    descricao: "Técnicas de biópsia, colorações histoquímicas, imunohistoquímica, imunofluorescência e interpretação de exames.",
    numeroQuestoes: 0,
    subareas: [],
  },
] as const;
```

---

## PARTE 2 — RECLASSIFICAÇÃO DE CADA QUESTÃO

Aplicar os seguintes `area` e `subarea` em cada questão por `id`.
A `subarea` agora descreve **padrão morfológico**, não diagnóstico.

```
ted-dermatopatologia-001     → area: "dermatopatologia-metodos",             subarea: "Colorações histoquímicas especiais"
ted-doencas-bolhosas-005     → area: "dermatoses-vesico-bolhosas",           subarea: "Acantólise intraepidérmica / Pênfigos"
ted-doencas-bolhosas-006     → area: "dermatoses-vesico-bolhosas",           subarea: "Clivagem subepidérmica / Penfigoides"
ted-doencas-bolhosas-007     → area: "dermatoses-vesico-bolhosas",           subarea: "Acantólise intraepidérmica / Pênfigos"
ted-dermatites-inflamatorias-009 → area: "dermatoses-vesico-bolhosas",       subarea: "Disceratose / Acantólise focal"
ted-doencas-bolhosas-009     → area: "dermatoses-vesico-bolhosas",           subarea: "Depósitos lineares na membrana basal"
ted-paniculites-011          → area: "paniculites",                          subarea: "Padrões histológicos da hipoderme"
ted-dermatopatologia-015     → area: "alopecias-tricopatologia",             subarea: "Histopatologia do folículo"
ted-tumores-cutaneos-015     → area: "vasculites-vasculopatias",             subarea: "Proliferações vasculares"
ted-doencas-infecciosas-017  → area: "micoses",                              subarea: "Fungos melanizados / Células escleróticas"
ted-dermatites-inflamatorias-020 → area: "dermatoses-inflamatorias",        subarea: "Farmacodermias / Padrão exantemático"
ted-dermatites-inflamatorias-022 → area: "dermatoses-pustulosas-neutrofilicas", subarea: "Dermatoses neutrofílicas"
ted-tumores-cutaneos-023     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores neuroendócrinos"
ted-tumores-cutaneos-027     → area: "vasculites-vasculopatias",             subarea: "Proliferações vasculares"
ted-dermatopatologia-059     → area: "dermatoses-sistemicas-metabolicas",    subarea: "Doenças de depósito"
ted-dermatopatologia-060     → area: "dermatoses-sistemicas-metabolicas",    subarea: "Depósitos amiloides"
ted-doencas-sistemicas-061   → area: "dermatoses-pustulosas-neutrofilicas",  subarea: "Dermatoses neutrofílicas"
ted-doencas-infecciosas-069  → area: "infeccoes-cutaneas",                   subarea: "Infecções bacterianas / Espiroquetas"
ted-dermatopatologia-070     → area: "hanseniase",                           subarea: "Granuloma tuberculoide / Neural"
ted-tumores-cutaneos-074     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores anexiais"
ted-doencas-infecciosas-078  → area: "micoses",                              subarea: "Fungos dimórficos"
ted-paniculites-079          → area: "paniculites",                          subarea: "Paniculite lobular / Septal"
ted-paraneoplasias-080       → area: "dermatoses-sistemicas-metabolicas",    subarea: "Dermatoses paraneoplásicas"
ted-tumores-cutaneos-002     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores anexiais apócrinos"
ted-dermatites-inflamatorias-007 → area: "dermatoses-pustulosas-neutrofilicas", subarea: "Hidradenite neutrofílica écrina"
ted-doencas-bolhosas-013     → area: "dermatoses-vesico-bolhosas",           subarea: "Acantólise intraepidérmica / Pênfigos"
ted-doencas-infecciosas-015  → area: "micoses",                              subarea: "Fungos dimórficos"
ted-dermatopatologia-023     → area: "dermatopatologia-metodos",             subarea: "Técnicas de biópsia / Imunofluorescência"
ted-tumores-cutaneos-025     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores queratinocíticos / Estratificação"
ted-dermatites-inflamatorias-035 → area: "dermatoses-interface-liquenoides", subarea: "Reação liquenoide / Dermatite de contato"
ted-doencas-bolhosas-036     → area: "dermatoses-vesico-bolhosas",           subarea: "Acantólise intraepidérmica / Pênfigos"
ted-doencas-bolhosas-037     → area: "dermatoses-vesico-bolhosas",           subarea: "Depósitos lineares na membrana basal"
ted-doencas-bolhosas-040     → area: "dermatoses-vesico-bolhosas",           subarea: "Bolhas infecciosas / Clivagem epidérmica"
ted-tumores-cutaneos-041     → area: "neoplasias-melanociticas",             subarea: "Lesões melanocíticas / Estadiamento"
ted-dermatites-inflamatorias-045 → area: "dermatoses-granulomatosas",       subarea: "Granuloma em paliçada"
ted-dermatites-inflamatorias-046 → area: "dermatoses-granulomatosas",       subarea: "Granuloma epitelioide não caseoso"
ted-tumores-cutaneos-047     → area: "neoplasias-epiteliais-anexiais",       subarea: "Hiperplasia pseudoepiteliomatosa"
ted-dermatopatologia-060-2022 → area: "neoplasias-mesenquimais-hematologicas", subarea: "Linfoproliferações cutâneas"
ted-dermatopatologia-063     → area: "hanseniase",                           subarea: "Reações hansênicas"
ted-dermatites-inflamatorias-080 → area: "dermatoses-pustulosas-neutrofilicas", subarea: "Dermatoses neutrofílicas"
ted-dermatopatologia-002     → area: "dermatoses-granulomatosas",            subarea: "Granuloma em paliçada"
ted-dermatites-inflamatorias-003 → area: "dermatoses-inflamatorias",        subarea: "Doenças das glândulas sudoríparas"
ted-dermatopatologia-011     → area: "genodermatoses-malformacoes",          subarea: "Doenças de depósito / Genodermatoses"
ted-tumores-cutaneos-013     → area: "neoplasias-epiteliais-anexiais",       subarea: "Cistos e tumores anexiais"
ted-dermatites-inflamatorias-014 → area: "vasculites-vasculopatias",        subarea: "Vasculites / Dermatoses neutrofílicas"
ted-dermatopatologia-015-2021 → area: "dermatoses-sistemicas-metabolicas",  subarea: "Mucinoses cutâneas"
ted-dermatites-inflamatorias-016 → area: "dermatoses-interface-liquenoides", subarea: "Dermatite de interface / Padrão liquenoide"
ted-doencas-bolhosas-022     → area: "dermatoses-vesico-bolhosas",           subarea: "Clivagem subepidérmica / Penfigoides"
ted-tumores-cutaneos-028     → area: "neoplasias-mesenquimais-hematologicas", subarea: "Linfomas cutâneos / Epidermotropismo"
ted-doencas-infecciosas-029  → area: "infeccoes-cutaneas",                   subarea: "Infecções bacterianas / Granulomatosa"
ted-paniculites-032          → area: "paniculites",                          subarea: "Paniculite neonatal"
ted-dermatopatologia-035     → area: "dermatopatologia-metodos",             subarea: "Colorações para fungos"
ted-tumores-cutaneos-036     → area: "neoplasias-mesenquimais-hematologicas", subarea: "Tumores fibrohistiocíticos"
ted-tumores-cutaneos-045     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores neuroendócrinos"
ted-doencas-infecciosas-070  → area: "infeccoes-cutaneas",                   subarea: "Micobacterioses não tuberculosas"
ted-dermatites-inflamatorias-071 → area: "dermatoses-interface-liquenoides", subarea: "Linfoproliferações benignas / Interface"
ted-dermatites-inflamatorias-075 → area: "dermatoses-pustulosas-neutrofilicas", subarea: "Pústulas agudas / Farmacodermia"
ted-dermatopatologia-079     → area: "dermatoses-inflamatorias",             subarea: "Dermatoses perfurantes"
ted-dermatopatologia-003     → area: "dermatoses-granulomatosas",            subarea: "Granuloma em paliçada"
ted-dermatopatologia-004     → area: "dermatoses-sistemicas-metabolicas",    subarea: "Histiocitoses não neoplásicas"
ted-dermatopatologia-007     → area: "paniculites",                          subarea: "Padrões histológicos da hipoderme"
ted-dermatopatologia-013     → area: "neoplasias-melanociticas",             subarea: "Lesões melanocíticas / Proliferação"
ted-dermatopatologia-017     → area: "neoplasias-mesenquimais-hematologicas", subarea: "Tumores de origem neural"
ted-dermatopatologia-018     → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores anexiais"
ted-dermatopatologia-033     → area: "dermatoses-tecido-conjuntivo",         subarea: "Elastopatias / Fibras elásticas"
ted-dermatopatologia-036     → area: "genodermatoses-malformacoes",          subarea: "Disceratoses hereditárias"
ted-dermatopatologia-046     → area: "neoplasias-melanociticas",             subarea: "Fibroses e lesões melanocíticas"
ted-imunopatologia-cutanea-064 → area: "dermatoses-vesico-bolhosas",        subarea: "Imunopatologia / Padrões de depósito"
ted-dermatopatologia-066     → area: "dermatoses-inflamatorias",             subarea: "Padrão psoriasiforme"
ted-dermatopatologia-069     → area: "paniculites",                          subarea: "Paniculite / Micobacterioses"
ted-dermatopatologia-072     → area: "dermatoses-sistemicas-metabolicas",    subarea: "Doenças de depósito"

// Teórico-práticas
ted-tp-2023-q04  → area: "neoplasias-melanociticas",             subarea: "Lesões melanocíticas com atipia"
ted-tp-2023-q01  → area: "dermatoses-pustulosas-neutrofilicas",  subarea: "Pústulas estéreis / Padrão subcórnio"
ted-tp-2023-q09  → area: "neoplasias-epiteliais-anexiais",       subarea: "Tumores basaloides"
ted-tp-2023-q20  → area: "infeccoes-cutaneas",                   subarea: "Protozooses / Ulceração granulomatosa"
ted-tp-2023-q21  → area: "dermatoses-sistemicas-metabolicas",    subarea: "Infiltrado histiocítico CD1a+"
ted-tp-2023-q22  → area: "dermatoses-tecido-conjuntivo",         subarea: "Perda de fibras elásticas"
ted-tp-2023-q23  → area: "infeccoes-cutaneas",                   subarea: "Infiltrado linfoplasmocitário perivascular"
ted-tp-2023-q27  → area: "hanseniase",                           subarea: "Granuloma histiocítico / Alta carga bacilar"
ted-tp-2023-q28  → area: "dermatoses-sistemicas-metabolicas",    subarea: "Depósitos acelulares na derme papilar"
ted-tp-2023-q29  → area: "dermatoses-tecido-conjuntivo",         subarea: "Fibrose dérmica / Colágeno homogeneizado"
ted-tp-2023-q30  → area: "dermatoses-inflamatorias",             subarea: "Hiperplasia epidérmica / Prurido crônico"
ted-tp-2023-q32  → area: "micoses",                              subarea: "Fungos melanizados / Frutificação"
ted-tp-2023-q35  → area: "dermatoses-vesico-bolhosas",           subarea: "Clivagem subepidérmica / Distribuição acral"
ted-tp-2023-q36  → area: "dermatoses-inflamatorias",             subarea: "Padrão psoriasiforme / Hiperceratose alternada"
ted-tp-2023-q37  → area: "dermatoses-interface-liquenoides",     subarea: "Esclerose subepidérmica / Hipocromia"
ted-tp-2023-q39  → area: "neoplasias-epiteliais-anexiais",       subarea: "Proliferação escamosa atípica"
```

---

## PARTE 3 — OCULTAR SUBÁREA DURANTE A QUESTÃO

Em `src/components/ted/TedQuestionView.tsx` (ou onde as tags de área/subárea são renderizadas):

**Regra:** durante a sessão ativa (antes de responder), exibir **apenas**:
- A `area` (nome da área)  
- A `difficulty`
- O `sourceLabel`

**Ocultar** a `subarea` completamente nessa fase.

Após o usuário responder (quando o gabarito é revelado), a `subarea` pode ser exibida no painel de explicação/comentário, junto com `explanationShort`, `keyPoint` e `teacherComment`.

Isso vale para questões `theoretical` e `theoretical_practical`.

---

## PARTE 4 — REMOVER ÁREAS ANTIGAS

Após a reclassificação, remover do `tedAreas` as entradas antigas que não existem mais:
- "Doenças bolhosas", "Dermatopatologia", "Dermatites inflamatórias", "Dermatoses inflamatórias" (inconsistentes), "Micoses cutâneas", "Doenças infecciosas", "Doenças sistêmicas", "Paraneoplasias", "Tumores cutâneos", "Tumores anexiais", "Dermatites granulomatosas", "Imunopatologia Cutânea", "IST / Doenças sexualmente transmissíveis", "Histiocitoses", "Doenças do colágeno", "Dermatoses de depósito", "Dermatoses pruriginosas", "Micoses profundas", "Dermatoses bolhosas", "Dermatoses eritematoescamosas", "Dermatoses de interface", "Doenças infecciosas e parasitárias"

Manter apenas as 19 áreas novas definidas na Parte 1.

---

## VALIDAÇÃO

- `npm run build` sem erros
- Todas as questões com `area` apontando para um id válido do novo `tedAreas`
- Subárea não aparece nas tags visíveis durante a questão
- Subárea aparece no painel pós-resposta
