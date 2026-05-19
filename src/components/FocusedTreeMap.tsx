import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { algorithmTree } from "../data/algorithm";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle, translateOptionLabel } from "../i18n/translations";
import { buildPathToNode, getChildMap } from "../utils/tree";
import {
  createHorizontalEdgeIds,
  useQuizTreeLines,
} from "../hooks/useQuizTreeLines";

interface FocusedTreeMapProps {
  selectedPath: string[];
  openedFinalNodeIds: string[];
  onSelectNode: (item: ColumnItem, level: number) => void;
}

interface ColumnItem {
  mapId: string;
  nodeId: string;
  displayLabel: string;
  kind: "branch" | "terminal-bridge" | "result";
}

const CATEGORY_CONFIG: Record<string, {
  gradient: string;
  border: string;
  textColor: string;
  activeLineColor: string;
  inactiveLineColor: string;
  pulseGlow: string;
  focusGradient: string;
  focusShadow: string;
  selectedGradient: string;
  selectedShadow: string;
  selectedBorder: string;
  arrowColor: string;
}> = {
  dermatite: {
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
    border: "#d8b4fe",
    textColor: "#7c3aed",
    activeLineColor: "rgba(124, 58, 237, 0.86)",
    inactiveLineColor: "rgba(167, 92, 246, 0.38)",
    pulseGlow: "drop-shadow(0 0 6px rgba(192, 132, 252, 0.95)) drop-shadow(0 0 12px rgba(124, 58, 237, 0.70))",
    focusGradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 55%, #a78bfa 100%)",
    focusShadow: "0 18px 28px -20px rgba(109, 40, 217, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
    selectedGradient: "linear-gradient(135deg, #ede9ff 0%, #e0d0ff 100%)",
    selectedShadow: "0 16px 28px -24px rgba(124, 58, 237, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
    selectedBorder: "#c4b5fd",
    arrowColor: "#7c3aed",
  },
  "placeholder-neoplasia": {
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    border: "#86efac",
    textColor: "#15803d",
    activeLineColor: "rgba(21, 128, 61, 0.82)",
    inactiveLineColor: "rgba(134, 239, 172, 0.50)",
    pulseGlow: "drop-shadow(0 0 6px rgba(134, 239, 172, 0.95)) drop-shadow(0 0 12px rgba(21, 128, 61, 0.70))",
    focusGradient: "linear-gradient(135deg, #15803d 0%, #16a34a 55%, #4ade80 100%)",
    focusShadow: "0 18px 28px -20px rgba(21, 128, 61, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
    selectedGradient: "linear-gradient(135deg, #e8fdf0 0%, #c6f6d5 100%)",
    selectedShadow: "0 16px 28px -24px rgba(21, 128, 61, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
    selectedBorder: "#86efac",
    arrowColor: "#15803d",
  },
  "placeholder-cisto": {
    gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    border: "#93c5fd",
    textColor: "#1d4ed8",
    activeLineColor: "rgba(37, 99, 235, 0.82)",
    inactiveLineColor: "rgba(147, 197, 253, 0.50)",
    pulseGlow: "drop-shadow(0 0 6px rgba(147, 197, 253, 0.95)) drop-shadow(0 0 12px rgba(37, 99, 235, 0.70))",
    focusGradient: "linear-gradient(135deg, #1e40af 0%, #2563eb 55%, #60a5fa 100%)",
    focusShadow: "0 18px 28px -20px rgba(29, 78, 216, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
    selectedGradient: "linear-gradient(135deg, #e5f0ff 0%, #bfdbfe 100%)",
    selectedShadow: "0 16px 28px -24px rgba(37, 99, 235, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
    selectedBorder: "#93c5fd",
    arrowColor: "#1d4ed8",
  },
  deposito: {
    gradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    border: "#fcd34d",
    textColor: "#92400e",
    activeLineColor: "rgba(180, 83, 9, 0.82)",
    inactiveLineColor: "rgba(252, 211, 77, 0.50)",
    pulseGlow: "drop-shadow(0 0 6px rgba(252, 211, 77, 0.95)) drop-shadow(0 0 12px rgba(180, 83, 9, 0.70))",
    focusGradient: "linear-gradient(135deg, #92400e 0%, #b45309 55%, #f59e0b 100%)",
    focusShadow: "0 18px 28px -20px rgba(146, 64, 14, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
    selectedGradient: "linear-gradient(135deg, #fef5d0 0%, #fde68a 100%)",
    selectedShadow: "0 16px 28px -24px rgba(180, 83, 9, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
    selectedBorder: "#fcd34d",
    arrowColor: "#92400e",
  },
  "placeholder-hamartoma": {
    gradient: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    border: "#fecdd3",
    textColor: "#be123c",
    activeLineColor: "rgba(225, 29, 72, 0.82)",
    inactiveLineColor: "rgba(253, 164, 175, 0.45)",
    pulseGlow: "drop-shadow(0 0 6px rgba(253, 164, 175, 0.95)) drop-shadow(0 0 12px rgba(225, 29, 72, 0.70))",
    focusGradient: "linear-gradient(135deg, #9f1239 0%, #e11d48 55%, #fb7185 100%)",
    focusShadow: "0 18px 28px -20px rgba(190, 18, 60, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
    selectedGradient: "linear-gradient(135deg, #ffe8ea 0%, #ffd1d5 100%)",
    selectedShadow: "0 16px 28px -24px rgba(225, 29, 72, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
    selectedBorder: "#fecdd3",
    arrowColor: "#be123c",
  },
};

