import { useState } from "react";
import fibrosanteImage from "../assets/Dermatites/fibrosante-atlas-v4.png";
import foliculitePerifoliculiteImage from "../assets/Dermatites/foliculite-perifoliculite-atlas-v4.png";
import dermatosesInvisiveisImage from "../assets/Dermatites/Dermatoses_invisiveis.png";
import nodulaDifusaImage from "../assets/Dermatites/nodula-difusa-atlas-v4.png";
import nodularDifusaEosinofilosImage from "../assets/Dermatites/Nodular-Difusa/eosinofilos.png";
import nodularDifusaHistiocitosImage from "../assets/Dermatites/Nodular-Difusa/histiocitos.png";
import nodularDifusaHistiocitosIntersticialImage from "../assets/Dermatites/Nodular-Difusa/Histiocitos/Intersticial.png";
import nodularDifusaHistiocitosPalicadaImage from "../assets/Dermatites/Nodular-Difusa/Histiocitos/palicada.png";
import nodularDifusaHistiocitosSarcoidicoImage from "../assets/Dermatites/Nodular-Difusa/Histiocitos/sarcoidico.png";
import nodularDifusaHistiocitosSupurativoImage from "../assets/Dermatites/Nodular-Difusa/Histiocitos/supurativo.png";
import nodularDifusaHistiocitosTuberculoideImage from "../assets/Dermatites/Nodular-Difusa/Histiocitos/tuberculoide.png";
import nodularDifusaLinfocitosImage from "../assets/Dermatites/Nodular-Difusa/linfocitos.png";
import nodularDifusaLinfocitosAnormaisImage from "../assets/Dermatites/Nodular-Difusa/Linfocitos Predominam/Linfocitos_anormais.png";
import nodularDifusaPequenosLinfocitosImage from "../assets/Dermatites/Nodular-Difusa/Linfocitos Predominam/pequenos_linfocitos.png";
import nodularDifusaMistoImage from "../assets/Dermatites/Nodular-Difusa/Neutrofilos_poeiranuclear+eosinofilos_plasmocitos.png";
import nodularDifusaNeutrofilosImage from "../assets/Dermatites/Nodular-Difusa/neutrofilos.png";
import paniculiteImage from "../assets/Dermatites/paniculite-atlas-v4.png";
import perivascularImage from "../assets/Dermatites/perivascular-atlas-v4.png";
import perivascularBalonizanteImage from "../assets/Dermatites/Perivasculares/perivascular-balonizante-atlas-v4.png";
import perivascularBalonizanteApenasImage from "../assets/Dermatites/Perivasculares/Balonizante/Balonizante-apenas.png";
import perivascularBalonizanteInterfaceImage from "../assets/Dermatites/Perivasculares/Balonizante/Balonizante-interface.png";
import perivascularBalonizantePsoriasiformeImage from "../assets/Dermatites/Perivasculares/Balonizante/Balonizante-psoriasiforme.png";
import perivascularEspongioticaImage from "../assets/Dermatites/Perivasculares/perivascular-espongiotica-atlas-v4.png";
import perivascularInterfaceLiquenoideImage from "../assets/Dermatites/Perivasculares/Interface/liquenoide-atlas-v4.png";
import perivascularInterfaceLiquenoideHistiocitosImage from "../assets/Dermatites/Perivasculares/Interface/liquenoide/histiocitos.png";
import perivascularInterfaceLiquenoideLangerhansImage from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Langerhans.png";
import perivascularInterfaceLiquenoideLinfocitosImage from "../assets/Dermatites/Perivasculares/Interface/liquenoide/linfocitos.png";
import perivascularInterfaceVacuolarImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar-atlas-v3.png";
import perivascularInterfaceVacuolarMistoImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/linfocitos_neutrofilos_e_eosinofilos.png";
import perivascularInterfaceVacuolarSomenteLinfocitosImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Somente_linfócitos.png";
import perivascularInterfaceVacuolarLinfocitosBalonizacaoImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Linfocitos predominam/Balonização_e_queratinócitos_necróticos.png";
import perivascularInterfaceVacuolarLinfocitosBalonizacaoCamadaCorneaNormalImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Linfocitos predominam/Balonizacao/Camada_cornea_normal.png";
import perivascularInterfaceVacuolarLinfocitosBalonizacaoCamadaGranularProeminenteImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Linfocitos predominam/Balonizacao/Camada_granular_proeminente.png";
import perivascularInterfaceVacuolarLinfocitosBalonizacaoParaceratoseImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Linfocitos predominam/Balonizacao/Paraceratose.png";
import perivascularInterfaceVacuolarLinfocitosSemBalonizacaoImage from "../assets/Dermatites/Perivasculares/Interface/vacuolar/Linfocitos predominam/Sem_balonização.png";
import perivascularSemAlteracaoApenasPerivascularImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/apenas_perivascular.png";
import perivascularSemAlteracaoPerivascularIntersticialImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/perivascular-e-intersticial-atlas-v2.png";
import perivascularIntersticialEosinofilosProeminentesImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/eosinofilos_proeminentes.png";
import perivascularIntersticialMelanofagosProeminentesImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/Melanofagos_proeminentes.png";
import perivascularIntersticialNeutrofilosEosinofilosEPlasmocitosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/Neutrofilos_eosinofilos_e_plasmocitos.png";
import perivascularIntersticialNeutrofilosEEosinofilosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/Neutrofilos_e_eosinofilos.png";
import perivascularIntersticialNeutrofilosProeminentesImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/neutrofilos_proeminentes.png";
import perivascularIntersticialPredominioLinfocitosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/predominio_de_linfocitos.png";
import perivascularIntersticialSiderofagosProeminentesImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Perivascular e intersticial/Siderofagos_proeminentes.png";
import perivascularApenasLinfocitosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos_apenas.png";
import perivascularApenasLinfocitosEEosinofilosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/linfocitos_e_eosinofilos.png";
import perivascularApenasLinfocitosEHistiocitosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/linfocitos_e_histiocitos.png";
import perivascularApenasLinfocitosEPlasmocitosImage from "../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/linfocitos_e_plasmocitos.png";
import perivascularPsoriasiformeImage from "../assets/Dermatites/Perivasculares/perivascular-psoriasiforme-atlas-v4.png";
import espongioticaApenasImage from "../assets/Dermatites/Perivasculares/Espongiotica/espongiotica-apenas.png";
import espongioticaApenasEosinofilosImage from "../assets/Dermatites/Perivasculares/Espongiotica/Espongiotica apenas/eosinofilos-proeminentes.png";
import espongioticaApenasLinfocitosImage from "../assets/Dermatites/Perivasculares/Espongiotica/Espongiotica apenas/linfocitos-predominam.png";
import espongioticaLiquenoideImage from "../assets/Dermatites/Perivasculares/Espongiotica/espongiotica-liquenoide.png";
import espongioticaPsoriasiformeImage from "../assets/Dermatites/Perivasculares/Espongiotica/espongiotica-psoriasiforme.png";
import espongioticaPsoriasiformeLiquenoideImage from "../assets/Dermatites/Perivasculares/Espongiotica/espongiotica-psoriasiforme-liquenoide.png";
import perivascularPsoriasiformeApenasImage from "../assets/Dermatites/Perivasculares/Psoriasiforme/perivascular-apenas.png";
import perivascularPsoriasiformeELiquenoideImage from "../assets/Dermatites/Perivasculares/Psoriasiforme/perivascular-e-liquenoide.png";
import perivascularSemAlteracaoEpidermicaImage from "../assets/Dermatites/Perivasculares/perivascular-sem-alteracao-epidermica-atlas-v5.png";
import processoCistoImage from "../assets/ProcessoPatologico/processo-cisto.png";
import processoDepositoImage from "../assets/ProcessoPatologico/processo-deposito.png";
import processoDermatiteImage from "../assets/ProcessoPatologico/processo-dermatite.png";
import processoHamartomaMalformacaoImage from "../assets/ProcessoPatologico/processo-hamartoma-malformacao.png";
import processoNeoplasiaImage from "../assets/ProcessoPatologico/processo-neoplasia.png";
import navegacaoDiagnosticaCompassIcon from "../assets/navegacao-diagnostica-compass-icon.svg";
import pustulosaImage from "../assets/Dermatites/pustulosa-atlas-v5.png";
import vasculiteImage from "../assets/Dermatites/vasculite-atlas-v4.png";
import vesicoBolhosaImage from "../assets/Dermatites/vesico-bolhosa-atlas-v5.png";
import { FavoriteToggleButton } from "./FavoriteToggleButton";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle, translateOptionHint, translateOptionLabel } from "../i18n/translations";
import type { AlgorithmNode } from "../types/algorithm";

