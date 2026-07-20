import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { MicroscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

export function RosaceaGoldTipsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "dx-rosacea-granulomatosa";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "classificacao-rosacea",
      number: "1",
      color: "purple",
      title: tx("Classificação da Rosácea"),
      icon: <MicroscopeIcon />,
      bullets: [
        <StudyTopic key="eritemato-telangiectasica" title="Rosácea eritemato-telangiectásica" items={["Infiltrado linfoplasmocitário em torno de vasos telangiectásicos."]} />,
        <StudyTopic key="papulo-pustulosa" title="Foliculite pápulo-pustulosa" items={["Foliculite espongiótica que progride para supurativa."]} />,
        <StudyTopic
          key="granulomatosa"
          title="Foliculite granulomatosa"
          items={[
            "O folículo rompe.",
            "Procurar Demodex em todo e qualquer infundíbulo, já que a rosácea pode melhorar com tratamento.",
          ]}
        />,
        tx("Doença de longa duração pode resultar em rinofima."),
        <StudyTopic
          key="forma-grave"
          title="Forma grave relacionada"
          items={[
            "Lúpus miliar disseminado da face é uma forma grave de acne rosácea granulomatosa, na qual o acometimento das pálpebras é frequente.",
          ]}
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
          title={tx("Classificação da Rosácea")}
          subtitle={tx("Resumo didático para revisão rápida dos principais padrões histopatológicos e desdobramentos clínicos.")}
          sectionsLeft={sectionsLeft}
          sectionsRight={[]}
        />
      </div>
    </Layout>
  );
}

function StudyTopic({ title, items }: { title: string; items: string[] }) {
  const { tx } = useLanguage();

  return (
    <div>
      <p className="font-bold text-[#1c2b45]">{tx(title)}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-violet-400" />
            <span>{tx(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
