import { Link } from "react-router-dom";
import { FavoriteToggleButton } from "./FavoriteToggleButton";
import { useLanguage } from "../context/LanguageContext";
import { capitalizeFirstLetter, getTranslatedTerminalLabel, translateList, translateNodeDescription, translateNodeResultTitle } from "../i18n/translations";
import type { AlgorithmNode } from "../types/algorithm";
import { buildPathToNode } from "../utils/tree";

interface ResultCardProps {
  node: AlgorithmNode;
  breadcrumb: string;
  trail: string[];
  favorite: boolean;
  onToggleFavorite: (nodeId: string) => void;
  onBack: () => void;
  onRestart: () => void;
  onCopy: () => void;
  onExport: () => void;
}

const GOLD_TIPS_TARGET_TITLE = "Membrana basal espessada / interface borrada / epiderme afinada";
const ROSACEA_GOLD_TIPS_TARGET_TITLE = "Rosácea granulomatosa";
const PRP_HISTOPATHOLOGY_TARGET_ID = "dx-pitiríase-rubra-pilar";
const PALISADED_DERMATITIS_TARGET_ID = "group-intersticial-outros";
const NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_IDS = ["group-pv-neutrofilos", "dx-pvi-dun"];
const PMLE_HISTOPATHOLOGY_TARGET_ID = "dx-erupcao-polimorfa-luz";
const LUPUS_TUMIDO_HISTOPATHOLOGY_TARGET_ID = "dx-lupus-tumido";
const LIQUEN_PLANO_HISTOPATHOLOGY_TARGET_ID = "dx-liquen-plano";
const CERATOSE_LIQUENOIDE_HISTOPATHOLOGY_TARGET_ID = "dx-ceratose-liquenoide";
const DERMATOFITOSE_PSORIASIFORME_HISTOPATHOLOGY_TARGET_ID = "dx-psor-dermatofitose";
const MPOX_HISTOPATHOLOGY_TARGET_ID = "group-orf-nodulo-ordenhadores";
const EOSINOPHILIC_DERMATITIS_HISTOPATHOLOGY_TARGET_ID = "placeholder-nodular-eosinofilico";
const LSC_HISTOPATHOLOGY_TARGET_ID = "group-psor-apenas-hiperceratoticos";
const POROKERATOSIS_HISTOPATHOLOGY_TARGET_ID = "dx-poroqueratose-actinica-superficial-disseminada";
const NECROBIOSIS_LIPOIDICA_HISTOPATHOLOGY_TARGET_IDS = ["dx-necrobiose-lipoidica", "dx-necrobiose-lipidica-fibrosante"] as const;
const LIQUEN_NITIDO_HISTOPATHOLOGY_TARGET_ID = "sarcoidico-interface";
const PRURIGO_PIGMENTOSO_TARGET_ID = "dx-prurigo-pigmentoso";
const ERITEMA_ANULAR_CENTRIFUGO_TARGET_ID = "dx-esp-eritema-anular";
const VASCULITE_LC_TARGET_ID = "dx-vasculite-lc";
const VASCULITE_SEPTICA_TARGET_ID = "dx-vasculite-septica";
const VASCULOPATIA_LIVEDOIDE_TARGET_ID = "dx-vasculopatia-livedoide";
const PERNIOSE_LES_TARGET_ID = "dx-perniose-epifenomeno-les";
const VASCULITES_TORPIDAS_TARGET_ID = "dx-venulas-granuloma-facial-eritema-elevatum";
const POLIANGITE_MICROSCOPICA_TARGET_IDS: string[] = [
  "dx-chapel-hill-poliangiite-microscopica-limitada-pele",
  "dx-chapel-hill-poliangiite-microscopica-ifd-negativa",
];
const GPA_WEGENER_TARGET_IDS: string[] = [
  "dx-chapel-hill-granulomatose-poliangiite-wegener-limitada-pele",
  "dx-chapel-hill-granulomatose-poliangiite-wegener-ifd-negativa",
  "dx-grandes-vasos-veia-leucocitoclastica",
];
const EGPA_TARGET_IDS: string[] = [
  "dx-chapel-hill-granulomatose-poliangiite-eosinofilia-limitada-pele",
  "dx-chapel-hill-granulomatose-poliangiite-eosinofilia-ifd-negativa",
];
const CRIOGLOBULINEMICA_TARGET_ID = "dx-chapel-hill-vasculite-crioglobulinemica";
const IGA_HSP_TARGET_ID = "dx-chapel-hill-vasculite-iga-henoch-schonlein";
const URTICARIAL_HIPOCOMPLEMENTEMICA_TARGET_ID = "dx-chapel-hill-vasculite-urticarial-hipocomplementemica";
const IGM_IGG_TARGET_ID = "dx-chapel-hill-vasculite-cutanea-igm-igg";
const TROMBOFLEBITE_TARGET_ID = "dx-grandes-vasos-veia-nao-leucocitoclastica";
const PAN_VASCULITE_TARGET_ID = "dx-grandes-vasos-arteria-leucocitoclastica";
const VASCULITE_NODULAR_TARGET_ID = "dx-grandes-vasos-arteria-nao-leucocitoclastica";

