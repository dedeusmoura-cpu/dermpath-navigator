# PROMPT — Treinamento TED: Seção Questões Teórico-Práticas

## CONTEXTO DO PROJETO

Stack: React 18 + TypeScript + Vite + Tailwind CSS + React Router v6  
Pasta raiz: `src/`  

Arquivos principais do módulo TED (todos já existem):
- `src/types/ted.ts` — todos os tipos/interfaces do módulo
- `src/data/ted.ts` — banco de questões (`tedQuestions`), áreas (`tedAreas`), progresso mock
- `src/utils/tedProgress.ts` — lógica de progresso, localStorage (`dermpath-navigator:ted-progress`)
- `src/utils/tedStatement.ts` — renderização de enunciados
- `src/pages/TreinamentoTedPage.tsx` — página principal do módulo
- Componentes TED em `src/components/ted/`

---

## ESTRUTURA ATUAL — O QUE JÁ EXISTE

### `TedQuestion` (em `src/types/ted.ts`)
```ts
export interface TedQuestion {
  id: string;
  slug: string;
  questionNumber: number;
  shortTitle?: string;
  sourceType: TedSourceType;         // "sbd_exam" | "custom" | "adapted" | "mock_exam"
  sourceLabel: string;
  area: string;
  subarea?: string | null;
  difficulty: Exclude<TedDifficulty, "mista">;
  tags: string[];
  statementType: TedStatementType;   // "text_only" | "text_with_image" | ...
  statement: string;
  postStatement?: string | null;
  matchingColumns?: TedMatchingColumns;
  promptImageUrl?: string | null;    // campo legado para imagem
  supportImageUrl?: string | null;   // campo legado para imagem
  options: Array<{ id: string; text: string }>;
  correctOption: string | null;
  explanationShort: string;
  keyPoint: string;
  teacherComment: string;
  notes?: string | null;
  videoCommentTitle: string;
  videoCommentUrl: string;
  videoProvider: TedVideoProvider;
  isProvisional: boolean;
  isAnnulled?: boolean;
  sourceConfidence: TedSourceConfidence;
  tempoEstimado?: number;
}
```

### `TedUserProgress` (em `src/types/ted.ts`)
```ts
export interface TedUserProgress {
  totalRespondidas: number;
  totalCorretas: number;
  totalErradas: number;
  acuraciaGlobal: number;
  totalTempoSegundos: number;
  desempenhoPorArea: Record<string, TedAreaPerformance>;
  questoesErradas: string[];
  questoesFavoritasOuMarcadas: TedQuestionBookmark[];
  historicoRecente: TedRecentHistoryItem[];
  outcomesByQuestion: Record<string, TedQuestionOutcome>;
}
```

### `TedSessionConfig` (em `src/types/ted.ts`)
```ts
export interface TedSessionConfig {
  modo: "area" | "aleatorio" | "revisao";
  areaIds: string[];
  quantidade: number;
  dificuldade: TedDifficulty;
  comTimer: boolean;
  questionId?: string;
}
```

---

## O QUE PRECISA SER FEITO

### PARTE 1 — Adicionar `section` ao modelo de questão

Em `src/types/ted.ts`, adicione:

```ts
export type TedSection = "theoretical" | "theoretical_practical";
```

Adicione o campo em `TedQuestion`:
```ts
section: TedSection;  // obrigatório, sem default
```

Classifique todas as questões já existentes em `src/data/ted.ts` como `section: "theoretical"`.

---

### PARTE 2 — Suporte nativo a imagens

Em `src/types/ted.ts`, adicione os tipos:

```ts
export type TedImageType =
  | "clinical" | "histopathology" | "dermoscopy"
  | "ihc" | "ifd" | "mycology" | "culture"
  | "radiology" | "composite";

export type TedImageMode = "single" | "multiple";

export interface TedQuestionImage {
  id: string;
  label: string;
  type: TedImageType;
  src: string;
}
```

Adicione os campos opcionais em `TedQuestion`:
```ts
hasImages?: boolean;
imageMode?: TedImageMode;
images?: TedQuestionImage[];
```

Mantenha `promptImageUrl` e `supportImageUrl` como campos legados — não os remova, mas não os use em questões novas.

---

### PARTE 3 — Progresso separado por seção

