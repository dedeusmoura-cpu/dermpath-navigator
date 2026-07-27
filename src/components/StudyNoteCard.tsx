import type { ReactNode } from "react";

export type StudyNoteColor = "green" | "blue" | "purple" | "orange";

export interface StudyNoteSectionData {
  id: string;
  number: string;
  color: StudyNoteColor;
  title: string;
  icon: ReactNode;
  bullets: ReactNode[];
}

interface StudyNoteCardProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sectionsLeft: StudyNoteSectionData[];
  sectionsRight: StudyNoteSectionData[];
  note?: ReactNode;
  aside?: ReactNode;
  pearl?: ReactNode;
}

const COLOR_STYLES: Record<
  StudyNoteColor,
  {
    border: string;
    panel: string;
    number: string;
    heading: string;
    underline: string;
    iconWrap: string;
    dot: string;
    marks: string;
  }
> = {
  green: {
    border: "border-[#5ea56b]",
    panel: "bg-[linear-gradient(135deg,rgba(239,249,235,0.96),rgba(255,255,255,0.93))]",
    number: "bg-[linear-gradient(145deg,#69bd72,#23843e)] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_3px_7px_rgba(35,132,62,0.2)]",
    heading: "text-[#328b48]",
    underline: "decoration-[#4c9b5d]",
    iconWrap: "text-[#2f8245]",
    dot: "bg-[#3b914f]",
    marks: "[&_mark]:!bg-[#d9f2c8]",
  },
  blue: {
    border: "border-[#548bc0]",
    panel: "bg-[linear-gradient(135deg,rgba(237,247,255,0.96),rgba(255,255,255,0.93))]",
    number: "bg-[linear-gradient(145deg,#5ba2df,#2367a4)] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_3px_7px_rgba(35,103,164,0.2)]",
    heading: "text-[#2d73ad]",
    underline: "decoration-[#3c7db5]",
    iconWrap: "text-[#2c72aa]",
    dot: "bg-[#337ab4]",
    marks: "[&_mark]:!bg-[#d9eafb]",
  },
  purple: {
    border: "border-[#9a67b7]",
    panel: "bg-[linear-gradient(135deg,rgba(247,239,252,0.96),rgba(255,255,255,0.93))]",
    number: "bg-[linear-gradient(145deg,#ad7bcb,#714395)] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_3px_7px_rgba(113,67,149,0.2)]",
    heading: "text-[#8050a0]",
    underline: "decoration-[#8f5cac]",
    iconWrap: "text-[#8050a0]",
    dot: "bg-[#8757a5]",
    marks: "[&_mark]:!bg-[#eadcf4]",
  },
  orange: {
    border: "border-[#df9660]",
    panel: "bg-[linear-gradient(135deg,rgba(255,244,235,0.96),rgba(255,255,255,0.93))]",
    number: "bg-[linear-gradient(145deg,#efa16b,#c96529)] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_3px_7px_rgba(201,101,41,0.2)]",
    heading: "text-[#c76b32]",
    underline: "decoration-[#d57e48]",
    iconWrap: "text-[#c76b32]",
    dot: "bg-[#d6783e]",
    marks: "[&_mark]:!bg-[#f9e3d0]",
  },
};

export function Highlight({ children }: { children: ReactNode }) {
  return <mark className="rounded-[3px] bg-[#ffe066] px-1 py-0.5 font-semibold text-[#1c2b45]">{children}</mark>;
}

