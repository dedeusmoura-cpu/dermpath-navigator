import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  buildSelectedMapPath,
  getConcreteNodeIdFromMapPath,
  FocusedTreeMap,
} from "../components/FocusedTreeMap";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { algorithmTree } from "../data/algorithm";
import { translateNodeResultTitle } from "../i18n/translations";
import { searchNodes } from "../utils/search";
import { buildPathToNode } from "../utils/tree";
import dermPathLogo from "../assets/dermpath-logo-final.png";

interface FocusedTreeMapLocationState {
  trail?: string[];
}

function TreeMapTopBar({ treeViewUrl }: { treeViewUrl: string }) {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => (query.trim() ? searchNodes(query, language).slice(0, 6) : []), [query, language]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(nodeId: string) {
    setQuery("");
    setOpen(false);
    navigate(`/diagnostico?nodeId=${nodeId}`, {
      state: { trail: buildPathToNode(nodeId).map((n) => n.id) },
    });
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <NavLink to="/" className="shrink-0">
        <img src={dermPathLogo} alt="DermPath Navigator" className="h-[44px] w-auto sm:h-[52px]" />
      </NavLink>

      <div className="flex flex-1 items-center gap-2 justify-end">
        <div ref={wrapperRef} className="relative flex-1 max-w-xs sm:max-w-sm">
          <div className="flex items-center gap-2 rounded-full border border-sand bg-white/95 px-4 py-2 shadow-sm focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_rgba(169,122,31,0.08)]">
            <svg className="h-4 w-4 shrink-0 text-steel/70" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder={t("nav_search")}
              className="w-full bg-transparent text-sm text-ink placeholder:text-steel/60 outline-none"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(""); setOpen(false); }} className="shrink-0 text-steel/50 hover:text-steel">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
          {open && results.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-sand bg-white shadow-[0_16px_40px_-20px_rgba(20,27,43,0.3)]">
              {results.map(({ node }) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseDown={() => handleSelect(node.id)}
                  className="w-full px-4 py-3 text-left text-sm text-ink hover:bg-paper transition border-b border-sand/50 last:border-0"
                >
                  {translateNodeResultTitle(node, language)}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          to={treeViewUrl}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-sand bg-white/95 px-3 py-2 text-xs font-semibold text-steel shadow-sm transition hover:bg-sand hover:text-ink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          {language === "en" ? "Full tree" : "Árvore expandível"}
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="shrink-0 rounded-full border border-sand bg-white/95 px-3 py-2 text-sm font-semibold text-steel shadow-sm transition hover:bg-white hover:text-accent"
        >
          {t("back")}
        </button>

        <div className="inline-flex shrink-0 rounded-full border border-sand bg-white/95 p-[3px] shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage("pt")}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${language === "pt" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"}`}
          >
            PT
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${language === "en" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"}`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

export function FocusedTreeMapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const locationState = (location.state as FocusedTreeMapLocationState | null) ?? null;

  const focusNodeId = useMemo(() => {
    const requestedId = searchParams.get("nodeId");
    return requestedId && algorithmTree.nodes[requestedId] ? requestedId : algorithmTree.rootId;
  }, [searchParams]);
  const requestedMapTrail = searchParams.get("trail");
  const mapStateKey = useMemo(
    () => buildFocusedMapStateKey(location.pathname, focusNodeId, requestedMapTrail),
    [focusNodeId, location.pathname, requestedMapTrail],
  );
  const [isReturningFromFinalResult, setIsReturningFromFinalResult] = useState<boolean>(() => hasFinalResultReturnContext(mapStateKey));
  const [selectedPath, setSelectedPath] = useState<string[]>(() =>
    buildSelectedPath(focusNodeId, isReturningFromFinalResult, requestedMapTrail, locationState?.trail),
  );
  const [openedFinalNodeIds, setOpenedFinalNodeIds] = useState<string[]>(() =>
    buildInitialOpenedFinalNodes(focusNodeId, isReturningFromFinalResult),
  );

  useEffect(() => {
    const isReturning = hasFinalResultReturnContext(mapStateKey);
    setIsReturningFromFinalResult(isReturning);

    if (isReturning) {
      clearFinalResultReturnContext(mapStateKey);
    }
  }, [mapStateKey]);

  useEffect(() => {
    setSelectedPath(buildSelectedPath(focusNodeId, isReturningFromFinalResult, requestedMapTrail, locationState?.trail));
  }, [focusNodeId, isReturningFromFinalResult, requestedMapTrail, locationState?.trail]);

  // Use the section root (first child of the algorithm root) so the full section tree is shown
  const sectionRootId = useMemo(() => {
    const path = buildPathToNode(focusNodeId);
    // path[0] = algorithm root, path[1] = section root (e.g. "paniculites")
    if (path.length > 1) return path[1].id;
    return focusNodeId;
  }, [focusNodeId]);
  const treeViewUrl = `/arvore-interativa?nodeId=${sectionRootId}`;

  return (
    <Layout title={t("overview_title")} subtitle={t("tree_map_focus_subtitle")}>
      <TreeMapTopBar treeViewUrl={treeViewUrl} />
      <FocusedTreeMap
        selectedPath={selectedPath}
        openedFinalNodeIds={openedFinalNodeIds}
        onSelectNode={(item, level) => {
          if (item.kind === "result") {
            persistFinalResultReturnContext(mapStateKey);
            navigate(`/diagnostico?nodeId=${item.nodeId}`, {
              state: { trail: buildPathToNode(item.nodeId).map((node) => node.id) },
            });
            return;
          }

          if (item.kind === "terminal-bridge" && parentHasOnlyTerminalChildren(item.nodeId)) {
            persistFinalResultReturnContext(mapStateKey);
            navigate(`/diagnostico?nodeId=${item.nodeId}`, {
              state: { trail: buildPathToNode(item.nodeId).map((node) => node.id) },
            });
            return;
          }

          setIsReturningFromFinalResult(false);

          setSelectedPath((prev) => {
            const isAlreadyActive = prev[level] === item.mapId;
            const terminalResultMapId =
              item.kind === "terminal-bridge"
                ? buildSelectedMapPath(item.nodeId)[buildSelectedMapPath(item.nodeId).length - 1]
                : null;
            const nextPath = isAlreadyActive
              ? prev.slice(0, level)
              : item.kind === "terminal-bridge"
                ? [...prev.slice(0, level), item.mapId, terminalResultMapId!]
                : [...prev.slice(0, level), item.mapId];

            const nextNodeId = getConcreteNodeIdFromMapPath(nextPath);
            const nextTrail = serializeMapTrail(nextPath);

            if (nextNodeId === algorithmTree.rootId && !nextTrail) {
              setSearchParams({}, { replace: true });
            } else {
              const params = new URLSearchParams();
              if (nextNodeId !== algorithmTree.rootId) {
                params.set("nodeId", nextNodeId);
              }
              if (nextTrail) {
                params.set("trail", nextTrail);
              }
              setSearchParams(params, { replace: true });
            }

            return nextPath;
          });

          if (item.kind === "terminal-bridge") {
            setOpenedFinalNodeIds((prev) => (prev.includes(item.nodeId) ? prev : [...prev, item.nodeId]));
            return;
          }

          setOpenedFinalNodeIds([]);
        }}
      />
    </Layout>
  );
}

function buildSelectedPath(
  focusNodeId: string,
  isReturningFromFinalResult: boolean,
  requestedMapTrail: string | null = null,
  requestedTrail?: string[],
) {
  const parsedMapTrail = parseMapTrail(requestedMapTrail);
  if (isValidFocusedTrail(parsedMapTrail, focusNodeId)) {
    const canonicalPath = buildSelectedMapPath(focusNodeId);
    const resolvedPath = parsedMapTrail.length === canonicalPath.length ? parsedMapTrail : canonicalPath;
    return normalizeFocusedSelectionPath(resolvedPath, focusNodeId, isReturningFromFinalResult);
  }

  if (isValidConcreteTrail(requestedTrail, focusNodeId)) {
    return normalizeFocusedSelectionPath(buildSelectedMapPath(focusNodeId), focusNodeId, isReturningFromFinalResult);
  }

  if (focusNodeId === algorithmTree.rootId) {
    return [];
  }

  return normalizeFocusedSelectionPath(buildSelectedMapPath(focusNodeId), focusNodeId, isReturningFromFinalResult);
}

function buildInitialOpenedFinalNodes(focusNodeId: string, isReturningFromFinalResult: boolean) {
  const focusedNode = algorithmTree.nodes[focusNodeId];

  if (!isFinalTreeNode(focusedNode) || !focusedNode?.parentId) {
    return [];
  }

  return isReturningFromFinalResult ? getTerminalSiblingNodeIds(focusedNode.parentId) : [focusNodeId];
}

function isFinalTreeNode(node: (typeof algorithmTree.nodes)[string] | undefined) {
  return ["diagnosis", "morphologic_terminal", "placeholder", "info"].includes(node?.type ?? "");
}

function parentHasOnlyTerminalChildren(nodeId: string): boolean {
  const parentId = algorithmTree.nodes[nodeId]?.parentId;
  if (!parentId) return false;
  const options = algorithmTree.nodes[parentId]?.options;
  if (!options?.length) return false;
  return options.every((opt) => isFinalTreeNode(algorithmTree.nodes[opt.nextNodeId]));
}

function isValidFocusedTrail(trail: string[] | undefined, expectedLastNodeId: string) {
  if (!trail) {
    return false;
  }

  if (trail.length === 0) {
    return expectedLastNodeId === algorithmTree.rootId;
  }

  if (getConcreteNodeIdFromMapPath(trail) !== expectedLastNodeId) {
    return false;
  }

  const canonicalPath = buildSelectedMapPath(expectedLastNodeId);
  if (!canonicalPath.length) {
    return trail.length === 0;
  }

  if (trail.length > canonicalPath.length) {
    return false;
  }

  for (let index = 0; index < trail.length; index += 1) {
    if (trail[index] !== canonicalPath[index]) {
      return false;
    }
  }

  return true;
}

function isValidConcreteTrail(trail: string[] | undefined, expectedLastNodeId: string) {
  if (!trail?.length) {
    return false;
  }

  if (trail[trail.length - 1] !== expectedLastNodeId) {
    return false;
  }

  const canonicalPath = buildPathToNode(expectedLastNodeId).map((node) => node.id);
  if (trail.length !== canonicalPath.length) {
    return false;
  }

  return trail.every((nodeId, index) => nodeId === canonicalPath[index]);
}

function parseMapTrail(serializedTrail: string | null) {
  if (!serializedTrail) {
    return [];
  }

  const items = serializedTrail.split(",").map((item) => item.trim()).filter(Boolean);
  return items;
}

function serializeMapTrail(path: string[]) {
  return path.join(",");
}

function normalizeFocusedSelectionPath(path: string[], focusNodeId: string, isReturningFromFinalResult: boolean) {
  const focusedNode = algorithmTree.nodes[focusNodeId];
  if (!isReturningFromFinalResult || !isFinalTreeNode(focusedNode) || !path.length) {
    return path;
  }

  const lastPathItem = path[path.length - 1];
  return lastPathItem === `node:${focusNodeId}` ? path.slice(0, -1) : path;
}

function getTerminalSiblingNodeIds(parentId: string) {
  return (algorithmTree.nodes[parentId]?.options ?? [])
    .map((option) => option.nextNodeId)
    .filter((nodeId) => isFinalTreeNode(algorithmTree.nodes[nodeId]));
}

const finalResultReturnContextStorageKey = "dermpath-focused-map-return-context";

function buildFocusedMapStateKey(pathname: string, focusNodeId: string, requestedMapTrail: string | null) {
  return `${pathname}?nodeId=${focusNodeId}&trail=${requestedMapTrail ?? ""}`;
}

function hasFinalResultReturnContext(mapStateKey: string) {
  try {
    const raw = window.sessionStorage.getItem(finalResultReturnContextStorageKey);
    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(raw) as Record<string, true>;
    return Boolean(parsed[mapStateKey]);
  } catch {
    return false;
  }
}

function persistFinalResultReturnContext(mapStateKey: string) {
  try {
    const raw = window.sessionStorage.getItem(finalResultReturnContextStorageKey);
    const parsed = raw ? (JSON.parse(raw) as Record<string, true>) : {};
    parsed[mapStateKey] = true;
    window.sessionStorage.setItem(finalResultReturnContextStorageKey, JSON.stringify(parsed));
  } catch {
    // Ignore sessionStorage issues and keep navigation functional.
  }
}

function clearFinalResultReturnContext(mapStateKey: string) {
  try {
    const raw = window.sessionStorage.getItem(finalResultReturnContextStorageKey);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as Record<string, true>;
    if (!parsed[mapStateKey]) {
      return;
    }

    delete parsed[mapStateKey];
    window.sessionStorage.setItem(finalResultReturnContextStorageKey, JSON.stringify(parsed));
  } catch {
    // Ignore sessionStorage issues and keep navigation functional.
  }
}
