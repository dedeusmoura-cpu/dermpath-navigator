import { Link, useLocation, useNavigate } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { HistopathologyReportCard } from "../components/HistopathologyReportCard";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide2.png", import.meta.url).href, alt: "Lúpus túmido — imagem clínica 1" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide3.png", import.meta.url).href, alt: "Lúpus túmido — imagem clínica 2" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide4.png", import.meta.url).href, alt: "Lúpus túmido — histopatológico 1" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide5.png", import.meta.url).href, alt: "Lúpus túmido — histopatológico 2" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide6.png", import.meta.url).href, alt: "Lúpus túmido — histopatológico 3" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide7.png", import.meta.url).href, alt: "Lúpus túmido — histopatológico 4" },
  { src: new URL("../assets/Dermatites/Perivasculares/Sem alteração epidérmica/Apenas perivascular/Linfocitos apenas/Lupus Tumido/Slide8.png", import.meta.url).href, alt: "Lúpus túmido — histopatológico 5" },
];

export function LupusTumidoHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "dx-lupus-tumido";

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
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e1c77e]">{t("didactic_slides")}</p>
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">{tx("Histopatológico — Lúpus túmido")}</h2>
              <p className="max-w-4xl text-sm leading-6 text-white/70">
                {tx("Correlação clínico-histopatológica em 7 imagens, apresentadas na ordem dos arquivos Slide2 a Slide8.")}
              </p>
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,#eef4fb_0%,#f8fbff_100%)] px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
            <div className="space-y-6">
              {images.map((image, index) => (
                <figure key={image.src} className="overflow-hidden rounded-[24px] border border-[#c7d6e8] bg-white p-3 shadow-[0_22px_50px_-34px_rgba(8,45,92,0.4)] sm:p-4">
                  <img
                    src={image.src}
                    alt={tx(image.alt)}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-auto w-full rounded-[18px] object-contain"
                  />
                </figure>
              ))}

              <HistopathologyReportCard
                subtitle="Biópsia de pele:"
                paragraphs={[
                  "- Dermatite linfocitária superficial e profunda com acentuado depósito de mucina dérmica. Ver comentário.",
                  "Comentário: Trata-se de fragmentos de pele com epiderme relativamente preservada, com focos de alteração vacuolar de camada basal. Não há atrofia, hiperceratose, plugs foliculares ou espessamento significativo da membrana basal. Na derme superficial e profunda, observa-se infiltrado linfocitário leve a moderado, de distribuição predominantemente perivascular e perianexial. Evidencia-se acentuado depósito de mucina entre as fibras colágenas. Os achados histopatológicos são compatíveis com Lúpus Eritematoso Túmido.",
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
