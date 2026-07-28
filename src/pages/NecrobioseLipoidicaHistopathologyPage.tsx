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
            className="rounded-full bg-[#082d5c] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(8,45,92,0.7)] transition hover:-translate-y-0.5 hover:bg-[#0a4a86]"
          >
            {t("return_to_diagnosis")}
          </button>
          <Link
            to="/diagnostico"
            className="rounded-full border border-[#b8c9df] bg-white px-5 py-3 text-sm font-semibold text-[#082d5c] transition hover:border-[#d6b766] hover:bg-[#f5f8fc]"
          >
            {t("back")}
          </Link>
          <FavoriteToggleButton nodeId={favoriteNodeId} />
        </div>

        <section className="overflow-hidden rounded-[30px] border border-[#b8c9df] bg-white shadow-[0_28px_70px_-40px_rgba(8,45,92,0.45)]">
          <div className="border-b border-[#d6b766]/25 bg-[radial-gradient(circle_at_top_left,_rgba(214,183,102,0.28),_transparent_32%),linear-gradient(135deg,#082d5c_0%,#0a4a86_58%,#1268a5_100%)] px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e1c77e]">{t("didactic_slides")}</p>
                <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">Histopatológico — Necrobiose lipoídica</h2>
                <p className="max-w-4xl text-sm leading-6 text-white/70">
                  Visualização ampliada das 8 imagens histopatológicas, com foco em leitura confortável e detalhada.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,#eef4fb_0%,#f8fbff_100%)] px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
            <div className="space-y-6">
              {images.map((image) => (
                <figure key={image.alt} className="overflow-hidden rounded-[24px] border border-[#c7d6e8] bg-white p-3 shadow-[0_22px_50px_-34px_rgba(8,45,92,0.4)] sm:p-4">
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
