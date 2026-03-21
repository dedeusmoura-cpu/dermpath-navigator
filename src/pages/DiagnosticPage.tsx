import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ContextPanel } from "../components/ContextPanel";
import { FavoritesDrawer } from "../components/FavoritesDrawer";
import { Layout } from "../components/Layout";
import { OverviewTree } from "../components/OverviewTree";
import { ResultCard } from "../components/ResultCard";
import { SearchPanel } from "../components/SearchPanel";
import { TreeNavigator } from "../components/TreeNavigator";
import { algorithmTree } from "../data/algorithm";
import { useFavorites } from "../hooks/useFavorites";
import { buildExportText, buildPathToNode } from "../utils/tree";

export function DiagnosticPage() {
  const location = useLocation();
  const initialNodeId = (location.state as { nodeId?: string } | null)?.nodeId ?? algorithmTree.rootId;
  const initialPath = buildPathToNode(initialNodeId);
  const [pathIds, setPathIds] = useState<string[]>(
    initialPath.length ? initialPath.map((node) => node.id) : [algorithmTree.rootId],
  );
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const currentNode = algorithmTree.nodes[pathIds[pathIds.length - 1]];
  const path = useMemo(() => pathIds.map((id) => algorithmTree.nodes[id]), [pathIds]);
  const breadcrumb = path.map((item) => item.title).join(" > ");
  const isTerminal = ["diagnosis", "morphologic_terminal", "placeholder", "info"].includes(currentNode.type);
  const isProcessHub = currentNode.id === "root";
  const isDermatiteHub = currentNode.id === "dermatite";
  const isPerivascularHub = currentNode.id === "perivascular";
  const hideSidebar = isProcessHub || isDermatiteHub || isPerivascularHub;

  useEffect(() => {
    const nextPath = buildPathToNode(initialNodeId);
    if (nextPath.length) {
      setPathIds(nextPath.map((node) => node.id));
    }
  }, [initialNodeId]);

  function navigateTo(nextNodeId: string) {
    const nextNode = algorithmTree.nodes[nextNodeId];
    if (!nextNode) return;

    if (nextNode.parentId === currentNode.id) {
      setPathIds((current) => [...current, nextNodeId]);
      return;
    }

    setPathIds(buildPathToNode(nextNodeId).map((node) => node.id));
  }

  function goBack() {
    setPathIds((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }

  function reset() {
    setPathIds([algorithmTree.rootId]);
  }

  async function copyPath() {
    await navigator.clipboard.writeText(buildExportText(path, currentNode));
  }

  function exportText() {
    const text = buildExportText(path, currentNode);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `dr-ai-ackerman-${currentNode.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Layout
      title="Árvore diagnóstica"
      subtitle="Navegue pela lógica morfológica até um diagnóstico específico, grupo diagnóstico ou terminal morfológico."
      actions={
        <>
          <button type="button" onClick={reset} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent">
            Reiniciar
          </button>
          <Link to="/buscar" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50">
            Buscar
          </Link>
        </>
      }
    >
      <div className={hideSidebar ? "grid gap-6" : "grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"}>
        <div className="space-y-6">
          <Breadcrumbs path={path} onSelect={(nodeId) => setPathIds(buildPathToNode(nodeId).map((node) => node.id))} />

          {isTerminal ? (
            <ResultCard node={currentNode} breadcrumb={breadcrumb} onBack={goBack} onRestart={reset} onCopy={copyPath} onExport={exportText} />
          ) : (
            <TreeNavigator node={currentNode} onNavigate={navigateTo} />
          )}

          {isProcessHub ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <ContextPanel node={currentNode} favorite={isFavorite(currentNode.id)} onToggleFavorite={toggleFavorite} />
              <FavoritesDrawer favorites={favorites} onOpenNode={navigateTo} />
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-2">
            <SearchPanel onOpenNode={navigateTo} />
            <OverviewTree onOpenNode={navigateTo} />
          </div>
        </div>

        {!hideSidebar ? (
          <div className="space-y-6">
            <ContextPanel node={currentNode} favorite={isFavorite(currentNode.id)} onToggleFavorite={toggleFavorite} />
            <FavoritesDrawer favorites={favorites} onOpenNode={navigateTo} />
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
