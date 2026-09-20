import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteAsideFrame } from "../components/StudyNoteAsideFrame";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import lymphocyticPatternImage from "../assets/study-notes/lymphocytic-vasculitis-pattern.png";

const TARGET_NODE_ID = "dx-perniose-epifenomeno-les";

export function PernioseEpifenomenoLesGoldTipsPage() {
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
        <><Highlight>Não é vasculite primária</Highlight> convencional.</>,
        <>Termo descritivo / <Highlight>padrão histológico</Highlight>.</>,
        <>Infiltrado linfocítico perivascular com <Highlight>dano vascular</Highlight>.</>,
        <>Exige <Highlight>correlação clinicopatológica</Highlight>.</>,
      ],
    },
    {
      id: "onde-e-mais-vista",
      number: "3",
      color: "purple",
      title: "Onde é mais vista",
      icon: <StethoscopeIcon />,
      bullets: [
        <><Highlight>Perniose</Highlight>.</>,
        <><Highlight>PLEVA</Highlight>.</>,
        <>Infecções <Highlight>rickettsiais e virais</Highlight>.</>,
        <>Doenças do <Highlight>tecido conjuntivo autoimunes</Highlight>.</>,
        <><Highlight>Behçet</Highlight>.</>,
      ],
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "histopatologia",
      number: "2",
      color: "blue",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Infiltrado dérmico <Highlight>perivascular linfocítico</Highlight>.</>,
        <><Highlight>Extravasamento</Highlight> de hemácias.</>,
        <><Highlight>Edema</Highlight> ou hiperplasia endotelial.</>,
        <><Highlight>Fibrina / necrose fibrinoide</Highlight> em alguns casos.</>,
      ],
    },
    {
      id: "outras-associacoes",
      number: "4",
      color: "orange",
      title: "Outras associações",
      icon: <ClipboardIcon />,
      bullets: [
        <>Distúrbios <Highlight>hipercoaguláveis</Highlight> (ex.: Sneddon).</>,
        <><Highlight>Arterite trombofílica linfocítica</Highlight> / arterite macular.</>,
        <>Paniculites, inclusive <Highlight>lúpica</Highlight>.</>,
        <>Pode ocorrer <Highlight>infiltrado angiocêntrico</Highlight> em alguns linfomas cutâneos.</>,
      ],
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-[100rem] space-y-4">
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
          title="Vasculite linfocítica"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<LymphocyticPatternDiagram />}
          pearl={
            <>
              Ao ver infiltrado linfocítico perivascular com dano vascular, pense mais em <Highlight>padrão histológico</Highlight>
              do que em <Highlight>vasculite primária</Highlight>; perniose e PLEVA são contextos clássicos.
            </>
          }
        />
      </div>
    </Layout>
  );
}

function LymphocyticPatternDiagram() {
  return (
    <StudyNoteAsideFrame title="Esquema: padrão linfocítico" footer="Padrão histológico, não entidade específica.">
      <figure className="overflow-hidden rounded-xl border border-[#d9b9aa] bg-[#fff8f3]">
        <img
          src={lymphocyticPatternImage}
          alt="Corte da pele com infiltrado linfocítico perivascular e hemácias extravasadas"
          className="aspect-[4/5] w-full object-cover"
        />
      </figure>

      <div className="mt-3 grid gap-1.5 rounded-xl border border-[#8d603e]/25 bg-white/45 px-3 py-2 font-hand text-sm font-semibold leading-5 text-[#1c2b45]">
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-700" />Infiltrado linfocítico perivascular</p>
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" />Edema endotelial</p>
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500" />Hemácias extravasadas</p>
      </div>

    </StudyNoteAsideFrame>
  );
}
