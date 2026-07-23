import type { TedQuestionScope } from "../../types/ted";

interface Props {
  value: TedQuestionScope;
  onChange: (scope: TedQuestionScope) => void;
}

export function ScopeSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-3 rounded-[24px] border border-[#d9c99f] bg-[#f4ecdd] p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#99711f]">
        Escopo das questões
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange("dermatopatologia")}
          className={`flex items-center gap-3 rounded-[18px] border px-4 py-3.5 text-left transition ${
            value === "dermatopatologia"
              ? "border-[#0b3e76] bg-[#0a376d] text-white shadow-[0_18px_34px_-26px_rgba(8,47,96,0.7)]"
              : "border-[#d8c9a8] bg-[#fffdf8] text-[#082f60] hover:border-[#c6a653]"
          }`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${
            value === "dermatopatologia" ? "bg-white/10 text-[#dfc16b]" : "bg-[#ede3d0]"
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
          className={`flex items-center gap-3 rounded-[18px] border px-4 py-3.5 text-left transition ${
            value === "ted_completo"
              ? "border-[#0b3e76] bg-[#0a376d] text-white shadow-[0_18px_34px_-26px_rgba(8,47,96,0.7)]"
              : "border-[#d8c9a8] bg-[#fffdf8] text-[#082f60] hover:border-[#c6a653]"
          }`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${
            value === "ted_completo" ? "bg-white/10 text-[#dfc16b]" : "bg-[#ede3d0]"
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
