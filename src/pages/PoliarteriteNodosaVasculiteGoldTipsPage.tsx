import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-grandes-vasos-arteria-leucocitoclastica";

export function PoliarteriteNodosaVasculiteGoldTipsPage() {
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
        <>Vasculite necrosante <Highlight>segmentar de artérias musculares de médio calibre</Highlight>.</>,
        <>Existem a forma <Highlight>sistêmica (clássica)</Highlight> e a forma <Highlight>cutânea</Highlight> (arterite cutânea), predominantemente benigna e crônica.</>,
        <>Fortemente associada à hepatite B na forma clássica (incidência caiu com a vacinação).</>,
        <>Poupa classicamente o pulmão e não causa glomerulonefrite (diferença frente às vasculites ANCA-associadas).</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite necrosante segmentar de <Highlight>artéria muscular de médio calibre</Highlight>, na derme profunda/hipoderme.</>,
        <>Neutrófilos, debris nucleares e fibrina na parede arterial, com disrupção da lâmina elástica.</>,
        <>Pode haver dilatação aneurismática ou estenose focal do vaso acometido.</>,
        <>IFD pode mostrar C3, IgM e fibrina na parede vascular, de significado incerto.</>,
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
        <>Nódulos subcutâneos dolorosos, <Highlight>livedo racemoso "em rajada"</Highlight>, púrpura retiforme e úlceras.</>,
        <>Forma sistêmica: febre, perda de peso, mialgia, mononeurite múltipla, dor abdominal, orquite, hipertensão renovascular.</>,
        <>Forma cutânea: sintomas leves (mialgia, artralgia, neuropatia localizada), curso crônico recidivante.</>,
        <>Complicações graves da forma sistêmica: isquemia mesentérica, AVC, cardiomiopatia isquêmica.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Sorologia para <Highlight>hepatite B e C</Highlight> obrigatória; investigar tricoleucemia e outras neoplasias hematológicas.</>,
        <>Considerar deficiência de ADA2 (mutação CECR1) em início na infância, e síndrome VEXAS em adultos.</>,
        <>Angiografia (convencional, TC ou RM): microaneurismas renais/mesentéricos sugerem forma sistêmica.</>,
        <>Corticoide isolado (~50% remissão) na forma leve; ciclofosfamida nas formas graves/refratárias.</>,
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
          title="Poliarterite nodosa"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Nódulos dolorosos + livedo racemoso + ausência de glomerulonefrite/ANCA aponta para poliarterite nodosa, não para uma vasculite ANCA-associada.</>}
          pearl={
            <>
              Diante de livedo racemoso <Highlight>"em rajada"</Highlight> com nódulos subcutâneos, sempre descartar hepatite
              B e investigar acometimento sistêmico antes de rotular como forma cutânea isolada.
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
