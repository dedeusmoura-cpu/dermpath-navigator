import { useState, useRef, useEffect, Fragment, type FormEvent } from "react";
import type { ReactNode } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import dermPathLogo from "../../assets/dermpath-logo-final.png";
import type { TedSection } from "../../types/ted";

interface TedHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  navItems?: unknown; // mantido por compatibilidade, não utilizado
  actionSlot?: ReactNode;
  onBack?: () => void;
}

const SECTION_LABELS: Record<TedSection, string> = {
  theoretical: "Teóricas",
  theoretical_practical: "Teórico-Práticas",
};


export function TedHeader({ title, actionSlot, onBack }: TedHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Seção ativa detectada pela URL
  const sectionParam = searchParams.get("section");
  const activeSection: TedSection | null =
    sectionParam === "theoretical" || sectionParam === "theoretical_practical" ? sectionParam : null;

  // Monta rota preservando a seção ativa
  const r = (path: string, withSection = true) =>
    withSection && sectionParam ? `${path}?section=${sectionParam}` : path;

  // Grupos de navegação
  const navGroupTreinar = [
    { path: "/treinamento-ted/simulado",      label: "Mini-Simulado" },
    { path: "/treinamento-ted/aleatorio",     label: "Treinar"       },
    { path: "/treinamento-ted/areas",         label: "Por área"      },
  ];
  const navGroupHistorico = [
    { path: "/treinamento-ted/meus-simulados", label: "Meus Simulados", noSection: true },
    { path: "/treinamento-ted/desempenho",     label: "Desempenho"                      },
    { path: "/treinamento-ted/revisao",        label: "Revisar erros"                   },
  ];

  // Busca inline
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Limpa o campo ao navegar
  useEffect(() => { setSearchTerm(""); }, [location.pathname]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/treinamento-ted/busca?q=${encodeURIComponent(term)}${sectionParam ? `&section=${sectionParam}` : ""}`);
    setSearchTerm("");
    searchInputRef.current?.blur();
  }

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#f5c98b] bg-[linear-gradient(135deg,_rgba(255,249,240,0.98)_0%,_rgba(255,244,225,0.98)_42%,_rgba(255,238,210,0.98)_100%)] shadow-[0_28px_64px_-36px_rgba(80,42,0,0.24)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(247,168,0,0.26),_transparent_56%)]" />
      <div className="absolute right-0 top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.88),_rgba(255,255,255,0))]" />

      {/* Barra principal */}
      <div className="relative flex items-center justify-between gap-3 px-5 py-2 sm:px-7">

        {/* Esquerda: logo + separador + título + Início/Voltar */}
        <div className="flex min-w-0 items-center gap-2">
          <Link to="/" className="shrink-0 opacity-90 transition hover:opacity-100">
            <img src={dermPathLogo} alt="DermPath Navigator" className="h-[28px] w-auto" />
          </Link>
          <div className="h-4 w-px shrink-0 bg-[#f1c487]" aria-hidden="true" />
          <h1 className="truncate font-serif text-lg text-ink">{title}</h1>
          <div className="h-4 w-px shrink-0 bg-[#f1c487]" aria-hidden="true" />
          <Link
            to="/treinamento-ted"
            className="shrink-0 rounded-full border border-[#f1c487] bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold text-[#8c5400] transition hover:border-[#eba94d] hover:bg-white"
          >
            ← Início
          </Link>
          <button
            type="button"
            onClick={() => onBack ? onBack() : navigate(-1)}
            className="shrink-0 rounded-full border border-[#f1c487] bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold text-[#8c5400] transition hover:border-[#eba94d] hover:bg-white"
          >
            ↩ Voltar
          </button>
          {activeSection && (
            <>
              <div className="h-4 w-px shrink-0 bg-[#f1c487]" aria-hidden="true" />
              <span className="shrink-0 rounded-full bg-[#1f2f4c] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                {SECTION_LABELS[activeSection]}
              </span>
            </>
          )}
        </div>

        {/* Direita: busca inline + idioma */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Campo de busca inline */}
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar questões"
              className="w-36 rounded-full border border-[#f1c487] bg-white/70 py-1 pl-3 pr-8 text-[11px] text-ink outline-none placeholder:text-[#b89060] transition focus:w-48 focus:border-[#eba94d] focus:bg-white"
              style={{ transition: "width 0.2s ease, border-color 0.15s" }}
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8c5400] hover:text-[#b96d00] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </button>
          </form>

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

      {/* Tabs de navegação — agrupadas */}
      <div className="relative border-t border-[#f5c98b]/50 px-5 py-2 sm:px-7">
        <nav className="flex flex-wrap items-center gap-2" aria-label="Navegação do Treinamento TED">
          {/* Grupo 1: Treinar */}
          <div className="flex items-center gap-[2px] rounded-full border border-[#f1c487] bg-white/50 p-[3px]">
            {navGroupTreinar.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Fragment key={item.path}>
                  {i > 0 && <div className="h-4 w-px bg-[#f1c487]" aria-hidden="true" />}
                  <Link
                    to={r(item.path)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#1f2f4c] text-white shadow-[0_10px_22px_-14px_rgba(31,47,76,0.7)]"
                        : "text-[#8c5400] hover:bg-white/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </Fragment>
              );
            })}
          </div>

          {/* Divisor */}
          <div className="h-4 w-px bg-[#f1c487]" aria-hidden="true" />

          {/* Grupo 2: Histórico */}
          <div className="flex items-center gap-[2px] rounded-full border border-[#f1c487] bg-white/50 p-[3px]">
            {navGroupHistorico.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Fragment key={item.path}>
                  {i > 0 && <div className="h-4 w-px bg-[#f1c487]" aria-hidden="true" />}
                  <Link
                    to={item.noSection ? item.path : r(item.path)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#1f2f4c] text-white shadow-[0_10px_22px_-14px_rgba(31,47,76,0.7)]"
                        : "text-[#8c5400] hover:bg-white/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </Fragment>
              );
            })}
          </div>

          {actionSlot ? <div className="ml-auto flex items-center gap-2">{actionSlot}</div> : null}
        </nav>
      </div>

    </section>
  );
}
