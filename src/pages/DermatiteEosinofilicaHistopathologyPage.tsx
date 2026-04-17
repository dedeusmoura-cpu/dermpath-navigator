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
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">{tx("Histopatológico — Dermatite Eosinofílica")}</h2>
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