Em `TedUserProgress`, adicione:
```ts
desempenhoPorSecao: Record<TedSection, {
  totalRespondidas: number;
  totalCorretas: number;
  totalErradas: number;
  acuraciaGlobal: number;
}>;
```

Em `src/utils/tedProgress.ts`, adapte:
- `createInitialTedProgress()` para inicializar `desempenhoPorSecao`
- `recordTedQuestionFirstAttempt()` para atualizar `desempenhoPorSecao` baseado em `question.section`
- `updateGlobalMetrics()` para recalcular `desempenhoPorSecao`

A chave do localStorage é `"dermpath-navigator:ted-progress"` — mantenha-a, mas garanta migração segura no `loadTedProgress()` (se `desempenhoPorSecao` não existir no JSON salvo, inicializar com zeros).

---

### PARTE 4 — Filtros e sessões por seção

Em `TedSessionConfig`, adicione:
```ts
section?: TedSection;  // undefined = todas as seções
```

Em `src/utils/tedProgress.ts`, adapte:
- `getQuestionsByArea(areaId)` para aceitar `section?` opcional como segundo parâmetro
- Questões aleatórias e revisão de erros devem respeitar o filtro `section` quando fornecido

---

### PARTE 5 — Navegação na tela inicial do TED

Em `src/pages/TreinamentoTedPage.tsx`, na tela inicial do módulo, adicione dois cards de entrada principais **antes** das opções de sessão existentes:

**Card 1 — Questões Teóricas**  
Subtexto: "Treine conteúdo conceitual e raciocínio anatomopatológico em questões clássicas do TED."  
Section: `"theoretical"`

**Card 2 — Questões Teórico-Práticas**  
Subtexto: "Resolva questões com imagens clínicas e exames complementares, integrando morfologia, histopatologia e diagnóstico."  
Section: `"theoretical_practical"`

Cada card abre um subfluxo interno do TED com as mesmas opções já existentes (Treinar por área / Aleatório / Meu desempenho / Revisar erros), mas filtrado pela seção correspondente.

Use o visual já existente no app — cards com bordas suaves, gradientes suaves, identidade Tailwind do projeto.

---

### PARTE 6 — Renderização de imagens nas questões

Em `src/utils/tedStatement.ts` ou no componente de questão TED (onde o enunciado é renderizado), adicione lógica:

```
Se question.section === "theoretical_practical" && question.hasImages === true:
  Renderizar bloco de imagens entre o enunciado e as alternativas
  Se imageMode === "single": imagem única centralizada, borda suave, máx 640px
  Se imageMode === "multiple": grid responsivo (1 col mobile / 2 col desktop) com label embaixo de cada imagem
Se question.theoretical_practical mas hasImages === false ou undefined:
  Não mostrar placeholder — renderizar só o enunciado normalmente
Se question.section === "theoretical":
  Layout atual, sem bloco de imagem
```

Visual das imagens:
- `rounded-2xl border border-sand/80 shadow-sm overflow-hidden`
- fundo: `bg-paper`
- label: `text-xs text-steel font-medium mt-2 text-center`

---

### PARTE 7 — Organização de arquivos de imagem

Crie a pasta (pode ser vazia por enquanto, ou com um README):
```
public/images/ted/tp/2023/
```

O `src` das imagens seguirá o padrão:
```
/images/ted/tp/2023/q04.png      ← modo single (composite)
/images/ted/tp/2023/q04/clinical.png   ← modo multiple (futuro)
```

---

### PARTE 8 — Questão exemplo para validação

Adicione esta questão ao banco em `src/data/ted.ts` para validar a arquitetura end-to-end:

