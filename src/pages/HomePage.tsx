import { Link } from "react-router-dom";
import authorImage from "../assets/Rafael.png.png";
import dermpathTexture from "../assets/dermpath-illustration-no-r@2x.png";
import dermPathLogoNavyGold from "../assets/dermpath-logo-navy-gold-concept.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const paths = [
  {
    to: "/mapa-da-arvore",
    number: "01",
    titleKey: "home_diagnostic_title" as const,
    bodyKey: "home_card_tree_map_body" as const,
    labelKey: "home_action_tree" as const,
    icon: <DiagnosticPathIcon />,
  },
  {
    to: "/diagnostico",
    number: "02",
    titleKey: "home_explore_title" as const,
    bodyKey: "home_card_start_body" as const,
    labelKey: "home_action_explore" as const,
    icon: <SkinExploreIcon />,
  },
  {
    to: "/quiz",
    number: "03",
    titleKey: "home_quiz" as const,
    bodyKey: "home_card_quiz_body" as const,
    labelKey: "home_action_quiz" as const,
    icon: <QuizSlideIcon />,
  },
  {
    to: "/treinamento-ted",
    number: "04",
    titleKey: "home_ted_title" as const,
    bodyKey: "home_card_ted_body" as const,
    labelKey: "home_action_ted" as const,
    icon: <TedExamIcon />,
  },
];

