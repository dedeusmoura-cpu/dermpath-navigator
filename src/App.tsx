import { useEffect } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import dermPathNavigatorBrandImage from "./assets/DermpathNavigator.png";
import quizPretoButtonImage from "./assets/Quiz-preto1.png";
import { MobileLandscapeHint } from "./components/MobileLandscapeHint";
import { useLanguage } from "./context/LanguageContext";
import { CeratoseLiquenoideHistopathologyPage } from "./pages/CeratoseLiquenoideHistopathologyPage";
import { DermatiteEosinofilicaHistopathologyPage } from "./pages/DermatiteEosinofilicaHistopathologyPage";
import { DermatiteQuizListPage } from "./pages/DermatiteQuizListPage";
import { DermatiteQuizPage } from "./pages/DermatiteQuizPage";
import { DermatiteQuizCase2Page } from "./pages/DermatiteQuizCase2Page";
import { DermatofitoseHistopathologyPage } from "./pages/DermatofitoseHistopathologyPage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { DunHistopathologyPage } from "./pages/DunHistopathologyPage";
import { FocusedTreeMapPage } from "./pages/FocusedTreeMapPage";
import { HomePage } from "./pages/HomePage";
import { LiquenPlanoHistopathologyPage } from "./pages/LiquenPlanoHistopathologyPage";
import { LiquenNitidoHistopathologyPage } from "./pages/LiquenNitidoHistopathologyPage";
import { LupusGoldTipsPage } from "./pages/LupusGoldTipsPage";
import { LscHistopathologyPage } from "./pages/LscHistopathologyPage";
import { MpoxHistopathologyPage } from "./pages/MpoxHistopathologyPage";
import { NecrobioseLipoidicaHistopathologyPage } from "./pages/NecrobioseLipoidicaHistopathologyPage";
import { NeutrophilicUrticarialDermatosisGoldTipsPage } from "./pages/NeutrophilicUrticarialDermatosisGoldTipsPage";
import { OverviewPage } from "./pages/OverviewPage";
import { PalisadedDermatitisHistopathologyPage } from "./pages/PalisadedDermatitisHistopathologyPage";
import { PalisadedNeutrophilicGranulomatousDermatitisPage } from "./pages/PalisadedNeutrophilicGranulomatousDermatitisPage";
import { PmleHistopathologyPage } from "./pages/PmleHistopathologyPage";
import { PoroceratoseHistopathologyPage } from "./pages/PoroceratoseHistopathologyPage";
import { PrpHistopathologyPage } from "./pages/PrpHistopathologyPage";
import { QuizPage } from "./pages/QuizPage";
import { RosaceaGoldTipsPage } from "./pages/RosaceaGoldTipsPage";
import { SearchPage } from "./pages/SearchPage";
import { WelcomeVideoPage } from "./pages/WelcomeVideoPage";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const showBackButton = location.pathname !== "/";
  const isDermatiteQuizPage = location.pathname.startsWith("/quiz/dermatite");
  const isQuizSection = location.pathname.startsWith("/quiz");

  useEffect(() => {
    requestAnimationFrame(() => {
      if (location.hash === "#search-panel") {
        document.getElementById("search-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.hash, location.pathname, location.search]);

  function openSearchPanel() {
    if (location.pathname !== "/diagnostico") {
      navigate("/diagnostico#search-panel");
      return;
    }

    document.getElementById("search-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <div className="app-shell min-h-screen text-ink">
      <MobileLandscapeHint
        active={isQuizSection}
        message={language === "pt" ? "Para visualizar melhor o quiz, gire o celular para a horizontal." : "For a better quiz view, rotate your phone to landscape."}
      />

      <header className="fixed inset-x-0 top-0 z-30 border-b border-sand/90 bg-white/92 shadow-[0_12px_36px_-30px_rgba(20,27,43,0.45)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-start justify-between gap-3 px-4 py-1.5 sm:px-6 lg:items-center">
          <NavLink to="/" className="block shrink-0">
            <img
              src={dermPathNavigatorBrandImage}
              alt={t("home_title")}
              className="h-auto max-h-[42px] w-auto object-contain sm:max-h-[58px] lg:max-h-[64px] xl:max-h-[68px]"
            />
          </NavLink>

          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 lg:flex-nowrap lg:justify-end">
            {isDermatiteQuizPage ? (
              <button
                type="button"
                onClick={() => navigate("/quiz")}
                className="hidden shrink-0 rounded-full bg-[linear-gradient(90deg,#6410d8_0%,#c02cf4_52%,#ff67d7_100%)] px-5 py-2 shadow-[0_16px_28px_-20px_rgba(140,26,217,0.6)] transition hover:-translate-y-0.5 lg:block"
              >
                <img src={quizPretoButtonImage} alt="Quiz" className="h-8 w-auto object-contain" />
              </button>
            ) : null}

            <nav className="hidden gap-1 rounded-full border border-sand bg-paper/90 p-[3px] md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 text-sm font-semibold transition ${
                    isActive
                      ? "bg-ink text-white shadow-[0_12px_28px_-18px_rgba(20,27,43,0.9)]"
                      : "text-steel hover:bg-white hover:text-accent"
                  }`
                }
              >
                {t("nav_home")}
              </NavLink>
              <button
                type="button"
                onClick={openSearchPanel}
                className="rounded-full px-3 py-1 text-sm font-semibold text-steel transition hover:bg-white hover:text-accent"
              >
                {t("nav_search")}
              </button>
              {showBackButton ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full px-3 py-1 text-sm font-semibold text-steel transition hover:bg-white hover:text-accent"
                >
                  {t("back")}
                </button>
              ) : null}
            </nav>

            <div className="hidden h-6 w-px bg-sand/80 md:block" aria-hidden="true" />

            <div className="inline-flex w-fit rounded-full border border-sand bg-paper/95 p-[3px]">
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition sm:px-3 ${
                  language === "pt" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"
                }`}
              >
                {t("language_portuguese")}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition sm:px-3 ${
                  language === "en" ? "bg-ink text-white" : "text-steel hover:bg-white hover:text-accent"
                }`}
              >
                {t("language_english")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video-de-boas-vindas" element={<WelcomeVideoPage />} />
          <Route path="/diagnostico" element={<DiagnosticPage />} />
          <Route path="/mapa-da-arvore" element={<FocusedTreeMapPage />} />
          <Route path="/dicas-que-valem-ouro" element={<LupusGoldTipsPage />} />
          <Route path="/dicas-que-valem-ouro/dermatose-urticariforme-neutrofilica" element={<NeutrophilicUrticarialDermatosisGoldTipsPage />} />
          <Route path="/histopatologico/dermatose-urticariforme-neutrofilica" element={<DunHistopathologyPage />} />
          <Route path="/histopatologico/dermatofitose" element={<DermatofitoseHistopathologyPage />} />
          <Route path="/histopatologico/ceratose-liquenoide" element={<CeratoseLiquenoideHistopathologyPage />} />
          <Route path="/histopatologico/dermatite-eosinofilica" element={<DermatiteEosinofilicaHistopathologyPage />} />
          <Route path="/histopatologico/erupcao-polimorfa-a-luz" element={<PmleHistopathologyPage />} />
          <Route path="/histopatologico/liquen-plano" element={<LiquenPlanoHistopathologyPage />} />
          <Route path="/histopatologico/liquen-nitido" element={<LiquenNitidoHistopathologyPage />} />
          <Route path="/histopatologico/mpox" element={<MpoxHistopathologyPage />} />
          <Route path="/histopatologico/necrobiose-lipoidica" element={<NecrobioseLipoidicaHistopathologyPage />} />
          <Route path="/histopatologico/liquen-simples-cronico" element={<LscHistopathologyPage />} />
          <Route path="/histopatologico/poroceratose" element={<PoroceratoseHistopathologyPage />} />
          <Route path="/dicas-que-valem-ouro/rosacea" element={<RosaceaGoldTipsPage />} />
          <Route
            path="/entenda-melhor/dermatite-neutrofilica-granulomatosa-palicada"
            element={<PalisadedNeutrophilicGranulomatousDermatitisPage />}
          />
          <Route
            path="/histopatologico/dermatite-neutrofilica-granulomatosa-palicada"
            element={<PalisadedDermatitisHistopathologyPage />}
          />
          <Route path="/histopatologico/prp" element={<PrpHistopathologyPage />} />
          <Route path="/visao-geral" element={<OverviewPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/dermatite" element={<DermatiteQuizListPage />} />
          <Route path="/quiz/dermatite/1" element={<DermatiteQuizPage />} />
          <Route path="/quiz/dermatite/2" element={<DermatiteQuizCase2Page />} />
        </Routes>
      </main>
    </div>
  );
}