interface TreeNavigatorProps {
  node: AlgorithmNode;
  onNavigate: (nextNodeId: string) => void;
  favorite: boolean;
  onToggleFavorite: (nodeId: string) => void;
}

function getDisplayedNodeTitle(node: AlgorithmNode, language: "pt" | "en") {
  if (node.id === "espongiotica-psoriasiforme-linfocitos") {
    return translateNodeTitle({ id: "espongiotica-psoriasiforme", title: "Espongiótica psoriasiforme" }, language);
  }

  if (node.id === "espongiotica-liquenoide-linfocitos") {
    return translateNodeTitle({ id: "espongiotica-liquenoide", title: "Espongiótica liquenoide" }, language);
  }

  if (node.id === "espongiotica-psor-liq-linfocitos") {
    return translateNodeTitle(
      { id: "espongiotica-psoriasiforme-liquenoide", title: "Espongiótica psoriasiforme-liquenoide" },
      language,
    );
  }

  return translateNodeTitle(node, language);
}

const dermatiteCategoryImages: Record<string, string> = {
  perivascular: perivascularImage,
  "nodular-difusa": nodulaDifusaImage,
  "vesico-bolhosa": vesicoBolhosaImage,
  vasculites: vasculiteImage,
  pustulosas: pustulosaImage,
  "foliculite-perifoliculite": foliculitePerifoliculiteImage,
  fibrosantes: fibrosanteImage,
  paniculites: paniculiteImage,
  "dermatoses-invisiveis": dermatosesInvisiveisImage,
};

