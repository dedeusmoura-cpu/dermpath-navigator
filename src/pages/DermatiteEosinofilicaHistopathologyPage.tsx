import { Link, useLocation, useNavigate } from "react-router-dom";
import image1 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide1.PNG";
import image2 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide2.PNG";
import image3 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide3.PNG";
import image4 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide4.PNG";
import image5 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide5.PNG";
import image6 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide6.PNG";
import image7 from "../assets/Dermatites/Nodular-Difusa/Dermatite Eosinofilica/Slide7.PNG";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { HistopathologyReportCard } from "../components/HistopathologyReportCard";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const images = [
  { src: image1, alt: "Dermatite Eosinofilica 1" },
  { src: image2, alt: "Dermatite Eosinofilica 2" },
  { src: image3, alt: "Dermatite Eosinofilica 3" },
  { src: image4, alt: "Dermatite Eosinofilica 4" },
  { src: image5, alt: "Dermatite Eosinofilica 5" },
  { src: image6, alt: "Dermatite Eosinofilica 6" },
  { src: image7, alt: "Dermatite Eosinofilica 7" },
];

export function DermatiteEosinofilicaHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, tx } = useLanguage();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;
  const favoriteNodeId = returnToNodeId ?? "placeholder-nodular-eosinofilico";

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
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">{tx("Histopatológico — Dermatite Eosinofílica")}</h2>
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
                subtitle="Dermatite eosinofílica"
                paragraphs={[
                  "Trata-se de pele recoberta por crosta, associada, na derme, a infiltrado inflamatório misto, superficial e profundo, rico em eosinófilos. Observa-se degranulação eosinofílica, com degeneração das fibras colágenas e formação de figuras em chama. O quadro corresponde a \"Dermatite eosinofílica com figuras em chama, padrão que pode ser observado em reação a insulto por artrópode, farmacodermia, síndrome de Wells, celulite eosinofílica, síndrome hipereosinofílica e outras condições associadas a infiltrado eosinofílico exuberante, devendo ser interpretado à luz da correlação clinicopatológica\".",
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}


