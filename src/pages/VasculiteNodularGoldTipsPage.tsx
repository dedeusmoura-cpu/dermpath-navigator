import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { StudyNoteImageAside } from "../components/StudyNoteImageAside";
import diagramImage from "../assets/study-notes/nodular-vasculitis.png";

const TARGET_NODE_ID = "dx-grandes-vasos-arteria-nao-leucocitoclastica";

export function VasculiteNodularGoldTipsPage() {
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
        <>Vasculite <Highlight>não leucocitoclástica</Highlight> de artérias de médio/grande calibre, sem os achados neutrofílicos agudos da forma leucocitoclástica.</>,
        <>Corresponde ao espectro clínico-histológico da <Highlight>paniculite nodular associada à vasculite</Highlight> (eritema indurado/vasculite nodular).</>,
        <>Pode ser primária (idiopática) ou secundária a tuberculose (eritema indurado de Bazin) — mesmo espectro histológico.</>,
        <>Reação de hipersensibilidade ao antígeno micobacteriano, quando associada a TB.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite <Highlight>granulomatosa/necrosante</Highlight> de artérias de médio calibre na hipoderme, sem leucocitoclasia proeminente.</>,
        <>Paniculite lobular associada, com necrose caseosa-like nos casos ligados a TB.</>,
        <>Pode haver granulomas tuberculoides quando de etiologia tuberculosa.</>,
        <>Trombose secundária do vaso acometido é comum.</>,
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
        <>Nódulos eritêmato-violáceos dolorosos, predominando na <Highlight>face posterior das pernas</Highlight> (panturrilhas).</>,
        <>Mulheres de meia-idade são as mais acometidas.</>,
        <>Curso crônico recidivante, podendo ulcerar.</>,
        <>Pesquisar contato ou infecção tuberculosa quando recorrente/refratário.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <><Highlight>PPD/IGRA</Highlight> e investigação de tuberculose latente ou ativa (eritema indurado de Bazin quando TB-associado).</>,
        <>Excluir outras causas de paniculite nodular com vasculite (poliarterite cutânea, tromboflebite).</>,
        <>PCR para <em>M. tuberculosis</em> no tecido pode auxiliar quando a suspeita for alta.</>,
        <>Tratar TB se identificada; caso contrário, anti-inflamatórios, iodeto de potássio ou imunossupressores em refratários.</>,
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
          title="Vasculite nodular"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<StudyNoteImageAside title="Esquema: paniculite lobular" image={diagramImage} alt="Vasculite nodular com paniculite lobular granulomatosa" legend={[{ label: "Paniculite lobular", color: "bg-amber-500" }, { label: "Granulomas e necrose", color: "bg-violet-700" }, { label: "Vasculite profunda", color: "bg-rose-500" }]} footer="Panturrilhas: nódulos que podem ulcerar." />}
          pearl={
            <>
              Sempre investigar <Highlight>tuberculose</Highlight> diante de nódulos dolorosos recorrentes nas panturrilhas —
              o eritema indurado de Bazin é a face tuberculosa dessa mesma vasculite nodular.
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
