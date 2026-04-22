import { getTedAreaStatus, getTedAreaStatusTone } from "../../utils/tedProgress";

interface PerformanceBarProps {
  nome: string;
  percentual: number;
  respondidas: number;
}

export function PerformanceBar({ nome, percentual, respondidas }: PerformanceBarProps) {
  const status = getTedAreaStatus(respondidas, percentual);

  return (
    <div className="space-y-2 rounded-[22px] border border-[#f2dfc8] bg-white/88 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">{nome}</h3>
          <p className="text-sm text-steel">{respondidas} questões respondidas</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-[#a56100]">{percentual}%</span>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTedAreaStatusTone(status)}`}>{status}</span>
        </div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#fff1d4]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#f59e0b_0%,#ffbd39_100%)] transition-all"
          style={{ width: `${Math.max(percentual, 4)}%` }}
        />
      </div>
    </div>
  );
}
