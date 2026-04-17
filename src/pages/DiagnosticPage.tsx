import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FavoritesDrawer } from "../components/FavoritesDrawer";
import { Layout } from "../components/Layout";
import { ResultCard } from "../components/ResultCard";
import { SearchPanel } from "../components/SearchPanel";
import { TreeNavigator } from "../components/TreeNavigator";
import { useLanguage } from "../context/LanguageContext";
import { algorithmTree } from "../data/algorithm";
import { useFavorites } from "../hooks/useFavorites";
import { translateNodeTitle } from "../i18n/translations";
import { buildExportText, buildPathToNode } from "../utils/tree";
import treeMapIcon from "../assets/Mapa-da-Arvore.png";

interface DiagnosticLocationState {
  nodeId?: string;
  trail?: string[];
}

const trailStorageKey = "dermpath-diagnostic-trails";

export function DiagnosticPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useLanguage();
  const locationState = (location.state as DiagnosticLocationState | null) ?? null;
  const requestedNodeId = searchParams.get("nodeId") ?? locationState?.nodeId ?? algorithmTree.rootId;
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const currentNode = algorithmTree.nodes[requestedNodeId] ?? algorithmTree.nodes[algorithmTree.rootId];
  const path = useMemo(() => {
    const canonicalPath = buildPathToNode(currentNode.id);
    const requestedTrail = locationState?.trail;
    const persistedTrail = readPersistedTrail(currentNode.id);

    if (isValidTrail(requestedTrail, currentNode.id)) {
      return (requestedTrail ?? []).map((nodeId) => algorithmTree.nodes[nodeId]).filter(Boolean);
    }

    if (isValidTrail(persistedTrail, currentNode.id)) {
      return (persistedTrail ?? []).map((nodeId) => algorithmTree.nodes[nodeId]).filter(Boolean);
    }

    return canonicalPath;
  }, [currentNode.id, locationState?.trail]);
  const breadcrumb = path.map((item) => translateNodeTitle(item, language)).join(" > ");
  const isTerminal = ["diagnosis", "morphologic_terminal", "placeholder", "info"].includes(currentNode.type);
  const isProcessHub = currentNode.id === "root";
  const isDermatiteHub = currentNode.id === "dermatite";
  const isPerivascularHub = currentNode.id === "perivascular";
  const hideSidebar = isProcessHub || isDermatiteHub || isPerivascularHub;
  const treeMapLabel = language === "pt" ? "Mapa da Árvore" : "Tree map";

  useEffect(() => {
    const stateNodeId = locationState?.nodeId;
    if (!stateNodeId || searchParams.get("nodeId")) return;

    if (algorithmTree.nodes[stateNodeId]) {
      setSearchParams({ nodeId: stateNodeId }, { replace: true });
    }
  }, [locationState?.nodeId, searchParams, setSearchParams]);

  useEffect(() => {
    persistTrail(currentNode.id, path.map((item) => item.id));
  }, [currentNode.id, path]);

  function navigateTo(nextNodeId: string) {
    const nextNode = algorithmTree.nodes[nextNodeId];
    if (!nextNode) return;
    const nextTrail = buildNextTrail(path.map((item) => item.id), currentNode.id, nextNodeId);
    navigate(`/diagnostico?nodeId=${nextNodeId}`, { state: { nodeId: nextNodeId, trail: nextTrail } });
  }

  function goBack() {
    const currentTrail = path.map((item) => item.id);
    const previousNodeId = currentTrail.length > 1 ? currentTrail[currentTrail.length - 2] : currentNode.parentId ?? algorithmTree.rootId;
    const previousTrail = currentTrail.length > 1 ? currentTrail.slice(0, -1) : undefined;
    navigate(`/diagnostico?nodeId=${previousNodeId}`, previousTrail ? { state: { nodeId: previousNodeId, trail: previousTrail } } : undefined);
  }

  function reset() {
    navigate("/diagnostico?nodeId=root");
  }

  async function copyPath() {
    await navigator.clipboard.writeText(buildExportText(path, currentNode, language));
  }

  function exportText() {
    const text = buildExportText(path, currentNode, language);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `dermpath-navigator-${currentNode.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Layout title={t("diagnostic_title")} subtitle={t("diagnostic_subtitle")}>
      <div className={hideSidebar ? "grid gap-6" : "grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"}>
        <div className="space-y-6">
          <Breadcrumbs
            path={path}
            onSelect={(nodeId) => {
              const currentTrail = path.map((item) => item.id);
              const index = currentTrail.indexOf(nodeId);
              const selectedTrail = index >= 0 ? currentTrail.slice(0, index + 1) : buildPathToNode(nodeId).map((item) => item.id);
              navigate(`/diagnostico?nodeId=${nodeId}`, { state: { nodeId, trail: selectedTrail } });
            }}
            actions={
              <button
                type="button"
                onClick={() => navigate(`/mapa-da-arvore?nodeId=${currentNode.id}`, { state: { trail: path.map((item) => item.id) } })}
                aria-label={t("nav_tree_map")}
                className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-full border border-sand bg-ink pl-3 pr-6 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              >
                <img
                  src={treeMapIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-[32px] w-[32px] flex-none object-contain mix-blend-screen brightness-125 contrast-125"
                />
                <span className="text-[0.83rem] font-semibold tracking-[0.01em] leading-none">{treeMapLabel}</span>
              </button>
            }
          />

          {isTerminal ? (
            <ResultCard
              node={currentNode}
              breadcrumb={breadcrumb}
              favorite={isFavorite(currentNode.id)}
              onToggleFavorite={toggleFavorite}
              onBack={goBack}
              onRestart={reset}
              onCopy={copyPath}
              onExport={exportText}
              trail={path.map((item) => item.id)}
            />
          ) : (
            <TreeNavigator
              node={currentNode}
              onNavigate={navigateTo}
              favorite={isFavorite(currentNode.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {isProcessHub ? <FavoritesDrawer favorites={favorites} onOpenNode={navigateTo} /> : null}

          <SearchPanel onOpenNode={navigateTo} />
        </div>

        {!hideSidebar ? <FavoritesDrawer favorites={favorites} onOpenNode={navigateTo} /> : null}
      </div>
    </Layout>
  );
}

function buildNextTrail(currentTrail: string[], currentNodeId: string, nextNodeId: string) {
  if (!currentTrail.length) {
    return [nextNodeId];
  }

  if (currentTrail[currentTrail.length - 1] === currentNodeId) {
    return [...currentTrail, nextNodeId];
  }

  return [...buildPathToNode(currentNodeId).map((item) => item.id), nextNodeId];
}

function isValidTrail(trail: string[] | undefined, expectedLastNodeId: string) {
  if (!trail?.length) return false;
  if (trail[trail.length - 1] !== expectedLastNodeId) return false;

  const rootOptions = new Set((algorithmTree.nodes[algorithmTree.rootId].options ?? []).map((option) => option.nextNodeId));
  if (!rootOptions.has(trail[0])) return false;

  for (let index = 0; index < trail.length - 1; index += 1) {
    const current = algorithmTree.nodes[trail[index]];
    const next = trail[index + 1];
    if (!current || !(current.options ?? []).some((option) => option.nextNodeId === next)) {
      return false;
    }
  }

  return true;
}

function readPersistedTrail(nodeId: string) {
  try {
    const raw = window.sessionStorage.getItem(trailStorageKey);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Record<string, string[]>;
    return parsed[nodeId];
  } catch {
    return undefined;
  }
}

function persistTrail(nodeId: string, trail: string[]) {
  try {
    const raw = window.sessionStorage.getItem(trailStorageKey);
    const parsed = raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
    parsed[nodeId] = trail;
    window.sessionStorage.setItem(trailStorageKey, JSON.stringify(parsed));
  } catch {
    // Ignore sessionStorage issues and keep navigation functional.
  }
}

