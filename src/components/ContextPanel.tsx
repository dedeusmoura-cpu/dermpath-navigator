import { useLanguage } from "../context/LanguageContext";
import { translateNodeDescription, translateNodeResultTitle } from "../i18n/translations";
import type { AlgorithmNode, ContentBlock } from "../types/algorithm";
import { TagList } from "./TagList";

interface ContextPanelProps {
  node: AlgorithmNode;
  favorite: boolean;
  onToggleFavorite: (nodeId: string) => void;
}

export function ContextPanel({ node, favorite, onToggleFavorite }: ContextPanelProps) {
  const { language, tx } = useLanguage();

  return (
    <aside className="space-y-4 rounded-[24px] border border-sand bg-white p-5 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{tx("Painel contextual")}</p>
          <h2 className="mt-2 font-serif text-2xl text-ink">{translateNodeResultTitle(node, language)}</h2>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(node.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${favorite ? "bg-ink text-white" : "bg-paper text-steel hover:bg-sand"}`}
        >
          {favorite ? tx("Favorito") : tx("Favoritar")}
        </button>
      </div>

      {node.image ? (
        <div className="overflow-hidden rounded-2xl border border-sand bg-paper">
          <img src={node.image} alt={translateNodeResultTitle(node, language)} className="h-52 w-full object-cover" />
        </div>
      ) : null}

      {node.description ? <p className="text-sm leading-6 text-steel">{translateNodeDescription(node, language)}</p> : null}
      <TagList tags={node.tags} />

      {node.notes?.length ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{tx("Observações")}</h3>
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{tx("Referências")}</h3>
          <div className="space-y-2 text-sm text-steel">
            {node.references.map((reference) => (
              <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-sand px-4 py-3 transition hover:border-sand/60 hover:bg-paper">
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
  const { tx } = useLanguage();
  const links = block.links ?? [];

  return (
    <p>
      {tx(block.text)}
      {links.length ? " " : null}
      {links.map((link, index) => (
        <span key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer" className="font-semibold text-accent underline decoration-accent/40">
            {link.label}
          </a>
          {index < links.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

