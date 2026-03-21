import type { AlgorithmNode } from "../types/algorithm";

interface BreadcrumbsProps {
  path: AlgorithmNode[];
  onSelect: (nodeId: string) => void;
}

export function Breadcrumbs({ path, onSelect }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-steel">
        {path.map((node, index) => {
          const isLast = index === path.length - 1;
          return (
            <li key={node.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(node.id)}
                className={`rounded-full px-3 py-1 transition ${isLast ? "bg-ink text-white" : "bg-slate-100 hover:bg-slate-200"}`}
              >
                {node.title}
              </button>
              {!isLast ? <span>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
