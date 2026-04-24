interface TedQuestionHeaderProps {
  questionNumber: number;
  sourceLabel: string;
  area: string;
  subarea?: string | null;
  difficulty: string;
  badgeLabel?: string;
  onNextQuestion?: () => void;
  nextQuestionDisabled?: boolean;
  nextQuestionLabel?: string;
}

export function TedQuestionHeader({
  questionNumber,
  sourceLabel,
  area,
  subarea,
  difficulty,
  badgeLabel,
  onNextQuestion,
  nextQuestionDisabled = false,
  nextQuestionLabel = "Próxima questão",
}: TedQuestionHeaderProps) {
  return (
    <div className="border-b border-[#f2dfc3] bg-[linear-gradient(135deg,#fffaf0_0%,#fff3dd_100%)] px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b46800]">
              Questão {questionNumber} • {sourceLabel}
            </p>
            {badgeLabel ? (
              <span className="rounded-full border border-[#f2cd97] bg-[#fff7ea] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a26000]">
                {badgeLabel}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {area}
            </span>
            {subarea ? (
              <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
                {subarea}
              </span>
            ) : null}
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {difficulty}
            </span>
          </div>
        </div>

        {onNextQuestion ? (
          <button
            type="button"
            onClick={onNextQuestion}
            disabled={nextQuestionDisabled}
            className="w-full rounded-full border border-[#f2cd97] bg-white px-4 py-2 text-sm font-semibold text-[#a26000] transition hover:bg-[#fff8eb] focus:outline-none focus:ring-2 focus:ring-[#f4a000]/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:shrink-0"
          >
            {nextQuestionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
