import { Link } from "react-router-dom";
import authorImage from "../assets/Rafael.png.png";
import dermpathTexture from "../assets/dermpath-illustration-no-r@2x.png";
import dermPathLogoNavyGold from "../assets/dermpath-logo-navy-gold-concept.png";
import navigationDiagnosticArtwork from "../assets/home-paths/navigation-diagnostic-product.jpg";
import guidedExplorationArtwork from "../assets/home-paths/guided-exploration-product.jpg";
import algorithmicQuizArtwork from "../assets/home-paths/algorithmic-quiz-product.jpg";
import tedTrainingArtwork from "../assets/home-paths/ted-training-product.jpg";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const paths = [
  {
    to: "/mapa-da-arvore",
    titleKey: "home_diagnostic_title" as const,
    bodyKey: "home_card_tree_map_body" as const,
    labelKey: "home_action_tree" as const,
    artwork: navigationDiagnosticArtwork,
    tone: "from-[#061d3e] via-[#082d5c] to-[#0e477f]",
    primary: true,
  },
  {
    to: "/diagnostico",
    titleKey: "home_explore_title" as const,
    bodyKey: "home_card_start_body" as const,
    labelKey: "home_action_explore" as const,
    artwork: guidedExplorationArtwork,
    tone: "from-[#09284d] via-[#0b3c70] to-[#17628d]",
  },
  {
    to: "/quiz",
    titleKey: "home_quiz_title" as const,
    bodyKey: "home_card_quiz_body" as const,
    labelKey: "home_action_quiz" as const,
    artwork: algorithmicQuizArtwork,
    tone: "from-[#4a3610] via-[#7a5a17] to-[#a8812b]",
  },
  {
    to: "/treinamento-ted",
    titleKey: "home_ted_title" as const,
    bodyKey: "home_card_ted_body" as const,
    labelKey: "home_action_ted" as const,
    artwork: tedTrainingArtwork,
    tone: "from-[#3b2030] via-[#623247] to-[#874b5d]",
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
                title={t(path.titleKey)}
                body={t(path.bodyKey)}
                label={t(path.labelKey)}
                artwork={path.artwork}
                tone={path.tone}
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
  title,
  body,
  label,
  artwork,
  tone,
  primary = false,
}: {
  to: string;
  title: string;
  body: string;
  label: string;
  artwork: string;
  tone: string;
  primary?: boolean;
}) {
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
        className={`relative aspect-[16/9] shrink-0 overflow-hidden bg-gradient-to-br ${tone}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 63% 100%, 0 95%)" }}
      >
        <img
          src={artwork}
          alt=""
          aria-hidden="true"
          width={1400}
          height={788}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#031b3a]/25" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d384]/75 to-transparent" />
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

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
