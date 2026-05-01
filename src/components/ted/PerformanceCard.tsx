interface PerformanceCardProps {
  label: string;
  value: string;
  helper: string;
  currentNum?: number;
  target?: number;
  targetLabel?: string;
}

export function PerformanceCard({ label, value, helper, currentNum, target, targetLabel }: PerformanceCardProps) {
  const progressPct =
    target != null && currentNum != null ? Math.min(100, Math.round((currentNum / target) * 100)) : null;

  return (
    <article className="rounded-[18px] border border-[#ede5d8] bg-[#faf7f3] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b96d00]">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="font-serif text-3xl text-ink">{value}</p>
        {target != null && (
          <span className="text-xs text-steel">meta: {targetLabel ?? `${target}%`}</span>
        )}
      </div>
      {progressPct != null && (
        <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#ddd0c0]">
          <div
            className="h-full rounded-full bg-[#b96d00] transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}
      <p className="mt-2 text-xs leading-5 text-steel">{helper}</p>
    </article>
  );
}
