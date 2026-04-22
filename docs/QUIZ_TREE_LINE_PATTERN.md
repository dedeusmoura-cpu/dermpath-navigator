# Padrão das linhas de conexão dos algoritmos (Quiz Tree Lines)

Este documento descreve o padrão **oficial e obrigatório** para desenhar as
linhas de conexão entre as caixas dos algoritmos do DermPath Navigator. Toda
tela de quiz ou árvore de decisão nova deve seguir este padrão — inclusive
páginas futuras — para garantir consistência visual e comportamento coerente
durante animações de entrada de colunas.

## Por que um padrão

Durante a evolução das telas `/quiz/dermatite` e `/quiz/dermatite/2` foram
descobertos três problemas sutis de renderização que, acumulados, geravam
linhas “desconfiguradas”:

1. **Animação de entrada (`quiz-tree-column-enter`) deslocava as caixas por
   `translateX(14px → 0)` durante ~460ms.** O `getBoundingClientRect()`
   retorna posições *já transformadas*, então medir a única vez no layout
   inicial gravava coordenadas referentes à caixa **antes** do fim da
   animação. O resultado: linhas apontando para um ponto deslocado, com a
   bolinha nascendo fora da caixa.
2. **`ResizeObserver` não dispara para mudanças de `transform`.** Logo,
   confiar apenas nele não cobria a animação de entrada.
3. **Sub-pixel rounding + medições fora de sincronia** produziam uma leve
   inclinação entre a penúltima e a última coluna, mesmo quando o layout
   em si casava as alturas (via `getFinalColumnNodeStyle`).

O padrão abaixo resolve os três pontos e deve ser reutilizado em qualquer
tela nova.

## Arquivos envolvidos

| Arquivo | Papel |
| --- | --- |
| `src/components/QuizTreeLine.tsx` | Componente SVG que desenha a curva Bézier + o círculo na ponta da linha. Também expõe o hook `useEnteringLines` para animar a entrada de novas linhas. |
| `src/hooks/useQuizTreeLines.ts` | Hook que mede em tempo real `x1,y1,x2,y2` de cada edge e devolve o array consumido pelo `<QuizTreeLine />`. É a única fonte de verdade para medição de linhas. |
| `src/utils/quizFinalColumnLayout.ts` | Helpers de posicionamento absoluto para a última coluna (pareamento 1:1 com a penúltima), usados pelas duas páginas do quiz. |
| `src/pages/DermatiteQuizPage.tsx` | Exemplo canônico do padrão (quiz Case 1). |
| `src/pages/DermatiteQuizCase2Page.tsx` | Exemplo canônico do padrão (quiz Case 2). |
| `src/components/FocusedTreeMap.tsx` | Aplicação do padrão no mapa da árvore (`/mapa-da-arvore`) — mantém estilos próprios de linha, mas usa o hook e o espaçamento padrão do círculo. |

## Requisitos do padrão

Toda tela de algoritmo/árvore deve:

1. **Renderizar as linhas dentro de um `<svg>` posicionado em cima de um
   container `position: relative`** cujo `ref` será passado ao hook.
2. **Usar `useQuizTreeLines`** (e nunca reimplementar a lógica de medição
   manualmente). O hook já cuida de:
   - medir cada edge por `getBoundingClientRect()`;
   - re-medir em `requestAnimationFrame` durante
     `QUIZ_TREE_COLUMN_ANIMATION_MS` (520ms, com folga em relação aos 460ms
     da animação CSS) para acompanhar o `translateX` da animação
     `quiz-tree-column-enter`;
   - observar mudanças de tamanho via `ResizeObserver` **e**
     `window.resize`;
   - forçar `y2 = y1` em edges declaradas como horizontais (ver item 4).
3. **Usar `useEnteringLines`** para destacar as linhas que acabaram de
   nascer, mantendo o efeito visual verde pulsante.
4. **Forçar 0° de inclinação na conexão penúltima → última coluna.** Para
   isso, passe ao hook o `Set` construído por `createHorizontalEdgeIds`
   a partir dos pares da última coluna. Essas ligações devem sempre unir
   as linhas médias verticais das duas caixas, cujos centros ficam na
   mesma altura (garantido também pelo `getFinalColumnNodeStyle`).