const perivascularCategoryImages: Record<string, string> = {
  "perivascular-sem-epiderme": perivascularSemAlteracaoEpidermicaImage,
  "perivascular-interface": perivascularInterfaceLiquenoideImage,
  "perivascular-balonizante": perivascularBalonizanteImage,
  "perivascular-espongiotica": perivascularEspongioticaImage,
  "perivascular-psoriasiforme": perivascularPsoriasiformeImage,
};

const perivascularEspongioticaCategoryImages: Record<string, string> = {
  "espongiotica-apenas": espongioticaApenasImage,
  "espongiotica-psoriasiforme": espongioticaPsoriasiformeImage,
  "espongiotica-psoriasiforme-linfocitos": espongioticaPsoriasiformeImage,
  "espongiotica-liquenoide": espongioticaLiquenoideImage,
  "espongiotica-liquenoide-linfocitos": espongioticaLiquenoideImage,
  "espongiotica-psoriasiforme-liquenoide": espongioticaPsoriasiformeLiquenoideImage,
  "espongiotica-psor-liq-linfocitos": espongioticaPsoriasiformeLiquenoideImage,
};

const perivascularBalonizanteCategoryImages: Record<string, string> = {
  "balonizante-apenas": perivascularBalonizanteApenasImage,
  "balonizante-interface": perivascularBalonizanteInterfaceImage,
  "balonizante-psoriasiforme": perivascularBalonizantePsoriasiformeImage,
};

const espongioticaApenasCategoryImages: Record<string, string> = {
  "espongiotica-apenas-linfocitos": espongioticaApenasLinfocitosImage,
  "espongiotica-apenas-eosinofilos": espongioticaApenasEosinofilosImage,
};

const perivascularPsoriasiformeCategoryImages: Record<string, string> = {
  "psoriasiforme-apenas": perivascularPsoriasiformeApenasImage,
  "psoriasiforme-liquenoide": perivascularPsoriasiformeELiquenoideImage,
};

const perivascularSemEpidermeCategoryImages: Record<string, string> = {
  "pv-apenas": perivascularSemAlteracaoApenasPerivascularImage,
  "pv-intersticial": perivascularSemAlteracaoPerivascularIntersticialImage,
};

const perivascularInterfaceCategoryImages: Record<string, string> = {
  "interface-vacuolar": perivascularInterfaceVacuolarImage,
  "interface-liquenoide": perivascularInterfaceLiquenoideImage,
};

const perivascularInterfaceLiquenoideCategoryImages: Record<string, string> = {
  "interface-liquenoide-linfocitos": perivascularInterfaceLiquenoideLinfocitosImage,
  "interface-liquenoide-histiocitos": perivascularInterfaceLiquenoideHistiocitosImage,
  "interface-liquenoide-langerhans": perivascularInterfaceLiquenoideLangerhansImage,
};

const perivascularInterfaceVacuolarCategoryImages: Record<string, string> = {
  "interface-vac-somente-linfocitos": perivascularInterfaceVacuolarSomenteLinfocitosImage,
  "interface-vac-misto": perivascularInterfaceVacuolarMistoImage,
};

