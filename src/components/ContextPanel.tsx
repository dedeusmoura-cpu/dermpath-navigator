import type { AlgorithmNode, ContentBlock } from "../types/algorithm";
import { TagList } from "./TagList";

interface ContextPanelProps {
  node: AlgorithmNode;
  favorite: boolean;
  onToggleFavorite: (nodeId: string) => void;
}

export function ContextPanel({ node, favorite, onToggleFavorite }: ContextPanelProps) {
  return (
    <aside className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Painel contextual</p>
          <h2 className="mt-2 font-serif text-2xl text-ink">{node.title}</h2>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(node.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${favorite ? "bg-ink text-white" : "bg-slate-100 text-steel hover:bg-slate-200"}`}
        >
          {favorite ? "Favorito" : "Favoritar"}
        </button>
      </div>

      {node.image ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img src={node.image} alt={node.title} className="h-52 w-full object-cover" />
        </div>
      ) : null}

      {node.description ? <p className="text-sm leading-6 text-steel">{node.description}</p> : null}
      <TagList tags={node.tags} />

      {node.notes?.length ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Observações</h3>
          <div className="space-y-3">
            {node.notes.map((note, index) => (
              <div key={`${node.id}-${index}`} className="rounded-2xl bg-paper p-4 text-sm leading-6 text-steel">
                <RichContent block={note} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {node.references?.length ? (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Referências</h3>
          <div className="space-y-2 text-sm text-steel">
            {node.references.map((reference) => (
              <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50">
                {reference.label}
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  );
}

function RichContent({ block }: { block: ContentBlock }) {
  return (
    <p>
      {block.text}
      {block.links?.length ? " " : null}
      {block.links?.map((link, index) => (
        <span key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer" className="font-semibold text-accent underline decoration-accent/40">
            {link.label}
          </a>
          {index < block.links.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}
