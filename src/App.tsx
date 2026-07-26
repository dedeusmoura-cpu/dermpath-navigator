import { useEffect } from "react";
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import dermPathLogo from "./assets/dermpath-logo-final.png";
import dermPathLogoNavyGold from "./assets/dermpath-logo-navy-gold-concept.png";
import quizButtonImage from "./assets/Quiz-branco.png";
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
import { EritemaElevatumDiutinumGoldTipsPage } from "./pages/EritemaElevatumDiutinumGoldTipsPage";
import { FocusedTreeMapPage } from "./pages/FocusedTreeMapPage";
import { GranulomaFacialGoldTipsPage } from "./pages/GranulomaFacialGoldTipsPage";
import { GranulomatosePoliangiteEosinofiliaGoldTipsPage } from "./pages/GranulomatosePoliangiteEosinofiliaGoldTipsPage";
import { GranulomatosePoliangiteWegenerGoldTipsPage } from "./pages/GranulomatosePoliangiteWegenerGoldTipsPage";
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
import { PernioseEpifenomenoLesGoldTipsPage } from "./pages/PernioseEpifenomenoLesGoldTipsPage";
import { PerivascularStudyNotePage } from "./pages/PerivascularStudyNotePage";
import { PmleHistopathologyPage } from "./pages/PmleHistopathologyPage";
import { PoliangiteMicroscopicaGoldTipsPage } from "./pages/PoliangiteMicroscopicaGoldTipsPage";
import { PoliarteriteNodosaVasculiteGoldTipsPage } from "./pages/PoliarteriteNodosaVasculiteGoldTipsPage";
import { PoroceratoseHistopathologyPage } from "./pages/PoroceratoseHistopathologyPage";
import { PrpHistopathologyPage } from "./pages/PrpHistopathologyPage";
import { QuizPage } from "./pages/QuizPage";
import { RosaceaGoldTipsPage } from "./pages/RosaceaGoldTipsPage";
import { SearchPage } from "./pages/SearchPage";
import { TedAreasPage } from "./pages/TedAreasPage";
import { TedLandingPage } from "./pages/TedLandingPage";
import { TedPerformancePage } from "./pages/TedPerformancePage";
import { TedRandomPage } from "./pages/TedRandomPage";
import { TedReviewPage } from "./pages/TedReviewPage";
import { TedSessionPage } from "./pages/TedSessionPage";
import { TedSimuladoPage } from "./pages/TedSimuladoPage";
import { TedSimuladoResultadoPage } from "./pages/TedSimuladoResultadoPage";
import { TedSimuladoSessionPage } from "./pages/TedSimuladoSessionPage";
import { MeusSimuladosPage } from "./pages/MeusSimuladosPage";
import { TedBuscaPage } from "./pages/TedBuscaPage";
import { TreeDiagramPage } from "./pages/TreeDiagramPage";
import { TromboflebiteGoldTipsPage } from "./pages/TromboflebiteGoldTipsPage";
import { VasculiteCrioglobulinemicaGoldTipsPage } from "./pages/VasculiteCrioglobulinemicaGoldTipsPage";
import { VasculiteCutaneaIgmIggGoldTipsPage } from "./pages/VasculiteCutaneaIgmIggGoldTipsPage";
import { VasculiteIgaHenochSchonleinGoldTipsPage } from "./pages/VasculiteIgaHenochSchonleinGoldTipsPage";
import { VasculiteLeucocitoclasticaGoldTipsPage } from "./pages/VasculiteLeucocitoclasticaGoldTipsPage";
import { VasculiteNodularGoldTipsPage } from "./pages/VasculiteNodularGoldTipsPage";
import { VasculiteSepticaGoldTipsPage } from "./pages/VasculiteSepticaGoldTipsPage";
import { VasculiteUrticarialHipocomplementemicaGoldTipsPage } from "./pages/VasculiteUrticarialHipocomplementemicaGoldTipsPage";
import { VasculopatiaLivedoideGoldTipsPage } from "./pages/VasculopatiaLivedoideGoldTipsPage";
import { WelcomeVideoPage } from "./pages/WelcomeVideoPage";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const showBackButton = location.pathname !== "/";
  const isDermatiteQuizPage = location.pathname.startsWith("/quiz/dermatite");
  const isQuizSection = location.pathname.startsWith("/quiz");
  const isTedPage = location.pathname.startsWith("/treinamento-ted");
  const isHomePage = location.pathname === "/";
  const isDiagnosticPage = location.pathname === "/diagnostico";
  const isStudyNotePage = location.pathname.startsWith("/tome-nota/") || location.pathname.startsWith("/dicas-que-valem-ouro");
  const usesNavyHeader = isDiagnosticPage || isStudyNotePage;
  const isTreeMapPage = location.pathname === "/mapa-da-arvore" || location.pathname === "/arvore-interativa";

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

      {!isTedPage && !isHomePage && !isTreeMapPage && <header className={`fixed inset-x-0 top-0 z-30 border-b shadow-[0_12px_36px_-30px_rgba(20,27,43,0.45)] backdrop-blur ${usesNavyHeader ? "border-[#d6b766]/25 bg-[#082d5c]/95" : "border-sand/90 bg-white/92"}`}>
        <div className={`mx-auto flex max-w-7xl justify-between gap-3 px-4 sm:px-6 lg:items-center ${usesNavyHeader ? "items-center py-3" : "items-start py-1.5"}`}>
          <NavLink to="/" className={`shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 ${usesNavyHeader ? "focus-visible:ring-[#d6b766] focus-visible:ring-offset-2 focus-visible:ring-offset-[#082d5c]" : "focus-visible:ring-accent"}`}>
            <img
              src={usesNavyHeader ? dermPathLogoNavyGold : dermPathLogo}
              alt={t("home_title")}
              className={usesNavyHeader ? "h-auto w-[172px] sm:w-[226px]" : "h-[44px] w-auto sm:h-[62px] lg:h-[68px] xl:h-[72px]"}
            />
          </NavLink>

          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 lg:flex-nowrap lg:justify-end">
            {isDermatiteQuizPage ? (
              <button
                type="button"
                onClick={() => navigate("/quiz")}
                className="hidden shrink-0 rounded-full bg-[linear-gradient(90deg,#0A5C3B_0%,#118854_52%,#1DBA6C_100%)] px-5 py-2 shadow-[0_16px_28px_-20px_rgba(17,136,84,0.42)] transition hover:-translate-y-0.5 lg:block"
              >
                <img src={quizButtonImage} alt="Quiz" className="h-8 w-auto object-contain" />
              </button>
            ) : null}

            <nav className={`hidden gap-1 rounded-full border p-[3px] md:flex ${usesNavyHeader ? "border-white/20 bg-white/[0.06]" : "border-sand bg-paper/90"}`}>
              <button
                type="button"
                onClick={openSearchPanel}
                className={`nav-link-hover rounded-full px-3 py-1 text-sm font-semibold transition ${usesNavyHeader ? "text-white/70 hover:bg-white/10 hover:text-[#e1c77e]" : "text-steel hover:bg-white hover:text-accent"}`}
              >
                {t("nav_search")}
              </button>
              {showBackButton ? (
                <button
                  type="button"
                  onClick={goBack}
                  className={`nav-link-hover rounded-full px-3 py-1 text-sm font-semibold transition ${usesNavyHeader ? "text-white/70 hover:bg-white/10 hover:text-[#e1c77e]" : "text-steel hover:bg-white hover:text-accent"}`}
                >
                  {t("back")}
                </button>
              ) : null}
            </nav>

            <div className={`hidden h-6 w-px md:block ${usesNavyHeader ? "bg-white/15" : "bg-sand/80"}`} aria-hidden="true" />

            <div className={`inline-flex w-fit rounded-full border p-[3px] ${usesNavyHeader ? "border-white/20 bg-white/[0.06]" : "border-sand bg-paper/95"}`}>
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition sm:px-3 ${
                  language === "pt" ? (usesNavyHeader ? "bg-[#d6b766] text-[#082d5c]" : "bg-ink text-white") : (usesNavyHeader ? "text-white/65 hover:text-white" : "text-steel hover:bg-white hover:text-accent")
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition sm:px-3 ${
                  language === "en" ? (usesNavyHeader ? "bg-[#d6b766] text-[#082d5c]" : "bg-ink text-white") : (usesNavyHeader ? "text-white/65 hover:text-white" : "text-steel hover:bg-white hover:text-accent")
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>}

      <main className={`mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8 ${isTedPage || isHomePage || isTreeMapPage ? "pt-4" : "pt-16 sm:pt-24"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video-de-boas-vindas" element={<WelcomeVideoPage />} />
          <Route path="/diagnostico" element={<DiagnosticPage />} />
          <Route path="/mapa-da-arvore" element={<FocusedTreeMapPage />} />
          <Route path="/dicas-que-valem-ouro" element={<LupusGoldTipsPage />} />
          <Route path="/dicas-que-valem-ouro/dermatose-urticariforme-neutrofilica" element={<NeutrophilicUrticarialDermatosisGoldTipsPage />} />
          <Route path="/tome-nota/lupus-cutaneo" element={<LupusGoldTipsPage />} />
          <Route path="/tome-nota/dermatose-urticariforme-neutrofilica" element={<NeutrophilicUrticarialDermatosisGoldTipsPage />} />
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
          <Route path="/dicas-que-valem-ouro/vasculite-leucocitoclastica" element={<VasculiteLeucocitoclasticaGoldTipsPage />} />
          <Route path="/tome-nota/rosacea" element={<RosaceaGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-leucocitoclastica" element={<VasculiteLeucocitoclasticaGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-septica" element={<VasculiteSepticaGoldTipsPage />} />
          <Route path="/tome-nota/vasculopatia-livedoide" element={<VasculopatiaLivedoideGoldTipsPage />} />
          <Route path="/tome-nota/perniose-epifenomeno-les" element={<PernioseEpifenomenoLesGoldTipsPage />} />
          <Route path="/tome-nota/granuloma-facial" element={<GranulomaFacialGoldTipsPage />} />
          <Route path="/tome-nota/eritema-elevatum-diutinum" element={<EritemaElevatumDiutinumGoldTipsPage />} />
          <Route path="/tome-nota/poliangite-microscopica" element={<PoliangiteMicroscopicaGoldTipsPage />} />
          <Route path="/tome-nota/granulomatose-poliangiite-wegener" element={<GranulomatosePoliangiteWegenerGoldTipsPage />} />
          <Route path="/tome-nota/granulomatose-poliangiite-eosinofilia" element={<GranulomatosePoliangiteEosinofiliaGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-crioglobulinemica" element={<VasculiteCrioglobulinemicaGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-iga-henoch-schonlein" element={<VasculiteIgaHenochSchonleinGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-urticarial-hipocomplementemica" element={<VasculiteUrticarialHipocomplementemicaGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-cutanea-igm-igg" element={<VasculiteCutaneaIgmIggGoldTipsPage />} />
          <Route path="/tome-nota/tromboflebite" element={<TromboflebiteGoldTipsPage />} />
          <Route path="/tome-nota/poliarterite-nodosa-vasculite" element={<PoliarteriteNodosaVasculiteGoldTipsPage />} />
          <Route path="/tome-nota/vasculite-nodular" element={<VasculiteNodularGoldTipsPage />} />
          <Route path="/tome-nota/dermatites-perivasculares/:nodeId" element={<PerivascularStudyNotePage />} />
          <Route path="/tome-nota/dermatites/:nodeId" element={<PerivascularStudyNotePage />} />
          <Route
            path="/entenda-melhor/dermatite-neutrofilica-granulomatosa-palicada"
            element={<PalisadedNeutrophilicGranulomatousDermatitisPage />}
          />
          <Route
            path="/tome-nota/dermatite-neutrofilica-granulomatosa-palicada"
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
          <Route path="/treinamento-ted" element={<TedLandingPage />} />
          <Route path="/treinamento-ted/areas" element={<TedAreasPage />} />
          <Route path="/treinamento-ted/aleatorio" element={<TedRandomPage />} />
          <Route path="/treinamento-ted/desempenho" element={<TedPerformancePage />} />
          <Route path="/treinamento-ted/revisao" element={<TedReviewPage />} />
          <Route path="/treinamento-ted/sessao" element={<TedSessionPage />} />
          <Route path="/treinamento-ted/simulado" element={<TedSimuladoPage />} />
          <Route path="/treinamento-ted/simulado/sessao" element={<TedSimuladoSessionPage />} />
          <Route path="/treinamento-ted/simulado/resultado" element={<TedSimuladoResultadoPage />} />
          <Route path="/treinamento-ted/meus-simulados" element={<MeusSimuladosPage />} />
          <Route path="/treinamento-ted/busca" element={<TedBuscaPage />} />
          <Route path="/arvore-interativa" element={<TreeDiagramPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
