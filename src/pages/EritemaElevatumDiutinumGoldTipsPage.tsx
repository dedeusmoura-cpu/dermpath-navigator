import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-venulas-granuloma-facial-eritema-elevatum";

export function EritemaElevatumDiutinumGoldTipsPage() {
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
        <>Dermatose crônica rara, considerada <Highlight>vasculite leucocitoclástica fibrosante</Highlight> de pequenos vasos.</>,
        <>Lesões evoluem de vasculite neutrofílica aguda para <Highlight>fibrose progressiva</Highlight>.</>,
        <>Associada a imunocomplexos circulantes com deposição repetida nos vasos dérmicos.</>,
        <>Pode ocorrer em associação com HIV, estreptococos, gamopatia monoclonal por IgA e doenças autoimunes.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Lesões precoces: vasculite leucocitoclástica com infiltrado neutrofílico denso na derme superior e média.</>,
        <>Lesões tardias: <Highlight>fibrose perivascular concêntrica ou estoriforme</Highlight> com poucos neutrófilos remanescentes.</>,
        <><Highlight>Lipidização intracelular</Highlight> ("colesterolose extracelular") é achado clássico tardio.</>,
        <>Ausência de zona de Grenz (diferencia de granuloma facial).</>,
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
        <>Pápulas, placas e nódulos violáceos a castanho-avermelhados, <Highlight>simétricos</Highlight>.</>,
        <>Predomínio em <Highlight>superfícies extensoras</Highlight> (cotovelos, joelhos, mãos, tornozelos).</>,
        <>Consistência endurecida/borrachosa nas lesões mais antigas, por fibrose.</>,
        <>Curso crônico recidivante, podendo durar de 5 a 40 anos.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Rastrear <Highlight>gamopatia monoclonal por IgA</Highlight>, HIV, estreptococos, hepatite B, tuberculose, sífilis.</>,
        <>Associação com doenças autoimunes (LES, artrite reumatoide, DII) e neoplasias hematológicas.</>,
        <><Highlight>Dapsona</Highlight> é o tratamento de escolha, com recidiva frequente à suspensão.</>,
        <>Diferencial: xantoma tuberoso, granuloma anular, nódulos reumatoides (lesões tardias).</>,
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
          title="Eritema elevatum diutinum"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Fibrose progressiva sobre vasculite leucocitoclástica em superfícies extensoras simétricas = EED.</>}
          pearl={
            <>
              Sempre rastrear <Highlight>gamopatia por IgA</Highlight> e HIV — são as associações mais características do EED.
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
