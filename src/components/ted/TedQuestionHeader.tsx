interface TedQuestionHeaderProps {
  questionNumber: number;
  sourceLabel: string;
  area: string;
  subarea: string;
  difficulty: string;
}

export function TedQuestionHeader({ questionNumber, sourceLabel, area, subarea, difficulty }: TedQuestionHeaderProps) {
  return (
    <div className="border-b border-[#f2dfc3] bg-[linear-gradient(135deg,#fffaf0_0%,#fff3dd_100%)] px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b46800]">
            Questão {questionNumber} • {sourceLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {area}
            </span>
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {subarea}
            </span>
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
