interface QuestionOptionsProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  submitted: boolean;
  onSelect: (index: number) => void;
}

export function QuestionOptions({ options, selectedIndex, correctIndex, submitted, onSelect }: QuestionOptionsProps) {
  return (
    <div className="space-y-3" role="radiogroup" aria-label="Alternativas da questão">
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = submitted && index === correctIndex;
        const isWrongSelected = submitted && isSelected && index !== correctIndex;

        return (
          <button
            key={`${option}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            disabled={submitted}
            className={`flex w-full items-start gap-3 rounded-[22px] border px-4 py-4 text-left transition ${
              isCorrect
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : isWrongSelected
                  ? "border-rose-300 bg-rose-50 text-rose-900"
                  : isSelected
                    ? "border-[#f0b14c] bg-[#fff6e8] text-ink"
                    : "border-[#ecdcc5] bg-white text-ink hover:border-[#eba84c] hover:bg-[#fffaf0]"
            }`}
            aria-pressed={isSelected}
          >
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                isCorrect
                  ? "bg-emerald-100 text-emerald-700"
                  : isWrongSelected
                    ? "bg-rose-100 text-rose-700"
                    : isSelected
                      ? "bg-[#ffe2ae] text-[#9d5c00]"
                      : "bg-[#fff4de] text-[#b46c00]"
              }`}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-sm leading-7">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
