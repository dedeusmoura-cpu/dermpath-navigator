import { Link } from "react-router-dom";

interface TedModeCardProps {
  to: string;
  title: string;
  body: string;
  cta: string;
  tone?: "primary" | "soft";
}

export function TedModeCard({ to, title, body, cta, tone = "soft" }: TedModeCardProps) {
  const toneClasses =
    tone === "primary"
      ? "border-[#f0ba69] bg-[linear-gradient(135deg,#fff9ec_0%,#fff1d3_100%)]"
      : "border-[#efd9bb] bg-white/94";

  return (
    <Link
      to={to}
      className={`group flex h-full flex-col justify-between rounded-[26px] border p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_28px_58px_-32px_rgba(80,42,0,0.24)] ${toneClasses}`}
    >
      <div className="space-y-3">
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
        <p className="text-sm leading-7 text-steel">{body}</p>
      </div>
      <span className="mt-5 inline-flex w-fit rounded-full bg-[#1f2f4c] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#e98500]">
        {cta}
      </span>
    </Link>
  );
}
