import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { algorithmTree } from "../data/algorithm";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle, translateOptionLabel } from "../i18n/translations";
import { buildPathToNode, getChildMap } from "../utils/tree";

interface FocusedTreeMapProps {
  selectedPath: string[];
  openedFinalNodeIds: string[];
  onSelectNode: (item: ColumnItem, level: number) => void;
}

interface PositionedLine {
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface ColumnItem {
  mapId: string;
  nodeId: string;
  displayLabel: string;
  kind: "branch" | "terminal-bridge" | "result";
}

export function FocusedTreeMap({ selectedPath, openedFinalNodeIds, onSelectNode }: FocusedTreeMapProps) {
  const { language } = useLanguage();
  const childMap = useMemo(() => getChildMap(), []);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const nodeWrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<PositionedLine[]>([]);
  const [enteringLineKeys, setEnteringLineKeys] = useState<string[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const previousVisibleLineKeysRef = useRef<Set<string>>(new Set());

  const { columns, selectedPathIds, focusedMapId } = useMemo(
    () => buildFocusedTreeColumns(selectedPath, openedFinalNodeIds, childMap, language),
    [selectedPath, openedFinalNodeIds, childMap, language],
  );
  const edges = useMemo(() => buildEdges(columns, childMap), [columns, childMap]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useLayoutEffect(() => {
    function measureLines() {
      const container = containerRef.current;
      if (!container) return;

      applyFinalColumnAlignment(columns, nodeRefs.current, nodeWrapperRefs.current);

      const containerRect = container.getBoundingClientRect();
      const nextLines = edges
        .map((edge) => {
          const fromElement = nodeRefs.current[edge.from];
          const toElement = nodeRefs.current[edge.to];
          if (!fromElement || !toElement) return null;

          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();

          return {
            ...edge,
            x1: fromRect.right - containerRect.left,
            y1: fromRect.top - containerRect.top + fromRect.height / 2,
            x2: toRect.left - containerRect.left,
            y2: toRect.top - containerRect.top + toRect.height / 2,
          };
        })
        .filter((line): line is PositionedLine => Boolean(line));

      setLines(nextLines);
    }

    measureLines();

    const observer = new ResizeObserver(() => measureLines());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    Object.values(nodeRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measureLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureLines);
    };
  }, [columns]);

  useEffect(() => {
    const visibleLineKeys = new Set(lines.map((line) => `${line.from}-${line.to}`));
    const previousVisibleLineKeys = previousVisibleLineKeysRef.current;

    if (prefersReducedMotion) {
      if (enteringLineKeys.length > 0) {
        setEnteringLineKeys([]);
      }
      previousVisibleLineKeysRef.current = visibleLineKeys;
      return;
    }

    const nextEnteringLineKeys = lines
      .map((line) => `${line.from}-${line.to}`)
      .filter((lineKey) => !previousVisibleLineKeys.has(lineKey));

    setEnteringLineKeys(nextEnteringLineKeys);
    previousVisibleLineKeysRef.current = visibleLineKeys;
  }, [enteringLineKeys.length, lines, prefersReducedMotion]);

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
                const lineKey = `${line.from}-${line.to}`;
                const isActiveLine = selectedPathIds.includes(line.from) && selectedPathIds.includes(line.to);
                const strokeColor = isActiveLine ? "rgba(255, 88, 109, 0.86)" : "rgba(192, 132, 252, 0.36)";
                const circleRadius = isActiveLine ? 3.4 : 3;
                const circleGap = 10;
                const circleX = line.x2 - circleGap;
                const pathEndX = circleX - circleRadius - 1.5;
                const shouldAnimateLine = enteringLineKeys.includes(lineKey);

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
              className="relative z-10 flex w-[270px] min-w-[270px] shrink-0 flex-col justify-center gap-3 py-4"
            >
              {column.map((item) => {
                const node = algorithmTree.nodes[item.nodeId];
                const isSelectedPath = selectedPathIds.includes(item.mapId);
                const isFocusNode = item.mapId === focusedMapId;
                const buttonStyle: CSSProperties | undefined = isFocusNode
                  ? {
                      background: "linear-gradient(135deg, #ff6a6f 0%, #ff4f7f 55%, #a75cf6 100%)",
                      boxShadow: "0 18px 28px -20px rgba(255, 79, 127, 0.34), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
                    }
                  : isSelectedPath
                    ? {
                        background: "linear-gradient(135deg, #f3ecff 0%, #efe6ff 100%)",
                        boxShadow: "0 16px 28px -24px rgba(167, 92, 246, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
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
                            : "border-[#eadff3] bg-white text-[#8b63d9] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16),0_10px_18px_-16px_rgba(39,19,71,0.12)] hover:border-[#d8c1ef] hover:shadow-[0_22px_34px_-24px_rgba(39,19,71,0.2),0_12px_22px_-16px_rgba(39,19,71,0.14)]"
                      }`}
                      style={buttonStyle}
                    >
                      <span className="block">
                        <span className={`block ${isFocusNode ? "drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""}`}>
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
                              stroke="#ff4f5e"
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

function applyFinalColumnAlignment(
  columns: ColumnItem[][],
  nodeElements: Record<string, HTMLButtonElement | null>,
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
