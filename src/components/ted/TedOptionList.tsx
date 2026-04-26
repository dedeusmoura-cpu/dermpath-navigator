import { useEffect, useRef, useState } from "react";
import type { TedQuestion } from "../../types/ted";

interface TedOptionListProps {
  options: TedQuestion["options"];
  selectedWrongOptionIds: string[];
  correctOptionId?: string;
  resolved: boolean;
  onSelect: (optionId: string) => void;
  /** Highlights one option as selected-but-pending (simulado mode pre-finish). No wrong/correct color. */
  selectedPendingOptionId?: string;
}

interface OptionItemProps {
  option: TedQuestion["options"][number];
  isWrong: boolean;
  isCorrect: boolean;
  isStruck: boolean;
  isPendingSelected: boolean;
  showScissors: boolean;
  zoneVisible: boolean;
  resolved: boolean;
  onSelect: () => void;
  onToggleStruck: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}

function OptionItem({
  option,
  isWrong,
  isCorrect,
  isStruck,
  isPendingSelected,
  showScissors,
  zoneVisible,
  resolved,
  onSelect,
  onToggleStruck,
  onHoverEnter,
  onHoverLeave,
}: OptionItemProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [strikeStyle, setStrikeStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (isStruck && badgeRef.current && textRef.current) {
      const containerLeft = badgeRef.current.parentElement?.getBoundingClientRect().left ?? 0;
      const badgeLeft = badgeRef.current.getBoundingClientRect().left - containerLeft;
      const textRight = textRef.current.getBoundingClientRect().right - containerLeft;
      setStrikeStyle({ left: badgeLeft - 8, width: textRight - badgeLeft + 16 });
    } else {
      setStrikeStyle(null);
    }
  }, [isStruck]);

  return (
    <div
      role="listitem"
      className={`relative overflow-visible flex w-full items-center rounded-[22px] border transition ${
        isCorrect
          ? "border-emerald-300 bg-emerald-50"
          : isWrong
            ? "border-rose-300 bg-rose-50"
            : isPendingSelected
              ? "border-[#c9d0de] bg-[#f3f5f9]"
              : isStruck
                ? "border-red-200 bg-red-50"
                : "border-[#ecdcc5] bg-white"
      }`}
    >
      {/* Scissors strike-zone — floats outside the card to the left */}
      {showScissors ? (
        <button
          type="button"
          onClick={onToggleStruck}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          aria-label={
            isStruck
              ? `Desfazer risco da alternativa ${option.id}`
              : `Riscar alternativa ${option.id}`
          }
          className={`absolute left-[-36px] top-0 flex h-full w-8 items-center justify-center rounded-[10px] transition-opacity duration-150 ${
            isStruck
              ? "bg-red-500 text-white opacity-100"
              : `border border-red-200 bg-red-50 text-red-400 ${
                  zoneVisible
                    ? "opacity-100"
                    : "opacity-0 [@media(hover:none)]:opacity-40"
                }`
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="-12 -12 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="-6" cy="-5" r="4" />
            <circle cx="-6" cy="5" r="4" />
            <line x1="-2" y1="-3.5" x2="10" y2="2" />
            <line x1="-2" y1="3.5" x2="10" y2="-2" />
          </svg>
        </button>
      ) : null}

      {/* Main selection button */}
      <button
        type="button"
        onClick={onSelect}
        disabled={resolved}
        className={`relative flex flex-1 px-4 py-4 text-left select-none ${
          resolved ? "cursor-default" : ""
        }`}
      >
        <span className="relative inline-flex flex-1 items-center gap-4">
          {/* Hand-drawn strike-through — width measured from badge left to text right */}
          {isStruck && strikeStyle ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                left: strikeStyle.left,
                width: strikeStyle.width,
                top: "50%",
                transform: "translateY(-50%)",
                height: "12px",
              }}
            >
              <svg
                width="100%"
                height="12"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                overflow="visible"
                style={{ display: "block" }}
              >
                <path
                  d="M 0 6 C 15 3, 30 9, 50 6 S 75 3, 100 6"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeOpacity="0.75"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          ) : null}

          <span
            ref={badgeRef}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${
              isCorrect
                ? "bg-emerald-100 text-emerald-700"
                : isWrong
                  ? "bg-rose-100 text-rose-700"
                  : isPendingSelected
                    ? "bg-[#1f2f4c] text-white"
                    : isStruck
                      ? "bg-red-100 text-red-400"
                      : "bg-[#fff1d5] text-[#b36a00]"
            }`}
          >
            {option.id}
          </span>
          <span
            ref={textRef}
            className={`text-sm leading-7 ${
              isCorrect
                ? "text-emerald-900"
                : isWrong
                  ? "text-rose-900"
                  : "text-ink"
            }`}
          >
            {option.text}
          </span>
        </span>
      </button>
    </div>
  );
}

export function TedOptionList({
  options,
  selectedWrongOptionIds,
  correctOptionId,
  resolved,
  onSelect,
  selectedPendingOptionId,
}: TedOptionListProps) {
  const [struckOptionIds, setStruckOptionIds] = useState<string[]>([]);
  const [hoveredStrikeZone, setHoveredStrikeZone] = useState<string | null>(null);

  useEffect(() => {
    if (resolved) {
      setStruckOptionIds([]);
    }
  }, [resolved]);

  function toggleStruck(optionId: string) {
    setStruckOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
  }

  return (
    <div
      className={`space-y-3 ${!resolved ? "pl-10" : ""}`}
      role="list"
      aria-label="Alternativas da questão"
    >
      {options.map((option) => {
        const isWrong = selectedWrongOptionIds.includes(option.id);
        const isCorrect = resolved && correctOptionId === option.id;
        const isStruck = !resolved && struckOptionIds.includes(option.id);
        const isPendingSelected = !resolved && selectedPendingOptionId === option.id;
        const showScissors = !resolved && !isPendingSelected;
        const zoneVisible = hoveredStrikeZone === option.id || isStruck;

        return (
          <OptionItem
            key={option.id}
            option={option}
            isWrong={isWrong}
            isCorrect={isCorrect}
            isStruck={isStruck}
            isPendingSelected={isPendingSelected}
            showScissors={showScissors}
            zoneVisible={zoneVisible}
            resolved={resolved}
            onSelect={() => {
              if (struckOptionIds.includes(option.id)) {
                setStruckOptionIds((current) => current.filter((id) => id !== option.id));
              }
              onSelect(option.id);
            }}
            onToggleStruck={() => toggleStruck(option.id)}
            onHoverEnter={() => setHoveredStrikeZone(option.id)}
            onHoverLeave={() => setHoveredStrikeZone(null)}
          />
        );
      })}
    </div>
  );
}
