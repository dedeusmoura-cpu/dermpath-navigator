import type { AlgorithmNode } from "../types/algorithm";
import { getTerminalLabel } from "../utils/tree";

interface FavoritesDrawerProps {
  favorites: AlgorithmNode[];
  onOpenNode: (nodeId: string) => void;
}

export function FavoritesDrawer({ favorites, onOpenNode }: FavoritesDrawerProps) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Favoritos</p>
        <h2 className="font-serif text-2xl text-ink">Atalhos pessoais</h2>
      </div>
      <div className="space-y-3">
        {favorites.length === 0 ? (
          <div className="rounded-2xl bg-paper p-4 text-sm text-steel">Você ainda não favoritou nós. Use o botão “Favoritar” no painel contextual.</div>
        ) : (
          favorites.map((node) => (
            <button key={node.id} type="button" onClick={() => onOpenNode(node.id)} className="w-full rounded-[22px] border border-slate-200 p-4 text-left transition hover:border-accent/30 hover:bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-ink">{node.title}</h3>
                  <p className="text-sm text-steel">{node.description ?? "Sem descrição disponível."}</p>
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
