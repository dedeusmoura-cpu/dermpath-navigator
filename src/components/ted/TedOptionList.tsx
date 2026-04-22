import type { TedQuestion } from "../../types/ted";

interface TedOptionListProps {
  options: TedQuestion["options"];
  selectedWrongOptionIds: string[];
  correctOptionId?: string;
  resolved: boolean;
  onSelect: (optionId: string) => void;
}

export function TedOptionList({
  options,
  selectedWrongOptionIds,
  correctOptionId,
  resolved,
  onSelect,
}: TedOptionListProps) {
  return (
    <div className="space-y-3" role="list" aria-label="Alternativas da questão">
      {options.map((option) => {
        const isWrong = selectedWrongOptionIds.includes(option.id);
        const isCorrect = resolved && correctOptionId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            disabled={resolved}
            className={`flex w-full items-start gap-4 rounded-[22px] border px-4 py-4 text-left transition ${
              isCorrect
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : isWrong
                  ? "border-rose-300 bg-rose-50 text-rose-900"
                  : "border-[#ecdcc5] bg-white text-ink hover:border-[#eba84c] hover:bg-[#fffaf0]"
            } ${resolved ? "cursor-default" : ""}`}
            role="listitem"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${
                isCorrect
                  ? "bg-emerald-100 text-emerald-700"
                  : isWrong
                    ? "bg-rose-100 text-rose-700"
                    : "bg-[#fff1d5] text-[#b36a00]"
              }`}
            >
              {option.id}
            </span>
            <span className="pt-1 text-sm leading-7">{option.text}</span>
          </button>
        );
      })}
    </div>
  );
}
