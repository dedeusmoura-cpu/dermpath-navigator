import { Link, useLocation, useNavigate } from "react-router-dom";
import image1 from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Ceratose Liquenoide/Slide1.PNG";
import image2 from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Ceratose Liquenoide/Slide2.PNG";
import image3 from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Ceratose Liquenoide/Slide3.png";
import image4 from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Ceratose Liquenoide/Slide4.PNG";
import image5 from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Ceratose Liquenoide/Slide5.PNG";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { HistopathologyReportCard } from "../components/HistopathologyReportCard";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: image1, alt: "Ceratose liquenoide 1" },
  { src: image2, alt: "Ceratose liquenoide 2" },
  { src: image3, alt: "Ceratose liquenoide 3" },
  { src: image4, alt: "Ceratose liquenoide 4" },
  { src: image5, alt: "Ceratose liquenoide 5" },
];

export function CeratoseLiquenoideHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "dx-ceratose-liquenoide";

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
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{t("didactic_slides")}</p>
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">{tx("Histopatológico — Ceratose Liquenoide Benigna")}</h2>
              <p className="max-w-4xl text-sm leading-6 text-steel">
                {tx("Visualização ampliada das imagens histopatológicas, seguindo o padrão didático do aplicativo.")}
              </p>
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
                subtitle="Ceratose liquenoide benigna"
                paragraphs={[
                  "Trata-se de pele com epiderme sem atipias exibindo ortoceratose e alteração vacuolar de interface. Em derme, há moderado infiltrado linfocitário em faixa, corpos de Civatte e leve derrame pigmentar. Neste contexto clínico de lesão única tumoral, os achados são consistentes com Ceratose Liquenoide Benigna. Ceratose liquenoide benigna é geralmente resultado de reação inflamatória regressiva desencadeada por lentigo solar ou ceratose seborreica.",
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

