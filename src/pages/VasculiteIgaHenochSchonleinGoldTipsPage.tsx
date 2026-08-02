import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteAsideFrame } from "../components/StudyNoteAsideFrame";
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
        <>Vasculite de <Highlight>pequenos vasos</Highlight>.</>,
        <>Deposição vascular dominante de <Highlight>IgA</Highlight>.</>,
        <>Mais comum em <Highlight>crianças &lt;10 anos</Highlight>.</>,
        <>Pode ser cutânea ou sistêmica.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Vasculite leucocitoclástica</Highlight> de pequenos vasos dérmicos, indistinguível no HE de outras vasculites por imunocomplexos.</>,
        <>IFD mostra <Highlight>depósitos perivasculares de IgA</Highlight> em vasos lesados e não lesados.</>,
        <>A sensibilidade da IFD cai em lesões com mais de 48 horas.</>,
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
        <><Highlight>Púrpura palpável</Highlight>.</>,
        <>Máculas eritematosas / pápulas urticariformes iniciais.</>,
        <>Predomínio em <Highlight>membros inferiores e nádegas</Highlight>.</>,
        <>Frequente após <Highlight>IVAS</Highlight>.</>,
      ],
    },
    {
      id: "manifestacoes-sistemicas",
      number: "4",
      color: "orange",
      title: "Manifestações sistêmicas",
      icon: <ClipboardIcon />,
      bullets: [
        <><Highlight>Artralgia / artrite</Highlight>.</>,
        <><Highlight>Dor abdominal</Highlight> / sangramento GI.</>,
        <><Highlight>Hematúria / proteinúria</Highlight>.</>,
        <>Monitorar rim nas primeiras semanas.</>,
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
          title="Vasculite por IgA"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<IgAVascularDiagram />}
          pearl={
            <>
              O HE reconhece LCV, mas <Highlight>IgA perivascular na IFD</Highlight> estabelece o diagnóstico. Colha uma lesão
              recente e correlacione com púrpura, sintomas gastrointestinais, articulares e renais.
            </>
          }
        />
      </div>
    </Layout>
  );
}

function IgAVascularDiagram() {
  return (
    <StudyNoteAsideFrame
      title="Esquema: depósito vascular de IgA"
      footer={<><span className="font-bold">DIF:</span> <Highlight>IgA</Highlight> nas paredes vasculares — achado patológico definidor.</>}
    >
      <svg viewBox="0 0 320 330" className="mx-auto min-h-0 w-full max-w-[22rem] flex-1 rounded-xl border border-[#d9b9aa] bg-[#fff8f3]/70 p-1" role="img" aria-label="Depósitos de IgA em vaso dérmico">
        <defs>
          <linearGradient id="iga-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd6cf" />
            <stop offset="1" stopColor="#fff0e8" />
          </linearGradient>
          <linearGradient id="iga-vessel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d44747" />
            <stop offset="1" stopColor="#8f202d" />
          </linearGradient>
        </defs>
        <path d="M4 33 C35 6 70 45 104 25 S170 40 208 21 S274 39 316 18 L316 324 L4 324Z" fill="url(#iga-skin)" />
        <path d="M4 41 C40 15 71 54 106 32 S173 47 210 29 S275 48 316 25" fill="none" stroke="#c56b76" strokeWidth="7" />
        <path d="M4 57 C42 30 75 66 110 46 S177 60 214 43 S278 61 316 40" fill="none" stroke="#e28d99" strokeWidth="5" />
        <path d="M-8 259 C48 222 95 273 146 227 S244 208 331 157" fill="none" stroke="#7a202e" strokeWidth="38" strokeLinecap="round" />
        <path d="M-8 259 C48 222 95 273 146 227 S244 208 331 157" fill="none" stroke="url(#iga-vessel)" strokeWidth="28" strokeLinecap="round" />
        <path d="M-8 259 C48 222 95 273 146 227 S244 208 331 157" fill="none" stroke="#f18478" strokeWidth="6" strokeLinecap="round" opacity=".8" />
        {[[42,236],[67,242],[99,241],[130,230],[157,210],[184,197],[214,190],[242,181],[272,168]].map(([x,y], index) => (
          <g key={index} transform={`translate(${x} ${y})`}>
            <circle r="8" fill="#56a55b" stroke="#236c39" strokeWidth="2" />
            <path d="M-3-2h6M0-5v6" stroke="#d9f0aa" strokeWidth="1.7" strokeLinecap="round" />
          </g>
        ))}
        {[[45,126],[78,157],[111,120],[139,166],[177,123],[209,151],[245,111],[274,140],[299,93]].map(([x,y], index) => (
          <g key={index} transform={`translate(${x} ${y})`} opacity=".9">
            <circle r="10" fill="#c7a4df" />
            <circle cx="-3" cy="-1" r="2.7" fill="#775aa2" /><circle cx="3" cy="2" r="2.7" fill="#775aa2" />
          </g>
        ))}
        <circle cx="250" cy="246" r="66" fill="#fff7ef" stroke="#1261a9" strokeWidth="3" />
        <path d="M194 246 C218 228 239 258 263 236 S302 231 317 215" fill="none" stroke="#a62735" strokeWidth="25" strokeLinecap="round" />
        <path d="M194 246 C218 228 239 258 263 236 S302 231 317 215" fill="none" stroke="#e2605c" strokeWidth="15" strokeLinecap="round" />
        {[206,226,247,268,290].map((x, index) => <circle key={index} cx={x} cy={index % 2 ? 242 : 236} r="6" fill="#55a65a" stroke="#236c39" strokeWidth="1.5" />)}
      </svg>

    </StudyNoteAsideFrame>
  );
}
