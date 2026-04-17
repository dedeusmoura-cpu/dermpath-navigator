import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
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

  return (
    <Layout
      title={t("understand_better")}
      subtitle="Dermatite Neutrofílica e Granulomatosa de Paliçada"
      actions={
        <>
          <button
            type="button"
            onClick={goBackToDiagnosis}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {t("return_to_diagnosis")}
          </button>
          <Link to="/diagnostico" className="rounded-full border border-sand bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-[#fffaf0]">
            {t("back")}
          </Link>
        </>
      }
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={goBackToDiagnosis}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {t("return_to_diagnosis")}
          </button>
          <Link to="/diagnostico" className="rounded-full border border-sand bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:bg-[#fffaf0]">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">{t("special_content")}</p>
                  <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">
                    {tx("Dermatite Neutrofílica e Granulomatosa de Paliçada (Dermatite Granulomatosa Intersticial com Cordões e Artrite)")}
                  </h2>
                  <p className="max-w-3xl text-sm leading-6 text-stone-600 sm:text-base">
                    {tx("Clinicamente se apresenta como pápulas umbilicadas ou lesões infiltradas e mais lineares, formando cordões clinicamente.")}
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-amber-300/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-800">
                {t("expert_content")}
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8">
            <ContentCard
              title={t("histopathology")}
              items={[
                "No início é uma dermatite neutrofílica, com neutrófilos íntegros e fragmentados (lembrando Sd de Sweet), podendo ter vasculite.",
                'Depois faz uma dermatite granulomatosa intersticial ("dermatite granulomatosa intersticial com cordões e artrite), lembrando o granuloma anular. Mas geralmente o infiltrado é mais profundo, na derme reticular (GA tende a ser mais superficial, com focos de paliçada em torno de colágeno alterado com mucina). Presença de "floating sign" (sinal da flutuação) ou pseudo-rosetas histiocíticas.',
                "Fase final é mais fibrótica, lembrando necrobiose lipoídica.",
              ]}
            />

            <ContentCard
              title="Está relacionada a doenças sistêmicas com depósitos de imunocomplexos"
              items={[
                "Vasculites primárias (Doença de Wegener e de Churg-Strauss - Granulomatose com Poliangiite e Granulomatose com Poliangiite e Eosinofilia).",
                "Artrite Reumatoide e Lúpus Eritematoso.",
                "Neoplasias.",
                "Infecções (ex. Borreliose)",
                'Farmacodermias ("Dermatite granulomatosa intersticial secundária a Fármacos").',
              ]}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

function ContentCard({ title, items }: { title: string; items: string[] }) {
  const { tx } = useLanguage();

  return (
    <section className="rounded-[26px] border border-amber-200/80 bg-white/78 p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 text-sm font-bold text-amber-950">
          •
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
        <linearGradient id="palisaded-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path d="M8 36 24 28l10 8-16 8Z" fill="url(#palisaded-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 30 44 22l12 8-16 8Z" fill="url(#palisaded-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 18 36 10l12 8-16 8Z" fill="url(#palisaded-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