export function StudyNoteCard({
  eyebrow = "Tome nota!",
  title,
  subtitle,
  sectionsLeft,
  sectionsRight,
  note,
  aside,
  pearl,
}: StudyNoteCardProps) {
  const sections = [sectionsLeft[0], sectionsRight[0], sectionsLeft[1], sectionsRight[1]].filter(
    (section): section is StudyNoteSectionData => Boolean(section),
  );

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#b9c4d2] bg-[#fffdf7] shadow-[0_30px_72px_-38px_rgba(20,27,43,0.38)]">
      <SpiralBinding />

      <div className="relative bg-[repeating-linear-gradient(to_bottom,#fffefa_0px,#fffefa_34px,#dcebf2_35px)] py-5 pl-[3.6rem] pr-2.5 sm:pl-[6.4rem] sm:pr-7 lg:py-6">
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[3rem] w-px bg-[rgba(231,111,126,0.34)] sm:left-[4.25rem]" />
        <SparkleDecoration />

        <header className="relative mb-5 grid items-center gap-3 text-center sm:grid-cols-[9rem_minmax(0,1fr)_8rem] lg:grid-cols-[10.5rem_minmax(0,1fr)_10rem]">
          <div className="mx-auto hidden -rotate-6 sm:block">
            <StickyNote eyebrow={eyebrow} />
          </div>

          <div className="min-w-0 px-1">
            <p className="relative mx-auto mb-1 inline-block font-hand text-xl font-bold text-[#152c67] sm:hidden">
              {eyebrow}
              <RedSquiggle className="absolute -bottom-1.5 left-0 h-2 w-full text-[#152c67]" />
            </p>

            <h2 className="font-hand text-[1.85rem] font-bold leading-tight tracking-[0.01em] text-[#102b61] sm:text-[2.45rem] lg:text-[3rem]">
              {title}
            </h2>

            {subtitle ? (
              <div className="mx-auto mt-1.5 max-w-4xl">
                <p className="font-hand text-base font-semibold text-[#9b62b2] sm:text-xl lg:text-[1.6rem]">{subtitle}</p>
                <PurpleUnderline />
              </div>
            ) : null}
          </div>

          <div className="mx-auto hidden sm:block">
            <HeaderMicroscopeDoodle />
          </div>
        </header>

        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${aside ? "xl:grid-cols-[1fr_1fr_0.78fr]" : ""}`}>
          <div className={`grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 ${aside ? "xl:col-span-2 xl:col-start-1 xl:row-start-1" : ""}`}>
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} compact={Boolean(aside)} className={sections.length === 1 ? "md:col-span-2" : ""} />
            ))}
          </div>

          {aside ? <aside className="md:col-span-2 xl:col-span-1 xl:col-start-3 xl:row-start-1">{aside}</aside> : null}

          {note ? (
            <div className={`flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/90 px-4 py-2.5 md:col-span-2 ${aside ? "xl:col-span-3" : ""}`}>
              <StarIcon />
              <p className="font-hand text-base leading-6 text-[#1c2b45]">{note}</p>
            </div>
          ) : null}

          {pearl ? (
            <div className={`flex items-center gap-3 rounded-[18px] border-2 border-[#d9ad45] bg-[linear-gradient(90deg,rgba(255,250,226,0.98),rgba(255,254,244,0.95))] px-4 py-2.5 shadow-[0_8px_20px_-18px_rgba(117,78,13,0.6)] md:col-span-2 ${aside ? "xl:col-span-3" : ""}`}>
              <PearlShellIcon />
              <p className="font-hand text-base leading-7 text-[#1c2b45] sm:text-lg sm:leading-8">
                <span className="mr-1 inline-block border-b-2 border-[#c38d21] font-bold text-[#bd7b13]">Pérola:</span>
                {pearl}
              </p>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}

function SectionCard({ section, className = "", compact = false }: { section: StudyNoteSectionData; className?: string; compact?: boolean }) {
  const c = COLOR_STYLES[section.color];

  return (
    <section className={`rounded-[22px] border-2 ${c.border} ${c.panel} ${c.marks} ${compact ? "px-3.5 py-3" : "px-4 py-3.5"} shadow-[0_10px_24px_-22px_rgba(20,39,66,0.55)] ${className}`}>
      <div className={`${compact ? "mb-2" : "mb-2.5"} flex items-start justify-between gap-3`}>
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-hand text-2xl font-bold leading-none ${c.number}`}>{section.number}</span>
          <h3 className={`min-w-0 font-hand text-[1.35rem] font-bold leading-tight underline decoration-2 underline-offset-[7px] sm:text-[1.55rem] ${c.heading} ${c.underline} ${compact ? "lg:text-[1.45rem]" : "lg:text-[1.7rem]"}`}>
            <span>{section.title}</span>
          </h3>
        </div>
        <span className={`flex h-12 w-12 flex-none items-center justify-center [&_svg]:h-10 [&_svg]:w-10 ${c.iconWrap}`}>
          {section.icon}
        </span>
      </div>
      <div className={compact ? "px-1" : "px-1.5"}>
        <ul className={`${compact ? "space-y-1 text-[0.9rem] leading-[1.24rem]" : "space-y-1.5 text-[0.96rem] leading-[1.38rem] lg:text-[1.03rem]"} font-hand text-[#182238]`}>
          {section.bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-[0.55rem] h-2.5 w-2.5 flex-none rounded-full ${c.dot}`} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpiralBinding() {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 left-0 z-10 flex w-9 flex-col items-start justify-between border-r border-[#c3ccd7] bg-[linear-gradient(90deg,#f0f2f4,#fff)] py-5 sm:w-16"
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <span key={index} className="relative block h-4 w-8 flex-none sm:w-14">
          <span className="absolute left-0 top-1/2 h-2.5 w-[2.35rem] -translate-x-3 -translate-y-1/2 rounded-full border-[3px] border-[#30343a] bg-transparent shadow-[0_1px_1px_rgba(0,0,0,0.24)] sm:w-[3.4rem]" />
          <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#454a50] shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] sm:right-1" />
        </span>
      ))}
    </div>
  );
}

function StickyNote({ eyebrow }: { eyebrow: string }) {
  return (
    <div className="relative flex h-[6.7rem] w-[7.7rem] items-center justify-center rounded-sm border border-[#d9bb45] bg-[linear-gradient(145deg,#fff5a9,#f7da54)] px-3 text-center shadow-[4px_6px_10px_rgba(72,58,16,0.2)] lg:h-[7.4rem] lg:w-[8.7rem]">
      <span className="absolute -top-3 left-1/2 h-6 w-[4.7rem] -translate-x-1/2 rotate-[-4deg] border border-[#d77c94]/70 bg-[#ee8da7]/90 shadow-sm" />
      <span className="absolute -bottom-1 right-0 h-7 w-7 bg-[linear-gradient(135deg,rgba(199,166,47,0.35)_0%,rgba(255,248,178,0.95)_55%)] [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      <p className="-rotate-2 font-hand text-[1.45rem] font-bold leading-[1.05] text-[#132966] lg:text-[1.65rem]">{eyebrow}</p>
      <span className="absolute bottom-4 left-1/2 h-0.5 w-16 -translate-x-1/2 -rotate-6 bg-[#132966]" />
    </div>
  );
}

function RedSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M2 8 Q 20 2, 38 8 T 74 8 T 110 8 T 146 8 T 182 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PurpleUnderline() {
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="mx-auto mt-0.5 h-2 w-[78%] max-w-xl text-[#a36bb5]" aria-hidden="true">
      <path d="M4 7C61 3 109 9 156 6c48-3 91-1 140 1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function HeaderMicroscopeDoodle() {
  return (
    <svg viewBox="0 0 150 120" className="h-[6.6rem] w-[8.5rem] text-[#242958] lg:h-[7.4rem] lg:w-[9.5rem]" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="m32 16 24 11-7 16-24-11 7-16Z" fill="#d9c5e7" />
        <path d="m27 34 20 9-7 16-20-9 7-16Zm17 21 18 8" />
        <path d="M64 52c21 12 28 33 18 49M51 87c0-20 12-33 28-36" />
        <path d="M44 88h43M38 101h58v9H38z" fill="#b7a6d2" />
        <circle cx="77" cy="51" r="8" fill="#f3b6cc" />
        <path d="m50 64-10 23M38 74l14 6" />
      </g>
      <g transform="translate(102 16)" stroke="currentColor" strokeWidth="3">
        <circle cx="20" cy="24" r="19" fill="#f7b7cf" />
        <path d="M3 20c10-6 23-7 36-1M5 28c12-5 22-4 33 0" />
        <circle cx="13" cy="19" r="3" fill="#b36aa0" />
        <circle cx="27" cy="26" r="3" fill="#b36aa0" />
        <circle cx="18" cy="33" r="2.5" fill="#b36aa0" />
      </g>
      <path d="m128 3 3-9m8 15 8-5m-19 18 9 1" stroke="#765ca8" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function PearlShellIcon() {
  return (
    <svg viewBox="0 0 64 52" className="h-11 w-14 flex-none" fill="none" aria-hidden="true">
      <path d="M9 34C4 24 8 12 18 8c2 6 5 10 9 14-1-8 1-15 5-20 5 6 7 13 6 20 4-5 8-9 13-12 5 10 4 19-2 25" fill="#f6e1c8" stroke="#8b6045" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M11 35c10 8 31 8 42 0-4 12-13 15-21 15S16 47 11 35Z" fill="#e9c6a9" stroke="#8b6045" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="8" fill="#fff5e2" stroke="#c99c77" strokeWidth="2" />
      <path d="m57 4 1.4 5.5L64 11l-5.6 1.5L57 18l-1.4-5.5L50 11l5.6-1.5L57 4Z" fill="#e2ad27" stroke="#a8780e" strokeWidth="1.2" />
    </svg>
  );
}

function SparkleDecoration() {
  return (
    <div aria-hidden className="pointer-events-none absolute right-6 top-6 hidden text-sky-300 sm:flex sm:items-end sm:gap-1">
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="currentColor">
        <path d="M20 4l2.4 10.6L33 17l-10.6 2.4L20 30l-2.4-10.6L7 17l10.6-2.4L20 4Z" />
      </svg>
      <svg viewBox="0 0 40 40" className="h-4 w-4" fill="currentColor">
        <path d="M20 4l2.4 10.6L33 17l-10.6 2.4L20 30l-2.4-10.6L7 17l10.6-2.4L20 4Z" />
      </svg>
    </div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 flex-none text-sky-600" fill="currentColor" aria-hidden="true">
      <path d="m12 2 2.9 6.26L21.5 9l-5 4.64L17.8 21 12 17.4 6.2 21l1.3-7.36-5-4.64 6.6-.74L12 2Z" />
    </svg>
  );
}
