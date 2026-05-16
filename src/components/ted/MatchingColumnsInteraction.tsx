import { useMemo, useState } from "react";
import type { TedMatchingColumns } from "../../types/ted";

interface Props {
  columns: TedMatchingColumns;
  correctOptionText: string | null;
  postStatement?: string | null;
}

export function MatchingColumnsInteraction({ columns, correctOptionText, postStatement }: Props) {
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

  // Parse correct sequence from option text like "4, 1, 2, 3" or "3 – 2 – 1 – 4"
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
                            ? "border-amber-500 bg-amber-200 hover:border-amber-600"
                            : "border-[#f6e8cf] bg-[#fffaf2] hover:border-amber-300",
                  ].join(" ")}
                >
                  <span>{item}</span>
                  {isCorrect && <span className="ml-2 text-xs text-emerald-600">&#10003;</span>}
                  {isWrong && <span className="ml-2 text-xs text-red-500">&#10007;</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column — shuffled, ( ) filled interactively */}
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
                        : canClick && assignedNum !== null && assignments[originalRightIdx] === selectedLeft
                          ? "border-amber-500 bg-amber-200 ring-1 ring-amber-400 cursor-pointer"
                          : canClick && assignedNum !== null
                            ? "border-amber-500 bg-amber-200 cursor-pointer hover:border-amber-600"
                            : canClick
                              ? "border-amber-300 bg-[#fffaf2] hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
                              : assignedNum !== null
                                ? "border-amber-500 bg-amber-200"
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
                    {isCorrect && <span className="shrink-0 text-xs text-emerald-600">&#10003;</span>}
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
            : `Clique em um item de ${columns.leftTitle} para comecar a associar`}
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
                <span className="mx-1.5 text-[#b56d00]">&#8594;</span>
                {columns.leftItems[leftNum - 1]}
              </p>
            ))}
          </div>
        </section>
      )}

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
