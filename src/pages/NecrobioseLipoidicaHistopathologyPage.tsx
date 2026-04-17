import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { HistopathologyReportCard } from "../components/HistopathologyReportCard";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide1.PNG", import.meta.url).href, alt: "Histopatológico 1" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide2.PNG", import.meta.url).href, alt: "Histopatológico 2" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide3.PNG", import.meta.url).href, alt: "Histopatológico 3" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide4.PNG", import.meta.url).href, alt: "Histopatológico 4" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide5.PNG", import.meta.url).href, alt: "Histopatológico 5" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide6.PNG", import.meta.url).href, alt: "Histopatológico 6" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide7.PNG", import.meta.url).href, alt: "Histopatológico 7" },
  { src: new URL("../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/Slide8.PNG", import.meta.url).href, alt: "Histopatológico 8" },
];

export function NecrobioseLipoidicaHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "dx-necrobiose-lipoidica";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  return (
    <Layout>
      <div className="mx-auto max-w-[110rem]">
        <div className="mb-4 flex flex-wrap gap-3">
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

        <section className="overflow-hidden rounded-[30px] border border-sand bg-white shadow-panel">
          <div className="border-b border-sand bg-[radial-gradient(circle_at_top_left,_rgba(169,122,31,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(20,27,43,0.08),_transparent_38%)] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("didactic_slides")}</p>
                <h2 className="font-serif text-3xl text-ink sm:text-4xl">Histopatológico — Necrobiose lipoídica</h2>
                <p className="max-w-4xl text-sm leading-6 text-steel">
                  Visualização ampliada das 8 imagens histopatológicas, com foco em leitura confortável e detalhada.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-paper px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
            <div className="space-y-6">
              {images.map((image) => (
                <figure key={image.alt} className="overflow-hidden rounded-[24px] border border-sand bg-white p-3 shadow-panel sm:p-4">
                  <img src={image.src} alt={image.alt} className="h-auto w-full rounded-[18px] object-contain" />
                </figure>
              ))}

              <HistopathologyReportCard
                subtitle="Dermatite granulomatosa em paliçada. Ver comentário."
                paragraphs={[
                  "Comentário: trata-se de pele apresentando, em derme superficial e profunda, áreas de necrobiose do colágeno (colágeno degenerado/hialinizado), circundadas por infiltrado granulomatoso em paliçada composto por histiócitos epitelioides, linfócitos e plasmócitos, com células gigantes multinucleadas ocasionais. As zonas de infiltrado granulomatoso se alternam com faixas de colágeno degenerado. Os achados são compatíveis com Necrobiose Lipoídica.",
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
