import { Link } from "react-router-dom";
import dermPathLogo from "../assets/dermpath-logo-final.png";
import mapTreeImage from "../assets/Mapa-da-Arvore.png";
import quizImage from "../assets/Quiz-branco.png";
import authorImage from "../assets/Rafael.png.png";
import navegacaoDiagnosticaCompassIcon from "../assets/navegacao-diagnostica-compass-icon.svg";
import treinamentoTedIcon from "../assets/Diploma-clean-icon.svg";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

export function HomePage() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <Layout title={t("home_title")} subtitle={t("home_subtitle")} compactHeader>
      <section className="relative overflow-hidden rounded-[36px] border border-sand/80 bg-[linear-gradient(135deg,_rgba(255,253,248,0.98)_0%,_rgba(250,246,238,0.98)_42%,_rgba(246,239,226,0.98)_100%)] shadow-panel">
        <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top_left,_rgba(169,122,31,0.18),_transparent_56%)]" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(20,27,43,0.06),_rgba(20,27,43,0))]" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.78),_rgba(255,255,255,0))]" />

        <div className="relative px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="flex items-center justify-between mb-6">
            <img
              src={dermPathLogo}
              alt={t("home_title")}
              className="h-[44px] w-auto sm:h-[62px]"
            />
            <div className="inline-flex w-fit rounded-full border border-sand bg-white/80 p-[3px]">
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  language === "pt" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  language === "en" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-accent/15 bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent shadow-sm">
                {t("brand_kicker")}
              </span>
              <div className="space-y-3">
                <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                  {t("home_hero_heading")}
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-steel sm:text-lg">{t("home_hero_body")}</p>
              </div>
            </div>

            <div className="rounded-[32px] bg-white/92 p-5 shadow-[0_24px_52px_-30px_rgba(20,27,43,0.45)] sm:p-6">
              <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              <HomeActionCard
                to="/diagnostico"
                title={t("home_start")}
                body={t("home_card_start_body")}
                imageSrc={navegacaoDiagnosticaCompassIcon}
                imageAlt={t("home_start")}
                badgeLabel={t("home_start")}
                accentClassName="from-[#1A47BF] to-[#245FE7]"
                hoverAccentClassName="group-hover:bg-white group-hover:bg-none group-hover:ring-2 group-hover:ring-[#245FE7]"
                hoverTextClassName="group-hover:text-[#245FE7]"
                hoverIconClassName="group-hover:[filter:brightness(0)_saturate(100%)_invert(31%)_sepia(95%)_saturate(2824%)_hue-rotate(222deg)_brightness(94%)_contrast(92%)]"
                badgeTextClassName="text-[1.22rem] font-bold sm:text-[1.38rem]"
                hideTitle
                compactText
              />
              <HomeActionCard
                to="/mapa-da-arvore"
                title={t("home_tree_map")}
                body={t("home_card_tree_map_body")}
                imageSrc={mapTreeImage}
                imageAlt={t("home_tree_map")}
                badgeLabel={t("home_tree_map")}
                accentClassName="from-[#7B1EE6] via-[#B82EDC] to-[#F050C7]"
                hoverAccentClassName="group-hover:bg-white group-hover:bg-none group-hover:ring-2 group-hover:ring-[#B82EDC]"
                hoverTextClassName="group-hover:text-[#B82EDC]"
                hoverIconClassName="group-hover:[filter:brightness(0)_saturate(100%)_invert(30%)_sepia(79%)_saturate(3008%)_hue-rotate(282deg)_brightness(96%)_contrast(88%)]"
                hideTitle
                compactText
              />
              <HomeActionCard
                to="/quiz"
                title={t("home_quiz")}
                body={t("home_card_quiz_body")}
                imageSrc={quizImage}
                imageAlt={t("home_quiz")}
                accentClassName="from-[#0A5C3B] to-[#1DBA6C]"
                hoverAccentClassName="group-hover:bg-white group-hover:bg-none group-hover:ring-2 group-hover:ring-[#1DBA6C]"
                hoverIconClassName="group-hover:[filter:brightness(0)_saturate(100%)_invert(57%)_sepia(64%)_saturate(1641%)_hue-rotate(103deg)_brightness(93%)_contrast(86%)]"
              />
              <HomeActionCard
                to="/treinamento-ted"
                title="Treinamento TED"
                body="Treine com questões comentadas no formato TED para desenvolver seu raciocínio diagnóstico."
                imageSrc={treinamentoTedIcon}
                imageAlt="Treinamento TED"
                badgeLabel="Treinamento TED"
                accentClassName="from-[#EE8A00] to-[#FFB000]"
                hoverAccentClassName="group-hover:bg-white group-hover:bg-none group-hover:ring-2 group-hover:ring-[#EE8A00]"
                hoverTextClassName="group-hover:text-[#EE8A00]"
                hoverIconClassName="group-hover:[filter:brightness(0)_saturate(100%)_invert(58%)_sepia(95%)_saturate(1460%)_hue-rotate(2deg)_brightness(102%)_contrast(102%)]"
                hideTitle
                compactText
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-[28px] border border-sand/90 bg-white/92 p-6 shadow-panel sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="overflow-hidden rounded-[24px] border border-sand bg-paper shadow-sm">
              <img
                src={authorImage}
                alt="Rafael de Deus Moura"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("author_section_title")}</p>
              <p className="max-w-4xl text-sm leading-7 text-steel sm:text-base">{t("author_section_body")}</p>
              <p className="text-sm text-steel">
                <span className="font-semibold text-ink">{t("author_lattes_label")}</span>{" "}
                <a
                  href="https://lattes.cnpq.br/6149961950618151"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:text-ink"
                >
                  https://lattes.cnpq.br/6149961950618151
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-sand/90 bg-white/92 shadow-panel">
          <div className="border-b border-sand/80 px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("author_welcome_video")}</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="overflow-hidden rounded-[24px] border border-sand bg-paper shadow-sm">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/iFJevx18PsI"
                  title="Video de Boas Vindas - DermPath Navigator"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

