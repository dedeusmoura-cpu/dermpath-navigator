import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import processoCistoImage from "../assets/ProcessoPatologico/processo-cisto.png";
import processoDepositoImage from "../assets/ProcessoPatologico/processo-deposito.png";
import processoDermatiteImage from "../assets/ProcessoPatologico/processo-dermatite.png";
import processoHamartomaMalformacaoImage from "../assets/ProcessoPatologico/processo-hamartoma-malformacao.png";
import processoNeoplasiaImage from "../assets/ProcessoPatologico/processo-neoplasia.png";
import quizMarkImage from "../assets/Quiz-branco.png";
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
  const quizCoreStyle: CSSProperties = {
    background:
      "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 18%, rgba(255,255,255,0) 34%), linear-gradient(135deg, #6610d9 0%, #b01feb 46%, #ff5ccf 100%)",
    boxShadow: "inset 0 12px 40px rgba(255,255,255,0.18), 0 32px 90px -35px rgba(144,30,210,0.6)",
  };

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
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0c8ea]/80"
            style={quizCoreStyle}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-[#7F5FB3]/90 shadow-[0_0_0_10px_rgba(127,95,179,0.08)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex w-[440px] max-w-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <img
              src={quizMarkImage}
              alt="Quiz"
              style={{ width: "100%", height: "auto" }}
              className="w-full object-contain drop-shadow-[0_14px_26px_rgba(92,9,157,0.16)]"
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
                className={`absolute w-[228px] overflow-hidden rounded-[28px] border border-sand bg-white text-left shadow-sm transition ${
                  isEnabled ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : "cursor-default"
                }`}
              >
                <div className="aspect-[5/4] overflow-hidden bg-paper">
                  <img src={card.imageSrc} alt={card.label} className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex min-h-[42px] items-center justify-center px-4 py-2.5 text-center">
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
      className={`overflow-hidden rounded-[22px] border border-sand bg-white text-left shadow-sm transition ${
        enabled ? "hover:-translate-y-0.5 hover:shadow-lg" : ""
      }`}
    >
      <div className="aspect-[5/4] overflow-hidden bg-paper p-3">
        <img src={imageSrc} alt={label} className="h-full w-full rounded-[16px] object-contain object-center" />
      </div>
      <div className="flex min-h-[48px] items-center justify-center px-4 py-2.5 text-center">
        <div>
          <h3 className="text-base font-semibold leading-6 text-ink">{label}</h3>
        </div>
      </div>
    </button>
  );
}
