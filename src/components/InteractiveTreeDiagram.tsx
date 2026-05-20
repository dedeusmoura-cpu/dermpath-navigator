import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
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

  for (const childId of childMap.get(rootId) ?? []) {
    visit(childId, undefined, undefined, 0);
  }
  return levels;
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
  variant?: "branch" | "terminal";
}

function TreeCard({ refCb, label, isActive, isFocused, isClickable, onClick, tileConfig, showTile = false, variant = "branch" }: CardProps) {
  const isTerminal = variant === "terminal";
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
        : undefined;

  return (
    <button
      ref={refCb}
      type="button"
      onClick={isClickable ? onClick : undefined}
      className={`relative rounded-[1.3rem] border text-left font-semibold leading-[1.28] transition duration-200 ${isTerminal ? "w-[420px] min-w-[420px] px-7 py-5 pr-5 text-[1.22rem]" : "w-[420px] min-w-[420px] px-7 py-5 pr-20 text-[1.22rem]"} ${
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
          className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-18px_rgba(20,27,43,0.42)]"
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

const COL_GAP = 56; // px between columns
const CARD_W = 420; // px — must match w-[420px] on TreeCard (branch cards)
const TERMINAL_CARD_W = 420; // px — must match w-[420px] on TreeCard (terminal/diagnosis cards)
const CARD_GAP = 10; // px between cards in a column

// ─── Layout computation ────────────────────────────────────────────────────────
// Positions each card so that every expanded parent is vertically centered
// relative to its group of children (multi-level, handles multiple open branches).

function computeLayout(
  levels: LevelEntry[][],
  nodeRefs: Record<string, HTMLElement | null>,
  currentScale: number,
): { positions: Map<string, number>; colHeights: number[] } {
  const APPROX_H = 74;

  // Measure actual card heights in natural (pre-scale) pixels
  const measured = new Map<string, number>();
  for (const [id, el] of Object.entries(nodeRefs)) {
    if (el) measured.set(id, el.getBoundingClientRect().height / currentScale);
  }
  const cardH = (id: string) => measured.get(id) ?? APPROX_H;

  // Returns visible (non-terminal) children of `parentId` in the next column
  function getChildren(col: number, parentId: string): LevelEntry[] {
    if (col + 1 >= levels.length) return [];
    return levels[col + 1].filter((e) => !e.isTerminal && e.parentId === parentId);
  }

  // Bottom-up: how much vertical space does each entry's subtree need?
  const subtreeH = new Map<string, number>();
  for (let col = levels.length - 1; col >= 0; col--) {
    for (const entry of levels[col].filter((e) => !e.isTerminal)) {
      const ch = cardH(entry.id);
      const kids = getChildren(col, entry.id);
      if (kids.length > 0) {
        const groupH = kids.reduce(
          (sum, k, i) => sum + (subtreeH.get(k.id) ?? APPROX_H) + (i > 0 ? CARD_GAP : 0),
          0,
        );
        subtreeH.set(entry.id, Math.max(ch, groupH));
      } else {
        subtreeH.set(entry.id, ch);
      }
    }
  }

  // Top-down: assign absolute `top` positions within each column
  const positions = new Map<string, number>();
  const colHeights: number[] = new Array(levels.length).fill(0);

  function assign(col: number, entries: LevelEntry[], groupStartY: number) {
    let y = groupStartY;
    for (const entry of entries) {
      const sh = subtreeH.get(entry.id) ?? APPROX_H;
      const ch = cardH(entry.id);
      // Center the card vertically within its slot
      positions.set(entry.id, y + (sh - ch) / 2);

      const kids = getChildren(col, entry.id);
      if (kids.length > 0) {
        const groupH = kids.reduce(
          (sum, k, i) => sum + (subtreeH.get(k.id) ?? APPROX_H) + (i > 0 ? CARD_GAP : 0),
          0,
        );
        assign(col + 1, kids, y + sh / 2 - groupH / 2);
      }
      y += sh + CARD_GAP;
    }
    colHeights[col] = Math.max(colHeights[col], y - CARD_GAP);
  }

  assign(0, levels[0]?.filter((e) => !e.isTerminal) ?? [], 0);
  return { positions, colHeights };
}

export function InteractiveTreeDiagram({ rootNodeId }: Props) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const childMap = useMemo(() => getChildMap(), []);

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([rootNodeId]));
  const [lastExpandedId, setLastExpandedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [lines, setLines] = useState<LineData[]>([]);
  const [svgW, setSvgW] = useState(0);
  const [svgH, setSvgH] = useState(0);
  const [scale, setScale] = useState(1);
  const [cardPositions, setCardPositions] = useState<Map<string, number>>(new Map());
  const [colHeights, setColHeights] = useState<number[]>([]);
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

      // Layout pass first so we can derive the relevant height for scale.
      const layout = computeLayout(levels, nodeRefs.current, scaleRef.current);

      // Height-scale target = tallest expanded column (col 1+).
      // Column 0 always has ALL root nodes stacked, so using it would force
      // a much smaller zoom than needed. Columns 1+ contain only the active branch.
      const expandedColHeights = layout.colHeights.slice(1);
      const relevantH = expandedColHeights.length > 0
        ? Math.max(...expandedColHeights)
        : (layout.colHeights[0] ?? naturalH);

      const availW = out.clientWidth - 32;
      const availH = out.clientHeight - 40;

      // Scale only to fit the active-branch height — width scrolls freely.
      // Cap at 1.0 (never zoom in) and floor at 0.45 (still readable).
      const newScale = Math.max(
        Math.min(
          relevantH > 0 ? availH / relevantH : 1.0,
          1.0,
        ),
        0.45,
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

      setCardPositions(layout.positions);
      setColHeights(layout.colHeights);
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

  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsFullscreen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);


  function getDisplayLabel(entry: LevelEntry): string {
    if (!entry.isTerminal && entry.parentConcreteId) {
      const parent = algorithmTree.nodes[entry.parentConcreteId];
      const option = parent?.options?.find((o) => o.nextNodeId === entry.concreteId);
      if (option) return translateOptionLabel(entry.parentConcreteId, option, language);
    }
    return translateNodeTitle(algorithmTree.nodes[entry.concreteId], language);
  }

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 flex flex-col bg-[#f5f0eb] p-4" : "space-y-3"}>
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
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          title={isFullscreen ? (language === "en" ? "Exit fullscreen" : "Sair da tela cheia") : (language === "en" ? "Fullscreen" : "Tela cheia")}
          className="ml-auto rounded-full border border-sand bg-paper p-1.5 text-steel transition hover:bg-sand"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            </svg>
          )}
        </button>
      </div>

      <div
        ref={outerRef}
        className="rounded-[32px] border border-sand bg-white shadow-panel overflow-auto"
        style={isFullscreen ? { flex: 1, minHeight: 0 } : { height: "clamp(260px, calc(100vh - 220px), 900px)" }}
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

          {/* Column layout: one column per depth level.
              Each card is positioned absolutely within its column so that expanded
              parents are vertically centered relative to their child group. */}
          <div style={{ position: "relative", zIndex: 1, display: "inline-flex", gap: `${COL_GAP}px`, alignItems: "flex-start" }}>
            {levels.map((level, colIndex) => {
              // Skip pure-terminal levels — they're rendered inline with their bridges
              const visibleEntries = level.filter((e) => !e.isTerminal);
              if (visibleEntries.length === 0) return null;

              const colH = colHeights[colIndex];
              const positioned = colH !== undefined && colH > 0 && cardPositions.size > 0;

              return (
                <div
                  key={colIndex}
                  style={
                    positioned
                      ? { position: "relative", width: `${CARD_W}px`, height: `${colH}px`, flexShrink: 0 }
                      : { display: "flex", flexDirection: "column", gap: `${CARD_GAP}px` }
                  }
                >
                  {visibleEntries.map((entry) => {
                    const categoryId = nodeCategoryMap.get(resolveConcrete(entry.id));
                    const tileConfig = categoryId ? CATEGORY_TILE_CONFIG[categoryId] : undefined;
                    const topPos = cardPositions.get(entry.id) ?? 0;

                    if (entry.isBridge) {
                      const termEntry = terminalByBridgeId.get(entry.id);
                      const isOpen = expanded.has(entry.id);
                      return (
                        // Bridge card + its diagnosis card in a horizontal pair
                        <div
                          key={entry.id}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: `${COL_GAP}px`,
                            ...(positioned ? { position: "absolute", top: topPos, left: 0 } : {}),
                          }}
                        >
                          <TreeCard
                            refCb={(el) => { nodeRefs.current[entry.id] = el; }}
                            label={getDisplayLabel(entry)}
                            isActive={isOpen}
                            isFocused={isOpen && lastExpandedId === entry.id}
                            isClickable={true}
                            onClick={() => toggle(entry.id)}
                            tileConfig={tileConfig}
                            showTile={colIndex === 0}
                          />
                          {termEntry && isOpen && (
                            <TreeCard
                              refCb={(el) => { nodeRefs.current[termEntry.id] = el; }}
                              label={getDisplayLabel(termEntry)}
                              isActive={false}
                              isFocused={false}
                              isClickable={true}
                              variant="terminal"
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
                      <div
                        key={entry.id}
                        style={positioned ? { position: "absolute", top: topPos, left: 0 } : {}}
                      >
                        <TreeCard
                          refCb={(el) => { nodeRefs.current[entry.id] = el; }}
                          label={getDisplayLabel(entry)}
                          isActive={isActive}
                          isFocused={isActive && lastExpandedId === entry.id}
                          isClickable={canExpand}
                          onClick={() => toggle(entry.id)}
                          tileConfig={tileConfig}
                          showTile={colIndex === 0}
                        />
                      </div>
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
