import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

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
        <>Padrão vascular <Highlight>linfocítico</Highlight> das vênulas dérmicas, desencadeado pelo frio (perniose) ou associado ao LES.</>,
        <>Reflete resposta vascular exagerada ao frio, com vasoconstrição e hipóxia tecidual.</>,
        <>Pode ser idiopática (perniose clássica) ou fenômeno satélite de doença autoimune sistêmica (lúpus pérnio).</>,
        <>Há sobreposição clínico-histológica importante entre perniose idiopática e lúpus pérnio.</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Infiltrado <Highlight>linfocítico perivascular</Highlight>, inclusive ao redor de vasos profundos da derme.</>,
        <>Edema da derme papilar, por vezes com necrose de queratinócitos basais.</>,
        <>Pode haver <Highlight>vacuolização da junção dermoepidérmica</Highlight> quando associado a lúpus.</>,
        <>Ausência de leucocitoclasia ou necrose fibrinoide proeminente (diferencia da LCV clássica).</>,
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
        <>Pápulas e placas eritêmato-violáceas, dolorosas ou pruriginosas, em dedos, nariz e orelhas.</>,
        <>Piora característica com <Highlight>exposição ao frio</Highlight> e melhora no calor.</>,
        <>Quando associada a LES, pode acompanhar artralgia e fotossensibilidade.</>,
        <>Curso sazonal (inverno) na perniose idiopática.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Exposição ao <Highlight>frio/umidade</Highlight> (perniose idiopática, mais comum em climas úmidos e frios).</>,
        <><Highlight>LES</Highlight> e outras doenças do tecido conjuntivo — pesquisar FAN e história clínica.</>,
        <>Crioglobulinemia e síndromes de hipercoagulabilidade como diferencial.</>,
        <>Correlação clínico-patológica é essencial para distinguir perniose isolada de epifenômeno lúpico.</>,
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
          title="Perniose / epifenômeno no LES"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>Padrão linfocítico + ausência de leucocitoclasia = pense em perniose/lúpus, não em LCV clássica.</>}
          pearl={
            <>
              <Highlight>Sazonalidade</Highlight> e localização acral com piora ao frio são a chave clínica para suspeitar de
              perniose.
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
