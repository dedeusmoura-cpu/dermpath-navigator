import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-chapel-hill-poliangiite-microscopica-limitada-pele";

export function PoliangiteMicroscopicaGoldTipsPage() {
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
        <>Vasculite sistêmica <Highlight>ANCA-associada</Highlight> (&gt;90% p-ANCA/anti-MPO) de pequenos e médios vasos.</>,
        <>Ausência de <Highlight>inflamação granulomatosa</Highlight> (diferencia da GPA).</>,
        <>Acomete principalmente pele, pulmão e rim.</>,
        <>Patogênese pauci-imune: ANCA ativa neutrófilos que lesam diretamente a parede vascular.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite necrosante segmentar de <Highlight>pequenos vasos</Highlight> (capilares, vênulas, arteríolas).</>,
        <>Pode acometer artérias de pequeno/médio calibre.</>,
        <><Highlight>Ausência de granulomas</Highlight> — achado-chave que diferencia de GPA.</>,
        <>Padrão de vasculite leucocitoclástica clássica na pele.</>,
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
        <>Púrpura palpável e petéquias; <Highlight>livedo racemoso</Highlight> mais comum que na GPA/EGPA.</>,
        <><Highlight>Glomerulonefrite necrosante pauci-imune</Highlight> em quase todos os pacientes (&gt;90%).</>,
        <>Capilarite pulmonar com hemorragia alveolar difusa (30–50%).</>,
        <>Mononeurite múltipla; ausência de sintomas sinonasais (diferencia de GPA).</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>ANCA positivo em &gt;90%: <Highlight>anti-MPO/p-ANCA</Highlight> (55–65%) &gt; anti-PR3 (20–30%).</>,
        <>Avaliar função renal, sedimento urinário e imagem pulmonar (TC de tórax).</>,
        <>Diferencial: GPA (granulomas, doença sinonasal), PAN (sem glomerulonefrite, ANCA negativa), EGPA (asma, eosinofilia).</>,
        <>Tratamento: corticoide + rituximabe ou ciclofosfamida na indução.</>,
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
          title="Poliangite microscópica"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Vasculite de pequenos vasos + glomerulonefrite + ausência de granulomas e de sintomas sinonasais = pense em MPA.</>}
          pearl={
            <>
              MPA é a <Highlight>"irmã sem granulomas"</Highlight> da GPA — mesma gravidade renal e pulmonar, sem a via aérea
              superior destrutiva.
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