export function FocusedTreeMap({ selectedPath, openedFinalNodeIds, onSelectNode }: FocusedTreeMapProps) {
  const { language } = useLanguage();
  const childMap = useMemo(() => getChildMap(), []);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const nodeWrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [enteringLineKeys, setEnteringLineKeys] = useState<string[]>([]);
  const [pulsingLineKeys, setPulsingLineKeys] = useState<string[]>([]);
  const enterTimerRef = useRef<number | null>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const [enteringColumnIndex, setEnteringColumnIndex] = useState<number | null>(null);
  const prevColumnCountRef = useRef<number>(0);
  const columnEnterTimerRef = useRef<number | null>(null);
  const isFirstColumnRunRef = useRef<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const previousVisibleLineKeysRef = useRef<Set<string>>(new Set());

  const { columns, selectedPathIds, focusedMapId } = useMemo(
    () => buildFocusedTreeColumns(selectedPath, openedFinalNodeIds, childMap, language),
    [selectedPath, openedFinalNodeIds, childMap, language],
  );
  const edges = useMemo(() => buildEdges(columns, childMap), [columns, childMap]);

  const activeCatLineConfig = (() => {
    const first = selectedPathIds[0];
    if (!first?.startsWith("node:")) return null;
    return CATEGORY_CONFIG[first.slice(5)] ?? null;
  })();

  // Pares penúltima → última coluna (terminal-bridge → result). São
  // posicionados via `applyFinalColumnAlignment` para casar alturas, então
  // a linha deve ter inclinação zero — padrão descrito em
  // docs/QUIZ_TREE_LINE_PATTERN.md.
  const horizontalEdgeIds = useMemo(
    () => createHorizontalEdgeIds(collectFinalColumnPairs(columns)),
    [columns],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  // Aplica translateY na última coluna antes da medição das linhas para que
  // o `getBoundingClientRect()` leia a posição já alinhada. Executar em um
  // useLayoutEffect separado garante que o transform esteja no DOM antes
  // do hook `useQuizTreeLines` medir.
  useLayoutEffect(() => {
    applyFinalColumnAlignment(columns, nodeRefs.current, nodeWrapperRefs.current);
  }, [columns]);

  const lines = useQuizTreeLines({
    containerRef,
    nodeRefs,
    edges,
    horizontalEdgeIds,
  });

  useEffect(() => {
    const visibleLineKeys = new Set(lines.map((line) => line.id));
    const previousVisibleLineKeys = previousVisibleLineKeysRef.current;

    if (prefersReducedMotion) {
      if (enteringLineKeys.length > 0) setEnteringLineKeys([]);
      if (enterTimerRef.current !== null) {
        window.clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
        pulseTimerRef.current = null;
        setPulsingLineKeys([]);
      }
      previousVisibleLineKeysRef.current = visibleLineKeys;
      return;
    }

    const nextEnteringLineKeys = lines
      .map((line) => line.id)
      .filter((lineKey) => !previousVisibleLineKeys.has(lineKey));

    previousVisibleLineKeysRef.current = visibleLineKeys;

    // Guard: o hook `useQuizTreeLines` re-mede várias vezes via rAF durante
    // a animação de entrada da coluna. Não queremos resetar as classes de
    // entrada a cada tick — só quando há ids realmente novos.
    if (nextEnteringLineKeys.length === 0) return;

    if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current);
    setEnteringLineKeys(nextEnteringLineKeys);
    enterTimerRef.current = window.setTimeout(() => {
      setEnteringLineKeys([]);
      enterTimerRef.current = null;
    }, 620);

    if (pulseTimerRef.current !== null) window.clearTimeout(pulseTimerRef.current);
    setPulsingLineKeys(nextEnteringLineKeys);
    pulseTimerRef.current = window.setTimeout(() => {
      setPulsingLineKeys([]);
      pulseTimerRef.current = null;
    }, 1050);
  }, [lines, prefersReducedMotion, enteringLineKeys.length]);

  useEffect(() => {
    if (isFirstColumnRunRef.current) {
      isFirstColumnRunRef.current = false;
      prevColumnCountRef.current = columns.length;
      return;
    }

    if (prefersReducedMotion) {
      prevColumnCountRef.current = columns.length;
      return;
    }

    if (columns.length > prevColumnCountRef.current) {
      if (columnEnterTimerRef.current !== null) window.clearTimeout(columnEnterTimerRef.current);
      setEnteringColumnIndex(columns.length - 1);
      columnEnterTimerRef.current = window.setTimeout(() => {
        setEnteringColumnIndex(null);
        columnEnterTimerRef.current = null;
      }, 500);
    }

    prevColumnCountRef.current = columns.length;
  }, [columns.length, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current);
      if (pulseTimerRef.current !== null) window.clearTimeout(pulseTimerRef.current);
      if (columnEnterTimerRef.current !== null) window.clearTimeout(columnEnterTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea || columns.length === 0) return;

    const nextColumnIndex = Math.min(selectedPathIds.length, columns.length - 1);
    const targetColumn = columnRefs.current[nextColumnIndex];
    if (!targetColumn) return;

    const targetLeft = Math.max(0, targetColumn.offsetLeft + targetColumn.offsetWidth - scrollArea.clientWidth + 24);
    scrollArea.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [focusedMapId, columns, selectedPathIds]);

  return (
    <section>
      <div ref={scrollAreaRef} className="overflow-x-auto overflow-y-hidden rounded-[32px] border border-sand bg-white p-5 shadow-panel">
        <div ref={containerRef} className="relative flex min-w-max flex-nowrap items-start gap-10 pb-3">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {lines.map((line) => (
              (() => {
                const lineKey = line.id;
                const isActiveLine = selectedPathIds.includes(line.from) && selectedPathIds.includes(line.to);
                const strokeColor = isActiveLine
                  ? (activeCatLineConfig?.activeLineColor ?? "rgba(255, 88, 109, 0.86)")
                  : (activeCatLineConfig?.inactiveLineColor ?? "rgba(192, 132, 252, 0.36)");
                const circleRadius = isActiveLine ? 3.4 : 3;
                // Padrão oficial: `circleEdgeGap` = distância entre a borda
                // direita do círculo e a borda esquerda da caixa-destino.
                // Subtrair o raio mantém a distância visível constante
                // independentemente do raio (active vs não-active).
                // Ver docs/QUIZ_TREE_LINE_PATTERN.md.
                const circleEdgeGap = 4;
                const circleX = line.x2 - circleEdgeGap - circleRadius;
                const pathEndX = circleX - circleRadius - 0.5;
                const shouldAnimateLine = enteringLineKeys.includes(lineKey);
                const shouldPulseLine = pulsingLineKeys.includes(lineKey);

                return (
                  <g key={lineKey}>
                    <path
                      className={shouldAnimateLine ? "focused-tree-map-connection focused-tree-map-connection--enter" : "focused-tree-map-connection"}
                      d={`M ${line.x1} ${line.y1} C ${line.x1 + 34} ${line.y1}, ${pathEndX - 34} ${line.y2}, ${pathEndX} ${line.y2}`}
                      fill="none"
                      pathLength={1}
                      stroke={strokeColor}
                      strokeWidth={isActiveLine ? "2.25" : "1.55"}
                      strokeLinecap="round"
                    />
                    {shouldPulseLine ? (
                      <path
                        d={`M ${line.x1} ${line.y1} C ${line.x1 + 34} ${line.y1}, ${pathEndX - 34} ${line.y2}, ${pathEndX} ${line.y2}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.98)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        pathLength={1}
                        className="focused-tree-map-connection-pulse"
                        style={{ filter: activeCatLineConfig?.pulseGlow ?? "drop-shadow(0 0 6px rgba(255, 220, 255, 0.95)) drop-shadow(0 0 12px rgba(200, 100, 255, 0.70))" }}
                      />
                    ) : null}
                    <circle
                      cx={circleX}
                      cy={line.y2}
                      r={circleRadius}
                      fill="white"
                      stroke={strokeColor}
                      strokeWidth={isActiveLine ? "1.8" : "1.4"}
                    />
                  </g>
                );
              })()
            ))}
          </svg>

          {columns.map((column, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              ref={(element) => {
                columnRefs.current[columnIndex] = element;
              }}
              className={`relative z-10 flex w-[270px] min-w-[270px] shrink-0 flex-col justify-center gap-3 py-4${columnIndex === enteringColumnIndex ? " focused-tree-map-column-enter" : ""}`}
            >
              {column.map((item) => {
                const node = algorithmTree.nodes[item.nodeId];
                const isSelectedPath = selectedPathIds.includes(item.mapId);
                const isFocusNode = item.mapId === focusedMapId;
                const catConfig = CATEGORY_CONFIG[item.nodeId];
                const isCategoryTile = !!catConfig && columnIndex === 0 && !isFocusNode && !isSelectedPath;
                const buttonStyle: CSSProperties | undefined = isFocusNode
                  ? {
                      background: activeCatLineConfig?.focusGradient ?? "linear-gradient(135deg, #ff6a6f 0%, #ff4f7f 55%, #a75cf6 100%)",
                      boxShadow: activeCatLineConfig?.focusShadow ?? "0 18px 28px -20px rgba(255, 79, 127, 0.34), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
                    }
                  : isSelectedPath
                    ? {
                        background: activeCatLineConfig?.selectedGradient ?? "linear-gradient(135deg, #f3ecff 0%, #efe6ff 100%)",
                        boxShadow: activeCatLineConfig?.selectedShadow ?? "0 16px 28px -24px rgba(167, 92, 246, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
                        borderColor: activeCatLineConfig?.selectedBorder,
                        color: activeCatLineConfig?.textColor,
                      }
                    : isCategoryTile
                      ? {
                          background: catConfig.gradient,
                          borderColor: catConfig.border,
                          boxShadow: "0 6px 24px -8px rgba(0,0,0,0.10), 0 2px 8px -4px rgba(0,0,0,0.06)",
                        }
                      : undefined;

                return (
                  <div
                    key={item.mapId}
                    ref={(element) => {
                      nodeWrapperRefs.current[item.mapId] = element;
                    }}
                  >
                    <button
                      type="button"
                      ref={(element) => {
                        nodeRefs.current[item.mapId] = element;
                      }}
                      onClick={() => onSelectNode(item, columnIndex)}
                      className={`relative w-full rounded-[1.45rem] border px-6 py-5 pr-20 text-left text-[1.08rem] font-semibold leading-[1.28] transition duration-200 hover:-translate-y-0.5 ${
                        isFocusNode
                          ? "border-white/20 text-white"
                          : isSelectedPath
                            ? "border-[#dccdff] text-[#8b63d9]"
                            : isCategoryTile
                              ? "hover:brightness-[0.975]"
                              : "border-[#eadff3] bg-white text-[#8b63d9] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16),0_10px_18px_-16px_rgba(39,19,71,0.12)] hover:border-[#d8c1ef] hover:shadow-[0_22px_34px_-24px_rgba(39,19,71,0.2),0_12px_22px_-16px_rgba(39,19,71,0.14)]"
                      }`}
                      style={buttonStyle}
                    >
                      <span className="block">
                        <span
                          className={`block ${isFocusNode ? "drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""}`}
                          style={isCategoryTile ? { color: catConfig.textColor } : undefined}
                        >
                          {item.displayLabel || translateNodeTitle(node, language)}
                        </span>
                      </span>
                      {isSelectedPath ? (
                        <span
                          aria-hidden="true"
                          className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-18px_rgba(20,27,43,0.42)]"
                        >
                          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                            <path
                              d="M7 5.5 12 10l-5 4.5"
                              stroke={activeCatLineConfig?.arrowColor ?? "#ff4f5e"}
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function buildFocusedTreeColumns(
  selectedPath: string[],
  openedFinalNodeIds: string[],
  childMap: Map<string, string[]>,
  language: "pt" | "en",
) {
  const columns: ColumnItem[][] = [];
  const selectedPathIds: string[] = [];
  let currentParentId = algorithmTree.rootId;
  let pendingTerminalParentId: string | null = null;

  while (true) {
    const column: ColumnItem[] = pendingTerminalParentId
      ? buildResultItems(pendingTerminalParentId, openedFinalNodeIds, childMap, language)
      : buildColumnItems(currentParentId, childMap, language);

    if (!column.length) {
      break;
    }

    columns.push(column);

    const expectedSelection = selectedPath[selectedPathIds.length];
    if (!expectedSelection) {
      break;
    }

    const selectedItem = column.find((item: ColumnItem) => item.mapId === expectedSelection);
    if (!selectedItem) {
      break;
    }

    selectedPathIds.push(selectedItem.mapId);

    if (pendingTerminalParentId) {
      break;
    }

    if (selectedItem.kind === "terminal-bridge") {
      pendingTerminalParentId = currentParentId;
      continue;
    }

    currentParentId = selectedItem.nodeId;
  }

  return {
    columns,
    focusedMapId: selectedPathIds[selectedPathIds.length - 1] ?? null,
    selectedPathIds,
  };
}

function buildEdges(columns: ColumnItem[][], childMap: Map<string, string[]>) {
  const edges: Array<{ from: string; to: string }> = [];

  columns.forEach((column, columnIndex) => {
    const nextColumn = columns[columnIndex + 1];
    if (!nextColumn) return;

    column.forEach((item) => {
      nextColumn.forEach((nextItem) => {
        if (item.kind === "terminal-bridge" && nextItem.kind === "result" && item.nodeId === nextItem.nodeId) {
          edges.push({ from: item.mapId, to: nextItem.mapId });
          return;
        }

        const isDirectChild = (childMap.get(item.nodeId) ?? []).includes(nextItem.nodeId);
        if (isDirectChild) {
          edges.push({ from: item.mapId, to: nextItem.mapId });
        }
      });
    });
  });

  return edges;
}

function buildColumnItems(parentId: string, childMap: Map<string, string[]>, language: "pt" | "en"): ColumnItem[] {
  const parent = algorithmTree.nodes[parentId];
  const children = childMap.get(parentId) ?? [];
  const optionLabelMap = new Map(
    (parent?.options ?? []).map((option) => [option.nextNodeId, translateOptionLabel(parentId, option, language)]),
  );

  return children.map((childId) => {
    const childNode = algorithmTree.nodes[childId];
    const isTerminalChild = isTerminalTreeNode(childNode);
    return {
      mapId: isTerminalChild ? buildTerminalBridgeId(parentId, childId) : buildNodeMapId(childId),
      nodeId: childId,
      displayLabel: optionLabelMap.get(childId) ?? translateNodeTitle(childNode, language),
      kind: isTerminalChild ? "terminal-bridge" : "branch",
    };
  });
}

function buildResultItem(nodeId: string, language: "pt" | "en"): ColumnItem {
  const node = algorithmTree.nodes[nodeId];
  return {
    mapId: buildNodeMapId(nodeId),
    nodeId,
    displayLabel: translateNodeTitle(node, language),
    kind: "result",
  };
}

function buildResultItems(
  parentId: string,
  openedFinalNodeIds: string[],
  childMap: Map<string, string[]>,
  language: "pt" | "en",
) {
  const allowedNodeIds = new Set((childMap.get(parentId) ?? []).filter((childId) => isTerminalTreeNode(algorithmTree.nodes[childId])));
  return openedFinalNodeIds
    .filter((nodeId) => allowedNodeIds.has(nodeId))
    .map((nodeId) => buildResultItem(nodeId, language));
}

function collectFinalColumnPairs(columns: ColumnItem[][]): Array<{ from: string; to: string }> {
  if (columns.length < 2) return [];

  const lastColumn = columns[columns.length - 1];
  const sourceColumn = columns[columns.length - 2];
  const pairs: Array<{ from: string; to: string }> = [];

  lastColumn.forEach((item) => {
    if (item.kind !== "result") return;
    const source = sourceColumn.find(
      (entry) => entry.kind === "terminal-bridge" && entry.nodeId === item.nodeId,
    );
    if (source) {
      pairs.push({ from: source.mapId, to: item.mapId });
    }
  });

  return pairs;
}

function applyFinalColumnAlignment(
  columns: ColumnItem[][],
  nodeElements: Record<string, HTMLElement | null>,
  wrapperElements: Record<string, HTMLDivElement | null>,
) {
  if (columns.length < 2) {
    return;
  }

  const lastColumn = columns[columns.length - 1];
  const sourceColumn = columns[columns.length - 2];
  const resultItems = lastColumn.filter((item) => item.kind === "result");

  resultItems.forEach((item) => {
    const wrapper = wrapperElements[item.mapId];
    if (wrapper) {
      wrapper.style.transform = "";
    }
  });

  resultItems.forEach((item) => {
    const sourceMapId = sourceColumn.find((sourceItem) => sourceItem.kind === "terminal-bridge" && sourceItem.nodeId === item.nodeId)?.mapId;
    if (!sourceMapId) {
      return;
    }

    const sourceElement = nodeElements[sourceMapId];
    const targetElement = nodeElements[item.mapId];
    const targetWrapper = wrapperElements[item.mapId];
    if (!sourceElement || !targetElement || !targetWrapper) {
      return;
    }

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const offsetY =
      sourceRect.top + sourceRect.height / 2 - (targetRect.top + targetRect.height / 2);

    if (!Number.isFinite(offsetY)) {
      return;
    }

    targetWrapper.style.transform = Math.abs(offsetY) < 1 ? "" : `translateY(${offsetY}px)`;
  });

  // When the last column contains only terminal-bridge items (decision node whose
  // ALL children are terminals), align the group's vertical center with the parent
  // branch card in the previous column.
  const terminalBridgeItems = lastColumn.filter((item) => item.kind === "terminal-bridge");
  if (terminalBridgeItems.length === 0 || resultItems.length > 0) return;

  terminalBridgeItems.forEach((item) => {
    const wrapper = wrapperElements[item.mapId];
    if (wrapper) wrapper.style.transform = "";
  });

  // mapId format: "terminal-bridge:{parentId}:{childId}"
  const parentId = terminalBridgeItems[0].mapId.split(":")[1];
  const parentElement = nodeElements[buildNodeMapId(parentId)];
  if (!parentElement) return;

  const firstEl = nodeElements[terminalBridgeItems[0].mapId];
  const lastEl = nodeElements[terminalBridgeItems[terminalBridgeItems.length - 1].mapId];
  if (!firstEl || !lastEl) return;

  const firstRect = firstEl.getBoundingClientRect();
  const lastRect = lastEl.getBoundingClientRect();
  const groupCenter = (firstRect.top + lastRect.bottom) / 2;

  const parentRect = parentElement.getBoundingClientRect();
  const parentCenter = parentRect.top + parentRect.height / 2;

  const offsetY = parentCenter - groupCenter;
  if (!Number.isFinite(offsetY) || Math.abs(offsetY) < 1) return;

  terminalBridgeItems.forEach((item) => {
    const wrapper = wrapperElements[item.mapId];
    if (wrapper) wrapper.style.transform = `translateY(${offsetY}px)`;
  });
}

function isTerminalTreeNode(node: (typeof algorithmTree.nodes)[string] | undefined) {
  return ["diagnosis", "morphologic_terminal", "placeholder", "info"].includes(node?.type ?? "");
}

export function buildNodeMapId(nodeId: string) {
  return `node:${nodeId}`;
}

export function buildTerminalBridgeId(parentId: string, nodeId: string) {
  return `terminal-bridge:${parentId}:${nodeId}`;
}

export function buildSelectedMapPath(nodeId: string) {
  if (nodeId === algorithmTree.rootId) {
    return [];
  }

  return buildPathToNode(nodeId).flatMap((node) => {
    if (!isTerminalTreeNode(node)) {
      return [buildNodeMapId(node.id)];
    }

    return node.parentId ? [buildTerminalBridgeId(node.parentId, node.id), buildNodeMapId(node.id)] : [buildNodeMapId(node.id)];
  });
}

export function getConcreteNodeIdFromMapPath(path: string[]) {
  const lastItem = path[path.length - 1];
  if (!lastItem) {
    return algorithmTree.rootId;
  }

  if (lastItem.startsWith("node:")) {
    return lastItem.slice("node:".length);
  }

  if (lastItem.startsWith("terminal-bridge:")) {
    const [, , nodeId] = lastItem.split(":");
    return nodeId ?? algorithmTree.rootId;
  }

  return algorithmTree.rootId;
}
