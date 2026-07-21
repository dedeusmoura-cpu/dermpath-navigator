import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/cryoglobulinemic-vasculitis.png";

const TARGET_NODE_ID = "dx-chapel-hill-vasculite-crioglobulinemica";

export function VasculiteCrioglobulinemicaGoldTipsPage() {
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
        <>Vasculite de pequenos e médios vasos ("mista") por <Highlight>crioglobulinas tipo II ou III</Highlight> circulantes.</>,
        <>Fortemente associada à infecção pelo <Highlight>vírus da hepatite C</Highlight> (80–90% dos casos "essenciais").</>,
        <>Imunocomplexos formados por IgM (com atividade de fator reumatoide) contra IgG policlonal.</>,
        <>Tipo I (IgM monoclonal isolada) causa oclusão vascular sem vasculite verdadeira — não confundir.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite <Highlight>leucocitoclástica clássica</Highlight> à histologia.</>,
        <>IFD com depósitos granulares predominantemente de <Highlight>IgM e C3</Highlight> na derme papilar.</>,
        <>Pode haver componente de médio vaso (padrão misto).</>,
        <>Diferencia-se do tipo I por não haver oclusão trombótica isolada sem inflamação.</>,
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
        <><Highlight>Púrpura palpável</Highlight> de membros inferiores é a manifestação cutânea mais comum.</>,
        <>Livedo racemoso, púrpura retiforme, necrose e ulceração (padrão misto pequeno/médio vaso).</>,
        <>Artralgias/artrite (70%), neuropatia sensitiva periférica (60%), hepatite (60%).</>,
        <>Glomerulonefrite membranoproliferativa (~20%).</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Rastrear <Highlight>hepatite C</Highlight> (principal causa), hepatite B, HIV; doenças autoimunes (Sjögren, LES, AR).</>,
        <>Dosar crioglobulinas (coleta a 37°C), fator reumatoide (geralmente positivo), complemento (C4 baixo).</>,
        <>Cerca de 5% têm distúrbio linfoproliferativo associado (linfoma B não-Hodgkin).</>,
        <>Tratamento: <Highlight>antiviral de ação direta</Highlight> se HCV+; imunossupressão nos casos moderados/graves.</>,
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
          title="Vasculite crioglobulinêmica"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: crioglobulinas" image={diagramImage} alt="Vasculite por crioglobulinas com púrpura e eixos sistêmicos" legend={[{ label: "Complexos IgM-IgG", color: "bg-sky-600" }, { label: "LCV de pequenos vasos", color: "bg-violet-700" }, { label: "HCV, nervo e rim", color: "bg-amber-600" }]} footer="Púrpura + C4 baixo + crioglobulinas." />}
          pearl={
            <>
              Sempre investigar <Highlight>hepatite C</Highlight> — os antivirais de ação direta mudaram o prognóstico desta
              vasculite.
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
