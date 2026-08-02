import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { ClipboardIcon, MicroscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

export function PalisadedNeutrophilicGranulomatousDermatitisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "group-intersticial-outros";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "histopatologico",
      number: "1",
      color: "purple",
      title: t("histopathology"),
      icon: <MicroscopeIcon />,
      bullets: [
        tx("No início é uma dermatite neutrofílica, com neutrófilos íntegros e fragmentados (lembrando Sd de Sweet), podendo ter vasculite."),
        tx('Depois faz uma dermatite granulomatosa intersticial ("dermatite granulomatosa intersticial com cordões e artrite), lembrando o granuloma anular. Mas geralmente o infiltrado é mais profundo, na derme reticular (GA tende a ser mais superficial, com focos de paliçada em torno de colágeno alterado com mucina). Presença de "floating sign" (sinal da flutuação) ou pseudo-rosetas histiocíticas.'),
        tx("Fase final é mais fibrótica, lembrando necrobiose lipoídica."),
      ],
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "doencas-sistemicas",
      number: "2",
      color: "orange",
      title: tx("Está relacionada a doenças sistêmicas com depósitos de imunocomplexos"),
      icon: <ClipboardIcon />,
      bullets: [
        tx("Vasculites primárias (Doença de Wegener e de Churg-Strauss - Granulomatose com Poliangiite e Granulomatose com Poliangiite e Eosinofilia)."),
        tx("Artrite Reumatoide e Lúpus Eritematoso."),
        tx("Neoplasias."),
        tx("Infecções (ex. Borreliose)"),
        tx('Farmacodermias ("Dermatite granulomatosa intersticial secundária a Fármacos").'),
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
          title={tx("Dermatite Neutrofílica e Granulomatosa de Paliçada (Dermatite Granulomatosa Intersticial com Cordões e Artrite)")}
          subtitle={tx("Clinicamente se apresenta como pápulas umbilicadas ou lesões infiltradas e mais lineares, formando cordões clinicamente.")}
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
        />
      </div>
    </Layout>
  );
}
