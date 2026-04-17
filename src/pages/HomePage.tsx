import { Link } from "react-router-dom";
import mapTreeImage from "../assets/Mapa-da-Arvore.png";
import quizImage from "../assets/Quiz-cropped.png";
import quizHoverTopImage from "../assets/Quiz-cropped-hover-top.png";
import authorImage from "../assets/Rafael.png.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();

  return (
    <Layout title={t("home_title")} subtitle={t("home_subtitle")} compactHeader>
      <section className="relative overflow-hidden rounded-[36px] border border-sand/80 bg-[linear-gradient(135deg,_rgba(255,253,248,0.98)_0%,_rgba(250,246,238,0.98)_42%,_rgba(246,239,226,0.98)_100%)] shadow-panel">
        <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top_left,_rgba(169,122,31,0.18),_transparent_56%)]" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(20,27,43,0.06),_rgba(20,27,43,0))]" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.78),_rgba(255,255,255,0))]" />

        <div className="relative px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
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
              <div className="grid gap-4 text-left md:grid-cols-3">
              <HomeActionCard
                to="/diagnostico"
                title={t("home_start")}
                body={t("home_card_start_body")}
                accentClassName="from-[#111111] via-[#2a2110] to-[#c9972b]"
                hoverAccentClassName="group-hover:bg-white group-hover:bg-none"
                hoverTextClassName="group-hover:bg-gradient-to-r group-hover:from-[#111111] group-hover:via-[#2a2110] group-hover:to-[#c9972b] group-hover:bg-clip-text group-hover:text-transparent"
                badgeTextClassName="text-[1.22rem] font-bold sm:text-[1.38rem]"
                hoverForegroundImageSrc="__text-only-border__"
                hideTitle
                compactText={false}
              />
              <HomeActionCard
                to="/mapa-da-arvore"
                title={t("home_tree_map")}
                body="Visualize a estrutura geral algorítmica da árvore diagnóstica"
                imageSrc={mapTreeImage}
                imageAlt={t("home_tree_map")}
                accentClassName="from-[#1c2233] via-[#24314b] to-[#635f85]"
                hoverAccentClassName="group-hover:from-[#8b5cf6] group-hover:via-[#7c5ce0] group-hover:to-[#6f57d4]"
                hideTitle
                compactText
              />
              <HomeActionCard
                to="/quiz"
                title={t("home_quiz")}
                body={t("home_card_quiz_body")}
                imageSrc={quizImage}
                hoverForegroundImageSrc={quizHoverTopImage}
                imageAlt={t("home_quiz")}
                hideTitle
                compactText
                imageFill
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
                  src="https://www.youtube.com/embed/aZ-IUbW4JiI"
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
  hoverImageSrc?: string;
  hoverForegroundImageSrc?: string;
  imageAlt?: string;
  accentClassName?: string;
  hoverAccentClassName?: string;
  hoverTextClassName?: string;
  badgeTextClassName?: string;
  hideTitle?: boolean;
  compactText?: boolean;
  imageFill?: boolean;
}

function HomeActionCard({
  to,
  title,
  body,
  imageSrc,
  hoverImageSrc,
  hoverForegroundImageSrc,
  imageAlt,
  accentClassName = "",
  hoverAccentClassName = "",
  hoverTextClassName = "",
  badgeTextClassName = "",
  hideTitle = false,
  compactText = false,
  imageFill = false,
}: HomeActionCardProps) {
  return (
    <Link
      to={to}
      className="group flex h-full min-h-[260px] flex-col rounded-[28px] border border-sand/90 bg-white px-5 py-5 shadow-[0_22px_48px_-30px_rgba(20,27,43,0.28)] transition hover:-translate-y-1 hover:shadow-[0_30px_62px_-28px_rgba(20,27,43,0.4)]"
    >
      <div
        className={`relative mb-5 mx-auto flex h-20 w-full max-w-[278px] items-center justify-center overflow-hidden rounded-full shadow-[0_26px_54px_-24px_rgba(20,27,43,0.8)] ring-1 ring-accent/20 transition-colors ${imageFill ? "" : `bg-gradient-to-r px-5 py-4 ${accentClassName} ${hoverAccentClassName}`}`}
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className={`${imageFill ? "h-full w-full object-cover" : "h-14 w-full max-w-full object-contain"} transition-opacity duration-200 ${hoverImageSrc || hoverForegroundImageSrc ? "group-hover:opacity-0" : ""}`}
            />
            {hoverImageSrc ? (
              <img
                src={hoverImageSrc}
                alt=""
                aria-hidden="true"
                className={`${imageFill ? "absolute inset-0 h-full w-full object-cover" : "absolute h-14 w-full max-w-full object-contain"} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
              />
            ) : null}
            {hoverForegroundImageSrc ? (
              <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {hoverForegroundImageSrc === "__text-only-border__" ? (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#111111] via-[#2a2110] to-[#c9972b]" />
                    <div className="absolute inset-[1px] rounded-full bg-white" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6b11d8] via-[#b315da] to-[#ff51c8]" />
                    <img
                      src={hoverForegroundImageSrc}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-fill"
                    />
                  </>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <div className={`flex h-full w-full items-center justify-center text-center text-[1.05rem] leading-tight font-semibold text-white sm:text-xl ${badgeTextClassName} ${hoverTextClassName}`}>
            {title}
          </div>
        )}
      </div>
      <div className={`space-y-3 ${compactText ? "text-center" : "text-left"}`}>
        {!hideTitle ? <h2 className="font-serif text-2xl text-ink">{title}</h2> : null}
        <p className="text-sm leading-6 text-steel">{body}</p>
      </div>
    </Link>
  );
}
