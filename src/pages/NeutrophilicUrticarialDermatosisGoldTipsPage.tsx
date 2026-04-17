import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
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

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-4">
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

        <section className="overflow-hidden rounded-[32px] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-stone-50 to-yellow-100 shadow-[0_28px_60px_rgba(120,90,20,0.14)]">
          <div className="border-b border-amber-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.26),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_42%)] px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-amber-300/80 bg-white/75 shadow-sm">
                  <GoldBarsHero />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">{t("premium_lesson")}</p>
                  <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">{tx("Dermatose Urticariforme Neutrofílica (DUN)")}</h2>
                  <p className="max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                    {tx("Revisão conceitual, histopatológica e clínico-sistêmica para diferenciar DUN de urticária vasculite e outras dermatoses neutrofílicas.")}
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-amber-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-800">
                {t("specialist_tips")}
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-2">
            <ContentSection
              badge="1"
              title="Reavaliação Conceitual e Histórica"
              items={[
                "Paradigma Antigo (Anos 70): Originalmente descrita como lesões urticariformes associadas a doenças do tecido conjuntivo (como Lúpus) com alterações incipientes de vasculite leucocitoclástica.",
                "O \"Viés\" Técnico: Dr. LeBoit comenta que a descrição original de Urticária Vasculite publicada no NEJM nos anos 1970 baseava-se em técnicas de inclusão em plástico e cortes ultrafinos (2 mícrons), que revelavam danos vasculares extremamente sutis.",
                "Visão Atual: Defende-se que muitos casos diagnosticados como Urticária Vasculite são, na verdade, manifestações de Dermatose Urticariforme Neutrofílica (DUN).",
              ]}
            />

            <ContentSection
              badge="2"
              title="Achados Histopatológicos"
              items={[
                "Padrão \"Sweet-like\": A morfologia da DUN assemelha-se à Síndrome de Sweet, porém com intensidade reduzida (\"menos de tudo\") e SEM EDEMA!",
                "Componentes Principais: Presença de neutrófilos e leucocitoclasia (\"poeira\" neutrofílica) intersticial (\"fila indiana\") e perivascular, sem a deposição severa de fibrina ou dano parietal proeminente das vasculites clássicas.",
                "Epiteliotropismo Neutrofílico: Um achado característico é a atração de neutrófilos para: junção dermo-epidérmica (superfície inferior da epiderme) e espirais secretoras das glândulas écrinas.",
              ]}
            />

            <ContentSection
              badge="3"
              title="Correlações Clínicas e Sistêmicas"
              items={[
                "Dermatografismo: Comum em pacientes com este espectro de lesões.",
                "Síndromes Autoinflamatórias: A DUN está intimamente relacionada a defeitos na imunidade inata.",
                "CAPS (Síndrome Periódica Associada à Criopirina): Destacada como a principal associação autoinflamatória, onde a desregulação neutrofílica sistêmica se manifesta na pele como lesões urticariformes.",
              ]}
            />

            <ContentSection
              badge="4"
              title="Conclusão Diagnóstica"
              items={[
                "A dificuldade em encontrar \"verdadeira vasculite\" em biópsias de urticária crônica/persistente deve-se, frequentemente, ao fato de a patologia ser uma dermatose neutrofílica intersticial, e não uma vasculite primária.",
              ]}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

function ContentSection({
  badge,
  title,
  items,
}: {
  badge: string;
  title: string;
  items: string[];
}) {
  const { tx } = useLanguage();

  return (
    <section className="rounded-[26px] border border-amber-200/80 bg-white/78 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 text-sm font-bold text-amber-950">
          {badge}
        </span>
        <h3 className="font-serif text-2xl text-stone-900">{tx(title)}</h3>
      </div>

      <ul className="space-y-3 text-sm leading-7 text-stone-700">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-amber-400 to-yellow-600" />
            <span>{tx(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GoldBarsHero() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <defs>
        <linearGradient id="dun-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path d="M8 36 24 28l10 8-16 8Z" fill="url(#dun-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 30 44 22l12 8-16 8Z" fill="url(#dun-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 18 36 10l12 8-16 8Z" fill="url(#dun-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
