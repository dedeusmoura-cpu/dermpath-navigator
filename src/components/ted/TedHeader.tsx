import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import dermPathLogoIvoryGold from "../../assets/dermpath-logo-wordmark-ivory-gold.png";
import type { TedSection } from "../../types/ted";

interface TedHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  navItems?: unknown;
  actionSlot?: ReactNode;
  onBack?: () => void;
}

const SECTION_LABELS: Record<TedSection, string> = {
  theoretical: "Questões teóricas",
  theoretical_practical: "Questões teórico-práticas",
};

function MenuIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5"><path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4"><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

export function TedHeader({ title, subtitle, eyebrow, actionSlot, onBack }: TedHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sectionParam = searchParams.get("section");
  const activeSection: TedSection | null = sectionParam === "theoretical" || sectionParam === "theoretical_practical" ? sectionParam : null;

  const withSection = (path: string, preserve = true) =>
    preserve && sectionParam ? `${path}?section=${sectionParam}` : path;

  const menuItems = [
    { path: "/treinamento-ted/aleatorio", label: "Treino personalizado", detail: "Quantidade e dificuldade" },
    { path: "/treinamento-ted/simulado", label: "Mini-simulado", detail: "Experiência de prova" },
    { path: "/treinamento-ted/areas", label: "Treinar por área", detail: "Escolha um tema" },
    { path: "/treinamento-ted/meus-simulados", label: "Meus simulados", detail: "Retome os salvos", noSection: true },
    { path: "/treinamento-ted/desempenho", label: "Meu desempenho", detail: "Acurácia e evolução" },
    { path: "/treinamento-ted/revisao", label: "Revisar erros", detail: "Erradas e marcadas" },
  ];

  useEffect(() => {
    setSearchTerm("");
    setMenuOpen(false);
    setMenuPinned(false);
  }, [location.pathname]);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMenuPinned(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/treinamento-ted/busca?q=${encodeURIComponent(term)}${sectionParam ? `&section=${sectionParam}` : ""}`);
  }

  function toggleMenu() {
    if (menuPinned) {
      setMenuOpen(false);
      setMenuPinned(false);
    } else {
      setMenuOpen(true);
      setMenuPinned(true);
    }
  }

  return (
    <section className="relative z-40 overflow-visible rounded-[28px] border border-[#173f6d] bg-[#082f60] text-white shadow-[0_28px_64px_-38px_rgba(8,47,96,0.65)]">
      <div className="pointer-events-none absolute right-24 top-0 h-28 w-28 rounded-full border border-[#dfc16b]/15" />
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="hidden shrink-0 sm:block" aria-label="Página inicial">
            <img src={dermPathLogoIvoryGold} alt="DermPath Navigator" className="h-auto w-[212px]" />
          </Link>
          <span className="hidden h-8 w-px bg-white/15 sm:block" aria-hidden="true" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => onBack ? onBack() : navigate(-1)} className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-[#dfc16b] transition hover:text-white">← Voltar</button>
              {activeSection ? <span className="truncate rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/65">{SECTION_LABELS[activeSection]}</span> : null}
            </div>
            <h1 className="mt-1 truncate font-serif text-xl font-normal sm:text-2xl">{title}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {actionSlot}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              ref={searchInputRef}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => { if (!searchTerm) setSearchOpen(false); }}
              placeholder="Buscar questões"
              aria-label="Buscar questões"
              className={`rounded-full border border-white/15 bg-white/[0.06] py-2.5 pl-4 pr-10 text-xs text-white outline-none placeholder:text-white/40 transition-all focus:border-[#dfc16b]/60 ${searchOpen ? "w-52" : "w-40"}`}
            />
            <button type="submit" aria-label="Enviar busca" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-[#dfc16b]"><SearchIcon /></button>
          </form>
          <div className="hidden rounded-full border border-white/15 bg-white/[0.05] p-1 sm:flex">
            {(["pt", "en"] as const).map((item) => <button key={item} type="button" onClick={() => setLanguage(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase transition ${language === item ? "bg-[#dfbd5c] text-[#082f60]" : "text-white/55 hover:text-white"}`}>{item}</button>)}
          </div>

          <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => { if (!menuPinned) setMenuOpen(false); }}>
            <button type="button" onClick={toggleMenu} onFocus={() => setMenuOpen(true)} aria-label="Abrir mais opções de treinamento" aria-expanded={menuOpen} className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${menuOpen ? "border-[#dfbd5c] bg-[#dfbd5c] text-[#082f60]" : "border-white/15 bg-white/[0.05] text-white hover:text-[#dfc16b]"}`}><MenuIcon /></button>
            <div role="dialog" aria-label="Mais opções de treinamento" aria-hidden={!menuOpen} className={`fixed inset-y-0 right-0 z-50 w-[min(88vw,360px)] border-l border-[#dfc16b]/25 bg-[#082c58]/[0.98] p-6 shadow-[-28px_0_70px_-35px_rgba(2,18,39,0.85)] backdrop-blur-xl transition duration-300 sm:absolute sm:inset-y-auto sm:right-0 sm:top-[calc(100%+12px)] sm:w-[340px] sm:rounded-[24px] sm:border ${menuOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0 sm:translate-x-3"}`}>
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#dfc16b]">Treinamento TED</p><h2 className="mt-1 font-serif text-2xl">Mais opções</h2></div>
                <button type="button" onClick={() => { setMenuOpen(false); setMenuPinned(false); }} aria-label="Fechar menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xl text-white/65 hover:bg-white/10 hover:text-white">×</button>
              </div>
              <nav className="mt-4 space-y-1" aria-label="Navegação do Treinamento TED">
                <Link to="/treinamento-ted" className="mb-2 flex items-center gap-3 rounded-2xl bg-[#dfc16b]/10 px-4 py-3 text-sm font-semibold text-[#dfc16b] transition hover:bg-[#dfc16b]/15">← Central de treinamento</Link>
                {menuItems.map((item) => {
                  const active = location.pathname === item.path;
                  return <Link key={item.path} to={item.noSection ? item.path : withSection(item.path)} className={`flex items-center justify-between rounded-2xl px-4 py-3 transition ${active ? "bg-white/[0.1]" : "hover:bg-white/[0.06]"}`}><span><span className="block text-sm font-semibold text-white">{item.label}</span><span className="mt-0.5 block text-xs text-white/45">{item.detail}</span></span><span className="text-[#dfc16b]">→</span></Link>;
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {(eyebrow || subtitle) ? <div className="relative border-t border-white/10 px-5 py-3 sm:px-7"><div className="flex items-center gap-3"><span className="h-px w-8 bg-[#dfc16b]" /><p className="truncate text-xs text-white/55">{eyebrow ? `${eyebrow} · ` : ""}{subtitle}</p></div></div> : null}
    </section>
  );
}
