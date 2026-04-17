import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getTranslatedTerminalLabel, translateNodeTitle } from "../i18n/translations";
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
    <section className="space-y-4">
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
  const { language, t } = useLanguage();
  const node = algorithmTree.nodes[nodeId];
  const children = childMap.get(nodeId) ?? [];
  const isExpanded = expanded[nodeId] ?? depth < 2;
  const nodeTypeLabel = getTranslatedTerminalLabel(node.type, language);

  return (
    <div className={`${depth > 0 ? "ml-4 border-l border-sand pl-4" : ""} space-y-3`}>
      <div className="flex flex-wrap items-center gap-3">
        {children.length ? (
          <button
            type="button"
            onClick={() => onToggle(nodeId)}
            className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-steel transition hover:bg-sand"
          >
            {isExpanded ? t("tree_collapse") : t("tree_expand")}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onOpenNode(nodeId)}
          className="text-left font-semibold text-ink underline decoration-sand underline-offset-4 transition hover:text-accent"
        >
          {translateNodeTitle(node, language)}
        </button>
        <span className="text-xs uppercase tracking-[0.22em] text-steel">{nodeTypeLabel}</span>
      </div>

      {isExpanded ? (
        <div className="space-y-3">
          {children.map((childId) => (
            <TreeBranch
              key={childId}
              nodeId={childId}
              childMap={childMap}
              expanded={expanded}
              onToggle={onToggle}
              onOpenNode={onOpenNode}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
