import { useNavigate } from "react-router-dom";
import processoCistoImage from "../assets/ProcessoPatologico/processo-cisto.png";
import processoDepositoImage from "../assets/ProcessoPatologico/processo-deposito.png";
import processoDermatiteImage from "../assets/ProcessoPatologico/processo-dermatite.png";
import processoHamartomaMalformacaoImage from "../assets/ProcessoPatologico/processo-hamartoma-malformacao.png";
import processoNeoplasiaImage from "../assets/ProcessoPatologico/processo-neoplasia.png";
import microscopioBrancoImage from "../assets/microscopio-branco.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const quizCards = {
  pt: [
    { id: "dermatite", label: "Dermatite", hint: "", imageSrc: processoDermatiteImage },
    { id: "neoplasia", label: "Neoplasia", hint: "", imageSrc: processoNeoplasiaImage },
    { id: "cisto", label: "Cisto", hint: "Ramo futuro", imageSrc: processoCistoImage },
    { id: "deposito", label: "Depósito", hint: "Ramo futuro", imageSrc: processoDepositoImage },
    { id: "hamartoma", label: "Hamartoma / malformação", hint: "Ramo futuro", imageSrc: processoHamartomaMalformacaoImage },
  ],
  en: [
    { id: "dermatite", label: "Dermatitis", hint: "", imageSrc: processoDermatiteImage },
    { id: "neoplasia", label: "Neoplasia", hint: "", imageSrc: processoNeoplasiaImage },
    { id: "cisto", label: "Cyst", hint: "Future branch", imageSrc: processoCistoImage },
    { id: "deposito", label: "Deposit", hint: "Future branch", imageSrc: processoDepositoImage },
    { id: "hamartoma", label: "Hamartoma / malformation", hint: "Future branch", imageSrc: processoHamartomaMalformacaoImage },
  ],
} as const;

const circularPositions: Record<string, { angle: number; radius: number }> = {
  dermatite: { angle: -90, radius: 35.5 },
  neoplasia: { angle: -18, radius: 35.5 },
  cisto: { angle: 54, radius: 35.5 },
  deposito: { angle: 126, radius: 35.5 },
  hamartoma: { angle: 198, radius: 35.5 },
};

export function QuizPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const cards = quizCards[isPortuguese ? "pt" : "en"];

  function openCard(cardId: string) {
    if (cardId === "dermatite") {
      navigate("/quiz/dermatite");
    }
  }

  return (
    <Layout title="Quiz" subtitle="Quiz" compactHeader>
      <section className="rounded-[24px] border border-sand bg-white/95 p-5 shadow-panel">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
          {cards.map((card) => (
            <QuizMobileCard
              key={card.id}
              label={card.label}
              imageSrc={card.imageSrc}
              enabled={card.id === "dermatite"}
              onClick={() => openCard(card.id)}
            />
          ))}
        </div>

        <div className="relative hidden min-h-[900px] overflow-hidden rounded-[36px] border border-sand bg-[radial-gradient(circle_at_center,_rgba(169,122,31,0.08),_transparent_55%)] px-8 py-8 xl:block">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8CE3B8]/70 shadow-[inset_0_18px_42px_rgba(255,255,255,0.48),0_34px_90px_-50px_rgba(17,136,84,0.34)]"
            style={{
              background:
                "radial-gradient(circle at center, #14985B 0%, #1AA764 25%, rgba(77, 190, 129, 0.82) 50%, rgba(153, 226, 186, 0.72) 72%, rgba(224, 246, 233, 0.9) 88%, rgba(255, 255, 255, 0.99) 100%)",
            }}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-[#56C98D]/80 shadow-[0_0_0_10px_rgba(86,201,141,0.08)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
            <img
              src={microscopioBrancoImage}
              alt=""
              aria-hidden="true"
              className="h-[214px] w-[214px] object-contain drop-shadow-[0_14px_26px_rgba(10,92,59,0.12)]"
            />
          </div>

          {cards.map((card) => {
            const position = circularPositions[card.id];
            const angleInRadians = (position.angle * Math.PI) / 180;
            const orbitX = Math.cos(angleInRadians) * position.radius;
            const orbitY = Math.sin(angleInRadians) * position.radius;
            const isEnabled = card.id === "dermatite";

            return (
              <button
                key={card.id}
                type="button"
                disabled={!isEnabled}
                aria-disabled={!isEnabled}
                onClick={() => openCard(card.id)}
                style={{
                  left: `calc(50% + ${orbitX.toFixed(2)}%)`,
                  top: `calc(50% + ${orbitY.toFixed(2)}%)`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute flex w-[228px] flex-col items-stretch gap-0 overflow-visible bg-transparent text-left transition ${
                  isEnabled ? "cursor-pointer hover:-translate-y-1" : "cursor-default"
                }`}
              >
                <div className="-mb-1 w-full overflow-visible bg-transparent">
                  <img src={card.imageSrc} alt={card.label} className="block h-auto w-full object-contain object-center" />
                </div>
                <div className="mt-0 flex min-h-[42px] w-full items-center justify-center rounded-b-[28px] bg-white px-4 py-2.5 text-center">
                  <div>
                    <h3 className="text-[0.98rem] font-semibold leading-6 text-ink">{card.label}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

interface QuizMobileCardProps {
  label: string;
  imageSrc: string;
  enabled: boolean;
  onClick: () => void;
}

function QuizMobileCard({ label, imageSrc, enabled, onClick }: QuizMobileCardProps) {
  return (
    <button
      type="button"
      disabled={!enabled}
      aria-disabled={!enabled}
      onClick={onClick}
      className={`flex flex-col items-stretch gap-0 overflow-visible bg-transparent text-left transition ${
        enabled ? "hover:-translate-y-0.5" : ""
      }`}
    >
      <div className="-mb-1 overflow-visible bg-transparent">
        <img src={imageSrc} alt={label} className="block h-auto w-full object-contain object-center" />
      </div>
      <div className="mt-0 flex min-h-[48px] items-center justify-center rounded-b-[22px] bg-white px-4 py-2.5 text-center">
        <div>
          <h3 className="text-base font-semibold leading-6 text-ink">{label}</h3>
        </div>
      </div>
    </button>
  );
}
