import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";

export function NeutrophilicUrticarialDermatosisGoldTipsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "group-pv-neutrofilos";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "reavaliacao-conceitual",
      number: "1",
      color: "green",
      title: tx("Reavaliação Conceitual e Histórica"),
      icon: <BookIcon />,
      bullets: [
        tx("Paradigma Antigo (Anos 70): Originalmente descrita como lesões urticariformes associadas a doenças do tecido conjuntivo (como Lúpus) com alterações incipientes de vasculite leucocitoclástica."),
        tx('O "Viés" Técnico: Dr. LeBoit comenta que a descrição original de Urticária Vasculite publicada no NEJM nos anos 1970 baseava-se em técnicas de inclusão em plástico e cortes ultrafinos (2 mícrons), que revelavam danos vasculares extremamente sutis.'),
        tx("Visão Atual: Defende-se que muitos casos diagnosticados como Urticária Vasculite são, na verdade, manifestações de Dermatose Urticariforme Neutrofílica (DUN)."),
      ],
    },
    {
      id: "correlacoes-clinicas",
      number: "3",
      color: "blue",
      title: tx("Correlações Clínicas e Sistêmicas"),
      icon: <StethoscopeIcon />,
      bullets: [
        tx("Dermatografismo: Comum em pacientes com este espectro de lesões."),
        tx("Síndromes Autoinflamatórias: A DUN está intimamente relacionada a defeitos na imunidade inata."),
        tx("CAPS (Síndrome Periódica Associada à Criopirina): Destacada como a principal associação autoinflamatória, onde a desregulação neutrofílica sistêmica se manifesta na pele como lesões urticariformes."),
      ],
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "achados-histopatologicos",
      number: "2",
      color: "purple",
      title: tx("Achados Histopatológicos"),
      icon: <MicroscopeIcon />,
      bullets: [
        tx('Padrão "Sweet-like": A morfologia da DUN assemelha-se à Síndrome de Sweet, porém com intensidade reduzida ("menos de tudo") e SEM EDEMA!'),
        tx('Componentes Principais: Presença de neutrófilos e leucocitoclasia ("poeira" neutrofílica) intersticial ("fila indiana") e perivascular, sem a deposição severa de fibrina ou dano parietal proeminente das vasculites clássicas.'),
        tx("Epiteliotropismo Neutrofílico: Um achado característico é a atração de neutrófilos para: junção dermo-epidérmica (superfície inferior da epiderme) e espirais secretoras das glândulas écrinas."),
      ],
    },
    {
      id: "conclusao-diagnostica",
      number: "4",
      color: "orange",
      title: tx("Conclusão Diagnóstica"),
      icon: <ClipboardIcon />,
      bullets: [
        tx('A dificuldade em encontrar "verdadeira vasculite" em biópsias de urticária crônica/persistente deve-se, frequentemente, ao fato de a patologia ser uma dermatose neutrofílica intersticial, e não uma vasculite primária.'),
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
          title={tx("Dermatose Urticariforme Neutrofílica (DUN)")}
          subtitle={tx("Revisão conceitual, histopatológica e clínico-sistêmica para diferenciar DUN de urticária vasculite e outras dermatoses neutrofílicas.")}
          sectionsLeft={sectionsLeft}
          sectionsRight={sectionsRight}
        />
      </div>
    </Layout>
  );
}
