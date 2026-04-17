import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getTranslatedTerminalLabel, translateNodeResultTitle } from "../i18n/translations";
import { searchNodes } from "../utils/search";

interface SearchPanelProps {
  initialQuery?: string;
  onOpenNode: (nodeId: string) => void;
}

export function SearchPanel({ initialQuery = "", onOpenNode }: SearchPanelProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchNodes(query, language), [language, query]);

  return (
    <section id="search-panel" className="scroll-mt-28 space-y-5 rounded-[24px] border border-sand bg-white/95 p-5 shadow-panel">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("search_panel_kicker")}</p>
        <h2 className="font-serif text-2xl text-ink">{t("search_panel_title")}</h2>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-steel">{t("search_panel_label")}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search_panel_placeholder")}
          className="w-full rounded-2xl border border-sand bg-paper px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white"
        />
      </label>

      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-sand/70 bg-paper p-4 text-sm text-steel">
            {query ? t("search_empty_results") : t("search_empty_query")}
          </div>
        ) : (
          results.map(({ node, excerpt }) => (
            <button
              key={node.id}
              type="button"
              onClick={() => onOpenNode(node.id)}
              className="w-full rounded-[22px] border border-sand bg-white/88 p-4 text-left transition hover:border-accent/30 hover:bg-[#fffaf0]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-ink">{translateNodeResultTitle(node, language)}</h3>
                  <p className="text-sm text-steel">{excerpt}</p>
                </div>
                <span className="rounded-full border border-sand bg-paper px-3 py-1 text-xs font-semibold text-steel">
                  {getTranslatedTerminalLabel(node.type, language)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
