import { useMemo, useState } from "react";
import { algorithmTree } from "../data/algorithm";
import { getChildMap } from "../utils/tree";

interface OverviewTreeProps {
  onOpenNode: (nodeId: string) => void;
}

export function OverviewTree({ onOpenNode }: OverviewTreeProps) {
  const childMap = useMemo(() => getChildMap(), []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    root: true,
    dermatite: true,
    deposito: true,
    amiloidoses: true,
  });

  function toggle(nodeId: string) {
    setExpanded((current) => ({ ...current, [nodeId]: !current[nodeId] }));
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Visão geral da árvore</p>
        <h2 className="font-serif text-2xl text-ink">Estrutura navegável</h2>
      </div>
      <TreeBranch nodeId={algorithmTree.rootId} childMap={childMap} expanded={expanded} onToggle={toggle} onOpenNode={onOpenNode} depth={0} />
    </section>
  );
}

interface BranchProps {
  nodeId: string;
  childMap: Map<string, string[]>;
  expanded: Record<string, boolean>;
  onToggle: (nodeId: string) => void;
  onOpenNode: (nodeId: string) => void;
  depth: number;
}

function TreeBranch({ nodeId, childMap, expanded, onToggle, onOpenNode, depth }: BranchProps) {
  const node = algorithmTree.nodes[nodeId];
  const children = childMap.get(nodeId) ?? [];
  const isExpanded = expanded[nodeId] ?? depth < 2;

  return (
    <div className={`${depth > 0 ? "ml-4 border-l border-slate-200 pl-4" : ""} space-y-3`}>
      <div className="flex flex-wrap items-center gap-3">
        {children.length ? (
          <button type="button" onClick={() => onToggle(nodeId)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-steel transition hover:bg-slate-200">
            {isExpanded ? "Recolher" : "Expandir"}
          </button>
        ) : null}
        <button type="button" onClick={() => onOpenNode(nodeId)} className="text-left font-semibold text-ink underline decoration-slate-300 underline-offset-4">
          {node.title}
        </button>
        <span className="text-xs uppercase tracking-[0.18em] text-steel">{node.type.replaceAll("_", " ")}</span>
      </div>

      {isExpanded ? (
        <div className="space-y-3">
          {children.map((childId) => (
            <TreeBranch key={childId} nodeId={childId} childMap={childMap} expanded={expanded} onToggle={onToggle} onOpenNode={onOpenNode} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