const perivascularInterfaceVacuolarLinfocitosCategoryImages: Record<string, string> = {
  "interface-vac-linf-balonizacao": perivascularInterfaceVacuolarLinfocitosBalonizacaoImage,
  "interface-vac-linf-sem-balonizacao": perivascularInterfaceVacuolarLinfocitosSemBalonizacaoImage,
};

const perivascularInterfaceVacuolarLinfocitosBalonizacaoCategoryImages: Record<string, string> = {
  "dx-eritema-multiforme": perivascularInterfaceVacuolarLinfocitosBalonizacaoCamadaCorneaNormalImage,
  "dx-pleva": perivascularInterfaceVacuolarLinfocitosBalonizacaoParaceratoseImage,
  "dx-gvhd": perivascularInterfaceVacuolarLinfocitosBalonizacaoCamadaGranularProeminenteImage,
};

const perivascularIntersticialCategoryImages: Record<string, string> = {
  "dx-schamberg-2": perivascularIntersticialPredominioLinfocitosImage,
  "group-pv-neutrofilos": perivascularIntersticialNeutrofilosProeminentesImage,
  "group-pv-eosinofilos": perivascularIntersticialEosinofilosProeminentesImage,
  "dx-urticaria": perivascularIntersticialNeutrofilosEEosinofilosImage,
  "dx-morfeia-precoce": perivascularIntersticialNeutrofilosEosinofilosEPlasmocitosImage,
  "group-pv-melanofagos": perivascularIntersticialMelanofagosProeminentesImage,
  "dx-estase": perivascularIntersticialSiderofagosProeminentesImage,
};

const perivascularApenasCategoryImages: Record<string, string> = {
  "pv-apenas-linfocitos": perivascularApenasLinfocitosImage,
  "pv-apenas-linfo-eos": perivascularApenasLinfocitosEEosinofilosImage,
  "pv-apenas-linfo-plasmocitos": perivascularApenasLinfocitosEPlasmocitosImage,
  "dx-hanseniase-indeterminada": perivascularApenasLinfocitosEHistiocitosImage,
};

const nodularDifusaCategoryImages: Record<string, string> = {
  "nodular-linfocitos": nodularDifusaLinfocitosImage,
  "nodular-neutrofilos": nodularDifusaNeutrofilosImage,
  "nodular-misto": nodularDifusaMistoImage,
  "group-nodular-misto-cariofagocitose": nodularDifusaMistoImage,
  "placeholder-nodular-eosinofilico": nodularDifusaEosinofilosImage,
  "nodular-histiocitos": nodularDifusaHistiocitosImage,
};

const nodularHistiocitosCategoryImages: Record<string, string> = {
  sarcoidico: nodularDifusaHistiocitosSarcoidicoImage,
  tuberculoide: nodularDifusaHistiocitosTuberculoideImage,
  palicada: nodularDifusaHistiocitosPalicadaImage,
  "intersticial-granulomatoso": nodularDifusaHistiocitosIntersticialImage,
  "placeholder-granulomatoso-supurativo": nodularDifusaHistiocitosSupurativoImage,
};

const nodularLinfocitosCategoryImages: Record<string, string> = {
  "dx-pseudolinfoma": nodularDifusaPequenosLinfocitosImage,
  "group-linfoma-cutaneo": nodularDifusaLinfocitosAnormaisImage,
};

const processCategoryImages: Record<string, string> = {
  dermatite: processoDermatiteImage,
  "placeholder-neoplasia": processoNeoplasiaImage,
  "placeholder-cisto": processoCistoImage,
  deposito: processoDepositoImage,
  "placeholder-hamartoma": processoHamartomaMalformacaoImage,
};

const processCircularPositions: Record<string, { angle: number; radiusPx: number }> = {
  dermatite: { angle: -90, radiusPx: 280 },
  "placeholder-neoplasia": { angle: -18, radiusPx: 280 },
  "placeholder-cisto": { angle: 54, radiusPx: 280 },
  deposito: { angle: 126, radiusPx: 280 },
  "placeholder-hamartoma": { angle: 198, radiusPx: 280 },
};


