import type { ReactNode } from "react";

interface StudyNoteHighlightAsideProps {
  eyebrow?: string;
  title: string;
  bullets: ReactNode[];
  footer?: ReactNode;
}

export function StudyNoteHighlightAside({ eyebrow, title, bullets, footer }: StudyNoteHighlightAsideProps) {
  return (
    <div className="flex h-full flex-col rounded-[22px] border-2 border-[#0e8f86] bg-[linear-gradient(140deg,rgba(228,250,247,0.97),rgba(255,255,255,0.94))] px-4 py-3.5 shadow-[0_10px_24px_-20px_rgba(9,74,70,0.6)]">
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="font-hand text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#0e8f86]">{eyebrow}</p> : null}
          <h3 className="min-w-0 font-hand text-[1.35rem] font-bold leading-tight text-[#0b6f68] underline decoration-[#33a79f] decoration-2 underline-offset-[7px] sm:text-[1.5rem]">
            {title}
          </h3>
        </div>
        <span className="flex h-12 w-12 flex-none items-center justify-center text-[#0e8f86]">
          <FluorescenceIcon />
        </span>
      </div>

      <ul className="space-y-1.5 font-hand text-[0.96rem] leading-[1.38rem] text-[#182238] [&_mark]:!bg-[#c6f1ea] lg:text-[1.03rem]">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-[0.55rem] h-2.5 w-2.5 flex-none rounded-full bg-[#0e8f86]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {footer ? (
        <p className="mt-3 rounded-xl border border-[#0e8f86]/40 bg-white/70 px-3 py-2 text-center font-hand text-base font-semibold leading-6 text-[#0b6f68]">
          {footer}
        </p>
      ) : null}
    </div>
  );
}

function FluorescenceIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="15" fill="#d6f5f0" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M13 19h22M13 24h22M13 29h22M19 10v28M24 9v30M29 10v28"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="19" cy="19" r="1.9" fill="currentColor" />
      <circle cx="29" cy="24" r="1.9" fill="currentColor" />
      <circle cx="19" cy="29" r="1.9" fill="currentColor" />
      <path d="m41 7 1.3 4.6L47 13l-4.7 1.4L41 19l-1.3-4.6L35 13l4.7-1.4L41 7Z" fill="#0e8f86" opacity="0.8" />
    </svg>
  );
}
