import { useEffect, useMemo, useState } from "react";
import type { TedQuestion } from "../../types/ted";
import { formatTedStatement } from "../../utils/tedStatement";
import { TedFeedbackMessage } from "./TedFeedbackMessage";
import { TedOptionList } from "./TedOptionList";
import { TedQuestionHeader } from "./TedQuestionHeader";
import { TedVideoCommentCard } from "./TedVideoCommentCard";

interface TedQuestionViewProps {
  question: TedQuestion;
  areaLabel: string;
  difficultyLabel: string;
  badgeLabel?: string;
  onFirstAttempt: (params: { selectedOptionId: string; firstAttemptCorrect: boolean }) => void;
  onResolved: () => void;
  onNextQuestion?: () => void;
  nextQuestionDisabled?: boolean;
  nextQuestionLabel?: string;
}

function ImageLightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={label}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        />
        {label && (
          <p className="mt-2 text-center text-sm font-medium text-white/80">{label}</p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-ink shadow-lg hover:bg-stone-100"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function TedQuestionView({
  question,
  areaLabel,
  difficultyLabel,
  badgeLabel,
  onFirstAttempt,
  onResolved,
  onNextQuestion,
  nextQuestionDisabled,
  nextQuestionLabel,
}: TedQuestionViewProps) {
  const [selectedWrongOptionIds, setSelectedWrongOptionIds] = useState<string[]>([]);
  const [resolved, setResolved] = useState(false);
  const [feedbackVariant, setFeedbackVariant] = useState<"idle" | "error" | "success">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>();
  const [firstAttemptDone, setFirstAttemptDone] = useState(false);
  const [promptImageVisible, setPromptImageVisible] = useState(Boolean(question.promptImageUrl));
  const [supportImageVisible, setSupportImageVisible] = useState(Boolean(question.supportImageUrl));
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const correctOption = useMemo(
    () => question.options.find((option) => option.id === question.correctOption),
    [question.correctOption, question.options],
  );
  const matchingColumns = question.statementType === "matching_columns" ? question.matchingColumns ?? null : null;
  const formattedStatement = useMemo(() => formatTedStatement(question.statement), [question.statement]);
  const practicalImages =
    question.section === "theoretical_practical" && question.hasImages
      ? (question.visualPanelImages?.filter((image) => Boolean(image.src)).length
          ? question.visualPanelImages
          : question.images
        )?.filter((image) => Boolean(image.src)) ?? []
      : [];

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
        subarea={resolved ? question.subarea : undefined}
        difficulty={difficultyLabel}
        badgeLabel={badgeLabel}
        onNextQuestion={onNextQuestion}
        nextQuestionDisabled={nextQuestionDisabled}
        nextQuestionLabel={nextQuestionLabel}
      />

      <div className="space-y-6 px-6 py-6">
        <div className="rounded-[24px] border border-[#f2e2ca] bg-[#fffdfa] p-5">
          <div className="space-y-5">
            {question.notes ? (
              <div className="flex items-start gap-2 rounded-[12px] border border-amber-300 bg-amber-50 px-3 py-2.5">
                <span className="mt-px text-amber-500">⚠️</span>
                <p className="text-xs leading-5 text-amber-800">{question.notes}</p>
              </div>
            ) : null}
            {formattedStatement.kind === "true_false" ? (
              <div className="space-y-4">
                {formattedStatement.intro ? <p className="text-base leading-8 text-steel">{formattedStatement.intro}</p> : null}
                <div className="space-y-3">
                  {formattedStatement.assertions.map((assertion, index) => (
                    <p key={index} className="rounded-[18px] border border-[#f6e8cf] bg-white px-4 py-3 text-base leading-8 text-steel">
                      {assertion}
                    </p>
                  ))}
                </div>
                {formattedStatement.closing ? (
                  <p className="text-sm font-medium leading-7 text-ink">{formattedStatement.closing}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-base leading-8 text-steel whitespace-pre-line">{formattedStatement.text}</p>
            )}

            {matchingColumns ? (
              <div className="space-y-4 rounded-[22px] border border-[#f2dfc3] bg-white p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-[20px] border border-[#f6e8cf] bg-[#fffaf2] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">
                      {matchingColumns.leftTitle}
                    </p>
                    <div className="mt-3 space-y-3">
                      {matchingColumns.leftItems.map((item, index) => (
                        <p key={index} className="text-sm leading-7 text-steel">
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
                      {matchingColumns.rightItems.map((item, index) => (
                        <p key={index} className="text-sm leading-7 text-steel">
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

        {practicalImages.length ? (
          <section className="space-y-4">
            <div
              className={
                practicalImages.length === 1
                  ? "mx-auto max-w-[480px]"
                  : practicalImages.length === 2
                    ? "grid grid-cols-2 gap-3"
                    : practicalImages.length === 3
                      ? "grid grid-cols-3 gap-3"
                      : "grid grid-cols-2 gap-3"
              }
            >
              {practicalImages.map((image) => (
                <figure
                  key={image.id}
                  className="group overflow-hidden rounded-2xl border border-sand/80 bg-paper shadow-sm cursor-zoom-in transition hover:border-[#e0b87a] hover:shadow-md"
                  onClick={() => setLightbox({ src: image.src, label: image.label })}
                >
                  <img src={image.src} alt={image.label} className="block w-full object-contain max-h-52 transition group-hover:opacity-90" />
                  <figcaption className="mt-2 px-3 pb-3 text-center text-xs font-medium text-steel">{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {lightbox && (
          <ImageLightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />
        )}

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
            correctOptionId={resolved ? (question.correctOption ?? undefined) : undefined}
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
                    {question.subarea ? (
                      <p className="mt-2 text-xs text-emerald-700">
                        <span className="font-semibold">Padrão morfológico:</span> {question.subarea}
                      </p>
                    ) : null}
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
