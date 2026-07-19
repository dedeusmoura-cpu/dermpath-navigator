import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import authorImage from "../assets/Rafael.png.png";
import dermpathTexture from "../assets/dermpath-illustration@2x.png";
import dermPathLogoNavyGold from "../assets/dermpath-logo-navy-gold-concept.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const paths = [
  {
    to: "/mapa-da-arvore",
    number: "01",
    title: "Navegação diagnóstica",
    bodyKey: "home_card_tree_map_body" as const,
    label: "Visualizar conexões",
    icon: <TreeIcon />,
  },
  {
    to: "/diagnostico",
    number: "02",
    title: "Explorar dermatopatologia",
    bodyKey: "home_card_start_body" as const,
    label: "Explorar o algoritmo",
    icon: <CompassIcon />,
  },
  {
    to: "/quiz",
    number: "03",
    titleKey: "home_quiz" as const,
    bodyKey: "home_card_quiz_body" as const,
    label: "Testar conhecimentos",
    icon: <MicroscopeIcon />,
  },
  {
    to: "/treinamento-ted",
    number: "04",
    title: "Treinamento TED",
    body: "Treine com questões comentadas no formato TED e desenvolva seu raciocínio diagnóstico.",
    label: "Iniciar treinamento",
    icon: <CertificateIcon />,
  },
];

export function HomePage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <Layout title={t("home_title")} subtitle={t("home_subtitle")} compactHeader>
      <div className="overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#f9f6ed] shadow-[0_28px_80px_-48px_rgba(4,31,68,0.45)]">
        <header className="flex items-center justify-between border-b border-[#c7a553]/30 bg-[#082d5c] px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="group -ml-2 block" aria-label="DermPath Navigator">
            <img
              src={dermPathLogoNavyGold}
              alt="DermPath Navigator"
              className="h-auto w-[184px] transition duration-300 group-hover:brightness-110 sm:w-[226px]"
            />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/55 sm:block">Dermatopatologia algorítmica</span>
            <div className="inline-flex rounded-full border border-white/20 bg-white/[0.06] p-1" aria-label="Idioma">
              {(["pt", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider transition ${
                    language === item ? "bg-[#d6b766] text-[#082d5c]" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="relative isolate overflow-hidden bg-[#082d5c] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
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
                className="inline-flex items-center gap-3 rounded-full bg-[#d6b766] px-6 py-3.5 text-sm font-bold text-[#082d5c] shadow-[0_12px_30px_-16px_rgba(214,183,102,0.8)] transition hover:-translate-y-0.5 hover:bg-[#e5cb84]"
              >
                Navegação diagnóstica
                <ArrowIcon />
              </Link>
              <a href="#caminhos" className="text-sm font-semibold text-white/75 underline decoration-[#d6b766]/60 underline-offset-8 transition hover:text-white">
                Conheça as ferramentas
              </a>
            </div>
          </div>
        </section>

        <section id="caminhos" className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mb-9 grid gap-4 border-b border-[#cdbb91]/60 pb-7 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#a07926]">Escolha seu caminho</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-[#082d5c] sm:text-4xl">Aprenda no seu ritmo.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5f6b78] md:text-right">Quatro formas complementares de explorar, compreender e consolidar o diagnóstico dermatopatológico.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => (
              <HomePathCard
                key={path.to}
                to={path.to}
                number={path.number}
                title={path.title ?? t(path.titleKey!)}
                body={path.body ?? t(path.bodyKey!)}
                label={path.label}
                icon={path.icon}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-7 grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#f9f6ed] shadow-[0_24px_70px_-52px_rgba(4,31,68,0.5)]">
          <div className="grid h-full sm:grid-cols-[170px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]">
            <img src={authorImage} alt="Rafael de Deus Moura" className="h-full min-h-52 w-full object-cover object-center" />
            <div className="flex flex-col justify-center p-7">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.23em] text-[#a07926]">{t("author_section_title")}</p>
              <p className="mt-4 line-clamp-6 text-sm leading-6 text-[#5f6b78]">{t("author_section_body")}</p>
              <a href="https://lattes.cnpq.br/6149961950618151" target="_blank" rel="noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#082d5c] hover:text-[#a07926]">
                Currículo Lattes <ArrowIcon />
              </a>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[28px] border border-[#d9c9a4]/60 bg-[#082d5c] shadow-[0_24px_70px_-52px_rgba(4,31,68,0.5)]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.23em] text-[#d6b766]">{t("author_welcome_video")}</p>
              <p className="mt-1 text-sm text-white/65">Uma breve apresentação do projeto</p>
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
    </Layout>
  );
}

function HomePathCard({ to, number, title, body, label, icon }: { to: string; number: string; title: string; body: string; label: string; icon: ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[22px] border border-[#d8c8a3]/70 bg-[#fffdf7] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b68d35] hover:shadow-[0_22px_44px_-28px_rgba(8,45,92,0.42)]"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#082d5c] text-[#e1c77e] shadow-[0_10px_24px_-16px_rgba(8,45,92,0.8)]">{icon}</span>
        <span className="font-serif text-sm text-[#b68d35]">{number}</span>
      </div>
      <h3 className="mt-8 font-serif text-[1.55rem] leading-tight tracking-[-0.02em] text-[#082d5c]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#68727c]">{body}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#d8c8a3]/55 pt-5 text-[0.7rem] font-bold uppercase tracking-[0.11em] text-[#8d6a21]">
        <span>{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-[#c6a557]/60 transition group-hover:bg-[#d6b766] group-hover:text-[#082d5c]"><ArrowIcon /></span>
      </div>
    </Link>
  );
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CompassIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5"/><path d="m15.4 8.6-2.1 4.7-4.7 2.1 2.1-4.7 4.7-2.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function TreeIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5m0 0H6v4m6-4h6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function MicroscopeIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="m10 4 4 4m-5.5 4.5 5-5M7 20h11M9 17h6a4 4 0 0 0 4-4v-1M8 9l-2 2 4 4 2-2-4-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function CertificateIcon() { return <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M7 4h10v16l-5-3-5 3V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8h4m-4 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
