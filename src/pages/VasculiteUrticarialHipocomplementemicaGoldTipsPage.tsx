import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/hypocomplementemic-urticarial-vasculitis.png";

const TARGET_NODE_ID = "dx-chapel-hill-vasculite-urticarial-hipocomplementemica";

export function VasculiteUrticarialHipocomplementemicaGoldTipsPage() {
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
        <>Entidade clínico-patológica com urticária persistente (&gt;24h) que histologicamente mostra critérios de <Highlight>LCV</Highlight>.</>,
        <>Duas formas: <Highlight>normocomplementêmica</Highlight> (70–80%, curso benigno) e hipocomplementêmica (mais grave, sistêmica).</>,
        <>A síndrome da vasculite urticarial hipocomplementêmica (HUVS) tem sobreposição importante com LES.</>,
        <>Fisiopatologia semelhante à CSVV clássica, com ativação de complemento e desgranulação de mastócitos.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Leucocitoclasia com necrose da parede vascular</Highlight>, com ou sem fibrina, inflamação perivascular ou extravasamento de hemácias.</>,
        <>Infiltrado neutrofílico intersticial mais comum na forma hipocomplementêmica.</>,
        <>IFD positiva em ~70% (Ig, C3, fibrinogênio perivascular); padrão granular na JDE em ~80% sugere LES.</>,
        <>Eosinófilos podem estar presentes.</>,
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
        <>Placas urticadas <Highlight>persistentes por mais de 24h</Highlight>, com dor em queimação (não prurido puro).</>,
        <>Resolução com hiperpigmentação pós-inflamatória ou púrpura residual — diferencia de urticária comum.</>,
        <>HUVS: angioedema (50%), sintomas oculares (conjuntivite/episclerite/uveíte), doença pulmonar obstrutiva (~20%).</>,
        <>Artralgias em cerca de metade dos pacientes.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Dosar <Highlight>C3, C4, CH50 e C1q</Highlight> (e teste de precipitina anti-C1q se hipocomplementêmica).</>,
        <>Investigar LES e Sjögren — associações mais importantes, sobretudo na forma hipocomplementêmica.</>,
        <>Critérios de HUVS: urticária ≥6 meses + hipocomplementemia + ≥2 critérios menores (vasculite na biópsia, artrite, uveíte, glomerulonefrite, dor abdominal recorrente, C1q baixo com precipitina positiva).</>,
        <>Tratamento: anti-histamínicos, corticoide, dapsona, hidroxicloroquina; refratários podem usar rituximabe/omalizumabe.</>,
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
          title="Vasculite urticarial"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: urticária + LCV" image={diagramImage} alt="Lesões urticariformes persistentes e vasculite leucocitoclástica" legend={[{ label: "Urticas persistentes >24 h", color: "bg-rose-400" }, { label: "Púrpura residual", color: "bg-purple-700" }, { label: "Hipocomplementemia / anti-C1q", color: "bg-sky-600" }]} footer="Urtica persistente que deixa marca." />}
          pearl={
            <>
              <Highlight>Hipocomplementemia</Highlight> é o principal marcador prognóstico: sinaliza maior chance de doença
              sistêmica e sobreposição com LES.
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
