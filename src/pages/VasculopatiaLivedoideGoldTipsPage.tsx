import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-vasculopatia-livedoide";

export function VasculopatiaLivedoideGoldTipsPage() {
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
        <><Highlight>Vasculopatia trombo-oclusiva</Highlight> de pequenos vasos dérmicos — não é uma vasculite verdadeira.</>,
        <>Reflete estado de <Highlight>hipercoagulabilidade local</Highlight>, não inflamação primária da parede vascular.</>,
        <>Associada a síndrome antifosfolípide, trombofilias hereditárias e doenças do tecido conjuntivo.</>,
        <>Curso crônico e recidivante, predominando nos membros inferiores.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Trombos hialinos</Highlight> (fibrina) ocluindo a luz de vasos dérmicos superficiais e médios.</>,
        <>Infiltrado inflamatório <Highlight>escasso ou ausente</Highlight> — diferencia de vasculite verdadeira.</>,
        <>Proliferação endotelial segmentar e espessamento hialino da parede.</>,
        <>Fibrose dérmica associada às lesões antigas.</>,
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
        <><Highlight>Úlceras dolorosas</Highlight> nos tornozelos e dorso dos pés.</>,
        <><Highlight>Atrofia branca</Highlight> (atrophie blanche): cicatrizes estelares brancas com telangiectasias.</>,
        <>Púrpura retiforme e livedo racemoso associados.</>,
        <>Predomínio em mulheres de meia-idade.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <><Highlight>Síndrome antifosfolípide</Highlight>, trombofilias (fator V Leiden, proteína C/S).</>,
        <>Doenças do tecido conjuntivo, especialmente LES.</>,
        <>Investigar hipercoagulabilidade: anticorpos antifosfolípides, triagem trombofílica.</>,
        <>Tratamento direcionado à <Highlight>anticoagulação/antiagregação</Highlight>, não à imunossupressão isolada.</>,
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
          title="Vasculopatia livedoide"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Não é vasculite verdadeira — é vasculopatia oclusiva; o tratamento não é o mesmo de uma LCV.</>}
          pearl={
            <>
              Infiltrado escasso + trombo hialino + atrofia branca = pense em <Highlight>oclusão</Highlight>, não em inflamação
              primária da parede vascular.
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
