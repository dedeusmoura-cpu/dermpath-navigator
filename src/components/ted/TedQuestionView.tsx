import { useMemo, useState } from "react";
import type { TedQuestion } from "../../types/ted";
import { TedFeedbackMessage } from "./TedFeedbackMessage";
import { TedOptionList } from "./TedOptionList";
import { TedQuestionHeader } from "./TedQuestionHeader";
import { TedVideoCommentCard } from "./TedVideoCommentCard";

interface TedQuestionViewProps {
  question: TedQuestion;
  areaLabel: string;
  difficultyLabel: string;
  onFirstAttempt: (params: { selectedOptionId: string; firstAttemptCorrect: boolean }) => void;
  onResolved: () => void;
}

export function TedQuestionView({ question, areaLabel, difficultyLabel, onFirstAttempt, onResolved }: TedQuestionViewProps) {
  const [selectedWrongOptionIds, setSelectedWrongOptionIds] = useState<string[]>([]);
  const [resolved, setResolved] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState<"idle" | "error" | "success">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>();
  const [firstAttemptDone, setFirstAttemptDone] = useState(false);
  const [promptImageVisible, setPromptImageVisible] = useState(Boolean(question.promptImageUrl));
  const [supportImageVisible, setSupportImageVisible] = useState(Boolean(question.supportImageUrl));

  const correctOption = useMemo(
    () => question.options.find((option) => option.id === question.correctOption),
    [question.correctOption, question.options],
  );
  const matchingColumns = question.statementType === "matching_columns" ? question.matchingColumns ?? null : null;

  function handleSelect(optionId: string) {
    if (resolved) {
      return;
    }

    const isCorrect = optionId === question.correctOption;

    if (!firstAttemptDone) {
      onFirstAttempt({ selectedOptionId: optionId, firstAttemptCorrect: isCorrect });
      setFirstAttemptDone(true);
    }

    if (isCorrect) {
      setResolved(true);
      setFeedbackVariant("success");
      setFeedbackMessage("Resposta correta! ✅");
      onResolved();
      return;
    }

    setSelectedWrongOptionIds((current) => (current.includes(optionId) ? current : [...current, optionId]));
    setFeedbackVariant("error");
    setFeedbackMessage("Tente de novo");
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-[#efd6b3] bg-white/95 shadow-panel">
      <TedQuestionHeader
        questionNumber={question.questionNumber}
        sourceLabel={question.sourceLabel}
        area={areaLabel}
        subarea={question.subarea}
        difficulty={difficultyLabel}
      />

      <div className="space-y-6 px-6 py-6">
        <div className="rounded-[24px] border border-[#f2e2ca] bg-[#fffdfa] p-5">
          <div className="space-y-5">
            <p className="text-base leading-8 text-steel">{question.statement}</p>

            {matchingColumns ? (
              <div className="space-y-4 rounded-[22px] border border-[#f2dfc3] bg-white p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-[20px] border border-[#f6e8cf] bg-[#fffaf2] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">
                      {matchingColumns.leftTitle}
                    </p>
                    <div className="mt-3 space-y-3">
                      {matchingColumns.leftItems.map((item) => (
                        <p key={item} className="text-sm leading-7 text-steel">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[20px] border border-[#f6e8cf] bg-[#fffaf2] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">
                      {matchingColumns.rightTitle}
                    </p>
                    <div className="mt-3 space-y-3">
                      {matchingColumns.rightItems.map((item) => (
                        <p key={item} className="text-sm leading-7 text-steel">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>

                {question.postStatement ? <p className="text-sm font-medium leading-7 text-ink">{question.postStatement}</p> : null}
              </div>
            ) : null}

            {!matchingColumns && question.postStatement ? (
              <p className="text-sm font-medium leading-7 text-ink">{question.postStatement}</p>
            ) : null}
          </div>
        </div>

        {question.promptImageUrl && promptImageVisible ? (
          <figure className="overflow-hidden rounded-[24px] border border-[#f2dfc3] bg-white shadow-sm">
            <img
              src={question.promptImageUrl}
              alt={`Enunciado visual da questão ${question.questionNumber}`}
              className="block h-auto w-full object-contain"
              onError={() => setPromptImageVisible(false)}
            />
          </figure>
        ) : null}

        {question.supportImageUrl && supportImageVisible ? (
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Imagem complementar</p>
            <figure className="overflow-hidden rounded-[24px] border border-[#f2dfc3] bg-white shadow-sm">
              <img
                src={question.supportImageUrl}
                alt={`Imagem complementar da questão ${question.questionNumber}`}
                className="block h-auto w-full object-contain"
                onError={() => setSupportImageVisible(false)}
              />
            </figure>
          </section>
        ) : null}

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Alternativas</p>
            <p className="mt-2 text-sm leading-7 text-steel">
              Clique diretamente na opção desejada. Se errar, você pode tentar novamente até acertar.
            </p>
          </div>

          <TedOptionList
            options={question.options}
            selectedWrongOptionIds={selectedWrongOptionIds}
            correctOptionId={resolved ? question.correctOption : undefined}
            resolved={resolved}
            onSelect={handleSelect}
          />

          <TedFeedbackMessage variant={feedbackVariant} message={feedbackMessage} />
        </div>

        {resolved ? (
          <div className="space-y-5">
            <section className="rounded-[28px] border border-emerald-200 bg-emerald-50/80 p-5">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Explicação resumida</p>
                    <h3 className="mt-2 font-serif text-2xl text-ink">
                      Alternativa correta: {correctOption?.id} {correctOption ? `• ${correctOption.text}` : ""}
                    </h3>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[22px] bg-white/82 p-4">
                    <p className="text-sm leading-7 text-steel">{question.explanationShort}</p>
                  </div>
                  <div className="rounded-[22px] bg-white/82 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad6700]">Ponto-chave</p>
                    <p className="mt-3 text-sm leading-7 text-steel">{question.keyPoint}</p>
                  </div>
                </div>
              </div>
            </section>

            <TedVideoCommentCard
              videoCommentTitle={question.videoCommentTitle}
              videoCommentUrl={question.videoCommentUrl}
              videoProvider={question.videoProvider}
              helperText={question.teacherComment}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
