import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/superficial-thrombophlebitis.png";

const TARGET_NODE_ID = "dx-grandes-vasos-veia-nao-leucocitoclastica";

export function TromboflebiteGoldTipsPage() {
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
        <>Vasculite <Highlight>não leucocitoclástica</Highlight> acometendo veias de grande calibre.</>,
        <>Corresponde clinicamente à <Highlight>tromboflebite superficial migratória</Highlight>, com inflamação e trombose de veias superficiais.</>,
        <>Pode ser idiopática, associada a hipercoagulabilidade ou, quando recorrente, sinal de neoplasia oculta ou doença de Behçet.</>,
        <>Diferencia-se da vasculite leucocitoclástica de grande vaso por não apresentar leucocitoclasia.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Trombo organizando-se</Highlight> na luz de veia de grande calibre, com inflamação da parede venosa.</>,
        <>Infiltrado inflamatório misto (neutrófilos, linfócitos, histiócitos) sem leucocitoclasia proeminente nem necrose fibrinoide.</>,
        <>Reação inflamatória perivenosa acompanhando a trombose.</>,
        <>Recanalização e fibrose da parede nas lesões mais antigas.</>,
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
        <><Highlight>Cordão linear</Highlight>, eritematoso, doloroso e endurecido ao longo do trajeto de uma veia superficial.</>,
        <>Frequentemente nos membros inferiores; pode ser <Highlight>migratória e recorrente</Highlight> em diferentes topografias.</>,
        <>Ausência de sinais sistêmicos importantes na forma isolada; investigar quando recorrente.</>,
        <>Diferencial clínico com paniculite e outras causas de nódulo/cordão doloroso.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Investigar trombofilias, síndrome antifosfolípide, uso de cateter/trauma local.</>,
        <>Tromboflebite migratória recorrente: rastrear <Highlight>neoplasia oculta</Highlight> (pâncreas, pulmão, TGI) e doença de Behçet.</>,
        <>Ultrassom Doppler para avaliar extensão e excluir trombose venosa profunda associada.</>,
        <>Tratamento: anti-inflamatórios, compressão, anticoagulação conforme risco; tratar causa de base.</>,
      ],
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-[100rem] space-y-4">
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
          title="Tromboflebite"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: veia trombosada" image={diagramImage} alt="Tromboflebite superficial com trombo organizado e recanalização" legend={[{ label: "Trombo venoso organizado", color: "bg-red-700" }, { label: "Inflamação da parede", color: "bg-violet-700" }, { label: "Recanalização", color: "bg-sky-600" }]} footer="Cordão linear segue o trajeto venoso." />}
          pearl={
            <>
              Tromboflebite <Highlight>migratória e recorrente</Highlight> deve sempre levantar a suspeita de neoplasia
              oculta (síndrome de Trousseau).
            </>
          }
        />
      </div>
    </Layout>
  );
}
