import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { algorithmTree } from "../data/algorithm";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle, translateOptionLabel } from "../i18n/translations";
import { buildPathToNode, getChildMap } from "../utils/tree";
import type { AlgorithmNode } from "../types/algorithm";

const TERMINAL_TYPES = new Set(["diagnosis", "morphologic_terminal", "placeholder", "info"]);

function isTerminalNode(node: AlgorithmNode | undefined): boolean {
  return TERMINAL_TYPES.has(node?.type ?? "");
}

function makeBridgeId(parentId: string, childId: string) {
  return `bridge:${parentId}:${childId}`;
}

interface LineData {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  rootNodeId: string;
}

// ─── Level entry ───────────────────────────────────────────────────────────────

interface LevelEntry {
  id: string;
  concreteId: string;
  parentId: string | undefined;
  parentConcreteId: string | undefined;
  isTerminal: boolean;
  isBridge: boolean;
}

function buildLevels(
  rootId: string,
  expanded: Set<string>,
  childMap: Map<string, string[]>,
): LevelEntry[][] {
  const levels: LevelEntry[][] = [];

  function visit(
    nodeId: string,
    parentId: string | undefined,
    parentConcreteId: string | undefined,
    depth: number,
  ) {
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push({ id: nodeId, concreteId: nodeId, parentId, parentConcreteId, isTerminal: false, isBridge: false });

    if (!expanded.has(nodeId)) return;

    for (const childId of childMap.get(nodeId) ?? []) {
      const childNode = algorithmTree.nodes[childId];
      if (isTerminalNode(childNode)) {
        const bridgeId = makeBridgeId(nodeId, childId);
        if (!levels[depth + 1]) levels[depth + 1] = [];
        levels[depth + 1].push({ id: bridgeId, concreteId: childId, parentId: nodeId, parentConcreteId: nodeId, isTerminal: false, isBridge: true });
        // Terminal card: stored in levels for ref/edge tracking, rendered inline with bridge
        if (expanded.has(bridgeId)) {
          if (!levels[depth + 2]) levels[depth + 2] = [];
          levels[depth + 2].push({ id: childId, concreteId: childId, parentId: bridgeId, parentConcreteId: nodeId, isTerminal: true, isBridge: false });
        }
      } else {
        visit(childId, nodeId, nodeId, depth + 1);
      }
    }
  }

  visit(rootId, undefined, undefined, 0);
  return levels;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  refCb: (el: HTMLElement | null) => void;
  label: string;
  isActive: boolean;
  isClickable: boolean;
  onClick: () => void;
}

