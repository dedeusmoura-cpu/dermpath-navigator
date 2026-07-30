import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { PerformanceCard } from "../components/ted/PerformanceCard";
import { useLanguage } from "../context/LanguageContext";
import dermPathLogoIvoryGold from "../assets/dermpath-logo-wordmark-ivory-gold.png";
import type { TedSection } from "../types/ted";
import { getAverageTedTime, getTedSectionPerformance, loadTedProgress } from "../utils/tedProgress";

const DEFAULT_SECTION: TedSection = "theoretical";

const SECTION_COPY: Record<TedSection, { title: string; body: string; kicker: string }> = {
  theoretical: {
    title: "Questões Teóricas",
    kicker: "Conceito e raciocínio",
    body: "Revise fundamentos, critérios diagnósticos e raciocínio anatomopatológico em questões clássicas do TED.",
  },
  theoretical_practical: {
    title: "Questões Teórico-Práticas",
    kicker: "Imagem e diagnóstico",
    body: "Integre clínica, morfologia e histopatologia em questões construídas a partir de imagens e casos.",
  },
};

function parseTedSection(raw: string | null): TedSection | undefined {
  return raw === "theoretical" || raw === "theoretical_practical" ? raw : undefined;
}

function sectionRoute(path: string, section: TedSection) {
  return `${path}?section=${section}`;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SideMenu({ section }: { section: TedSection }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setPinned(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const items: Array<{ to: string; label: string; detail: string; icon: ReactNode }> = [
    { to: sectionRoute("/treinamento-ted/aleatorio", section), label: "Treino personalizado", detail: "Dificuldade e quantidade", icon: "✦" },
    { to: sectionRoute("/treinamento-ted/areas", section), label: "Treinar por área", detail: "Escolha um tema", icon: "⌖" },
    { to: "/treinamento-ted/meus-simulados", label: "Meus simulados", detail: "Retome os salvos", icon: "▣" },
    { to: sectionRoute("/treinamento-ted/desempenho", section), label: "Meu desempenho", detail: "Acurácia e evolução", icon: "↗" },
    { to: sectionRoute("/treinamento-ted/revisao", section), label: "Revisar erros", detail: "Erradas e marcadas", icon: "↺" },
  ];

  function toggleMenu() {
    if (pinned) {
      setOpen(false);
      setPinned(false);
      return;
    }

    setOpen(true);
    setPinned(true);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { if (!pinned) setOpen(false); }}
    >
      <button
        type="button"
        aria-label="Abrir mais opções de treinamento"
        aria-expanded={open}
        aria-controls="ted-side-menu"
        onClick={toggleMenu}
        onFocus={() => setOpen(true)}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
          open ? "border-[#dfb94f] bg-[#dfb94f] text-[#092d5b]" : "border-white/20 bg-white/5 text-white hover:border-[#dfb94f]/70 hover:text-[#dfc16b]"
        }`}
      >
        <MenuIcon />
      </button>

      <div
        id="ted-side-menu"
        role="dialog"
        aria-label="Mais opções de treinamento"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 w-[min(88vw,360px)] border-l border-[#d8bd83]/35 bg-[#082c58]/[0.98] p-6 text-white shadow-[-28px_0_70px_-35px_rgba(2,18,39,0.8)] backdrop-blur-xl transition duration-300 sm:absolute sm:inset-y-auto sm:right-0 sm:top-[calc(100%+12px)] sm:w-[340px] sm:rounded-[24px] sm:border ${
          open ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0 sm:translate-x-3"
        }`}
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#dfc16b]">Navegação</p>
            <h2 className="mt-1 font-serif text-2xl">Mais opções</h2>
          </div>
          <button
            type="button"
            onClick={() => { setOpen(false); setPinned(false); }}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <nav className="mt-4 space-y-1.5" aria-label="Opções secundárias do treinamento">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-white/[0.08] focus-visible:bg-white/[0.08] focus-visible:outline-none"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfc16b]/30 bg-[#dfc16b]/10 font-serif text-lg text-[#dfc16b]">
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="mt-0.5 block text-xs text-white/50">{item.detail}</span>
              </span>
              <span className="text-[#dfc16b] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"><ArrowIcon /></span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function TedLandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const selectedSection = parseTedSection(searchParams.get("section")) ?? DEFAULT_SECTION;
  const progress = loadTedProgress();
  const sectionProgress = getTedSectionPerformance(progress, selectedSection);

  return (
    <Layout>
      <div className="overflow-hidden rounded-[30px] border border-[#d8c69e]/60 bg-[#f8f3e9] shadow-[0_35px_90px_-55px_rgba(8,44,88,0.45)]">
        <header className="relative z-40 flex items-center justify-between border-b border-white/10 bg-[#082f60] px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" aria-label="Ir para a página inicial" className="shrink-0">
            <img src={dermPathLogoIvoryGold} alt="DermPath Navigator" className="h-auto w-[160px] sm:w-[280px]" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate(sectionRoute("/treinamento-ted/busca", selectedSection))}
              aria-label="Buscar questões"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#dfc16b]/70 hover:text-[#dfc16b]"
            >
              <SearchIcon />
            </button>
            <div className="hidden rounded-full border border-white/20 bg-white/5 p-1 sm:inline-flex">
              {(["pt", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase transition ${language === item ? "bg-[#dfbd5c] text-[#082f60]" : "text-white/60 hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <SideMenu section={selectedSection} />
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden bg-[linear-gradient(118deg,#062853_0%,#0a376d_58%,#12477f_100%)] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-20 -top-16 h-80 w-80 rounded-full border border-[#d7b34f]/30" />
            <div className="pointer-events-none absolute right-7 top-10 h-48 w-48 rounded-full border border-[#d7b34f]/25" />
            <div className="pointer-events-none absolute bottom-[-120px] right-[10%] h-64 w-64 rotate-12 rounded-[45%] bg-[#4e79a5]/10 blur-2xl" />

            <div className="relative max-w-3xl">
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dfc16b] sm:text-xs">
                <span className="h-px w-10 bg-[#dfc16b]" />
                Treinamento TED
              </div>
              <h1 className="mt-6 max-w-2xl font-serif text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-6xl">
                Escolha como você quer <span className="text-[#ead17f]">praticar.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-base">
                Três caminhos objetivos para transformar conhecimento em segurança diagnóstica — no seu ritmo e com acompanhamento de desempenho.
              </p>
            </div>
          </section>

          <section className="px-5 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
            <div className="flex flex-col gap-3 border-b border-[#d9c99f] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a77b20]">Rotas de estudo</p>
                <h2 className="mt-2 font-serif text-3xl text-[#082f60] sm:text-4xl">Seu treino começa aqui.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#667080] sm:text-right">
                Escolha uma modalidade principal. Os demais recursos estão no menu no canto superior direito.
              </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {(Object.keys(SECTION_COPY) as TedSection[]).map((section, index) => {
                const active = selectedSection === section;
                const copy = SECTION_COPY[section];
                return (
                  <article
                    key={section}
                    className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1 ${
                      active
                        ? "border-[#0b3e76] bg-[#0a376d] text-white shadow-[0_24px_48px_-30px_rgba(8,47,96,0.75)]"
                        : "border-[#dccca8] bg-[#fffdf8] text-[#082f60] hover:border-[#c9a957] hover:shadow-[0_24px_48px_-34px_rgba(8,47,96,0.28)]"
                    }`}
                  >
                    <div className={`absolute right-[-36px] top-[-36px] h-32 w-32 rounded-full border ${active ? "border-[#dfc16b]/25" : "border-[#c9a957]/25"}`} />
                    <div className="relative flex items-center justify-between">
                      <span className={`font-serif text-sm ${active ? "text-[#dfc16b]" : "text-[#a77b20]"}`}>0{index + 1}</span>
                      {active ? (
                        <span className="rounded-full border border-[#dfc16b]/35 bg-[#dfc16b]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#dfc16b]">Em foco</span>
                      ) : null}
                    </div>
                    <div className="relative mt-10 flex-1">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${active ? "text-white/45" : "text-[#8a7350]"}`}>{copy.kicker}</p>
                      <h3 className="mt-3 font-serif text-[29px] leading-tight">{copy.title}</h3>
                      <p className={`mt-4 text-sm leading-6 ${active ? "text-white/60" : "text-[#667080]"}`}>{copy.body}</p>
                    </div>
                    <div className="relative mt-7 flex items-center justify-between gap-3">
                      <Link
                        to={sectionRoute("/treinamento-ted/aleatorio", section)}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition ${active ? "bg-[#dfbd5c] text-[#082f60] hover:bg-[#ead17f]" : "bg-[#082f60] text-white hover:bg-[#0d447f]"}`}
                      >
                        Começar questões <ArrowIcon />
                      </Link>
                      {!active ? (
                        <Link to={`/treinamento-ted?section=${section}`} className="text-xs font-semibold text-[#8d6d2b] underline decoration-[#c9a957]/50 underline-offset-4 hover:text-[#082f60]">
                          Definir foco
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}

              <article className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border border-[#d1ad4d] bg-[linear-gradient(145deg,#f5dc8a_0%,#e2bc55_100%)] p-6 text-[#082f60] shadow-[0_24px_48px_-32px_rgba(135,92,5,0.42)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_-30px_rgba(135,92,5,0.52)]">
                <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full border border-[#082f60]/12" />
                <div className="absolute -bottom-6 right-3 h-32 w-32 rounded-full border border-[#082f60]/10" />
                <div className="relative flex items-center justify-between">
                  <span className="font-serif text-sm text-[#765814]">03</span>
                  <span className="rounded-full border border-[#082f60]/15 bg-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em]">Experiência de prova</span>
                </div>
                <div className="relative mt-10 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#765814]">Ritmo e estratégia</p>
                  <h3 className="mt-3 font-serif text-[29px] leading-tight">Mini-simulados</h3>
                  <p className="mt-4 text-sm leading-6 text-[#46546a]">Responda sem feedback imediato e confira o gabarito completo ao final, como em uma prova.</p>
                </div>
                <div className="relative mt-7">
                  <Link
                    to={sectionRoute("/treinamento-ted/simulado", selectedSection)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#082f60] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#0d447f]"
                  >
                    Montar simulado <ArrowIcon />
                  </Link>
                </div>
              </article>
            </div>
          </section>

          <section className="border-t border-[#dfd1b1] bg-[#f3eddf] px-5 py-8 sm:px-9 lg:px-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a77b20]">Visão rápida</p>
                <h2 className="mt-1 font-serif text-2xl text-[#082f60]">Seu progresso em {SECTION_COPY[selectedSection].title.toLowerCase()}</h2>
              </div>
              <Link to={sectionRoute("/treinamento-ted/desempenho", selectedSection)} className="hidden items-center gap-2 text-xs font-bold text-[#8a6519] hover:text-[#082f60] sm:inline-flex">
                Ver detalhes <ArrowIcon />
              </Link>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              <PerformanceCard
                label="Acurácia"
                value={`${sectionProgress?.acuraciaGlobal ?? 0}%`}
                helper="Seu aproveitamento acumulado nesta modalidade."
                currentNum={sectionProgress?.acuraciaGlobal ?? 0}
                target={70}
              />
              <PerformanceCard label="Questões respondidas" value={`${sectionProgress?.totalRespondidas ?? 0}`} helper="Volume acumulado nesta modalidade." />
              <PerformanceCard label="Tempo médio" value={`${getAverageTedTime(progress)}s`} helper="Média por questão em todo o treinamento." />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
