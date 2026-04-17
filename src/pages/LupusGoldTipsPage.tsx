import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
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

  return (
    <Layout
      title={t("gold_tips")}
      subtitle="Resumo Lúpus Cutâneo"
      actions={
        <>
          <button type="button" onClick={goBackToDiagnosis} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent">
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
          <button type="button" onClick={goBackToDiagnosis} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">{t("premium_lesson")}</p>
                  <h2 className="font-serif text-3xl text-stone-900 sm:text-4xl">{tx("Resumo Lúpus Cutâneo")}</h2>
                  <p className="max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                    {tx("Visão de apoio para consolidar classificação, padrões clínicos e lesões inespecíficas relacionadas ao lúpus.")}
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
              badge="A"
              title="Classificação do Lúpus cutâneo"
              items={[
                "Lúpus eritematoso cutâneo é dividido em agudo, subagudo e crônico. Não tem relação com a duração da doença. Essa terminologia está ligada à probabilidade desse lúpus cutâneo estar associado a lúpus sistêmico.",
              ]}
              topics={[
                {
                  title: "Lúpus eritematoso cutâneo agudo",
                  items: [
                    "Lesões bem efêmeras, rash malar, eritema no dorso das mãos.",
                    "90% de chance de estar associado a lúpus sistêmico.",
                  ],
                },
                {
                  title: "Lúpus eritematoso cutâneo subagudo",
                  items: [
                    "2 tipos principais.",
                    "Lesão policíclica anular em face anterior de tórax, ombro, dorso e rosto. Mais ativa na periferia.",
                    "Lesão psoriasiforme, igualzinha a psoríase, mas só em áreas fotoexpostas.",
                    "Não deixa atrofia. Marcada fotossensibilidade.",
                    "Cerca de 50% de chance de estar associado a lúpus sistêmico.",
                  ],
                },
                {
                  title: "Lúpus eritematoso cutâneo crônico",
                  items: [
                    "Lúpus discoide, tipo localizado, apenas no polo cefálico, com 5% de associação com lúpus sistêmico; e tipo generalizado, presente em 2 segmentos corporais, saindo do polo cefálico, com 15% de associação.",
                    "Geralmente epiderme muito atrófica, espessamento de membrana basal e alopécia em couro cabeludo.",
                    "Lúpus tímido: subtipo de lúpus discoide sem acometimento da epiderme.",
                    "Paniculite lúpica: 3 topografias clássicas, rosto, ombro e nádegas.",
                    "Paniculite lúpica: ocorre de forma isolada, com acometimento apenas de hipoderme.",
                    "Lúpus profundo: associado a alterações de lúpus na pele sobrejacente.",
                  ],
                },
              ]}
            />

            <ContentSection
              badge="B"
              title="Lesões inespecíficas do lúpus"
              items={[
                "Associadas ao lúpus, geralmente denotam que esse lúpus está em atividade. Mas não são específicas do lúpus.",
              ]}
              topics={[
                {
                  title: "Mucinose pápulo-nodular",
                  items: [
                    "Acúmulo de mucina na derme.",
                    "Sem infiltrado inflamatório.",
                    "Vacuolização.",
                    "Espessamento de membrana basal.",
                    "Esclerose de parede de vasos.",
                  ],
                },
                {
                  title: "Outras lesões inespecíficas",
                  items: ["Eritema nodoso.", "Vasculite leucocitoclástica."],
                },
                {
                  title: "REM (mucinose eritematosa reticulada)",
                  items: [
                    "Geralmente no tórax.",
                    "Pápulas eritematosas em arranjo reticulado.",
                    "Ackerman considerava uma manifestação do lúpus.",
                    "Pode ter alterações específicas do lúpus, como alteração de interface.",
                  ],
                },
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
  topics,
}: {
  badge: string;
  title: string;
  items: string[];
  topics: Array<{ title: string; items: string[] }>;
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

      <div className="space-y-5 text-sm leading-6 text-stone-700">
        <BulletList items={items} />
        {topics.map((topic) => (
          <div key={topic.title} className="space-y-2 border-t border-amber-100 pt-4">
            <p className="font-semibold text-stone-900">{tx(topic.title)}</p>
            <BulletList items={topic.items} />
          </div>
        ))}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  const { tx } = useLanguage();

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-br from-amber-400 to-yellow-600" />
          <span>{tx(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function GoldBarsHero() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <defs>
        <linearGradient id="tips-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path d="M8 36 24 28l10 8-16 8Z" fill="url(#tips-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 30 44 22l12 8-16 8Z" fill="url(#tips-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 18 36 10l12 8-16 8Z" fill="url(#tips-gold-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
