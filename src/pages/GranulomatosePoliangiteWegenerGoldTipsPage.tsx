import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/granulomatosis-with-polyangiitis.png";

const TARGET_NODE_ID = "dx-chapel-hill-granulomatose-poliangiite-wegener-limitada-pele";

export function GranulomatosePoliangiteWegenerGoldTipsPage() {
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
        <>Vasculite <Highlight>ANCA-associada</Highlight> (c-ANCA/anti-PR3 na maioria) de pequenos a médios vasos.</>,
        <>Tríade clássica: inflamação granulomatosa de vias aéreas, vasculite sistêmica necrosante e <Highlight>glomerulonefrite pauci-imune</Highlight>.</>,
        <>Pode acometer veias e artérias de grande calibre (fase leucocitoclástica de grande vaso).</>,
        <>Espectro de gravidade variável, de doença limitada às vias aéreas a formas fulminantes.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Os achados são variáveis; o mais comum na pele é <Highlight>vasculite leucocitoclástica</Highlight> difusa, alcançando diferentes níveis da derme.</>,
        <>Quando presente, inflamação granulomatosa necrosante ou em paliçada fortalece muito o diagnóstico.</>,
        <>Uma amostra pode demonstrar apenas um componente do espectro; granulomas podem estar ausentes.</>,
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
        <>Sinusite/rinite crônica, crostas nasais, epistaxe recorrente, perfuração do septo, <Highlight>nariz em sela</Highlight>.</>,
        <>Gengiva <Highlight>"em morango"</Highlight> (gengivite hiperplásica friável), úlceras orais.</>,
        <>Nódulos pulmonares/cavitações; hemoptise.</>,
        <>Púrpura palpável, nódulos subcutâneos, úlceras tipo pioderma gangrenoso.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <><Highlight>c-ANCA/anti-PR3</Highlight> positivo em até 90% da forma generalizada.</>,
        <>TC de seios da face e tórax, avaliação renal (proteinúria, hematúria, cilindros).</>,
        <>Diferencial: MPA (sem granulomas), EGPA (asma/eosinofilia), linfoma NK/T, granulomatose cocaína-induzida.</>,
        <>Tratamento de indução: corticoide + <Highlight>rituximabe</Highlight> (preferencial) ou ciclofosfamida.</>,
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
          title="GPA (Wegener)"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: GPA" image={diagramImage} alt="Granuloma necrosante e vasculite na granulomatose com poliangite" legend={[{ label: "Granuloma necrosante", color: "bg-violet-700" }, { label: "Vasculite pauci-imune", color: "bg-rose-500" }, { label: "Vias aéreas + pulmão", color: "bg-sky-600" }]} footer="Granulomas diferenciam GPA de MPA." />}
          pearl={
            <>
              A GPA pode mostrar <Highlight>apenas vasculite leucocitoclástica</Highlight> na pele. Granulomas ajudam, mas sua
              ausência não exclui o diagnóstico; correlacione com vias aéreas, pulmão, rim e c-ANCA/anti-PR3.
            </>
          }
          source={
            <>
              <span className="font-semibold">Fontes:</span> Bolognia et al. <em>Dermatology</em>; Billings &amp; Cotton. <em>Inflammatory Dermatopathology</em>.
            </>
          }
        />
      </div>
    </Layout>
  );
}
