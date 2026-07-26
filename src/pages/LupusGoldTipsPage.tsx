import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, MicroscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

export function LupusGoldTipsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "group-lupus-dermatomiosite-interface";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "classificacao-lupus-cutaneo",
      number: "1",
      color: "green",
      title: tx("Classificação do Lúpus cutâneo"),
      icon: <BookIcon />,
      bullets: [
        tx("Lúpus eritematoso cutâneo é dividido em agudo, subagudo e crônico. Não tem relação com a duração da doença. Essa terminologia está ligada à probabilidade desse lúpus cutâneo estar associado a lúpus sistêmico."),
        <StudyTopic
          key="lupus-agudo"
          title="Lúpus eritematoso cutâneo agudo"
          items={[
            "Lesões bem efêmeras, rash malar, eritema no dorso das mãos.",
            "90% de chance de estar associado a lúpus sistêmico.",
          ]}
          color="green"
        />,
        <StudyTopic
          key="lupus-subagudo"
          title="Lúpus eritematoso cutâneo subagudo"
          items={[
            "2 tipos principais.",
            "Lesão policíclica anular em face anterior de tórax, ombro, dorso e rosto. Mais ativa na periferia.",
            "Lesão psoriasiforme, igualzinha a psoríase, mas só em áreas fotoexpostas.",
            "Não deixa atrofia. Marcada fotossensibilidade.",
            "Cerca de 50% de chance de estar associado a lúpus sistêmico.",
          ]}
          color="green"
        />,
        <StudyTopic
          key="lupus-cronico"
          title="Lúpus eritematoso cutâneo crônico"
          items={[
            "Lúpus discoide, tipo localizado, apenas no polo cefálico, com 5% de associação com lúpus sistêmico; e tipo generalizado, presente em 2 segmentos corporais, saindo do polo cefálico, com 15% de associação.",
            "Geralmente epiderme muito atrófica, espessamento de membrana basal e alopécia em couro cabeludo.",
            "Lúpus túmido: subtipo de lúpus discoide sem acometimento da epiderme.",
            "Paniculite lúpica: 3 topografias clássicas, rosto, ombro e nádegas.",
            "Paniculite lúpica: ocorre de forma isolada, com acometimento apenas de hipoderme.",
            "Lúpus profundo: associado a alterações de lúpus na pele sobrejacente.",
          ]}
          color="green"
        />,
      ],
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "lesoes-inespecificas",
      number: "2",
      color: "purple",
      title: tx("Lesões inespecíficas do lúpus"),
      icon: <MicroscopeIcon />,
      bullets: [
        tx("Associadas ao lúpus, geralmente denotam que esse lúpus está em atividade. Mas não são específicas do lúpus."),
        <StudyTopic
          key="mucinose"
          title="Mucinose pápulo-nodular"
          items={[
            "Acúmulo de mucina na derme.",
            "Sem infiltrado inflamatório.",
            "Vacuolização.",
            "Espessamento de membrana basal.",
            "Esclerose de parede de vasos.",
          ]}
          color="purple"
        />,
        <StudyTopic
          key="outras-lesoes"
          title="Outras lesões inespecíficas"
          items={["Eritema nodoso.", "Vasculite leucocitoclástica."]}
          color="purple"
        />,
        <StudyTopic
          key="rem"
          title="REM (mucinose eritematosa reticulada)"
          items={[
            "Geralmente no tórax.",
            "Pápulas eritematosas em arranjo reticulado.",
            "Ackerman considerava uma manifestação do lúpus.",
            "Pode ter alterações específicas do lúpus, como alteração de interface.",
          ]}
          color="purple"
        />,
      ],
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={goBackToDiagnosis} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent">
            {t("return_to_diagnosis")}
          </button>
          <Link to="/diagnostico" className="rounded-full border border-sand bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-[#fffaf0]">
            {t("back")}
          </Link>
          <FavoriteToggleButton nodeId={favoriteNodeId} />
        </div>

        <StudyNoteCard
          title={tx("Resumo Lúpus Cutâneo")}
          subtitle={tx("Visão de apoio para consolidar classificação, padrões clínicos e lesões inespecíficas relacionadas ao lúpus.")}
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
        />
      </div>
    </Layout>
  );
}

function StudyTopic({ title, items, color }: { title: string; items: string[]; color: "green" | "purple" }) {
  const { tx } = useLanguage();

  return (
    <div>
      <p className="font-bold text-[#1c2b45]">{tx(title)}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${color === "green" ? "bg-emerald-400" : "bg-violet-400"}`} />
            <span>{tx(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
