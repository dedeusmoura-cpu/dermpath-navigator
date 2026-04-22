import { useLayoutEffect, useState } from "react";
import type { MutableRefObject, RefObject } from "react";

/**
 * Padrão oficial para linhas de conexão dos algoritmos do app
 * (ver docs/QUIZ_TREE_LINE_PATTERN.md).
 *
 * Responsabilidades do hook:
 * - Mede `x1, y1, x2, y2` de cada edge a partir de `getBoundingClientRect()`.
 * - Re-mede a cada frame durante `QUIZ_TREE_COLUMN_ANIMATION_MS` (acompanha a
 *   animação `quiz-tree-column-enter`, que desloca a coluna por translateX
 *   de 14px → 0 durante ~460ms; sem isso as linhas ficam apontando para a
 *   posição transformada inicial e a bolinha nasce fora do lugar).
 * - Observa alterações de tamanho de container e nós via ResizeObserver
 *   + `window.resize`.
 * - Força `y2 = y1` para edges cuja id esteja em `horizontalEdgeIds`,
 *   garantindo 0° de inclinação nas ligações entre a penúltima e a última
 *   coluna do algoritmo (pareamento 1:1 com alturas casadas).
 *
 * Use este hook sempre que desenhar árvores com o componente
 * `<QuizTreeLine />` — inclusive em telas futuras — para manter coerência
 * de gap, curvatura e comportamento durante entrada de colunas.
 */
export interface QuizTreeEdge {
  from: string;
  to: string;
}

export interface QuizTreeLineData {
  id: string;
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type QuizTreeNodeElement = HTMLElement | null;
type QuizTreeNodeRefs = MutableRefObject<Record<string, QuizTreeNodeElement>>;

export interface UseQuizTreeLinesOptions {
  /** Quando `false`, o hook zera o array e não agenda medições. */
  enabled?: boolean;
  /** Container cuja origem será usada como referência para `x` e `y`. */
  containerRef: RefObject<HTMLElement | null>;
  /** Mapa de elementos dos nós indexado por id. */
  nodeRefs: QuizTreeNodeRefs;
  /** Edges a medir. Recomenda-se passar via `useMemo` para estabilidade. */
  edges: ReadonlyArray<QuizTreeEdge>;
  /**
   * Ids de edges (`${from}-${to}`) que devem ser estritamente horizontais
   * (`y2 = y1`). Use para pares penúltima → última coluna.
   */
  horizontalEdgeIds?: ReadonlySet<string>;
}

/** Duração padrão da animação `quiz-tree-column-enter`, com folga de ~60ms. */
export const QUIZ_TREE_COLUMN_ANIMATION_MS = 520;

function makeEdgeId(edge: QuizTreeEdge): string {
  return `${edge.from}-${edge.to}`;
}

export function useQuizTreeLines({
  enabled = true,
  containerRef,
  nodeRefs,
  edges,
  horizontalEdgeIds,
}: UseQuizTreeLinesOptions): QuizTreeLineData[] {
  const [lines, setLines] = useState<QuizTreeLineData[]>([]);

  useLayoutEffect(() => {
    if (!enabled) {
      setLines([]);
      return;
    }

    function measure() {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const nextLines: QuizTreeLineData[] = [];

      edges.forEach((edge) => {
        const fromElement = nodeRefs.current[edge.from];
        const toElement = nodeRefs.current[edge.to];
        if (!fromElement || !toElement) return;

        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
        const y2 = toRect.top - containerRect.top + toRect.height / 2;
        const id = makeEdgeId(edge);
        const forceHorizontal = horizontalEdgeIds?.has(id) ?? false;

        nextLines.push({
          id,
          from: edge.from,
          to: edge.to,
          x1: fromRect.right - containerRect.left,
          y1,
          x2: toRect.left - containerRect.left,
          y2: forceHorizontal ? y1 : y2,
        });
      });

      setLines(nextLines);
    }

    measure();

    // rAF loop que re-mede durante a animação `quiz-tree-column-enter`,
    // garantindo que as linhas sigam a coluna enquanto ela desliza.
    const animationStart = performance.now();
    let rafId = window.requestAnimationFrame(function tick(now) {
      measure();
      if (now - animationStart < QUIZ_TREE_COLUMN_ANIMATION_MS) {
        rafId = window.requestAnimationFrame(tick);
      }
    });

    const observer = new ResizeObserver(() => measure());
    if (containerRef.current) observer.observe(containerRef.current);
    Object.values(nodeRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, containerRef, nodeRefs, edges, horizontalEdgeIds]);

  return lines;
}

/**
 * Helper para montar o `Set` de ids de edges horizontais a partir de uma
 * lista de pares (formato usado pelas páginas de quiz).
 */
export function createHorizontalEdgeIds(
  pairs: ReadonlyArray<QuizTreeEdge>,
): ReadonlySet<string> {
  return new Set(pairs.map(makeEdgeId));
}
