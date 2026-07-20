import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-chapel-hill-vasculite-iga-henoch-schonlein";

export function VasculiteIgaHenochSchonleinGoldTipsPage() {
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
        <>Vasculite de pequenos vasos mediada por depósitos de <Highlight>IgA (IgA1)</Highlight> nas paredes vasculares.</>,
        <>Forma mais comum de vasculite na infância (pico aos 6 anos; 90% &lt;10 anos).</>,
        <>Tétrade clássica: <Highlight>púrpura palpável, artrite, dor abdominal e hematúria</Highlight> — mas pode ser limitada à pele.</>,
        <>Frequentemente precedida por infecção de vias aéreas superiores (1–2 semanas antes).</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite leucocitoclástica clássica de pequenos vasos dérmicos.</>,
        <>IFD com depósito predominante e intenso de <Highlight>IgA</Highlight> na parede vascular (achado definidor).</>,
        <>C3 e IgM podem coexistir, mas de forma menos proeminente.</>,
        <>Ausência de eosinófilos associada a maior risco de acometimento renal em adultos.</>,
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
        <>Púrpura palpável simétrica em <Highlight>membros inferiores e nádegas</Highlight>, podendo evoluir com necrose central.</>,
        <>Artrite/artralgia (até 75%), predominando em joelhos e tornozelos.</>,
        <>Dor abdominal em cólica, sangramento GI (50–75% dos casos).</>,
        <>Hematúria/proteinúria em 40–50%; monitorar função renal por até 6 meses.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Investigar infecção respiratória alta recente; ASLO pode estar positivo (sem papel causal comprovado).</>,
        <>Em <Highlight>adultos</Highlight>, considerar rastreio de neoplasia sólida (pulmão), especialmente em homens.</>,
        <>Monitorar urina (hematúria/proteinúria) periodicamente — risco de nefrite até 6 meses após o quadro cutâneo.</>,
        <>Tratamento predominantemente de suporte; corticoide não previne nefrite, mas trata artrite/dor abdominal.</>,
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
          title="Vasculite por IgA (Henoch-Schönlein)"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>IgA de forma predominante na IFD é o achado definidor da vasculite por IgA.</>}
          pearl={
            <>
              Em crianças &lt;10 anos com púrpura palpável em membros inferiores/nádegas após infecção respiratória, pense
              sempre em <Highlight>Henoch-Schönlein</Highlight>.
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
