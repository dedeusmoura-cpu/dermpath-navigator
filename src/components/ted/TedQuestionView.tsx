import { useEffect, useMemo, useState } from "react";
import type { TedMatchingColumns, TedQuestion } from "../../types/ted";
import { formatTedStatement } from "../../utils/tedStatement";
import { TedFeedbackMessage } from "./TedFeedbackMessage";
import { TedOptionList } from "./TedOptionList";
import { TedQuestionHeader } from "./TedQuestionHeader";
import { TedVideoCommentCard } from "./TedVideoCommentCard";

function MatchingColumnsInteraction({
  columns,
  correctOptionText,
  postStatement,
}: {
  columns: TedMatchingColumns;
  correctOptionText: string | null;
  postStatement?: string | null;
}) {
  const [shuffledRightIndices] = useState<number[]>(() => {
    const arr = columns.rightItems.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // assignments[originalRightIdx] = leftIdx (0-based), or null
  const [assignments, setAssignments] = useState<(number | null)[]>(
    () => new Array(columns.rightItems.length).fill(null),
  );
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);

  const allAssigned = assignments.every((a) => a !== null);

  // Correct sequence: for each rightItem[i] (original order), which left number (1-based) is correct
  // Parsed from option text like "4, 1, 2, 3" or "3 – 2 – 1 – 4"
  const correctSequence = useMemo<number[]>(() => {
    if (!correctOptionText) return [];
    const nums = correctOptionText.match(/\d+/g);
    return nums ? nums.map(Number) : [];
  }, [correctOptionText]);

  const hasValidSequence =
    correctSequence.length === columns.rightItems.length &&
    correctSequence.every((n) => n >= 1 && n <= columns.leftItems.length);

  function handleLeftClick(leftIdx: number) {
    if (verified) return;
    setSelectedLeft((prev) => (prev === leftIdx ? null : leftIdx));
  }

  function handleRightClick(originalRightIdx: number) {
    if (verified || selectedLeft === null) return;
    setAssignments((prev) => {
      const next = [...prev];
      if (next[originalRightIdx] === selectedLeft) {
        next[originalRightIdx] = null;
      } else {
        // Remove selectedLeft from any right item it was previously assigned to
        for (let i = 0; i < next.length; i++) {
          if (next[i] === selectedLeft) next[i] = null;
        }
        next[originalRightIdx] = selectedLeft;
      }
      return next;
    });
    setSelectedLeft(null);
  }

  return (
    <div className="space-y-4 rounded-[22px] border border-[#f2dfc3] bg-white p-4 sm:p-5">
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">
            {columns.leftTitle}
          </p>
          <div className="space-y-1.5">
            {columns.leftItems.map((item, leftIdx) => {
              const isActive = selectedLeft === leftIdx;
              const isAssigned = assignments.some((a) => a === leftIdx);
              const assignedToRightIdx = assignments.findIndex((a) => a === leftIdx);
              const isCorrect =
                verified && hasValidSequence && assignedToRightIdx !== -1 &&
                correctSequence[assignedToRightIdx] === leftIdx + 1;
              const isWrong =
                verified && hasValidSequence && assignedToRightIdx !== -1 && !isCorrect;

              return (
                <button
                  key={leftIdx}
                  type="button"
                  onClick={() => handleLeftClick(leftIdx)}
                  disabled={verified}
                  className={[
                    "w-full rounded-[16px] border px-3 py-2 text-left text-sm leading-6 text-steel transition",
                    isActive
                      ? "border-amber-400 bg-amber-50 ring-1 ring-amber-200"
                      : isCorrect
                        ? "border-emerald-300 bg-emerald-50/70"
                        : isWrong
                          ? "border-red-300 bg-red-50/70"
                          : isAssigned
                            ? "border-[#e0c88a] bg-[#fffbf0]"
                            : "border-[#f6e8cf] bg-[#fffaf2] hover:border-amber-300",
                  ].join(" ")}
                >
                  <span>{item}</span>
                  {isCorrect && <span className="ml-2 text-xs text-emerald-600">✓</span>}
                  {isWrong && <span className="ml-2 text-xs text-red-500">✗</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column (shuffled, with ( ) to fill) */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">
            {columns.rightTitle}
          </p>
          <div className="space-y-1.5">
            {shuffledRightIndices.map((originalRightIdx) => {
              const rawText = columns.rightItems[originalRightIdx];
              const assignedLeftIdx = assignments[originalRightIdx];
              const assignedNum = assignedLeftIdx !== null ? assignedLeftIdx + 1 : null;
              const displayText =
                assignedNum !== null
                  ? rawText.replace(/\(\s*\)/, `(${assignedNum})`)
                  : rawText;

              const correctNum = hasValidSequence ? correctSequence[originalRightIdx] : null;
              const isCorrect = verified && assignedNum !== null && assignedNum === correctNum;
              const isWrong = verified && assignedNum !== null && assignedNum !== correctNum;
              const canClick = !verified && selectedLeft !== null;

              return (
                <button
                  key={originalRightIdx}
                  type="button"
                  onClick={() => handleRightClick(originalRightIdx)}
                  disabled={verified || selectedLeft === null}
                  className={[
                    "w-full rounded-[16px] border px-3 py-2 text-left text-sm leading-6 text-steel transition",
                    isCorrect
                      ? "border-emerald-300 bg-emerald-50/70"
                      : isWrong
                        ? "border-red-300 bg-red-50/70"
                        : canClick
                          ? "border-amber-300 bg-[#fffaf2] hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
                          : assignedNum !== null
                            ? "border-[#e0c88a] bg-[#fffbf0]"
                            : "border-[#f6e8cf] bg-[#fffaf2]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span>{displayText}</span>
                    {isWrong && correctNum !== null && (
                      <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                        ({correctNum})
                      </span>
                    )}
                    {isCorrect && <span className="shrink-0 text-xs text-emerald-600">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      {!verified && (
        <p className="text-center text-xs text-steel/50">
          {selectedLeft !== null
            ? `Selecione o item correspondente em ${columns.rightTitle}`
            : `Clique em um item de ${columns.leftTitle} para começar a associar`}
        </p>
      )}

      {/* Gabarito after verification */}
      {verified && hasValidSequence && (
        <section className="space-y-2 rounded-[16px] border border-emerald-200 bg-emerald-50/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Gabarito do emparelhamento
          </p>
          <div className="space-y-1">
            {correctSequence.map((leftNum, rightIdx) => (
              <p key={rightIdx} className="text-sm leading-7 text-steel">
                {columns.rightItems[rightIdx].replace(/\(\s*\)/, `(${leftNum})`)}
                <span className="mx-1.5 text-[#b56d00]">→</span>
                {columns.leftItems[leftNum - 1]}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {!verified ? (
          <button
            type="button"
            disabled={!allAssigned}
            onClick={() => setVerified(true)}
            className="flex-1 rounded-[16px] bg-[#b56d00] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9a5c00] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verificar emparelhamento
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setVerified(false);
              setAssignments(new Array(columns.rightItems.length).fill(null));
              setSelectedLeft(null);
            }}
            className="rounded-[16px] border border-[#f2dfc3] bg-white px-4 py-2.5 text-sm font-medium text-steel transition hover:border-amber-300 hover:text-ink"
          >
            Tentar novamente
          </button>
        )}
      </div>

      {postStatement && (
        <p className="text-sm font-medium leading-7 text-ink">{postStatement}</p>
      )}
    </div>
  );
}

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
              <MatchingColumnsInteraction
                key={question.id}
                columns={matchingColumns}
                correctOptionText={
                  question.options.find((o) => o.id === question.correctOption)?.text ?? null
                }
                postStatement={question.postStatement}
              />
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
