import { Link } from "react-router-dom";
import { FavoriteToggleButton } from "./FavoriteToggleButton";
import { useLanguage } from "../context/LanguageContext";
import { capitalizeFirstLetter, getTranslatedTerminalLabel, translateList, translateNodeDescription, translateNodeResultTitle } from "../i18n/translations";
import type { AlgorithmNode } from "../types/algorithm";

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
const NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_ID = "group-pv-neutrofilos";
const PMLE_HISTOPATHOLOGY_TARGET_ID = "dx-erupcao-polimorfa-luz";
const LIQUEN_PLANO_HISTOPATHOLOGY_TARGET_ID = "dx-liquen-plano";
const CERATOSE_LIQUENOIDE_HISTOPATHOLOGY_TARGET_ID = "dx-ceratose-liquenoide";
const DERMATOFITOSE_PSORIASIFORME_HISTOPATHOLOGY_TARGET_ID = "dx-psor-dermatofitose";
const MPOX_HISTOPATHOLOGY_TARGET_ID = "group-orf-nodulo-ordenhadores";
const EOSINOPHILIC_DERMATITIS_HISTOPATHOLOGY_TARGET_ID = "placeholder-nodular-eosinofilico";
const LSC_HISTOPATHOLOGY_TARGET_ID = "group-psor-apenas-hiperceratoticos";
const POROKERATOSIS_HISTOPATHOLOGY_TARGET_ID = "dx-poroqueratose-actinica-superficial-disseminada";
const NECROBIOSIS_LIPOIDICA_HISTOPATHOLOGY_TARGET_IDS = ["dx-necrobiose-lipoidica", "dx-necrobiose-lipidica-fibrosante"] as const;
const LIQUEN_NITIDO_HISTOPATHOLOGY_TARGET_ID = "sarcoidico-interface";

export function ResultCard({
  node,
  breadcrumb,
  trail,
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
  const showNeutrophilicUrticarialDermatosisGoldButton = node.id === NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_ID;
  const showNeutrophilicUrticarialDermatosisHistopathologyButton = node.id === NEUTROPHILIC_URTICARIAL_DERMATOSIS_TARGET_ID;
  const showPmleHistopathologyButton = node.id === PMLE_HISTOPATHOLOGY_TARGET_ID;
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
  const showPorokeratosisVariants = node.id === POROKERATOSIS_HISTOPATHOLOGY_TARGET_ID;
  const possibilities = translateList(node.result?.possibilities, language);

  return (
    <section className="rounded-[28px] border border-[#e4d2fb] bg-[linear-gradient(180deg,#ffffff_0%,#fcf9ff_55%,#f7f0ff_100%)] p-6 text-[#835fe0] shadow-[0_30px_68px_-48px_rgba(94,71,150,0.24)]">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b07c15]">{t("final_result")}</p>
            <h2 className="font-serif text-3xl text-[#835fe0] sm:text-4xl">{resultTitle}</h2>
            <p className="max-w-none text-sm leading-6 text-[#835fe0]">{translateNodeDescription(node, language)}</p>
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
              <Link
                to="/dicas-que-valem-ouro"
                state={{ returnToNodeId: node.id, returnTrail: trail }}
                className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-[#ecdca7] bg-[linear-gradient(135deg,#fff9df_0%,#fff3c3_52%,#ffe6aa_100%)] px-5 py-4 text-left text-amber-950 shadow-[0_16px_34px_rgba(217,168,23,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(217,168,23,0.24)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <GoldBarsIcon />
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-amber-900/80">{t("special_content")}</p>
                    <p className="font-serif text-xl leading-tight sm:text-2xl">{t("gold_tips_lupus_classification")}</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#e7cf93] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
                  {t("open")}
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}

        {showRosaceaGoldButton ? <GoldTipsLink to="/dicas-que-valem-ouro/rosacea" nodeId={node.id} /> : null}
        {showNeutrophilicUrticarialDermatosisGoldButton ? (
          <GoldTipsLink
            to="/dicas-que-valem-ouro/dermatose-urticariforme-neutrofilica"
            nodeId={node.id}
            title="Dicas que Valem Ouro: Dermatose Urticariforme Neutrofílica"
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
                <UnderstandBetterLink to="/entenda-melhor/dermatite-neutrofilica-granulomatosa-palicada" nodeId={node.id} />
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
      className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-transparent bg-[linear-gradient(135deg,#ff5b87_0%,#ef4f92_42%,#b45ae6_100%)] px-5 py-4 text-left text-white shadow-[0_18px_34px_rgba(212,77,178,0.26)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(212,77,178,0.34)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <MicroscopeIcon />
        <div className="min-w-0">
          <p className="font-serif text-xl leading-tight text-white sm:text-2xl">{title ? tx(title) : t("histopathology")}</p>
        </div>
      </div>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#ef4f92]" aria-hidden="true" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function GoldTipsLink({ to, nodeId, title }: { to: string; nodeId: string; title?: string }) {
  const { t, tx } = useLanguage();

  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-[#ecdca7] bg-[linear-gradient(135deg,#fff9df_0%,#fff3c3_52%,#ffe6aa_100%)] px-5 py-4 text-left text-amber-950 shadow-[0_16px_34px_rgba(217,168,23,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(217,168,23,0.24)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <GoldBarsIcon />
        <div className="min-w-0">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-amber-900/80">{t("special_content")}</p>
          <p className="font-serif text-xl leading-tight sm:text-2xl">{title ? tx(title) : t("gold_tips")}</p>
        </div>
      </div>
      <span className="rounded-full border border-[#e7cf93] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
        {t("open")}
      </span>
    </Link>
  );
}

function UnderstandBetterLink({ to, nodeId }: { to: string; nodeId: string }) {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-[#ecdca7] bg-[linear-gradient(135deg,#fff9df_0%,#fff3c3_52%,#ffe6aa_100%)] px-5 py-4 text-left text-amber-950 shadow-[0_16px_34px_rgba(217,168,23,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(217,168,23,0.24)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <GoldBarsIcon />
        <div className="min-w-0">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-amber-900/80">{t("special_content")}</p>
          <p className="font-serif text-xl leading-tight sm:text-2xl">{t("understand_better")}</p>
        </div>
      </div>
      <span className="rounded-full border border-[#e7cf93] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
        {t("open")}
      </span>
    </Link>
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

function GoldBarsIcon() {
  return (
    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-[#ecdca7] bg-white/60 shadow-sm">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
        <defs>
          <linearGradient id="gold-bar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <path d="M8 36 24 28l10 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M28 30 44 22l12 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 18 36 10l12 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function MicroscopeIcon() {
  return (
    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-white/25 bg-white/14 shadow-sm">
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






