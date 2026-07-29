import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import authorImage from "../assets/Rafael.png.png";
import dermpathTexture from "../assets/dermpath-illustration-no-r@2x.png";
import dermPathLogoNavyGold from "../assets/dermpath-logo-navy-gold-concept.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const paths = [
  {
    to: "/mapa-da-arvore",
    number: "01",
    eyebrowKey: "home_path_overview" as const,
    titleKey: "home_diagnostic_title" as const,
    bodyKey: "home_card_tree_map_body" as const,
    labelKey: "home_action_tree" as const,
    icon: <DiagnosticPathIcon />,
    primary: true,
  },
  {
    to: "/diagnostico",
    number: "02",
    eyebrowKey: "home_path_exploration" as const,
    titleKey: "home_explore_title" as const,
    bodyKey: "home_card_start_body" as const,
    labelKey: "home_action_explore" as const,
    icon: <SkinExploreIcon />,
  },
  {
    to: "/quiz",
    number: "03",
    eyebrowKey: "home_path_review" as const,
    titleKey: "home_quiz_title" as const,
    bodyKey: "home_card_quiz_body" as const,
    labelKey: "home_action_quiz" as const,
    icon: <QuizSlideIcon />,
  },
  {
    to: "/treinamento-ted",
    number: "04",
    eyebrowKey: "home_path_training" as const,
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

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {paths.map((path) => (
              <HomePathCard
                key={path.to}
                to={path.to}
                number={path.number}
                title={t(path.titleKey)}
                body={t(path.bodyKey)}
                label={t(path.labelKey)}
                icon={path.icon}
                eyebrow={t(path.eyebrowKey)}
                primary={"primary" in path && path.primary}
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

function HomePathCard({
  to,
  number,
  title,
  body,
  label,
  icon,
  eyebrow,
  primary = false,
}: {
  to: string;
  number: string;
  title: string;
  body: string;
  label: string;
  icon: ReactNode;
  eyebrow: string;
  primary?: boolean;
}) {
  const coverTone = {
    "01": "from-[#061d3e] via-[#082d5c] to-[#0e477f]",
    "02": "from-[#09284d] via-[#0b3c70] to-[#17628d]",
    "03": "from-[#4a3610] via-[#7a5a17] to-[#a8812b]",
    "04": "from-[#3b2030] via-[#623247] to-[#874b5d]",
  }[number];
  const frameTone = primary
    ? "border-[#c5a14c] shadow-[0_22px_50px_-32px_rgba(8,45,92,0.6)]"
    : "border-[#d8c8a3]/80 shadow-[0_18px_42px_-34px_rgba(8,45,92,0.5)]";
  const actionTone = primary
    ? "border-[#d6b766]/45 bg-[#f1e3be]/70 text-[#5f4515]"
    : "border-transparent bg-[#f8f2e5]/70 text-[#805f1f]";

  return (
    <Link
      to={to}
      className={`group relative flex min-h-[380px] flex-col overflow-hidden rounded-[24px] border bg-[#fffdf7] transition duration-500 hover:-translate-y-1.5 hover:border-[#c5a14c] hover:shadow-[0_28px_56px_-30px_rgba(8,45,92,0.56)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f6ed] motion-reduce:transform-none motion-reduce:transition-none ${frameTone}`}
    >
      <div
        className={`relative h-[184px] shrink-0 overflow-hidden bg-gradient-to-br ${coverTone}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 82%, 63% 94%, 0 83%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d384]/80 to-transparent" />
        <CardMotif number={number} />

        <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-[#f1d57e]">
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.22em]">{eyebrow}</span>
          <span className="flex items-center gap-2 font-serif text-sm"><span className="h-px w-7 bg-current opacity-60" />{number}</span>
        </div>

        <div className="absolute left-1/2 top-[54%] z-10 grid h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[24px] border border-[#f1d57e]/25 bg-[#fff8e8]/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_32px_-24px_rgba(0,0,0,0.58)] backdrop-blur-[1px] transition duration-500 group-hover:-translate-y-[57%] group-hover:scale-[1.035] group-hover:border-[#f1d57e]/45 group-hover:bg-[#fff8e8]/[0.1] motion-reduce:transform-none [&>svg]:h-[78px] [&>svg]:w-[78px]">
          {icon}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-5 pt-3">
        <h3 className="min-h-[3.55rem] font-serif text-[1.68rem] leading-[1.07] tracking-[-0.028em] text-[#082d5c] [@media(min-width:1600px)]:min-h-0">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#65717d]">{body}</p>
        <div className={`-mx-2 -mb-2 mt-auto flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.12em] transition duration-300 group-hover:border-[#d6b766]/45 group-hover:bg-[#f1e3be]/70 group-hover:text-[#5f4515] ${actionTone}`}>
          <span className="leading-4">{label}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#b68d35]/50 bg-[#fffdf7] transition duration-300 group-hover:translate-x-0.5 group-hover:border-[#d6b766] group-hover:bg-[#d6b766] group-hover:text-[#082d5c] motion-reduce:transform-none"><ArrowIcon /></span>
        </div>
      </div>
    </Link>
  );
}

function CardMotif({ number }: { number: string }) {
  if (number === "01") return (
    <svg viewBox="0 0 240 190" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-7 h-52 w-64 text-[#f1d57e] opacity-[0.1] transition duration-700 group-hover:translate-x-1 group-hover:opacity-[0.16]">
      <path d="M120 18v34M120 52 70 84m50-32 50 32M70 84v38m0-38-32 35m32 3-25 36m125-74v38m0-38 33 35m-33 3 25 36" stroke="currentColor" strokeWidth="1.5" />
      {[120,70,170,38,70,45,170,203,195].map((cx, index) => <circle key={index} cx={cx} cy={[18,84,84,119,122,158,122,119,158][index]} r="7" stroke="currentColor" strokeWidth="1.5" />)}
    </svg>
  );
  if (number === "02") return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-12 -top-1 h-44 w-64 text-white opacity-[0.08] transition duration-700 group-hover:-translate-x-1 group-hover:opacity-[0.14]">
      <path d="M4 52c32-25 51 19 84-2s55 18 87-2 54 14 81-3v94H4V52Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 79c32-25 51 19 84-2s55 18 87-2 54 14 81-3M4 108c35-16 55 14 90-2s60 16 94-1 47 8 68-2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 127c13-12 25 10 39-1s25 10 39-1m23 3c13-12 25 10 39-1s25 10 39-1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (number === "03") return (
    <svg viewBox="0 0 210 210" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-60 w-60 text-white opacity-[0.08] transition duration-700 group-hover:rotate-6 group-hover:opacity-[0.14]">
      <circle cx="105" cy="105" r="78" stroke="currentColor" strokeWidth="2" /><circle cx="105" cy="105" r="55" stroke="currentColor" /><circle cx="77" cy="88" r="11" stroke="currentColor" /><circle cx="125" cy="126" r="16" stroke="currentColor" /><circle cx="133" cy="72" r="7" stroke="currentColor" /><circle cx="70" cy="134" r="6" stroke="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 210 230" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-8 -top-5 h-64 w-56 text-[#f3c4cf] opacity-[0.1] transition duration-700 group-hover:-translate-y-1 group-hover:opacity-[0.16]">
      <path d="M48 15h93l27 27v171H48V15Z" stroke="currentColor" strokeWidth="1.7" /><path d="M141 15v29h27M76 80l8 8 15-17m17 12h27M76 119h14m18 0h35M76 147h14m18 0h35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="84" cy="183" r="15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function DiagnosticPathIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="13" r="6" fill="#F2D77E" fillOpacity=".16" stroke="#F2D77E" strokeWidth="2.6" />
      <circle cx="19" cy="60" r="6.5" fill="#F2D77E" stroke="#F2D77E" strokeWidth="2.6" />
      <circle cx="61" cy="60" r="6.5" fill="#FFF8E8" fillOpacity=".06" stroke="#FFF8E8" strokeWidth="2.6" />
      <path d="M40 20v10c0 5.5 4.5 10 10 10h1c5.5 0 10 4.5 10 10v3.5" stroke="#FFF8E8" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M40 20v10c0 5.5-4.5 10-10 10h-1c-5.5 0-10 4.5-10 10v3.5" stroke="#F2D77E" strokeWidth="3" strokeLinecap="round" />
      <path d="m16.2 60 2 2.1 4.1-4.6" stroke="#082D5C" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkinExploreIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="34" cy="33" r="22" fill="#FFF8E8" fillOpacity=".06" stroke="#FFF8E8" strokeWidth="2.6" />
      <path d="m50 49 16 16" stroke="#F2D77E" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M18 27c5.5-4.5 9 4.5 14.5 0s9 4.5 14.5 0M18 35c5.5-4.5 9 4.5 14.5 0s9 4.5 14.5 0M20 43c4.5-3.5 7.5 3.5 12 0s7.5 3.5 12 0" stroke="#FFF8E8" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="37" cy="35" r="4" fill="#F2D77E" />
      <circle cx="37" cy="35" r="1.5" fill="#082D5C" fillOpacity=".72" />
    </svg>
  );
}

function QuizSlideIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="17" y="8" width="46" height="64" rx="10" fill="#FFF8E8" fillOpacity=".06" stroke="#FFF8E8" strokeWidth="2.6" />
      <path d="M32 24a8 8 0 1 1 10.1 7.7c-2.8.9-4 2.6-4 5.2" stroke="#F2D77E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="38" cy="44" r="2.2" fill="#F2D77E" />
      <circle cx="29" cy="59" r="6" fill="#F2D77E" />
      <path d="m26.2 59 2 2.1 4.1-4.6" stroke="#082D5C" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 59h12" stroke="#FFF8E8" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function TedExamIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="39" cy="43" r="24" fill="#FFF8E8" fillOpacity=".06" stroke="#FFF8E8" strokeWidth="2.6" />
      <path d="M39 19a24 24 0 0 1 22 33.5" stroke="#F2D77E" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M32 9h14M39 9v10M39 43l10-9" stroke="#F2D77E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="39" cy="43" r="2.8" fill="#F2D77E" />
      <circle cx="61" cy="61" r="8" fill="#F2D77E" stroke="#FFF8E8" strokeWidth="1.8" />
      <path d="m57.4 61 2.4 2.5 4.8-5.4" stroke="#082D5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
