import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizCroppedImage from "../assets/Quiz-cropped.png";
import { Layout } from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";

const CASE_SEEN_STORAGE_KEY = "dermpath-quiz-dermatite-seen";

type SeenCasesState = Record<string, boolean>;

const quizCards = [
  { id: "quiz-1", route: "/quiz/dermatite/1", labelPt: "Quiz Dermatite 1", labelEn: "Dermatitis Quiz 1" },
  { id: "quiz-2", route: "/quiz/dermatite/2", labelPt: "Quiz Dermatite 2", labelEn: "Dermatitis Quiz 2" },
] as const;

export function DermatiteQuizListPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [seenCases, setSeenCases] = useState<SeenCasesState>({});

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rawValue = window.localStorage.getItem(CASE_SEEN_STORAGE_KEY);
    if (!rawValue) {
      return;
    }

    try {
      setSeenCases(JSON.parse(rawValue) as SeenCasesState);
    } catch {
      setSeenCases({});
    }
  }, []);

  function handleSeenToggle(caseId: string) {
    setSeenCases((currentState) => {
      const nextState = { ...currentState, [caseId]: !currentState[caseId] };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(CASE_SEEN_STORAGE_KEY, JSON.stringify(nextState));
      }

      return nextState;
    });
  }

  return (
    <Layout title={isPortuguese ? "Quiz Dermatite" : "Dermatitis Quiz"} subtitle={isPortuguese ? "Quiz Dermatite" : "Dermatitis Quiz"} compactHeader>
      <section className="rounded-[24px] border border-sand bg-white/95 p-5 shadow-panel">
        <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.12),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(246,248,244,0.98)_100%)] p-4 sm:p-5">
          <div className="grid justify-start gap-4">
            {quizCards.map((card) => {
              const isSeen = Boolean(seenCases[card.id]);

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => navigate(card.route)}
                  className="inline-flex w-fit max-w-full items-center gap-4 rounded-[24px] border border-[#e3d3fb] bg-white px-5 py-4 text-left shadow-[0_18px_30px_-24px_rgba(39,19,71,0.18)] transition hover:-translate-y-0.5 hover:border-[#d0b9f5] hover:shadow-[0_22px_34px_-24px_rgba(39,19,71,0.22)]"
                >
                  <img src={quizCroppedImage} alt="" aria-hidden="true" className="h-10 w-auto shrink-0 object-contain sm:h-11" />

                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-lg font-semibold leading-tight text-[#6c56dd]">
                      {isPortuguese ? card.labelPt : card.labelEn}
                    </span>

                    <label
                      className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#786c98]"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>{isPortuguese ? "Caso visto" : "Case seen"}</span>
                      <input
                        type="checkbox"
                        checked={isSeen}
                        onChange={() => handleSeenToggle(card.id)}
                        className="h-4 w-4 rounded border border-[#cfb9ef] text-[#6c56dd] focus:ring-[#c8b3eb]"
                      />
                    </label>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
