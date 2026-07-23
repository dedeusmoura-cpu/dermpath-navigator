import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import granulomaFacialDiagram from "../assets/study-notes/granuloma-facial-grenz-zone.png";

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
        <>Dermatose <Highlight>inflamatória crônica benigna</Highlight>.</>,
        <>Placas / pápulas <Highlight>faciais eritemato-violáceas</Highlight>.</>,
        <>Predomínio em <Highlight>homens de meia-idade</Highlight>.</>,
        <>Apesar do nome, <Highlight>não é granuloma verdadeiro</Highlight>.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Grenz zone</Highlight> subepidérmica.</>,
        <>Infiltrado dérmico <Highlight>polimorfo denso</Highlight>.</>,
        <>Eosinófilos, neutrófilos e plasmócitos.</>,
        <><Highlight>Vasculite leucocitoclástica</Highlight> / dano vascular.</>,
        <><Highlight>Hemossiderina</Highlight> pode estar presente.</>,
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
        <><Highlight>Lesão solitária</Highlight> ou poucas lesões.</>,
        <>Face: <Highlight>nariz, região malar e fronte</Highlight>.</>,
        <>Coloração <Highlight>vermelho-acastanhada</Highlight> / violácea.</>,
        <>Pode haver <Highlight>telangiectasias</Highlight>.</>,
      ],
    },
    {
      id: "diferenciais",
      number: "4",
      color: "orange",
      title: "Diferenciais",
      icon: <ClipboardIcon />,
      bullets: [
        <>Rosácea.</>,
        <>Lúpus discoide / lúpus túmido.</>,
        <>Sarcoidose.</>,
        <>Linfoma ou pseudolinfoma cutâneo.</>,
        <>Eritema elevatum diutinum.</>,
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
          aside={<GranulomaFacialDiagram />}
          pearl={
            <>
              O granuloma facial pode ser entendido como uma <Highlight>vasculite leucocitoclástica crônica e tórpida</Highlight>,
              pertencente ao mesmo espectro histopatológico do <Highlight>eritema elevatum diutinum</Highlight>.
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

function GranulomaFacialDiagram() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border-2 border-sky-400 bg-white/90 p-4 shadow-sm">
      <h3 className="mx-auto mb-3 max-w-[16rem] -rotate-1 rounded bg-sky-200/80 px-3 py-1 text-center font-hand text-xl font-bold leading-6 text-[#1c2b45]">
        Esquema: Grenz zone e infiltrado misto
      </h3>

      <figure className="overflow-hidden rounded-xl border border-rose-100 bg-[#fff8f3]">
        <img
          src={granulomaFacialDiagram}
          alt="Pele com Grenz zone subepidérmica e infiltrado dérmico misto denso"
          className="aspect-[4/5] w-full object-cover"
        />
      </figure>

      <div className="mt-3 grid gap-1.5 font-hand text-sm font-semibold leading-5 text-[#1c2b45]">
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-100 ring-1 ring-amber-300" />Grenz zone subepidérmica pálida</p>
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-700" />Infiltrado dérmico polimorfo</p>
        <p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" />Eosinófilos e dano vascular</p>
      </div>

      <p className="mt-3 text-center font-hand text-lg font-semibold leading-6 text-[#173f78]">
        Grenz zone + infiltrado misto rico em eosinófilos.
      </p>
    </div>
  );
}
