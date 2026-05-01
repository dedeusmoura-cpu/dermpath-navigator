import { Link } from "react-router-dom";

interface TedModeCardProps {
  to: string;
  title: string;
  body: string;
  cta: string;
  icon?: string;
  tone?: "featured" | "primary" | "soft";
}

export function TedModeCard({ to, title, body, cta, icon, tone = "soft" }: TedModeCardProps) {
  const toneClasses =
    tone === "featured"
      ? "border-[#e0a030] bg-[linear-gradient(135deg,#fff5d6_0%,#ffe9a8_100%)] shadow-[0_26px_56px_-24px_rgba(160,90,0,0.30)]"
      : tone === "primary"
      ? "border-[#f0ba69] bg-[linear-gradient(135deg,#fff9ec_0%,#fff1d3_100%)]"
      : "border-[#efd9bb] bg-[linear-gradient(135deg,#fffdf8_0%,#fff8ef_100%)]";

  return (
    <Link
      to={to}
      className={`group flex h-full flex-col justify-between rounded-[26px] border p-6 shadow-[0_22px_52px_-28px_rgba(80,42,0,0.22)] transition hover:-translate-y-1 hover:shadow-[0_32px_64px_-28px_rgba(80,42,0,0.30)] ${toneClasses}`}
    >
      <div className="space-y-3">
        {icon && (
          <div className="mb-1 inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/70 text-2xl shadow-[0_4px_12px_-4px_rgba(80,42,0,0.14)]">
            {icon}
          </div>
        )}
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
        <p className="text-sm leading-7 text-steel">{body}</p>
      </div>
      <span className="mt-6 inline-flex w-fit rounded-full bg-[#1f2f4c] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#e98500]">
        {cta}
      </span>
    </Link>
  );
}
