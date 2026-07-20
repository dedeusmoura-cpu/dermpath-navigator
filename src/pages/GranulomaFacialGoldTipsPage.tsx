import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-venulas-granuloma-facial-eritema-elevatum";

export function GranulomaFacialGoldTipsPage() {
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
        <>Dermatose inflamatória crônica considerada uma forma de <Highlight>vasculite de pequenos vasos limitada à pele</Highlight>.</>,
        <>Mais comum em <Highlight>homens brancos de meia-idade</Highlight>.</>,
        <>Lesão geralmente solitária, sem associação com doença sistêmica.</>,
        <>Fisiopatologia pouco esclarecida; envolve deposição de imunocomplexos na parede vascular.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Infiltrado denso perivascular e intersticial de neutrófilos, linfócitos, plasmócitos e <Highlight>numerosos eosinófilos</Highlight>.</>,
        <><Highlight>Zona de Grenz</Highlight> (faixa de colágeno normal na derme papilar, poupada pela inflamação) — achado característico.</>,
        <>Leucocitoclasia mais proeminente nas lesões iniciais; fibrose nas lesões antigas.</>,
        <>Pode mimetizar doença relacionada a IgG4 (plasmócitos IgG4+).</>,
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
        <>Placa ou nódulo <Highlight>solitário</Highlight>, castanho-avermelhado a violáceo, na face (bochecha, nariz, região malar).</>,
        <>Assintomático, com aberturas foliculares proeminentes.</>,
        <>Raramente múltiplo ou extrafacial (orelhas, couro cabeludo, tronco).</>,
        <>Curso persistente, resistente a tratamento.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Diagnóstico predominantemente clínico-histopatológico; sem causa sistêmica identificada.</>,
        <>Diferencial: rosácea granulomatosa, linfoma cutâneo, hiperplasia angiolinfoide com eosinofilia, hanseníase, sarcoidose.</>,
        <>Principal diferencial histológico: <Highlight>eritema elevatum diutinum</Highlight> (distribuição extensora simétrica e mais fibrose).</>,
        <>Primeira linha: corticoide tópico/intralesional e inibidores tópicos de calcineurina.</>,
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
          title="Granuloma facial"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Zona de Grenz + eosinófilos abundantes na face = pense em granuloma facial.</>}
          pearl={
            <>
              Clinicamente restrito à face, <Highlight>sem doença sistêmica associada</Highlight> — diferente do EED, que é
              simétrico em superfícies extensoras.
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