export function ResultCard({
  node,
  breadcrumb,
  favorite,
  onToggleFavorite,
  onBack,
  onRestart,
  onCopy,
  onExport,
}: ResultCardProps) {
  const { language, t, tx } = useLanguage();
  const resultTitle = translateNodeResultTitle(node, language);
  const showLupusGoldButton = translateNodeResultTitle(node, language) === tx(GOLD_TIPS_TARGET_TITLE);
  const showRosaceaGoldButton = translateNodeResultTitle(node, language) === tx(ROSACEA_GOLD_TIPS_TARGET_TITLE);
  const showPrpHistopathologyButton = node.id === PRP_HISTOPATHOLOGY_TARGET_ID;
  const showUnderstandBetterButton = node.id === PALISADED_DERMATITIS_TARGET_ID;
  const showPalisadedHistopathologyButton = node.id === PALISADED_DERMATITIS_TARGET_ID;
  const showNeutrophilicUrticarialDermatosisGoldButton = NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_IDS.includes(node.id);
  const showNeutrophilicUrticarialDermatosisHistopathologyButton = NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_IDS.includes(node.id);
  const showPmleHistopathologyButton = node.id === PMLE_HISTOPATHOLOGY_TARGET_ID;
  const showLupusTumidoHistopathologyButton = node.id === LUPUS_TUMIDO_HISTOPATHOLOGY_TARGET_ID;
  const showLiquenPlanoHistopathologyButton = node.id === LIQUEN_PLANO_HISTOPATHOLOGY_TARGET_ID;
  const showCeratoseLiquenoideHistopathologyButton = node.id === CERATOSE_LIQUENOIDE_HISTOPATHOLOGY_TARGET_ID;
  const showDermatofitosePsoriasiformeHistopathologyButton = node.id === DERMATOFITOSE_PSORIASIFORME_HISTOPATHOLOGY_TARGET_ID;
  const showMpoxHistopathologyButton = node.id === MPOX_HISTOPATHOLOGY_TARGET_ID;
  const showEosinophilicDermatitisHistopathologyButton = node.id === EOSINOPHILIC_DERMATITIS_HISTOPATHOLOGY_TARGET_ID;
  const showLscHistopathologyButton = node.id === LSC_HISTOPATHOLOGY_TARGET_ID;
  const showPorokeratosisHistopathologyButton = node.id === POROKERATOSIS_HISTOPATHOLOGY_TARGET_ID;
  const showNecrobiosisLipoidicaHistopathologyButton = NECROBIOSIS_LIPOIDICA_HISTOPATHOLOGY_TARGET_IDS.includes(
    node.id as (typeof NECROBIOSIS_LIPOIDICA_HISTOPATHOLOGY_TARGET_IDS)[number],
  );
  const showLiquenNitidoHistopathologyButton = node.id === LIQUEN_NITIDO_HISTOPATHOLOGY_TARGET_ID;
  const showPrurigo = node.id === PRURIGO_PIGMENTOSO_TARGET_ID;
  const showEritemaAnularCentrifugo = node.id === ERITEMA_ANULAR_CENTRIFUGO_TARGET_ID;
  const showVasculiteLcTomeNotaButton = node.id === VASCULITE_LC_TARGET_ID || node.id === "dx-pvi-vasculite";
  const isDermatitisTerminal = buildPathToNode(node.id).some((item) => item.id === "dermatite");
  const showVasculiteSepticaButton = node.id === VASCULITE_SEPTICA_TARGET_ID;
  const showVasculopatiaLivedoideButton = node.id === VASCULOPATIA_LIVEDOIDE_TARGET_ID;
  const showPernioseLesButton = node.id === PERNIOSE_LES_TARGET_ID;
  const showVasculitesTorpidasButtons = node.id === VASCULITES_TORPIDAS_TARGET_ID;
  const showPoliangiteMicroscopicaButton = POLIANGITE_MICROSCOPICA_TARGET_IDS.includes(node.id);
  const showGpaWegenerButton = GPA_WEGENER_TARGET_IDS.includes(node.id);
  const showEgpaButton = EGPA_TARGET_IDS.includes(node.id);
  const showCrioglobulinemicaButton = node.id === CRIOGLOBULINEMICA_TARGET_ID;
  const showIgaHspButton = node.id === IGA_HSP_TARGET_ID;
  const showUrticarialHipocomplementemicaButton = node.id === URTICARIAL_HIPOCOMPLEMENTEMICA_TARGET_ID;
  const showIgmIggButton = node.id === IGM_IGG_TARGET_ID;
  const showTromboflebiteButton = node.id === TROMBOFLEBITE_TARGET_ID;
  const showPanVasculiteButton = node.id === PAN_VASCULITE_TARGET_ID;
  const showVasculiteNodularButton = node.id === VASCULITE_NODULAR_TARGET_ID;
  const showPorokeratosisVariants = node.id === POROKERATOSIS_HISTOPATHOLOGY_TARGET_ID;
  const possibilities = translateList(node.result?.possibilities, language);

  return (
    <section className="rounded-[28px] border border-[#e4d2fb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf9ff_55%,#f7f0ff_100%)] p-6 text-[#835fe0] shadow-[0_30px_68px_-48px_rgba(94,71,150,0.24)]">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b07c15]">{t("final_result")}</p>
            <h2 className="font-serif text-3xl text-[#835fe0] sm:text-4xl">{resultTitle}</h2>
            {node.description ? (
              <p className="max-w-none text-sm leading-6 text-[#835fe0]">{translateNodeDescription(node, language)}</p>
            ) : null}
          </div>
          <div className="flex flex-none items-start gap-3">
            <span className="inline-flex w-fit rounded-full border border-[#e4d2fb] bg-white px-4 py-2 text-sm font-semibold text-[#835fe0] shadow-sm">
              {getTranslatedTerminalLabel(node.type, language)}
            </span>
            <FavoriteToggleButton
              nodeId={node.id}
              favorite={favorite}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        </div>

        {showPrurigo ? (
          <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-1">{tx("Pista clínico-patológica")}</p>
            <p className="text-sm leading-6 text-amber-900">{tx("Lesões pruriginosas papulovesiculosas/urticariformes em padrão reticulado, evoluindo com hiperpigmentação reticulada.")}</p>
          </div>
        ) : null}

        {showEritemaAnularCentrifugo ? (
          <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-1">{tx("Dica")}</p>
            <p className="text-sm leading-6 text-amber-900">{tx("Diante de uma lesão anular, especialmente se as hipóteses clínicas forem granuloma anular, hanseníase tuberculoide, tínea corporal ou lúpus cutâneo subagudo, lembre-se de considerar eritema anular centrífugo (EAC) no diagnóstico diferencial.")}</p>
          </div>
        ) : null}

        {possibilities.length ? (
          <div className="space-y-4 rounded-[22px] border border-[#e4d2fb] bg-white/82 p-5 shadow-[0_20px_38px_-34px_rgba(97,72,153,0.22)]">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#b07c15]">
                {t("diagnostic_possibilities")}
              </h3>
              <ul className="space-y-3 text-sm text-[#835fe0]">
                {possibilities.map((item) => {
                  const separatorIndex = item.indexOf("||");
                  const titleSource = separatorIndex === -1 ? item : item.slice(0, separatorIndex).trim();
                  const title = capitalizeFirstLetter(titleSource);
                  const description = separatorIndex === -1 ? "" : item.slice(separatorIndex + 2).trim();

                  return (
                    <li key={item} className="leading-6">
                      <span className="mr-2 text-[#a26de1]">{"\u2022"}</span>
                      <span className="font-semibold text-[#835fe0]">{title}</span>
                      {description ? <p className="mt-1 pl-5 text-[#835fe0]">{description}</p> : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            {showLupusGoldButton ? (
              <TomeNotaLink to="/tome-nota/lupus-cutaneo" nodeId={node.id} title="Classificação do Lúpus Cutâneo" />
            ) : null}
          </div>
        ) : null}

        {showRosaceaGoldButton ? <TomeNotaLink to="/tome-nota/rosacea" nodeId={node.id} title="Classificação da Rosácea" /> : null}
        {isDermatitisTerminal &&
        !showLupusGoldButton &&
        !showRosaceaGoldButton &&
        !showNeutrophilicUrticarialDermatosisGoldButton &&
        !showVasculiteLcTomeNotaButton &&
        !showVasculiteSepticaButton &&
        !showVasculopatiaLivedoideButton &&
        !showPernioseLesButton &&
        !showVasculitesTorpidasButtons &&
        !showPoliangiteMicroscopicaButton &&
        !showGpaWegenerButton &&
        !showEgpaButton &&
        !showCrioglobulinemicaButton &&
        !showIgaHspButton &&
        !showUrticarialHipocomplementemicaButton &&
        !showIgmIggButton &&
        !showTromboflebiteButton &&
        !showPanVasculiteButton &&
        !showVasculiteNodularButton &&
        !showUnderstandBetterButton ? (
          <TomeNotaLink
            to={`/tome-nota/dermatites/${encodeURIComponent(node.id)}`}
            nodeId={node.id}
            title={resultTitle}
          />
        ) : null}
        {showVasculiteLcTomeNotaButton ? (
          <TomeNotaLink
            to="/tome-nota/vasculite-leucocitoclastica"
            nodeId={node.id}
            title="Vasculite Leucocitoclástica"
          />
        ) : null}
        {showVasculiteSepticaButton ? (
          <TomeNotaLink to="/tome-nota/vasculite-septica" nodeId={node.id} title="Vasculite Séptica" />
        ) : null}
        {showVasculopatiaLivedoideButton ? (
          <TomeNotaLink to="/tome-nota/vasculopatia-livedoide" nodeId={node.id} title="Vasculopatia Livedoide" />
        ) : null}
        {showPernioseLesButton ? (
          <TomeNotaLink to="/tome-nota/perniose-epifenomeno-les" nodeId={node.id} title="Perniose / Epifenômeno no LES" />
        ) : null}
        {showVasculitesTorpidasButtons ? (
          <div className="flex flex-wrap items-stretch gap-4">
            <div className="min-w-[260px] flex-1 [&>a]:h-full [&>a]:min-h-[104px]">
              <TomeNotaLink to="/tome-nota/granuloma-facial" nodeId={node.id} title="Granuloma Facial" compact />
            </div>
            <div className="min-w-[260px] flex-1 [&>a]:h-full [&>a]:min-h-[104px]">
              <TomeNotaLink to="/tome-nota/eritema-elevatum-diutinum" nodeId={node.id} title="Eritema Elevatum Diutinum" compact />
            </div>
          </div>
        ) : null}
        {showPoliangiteMicroscopicaButton ? (
          <TomeNotaLink to="/tome-nota/poliangite-microscopica" nodeId={node.id} title="Poliangite Microscópica" />
        ) : null}
        {showGpaWegenerButton ? (
          <TomeNotaLink
            to="/tome-nota/granulomatose-poliangiite-wegener"
            nodeId={node.id}
            title="Granulomatose com Poliangite (Wegener)"
          />
        ) : null}
        {showEgpaButton ? (
          <TomeNotaLink
            to="/tome-nota/granulomatose-poliangiite-eosinofilia"
            nodeId={node.id}
            title="Granulomatose com Poliangite e Eosinofilia (Churg-Strauss)"
          />
        ) : null}
        {showCrioglobulinemicaButton ? (
          <TomeNotaLink to="/tome-nota/vasculite-crioglobulinemica" nodeId={node.id} title="Vasculite Crioglobulinêmica" />
        ) : null}
        {showIgaHspButton ? (
          <TomeNotaLink to="/tome-nota/vasculite-iga-henoch-schonlein" nodeId={node.id} title="Vasculite por IgA (Henoch-Schönlein)" />
        ) : null}
        {showUrticarialHipocomplementemicaButton ? (
          <TomeNotaLink
            to="/tome-nota/vasculite-urticarial-hipocomplementemica"
            nodeId={node.id}
            title="Vasculite Urticarial Hipocomplementêmica"
          />
        ) : null}
        {showIgmIggButton ? (
          <TomeNotaLink to="/tome-nota/vasculite-cutanea-igm-igg" nodeId={node.id} title="Vasculite Cutânea por IgM/IgG" />
        ) : null}
        {showTromboflebiteButton ? (
          <TomeNotaLink to="/tome-nota/tromboflebite" nodeId={node.id} title="Tromboflebite" />
        ) : null}
        {showPanVasculiteButton ? (
          <TomeNotaLink to="/tome-nota/poliarterite-nodosa-vasculite" nodeId={node.id} title="Poliarterite Nodosa" />
        ) : null}
        {showVasculiteNodularButton ? (
          <TomeNotaLink to="/tome-nota/vasculite-nodular" nodeId={node.id} title="Vasculite Nodular" />
        ) : null}
        {showNeutrophilicUrticarialDermatosisGoldButton ? (
          <TomeNotaLink
            to="/tome-nota/dermatose-urticariforme-neutrofilica"
            nodeId={node.id}
            title="Dermatose Urticariforme Neutrofílica"
          />
        ) : null}
        {showNeutrophilicUrticarialDermatosisHistopathologyButton ? (
          <HistopathologyLink
            to="/histopatologico/dermatose-urticariforme-neutrofilica"
            nodeId={node.id}
            title="Histopatológico: Dermatose Urticariforme Neutrofílica"
          />
        ) : null}
        {showPmleHistopathologyButton ? <HistopathologyLink to="/histopatologico/erupcao-polimorfa-a-luz" nodeId={node.id} /> : null}
        {showLupusTumidoHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/lupus-tumido" nodeId={node.id} title="Histopatológico: Lúpus túmido" />
        ) : null}
        {showPrpHistopathologyButton ? <HistopathologyLink to="/histopatologico/prp" nodeId={node.id} /> : null}
        {showLiquenPlanoHistopathologyButton ? <HistopathologyLink to="/histopatologico/liquen-plano" nodeId={node.id} /> : null}
        {showCeratoseLiquenoideHistopathologyButton ? <HistopathologyLink to="/histopatologico/ceratose-liquenoide" nodeId={node.id} /> : null}
        {showDermatofitosePsoriasiformeHistopathologyButton ? <HistopathologyLink to="/histopatologico/dermatofitose" nodeId={node.id} /> : null}
        {showMpoxHistopathologyButton ? <HistopathologyLink to="/histopatologico/mpox" nodeId={node.id} title="Histopatológico: MPox" /> : null}
        {showEosinophilicDermatitisHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/dermatite-eosinofilica" nodeId={node.id} title="Histopatológico: Dermatite Eosinofílica" />
        ) : null}
        {showLscHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/liquen-simples-cronico" nodeId={node.id} title="Histopatológico: Líquen Simples Crônico" />
        ) : null}
        {showPorokeratosisHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/poroceratose" nodeId={node.id} title="Histopatológico: Poroceratose" />
        ) : null}
        {showNecrobiosisLipoidicaHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/necrobiose-lipoidica" nodeId={node.id} title="Histopatológico: Necrobiose lipoídica" />
        ) : null}

        {showUnderstandBetterButton || showPalisadedHistopathologyButton ? (
          <div className="flex flex-wrap items-stretch gap-4">
            {showUnderstandBetterButton ? (
              <div className="min-w-[260px] flex-1 [&>a]:h-full [&>a]:min-h-[104px]">
                <TomeNotaLink
                  to="/tome-nota/dermatite-neutrofilica-granulomatosa-palicada"
                  nodeId={node.id}
                  title="Dermatite Neutrofílica e Granulomatosa de Paliçada"
                  compact
                />
              </div>
            ) : null}
            {showPalisadedHistopathologyButton ? (
              <div className="min-w-[260px] flex-1 [&>a]:h-full [&>a]:min-h-[104px]">
                <HistopathologyLink to="/histopatologico/dermatite-neutrofilica-granulomatosa-palicada" nodeId={node.id} />
              </div>
            ) : null}
          </div>
        ) : null}

        {showPorokeratosisVariants ? (
          <section className="rounded-[22px] border border-[#e4d2fb] bg-white/82 p-5 shadow-[0_20px_38px_-34px_rgba(97,72,153,0.22)]">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#b07c15]">{tx("Variantes clínico-patológicas")}</h3>
            <div className="space-y-3 text-sm leading-6 text-[#835fe0]">
              {[
                ["Poroceratose actínica superficial disseminada (DSAP)", "múltiplas pápulas ou pequenas placas anulares, predominando em braços, pernas, ombros e costas."],
                ["Poroceratose de Mibelli", "lesões únicas ou múltiplas, geralmente maiores, localizadas no tronco ou nos membros."],
                ["Poroceratose linear", "lesões com distribuição linear, podendo lembrar a DSAP, porém dispostas em linha."],
                ["Poroceratose palmar-plantar disseminada", "acomete palmas das mãos e plantas dos pés, podendo disseminar-se para tronco, membros e membranas mucosas."],
                ["Poroceratose puntiforme", "múltiplas pápulas queratóticas puntiformes, em “semente”, localizadas nas palmas das mãos e plantas dos pés."],
                ["Poroceratose ptychotrópica", "acomete preferencialmente as nádegas e a região perianal."],
                ["Poroceratose penoescrotal", "localizada no corpo do pênis e na porção anterior do escroto."],
                ["Poroceratose folicular", "acomete preferencialmente a face."],
                ["Poroceratoma", "lesão geralmente solitária, mais comum nos membros."],
              ].map(([title, description]) => (
                <p key={title}>
                  <span className="font-semibold text-[#835fe0]">{tx(title)}:</span> {tx(description)}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        {showLiquenNitidoHistopathologyButton ? (
          <HistopathologyLink to="/histopatologico/liquen-nitido" nodeId={node.id} title="Histopatológico: Líquen nítido" />
        ) : null}

        <div className="rounded-[22px] border border-[#e4d2fb] bg-white/82 p-5 shadow-[0_20px_38px_-34px_rgba(97,72,153,0.22)]">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#b07c15]">
            {t("diagnostic_pathway")}
          </h3>
          <p className="text-sm leading-6 text-[#835fe0]">{breadcrumb}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ActionButton label={t("back")} onClick={onBack} />
          <ActionButton label={t("restart")} onClick={onRestart} />
          <ActionButton label={t("copy_path")} onClick={onCopy} />
          <ActionButton label={t("export_text")} onClick={onExport} />
        </div>
      </div>
    </section>
  );
}

function HistopathologyLink({ to, nodeId, title }: { to: string; nodeId: string; title?: string }) {
  const { t, tx } = useLanguage();

  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[22px] border border-[#d6b766]/45 bg-[radial-gradient(circle_at_top_left,_rgba(214,183,102,0.24),_transparent_34%),linear-gradient(135deg,#082d5c_0%,#0a4a86_62%,#1268a5_100%)] px-5 py-4 text-left text-white shadow-[0_18px_36px_-18px_rgba(8,45,92,0.72)] transition duration-200 hover:-translate-y-0.5 hover:border-[#e1c77e]/75 hover:shadow-[0_24px_44px_-18px_rgba(8,45,92,0.82)]"
    >
      <span className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full border border-white/10 bg-white/[0.04]" aria-hidden="true" />
      <div className="flex min-w-0 items-center gap-4">
        <MicroscopeIcon />
        <div className="min-w-0">
          <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#e1c77e]">{t("didactic_slides")}</p>
          <p className="font-serif text-xl leading-tight text-white sm:text-2xl">{title ? tx(title) : t("histopathology")}</p>
        </div>
      </div>
      <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-full border border-white/30 bg-[#d6b766] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.55)] transition group-hover:bg-[#e1c77e]">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#082d5c]" aria-hidden="true" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function TomeNotaLink({ to, nodeId, title, compact = false }: { to: string; nodeId: string; title?: string; compact?: boolean }) {
  const { t, tx } = useLanguage();

  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[24px] border border-[#ead48b] bg-[repeating-linear-gradient(to_bottom,#fffef7_0px,#fffef7_31px,#e8edf5_32px)] px-5 py-5 text-left text-[#102b61] shadow-[0_16px_34px_rgba(70,85,118,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-[#dfbf55] hover:shadow-[0_22px_40px_rgba(70,85,118,0.18)] sm:px-7 sm:py-6"
    >
      <div className={`flex min-w-0 items-center ${compact ? "gap-4" : "gap-5 sm:gap-7"}`}>
        <span className="-rotate-6 transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-[1.03]">
          <TomeNotaIcon compact={compact} />
        </span>
        <div className="min-w-0">
          <div className="relative inline-block">
            <MotionTicks className="absolute -left-7 -top-3 h-7 w-7 text-[#ff5b4d] sm:-left-9 sm:-top-5 sm:h-9 sm:w-9" />
            <p className={`whitespace-nowrap font-hand font-bold leading-none tracking-[-0.02em] text-[#102b61] ${compact ? "text-[1.8rem] sm:text-[2rem]" : "text-[2rem] sm:text-[2.65rem]"}`}>
              {t("tome_nota")}
            </p>
            <RedSquiggle className="mt-1 h-2.5 w-full text-[#ff5b4d] sm:h-3" />
          </div>
          <p className="mt-1 truncate font-serif text-base text-[#33476d]/75 sm:text-lg">{title ? tx(title) : ""}</p>
        </div>
      </div>
      <span className={`${compact ? "hidden" : "flex-none"} rounded-full border border-[#dfc267] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6d1a] transition group-hover:bg-[#fff5c9]`}>
        {t("open")}
      </span>
    </Link>
  );
}

function MotionTicks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 17 2.5 19M10 11 6 6M16 8l-1-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function RedSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M2 9 Q 44 2, 88 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[#e7dbf6] bg-white px-4 py-2 text-sm font-semibold text-[#1b2335] transition hover:bg-[#fcf8ff]"
    >
      {label}
    </button>
  );
}

function TomeNotaIcon({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`relative flex flex-none items-center justify-center rounded-md border border-[#e5c96e] bg-[linear-gradient(145deg,#fff7cf,#f9e8a5)] shadow-[0_10px_16px_rgba(73,61,24,0.22)] ${compact ? "h-[4.75rem] w-[4.5rem]" : "h-[4.75rem] w-[4.5rem] sm:h-[6.4rem] sm:w-24"}`}>
      <span className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-3 border border-[#ddc47c]/70 bg-[#f4e2b3]/90 shadow-sm sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#16356f] sm:h-14 sm:w-14" fill="none" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.44 1 1.1 1 1.9v.7h5v-.7c0-.8.4-1.46 1-1.9A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 19h4M10.5 21h3M12 7v4M9.5 9.5l2.5 1.5 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function MicroscopeIcon() {
  return (
    <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-[#e1c77e]/45 bg-white/10 shadow-sm backdrop-blur-sm">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true" fill="none">
        <path d="M25 10h10l4 8-10 6-4-8Z" fill="white" fillOpacity="0.92" />
        <path d="m39 18 5 5-9 9-5-5" fill="white" fillOpacity="0.82" />
        <path d="M20 28c0-3.3 2.7-6 6-6h2v7l-5 5a8 8 0 0 0-2-6Z" fill="white" fillOpacity="0.72" />
        <path d="M31 34a10 10 0 0 1 10 10v2H23v-2a8 8 0 0 1 8-8Z" fill="white" fillOpacity="0.92" />
        <path d="M18 50h28" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M46 50h4" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 50h2" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <circle cx="43" cy="37" r="5" fill="white" fillOpacity="0.85" />
      </svg>
    </span>
  );
}