export function HomePage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <Layout title={t("home_title")} subtitle={t("home_subtitle")} compactHeader>
      <div className="overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#f9f6ed] shadow-[0_28px_80px_-48px_rgba(4,31,68,0.45)]">
        <header className="flex items-center justify-between border-b border-[#c7a553]/30 bg-[#082d5c] px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="group -ml-2 block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766] focus-visible:ring-offset-2 focus-visible:ring-offset-[#082d5c]" aria-label="DermPath Navigator">
            <img
              src={dermPathLogoNavyGold}
              alt="DermPath Navigator"
              className="h-auto w-[172px] transition duration-300 group-hover:brightness-110 sm:w-[226px]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/55 sm:block">{t("brand_kicker")}</span>
            <div className="inline-flex rounded-full border border-white/20 bg-white/[0.06] p-1" aria-label={language === "pt" ? "Idioma" : "Language"}>
              {(["pt", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766] ${
                    language === item ? "bg-[#d6b766] text-[#082d5c]" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="relative isolate overflow-hidden bg-[#082d5c] px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_45%,rgba(37,92,148,0.58),transparent_33%),linear-gradient(120deg,#061f42_0%,#082d5c_58%,#0c3b73_100%)]" />
          <img
            src={dermpathTexture}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-16 -right-28 -z-10 w-[720px] max-w-[68%] rotate-[-3deg] opacity-[0.17] mix-blend-screen grayscale sm:-right-16"
          />
          <div className="absolute right-[7%] top-10 -z-10 h-56 w-56 rounded-full border border-[#b38b45]/60" />
          <div className="absolute right-[11%] top-20 -z-10 h-40 w-40 rounded-full border border-[#b38b45]/40" />

          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-[#e1c77e]">
              <span className="h-px w-10 bg-[#d6b766]" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">{t("brand_kicker")}</span>
            </div>
            <h1 className="max-w-[760px] font-serif text-[2.7rem] font-normal leading-[1.03] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.6rem]">
              {t("home_hero_heading")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#dbe5f0]/80 sm:text-lg">{t("home_hero_body")}</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/mapa-da-arvore"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d6b766] px-6 py-3.5 text-sm font-bold text-[#082d5c] shadow-[0_12px_30px_-16px_rgba(214,183,102,0.8)] transition hover:-translate-y-0.5 hover:bg-[#e5cb84] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#082d5c]"
              >
                {t("home_diagnostic_title")}
                <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon /></span>
              </Link>
              <a href="#caminhos" className="rounded-sm text-sm font-semibold text-white/75 underline decoration-[#d6b766]/60 underline-offset-8 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766]">
                {t("home_tools_link")}
              </a>
            </div>
          </div>
        </section>

        <section id="caminhos" className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mb-9 grid gap-4 border-b border-[#cdbb91]/60 pb-7 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#a07926]">{t("home_paths_kicker")}</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-[#082d5c] sm:text-4xl">{t("home_paths_title")}</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5f6b78] md:text-right">{t("home_paths_body")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => (
              <HomePathCard
                key={path.to}
                to={path.to}
                number={path.number}
                title={t(path.titleKey)}
                body={t(path.bodyKey)}
                label={t(path.labelKey)}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-7 grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
        <article id="sobre-projeto" className="scroll-mt-6 overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#f9f6ed] shadow-[0_24px_70px_-52px_rgba(4,31,68,0.5)]">
          <div className="grid h-full sm:grid-cols-[170px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]">
            <img src={authorImage} alt="Rafael de Deus Moura" className="h-full min-h-52 w-full object-cover object-center" />
            <div className="flex flex-col justify-center p-7">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.23em] text-[#a07926]">{t("author_section_title")}</p>
              <p className="mt-4 text-sm leading-6 text-[#5f6b78]">{t("author_section_body")}</p>
              <a href="https://lattes.cnpq.br/6149961950618151" target="_blank" rel="noreferrer" className="group mt-5 inline-flex w-fit items-center gap-2 rounded-sm text-sm font-bold text-[#082d5c] hover:text-[#a07926] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]">
                {t("home_lattes_cta")} <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon /></span>
              </a>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#082d5c] shadow-[0_24px_70px_-52px_rgba(4,31,68,0.5)]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.23em] text-[#d6b766]">{t("author_welcome_video")}</p>
              <p className="mt-1 text-sm text-white/65">{t("home_video_subtitle")}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d6b766]/40 text-[#d6b766]">▶</span>
          </div>
          <div className="aspect-video w-full bg-[#061f42]">
            <iframe
              src="https://www.youtube.com/embed/iFJevx18PsI"
              title="Vídeo de boas-vindas — DermPath Navigator"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </article>
      </section>

      <footer className="mt-7 overflow-hidden rounded-[24px] border border-[#d9c9a4]/60 bg-[#082d5c] text-white shadow-[0_24px_70px_-52px_rgba(4,31,68,0.5)]">
        <div className="grid gap-7 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.23em] text-[#d6b766]">DermPath Navigator</p>
            <p className="mt-3 text-sm leading-6 text-white/65">{t("home_footer_disclaimer")}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/75" aria-label={language === "pt" ? "Links do rodapé" : "Footer links"}>
            <a href="#sobre-projeto" className="rounded-sm transition hover:text-[#e1c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766]">{t("home_footer_about")}</a>
            <a href="#caminhos" className="rounded-sm transition hover:text-[#e1c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766]">{t("home_tools_link")}</a>
            <a href="https://lattes.cnpq.br/6149961950618151" target="_blank" rel="noreferrer" className="rounded-sm transition hover:text-[#e1c77e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b766]">{t("home_lattes_cta")}</a>
          </nav>
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-[0.68rem] text-white/45 sm:px-8">
          © {new Date().getFullYear()} {t("home_footer_rights")}
        </div>
      </footer>
    </Layout>
  );
}

function HomePathCard({ to, number, title, body, label }: { to: string; number: string; title: string; body: string; label: string }) {
  const dark = number === "01" || number === "04";
  const cardTone = {
    "01": "border-[#173f70] bg-[linear-gradient(145deg,#061f42_0%,#0a376d_100%)]",
    "02": "border-[#d8c8a3]/80 bg-[#fffdf7]",
    "03": "border-[#d3b45d]/65 bg-[linear-gradient(145deg,#fbf5df_0%,#f1dfaa_100%)]",
    "04": "border-[#805164] bg-[linear-gradient(145deg,#542c3d_0%,#713b4e_55%,#452435_100%)]",
  }[number];

  return (
    <Link
      to={to}
      className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border p-6 transition duration-500 hover:-translate-y-1.5 hover:border-[#c9a957] hover:shadow-[0_26px_50px_-25px_rgba(8,45,92,0.5)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f6ed] ${cardTone}`}
    >
      <CardMotif number={number} />
      <div className="relative flex justify-end">
        <span className={`flex items-center gap-2 font-serif text-sm ${dark ? "text-[#dfc16b]" : "text-[#a17620]"}`}><span className={`h-px w-7 ${dark ? "bg-[#dfc16b]/55" : "bg-[#b68d35]/45"}`} />{number}</span>
      </div>
      <h3 className={`relative mt-[4.75rem] font-serif text-[1.65rem] leading-[1.08] tracking-[-0.025em] ${dark ? "text-white" : "text-[#082d5c]"}`}>{title}</h3>
      <p className={`relative mt-4 text-sm leading-6 ${dark ? "text-[#dbe5f0]/75" : "text-[#65717d]"}`}>{body}</p>
      <div className={`relative mt-auto flex items-end justify-between border-t pt-5 text-[0.68rem] font-bold uppercase tracking-[0.13em] ${dark ? "border-white/15 text-[#dfc16b]" : "border-[#b99a52]/35 text-[#805f1f]"}`}>
        <span>{label}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:translate-x-1 group-hover:bg-[#d6b766] group-hover:text-[#082d5c] ${dark ? "border-[#d6b766]/50" : "border-[#b68d35]/45"}`}><ArrowIcon /></span>
      </div>
    </Link>
  );
}

function CardMotif({ number }: { number: string }) {
  if (number === "01") return (
    <svg viewBox="0 0 240 190" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-7 h-52 w-64 text-[#d6b766] opacity-[0.14] transition duration-700 group-hover:translate-x-1 group-hover:opacity-25">
      <path d="M120 18v34M120 52 70 84m50-32 50 32M70 84v38m0-38-32 35m32 3-25 36m125-74v38m0-38 33 35m-33 3 25 36" stroke="currentColor" strokeWidth="1.5" />
      {[120,70,170,38,70,45,170,203,195].map((cx, index) => <circle key={index} cx={cx} cy={[18,84,84,119,122,158,122,119,158][index]} r="7" stroke="currentColor" strokeWidth="1.5" />)}
    </svg>
  );
  if (number === "02") return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-12 -top-1 h-44 w-64 text-[#0b3b70] opacity-[0.08] transition duration-700 group-hover:-translate-x-1 group-hover:opacity-[0.16]">
      <path d="M4 52c32-25 51 19 84-2s55 18 87-2 54 14 81-3v94H4V52Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 79c32-25 51 19 84-2s55 18 87-2 54 14 81-3M4 108c35-16 55 14 90-2s60 16 94-1 47 8 68-2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 127c13-12 25 10 39-1s25 10 39-1m23 3c13-12 25 10 39-1s25 10 39-1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (number === "03") return (
    <svg viewBox="0 0 210 210" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-60 w-60 text-[#8c681e] opacity-[0.09] transition duration-700 group-hover:rotate-6 group-hover:opacity-[0.17]">
      <circle cx="105" cy="105" r="78" stroke="currentColor" strokeWidth="2" /><circle cx="105" cy="105" r="55" stroke="currentColor" /><circle cx="77" cy="88" r="11" stroke="currentColor" /><circle cx="125" cy="126" r="16" stroke="currentColor" /><circle cx="133" cy="72" r="7" stroke="currentColor" /><circle cx="70" cy="134" r="6" stroke="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 210 230" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-8 -top-5 h-64 w-56 text-[#e4a9b8] opacity-[0.15] transition duration-700 group-hover:-translate-y-1 group-hover:opacity-25">
      <path d="M48 15h93l27 27v171H48V15Z" stroke="currentColor" strokeWidth="1.7" /><path d="M141 15v29h27M76 80l8 8 15-17m17 12h27M76 119h14m18 0h35M76 147h14m18 0h35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="84" cy="183" r="15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function DiagnosticPathIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
      <circle cx="16" cy="5.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="20" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24.5" cy="19" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24.5" cy="27" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 8v5H7v4.7M16 13h8.5v3.7M24.5 21.3v2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m22.2 22.2 2.3 2.3 2.3-2.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkinExploreIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M4 7.5c3.1-1.8 5.8 1.7 9 0s5.8 1.7 9 0 4.5.1 6 0v14H4v-14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 11c3.1-1.8 5.8 1.7 9 0s5.8 1.7 9 0 4.5.1 6 0M4 15.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 19c2-1.8 3.7 1.5 5.7 0 2-1.6 3.7 1.5 5.7 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="22.2" cy="21.2" r="4.3" fill="#082d5c" stroke="currentColor" strokeWidth="1.7" />
      <path d="m25.4 24.4 3.1 3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuizSlideIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
      <rect x="3.5" y="8" width="25" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="6.5" y="11" width="8.5" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9.4" cy="15" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12.5" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M20 13.5a2.8 2.8 0 1 1 3.7 2.7c-1.2.4-1.7 1-1.7 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="22" cy="21" r=".85" fill="currentColor" />
    </svg>
  );
}

function TedExamIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M7 3.5h14l4 4V27H7V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M21 3.5V8h4M12.2 12.2l1.4 1.4 2.5-2.8M18.5 13h3.2M11 18h3M16.5 18h5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="23.2" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m11.7 25-.6 3 1.9-1 1.9 1-.6-3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
