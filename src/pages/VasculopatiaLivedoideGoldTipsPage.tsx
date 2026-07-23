import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-vasculopatia-livedoide";

export function VasculopatiaLivedoideGoldTipsPage() {
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
        <>Vasculopatia <Highlight>trombótica</Highlight> cutânea.</>,
        <><Highlight>Oclusão vascular</Highlight> &gt; inflamação vascular.</>,
        <><Highlight>Não é vasculite</Highlight> verdadeira.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <><Highlight>Trombos intraluminais</Highlight> em vasos dérmicos.</>,
        <><Highlight>Espessamento / hialinização</Highlight> da parede vascular.</>,
        <><Highlight>Extravasamento</Highlight> de hemácias.</>,
        <><Highlight>Escasso infiltrado</Highlight> inflamatório.</>,
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
        <><Highlight>Livedo</Highlight> / púrpura retiforme.</>,
        <><Highlight>Úlceras dolorosas</Highlight> em pernas e tornozelos.</>,
        <><Highlight>Atrophie blanche</Highlight> (cicatrizes esbranquiçadas).</>,
      ],
    },
    {
      id: "diferenciais",
      number: "4",
      color: "orange",
      title: "Diferenciais",
      icon: <ClipboardIcon />,
      bullets: [
        <>Vasculite cutânea.</>,
        <>Calcifilaxia.</>,
        <>SAF / trombofilias.</>,
        <>Doença venosa / arterial periférica.</>,
        <>Pioderma gangrenoso.</>,
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
          title="Vasculopatia livedoide"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          aside={<LivedoidThrombosisDiagram />}
          pearl={
            <>
              Diante de úlceras dolorosas com atrophie blanche, lembre que a vasculopatia livedoide é uma vasculopatia
              trombótica, e <Highlight>não uma vasculite verdadeira</Highlight>.
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

function LivedoidThrombosisDiagram() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border-2 border-sky-400 bg-white/90 p-4 shadow-sm">
      <h3 className="mx-auto mb-3 max-w-[14rem] -rotate-1 rounded bg-sky-200/80 px-3 py-1 text-center font-hand text-xl font-bold leading-6 text-[#1c2b45]">
        Esquema: trombose intraluminal
      </h3>

      <svg viewBox="0 0 320 330" className="mx-auto min-h-0 w-full max-w-[22rem] flex-1" role="img" aria-label="Trombo ocluindo um vaso dérmico">
        <defs>
          <linearGradient id="livedoid-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd9d1" />
            <stop offset="1" stopColor="#fff1e7" />
          </linearGradient>
          <linearGradient id="livedoid-artery" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d85249" />
            <stop offset="1" stopColor="#922535" />
          </linearGradient>
        </defs>
        <path d="M4 36 C39 9 70 50 107 27 S176 46 214 25 S279 45 316 22 L316 325 L4 325Z" fill="url(#livedoid-skin)" />
        <path d="M4 43 C41 17 73 58 109 36 S177 54 215 33 S280 53 316 30" fill="none" stroke="#bd6373" strokeWidth="7" />
        <path d="M4 58 C43 33 77 69 112 49 S180 67 218 47 S282 66 316 45" fill="none" stroke="#e698a1" strokeWidth="5" />

        <g fill="none" strokeLinecap="round">
          <path d="M5 278 C58 235 90 267 134 222 S224 214 328 151" stroke="#862c2f" strokeWidth="34" />
          <path d="M5 278 C58 235 90 267 134 222 S224 214 328 151" stroke="url(#livedoid-artery)" strokeWidth="25" />
          <path d="M8 276 C57 242 91 267 134 226 S224 218 326 157" stroke="#f18a76" strokeWidth="5" opacity=".8" />
          <path d="M82 257 C75 205 56 190 45 155" stroke="#bd493f" strokeWidth="7" />
          <path d="M137 220 C119 171 130 133 142 94" stroke="#c45148" strokeWidth="6" />
          <path d="M201 205 C215 164 210 127 224 94" stroke="#3975aa" strokeWidth="6" />
          <path d="M252 186 C278 149 276 114 290 84" stroke="#3975aa" strokeWidth="6" />
        </g>

        <rect x="148" y="187" width="46" height="46" fill="none" stroke="#123c70" strokeWidth="3" />
        <path d="M192 223 C214 235 219 253 225 267" fill="none" stroke="#1261a9" strokeWidth="3" strokeDasharray="7 6" />
        <path d="m216 262 10 8 3-13" fill="none" stroke="#1261a9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="252" cy="252" r="66" fill="#fff7ef" stroke="#1261a9" strokeWidth="3" />
        <path d="M193 253 C215 232 236 268 259 244 S296 239 317 220" fill="none" stroke="#8a2b37" strokeWidth="31" strokeLinecap="round" />
        <path d="M193 253 C215 232 236 268 259 244 S296 239 317 220" fill="none" stroke="#e27a73" strokeWidth="20" strokeLinecap="round" />
        <ellipse cx="253" cy="248" rx="30" ry="15" transform="rotate(-13 253 248)" fill="#a9332f" stroke="#6f252b" strokeWidth="3" />
        <g fill="#d65a46" opacity=".85">
          <circle cx="236" cy="246" r="5" /><circle cx="245" cy="241" r="5" /><circle cx="255" cy="247" r="5" />
          <circle cx="265" cy="242" r="5" /><circle cx="271" cy="250" r="5" /><circle cx="249" cy="254" r="5" />
        </g>
      </svg>

      <p className="mt-2 text-center font-hand text-base leading-6 text-[#1c2b45]">
        Trombo intraluminal com <Highlight>oclusão</Highlight> do vaso dérmico.
      </p>
    </div>
  );
}
