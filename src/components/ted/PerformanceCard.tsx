interface PerformanceCardProps {
  label: string;
  value: string;
  helper: string;
}

export function PerformanceCard({ label, value, helper }: PerformanceCardProps) {
  return (
    <article className="rounded-[24px] border border-[#f0d8b7] bg-white/94 p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b96d00]">{label}</p>
      <p className="mt-3 font-serif text-4xl text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-steel">{helper}</p>
    </article>
  );
}
