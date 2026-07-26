import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/leukocytoclastic-vasculitis.png";

const TARGET_NODE_ID = "dx-vasculite-lc";

export function VasculiteLeucocitoclasticaGoldTipsPage() {
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
        <>Padrão de vasculite de <Highlight>pequenos vasos</Highlight> da derme.</>,
        <>Acomete principalmente <Highlight>vênulas pós-capilares</Highlight>.</>,
        <>"Leucocitoclástica" é <Highlight>termo histopatológico</Highlight>.</>,
        <>Nem toda LCV = vasculite cutânea isolada.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Infiltrado <Highlight>neutrofílico transmural</Highlight> em pequenos vasos.</>,
        <><Highlight>Leucocitoclasia</Highlight> ("poeira nuclear").</>,
        <><Highlight>Necrose fibrinoide</Highlight> da parede vascular.</>,
        <><Highlight>Extravasamento de hemácias</Highlight> e dano endotelial.</>,
        <>Lesão tardia (<Highlight>&gt;48–72h</Highlight>): infiltrado mais mononuclear.</>,
        <><Highlight>DIF</Highlight> em lesão recente; <Highlight>IgA</Highlight> favorece vasculite por IgA.</>,
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
        <><Highlight>Púrpura palpável</Highlight> é a lesão clássica.</>,
        <>Predomínio em <Highlight>membros inferiores/áreas dependentes</Highlight>.</>,
        <>Pode haver <Highlight>petéquias, máculas purpúricas, vesículas ou urticas</Highlight>.</>,
        <><Highlight>Ardor/prurido</Highlight>; às vezes artralgia e febre baixa.</>,
        <>Costuma surgir <Highlight>7–10 dias</Highlight> após o gatilho.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Idiopática: <Highlight>45–55%</Highlight>.</>,
        <>Infecções: <Highlight>15–20%</Highlight>.</>,
        <>Colagenoses/autoimunes: <Highlight>15–20%</Highlight>.</>,
        <>Drogas: <Highlight>10–15%</Highlight>; neoplasias: <Highlight>~5%</Highlight>.</>,
        <>Suspeitar <Highlight>doença sistêmica</Highlight> se GI, renal, neurológica, febre ou parestesias.</>,
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
          title="Vasculite leucocitoclástica"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: LCV" image={diagramImage} alt="Vasculite leucocitoclástica em vênula dérmica" legend={[{ label: "Necrose fibrinoide", color: "bg-rose-500" }, { label: "Neutrófilos + leucocitoclasia", color: "bg-violet-700" }, { label: "Hemácias extravasadas", color: "bg-red-500" }]} footer="LCV é um padrão histológico." />}
          pearl={
            <>
              LCV é um <Highlight>padrão histológico</Highlight> — o contexto clínico, a <Highlight>DIF</Highlight> e a pesquisa de{" "}
              <Highlight>acometimento sistêmico</Highlight> definem o diagnóstico final.
            </>
          }
        />
      </div>
    </Layout>
  );
}
