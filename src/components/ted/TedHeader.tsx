import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { tedQuestions } from "../../data/ted";
import { loadTedProgress, getQuestionSectionById } from "../../utils/tedProgress";
import dermPathLogo from "../../assets/DermpathNavigator.png";
import type { TedSection } from "../../types/ted";

interface TedHeaderNavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface TedHeaderProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  navItems?: TedHeaderNavItem[];
  actionSlot?: ReactNode;
}

const defaultTedNavItems: TedHeaderNavItem[] = [
  { to: "/treinamento-ted", label: "Início", end: true },
  { to: "/treinamento-ted/areas", label: "Treinar por área" },
  { to: "/treinamento-ted/aleatorio", label: "Questões aleatórias" },
  { to: "/treinamento-ted/desempenho", label: "Meu desempenho" },
  { to: "/treinamento-ted/revisao", label: "Revisar erros" },
];

const SECTION_LABELS: Record<TedSection, string> = {
  theoretical: "Teóricas",
  theoretical_practical: "Teórico-Práticas",
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function TedHeader({ title, subtitle, eyebrow = "Aprendizado guiado", navItems = defaultTedNavItems, actionSlot }: TedHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Seção ativa detectada pela URL
  const sectionParam = searchParams.get("section");
  const activeSection: TedSection | null =
    sectionParam === "theoretical" || sectionParam === "theoretical_practical" ? sectionParam : null;

  // Botão Continuar — baseado na última questão respondida
  const progress = useMemo(() => loadTedProgress(), []);
  const lastItem = progress.historicoRecente[0];
  const continueSection = lastItem ? getQuestionSectionById(lastItem.questionId) : undefined;
  const continueUrl = continueSection
    ? `/treinamento-ted/aleatorio?section=${continueSection}`
    : null;

  // Busca
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    const term = normalize(searchTerm.trim());
    if (term.length < 2) return [];
    return tedQuestions
      .filter(
        (q) =>
          normalize(q.statement).includes(term) ||
          q.options.some((o) => normalize(o.text).includes(term)) ||
          q.tags.some((t) => normalize(t).includes(term)) ||
          normalize(q.area).includes(term) ||
          (q.subarea && normalize(q.subarea).includes(term)),
      )
      .slice(0, 7);
  }, [searchTerm]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchTerm("");
  }, []);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!searchOpen) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen, closeSearch]);

  // Fecha com ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeSearch]);

  function openQuestion(questionId: string, section: TedSection) {
    closeSearch();
    navigate(`/treinamento-ted/sessao?modo=demo&questionId=${questionId}&section=${section}`);
  }

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#f5c98b] bg-[linear-gradient(135deg,_rgba(255,249,240,0.98)_0%,_rgba(255,244,225,0.98)_42%,_rgba(255,238,210,0.98)_100%)] shadow-[0_28px_64px_-36px_rgba(80,42,0,0.24)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(247,168,0,0.26),_transparent_56%)]" />
      <div className="absolute right-0 top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.88),_rgba(255,255,255,0))]" />

      {/* Barra principal */}
      <div className="relative flex items-center justify-between gap-3 px-5 py-2 sm:px-7">

        {/* Esquerda: logo + separador + título + pill de seção */}
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="shrink-0 opacity-90 transition hover:opacity-100">
            <img src={dermPathLogo} alt="DermPath Navigator" className="h-auto max-h-[28px] w-auto object-contain" />
          </Link>
          <div className="h-4 w-px shrink-0 bg-[#f1c487]" aria-hidden="true" />
          <h1 className="truncate font-serif text-lg text-ink">{title}</h1>
          {activeSection && (
            <span className="shrink-0 rounded-full border border-[#f1c487] bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold text-[#8c5400]">
              · {SECTION_LABELS[activeSection]}
            </span>
          )}
        </div>

        {/* Direita: Continuar + busca + idioma */}
        <div className="flex shrink-0 items-center gap-2">
          {continueUrl && (
            <Link
              to={continueUrl}
              className="hidden rounded-full border border-[#f1c487] bg-white/80 px-3 py-1 text-xs font-semibold text-[#8c5400] transition hover:border-[#eba94d] hover:bg-white sm:inline-flex"
            >
              ▶ Continuar
            </Link>
          )}

          {/* Ícone de busca */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Buscar questões"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f1c487] bg-white/70 text-[#8c5400] transition hover:border-[#eba94d] hover:bg-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </button>

          {/* PT/EN */}
          <div className="inline-flex rounded-full border border-[#f1c487] bg-white/70 p-[3px]">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${language === "pt" ? "bg-[#1f2f4c] text-white" : "text-[#8c5400] hover:bg-white"}`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${language === "en" ? "bg-[#1f2f4c] text-white" : "text-[#8c5400] hover:bg-white"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="relative border-t border-[#f5c98b]/50 px-5 py-2 sm:px-7">
        <nav className="flex flex-wrap items-center gap-2" aria-label="Navegação do Treinamento TED">
          {navItems.map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#1f2f4c] text-white shadow-[0_10px_22px_-14px_rgba(31,47,76,0.7)]"
                    : "border border-[#f1c487] bg-white/86 text-[#8c5400] hover:border-[#eba94d] hover:bg-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {actionSlot ? <div className="ml-auto flex items-center gap-2">{actionSlot}</div> : null}
        </nav>
      </div>

      {/* Painel de busca */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-24 px-4" role="dialog" aria-modal="true">
          <div ref={panelRef} className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#f0d8b0] bg-white shadow-[0_32px_80px_-20px_rgba(80,42,0,0.35)]">
            {/* Campo de busca */}
            <div className="flex items-center gap-3 border-b border-[#f0e8d8] px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 shrink-0 text-[#b96d00]">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar questões... ex: merkel, sarcoidose"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-stone-400"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm("")} className="text-xs text-steel hover:text-ink">
                  ✕
                </button>
              )}
            </div>

            {/* Resultados */}
            {searchTerm.length >= 2 && (
              <div className="max-h-[360px] overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-steel">
                    Nenhuma questão encontrada para "{searchTerm}"
                  </div>
                ) : (
                  <ul>
                    {searchResults.map((q) => {
                      const sectionLabel = q.section === "theoretical" ? "Teórica" : "Teórico-Prática";
                      const snippet = q.statement.length > 110 ? q.statement.slice(0, 110) + "…" : q.statement;
                      return (
                        <li key={q.id}>
                          <button
                            type="button"
                            onClick={() => openQuestion(q.id, q.section)}
                            className="flex w-full items-start gap-3 border-b border-[#f5f0e8] px-4 py-3 text-left transition hover:bg-[#fffbf3]"
                          >
                            <div className="mt-0.5 shrink-0 text-right">
                              <span className="block text-[10px] font-semibold text-[#b96d00]">{q.sourceLabel}</span>
                              <span className="block text-[10px] text-steel">Q{q.questionNumber}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                                <span className="rounded-full border border-[#f1c487] bg-[#fff8ec] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8c5400]">
                                  {sectionLabel}
                                </span>
                                <span className="text-[10px] text-steel">{q.area}</span>
                              </div>
                              <p className="text-xs leading-5 text-ink">{snippet}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-1 h-3.5 w-3.5 shrink-0 text-stone-300">
                              <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {searchResults.length === 7 && (
                  <p className="px-4 py-2 text-center text-[10px] text-steel">
                    Mostrando os primeiros 7 resultados · refine o termo para resultados mais precisos
  				        </p>
                )}
              </div>
            )}

            {searchTerm.length < 2 && (
              <div className="px-4 py-6 text-center text-xs text-steel">
                Digite ao menos 2 caracteres para buscar
              </div>
            )}

            <div className="border-t border-[#f0e8d8] px-4 py-2 text-right">
              <button type="button" onClick={closeSearch} className="text-xs text-steel hover:text-ink">
                ESC para fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