5. **Manter as refs como `Record<string, HTMLElement | null>`**, nunca
   como uniões específicas tipo `HTMLDivElement | HTMLButtonElement` — o
   hook exige o tipo genérico por causa da invariância de
   `MutableRefObject<Record<K, V>>` em TypeScript.

## Receita de uso

```tsx
import { useMemo, useRef } from "react";
import { QuizTreeLine, useEnteringLines } from "../components/QuizTreeLine";
import {
  createHorizontalEdgeIds,
  useQuizTreeLines,
} from "../hooks/useQuizTreeLines";

const finalColumnPairs = [
  { from: "penultimate-a", to: "last-a" },
  { from: "penultimate-b", to: "last-b" },
] as const;

export function MyAlgorithmPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});

  const edges = useMemo(
    () => [
      { from: "root", to: "penultimate-a" },
      { from: "root", to: "penultimate-b" },
      ...finalColumnPairs,
    ],
    [],
  );

  const horizontalFinalEdgeIds = useMemo(
    () => createHorizontalEdgeIds(finalColumnPairs),
    [],
  );

  const lines = useQuizTreeLines({
    containerRef,
    nodeRefs,
    edges,
    horizontalEdgeIds: horizontalFinalEdgeIds,
  });
  const enteringIds = useEnteringLines(lines);

  return (
    <div ref={containerRef} className="quiz-tree-track relative min-w-max">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {lines.map((line) => (
          <QuizTreeLine
            key={line.id}
            line={line}
            isEntering={enteringIds.has(line.id)}
          />
        ))}
      </svg>

      {/* …colunas com caixas registradas via nodeRefs.current[id] = el… */}
    </div>
  );
}
```

### Múltiplos stages na mesma tela

Quando a mesma tela tem vários subgrafos (ex.: `DermatiteQuizPage` com os
stages `interface-question` e `final-images`), chame o hook **uma vez por
subgrafo**, com refs/containers próprios e `enabled` controlado pelo stage
atual:

```tsx
const treeLines = useQuizTreeLines({
  enabled: stage === "interface-question",
  containerRef: treeContainerRef,
  nodeRefs: treeNodeRefs,
  edges: visibleTreeEdges,
});

const finalTreeLines = useQuizTreeLines({
  enabled: stage === "final-images",
  containerRef: finalTreeContainerRef,
  nodeRefs: finalTreeNodeRefs,
  edges: finalVisibleTreeEdges,
  horizontalEdgeIds: horizontalFinalEdgeIds,
});

const allTreeLines = useMemo(
  () => [...treeLines, ...finalTreeLines],
  [treeLines, finalTreeLines],
);
const enteringIds = useEnteringLines(allTreeLines);
```

O `enabled: false` zera o array sem agendar medições; isso garante que
apenas o stage visível consome `requestAnimationFrame`/`ResizeObserver`.

## CSS obrigatório

- `quiz-tree-column-enter` aplica a animação de entrada por ~460ms. Toda
  coluna que entra dinamicamente (ex.: após um clique) deve ter essa
  classe, para que o usuário perceba o surgimento.
- `quiz-tree-line-base--enter` e `quiz-tree-line-pulse` são aplicados
  automaticamente pelo `<QuizTreeLine />` nas linhas cuja id está em
  `useEnteringLines`.
- `quiz-tree-track`, `quiz-tree-card`, `quiz-tree-column*` padronizam o
  espaçamento horizontal e as larguras por coluna; use as classes
  existentes em vez de redefinir `gap` ou `padding`.

## Checklist para novas telas

Antes de abrir PR de uma tela com algoritmo novo, confira:

- [ ] Refs dos nós tipadas como `HTMLElement | null`.
- [ ] Container `ref` separado para cada subgrafo.
- [ ] Apenas `useQuizTreeLines` mede linhas (nenhum `useLayoutEffect`
      manual com `getBoundingClientRect`).
- [ ] `createHorizontalEdgeIds` passado ao hook para a conexão entre as
      duas últimas colunas (quando há última coluna pareada 1:1).
- [ ] Coluna recém-renderizada tem a classe `quiz-tree-column-enter`.
- [ ] `useEnteringLines` consome todas as linhas visíveis (inclusive as
      de outros stages concatenadas via `useMemo`).

Seguindo esses itens, a tela nova herda automaticamente o comportamento
correto: linhas grudadas nas caixas durante a animação de entrada, 0° de
inclinação na conexão final, bolinha sempre visível e efeito verde
pulsante consistente com o resto do app.
