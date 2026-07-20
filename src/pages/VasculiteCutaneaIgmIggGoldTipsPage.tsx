import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

const TARGET_NODE_ID = "dx-chapel-hill-vasculite-cutanea-igm-igg";

export function VasculiteCutaneaIgmIggGoldTipsPage() {
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
        <>Termo proposto pelo <Highlight>adendo dermatológico de 2018</Highlight> à nomenclatura de Chapel Hill para caracterizar a CSVV idiopática.</>,
        <>Corresponde à vasculite leucocitoclástica clássica sem predomínio de IgA (não é Henoch-Schönlein) e sem crioglobulinas.</>,
        <>É "provisório" porque IgM/IgG são depósitos inespecíficos, ao contrário do papel patogênico bem definido da IgA.</>,
        <>Representa a forma mais comum e frequentemente idiopática de vasculite cutânea de pequenos vasos (~45–55%).</>,
      ],
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Achados histopatológicos",
      icon: <MicroscopeIcon />,
      bullets: [
        <>Vasculite leucocitoclástica clássica: infiltrado neutrofílico transmural, leucocitoclasia e necrose fibrinoide de vênulas.</>,
        <>IFD com depósitos inespecíficos de <Highlight>IgM, IgG e/ou C3</Highlight> na parede vascular — sem predomínio de IgA.</>,
        <>Extravasamento de hemácias e dano endotelial associados.</>,
        <>Achados indistinguíveis da LCV idiopática comum na histologia de rotina.</>,
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
        <>Púrpura palpável, pápulas urticadas, petéquias ou vesículas hemorrágicas em áreas de declive.</>,
        <>Início espontâneo ou pós-desencadeante, com resolução em semanas a poucos meses na maioria dos casos.</>,
        <>Sintomas sistêmicos leves (artralgias) podem acompanhar, mas por definição é doença limitada à pele.</>,
        <>Fenômeno de Koebner em áreas de trauma/pressão.</>,
      ],
    },
    {
      id: "causas",
      number: "4",
      color: "orange",
      title: "Causas / avaliação",
      icon: <ClipboardIcon />,
      bullets: [
        <>Excluir causas secundárias: infecção (15–20%), doença autoimune (15–20%), fármacos (10–15%), neoplasia (~5%).</>,
        <>A <Highlight>IFD</Highlight> é o que diferencia de outras vasculites de pequenos vasos (IgA-dominante = Henoch-Schönlein).</>,
        <>Investigação sistêmica dirigida pela revisão de sistemas: hemograma, função renal, urina tipo I.</>,
        <>Tratamento de suporte na maioria; colchicina, dapsona ou corticoide em casos crônicos/graves.</>,
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
          title="Vasculite cutânea por depósito imune de IgM e IgG"
          subtitle="Resumo prático para dermatopatologia"
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
          note={<>É essencialmente a mesma entidade da vasculite leucocitoclástica clássica — o termo "IgM/IgG" vem da nomenclatura de Chapel Hill para diferenciá-la de causas mais específicas.</>}
          pearl={
            <>
              Termo <Highlight>"provisório"</Highlight> porque IgM/IgG são achados inespecíficos — o diagnóstico continua
              sendo, na prática, de exclusão.
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
