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
  { border: string; number: string; highlight: string; iconWrap: string; dashed: string; dot: string }
> = {
  green: {
    border: "border-emerald-400",
    number: "text-emerald-600",
    highlight: "bg-emerald-200/80",
    iconWrap: "border-emerald-300 bg-emerald-50 text-emerald-700",
    dashed: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  blue: {
    border: "border-sky-400",
    number: "text-sky-600",
    highlight: "bg-sky-200/80",
    iconWrap: "border-sky-300 bg-sky-50 text-sky-700",
    dashed: "border-sky-200",
    dot: "bg-sky-500",
  },
  purple: {
    border: "border-violet-400",
    number: "text-violet-600",
    highlight: "bg-violet-200/80",
    iconWrap: "border-violet-300 bg-violet-50 text-violet-700",
    dashed: "border-violet-200",
    dot: "bg-violet-500",
  },
  orange: {
    border: "border-orange-400",
    number: "text-orange-600",
    highlight: "bg-orange-200/80",
    iconWrap: "border-orange-300 bg-orange-50 text-orange-700",
    dashed: "border-orange-200",
    dot: "bg-orange-500",
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
    <div className="relative overflow-hidden rounded-[28px] border border-[#c9d3e0] bg-[#fffdf7] shadow-[0_28px_70px_-40px_rgba(20,27,43,0.35)]">
      <SpiralBinding />

      <div className="relative bg-[repeating-linear-gradient(to_bottom,#fffdf7_0px,#fffdf7_29px,#e7ecf5_30px)] py-6 pl-14 pr-5 sm:pl-20 sm:pr-8 lg:py-7">
        <SparkleDecoration />

        <header className="relative mb-6 text-center">
          <div className="pointer-events-none absolute left-0 top-0 hidden -rotate-6 sm:block">
            <StickyNote />
          </div>

          <div className="mx-auto max-w-5xl px-2 sm:px-16">
            <p className="relative inline-block font-hand text-xl font-bold text-[#1c2b45] lg:text-2xl">
              {eyebrow}
              <RedSquiggle className="absolute -bottom-2 left-0 h-2 w-full text-rose-500" />
            </p>

            <h2 className="mt-2 font-hand text-3xl font-bold leading-tight text-[#102b61] sm:text-[2.6rem] lg:text-[2.8rem]">
              <span className="inline-block -rotate-1 rounded bg-[#ffe066] px-4 py-0.5">{title}</span>
            </h2>

            {subtitle ? <p className="mt-2 font-hand text-lg text-sky-700 sm:text-xl">{subtitle}</p> : null}
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
            <div className={`flex items-center gap-4 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/90 px-5 py-3 md:col-span-2 ${aside ? "xl:col-span-3" : ""}`}>
              <DiamondIcon />
              <p className="font-hand text-lg leading-8 text-[#1c2b45]">
                <span className="font-bold text-rose-600">Pérola: </span>
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
    <section className={`rounded-[20px] border-2 ${c.border} bg-white/90 ${compact ? "p-3" : "p-4"} shadow-sm ${className}`}>
      <div className={`${compact ? "mb-2" : "mb-2.5"} flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-2.5">
          <span className={`font-hand text-3xl font-bold leading-none ${c.number}`}>{section.number}</span>
          <h3 className={`font-hand text-xl font-bold text-[#1c2b45] ${compact ? "lg:text-xl" : "lg:text-2xl"}`}>
            <span className={`inline-block -rotate-1 rounded px-2 py-0.5 ${c.highlight}`}>{section.title}</span>
          </h3>
        </div>
        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border ${c.iconWrap}`}>
          {section.icon}
        </span>
      </div>
      <div className={`rounded-[13px] border border-dashed ${c.dashed} ${compact ? "px-3 py-2.5" : "px-3.5 py-3"}`}>
        <ul className={`${compact ? "space-y-1 text-[0.9rem] leading-[1.22rem]" : "space-y-1.5 text-[0.96rem] leading-[1.35rem] lg:text-base"} font-hand text-[#2a3550]`}>
          {section.bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-2 h-2 w-2 flex-none rounded-full ${c.dot}`} />
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
      className="absolute inset-y-0 left-0 z-10 flex w-10 flex-col items-center justify-between border-r border-[#c7d6ec] bg-[#eef4fc] py-6 sm:w-12"
    >
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} className="block h-3.5 w-3.5 flex-none rounded-full border-2 border-[#8ba3d4] bg-white" />
      ))}
    </div>
  );
}

function StickyNote() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-md border border-[#e3cd82] bg-[#fdf1c9] shadow-md">
      <span className="absolute -top-2 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-3 rounded-sm border border-[#e3cd82] bg-[#f4e2a4]/90" />
      <LightbulbIcon />
    </div>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-[#8a6d1a]" fill="none" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.44 1 1.1 1 1.9v.7h5v-.7c0-.8.4-1.46 1-1.9A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19h4M10.5 21h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RedSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M2 8 Q 20 2, 38 8 T 74 8 T 110 8 T 146 8 T 182 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-7 w-7 flex-none text-rose-600" fill="currentColor" aria-hidden="true">
      <path d="M12 2 3 9l9 13 9-13-9-7Z" />
    </svg>
  );
}