```ts
{
  id: "ted-tp-2023-q04",
  slug: "melanoma-imagem-2023-q04",
  questionNumber: 4,
  sourceType: "sbd_exam",
  sourceLabel: "TED SBD 2023 — Teórico-Prático",
  section: "theoretical_practical",
  area: "Tumores cutâneos",
  subarea: "Melanocíticos / Melanoma",
  difficulty: "intermediaria",
  tags: ["melanoma", "dermatoscopia", "histopatologia", "nevo de reed", "lentigo"],
  statementType: "text_with_image",
  statement: "Analise o caso clínico a seguir. Paciente do sexo feminino, 49 anos de idade, apresentando a lesão em destaque com as respectivas imagens dermatoscópica e histopatológicas. Nesse caso, qual é o diagnóstico?",
  postStatement: null,
  hasImages: true,
  imageMode: "single",
  images: [
    {
      id: "main",
      label: "Imagem da questão",
      type: "composite",
      src: "/images/ted/tp/2023/q04.png"
    }
  ],
  options: [
    { id: "A", text: "Nevo de Reed." },
    { id: "B", text: "Melanoma." },
    { id: "C", text: "Lentigo em 'pingo de tinta'." },
    { id: "D", text: "Nevo combinado." }
  ],
  correctOption: "B",
  explanationShort: "O conjunto de achados clínicos, dermatoscópicos e histopatológicos é compatível com melanoma.",
  keyPoint: "Questão de integração clínico-patológica. Avaliar padrões dermatoscópicos e histopatológicos do melanoma vs. diagnósticos diferenciais névicos.",
  teacherComment: "Questão paradigmática de integração de imagens. Melanoma confirmado pelo conjunto: lesão clínica suspeita + padrão dermatoscópico atípico + histopatologia.",
  videoCommentTitle: "Q04 — Melanoma | TED SBD 2023",
  videoCommentUrl: "PREENCHER_LINK_VIDEO",
  videoProvider: "youtube",
  isProvisional: false,
  sourceConfidence: "high"
}
```

---

### PARTE 9 — Dados das demais questões teórico-práticas (sem cadastrar ainda)

As questões abaixo serão cadastradas em etapa posterior. Não as adicione agora — apenas certifique-se de que a arquitetura as suporta.

| Q  | Enunciado resumido                                                                 | Gabarito |
|----|------------------------------------------------------------------------------------|----------|
| Q1 | Analise imagens clínica e histopatológicas. Qual é o diagnóstico?                 | B        |
| Q9 | Paciente 73a, lesão sobre cicatriz de queimadura (fig1) + biópsia (fig2)          | A        |
| Q20| Mulher 25a, gestante 18sem, lesão dorso da mão há 3m — indicação terapêutica?     | B        |
| Q21| Menino 1a, lesões couro cabeludo e tronco — clínico + histopato + IHQ             | C        |
| Q22| Mulher 34a, lesões assintomáticas no dorso há 3 anos — clínico + histopato        | A        |
| Q23| Mulher 28a, lesões pouco pruriginosas em todo tegumento há 1m — clínico + histopato| A       |
| Q27| Homem 48a, lesões tronco e membros há 6m — clínico + histopato                    | D        |
| Q28| Mulher 33a, lesão pruriginosa perna esquerda — clínica + histopatológicas         | B        |
| Q29| Mulher 36a, lesões mamária/abdome/dorso crescendo há 6m — clínica + histopato     | B        |
| Q30| Mulher 33a, lesões MMII e MMSS pruriginosas há 2a — clínica + histopatológica     | B        |
| Q32| Homem 45a, lesões na perna após pescar no Centro-Oeste — clínico + microcultivo   | A        |
| Q35| Mulher 58a, lesões mãos e pés há 2a, sem comprometimento sistêmico                | B        |
| Q36| Quadro clínico e histopatológico (sem descrição de paciente no PDF)                | B        |
| Q37| Mulher 29a, lesão coxa direita há 8m, assintomática                               | A        |
| Q39| Homem 50a, trabalhador rural, lesão crescimento rápido dorso do pé — AP           | B        |

---

## VALIDAÇÃO ESPERADA

1. `npm run build` sem erros de TypeScript
2. Questões teóricas existentes continuam funcionando com `section: "theoretical"`
3. A tela inicial do TED mostra os dois cards de seção
4. A questão exemplo `ted-tp-2023-q04` aparece na seção "Teórico-Prática" com bloco de imagem renderizado (mesmo que a imagem `/images/ted/tp/2023/q04.png` ainda não exista — mostrar imagem quebrada é aceitável nesta etapa)
5. Progresso de "Teóricas" e "Teórico-Práticas" é contabilizado separadamente

## ESCOPO DESTE PROMPT

✅ Fazer: estrutura, tipos, campos, renderização de imagem, card de seção na home do TED, questão exemplo  
❌ Não fazer agora: cadastrar todas as 15+ questões, extrair imagens dos PDFs, preencher links de vídeo
