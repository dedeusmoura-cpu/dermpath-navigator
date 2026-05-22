import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dermPathLogo from "../assets/dermpath-logo-final.png";
import { InteractiveTreeDiagram } from "../components/InteractiveTreeDiagram";
import { useLanguage } from "../context/LanguageContext";
import { algorithmTree } from "../data/algorithm";
import { translateNodeResultTitle } from "../i18n/translations";
import { searchNodes } from "../utils/search";
import { buildPathToNode } from "../utils/tree";

function TreeViewTopBar() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => (query.trim() ? searchNodes(query, language).slice(0, 6) : []),
    [query, language],
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(nodeId: string) {
    setQuery("");
    setOpen(false);
    navigate(`/diagnostico?nodeId=${nodeId}`, {
      state: { trail: buildPathToNode(nodeId).map((n) => n.id) },
    });
  }

  return (
    <div className="mb-4 flex items-center gap-3">
      <NavLink to="/" className="shrink-0">
        <img src={dermPathLogo} alt="DermPath Navigator" className="h-[44px] w-auto sm:h-[52px]" />
      </NavLink>

      <div className="flex flex-1 items-center gap-2 justify-end">
        <div ref={wrapperRef} className="relative flex-1 max-w-xs sm:max-w-sm">
          <div className="flex items-center gap-2 rounded-full border border-sand bg-white/95 px-4 py-2 shadow-sm focus-within:border-accent/50 focus-within:shadow-[0_0_0_3px_rgba(169,122,31,0.08)]">
            <svg className="h-4 w-4 shrink-0 text-steel/70" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder={t("nav_search")}
              className="w-full bg-transparent text-sm text-ink placeholder:text-steel/60 outline-none"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(""); setOpen(false); }} className="shrink-0 text-steel/50 hover:text-steel">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
          {open && results.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-sand bg-white shadow-[0_16px_40px_-20px_rgba(20,27,43,0.3)]">
              {results.map(({ node }) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseDown={() => handleSelect(node.id)}
                  className="w-full px-4 py-3 text-left text-sm text-ink hover:bg-paper transition border-b border-sand/50 last:border-0"
                >
                  {translateNodeResultTitle(node, language)}
                </button>
              ))}
            </div>
          )}
        </div>

        <NavLink
          to="/mapa-da-arvore"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-sand bg-white/95 px-3 py-2 text-xs font-semibold text-steel shadow-sm transition hover:bg-sand hover:text-ink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="8" y="2" width="8" height="5" rx="1.5"/>
            <rect x="1" y="15" width="7" height="5" rx="1.5"/>
            <rect x="8.5" y="15" width="7" height="5" rx="1.5"/>
            <rect x="16" y="15" width="7" height="5" rx="1.5"/>
            <line x1="12" y1="7" x2="12" y2="11"/>
            <line x1="4.5" y1="15" x2="4.5" y2="11"/>
            <line x1="12" y1="15" x2="12" y2="11"/>
            <line x1="19.5" y1="15" x2="19.5" y2="11"/>
            <line x1="4.5" y1="11" x2="19.5" y2="11"/>
          </svg>
          {language === "en" ? "Tree map" : "Mapa da árvore"}
        </NavLink>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="shrink-0 rounded-full border border-sand bg-white/95 px-3 py-2 text-sm font-semibold text-steel shadow-sm transition hover:bg-white hover:text-accent"
        >
          {t("back")}
        </button>

        <div className="inline-flex shrink-0 rounded-full border border-sand bg-white/95 p-[3px] shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage("pt")}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${language === "pt" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"}`}
          >
            PT
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${language === "en" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"}`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

export function TreeDiagramPage() {
  const rootNodeId = algorithmTree.rootId;

  return (
    <div className="space-y-3">
      <TreeViewTopBar />
      <InteractiveTreeDiagram rootNodeId={rootNodeId} />
    </div>
  );
}
