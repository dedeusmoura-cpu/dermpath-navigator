# PROMPT — Cadastrar 15 questões teórico-práticas TED SBD 2023

## CONTEXTO

Arquivo alvo: `src/data/ted.ts`  
A arquitetura já está implementada (campo `section`, tipos de imagem, `desempenhoPorSecao`).  
A questão `ted-tp-2023-q04` já existe como exemplo e deve ser mantida.  
As imagens já estão em `public/images/ted/tp/2023/q01.png` … `q39.png`.

## TAREFA

Adicionar as 15 questões abaixo ao array `tedQuestions` em `src/data/ted.ts`.  
Todas com `section: "theoretical_practical"`, `hasImages: true`, `imageMode: "single"`, `videoCommentUrl: "PREENCHER_LINK_VIDEO"`.  
Usar áreas já existentes no banco onde possível; criar área nova só se necessário.  
Rodar `npm run build` ao final para validar.

---

## QUESTÕES

```ts
// Q01
{
  id: "ted-tp-2023-q01",
  slug: "agep-pustulose-exantematica-2023-q01",
  questionNumber: 1,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses inflamatórias",
  subarea: "Pústuloses / AGEP",
  difficulty: "intermediaria",
  tags: ["AGEP", "pustulose exantemática aguda generalizada", "histopatologia", "diagnóstico diferencial"],
  statementType: "text_with_image",
  statement: "Analise as imagens clínica e histopatológicas a seguir. Nesse caso, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q01.png" }],
  options: [
    { id: "A", text: "Sarna crostosa." },
    { id: "B", text: "Pustulose exantemática aguda generalizada." },
    { id: "C", text: "Impetigo bolhoso." },
    { id: "D", text: "Pitiríase rubra pilar." }
  ],
  correctOption: "B",
  explanationShort: "AGEP apresenta pústulas estéreis subcórneas sobre eritema. A histopatologia evidencia pústulas espongiformes com eosinófilos, distinguindo-a das demais opções.",
  keyPoint: "Integração clínico-histopatológica nas dermatoses pustulosas. Reconhecer padrão histológico de AGEP vs. infecções e outras pústuloses.",
  teacherComment: "Questão de integração de imagem clínica e histopatológica. AGEP é mediada por linfócitos T e frequentemente associada a fármacos.",
  videoCommentTitle: "Q01 — AGEP | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q09
{
  id: "ted-tp-2023-q09",
  slug: "carcinoma-basocelular-cicatriz-2023-q09",
  questionNumber: 9,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Tumores cutâneos",
  subarea: "Carcinoma basocelular",
  difficulty: "intermediaria",
  tags: ["carcinoma basocelular", "cicatriz de queimadura", "histopatologia", "diagnóstico diferencial"],
  statementType: "text_with_image",
  statement: "Analise o caso clínico a seguir. Paciente de 73 anos de idade relata surgimento, há cerca de três anos, de lesão (figura 1) sobre cicatriz de queimadura no tronco que havia ocorrido na infância. A figura 2 se refere ao exame anatomopatológico de biópsia da lesão. Com base nas informações apresentadas, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q09.png" }],
  options: [
    { id: "A", text: "Carcinoma basocelular." },
    { id: "B", text: "Carcinoma espinocelular." },
    { id: "C", text: "Melanoma amelanótico." },
    { id: "D", text: "Carcinossarcoma." }
  ],
  correctOption: "A",
  explanationShort: "A histopatologia demonstra ninhos de células basaloides com paliçada periférica e artefato de retração, compatíveis com carcinoma basocelular.",
  keyPoint: "Diagnóstico histopatológico do carcinoma basocelular. Lesão sobre cicatriz antiga — o contexto clínico é pista, mas a morfologia histológica define o diagnóstico.",
  teacherComment: "Embora carcinoma espinocelular seja clássico em cicatrizes (úlcera de Marjolin), a histopatologia aqui é definitiva para CBC.",
  videoCommentTitle: "Q09 — Carcinoma basocelular | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q20
{
  id: "ted-tp-2023-q20",
  slug: "leishmaniose-gestacao-tratamento-2023-q20",
  questionNumber: 20,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Doenças infecciosas e parasitárias",
  subarea: "Leishmaniose / Tratamento na gestação",
  difficulty: "avancada",
  tags: ["leishmaniose", "gestação", "anfotericina B", "tratamento", "antimoniato contraindicado"],
  statementType: "text_with_image",
  statement: "Analise o caso clínico a seguir. Mulher, 25 anos de idade, gestante (18 semanas). Apresenta lesão dolorosa no dorso da mão esquerda há três meses, conforme imagens a seguir. Com base no quadro clínico e nos exames apresentados, qual é a indicação terapêutica para essa paciente?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q20.png" }],
  options: [
    { id: "A", text: "Antimoniato de meglumina." },
    { id: "B", text: "Anfotericina B." },
    { id: "C", text: "Estibogluconato de sódio." },
    { id: "D", text: "Miltefosina." }
  ],
  correctOption: "B",
  explanationShort: "Na gestação, antimoniatos (A e C) são teratogênicos e contraindicados. Miltefosina (D) também é contraindicada. A anfotericina B lipossomal é o tratamento de escolha.",
  keyPoint: "Único tratamento seguro para leishmaniose na gestação: anfotericina B (preferencialmente lipossomal). Antimoniatos e miltefosina são contraindicados.",
  teacherComment: "Questão de farmacologia aplicada. Exige conhecimento da segurança dos fármacos antileishmaniose na gravidez.",
  videoCommentTitle: "Q20 — Leishmaniose na gestação | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q21
{
  id: "ted-tp-2023-q21",
  slug: "histiocitose-celulas-langerhans-2023-q21",
  questionNumber: 21,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Histiocitoses",
  subarea: "Histiocitose de células de Langerhans",
  difficulty: "intermediaria",
  tags: ["histiocitose de células de Langerhans", "CD1a", "imunohistoquímica", "pediatria", "couro cabeludo"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo masculino, um ano de idade, com lesões no couro cabeludo e no tronco há oito meses, conforme imagens a seguir. Com base nesse quadro clínico, histopatológico e imunohistoquímico, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q21.png" }],
  options: [
    { id: "A", text: "Leucemia cútis." },
    { id: "B", text: "Dermatite seborreica." },
    { id: "C", text: "Histiocitose de células de Langerhans." },
    { id: "D", text: "Telangiectasia macular eruptiva perstans." }
  ],
  correctOption: "C",
  explanationShort: "HCL é confirmada pela IHQ: CD1a e CD207 (Langerina) positivos. Histopatologia com infiltrado de células grandes com núcleo reniforme e citoplasma abundante.",
  keyPoint: "Diagnóstico de HCL exige correlação clínico-histopatológico-imunohistoquímica. CD1a positivo é marcador essencial.",
  teacherComment: "Em lactente com lesões seborreicas resistentes ao tratamento, considerar HCL. A IHQ define o diagnóstico.",
  videoCommentTitle: "Q21 — Histiocitose de células de Langerhans | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q22
{
  id: "ted-tp-2023-q22",
  slug: "anetodermia-2023-q22",
  questionNumber: 22,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses do tecido conjuntivo",
  subarea: "Anetodermia",
  difficulty: "avancada",
  tags: ["anetodermia", "fibras elásticas", "histopatologia", "lesões assintomáticas", "dorso"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 34 anos de idade, com lesões assintomáticas no dorso há três anos, conforme imagens a seguir. Com base nesse quadro clínico e histopatológico, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q22.png" }],
  options: [
    { id: "A", text: "Anetodermia." },
    { id: "B", text: "Urticária-vasculite." },
    { id: "C", text: "Síndrome de Sweet." },
    { id: "D", text: "Eritema nodoso hansênico." }
  ],
  correctOption: "A",
  explanationShort: "Anetodermia: perda focal de fibras elásticas na derme (Verhoeffe negativo na área afetada), com epidermee normal. Lesões maculares deprimidas e assintomáticas.",
  keyPoint: "Histopatologia da anetodermia: redução/ausência de fibras elásticas na derme reticular. Coloração específica de elástica é essencial para o diagnóstico.",
  teacherComment: "Diagnóstico raro que exige coloração histoquímica específica para fibras elásticas. Distinguir de outras dermatoses com perda de elasticidade.",
  videoCommentTitle: "Q22 — Anetodermia | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q23
{
  id: "ted-tp-2023-q23",
  slug: "sifilis-secundaria-2023-q23",
  questionNumber: 23,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "IST / Doenças sexualmente transmissíveis",
  subarea: "Sífilis secundária",
  difficulty: "intermediaria",
  tags: ["sífilis secundária", "histopatologia", "infiltrado plasmocelular", "diagnóstico diferencial", "urticária pigmentosa"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 28 anos de idade, refere lesões pouco pruriginosas, conforme imagens a seguir, em todo o tegumento há um mês. As lesões vêm aumentando em número progressivamente. Com base nesse quadro clínico e histopatológico, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q23.png" }],
  options: [
    { id: "A", text: "Sífilis secundária." },
    { id: "B", text: "Urticária pigmentosa." },
    { id: "C", text: "Hanseníase virchowiana." },
    { id: "D", text: "Pitiríase liquenoide crônica." }
  ],
  correctOption: "A",
  explanationShort: "Sífilis secundária: infiltrado linfoplasmocitário perivascular e perianexial, com endotélio tumefato. Quadro clínico de exantema disseminado de progressão rápida.",
  keyPoint: "Sífilis secundária é 'a grande imitadora'. O infiltrado plasmocelular na histopatologia é sugestivo, mas a sorologia (VDRL/FTA-Abs) confirma o diagnóstico.",
  teacherComment: "Quadro de lesões disseminadas em progressão em adulto jovem sempre levantar hipótese de sífilis. Integração clínico-histopatológica essencial.",
  videoCommentTitle: "Q23 — Sífilis secundária | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q27
{
  id: "ted-tp-2023-q27",
  slug: "hanseniase-virchowiana-2023-q27",
  questionNumber: 27,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Hanseníase",
  subarea: "Hanseníase virchowiana / Multibacilar",
  difficulty: "intermediaria",
  tags: ["hanseníase", "hanseníase virchowiana", "histopatologia", "Ziehl-Neelsen", "diagnóstico diferencial"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo masculino, 48 anos de idade, evoluindo há seis meses com lesões no tronco e membros. Quadro clínico e histopatológico representados nas imagens a seguir. Com base nesse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q27.png" }],
  options: [
    { id: "A", text: "Molusco contagioso." },
    { id: "B", text: "Neurofibromatose." },
    { id: "C", text: "Dermatofibromas múltiplos." },
    { id: "D", text: "Hanseníase." }
  ],
  correctOption: "D",
  explanationShort: "Hanseníase virchowiana: histopatologia com macrófagos espumosos (células de Virchow) e bacilos abundantes ao Ziehl-Neelsen. Lesões nodulares difusas no tronco e membros.",
  keyPoint: "Reconhecer o padrão histopatológico da hanseníase virchowiana: granuloma lepramatoso com macrófagos espumosos e alta carga bacilar.",
  teacherComment: "Múltiplas lesões nodulares no tronco em adulto — hanseníase entra no diagnóstico diferencial. A histopatologia com Ziehl-Neelsen é definidora.",
  videoCommentTitle: "Q27 — Hanseníase virchowiana | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q28
{
  id: "ted-tp-2023-q28",
  slug: "liquen-amiloidotico-2023-q28",
  questionNumber: 28,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses de depósito",
  subarea: "Amiloidose cutânea / Líquen amiloidótico",
  difficulty: "intermediaria",
  tags: ["líquen amiloidótico", "amiloidose cutânea", "histopatologia", "Vermelho Congo", "prurido"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 33 anos de idade, há oito meses com lesão pruriginosa localizada na perna esquerda, conforme imagens clínica e histopatológicas apresentadas a seguir. Com base nesse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q28.png" }],
  options: [
    { id: "A", text: "Prurigo nodular." },
    { id: "B", text: "Líquen amiloidótico." },
    { id: "C", text: "Mucinose." },
    { id: "D", text: "Líquen simples." }
  ],
  correctOption: "B",
  explanationShort: "Líquen amiloidótico: depósitos de amiloide na derme papilar (Vermelho Congo positivo, birrefringência verde sob luz polarizada) associados a hiperplasia epidérmica e hiperceratose.",
  keyPoint: "Histopatologia da amiloidose cutânea: depósitos acelulares na derme papilar corados pelo Vermelho Congo. Distinguir de prurigo nodular pelo padrão de depósito.",
  teacherComment: "O Vermelho Congo com birrefringência sob luz polarizada é o padrão ouro histoquímico para amiloide. Quadro clínico de pápulas pruriginosas com fundo ceratótico.",
  videoCommentTitle: "Q28 — Líquen amiloidótico | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q29
{
  id: "ted-tp-2023-q29",
  slug: "esclerodermia-placas-morfeia-2023-q29",
  questionNumber: 29,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Doenças do colágeno",
  subarea: "Esclerodermia localizada / Morfeia",
  difficulty: "avancada",
  tags: ["esclerodermia em placas", "morfeia", "histopatologia", "colágeno", "diagnóstico diferencial"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 36 anos de idade, há dois anos com múltiplas lesões na região mamária, abdome e dorso, que aumentaram de tamanho nos últimos seis meses, conforme imagens clínica e histopatológica representadas a seguir. Com base nesse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q29.png" }],
  options: [
    { id: "A", text: "Lúpus eritematoso cutâneo crônico." },
    { id: "B", text: "Esclerodermia em placas." },
    { id: "C", text: "Escleromixedema." },
    { id: "D", text: "Xantogranuloma necrobiótico." }
  ],
  correctOption: "B",
  explanationShort: "Morfeia (esclerodermia localizada): espessamento e homogeneização do colágeno dérmico com infiltrado linfocitário perivascular e periapendicular. Sem envolvimento sistêmico.",
  keyPoint: "Morfeia vs. escleromixedema: na morfeia há homogeneização do colágeno sem mucina; no escleromixedema há deposição de mucina com fibroblastos proliferantes.",
  teacherComment: "Questão que exige diferenciar entidades com fibrose dérmica. O quadro histopatológico e a ausência de comprometimento sistêmico apontam para morfeia.",
  videoCommentTitle: "Q29 — Morfeia / Esclerodermia em placas | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q30
{
  id: "ted-tp-2023-q30",
  slug: "prurigo-nodular-2023-q30",
  questionNumber: 30,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses pruriginosas",
  subarea: "Prurigo nodular",
  difficulty: "intermediaria",
  tags: ["prurigo nodular", "histopatologia", "prurido crônico", "diagnóstico diferencial", "dermatose perfurante"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 33 anos de idade, com lesões nos membros inferiores e superiores, intensamente pruriginosas, conforme imagens clínicas e histopatológica a seguir, em uso de corticoide tópico com pouca melhora, há dois anos. Diante desse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q30.png" }],
  options: [
    { id: "A", text: "Colagenose reativa perfurante." },
    { id: "B", text: "Prurigo nodular." },
    { id: "C", text: "Doença de Kyrle." },
    { id: "D", text: "Penfigoide nodular." }
  ],
  correctOption: "B",
  explanationShort: "Prurigo nodular: hiperplasia epidérmica pseudoepiteliomatosa, hiperceratose, infiltrado dérmico misto. Clinicamente nódulos muito pruriginosos em MMII e MMSS resistentes ao tratamento.",
  keyPoint: "Prurigo nodular vs. dermatoses perfurantes: ausência de eliminação transepidérmica de material dérmico no prurigo nodular. Hiperplasia epidérmica é proeminente em ambos.",
  teacherComment: "Diagnóstico de prurigo nodular exige correlação clínico-histopatológica. A resistência ao corticoide tópico é característica clínica relevante.",
  videoCommentTitle: "Q30 — Prurigo nodular | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q32
{
  id: "ted-tp-2023-q32",
  slug: "cromoblastomicose-phialophora-2023-q32",
  questionNumber: 32,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Micoses profundas",
  subarea: "Cromoblastomicose",
  difficulty: "avancada",
  tags: ["cromoblastomicose", "Phialophora", "microcultivo", "fungos melanizados", "Centro-Oeste"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo masculino, 45 anos de idade, referindo lesões na perna há um ano, após pescar em um rio no Centro-Oeste do Brasil. Quadro clínico e microcultivo apresentados a seguir. Considerando esse quadro, assinale a alternativa que apresenta a correlação correta.",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q32.png" }],
  options: [
    { id: "A", text: "Cromoblastomicose, microcultivo com frutificação tipo Phialophora." },
    { id: "B", text: "Granuloma tricofítico, microcultivo com Trichophyton mentagrophytes." },
    { id: "C", text: "Granuloma das piscinas, microcultivo com Mycobacterium marinum." },
    { id: "D", text: "Paracoccidioidomicose, microcultivo a 25 ºC, forma filamentosa." }
  ],
  correctOption: "A",
  explanationShort: "Cromoblastomicose por Phialophora verrucosa: frutificação tipo Phialophora (fiálides com collaretes). Lesões verrucosas em área exposta com história de inoculação traumática.",
  keyPoint: "Correlação clínico-micológica nas micoses profundas. Phialophora: frutificação com collaretes. Distinguir dos outros tipos de frutificação (Cladosporium, Rhinocladiella).",
  teacherComment: "Questão que exige conhecimento de micologia. Os três principais agentes da cromoblastomicose (Fonsecaea, Cladophialophora, Phialophora) têm frutificações distintas.",
  videoCommentTitle: "Q32 — Cromoblastomicose | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q35
{
  id: "ted-tp-2023-q35",
  slug: "epidermolise-bolhosa-adquirida-2023-q35",
  questionNumber: 35,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses bolhosas",
  subarea: "Epidermólise bolhosa adquirida",
  difficulty: "avancada",
  tags: ["epidermólise bolhosa adquirida", "EBA", "colágeno VII", "dermatose bolhosa autoimune", "acral"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 58 anos de idade, refere surgimento de lesões nas mãos e pés há dois anos, sem qualquer acometimento sistêmico, como apresentado nas imagens a seguir. Com base nesse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q35.png" }],
  options: [
    { id: "A", text: "Dermatite herpetiforme." },
    { id: "B", text: "Epidermólise bolhosa adquirida." },
    { id: "C", text: "Lúpus eritematoso bolhoso." },
    { id: "D", text: "Porfiria cutânea tardia." }
  ],
  correctOption: "B",
  explanationShort: "EBA: bolhas tensas em áreas acrais com cicatrizes e milium, sem comprometimento sistêmico. Autoanticorpos IgG anti-colágeno VII. Distribuição acral distingue de DH.",
  keyPoint: "Diagnóstico diferencial das dermatoses bolhosas acrais: EBA (colágeno VII, acral, cicatrizes) vs. DH (IgA, glúten) vs. Lúpus bolhoso (lúpus sistêmico) vs. PCT (porfirinas).",
  teacherComment: "Localização acral + cicatrizes + milium = EBA até prova em contrário. Ausência de doença sistêmica afasta lúpus bolhoso.",
  videoCommentTitle: "Q35 — Epidermólise bolhosa adquirida | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q36
{
  id: "ted-tp-2023-q36",
  slug: "ptiiriase-rubra-pilar-2023-q36",
  questionNumber: 36,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses eritematoescamosas",
  subarea: "Pitiríase rubra pilar",
  difficulty: "avancada",
  tags: ["pitiríase rubra pilar", "PRP", "histopatologia", "tabuleiro de xadrez", "diagnóstico diferencial"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico e histopatológico a seguir. Considerando essas imagens, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q36.png" }],
  options: [
    { id: "A", text: "Micose fungoide." },
    { id: "B", text: "Pitiríase rubra pilar." },
    { id: "C", text: "Pitiríase liquenoide." },
    { id: "D", text: "Psoríase em placa." }
  ],
  correctOption: "B",
  explanationShort: "PRP: histopatologia com alternância de ortoceratose e paraqueratose em padrão xadrez (vertical e horizontal), acantose moderada, infiltrado inflamatório escasso.",
  keyPoint: "Histopatologia da PRP: padrão de 'tabuleiro de xadrez' — hiperceratose ortoqueratósica e paraqueratósica alternadas em ambos os eixos. Diferencia de psoríase (paraqueratose difusa).",
  teacherComment: "A alternância geométrica da ceratinização é o achado histopatológico patognomônico da PRP. Quadro clínico com eritrodermia e ilhas de pele poupada apoia o diagnóstico.",
  videoCommentTitle: "Q36 — Pitiríase rubra pilar | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q37
{
  id: "ted-tp-2023-q37",
  slug: "liquen-escleroso-2023-q37",
  questionNumber: 37,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Dermatoses de interface",
  subarea: "Líquen escleroso",
  difficulty: "intermediaria",
  tags: ["líquen escleroso", "hipocromia", "histopatologia", "diagnóstico diferencial", "hanseníase indeterminada"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo feminino, 29 anos de idade, refere surgimento de lesão na coxa direita, conforme imagens a seguir, há oito meses, assintomática. Considerando esse quadro, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q37.png" }],
  options: [
    { id: "A", text: "Líquen escleroso." },
    { id: "B", text: "Hanseníase indeterminada." },
    { id: "C", text: "Micose fungoide hipocromiante." },
    { id: "D", text: "Vitiligo segmentar." }
  ],
  correctOption: "A",
  explanationShort: "Líquen escleroso: atrofia epidérmica, homogeneização da derme superficial (zona de edema/esclerose subepidérmica) e banda linfocitária abaixo da zona hialina.",
  keyPoint: "Diagnóstico diferencial das lesões hipocrômicas: líquen escleroso tem atrofia + esclerose subepidérmica. Hanseníase tem granulomas e alterações neurais. Micose fungoide tem epidermotropismo.",
  teacherComment: "Lesão hipocrômica assintomática em adulta jovem — o padrão histopatológico com esclerose subepidérmica define o líquen escleroso extragenital.",
  videoCommentTitle: "Q37 — Líquen escleroso | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},

// Q39
{
  id: "ted-tp-2023-q39",
  slug: "carcinoma-espinocelular-pe-2023-q39",
  questionNumber: 39,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Tumores cutâneos",
  subarea: "Carcinoma espinocelular",
  difficulty: "intermediaria",
  tags: ["carcinoma espinocelular", "CEC", "trabalhador rural", "histopatologia", "crescimento rápido"],
  statementType: "text_with_image",
  statement: "Analise o quadro clínico a seguir. Paciente do sexo masculino, 50 anos de idade, trabalhador rural, apresenta essa lesão de crescimento rápido no dorso do pé direito e no espaço interdigital, conforme imagens a seguir. Com base nas informações clínicas e no exame anatomopatológico, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [{ id: "main", label: "Imagem da questão", type: "composite", src: "/images/ted/tp/2023/q39.png" }],
  options: [
    { id: "A", text: "Cromomicose." },
    { id: "B", text: "Carcinoma espinocelular." },
    { id: "C", text: "Micetoma." },
    { id: "D", text: "Dermatofibrossarcoma." }
  ],
  correctOption: "B",
  explanationShort: "CEC em trabalhador rural: proliferação de células escamosas atípicas com formação de pérolas córneas e infiltração da derme. Crescimento rápido e localização acral são características.",
  keyPoint: "CEC em áreas acrais de trabalhadores rurais. Diagnóstico diferencial com micetoma e cromomicose (fungos) exige histopatologia. CEC: pérolas córneas e atipia celular.",
  teacherComment: "Trabalhador rural com lesão de crescimento rápido no pé. Micetoma e cromomicose entram no diferencial, mas a histopatologia com proliferação epitelial atípica define CEC.",
  videoCommentTitle: "Q39 — Carcinoma espinocelular | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
},
```

---

## OBSERVAÇÕES PARA O CODE

1. **Áreas novas**: se `"Histiocitoses"`, `"Micoses profundas"`, `"Dermatoses de depósito"`, `"Dermatoses pruriginosas"`, `"Dermatoses de interface"`, `"Dermatoses do tecido conjuntivo"` ou `"IST / Doenças sexualmente transmissíveis"` não existirem em `tedAreas`, adicionar entradas mínimas para cada uma (id, nome, descricao vazia, numeroQuestoes: 0, subareas: []).

2. **Ordem no array**: inserir após a questão `ted-tp-2023-q04` já existente, mantendo ordem crescente por `questionNumber`.

3. **Validação final**: `npm run build` sem erros de TypeScript.
