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
                icon={path.icon}
                eyebrow={language === "pt" ? "Caminho" : "Path"}
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
}: {
  to: string;
  number: string;
  title: string;
  body: string;
  label: string;
  icon: ReactNode;
  eyebrow: string;
}) {
  const coverTone = {
    "01": "from-[#061d3e] via-[#082d5c] to-[#0e477f]",
    "02": "from-[#09284d] via-[#0b3c70] to-[#17628d]",
    "03": "from-[#6f541d] via-[#a77b24] to-[#d0aa53]",
    "04": "from-[#3b2030] via-[#623247] to-[#874b5d]",
  }[number];

  return (
    <Link
      to={to}
      className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-[24px] border border-[#d8c8a3]/80 bg-[#fffdf7] shadow-[0_18px_42px_-34px_rgba(8,45,92,0.5)] transition duration-500 hover:-translate-y-2 hover:border-[#c5a14c] hover:shadow-[0_30px_60px_-30px_rgba(8,45,92,0.56)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f6ed]"
    >
      <div
        className={`relative h-[205px] shrink-0 overflow-hidden bg-gradient-to-br ${coverTone}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 82%, 63% 94%, 0 83%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d384]/80 to-transparent" />
        <CardMotif number={number} />

        <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-[#f1d57e]">
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.25em]">{eyebrow}</span>
          <span className="flex items-center gap-2 font-serif text-sm"><span className="h-px w-7 bg-[#f1d57e]/60" />{number}</span>
        </div>

        <div className="absolute left-1/2 top-[53%] z-10 grid h-[132px] w-[172px] -translate-x-1/2 -translate-y-1/2 place-items-center bg-[radial-gradient(ellipse_at_center,rgba(3,26,56,0.42),transparent_68%)] transition duration-500 group-hover:-translate-y-[56%] group-hover:scale-[1.04] [&>svg]:h-[118px] [&>svg]:w-[158px]">
          {icon}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
        <h3 className="font-serif text-[1.72rem] leading-[1.07] tracking-[-0.028em] text-[#082d5c]">{title}</h3>
        <p className="mt-4 text-sm leading-6 text-[#65717d]">{body}</p>
        <div className="mt-auto flex items-end justify-between border-t border-[#b99a52]/35 pt-5 text-[0.66rem] font-bold uppercase tracking-[0.13em] text-[#805f1f]">
          <span>{label}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#b68d35]/45 transition duration-300 group-hover:translate-x-1 group-hover:bg-[#d6b766] group-hover:text-[#082d5c]"><ArrowIcon /></span>
        </div>
      </div>
    </Link>
  );
}

function CardMotif({ number }: { number: string }) {
  if (number === "01") return (
    <svg viewBox="0 0 240 190" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-7 h-52 w-64 text-[#f1d57e] opacity-[0.18] transition duration-700 group-hover:translate-x-1 group-hover:opacity-30">
      <path d="M120 18v34M120 52 70 84m50-32 50 32M70 84v38m0-38-32 35m32 3-25 36m125-74v38m0-38 33 35m-33 3 25 36" stroke="currentColor" strokeWidth="1.5" />
      {[120,70,170,38,70,45,170,203,195].map((cx, index) => <circle key={index} cx={cx} cy={[18,84,84,119,122,158,122,119,158][index]} r="7" stroke="currentColor" strokeWidth="1.5" />)}
    </svg>
  );
  if (number === "02") return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-12 -top-1 h-44 w-64 text-white opacity-[0.14] transition duration-700 group-hover:-translate-x-1 group-hover:opacity-[0.24]">
      <path d="M4 52c32-25 51 19 84-2s55 18 87-2 54 14 81-3v94H4V52Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 79c32-25 51 19 84-2s55 18 87-2 54 14 81-3M4 108c35-16 55 14 90-2s60 16 94-1 47 8 68-2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 127c13-12 25 10 39-1s25 10 39-1m23 3c13-12 25 10 39-1s25 10 39-1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (number === "03") return (
    <svg viewBox="0 0 210 210" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-60 w-60 text-white opacity-[0.14] transition duration-700 group-hover:rotate-6 group-hover:opacity-[0.24]">
      <circle cx="105" cy="105" r="78" stroke="currentColor" strokeWidth="2" /><circle cx="105" cy="105" r="55" stroke="currentColor" /><circle cx="77" cy="88" r="11" stroke="currentColor" /><circle cx="125" cy="126" r="16" stroke="currentColor" /><circle cx="133" cy="72" r="7" stroke="currentColor" /><circle cx="70" cy="134" r="6" stroke="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 210 230" fill="none" aria-hidden="true" className="pointer-events-none absolute -right-8 -top-5 h-64 w-56 text-[#f3c4cf] opacity-[0.18] transition duration-700 group-hover:-translate-y-1 group-hover:opacity-30">
      <path d="M48 15h93l27 27v171H48V15Z" stroke="currentColor" strokeWidth="1.7" /><path d="M141 15v29h27M76 80l8 8 15-17m17 12h27M76 119h14m18 0h35M76 147h14m18 0h35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="84" cy="183" r="15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

function DiagnosticPathIcon() {
  return (
    <svg viewBox="0 0 150 112" fill="none" className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]" aria-hidden="true">
      <path d="M75 29v12M75 70v8M75 78H29v9M75 78h46v9" stroke="#F2D77E" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="50" y="6" width="50" height="25" rx="7" fill="#FFF8E8" stroke="#F2D77E" strokeWidth="2" />
      <path d="M54 14c7-5 12 5 20 0s13 5 22 0v8H54v-8Z" fill="#E98BA6" />
      <path d="M54 14c7-5 12 5 20 0s13 5 22 0" stroke="#7A2F67" strokeWidth="2" />
      <circle cx="75" cy="55" r="17" fill="#092B57" stroke="#F2D77E" strokeWidth="2.4" />
      <circle cx="75" cy="55" r="3.2" fill="#FFF8E8" />
      <path d="m81.5 47-3.6 10.9L67 63l5.1-10.9L81.5 47Z" fill="#F2D77E" stroke="#FFF8E8" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="10" y="86" width="38" height="20" rx="7" fill="#E9F4F4" stroke="#8DD7D1" strokeWidth="1.8" />
      <path d="M15 94c5-4 8 4 13 0s9 4 15 0" stroke="#7A2F67" strokeWidth="2" />
      <circle cx="121" cy="96" r="14" fill="#FFF2C9" stroke="#F2D77E" strokeWidth="1.8" />
      <circle cx="116" cy="93" r="2.4" fill="#CB6B87" /><circle cx="126" cy="98" r="3.2" fill="#8D4D8D" /><circle cx="125" cy="90" r="1.8" fill="#CB6B87" />
    </svg>
  );
}

function SkinExploreIcon() {
  return (
    <svg viewBox="0 0 150 112" fill="none" className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]" aria-hidden="true">
      <rect x="13" y="19" width="87" height="70" rx="13" fill="#FFF8E8" stroke="#F2D77E" strokeWidth="2" />
      <path d="M20 36c11-8 18 7 30 0s20 7 32 0 12 1 14 0v17H20V36Z" fill="#9B4F9E" />
      <path d="M20 47c10-7 18 7 29 0s20 7 32 0 12 1 15 0v19H20V47Z" fill="#F09AB0" />
      <path d="M20 65h76v18H20z" fill="#F7C3CF" />
      <path d="M20 36c11-8 18 7 30 0s20 7 32 0 12 1 14 0M20 52c10-7 18 7 29 0s20 7 32 0 12 1 15 0" stroke="#6F2C72" strokeWidth="2" />
      <path d="M34 57c0 10-8 9-8 18m26-18c0 11 8 10 8 20m23-18c0 8-7 9-7 18" stroke="#C75F7A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="95" cy="48" r="27" fill="#0B3766" fillOpacity=".92" stroke="#F2D77E" strokeWidth="3" />
      <circle cx="88" cy="43" r="5" fill="#F09AB0" stroke="#FFF8E8" strokeWidth="1.5" /><circle cx="104" cy="52" r="7" fill="#A65BA4" stroke="#FFF8E8" strokeWidth="1.5" /><circle cx="103" cy="36" r="3.5" fill="#F2D77E" />
      <path d="m114 68 21 21" stroke="#F2D77E" strokeWidth="7" strokeLinecap="round" /><path d="m114 68 21 21" stroke="#FFF8E8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function QuizSlideIcon() {
  return (
    <svg viewBox="0 0 150 112" fill="none" className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.3)]" aria-hidden="true">
      <rect x="8" y="17" width="83" height="77" rx="13" fill="#FFF8E8" stroke="#F7E5AC" strokeWidth="2" />
      <rect x="16" y="26" width="43" height="39" rx="8" fill="#F7C3CF" />
      <path d="M20 36c6-5 10 5 16 0s11 5 19 0v10H20V36Z" fill="#9B4F9E" />
      <circle cx="28" cy="54" r="3" fill="#C75F7A" /><circle cx="40" cy="53" r="5" fill="#E989A5" /><circle cx="51" cy="57" r="2.5" fill="#7A2F67" />
      <circle cx="74" cy="42" r="12" fill="#0A315D" stroke="#D8A93D" strokeWidth="2" />
      <path d="M69 38a5.2 5.2 0 1 1 6.5 5c-2 .7-2.7 1.7-2.7 3.4" stroke="#F2D77E" strokeWidth="2.6" strokeLinecap="round" /><circle cx="72.8" cy="50.5" r="1.4" fill="#F2D77E" />
      <rect x="18" y="73" width="12" height="12" rx="3" fill="#0B3766" /><path d="m21.5 79 2.5 2.5 4.5-5" stroke="#F2D77E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="36" y="73" width="12" height="12" rx="3" fill="#EBD9B0" /><rect x="54" y="73" width="12" height="12" rx="3" fill="#EBD9B0" />
      <rect x="82" y="26" width="58" height="66" rx="12" fill="#082D5C" stroke="#F2D77E" strokeWidth="2" />
      <path d="M98 42h25M98 53h30M98 64h18" stroke="#FFF8E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="96" cy="42" r="2" fill="#E98BA6" /><circle cx="96" cy="53" r="2" fill="#E98BA6" /><circle cx="96" cy="64" r="2" fill="#E98BA6" />
      <circle cx="126" cy="78" r="8" fill="#D8A93D" /><path d="m122 78 3 3 5-6" stroke="#082D5C" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TedExamIcon() {
  return (
    <svg viewBox="0 0 150 112" fill="none" className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]" aria-hidden="true">
      <rect x="28" y="11" width="80" height="91" rx="13" fill="#FFF8E8" stroke="#F2D77E" strokeWidth="2.2" />
      <rect x="47" y="5" width="42" height="14" rx="7" fill="#D8A93D" stroke="#FFF0BC" strokeWidth="1.5" />
      <rect x="38" y="28" width="60" height="29" rx="7" fill="#F5BAC9" />
      <path d="M42 38c8-6 13 6 21 0s14 6 22 0 7 1 9 0v9H42v-9Z" fill="#8D4D8D" />
      <circle cx="49" cy="49" r="3" fill="#C75F7A" /><circle cx="64" cy="48" r="4.5" fill="#E989A5" /><circle cx="87" cy="48" r="3" fill="#6F2C72" />
      <rect x="39" y="67" width="11" height="11" rx="3" fill="#6A3148" /><path d="m42 72 2.3 2.3 4-4.8" stroke="#F2D77E" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 72.5h35M56 87h25" stroke="#8A6673" strokeWidth="3" strokeLinecap="round" />
      <rect x="39" y="82" width="11" height="11" rx="3" fill="#E8D8C5" />
      <circle cx="111" cy="78" r="24" fill="#402337" stroke="#F2D77E" strokeWidth="2.5" />
      <path d="M111 67v12l8 5" stroke="#FFF8E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="111" cy="78" r="3" fill="#F2D77E" />
      <path d="M104 51h14M111 51v5" stroke="#F2D77E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="128" cy="28" r="13" fill="#D8A93D" stroke="#FFF0BC" strokeWidth="1.8" /><path d="m122 28 4 4 8-9" stroke="#402337" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
