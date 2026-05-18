import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { algorithmTree } from "../data/algorithm";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle, translateOptionLabel } from "../i18n/translations";
import { buildPathToNode, getChildMap } from "../utils/tree";
import type { AlgorithmNode } from "../types/algorithm";

const TERMINAL_TYPES = new Set(["diagnosis", "morphologic_terminal", "placeholder", "info"]);

const CATEGORY_LINE_COLORS: Record<string, string> = {
  dermatite: "rgba(167, 92, 246, 0.38)",
  "placeholder-neoplasia": "rgba(134, 239, 172, 0.50)",
  "placeholder-cisto": "rgba(147, 197, 253, 0.50)",
  deposito: "rgba(252, 211, 77, 0.50)",
  "placeholder-hamartoma": "rgba(253, 164, 175, 0.45)",
};

const CATEGORY_TILE_CONFIG: Record<string, { gradient: string; border: string; textColor: string; activeGradient: string; activeBorder: string; arrowColor: string; focusGradient: string; focusShadow: string }> = {
  dermatite: { gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", textColor: "#7c3aed", activeGradient: "linear-gradient(135deg, #ede9ff 0%, #e0d0ff 100%)", activeBorder: "#c4b5fd", arrowColor: "#7c3aed", focusGradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 55%, #a78bfa 100%)", focusShadow: "0 18px 28px -20px rgba(109, 40, 217, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)" },
  "placeholder-neoplasia": { gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "#86efac", textColor: "#15803d", activeGradient: "linear-gradient(135deg, #e8fdf0 0%, #c6f6d5 100%)", activeBorder: "#86efac", arrowColor: "#15803d", focusGradient: "linear-gradient(135deg, #15803d 0%, #16a34a 55%, #4ade80 100%)", focusShadow: "0 18px 28px -20px rgba(21, 128, 61, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)" },
  "placeholder-cisto": { gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", textColor: "#1d4ed8", activeGradient: "linear-gradient(135deg, #e5f0ff 0%, #bfdbfe 100%)", activeBorder: "#93c5fd", arrowColor: "#1d4ed8", focusGradient: "linear-gradient(135deg, #1e40af 0%, #2563eb 55%, #60a5fa 100%)", focusShadow: "0 18px 28px -20px rgba(29, 78, 216, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)" },
  deposito: { gradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", textColor: "#92400e", activeGradient: "linear-gradient(135deg, #fef5d0 0%, #fde68a 100%)", activeBorder: "#fcd34d", arrowColor: "#92400e", focusGradient: "linear-gradient(135deg, #92400e 0%, #b45309 55%, #f59e0b 100%)", focusShadow: "0 18px 28px -20px rgba(146, 64, 14, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)" },
  "placeholder-hamartoma": { gradient: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)", border: "#fecdd3", textColor: "#be123c", activeGradient: "linear-gradient(135deg, #ffe8ea 0%, #ffd1d5 100%)", activeBorder: "#fecdd3", arrowColor: "#be123c", focusGradient: "linear-gradient(135deg, #9f1239 0%, #e11d48 55%, #fb7185 100%)", focusShadow: "0 18px 28px -20px rgba(190, 18, 60, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)" },
};
const DEFAULT_LINE_COLOR = "rgba(192, 132, 252, 0.36)";

function resolveConcrete(id: string): string {
  return id.startsWith("bridge:") ? id.split(":")[1] : id;
}

function getCategoryForLine(fromId: string, toId: string, map: Map<string, string>): string | undefined {
  return map.get(resolveConcrete(toId)) ?? map.get(resolveConcrete(fromId));
}

function isTerminalNode(node: AlgorithmNode | undefined): boolean {
  return TERMINAL_TYPES.has(node?.type ?? "");
}

function makeBridgeId(parentId: string, childId: string) {
  return `bridge:${parentId}:${childId}`;
}

interface LineData {
  id: string;
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  rootNodeId: string;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  refCb: (el: HTMLElement | null) => void;
  label: string;
  isActive: boolean;
  isFocused: boolean;
  isClickable: boolean;
  onClick: () => void;
  tileConfig?: { gradient: string; border: string; textColor: string; activeGradient: string; activeBorder: string; arrowColor: string; focusGradient: string; focusShadow: string };
  showTile?: boolean;
  isTerminal?: boolean;
}

function TreeCard({ refCb, label, isActive, isFocused, isClickable, onClick, tileConfig, showTile = false, isTerminal = false }: CardProps) {
  const isTile = !!tileConfig && !isActive && showTile;
  const cardStyle: CSSProperties | undefined = isFocused
    ? {
        background: tileConfig?.focusGradient ?? "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 55%, #a78bfa 100%)",
        boxShadow: tileConfig?.focusShadow ?? "0 18px 28px -20px rgba(109, 40, 217, 0.40), 0 10px 18px -16px rgba(39, 19, 71, 0.18)",
      }
    : isActive
      ? {
          background: tileConfig?.activeGradient ?? "linear-gradient(135deg, #f3ecff 0%, #efe6ff 100%)",
          borderColor: tileConfig?.activeBorder,
          color: tileConfig?.textColor,
          boxShadow: "0 16px 28px -24px rgba(167, 92, 246, 0.24), 0 10px 18px -16px rgba(39, 19, 71, 0.14)",
        }
      : isTile
        ? { background: tileConfig.gradient, borderColor: tileConfig.border, boxShadow: "0 6px 24px -8px rgba(0,0,0,0.10), 0 2px 8px -4px rgba(0,0,0,0.06)" }
        : isTerminal && tileConfig
          ? { borderColor: tileConfig.activeBorder, borderWidth: "2px", background: tileConfig.gradient }
          : undefined;

  return (
    <button
      ref={refCb}
      type="button"
      onClick={isClickable ? onClick : undefined}
      className={`relative w-[270px] min-w-[270px] rounded-[1.45rem] border px-6 py-5 pr-20 text-left text-[1.08rem] font-semibold leading-[1.28] transition duration-200 ${
        isFocused
          ? "border-white/20 text-white"
          : isActive
            ? "border-[#dccdff] text-[#8b63d9]"
            : isTile
              ? "hover:brightness-[0.975]"
              : "border-[#eadff3] bg-white text-[#8b63d9] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16),0_10px_18px_-16px_rgba(39,19,71,0.12)]"
      } ${isClickable ? "cursor-pointer hover:-translate-y-0.5" + (isTile ? "" : " hover:border-[#d8c1ef] hover:shadow-[0_22px_34px_-24px_rgba(39,19,71,0.2),0_12px_22px_-16px_rgba(39,19,71,0.14)]") : "cursor-default"}`}
      style={cardStyle}
    >
      <span className="block" style={isTile ? { color: tileConfig.textColor } : undefined}>{label}</span>
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-18px_rgba(20,27,43,0.42)]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
            <path d="M7 5.5 12 10l-5 4.5" stroke={isFocused ? "white" : (tileConfig?.arrowColor ?? "#ff4f5e")} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

const COL_GAP = 40; // px between columns
const ROW_GAP = 12; // px between sibling rows

export function InteractiveTreeDiagram({ rootNodeId }: Props) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const childMap = useMemo(() => getChildMap(), []);

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([rootNodeId]));
  const [lastExpandedId, setLastExpandedId] = useState<string | null>(null);

  const [lines, setLines] = useState<LineData[]>([]);
  const [svgW, setSvgW] = useState(0);
  const [svgH, setSvgH] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const [enteringLineIds, setEnteringLineIds] = useState<Set<string>>(new Set());
  const previousLineIdsRef = useRef<Set<string>>(new Set());
  const enterTimerRef = useRef<number | null>(null);

  const nodeCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    function mark(nodeId: string, categoryId: string) {
      map.set(nodeId, categoryId);
      for (const childId of childMap.get(nodeId) ?? []) mark(childId, categoryId);
    }
    for (const opt of algorithmTree.nodes[algorithmTree.rootId]?.options ?? []) {
      mark(opt.nextNodeId, opt.nextNodeId);
    }
    return map;
  }, [childMap]);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const rootRowRefs = useRef<Record<string, HTMLElement | null>>({});

  // bridgeIds where the option label == terminal title — skip the toggle, show terminal directly.
  const noBridgeIds = useMemo(() => {
    const result = new Set<string>();
    function check(nodeId: string) {
      for (const childId of childMap.get(nodeId) ?? []) {
        const childNode = algorithmTree.nodes[childId];
        if (isTerminalNode(childNode)) {
          const parent = algorithmTree.nodes[nodeId];
          const option = parent?.options?.find((o) => o.nextNodeId === childId);
          const bridgeLabel = option ? translateOptionLabel(nodeId, option, language) : translateNodeTitle(childNode, language);
          if (bridgeLabel === translateNodeTitle(childNode, language)) {
            result.add(makeBridgeId(nodeId, childId));
          }
        } else {
          check(childId);
        }
      }
    }
    check(rootNodeId);
    return result;
  }, [childMap, language, rootNodeId]);

  // Compute edges for SVG lines by traversing the expanded tree recursively.
  // Root-level cards (direct children of rootNodeId) have no incoming edge.
  const edges = useMemo(() => {
    const result: Array<{ from: string; to: string }> = [];

    function traverse(nodeId: string) {
      if (!expanded.has(nodeId)) return;
      for (const childId of childMap.get(nodeId) ?? []) {
        const childNode = algorithmTree.nodes[childId];
        if (isTerminalNode(childNode)) {
          const bridgeId = makeBridgeId(nodeId, childId);
          result.push({ from: nodeId, to: bridgeId });
          if (expanded.has(bridgeId)) {
            result.push({ from: bridgeId, to: childId });
          }
        } else {
          result.push({ from: nodeId, to: childId });
          traverse(childId);
        }
      }
    }

    for (const childId of childMap.get(rootNodeId) ?? []) {
      const childNode = algorithmTree.nodes[childId];
      if (!isTerminalNode(childNode)) {
        traverse(childId);
      }
    }
    return result;
  }, [rootNodeId, expanded, childMap]);

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
          from: edge.from,
          to: edge.to,
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

  useEffect(() => {
    const currentIds = new Set(lines.map((l) => l.id));
    const prev = previousLineIdsRef.current;
    const newIds = [...currentIds].filter((id) => !prev.has(id));
    previousLineIdsRef.current = currentIds;
    if (newIds.length === 0) return;
    if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current);
    setEnteringLineIds(new Set(newIds));
    enterTimerRef.current = window.setTimeout(() => {
      setEnteringLineIds(new Set());
      enterTimerRef.current = null;
    }, 620);
  }, [lines]);

  useEffect(() => () => { if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current); }, []);

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
          setLastExpandedId((cur) => (cur === toggleId ? null : cur));
        } else {
          next.add(toggleId);
          setLastExpandedId(toggleId);
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
          const bridgeId = makeBridgeId(id, childId);
          if (!noBridgeIds.has(bridgeId)) all.add(bridgeId);
        } else {
          addAll(childId);
        }
      }
    }
    addAll(rootNodeId);
    setExpanded(all);
  }, [rootNodeId, childMap, noBridgeIds]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([rootNodeId]));
  }, [rootNodeId]);

  // svgH is the natural (pre-scale) layout height; visual height = svgH * scale.
  const minHeight = 260;
  const outerHeight = svgH > 0 ? Math.max(Math.ceil(svgH * scale) + 40, minHeight) : minHeight;

  function getLabel(nodeId: string, parentId: string | undefined): string {
    if (parentId) {
      const parent = algorithmTree.nodes[parentId];
      const option = parent?.options?.find((o) => o.nextNodeId === nodeId);
      if (option) return translateOptionLabel(parentId, option, language);
    }
    return translateNodeTitle(algorithmTree.nodes[nodeId], language);
  }

  // Recursive render: each node row = card + children column (centered).
  // alignItems: "center" on the row centers the card vertically relative to its subtree.
  function renderNode(nodeId: string, parentId: string | undefined, depth: number): JSX.Element {
    const children = childMap.get(nodeId) ?? [];
    const isExpanded = expanded.has(nodeId);
    const canExpand = children.length > 0;
    const isActive = canExpand && isExpanded;
    const categoryId = nodeCategoryMap.get(nodeId);
    const tileConfig = categoryId ? CATEGORY_TILE_CONFIG[categoryId] : undefined;
    const label = getLabel(nodeId, parentId);

    return (
      <div
        key={nodeId}
        ref={depth === 0 ? (el) => { rootRowRefs.current[nodeId] = el; } : undefined}
        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: COL_GAP }}
      >
        <TreeCard
          refCb={(el) => { nodeRefs.current[nodeId] = el; }}
          label={label}
          isActive={isActive}
          isFocused={isActive && lastExpandedId === nodeId}
          isClickable={canExpand}
          onClick={() => toggle(nodeId)}
          tileConfig={tileConfig}
          showTile={depth === 0}
        />
        {isExpanded && children.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: ROW_GAP }}>
            {children.map((childId) => {
              const childNode = algorithmTree.nodes[childId];
              const childCategoryId = nodeCategoryMap.get(childId) ?? categoryId;
              const childTileConfig = childCategoryId ? CATEGORY_TILE_CONFIG[childCategoryId] : tileConfig;

              if (isTerminalNode(childNode)) {
                const bridgeId = makeBridgeId(nodeId, childId);
                const terminalLabel = translateNodeTitle(childNode, language);
                const goToDiagnosis = () => navigate(`/diagnostico?nodeId=${childId}`, {
                  state: { trail: buildPathToNode(childId).map((n) => n.id) },
                });

                // When option label == terminal title, skip the redundant bridge toggle.
                // Register the terminal under bridgeId so the SVG edge still connects.
                if (noBridgeIds.has(bridgeId)) {
                  return (
                    <TreeCard
                      key={childId}
                      refCb={(el) => { nodeRefs.current[bridgeId] = el; nodeRefs.current[childId] = el; }}
                      label={terminalLabel}
                      isActive={false}
                      isFocused={false}
                      isClickable={true}
                      isTerminal={true}
                      tileConfig={childTileConfig}
                      onClick={goToDiagnosis}
                    />
                  );
                }

                const isBridgeOpen = expanded.has(bridgeId);
                const bridgeLabel = getLabel(childId, nodeId);
                return (
                  <div key={bridgeId} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: COL_GAP }}>
                    <TreeCard
                      refCb={(el) => { nodeRefs.current[bridgeId] = el; }}
                      label={bridgeLabel}
                      isActive={isBridgeOpen}
                      isFocused={isBridgeOpen && lastExpandedId === bridgeId}
                      isClickable={true}
                      onClick={() => toggle(bridgeId)}
                      tileConfig={childTileConfig}
                      showTile={false}
                    />
                    {isBridgeOpen && (
                      <TreeCard
                        refCb={(el) => { nodeRefs.current[childId] = el; }}
                        label={terminalLabel}
                        isActive={false}
                        isFocused={false}
                        isClickable={true}
                        isTerminal={true}
                        tileConfig={childTileConfig}
                        onClick={goToDiagnosis}
                      />
                    )}
                  </div>
                );
              }

              return renderNode(childId, nodeId, depth + 1);
            })}
          </div>
        )}
      </div>
    );
  }

  const rootChildren = childMap.get(rootNodeId) ?? [];

  return (
    <div className="space-y-3">
      <div className="no-print flex items-center gap-2">
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
        <button
          type="button"
          onClick={async () => {
            const el = contentRef.current;
            const outer = outerRef.current;
            if (!el || !outer) return;

            // Reset scroll so html2canvas captures from the top-left origin.
            outer.scrollTop = 0;
            outer.scrollLeft = 0;

            // Hide root-level rows whose branch is collapsed so the PDF only
            // contains the expanded pathological process(es).
            const rootChildren = childMap.get(rootNodeId) ?? [];
            const anyExpanded = rootChildren.some((id) => expanded.has(id));
            const hiddenRows: HTMLElement[] = [];
            if (anyExpanded) {
              for (const childId of rootChildren) {
                if (!expanded.has(childId)) {
                  const rowEl = rootRowRefs.current[childId];
                  if (rowEl) {
                    rowEl.style.display = "none";
                    hiddenRows.push(rowEl);
                  }
                }
              }
            }

            // Remove transform and clipping so html2canvas captures the full natural content.
            // SVG line coordinates are already in natural (pre-scale) space so they stay correct.
            const prevTransform = el.style.transform;
            const prevTransition = el.style.transition;
            el.style.transform = "none";
            el.style.transition = "none";

            outer.style.overflow = "visible";
            outer.style.height = "auto";
            outer.style.maxHeight = "none";
            outer.style.borderRadius = "0";
            outer.style.boxShadow = "none";
            outer.style.border = "none";

            // Two frames: first lets the DOM expand, second lets layout stabilise.
            await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

            const canvas = await html2canvas(el, {
              scale: 2,
              useCORS: true,
              backgroundColor: "#ffffff",
              logging: false,
            });

            // Restore styles.
            el.style.transform = prevTransform;
            el.style.transition = prevTransition;
            outer.style.overflow = "";
            outer.style.height = "";
            outer.style.maxHeight = "";
            outer.style.borderRadius = "";
            outer.style.boxShadow = "";
            outer.style.border = "";
            for (const rowEl of hiddenRows) {
              rowEl.style.display = "";
            }

            const imgW = canvas.width;
            const imgH = canvas.height;
            const pageW = Math.max(imgW, imgH);
            const pageH = Math.min(imgW, imgH);
            const pdf = new jsPDF({
              orientation: "landscape",
              unit: "px",
              format: [pageW, pageH],
            });
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgW, imgH);
            pdf.save("DermPath-Algoritmo.pdf");
          }}
          title={language === "en" ? "Save as PDF" : "Salvar como PDF"}
          className="no-print ml-auto rounded-full border border-sand bg-paper p-2 text-steel transition hover:bg-sand hover:text-ink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
        </button>
      </div>

      <div
        ref={outerRef}
        className="print-tree-outer rounded-[32px] border border-sand bg-white shadow-panel overflow-x-hidden overflow-y-auto"
        style={{ height: outerHeight }}
      >
        <div
          ref={contentRef}
          className="print-tree-content relative p-5"
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
              const categoryId = getCategoryForLine(line.from, line.to, nodeCategoryMap);
              const stroke = CATEGORY_LINE_COLORS[categoryId ?? ""] ?? DEFAULT_LINE_COLOR;
              const isEntering = enteringLineIds.has(line.id);
              return (
                <g key={line.id}>
                  <path
                    className={isEntering ? "focused-tree-map-connection focused-tree-map-connection--enter" : "focused-tree-map-connection"}
                    d={`M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${px} ${line.y2}`}
                    fill="none"
                    pathLength={1}
                    stroke={stroke}
                    strokeWidth="1.55"
                    strokeLinecap="round"
                  />
                  <circle cx={cx} cy={line.y2} r={cr} fill="white" stroke={stroke} strokeWidth="1.4" />
                </g>
              );
            })}
          </svg>

          {/* Recursive layout: each node row = card + children column.
              alignItems "center" on each row centers the card relative to its subtree. */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: ROW_GAP }}>
            {rootChildren.map((childId) => renderNode(childId, undefined, 0))}
          </div>
        </div>
      </div>
    </div>
  );
}
