import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/septic-vasculitis.png";

const TARGET_NODE_ID = "dx-vasculite-septica";

export function VasculiteSepticaGoldTipsPage() {
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
        <>Vasculite de pequenos vasos por <Highlight>êmbolos sépticos</Highlight> ou dano direto de patógenos/toxinas na parede vascular.</>,
        <>Mecanismo é <Highlight>oclusão trombótica luminal</Highlight>, não deposição primária de imunocomplexos.</>,
        <>Associada a bacteremia (meningococcemia, gonococcemia, endocardite), riquetsioses e fungos angioinvasivos.</>,
        <>Diferente da LCV clássica: predomina <Highlight>trombo</Highlight>, não leucocitoclasia.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Trombos intraluminais</Highlight> com neutrófilos densos na derme.</>,
        <>Ausência ou discreta <Highlight>leucocitoclasia</Highlight> (diferencia da LCV clássica).</>,
        <>Pode haver <Highlight>organismos visíveis</Highlight> na parede vascular (Gram, cultura, PAS conforme suspeita).</>,
        <>Infiltrado neutrofílico denso associado ao trombo.</>,
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
        <>Púrpura retiforme, petéquias ou pústulas hemorrágicas, muitas vezes <Highlight>assimétricas</Highlight>.</>,
        <>Distribuição <Highlight>acral/periférica</Highlight> nas formas embólicas.</>,
        <><Highlight>Febre</Highlight>, toxemia e instabilidade hemodinâmica frequentes.</>,
        <>Contexto de sepse, endocardite ou meningococcemia aguda.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <><Highlight>Meningococcemia</Highlight> aguda, gonococcemia.</>,
        <><Highlight>Endocardite infecciosa</Highlight> (S. aureus, estreptococos).</>,
        <>Riquetsioses, infecções fúngicas angioinvasivas em imunossuprimidos (Rhizopus, Candida).</>,
        <><Highlight>Hemoculturas</Highlight>, ecocardiograma e correlação clínica são essenciais.</>,
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
          title="Vasculite séptica"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: vasculite séptica" image={diagramImage} alt="Vaso dérmico com trombo, bactérias e inflamação neutrofílica" legend={[{ label: "Microrganismos intravasculares", color: "bg-indigo-700" }, { label: "Trombo de fibrina", color: "bg-rose-500" }, { label: "Hemorragia e necrose", color: "bg-red-600" }]} footer="Infecção vascular direta é emergência." />}
          pearl={
            <>
              Correlacionar sempre com <Highlight>contexto infeccioso agudo</Highlight> — a trombose luminal fala mais alto que a
              leucocitoclasia neste cenário.
            </>
          }
        />
      </div>
    </Layout>
  );
}
