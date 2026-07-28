import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import eedEvolutionDiagram from "../assets/study-notes/eritema-elevatum-diutinum-evolution.png";

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
        <>Dermatose <Highlight>rara e crônica</Highlight>.</>,
        <>Variante de <Highlight>vasculite leucocitoclástica</Highlight> cutânea.</>,
        <>Pápulas / placas / nódulos <Highlight>vermelho-violáceos</Highlight> a <Highlight>castanho-avermelhados</Highlight>.</>,
        <>Curso <Highlight>persistente e fibrosante</Highlight>.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Lesões iniciais: <Highlight>vasculite leucocitoclástica</Highlight> com <Highlight>infiltrado neutrofílico</Highlight>.</>,
        <>Lesões tardias: <Highlight>fibrose dérmica perivascular / estoriforme</Highlight>.</>,
        <>Pode haver <Highlight>granulação tecidual</Highlight> e <Highlight>necrose fibrinoide</Highlight>.</>,
        <><Highlight>Lipidose intracelular</Highlight> pode aparecer nas fases tardias.</>,
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
        <>Lesões <Highlight>simétricas</Highlight>.</>,
        <>Predomínio em <Highlight>superfícies extensoras</Highlight>.</>,
        <>Frequente sobre <Highlight>articulações</Highlight>.</>,
        <><Highlight>Mãos, cotovelos, joelhos e tornozelos</Highlight> são sítios clássicos.</>,
      ],
    },
    {
      id: "associacoes-diferenciais",
      number: "4",
      color: "orange",
      title: "Associações / diferenciais",
      icon: <ClipboardIcon />,
      bullets: [
        <>Pode se associar a <Highlight>infecções, gamopatias e doenças autoimunes</Highlight>.</>,
        <><Highlight>HIV</Highlight> pode estar associado a início mais precoce.</>,
        <><Highlight>Diferenciais iniciais:</Highlight> Sweet, dermatite neutrofílica reumatoide, PNGD.</>,
        <><Highlight>Diferenciais tardios:</Highlight> xantomas, granuloma anular, nódulo reumatoide.</>,
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
          aside={<EedEvolutionDiagram />}
          pearl={
            <>
              Diante de pápulas ou placas <Highlight>simétricas em superfícies extensoras</Highlight>, especialmente sobre
              articulações, lembre do EED; histologicamente, pense em <Highlight>vasculite leucocitoclástica</Highlight> nas fases
              iniciais e <Highlight>fibrose nas tardias</Highlight>.
            </>
          }
        />
      </div>
    </Layout>
  );
}

function EedEvolutionDiagram() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border-2 border-sky-400 bg-white/90 p-4 shadow-sm">
      <h3 className="mx-auto mb-3 max-w-[15rem] -rotate-1 rounded bg-sky-200/80 px-3 py-1 text-center font-hand text-xl font-bold leading-6 text-[#1c2b45]">
        Esquema: evolução do EED
      </h3>

      <figure className="overflow-hidden rounded-xl border border-rose-100 bg-[#fff8f3]">
        <img
          src={eedEvolutionDiagram}
          alt="Evolução histológica do eritema elevatum diutinum, da vasculite neutrofílica à fibrose perivascular"
          className="aspect-[4/5] w-full object-cover"
        />
      </figure>

      <div className="mt-3 grid gap-2 font-hand text-sm font-semibold leading-5 text-[#1c2b45]">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5">
          <span className="text-emerald-700">Fase inicial:</span> LCV + neutrófilos
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5">
          <span className="text-amber-700">Fase tardia:</span> fibrose perivascular + lipidose
        </div>
      </div>

      <p className="mt-3 text-center font-hand text-base font-semibold leading-6 text-[#173f78]">
        Vasculite leucocitoclástica fibrosante.
      </p>
    </div>
  );
}
