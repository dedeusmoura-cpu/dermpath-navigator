interface CorrectAnswerBannerProps {
  isPortuguese?: boolean;
}

export function CorrectAnswerBanner({ isPortuguese = true }: CorrectAnswerBannerProps) {
  return (
    <div className="correct-answer-banner">
      <div className="correct-answer-banner__icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
          <path
            d="M5.5 10.5 8.5 13.5 14.5 6.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="correct-answer-banner__title">{isPortuguese ? "Resposta correta! ✅" : "Correct answer! ✅"}</p>
        <p className="correct-answer-banner__body">
          {isPortuguese
            ? "Analise as próximas imagens para prosseguir no algoritmo."
            : "Review the next images to continue through the algorithm."}
        </p>
      </div>
    </div>
  );
}
