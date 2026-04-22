import type { TedQuestion } from "../../types/ted";

interface QuestionCardProps {
  question: TedQuestion;
  progressLabel: string;
  areaLabel: string;
  difficultyLabel: string;
}

export function QuestionCard({ question, progressLabel, areaLabel, difficultyLabel }: QuestionCardProps) {
  return (
    <section className="overflow-hidden rounded-[30px] border border-[#efd6b3] bg-white/95 shadow-panel">
      <div className="border-b border-[#f2dfc3] bg-[linear-gradient(135deg,#fffaf0_0%,#fff3dd_100%)] px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b46800]">{progressLabel}</p>
            <h2 className="font-serif text-3xl text-ink">Questão {question.questionNumber}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {areaLabel}
            </span>
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {question.subarea}
            </span>
            <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
              {difficultyLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="rounded-[24px] border border-[#f2e2ca] bg-[#fffdfa] p-5">
            <p className="text-sm leading-8 text-steel">{question.statement}</p>
          </div>

          {question.promptImageUrl ? (
            <figure className="overflow-hidden rounded-[24px] border border-[#f2dfc3] bg-white shadow-sm">
              <img
                src={question.promptImageUrl}
                alt={`Questão ${question.questionNumber}`}
                className="block h-auto w-full object-contain"
              />
            </figure>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-[#f2dfc3] bg-[#fff9ef] p-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#af6800]">Como responder</p>
            <p className="text-sm leading-7 text-steel">
              No padrão definitivo do TED, a alternativa é avaliada imediatamente no clique e o comentário em vídeo aparece após o acerto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