interface HomeActionCardProps {
  to: string;
  title: string;
  body: string;
  imageSrc?: string;
  badgeLabel?: string;
  hoverIconClassName?: string;
  imageAlt?: string;
  accentClassName?: string;
  hoverAccentClassName?: string;
  hoverTextClassName?: string;
  badgeTextClassName?: string;
  hideTitle?: boolean;
  compactText?: boolean;
}

function HomeActionCard({
  to,
  title,
  body,
  imageSrc,
  badgeLabel,
  hoverIconClassName = "",
  imageAlt,
  accentClassName = "",
  hoverAccentClassName = "",
  hoverTextClassName = "",
  badgeTextClassName = "",
  hideTitle = false,
  compactText = false,
}: HomeActionCardProps) {
  const resolvedHideTitle = badgeLabel ? hideTitle : imageSrc ? true : hideTitle;
  const resolvedCompactText = badgeLabel ? compactText : imageSrc ? true : compactText;

  return (
    <Link
      to={to}
      className="group flex h-full min-h-[180px] flex-col rounded-[28px] sm:min-h-[260px] border border-sand/90 bg-white px-5 py-5 shadow-[0_22px_48px_-30px_rgba(20,27,43,0.28)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_34px_68px_-24px_rgba(20,27,43,0.44)]"
    >
      <div
        className={`relative mb-5 mx-auto box-border flex h-20 w-full max-w-[278px] items-center justify-center overflow-hidden rounded-full shadow-[0_26px_54px_-24px_rgba(20,27,43,0.8)] ring-1 ring-accent/20 transition-all duration-200 ease-out group-hover:scale-[1.04] group-hover:brightness-110 bg-gradient-to-r px-5 py-4 ${accentClassName} ${hoverAccentClassName}`}
      >
        {imageSrc ? (
          badgeLabel ? (
            <div className="flex w-full items-center justify-center gap-3 px-6 text-white">
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className={`block h-14 w-14 shrink-0 object-contain transition-[filter] duration-200 ${hoverIconClassName}`}
              />
              <span className={`text-lg font-semibold leading-tight transition-colors duration-200 sm:text-[1.35rem] ${hoverTextClassName}`}>
                {badgeLabel}
              </span>
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className={`h-14 w-full max-w-full object-contain transition-[filter] duration-200 ${hoverIconClassName}`}
            />
          )
        ) : (
          <div className={`flex h-full w-full items-center justify-center text-center text-[1.05rem] leading-tight font-semibold text-white sm:text-xl ${badgeTextClassName} ${hoverTextClassName}`}>
            {title}
          </div>
        )}
      </div>
      <div className={`space-y-3 ${resolvedCompactText ? "text-center" : "text-left"}`}>
        {!resolvedHideTitle ? <h2 className="font-serif text-2xl text-ink">{title}</h2> : null}
        <p className="text-sm leading-6 text-steel">{body}</p>
      </div>
    </Link>
  );
}
