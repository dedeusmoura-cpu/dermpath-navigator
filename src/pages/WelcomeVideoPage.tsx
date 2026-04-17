import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const youtubeVideoUrl = "https://youtu.be/aZ-IUbW4JiI";
const youtubeThumbnailUrl = "https://img.youtube.com/vi/aZ-IUbW4JiI/maxresdefault.jpg";

export function WelcomeVideoPage() {
  const { language, t } = useLanguage();

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {t("back")}
          </Link>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-sand bg-white shadow-panel">
          <div className="border-b border-sand bg-[radial-gradient(circle_at_top_left,_rgba(169,122,31,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(20,27,43,0.08),_transparent_38%)] px-6 py-6 sm:px-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("special_content")}</p>
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">{t("author_welcome_video")}</h2>
              <p className="max-w-3xl text-sm leading-6 text-steel">
                {language === "en"
                  ? "Open the introduction video on YouTube."
                  : "Abra o video de apresentacao no YouTube."}
              </p>
            </div>
          </div>

          <div className="bg-paper px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-[24px] border border-sand bg-white p-3 shadow-panel sm:p-4">
              <a
                href={youtubeVideoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t("author_welcome_video")}
                className="group block"
              >
                <div className="relative w-full overflow-hidden rounded-[18px] bg-black" style={{ paddingTop: "177.78%" }}>
                  <img
                    src={youtubeThumbnailUrl}
                    alt={t("author_welcome_video")}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="rounded-2xl bg-black/55 px-4 py-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                        {language === "en" ? "Welcome Video" : "Video de boas-vindas"}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold sm:text-base">
                          {language === "en" ? "Open on YouTube" : "Abrir no YouTube"}
                        </span>
                        <span className="text-lg leading-none">{">"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
