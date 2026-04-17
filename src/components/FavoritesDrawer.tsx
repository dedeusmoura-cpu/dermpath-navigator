import { useLanguage } from "../context/LanguageContext";
import { getTranslatedTerminalLabel, translateNodeDescription, translateNodeResultTitle } from "../i18n/translations";
import type { AlgorithmNode } from "../types/algorithm";

interface FavoritesDrawerProps {
  favorites: AlgorithmNode[];
  onOpenNode: (nodeId: string) => void;
}

export function FavoritesDrawer({ favorites, onOpenNode }: FavoritesDrawerProps) {
  const { language, t, tx } = useLanguage();

  return (
    <section className="rounded-[24px] border border-sand bg-white/95 p-5 shadow-panel">
      <div className="mb-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("favorites_kicker")}</p>
        <h2 className="font-serif text-2xl text-ink">{t("favorites_title")}</h2>
      </div>
      <div className="space-y-3">
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-sand/70 bg-paper p-4 text-sm text-steel">{t("favorites_empty")}</div>
        ) : (
          favorites.map((node) => (
            (() => {
              const translatedDescription = translateNodeDescription(node, language);
              const safeDescription =
                language === "en" && node.description && translatedDescription === node.description
                  ? "No description available."
                  : translatedDescription || tx("Sem descrição disponível.");

              return (
            <button
              key={node.id}
              type="button"
              onClick={() => onOpenNode(node.id)}
              className="w-full rounded-[22px] border border-sand bg-white/88 p-4 text-left transition hover:border-accent/30 hover:bg-[#fffaf0]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-ink">{translateNodeResultTitle(node, language)}</h3>
                  <p className="text-sm text-steel">{safeDescription}</p>
                </div>
                <span className="rounded-full border border-sand bg-paper px-3 py-1 text-xs font-semibold text-steel">
                  {getTranslatedTerminalLabel(node.type, language)}
                </span>
              </div>
            </button>
              );
            })()
          ))
        )}
      </div>
    </section>
  );
}

