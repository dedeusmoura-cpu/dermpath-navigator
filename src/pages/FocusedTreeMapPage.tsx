import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  buildSelectedMapPath,
  getConcreteNodeIdFromMapPath,
  FocusedTreeMap,
} from "../components/FocusedTreeMap";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { algorithmTree } from "../data/algorithm";
import { buildPathToNode } from "../utils/tree";

interface FocusedTreeMapLocationState {
  trail?: string[];
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

  return (
    <Layout title={t("overview_title")} subtitle={t("tree_map_focus_subtitle")}>
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
