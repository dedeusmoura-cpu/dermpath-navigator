import { Link, useLocation, useNavigate } from "react-router-dom";
import image1 from "../assets/Dermatites/Perivasculares/Psoriasiforme/Psoriasiforme apenas/PRP/Slide1.png";
import image2 from "../assets/Dermatites/Perivasculares/Psoriasiforme/Psoriasiforme apenas/PRP/Slide2.PNG";
import image3 from "../assets/Dermatites/Perivasculares/Psoriasiforme/Psoriasiforme apenas/PRP/Slide3.PNG";
import image4 from "../assets/Dermatites/Perivasculares/Psoriasiforme/Psoriasiforme apenas/PRP/Slide4.PNG";
import image5 from "../assets/Dermatites/Perivasculares/Psoriasiforme/Psoriasiforme apenas/PRP/Slide5.PNG";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { HistopathologyReportCard } from "../components/HistopathologyReportCard";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: image1, alt: "Pitiríase rubra pilar 1" },
  { src: image2, alt: "Pitiríase rubra pilar 2" },
  { src: image3, alt: "Pitiríase rubra pilar 3" },
  { src: image4, alt: "Pitiríase rubra pilar 4" },
  { src: image5, alt: "Pitiríase rubra pilar 5" },
];

export function PrpHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "dx-pitiríase-rubra-pilar";

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  return (
    <Layout>
      <div className="mx-auto max-w-[120rem] space-y-4">
        <div className="flex flex-wrap gap-3">
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
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">{tx("Histopatológico — Pitiríase rubra pilar")}</h2>
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
                subtitle="Dermatite psoriasiforme"
                paragraphs={[
                  "Trata-se de pele com epiderme exibindo alternância de orto e paraceratose horizontal e verticalmente (padrão em \"tabuleiro de xadrez\"), hiperplasia psoriasiforme e plug folicular. Em derme superficial, há leve infiltrado linfocitário perivascular. Os achados são consistentes com Pitiríase Rubra Pilar. Correlação clínica indicada para corroborar esse diagnóstico.",
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}



