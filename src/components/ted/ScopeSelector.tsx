import type { TedQuestionScope } from "../../types/ted";

interface Props {
  value: TedQuestionScope;
  onChange: (scope: TedQuestionScope) => void;
}

export function ScopeSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">
        Escopo das questões
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("dermatopatologia")}
          className={`flex items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition ${
            value === "dermatopatologia"
              ? "border-[#1f2f4c] bg-[#1f2f4c] text-white"
              : "border-[#efdfc6] bg-white text-ink hover:border-[#e9aa50]"
          }`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${
            value === "dermatopatologia" ? "bg-white/15" : "bg-[#f5ede0]"
          }`}>
            🔬
          </span>
          <div>
            <p className={`text-sm font-semibold leading-tight ${value === "dermatopatologia" ? "text-white" : "text-ink"}`}>
              Dermatopatologia
            </p>
            <p className={`mt-0.5 text-xs leading-tight ${value === "dermatopatologia" ? "text-white/60" : "text-steel"}`}>
              Foco na especialidade
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("ted_completo")}
          className={`flex items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition ${
            value === "ted_completo"
              ? "border-[#1f2f4c] bg-[#1f2f4c] text-white"
              : "border-[#efdfc6] bg-white text-ink hover:border-[#e9aa50]"
          }`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${
            value === "ted_completo" ? "bg-white/15" : "bg-[#f5ede0]"
          }`}>
            🏅
          </span>
          <div>
            <p className={`text-sm font-semibold leading-tight ${value === "ted_completo" ? "text-white" : "text-ink"}`}>
              TED Completo
            </p>
            <p className={`mt-0.5 text-xs leading-tight ${value === "ted_completo" ? "text-white/60" : "text-steel"}`}>
              Prepare-se para o título
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
