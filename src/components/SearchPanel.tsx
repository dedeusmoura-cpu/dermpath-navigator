import { useMemo, useState } from "react";
import { searchNodes } from "../utils/search";
import { getTerminalLabel } from "../utils/tree";

interface SearchPanelProps {
  initialQuery?: string;
  onOpenNode: (nodeId: string) => void;
}

export function SearchPanel({ initialQuery = "", onOpenNode }: SearchPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchNodes(query), [query]);

  return (
    <section className="space-y-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Busca</p>
        <h2 className="font-serif text-2xl text-ink">Diagnósticos, padrões e sinônimos</h2>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-steel">Buscar na árvore</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: amiloidose maculosa, vasculite, mucina, líquen..."
          className="w-full rounded-2xl border border-slate-200 bg-paper px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white"
        />
      </label>

      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="rounded-2xl bg-paper p-4 text-sm text-steel">{query ? "Nenhum resultado encontrado para esta busca." : "Digite um termo para pesquisar na árvore."}</div>
        ) : (
          results.map(({ node, excerpt }) => (
            <button key={node.id} type="button" onClick={() => onOpenNode(node.id)} className="w-full rounded-[22px] border border-slate-200 p-4 text-left transition hover:border-accent/30 hover:bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-ink">{node.title}</h3>
                  <p className="text-sm text-steel">{excerpt}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-steel">{getTerminalLabel(node)}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
