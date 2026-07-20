import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-chapel-hill-granulomatose-poliangiite-eosinofilia-limitada-pele";

export function GranulomatosePoliangiteEosinofiliaGoldTipsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? TARGET_NODE_ID;

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "conceito",
      number: "1",
      color: "green",
      title: "Conceito",
      icon: <BookIcon />,
      bullets: [
        <>Vasculite ANCA-associada (ANCA-negativa ou p-ANCA/anti-MPO em ~50%) de pequenos e médios vasos.</>,
        <>Evolução em <Highlight>3 fases</Highlight>: prodrômica alérgica (asma/rinite), eosinofílica e vasculítica.</>,
        <><Highlight>Granulomas extravasculares</Highlight> ricos em eosinófilos são marca histológica.</>,
        <>Pode ser desencadeada por inibidores de leucotrienos, omalizumabe ou retirada rápida de corticoide.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Infiltrado rico em <Highlight>eosinófilos</Highlight>, granulomas extravasculares e vasculite necrosante de pequenos a médios vasos.</>,
        <>Lesões papulonecróticas mostram dermatite neutrofílica/eosinofílica em paliçada com necrobiose.</>,
        <>Acomete tanto artérias quanto veias.</>,
        <>Vasculite cutânea leucocitoclástica nas lesões purpúricas.</>,
      ],
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "pistas-clinicas",
      number: "2",
      color: "blue",
      title: "Pistas clínicas",
      icon: <StethoscopeIcon />,
      bullets: [
        <><Highlight>Asma grave</Highlight> de longa data, precedendo em anos o quadro vasculítico; rinossinusite e pólipos nasais.</>,
        <><Highlight>Eosinofilia periférica</Highlight> marcante (≥1500/µL ou ≥10%) e IgE elevada.</>,
        <>Mononeurite múltipla em até 75% dos pacientes.</>,
        <>Envolvimento cardíaco (miocardite/pericardite) é a principal causa de óbito.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Pesquisar <Highlight>asma, rinossinusite, eosinofilia e IgE</Highlight> — tríade fundamental para suspeita.</>,
        <>ANCA positivo em ~50% (predomínio p-ANCA/anti-MPO); associado a maior risco renal/neurológico.</>,
        <>ANCA-negativos têm mais cardiomiopatia e infiltrados pulmonares.</>,
        <>Corticoide isolado responde em &gt;90%; casos graves associam ciclofosfamida/rituximabe; <Highlight>mepolizumabe</Highlight> na doença não grave recidivante.</>,
      ],
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={goBackToDiagnosis}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {t("return_to_diagnosis")}
          </button>
          <Link
            to="/diagnostico"
            className="rounded-full border border-sand bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-[#fffaf0]"
          >
            {t("back")}
          </Link>
          <FavoriteToggleButton nodeId={favoriteNodeId} />
        </div>

        <StudyNoteCard
          title="Granulomatose com poliangite e eosinofilia (Churg-Strauss)"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Asma + eosinofilia periférica + vasculite = tríade da EGPA.</>}
          pearl={
            <>
              Pense em EGPA sempre que um paciente <Highlight>asmático de longa data</Highlight> desenvolver púrpura ou
              mononeurite múltipla.
            </>
          }
          source={
            <>
              <span className="font-semibold">Fonte:</span> Bolognia et al. <em>Dermatology</em>. Capítulo: Cutaneous Vasculitis.
            </>
          }
        />
      </div>
    </Layout>
  );
}