export function TreeNavigator({ node, onNavigate, favorite, onToggleFavorite }: TreeNavigatorProps) {
  const { language, t } = useLanguage();
  const [processView, setProcessView] = useState<"orbit" | "list">("orbit");

  if (!node.options?.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-sand bg-white/94 p-6 text-sm text-steel shadow-panel">
        {t("no_children")}
      </div>
    );
  }

  const isDermatiteHub = node.id === "dermatite";
  const isDermatosesInvisiveisHub = node.id === "dermatoses-invisiveis";
  const isNodularDifusaHub = node.id === "nodular-difusa";
  const isNodularLinfocitosHub = node.id === "nodular-linfocitos";
  const isNodularHistiocitosHub = node.id === "nodular-histiocitos";
  const isPerivascularHub = node.id === "perivascular";
  const isPerivascularBalonizanteHub = node.id === "perivascular-balonizante";
  const isPerivascularEspongioticaHub = node.id === "perivascular-espongiotica";
  const isEspongioticaApenasHub = node.id === "espongiotica-apenas";
  const isPerivascularPsoriasiformeHub = node.id === "perivascular-psoriasiforme";
  const isPerivascularSemEpidermeHub = node.id === "perivascular-sem-epiderme";
  const isPerivascularInterfaceHub = node.id === "perivascular-interface";
  const isPerivascularInterfaceLiquenoideHub = node.id === "interface-liquenoide";
  const isPerivascularInterfaceVacuolarHub = node.id === "interface-vacuolar";
  const isPerivascularInterfaceVacuolarLinfocitosHub = node.id === "interface-vac-somente-linfocitos";
  const isPerivascularInterfaceVacuolarLinfocitosBalonizacaoHub = node.id === "interface-vac-linf-balonizacao";
  const isPerivascularApenasHub = node.id === "pv-apenas";
  const isPerivascularIntersticialHub = node.id === "pv-intersticial";
  const isProcessHub = node.id === "root";

  return (
    <section className="rounded-[24px] border border-sand bg-white/95 p-5 shadow-panel">
      <div className={`mb-4 flex items-start justify-between gap-4 ${isProcessHub ? "" : "min-h-[52px]"}`}>
        {isDermatiteHub ? (
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9c7425]">
              <span className="h-px w-8 bg-[#b68d35]/65" aria-hidden="true" />
              {language === "pt" ? "Atlas morfológico" : "Morphologic atlas"}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-[#082d5c] sm:text-4xl">
              {language === "pt" ? "Qual padrão predomina?" : "Which pattern predominates?"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#65717d] sm:text-base">
              {language === "pt"
                ? "Compare a distribuição do infiltrado e escolha a arquitetura que melhor representa a lâmina."
                : "Compare the inflammatory distribution and choose the architecture that best represents the slide."}
            </p>
          </div>
        ) : !isProcessHub ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("next_decision")}</p>
            <h2 className="mt-2 font-serif text-2xl text-ink">{getDisplayedNodeTitle(node, language)}</h2>
          </div>
        ) : (
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9c7425]">
              <span className="h-px w-8 bg-[#b68d35]/65" aria-hidden="true" />
              {language === "pt" ? "Exploração guiada" : "Guided exploration"}
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-[#082d5c] sm:text-4xl">
              {language === "pt" ? "Por onde começa o padrão?" : "Where does the pattern begin?"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#65717d] sm:text-base">
              {language === "pt"
                ? "Escolha o processo patológico predominante para percorrer o raciocínio diagnóstico."
                : "Choose the predominant pathological process to follow the diagnostic reasoning."}
            </p>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {isProcessHub ? (
            <div className="hidden rounded-full border border-[#d8c8a3]/75 bg-[#f9f6ed] p-1 xl:inline-flex" aria-label={language === "pt" ? "Modo de visualização" : "View mode"}>
              <button
                type="button"
                onClick={() => setProcessView("orbit")}
                aria-pressed={processView === "orbit"}
                className={`rounded-full px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.1em] transition ${processView === "orbit" ? "bg-[#082d5c] text-white shadow-sm" : "text-[#65717d] hover:text-[#082d5c]"}`}
              >
                {language === "pt" ? "Órbita" : "Orbit"}
              </button>
              <button
                type="button"
                onClick={() => setProcessView("list")}
                aria-pressed={processView === "list"}
                className={`rounded-full px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.1em] transition ${processView === "list" ? "bg-[#082d5c] text-white shadow-sm" : "text-[#65717d] hover:text-[#082d5c]"}`}
              >
                {language === "pt" ? "Lista" : "List"}
              </button>
            </div>
          ) : null}
          <FavoriteToggleButton nodeId={node.id} favorite={favorite} onToggleFavorite={onToggleFavorite} className="shrink-0" />
        </div>
      </div>

      {isProcessHub ? (
        <>
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${processView === "list" ? "xl:grid" : "xl:hidden"}`}>
            {node.options.map((option, index) => (
              <button
                key={`${node.id}-${option.nextNodeId}`}
                type="button"
                onClick={() => onNavigate(option.nextNodeId)}
                className="group relative flex flex-col items-center overflow-hidden rounded-[22px] border border-[#d8c8a3]/75 bg-[#fffdf7] p-3 text-center shadow-[0_18px_38px_-30px_rgba(8,45,92,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#b68d35] hover:shadow-[0_24px_46px_-28px_rgba(8,45,92,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]/60 focus-visible:ring-offset-2 lg:last:col-start-2 xl:last:col-start-auto"
              >
                <span className="absolute left-4 top-4 z-10 font-serif text-xs text-[#9c7425]">{String(index + 1).padStart(2, "0")}</span>
                <div className="w-full overflow-visible bg-transparent">
                  {processCategoryImages[option.nextNodeId] ? (
                    <img
                      src={processCategoryImages[option.nextNodeId]}
                      alt={translateOptionLabel(node.id, option, language)}
                      className="block h-auto w-full object-contain object-center transition duration-300 group-hover:scale-[1.03]"
                      style={{ aspectRatio: '3/2' }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-steel">
                      {translateOptionLabel(node.id, option, language)}
                    </div>
                  )}
                </div>
                <div className="flex w-full items-center justify-between gap-3 border-t border-[#d8c8a3]/60 px-1 pb-1 pt-3 text-left">
                  <h3 className="text-[0.72rem] font-bold uppercase leading-tight tracking-[0.08em] text-[#082d5c]">
                    {translateOptionLabel(node.id, option, language)}
                  </h3>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#b68d35]/45 text-[#9c7425] transition group-hover:translate-x-0.5 group-hover:bg-[#d6b766] group-hover:text-[#082d5c]">→</span>
                </div>
              </button>
            ))}
          </div>

          <div className={`relative min-h-[780px] overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(36,95,231,0.12),_transparent_55%)] px-8 ${processView === "orbit" ? "hidden xl:block" : "hidden"}`}>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a9c5ff]/80 bg-[radial-gradient(circle,_rgba(255,255,255,0.99)_0%,_rgba(236,243,255,0.94)_56%,_rgba(208,223,255,0.42)_100%)] shadow-[inset_0_18px_42px_rgba(255,255,255,0.62),0_34px_90px_-50px_rgba(36,95,231,0.38)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-[#6d96ff]/75 shadow-[0_0_0_10px_rgba(109,150,255,0.08)]" />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-[0] flex h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{
                background: [
                  "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.22) 0%, transparent 38%)",
                  "radial-gradient(circle at center, #1a3fc7 0%, #2563eb 28%, rgba(37,99,235,0.58) 50%, rgba(37,99,235,0) 82%)",
                ].join(", "),
                boxShadow: [
                  "0 0 72px rgba(37,99,235,0.45)",
                  "0 0 140px rgba(37,99,235,0.22)",
                  "inset 0 -28px 48px rgba(17,50,160,0.35)",
                  "inset 0 12px 28px rgba(255,255,255,0.1)",
                ].join(", "),
              }}
            >
                <img
                  src={navegacaoDiagnosticaCompassIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-[228px] w-[228px] object-contain"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(17,50,160,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}
                />
            </div>

            {node.options.map((option, index) => {
              const imageSrc = processCategoryImages[option.nextNodeId];
              const position = processCircularPositions[option.nextNodeId] ?? { angle: -90, radiusPx: 0 };
              const angleInRadians = (position.angle * Math.PI) / 180;
              const orbitX = Math.cos(angleInRadians) * position.radiusPx;
              const orbitY = Math.sin(angleInRadians) * position.radiusPx;

                return (
                  <button
                    key={`${node.id}-${option.label}`}
                    type="button"
                  onClick={() => onNavigate(option.nextNodeId)}
                    style={{
                      left: `calc(50% + ${orbitX.toFixed(2)}px)`,
                      top: `calc(50% + ${orbitY.toFixed(2)}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="group absolute flex w-[228px] flex-col items-center overflow-hidden rounded-[22px] border border-[#d8c8a3]/80 bg-[#fffdf7]/95 p-3 text-center shadow-[0_20px_42px_-28px_rgba(8,45,92,0.48)] backdrop-blur-sm transition duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#b68d35] hover:shadow-[0_26px_50px_-26px_rgba(8,45,92,0.55)] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#b68d35]/60 focus-visible:ring-offset-2"
                  >
                    <span className="absolute left-4 top-4 z-10 font-serif text-xs text-[#9c7425]">{String(index + 1).padStart(2, "0")}</span>
                    <div className="w-full overflow-visible bg-transparent">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={translateOptionLabel(node.id, option, language)}
                          className="block h-auto w-full object-contain object-center transition duration-300 group-hover:scale-[1.03]"
                          style={{ aspectRatio: '3/2' }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-steel">
                          {translateOptionLabel(node.id, option, language)}
                        </div>
                      )}
                    </div>
                    <div className="flex w-full items-center justify-between gap-3 border-t border-[#d8c8a3]/60 px-1 pb-1 pt-3 text-left">
                      <h3 className="text-[0.7rem] font-bold uppercase leading-tight tracking-[0.08em] text-[#082d5c]">
                        {translateOptionLabel(node.id, option, language)}
                      </h3>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#b68d35]/45 text-[#9c7425] transition group-hover:translate-x-0.5 group-hover:bg-[#d6b766] group-hover:text-[#082d5c]">→</span>
                    </div>
                  </button>
                );
              })}
          </div>
        </>
      ) : isDermatiteHub ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {node.options.map((option, index) => {
            const isDermatosesInvisiveis = option.nextNodeId === "dermatoses-invisiveis";

            return (
              <div
                key={`${node.id}-${option.nextNodeId}`}
                className={isDermatosesInvisiveis ? "xl:col-start-2 xl:col-span-2 xl:flex xl:justify-center" : undefined}
              >
                <button
                  type="button"
                  onClick={() => onNavigate(option.nextNodeId)}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-[#d8c8a3]/75 bg-[#fffdf7] text-left shadow-[0_18px_42px_-32px_rgba(8,45,92,0.5)] transition duration-500 hover:-translate-y-1.5 hover:border-[#b68d35] hover:shadow-[0_28px_52px_-28px_rgba(8,45,92,0.52)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b68d35]/60 focus-visible:ring-offset-2 ${isDermatosesInvisiveis ? "xl:max-w-md" : ""}`}
                >
                  <div className="relative overflow-hidden border-b border-[#d8c8a3]/45 bg-[#f5efe4]">
                    <span className="absolute left-4 top-4 z-10 rounded-full border border-[#b68d35]/35 bg-[#fffdf7]/90 px-2.5 py-1 font-serif text-xs text-[#8d6820] backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={dermatiteCategoryImages[option.nextNodeId]}
                      alt={translateOptionLabel(node.id, option, language)}
                      className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fffdf7]/45 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl leading-tight tracking-[-0.015em] text-[#082d5c]">
                      {translateOptionLabel(node.id, option, language)}
                    </h3>
                    <div className="mt-5 flex items-center justify-between border-t border-[#d8c8a3]/55 pt-4 text-[0.65rem] font-bold uppercase tracking-[0.11em] text-[#805f1f]">
                      <span>{language === "pt" ? "Explorar padrão" : "Explore pattern"}</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#b68d35]/45 transition group-hover:translate-x-1 group-hover:bg-[#d6b766] group-hover:text-[#082d5c]">→</span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : isDermatosesInvisiveisHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {node.options.map((option) => (
            <button
              key={`${node.id}-${option.nextNodeId}`}
              type="button"
              onClick={() => onNavigate(option.nextNodeId)}
              className="group rounded-[22px] border border-sand bg-gradient-to-br from-white to-paper p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold leading-7 text-ink">{translateOptionLabel(node.id, option, language)}</h3>
                {option.hint ? <p className="text-sm text-steel">{translateOptionHint(node.id, option, language)}</p> : null}
                <span className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white transition group-hover:bg-accent">
                  {t("advance")}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : isPerivascularHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {node.options.map((option) => {
            const translatedLabel = translateOptionLabel(node.id, option, language);
            const label = option.nextNodeId === "perivascular-espongiotica"
              ? translatedLabel.charAt(0).toUpperCase() + translatedLabel.slice(1)
              : translatedLabel;

            return renderImageCard(
              label,
              translateOptionHint(node.id, option, language) || undefined,
              perivascularCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "default",
              undefined,
              "relative !aspect-[3/2] !p-2 bg-[#fffdf8]",
              "hover:!border-[#74324a]/70 hover:!shadow-[0_20px_38px_-22px_rgba(116,50,74,0.38)]",
              language === "pt" ? "Explorar padrão" : "Explore pattern",
            );
          })}
        </div>
      ) : isPerivascularBalonizanteHub ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularBalonizanteCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "thumbnail",
            ),
          )}
        </div>
      ) : isPerivascularEspongioticaHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularEspongioticaCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isEspongioticaApenasHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              espongioticaApenasCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularPsoriasiformeHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularPsoriasiformeCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularSemEpidermeHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularSemEpidermeCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "default",
              option.nextNodeId === "pv-apenas" || option.nextNodeId === "pv-intersticial" ? "scale-[0.95]" : undefined,
            ),
          )}
        </div>
      ) : isPerivascularInterfaceHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularInterfaceCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularInterfaceLiquenoideHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularInterfaceLiquenoideCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularInterfaceVacuolarHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularInterfaceVacuolarCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularInterfaceVacuolarLinfocitosHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularInterfaceVacuolarLinfocitosCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularInterfaceVacuolarLinfocitosBalonizacaoHub ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularInterfaceVacuolarLinfocitosBalonizacaoCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "thumbnail",
            ),
          )}
        </div>
      ) : isPerivascularApenasHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularApenasCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isPerivascularIntersticialHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              perivascularIntersticialCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
            ),
          )}
        </div>
      ) : isNodularDifusaHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              nodularDifusaCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "default",
              "rounded-none object-cover object-center scale-[1.08]",
              "!p-0 bg-white",
            ),
          )}
        </div>
      ) : isNodularLinfocitosHub ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              nodularLinfocitosCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "default",
              "rounded-none object-cover object-center scale-[1.08]",
              "!p-0 bg-white",
            ),
          )}
        </div>
      ) : isNodularHistiocitosHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {node.options.map((option) =>
            renderImageCard(
              translateOptionLabel(node.id, option, language),
              translateOptionHint(node.id, option, language) || undefined,
              nodularHistiocitosCategoryImages[option.nextNodeId],
              () => onNavigate(option.nextNodeId),
              "default",
              "rounded-none object-cover object-center scale-[1.08]",
              "!p-0 bg-white",
            ),
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {node.options.map((option) => (
            <button
              key={`${node.id}-${option.label}`}
              type="button"
              onClick={() => onNavigate(option.nextNodeId)}
              className="group rounded-[22px] border border-sand bg-gradient-to-br from-white to-paper p-4 text-left transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-ink">{translateOptionLabel(node.id, option, language)}</h3>
                  {option.hint ? <p className="text-sm text-steel">{translateOptionHint(node.id, option, language)}</p> : null}
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white transition group-hover:bg-accent">
                  {t("advance")}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function renderImageCard(
  label: string,
  hint: string | undefined,
  imageSrc: string | undefined,
  onClick: () => void,
  size: "default" | "compact" | "thumbnail" = "default",
  imageClassName?: string,
  imageContainerClassName?: string,
  className?: string,
  actionLabel?: string,
) {
  const compact = size === "compact";
  const thumbnail = size === "thumbnail";

  return (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className={`group overflow-hidden border border-sand bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ${
        compact ? "rounded-[20px]" : "rounded-[22px]"
      } ${className ?? ""}`}
    >
      <div
        className={`${
          thumbnail ? "aspect-[4/3] bg-white p-0" : compact ? "aspect-[4/3] bg-paper p-2.5" : "aspect-[5/4] bg-paper p-3"
        } overflow-hidden ${imageContainerClassName ?? ""}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            className={`h-full w-full transition duration-300 group-hover:scale-[1.03] ${
              thumbnail
                ? "rounded-none border-0 object-cover object-center"
                : "rounded-[16px] object-contain object-center"
            } ${imageClassName ?? ""}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-paper text-sm text-steel">{label}</div>
        )}
        {actionLabel ? (
          <span className="pointer-events-none absolute bottom-3 right-3 translate-y-1 rounded-full border border-white/55 bg-[#74324a]/94 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white opacity-0 shadow-md backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {actionLabel} <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
      <div className={`flex items-center justify-center text-center ${thumbnail ? "min-h-[72px] px-4 py-4" : compact ? "min-h-[70px] px-3 py-3" : actionLabel ? "min-h-[74px] px-4 py-3" : "min-h-[84px] px-4 py-4"}`}>
        <div className="space-y-1">
          <h3 className={`${thumbnail ? "text-[0.92rem] leading-6" : compact ? "text-sm leading-5 xl:text-[0.95rem]" : "text-base leading-6"} font-semibold text-ink`}>
            {label}
          </h3>
          {hint ? <p className={`${compact ? "text-xs" : "text-sm"} text-steel`}>{hint}</p> : null}
        </div>
      </div>
    </button>
  );
}