function TreeCard({ refCb, label, isActive, isClickable, onClick }: CardProps) {
  const activeStyle: CSSProperties = {
    background: "linear-gradient(135deg, #f3ecff 0%, #efe6ff 100%)",
    boxShadow: "0 16px 28px -24px rgba(167, 92, 246, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
  };

  return (
    <button
      ref={refCb}
      type="button"
      onClick={isClickable ? onClick : undefined}
      className={`relative w-[270px] min-w-[270px] rounded-[1.45rem] border px-6 py-5 pr-20 text-left text-[1.08rem] font-semibold leading-[1.28] transition duration-200 ${
        isActive
          ? "border-[#dccdff] text-[#8b63d9]"
          : "border-[#eadff3] bg-white text-[#8b63d9] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16),0_10px_18px_-16px_rgba(39,19,71,0.12)]"
      } ${isClickable ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#d8c1ef] hover:shadow-[0_22px_34px_-24px_rgba(39,19,71,0.2),0_12px_22px_-16px_rgba(39,19,71,0.14)]" : "cursor-default"}`}
      style={isActive ? activeStyle : undefined}
    >
      <span className="block">{label}</span>
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-18px_rgba(20,27,43,0.42)]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
            <path d="M7 5.5 12 10l-5 4.5" stroke="#ff4f5e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

const COL_GAP = 40; // px between columns

export function InteractiveTreeDiagram({ rootNodeId }: Props) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const childMap = useMemo(() => getChildMap(), []);

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([rootNodeId]));

  const [lines, setLines] = useState<LineData[]>([]);
  const [svgW, setSvgW] = useState(0);
  const [svgH, setSvgH] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});

  const levels = useMemo(
    () => buildLevels(rootNodeId, expanded, childMap),
    [rootNodeId, expanded, childMap],
  );

  // Map bridgeId → terminal LevelEntry for inline rendering
  const terminalByBridgeId = useMemo(() => {
    const map = new Map<string, LevelEntry>();
    for (const level of levels) {
      for (const entry of level) {
        if (entry.isTerminal && entry.parentId) {
          map.set(entry.parentId, entry);
        }
      }
    }
    return map;
  }, [levels]);

  // Edges: every non-root entry has parent→self edge; terminals are rendered inline so their
  // edge (bridge→terminal) is a short connector — still tracked for the SVG line.
  const edges = useMemo(() => {
    const result: Array<{ from: string; to: string }> = [];
    for (const level of levels) {
      for (const entry of level) {
        if (entry.parentId !== undefined) {
          result.push({ from: entry.parentId, to: entry.id });
        }
      }
    }
    return result;
  }, [levels]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const outer = outerRef.current;
    if (!content || !outer) return;

    function update() {
      const cnt = contentRef.current;
      const out = outerRef.current;
      if (!cnt || !out) return;

      // CSS `transform: scale()` does NOT affect layout — scrollWidth/Height
      // always reflect the element's natural (pre-transform) layout size.
      // Do NOT divide by currentScale here; that creates a runaway feedback loop.
      const naturalW = cnt.scrollWidth;
      const naturalH = cnt.scrollHeight;
      const availW = out.clientWidth - 32;

      // Scale only to fit width. Height grows with the content.
      // Cap at 1.0 (never zoom in) and floor at 0.32 (still readable).
      const newScale = Math.max(
        Math.min(naturalW > 0 ? availW / naturalW : 1.0, 1.0),
        0.32,
      );

      if (Math.abs(newScale - scaleRef.current) > 0.004) {
        scaleRef.current = newScale;
        setScale(newScale);
      }

      const s = scaleRef.current;
      const cRect = cnt.getBoundingClientRect();
      const newLines: LineData[] = [];

      for (const edge of edges) {
        const fromEl = nodeRefs.current[edge.from];
        const toEl = nodeRefs.current[edge.to];
        if (!fromEl || !toEl) continue;
        const fr = fromEl.getBoundingClientRect();
        const tr = toEl.getBoundingClientRect();
        newLines.push({
          id: `${edge.from}→${edge.to}`,
          x1: (fr.right - cRect.left) / s,
          y1: (fr.top + fr.height / 2 - cRect.top) / s,
          x2: (tr.left - cRect.left) / s,
          y2: (tr.top + tr.height / 2 - cRect.top) / s,
        });
      }

      setSvgW(naturalW);
      setSvgH(naturalH);
      setLines(newLines);
    }

    update();
    const start = performance.now();
    let rafId = requestAnimationFrame(function tick(now) {
      update();
      if (now - start < 700) rafId = requestAnimationFrame(tick);
    });
    const ro = new ResizeObserver(() => update());
    ro.observe(content);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges, scale]);

  const toggle = useCallback(
    (toggleId: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(toggleId)) {
          if (toggleId.startsWith("bridge:")) {
            next.delete(toggleId);
          } else {
            function collapse(id: string) {
              next.delete(id);
              for (const childId of childMap.get(id) ?? []) {
                const childNode = algorithmTree.nodes[childId];
                if (isTerminalNode(childNode)) {
                  next.delete(makeBridgeId(id, childId));
                } else {
                  collapse(childId);
                }
              }
            }
            collapse(toggleId);
          }
        } else {
          next.add(toggleId);
        }
        return next;
      });
    },
    [childMap],
  );

  const expandAll = useCallback(() => {
    const all = new Set<string>();
    function addAll(id: string) {
      const node = algorithmTree.nodes[id];
      if (!node || isTerminalNode(node)) return;
      all.add(id);
      for (const childId of childMap.get(id) ?? []) {
        const childNode = algorithmTree.nodes[childId];
        if (isTerminalNode(childNode)) {
          all.add(makeBridgeId(id, childId));
        } else {
          addAll(childId);
        }
      }
    }
    addAll(rootNodeId);
    setExpanded(all);
  }, [rootNodeId, childMap]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([rootNodeId]));
  }, [rootNodeId]);

  // svgH is the natural (pre-scale) layout height; visual height = svgH * scale.
  // minHeight: small floor so the box doesn't collapse before first render.
  const minHeight = 260;
  const outerHeight = svgH > 0 ? Math.max(Math.ceil(svgH * scale) + 40, minHeight) : minHeight;

  function getDisplayLabel(entry: LevelEntry): string {
    if (!entry.isTerminal && entry.parentConcreteId) {
      const parent = algorithmTree.nodes[entry.parentConcreteId];
      const option = parent?.options?.find((o) => o.nextNodeId === entry.concreteId);
      if (option) return translateOptionLabel(entry.parentConcreteId, option, language);
    }
    return translateNodeTitle(algorithmTree.nodes[entry.concreteId], language);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={expandAll}
          className="rounded-full border border-sand bg-paper px-3 py-1 text-xs font-semibold text-steel transition hover:bg-sand"
        >
          {language === "en" ? "Expand all" : "Expandir tudo"}
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="rounded-full border border-sand bg-paper px-3 py-1 text-xs font-semibold text-steel transition hover:bg-sand"
        >
          {language === "en" ? "Collapse" : "Recolher"}
        </button>
        <span className="text-xs text-steel/70">
          {language === "en"
            ? "Click any node to expand / collapse"
            : "Clique em qualquer nó para expandir / recolher"}
        </span>
      </div>

      <div
        ref={outerRef}
        className="rounded-[32px] border border-sand bg-white shadow-panel overflow-x-hidden overflow-y-auto"
        style={{ height: outerHeight }}
      >
        <div
          ref={contentRef}
          className="relative p-5"
          style={{
            display: "inline-flex",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            transition: "transform 0.35s ease",
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: svgW || "100%",
              height: svgH || "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            {lines.map((line) => {
              const midX = (line.x1 + line.x2) / 2;
              const cr = 3;
              const gap = 4;
              const cx = line.x2 - gap - cr;
              const px = cx - cr - 0.5;
              const stroke = "rgba(192, 132, 252, 0.36)";
              return (
                <g key={line.id}>
                  <path
                    d={`M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${px} ${line.y2}`}
                    fill="none" stroke={stroke} strokeWidth="1.55" strokeLinecap="round"
                  />
                  <circle cx={cx} cy={line.y2} r={cr} fill="white" stroke={stroke} strokeWidth="1.4" />
                </g>
              );
            })}
          </svg>

          {/* Column layout: one column per depth level.
              Terminal nodes (diagnosis) are rendered INLINE to the right of their bridge card
              so each diagnosis is vertically aligned with its criterion. */}
          <div style={{ position: "relative", zIndex: 1, display: "inline-flex", gap: `${COL_GAP}px` }}>
            {levels.map((level, colIndex) => {
              // Skip pure-terminal levels — they're rendered inline with their bridges
              const visibleEntries = level.filter((e) => !e.isTerminal);
              if (visibleEntries.length === 0) return null;

              return (
                <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {visibleEntries.map((entry) => {
                    if (entry.isBridge) {
                      const termEntry = terminalByBridgeId.get(entry.id);
                      const isOpen = expanded.has(entry.id);
                      return (
                        // Bridge card + its diagnosis card in a horizontal pair
                        <div key={entry.id} style={{ display: "flex", flexDirection: "row", gap: `${COL_GAP}px` }}>
                          <TreeCard
                            refCb={(el) => { nodeRefs.current[entry.id] = el; }}
                            label={getDisplayLabel(entry)}
                            isActive={isOpen}
                            isClickable={true}
                            onClick={() => toggle(entry.id)}
                          />
                          {termEntry && isOpen && (
                            <TreeCard
                              refCb={(el) => { nodeRefs.current[termEntry.id] = el; }}
                              label={getDisplayLabel(termEntry)}
                              isActive={false}
                              isClickable={true}
                              onClick={() => {
                                navigate(`/diagnostico?nodeId=${termEntry.concreteId}`, {
                                  state: { trail: buildPathToNode(termEntry.concreteId).map((n) => n.id) },
                                });
                              }}
                            />
                          )}
                        </div>
                      );
                    }

                    // Regular branch card
                    const children = childMap.get(entry.id) ?? [];
                    const canExpand = children.length > 0;
                    const isActive = canExpand && expanded.has(entry.id);
                    return (
                      <TreeCard
                        key={entry.id}
                        refCb={(el) => { nodeRefs.current[entry.id] = el; }}
                        label={getDisplayLabel(entry)}
                        isActive={isActive}
                        isClickable={canExpand}
                        onClick={() => toggle(entry.id)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
