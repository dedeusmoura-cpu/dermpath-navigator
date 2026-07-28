import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/eosinophilic-granulomatosis-polyangiitis.png";

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
        <><Highlight>Vasculite leucocitoclástica rica em eosinófilos</Highlight>, geralmente na derme superficial e média.</>,
        <>Eosinófilos intersticiais e figuras em chama podem acompanhar o dano vascular.</>,
        <>Granulomas extravasculares podem ocorrer, mas não precisam estar presentes na biópsia cutânea.</>,
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
          title="EGPA (Churg-Strauss)"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: EGPA" image={diagramImage} alt="Vasculite e granuloma ricos em eosinófilos na EGPA" legend={[{ label: "Eosinófilos abundantes", color: "bg-orange-500" }, { label: "Granuloma extravascular", color: "bg-violet-700" }, { label: "Asma / doença pulmonar", color: "bg-sky-600" }]} footer="Asma + eosinofilia + vasculite." />}
          pearl={
            <>
              Diante de LCV com <Highlight>eosinófilos em número significativo</Highlight>, considere EGPA. A confirmação
              depende da combinação com asma, eosinofilia periférica e demais manifestações sistêmicas.
            </>
          }
        />
      </div>
    </Layout>
  );
}
