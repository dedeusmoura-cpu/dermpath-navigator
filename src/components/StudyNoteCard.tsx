import type { ReactNode } from "react";
import { TomeNotaIcon } from "./TomeNotaIcon";

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
  media?: ReactNode;
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
  }
> = {
  green: {
    border: "border-[#679b43]",
    panel: "bg-[rgba(248,251,237,0.82)]",
    number: "bg-[#5b9f2f] text-white shadow-[0_2px_0_rgba(52,112,25,0.2)]",
    heading: "text-[#427f2d]",
    underline: "decoration-[#5e943e]",
    iconWrap: "text-[#2f8245]",
    dot: "bg-[#315f28]",
  },
  blue: {
    border: "border-[#4b98cc]",
    panel: "bg-[rgba(241,249,255,0.82)]",
    number: "bg-[#288bc9] text-white shadow-[0_2px_0_rgba(25,103,157,0.2)]",
    heading: "text-[#176aab]",
    underline: "decoration-[#2f80bb]",
    iconWrap: "text-[#2c72aa]",
    dot: "bg-[#1d6d9f]",
  },
  purple: {
    border: "border-[#9366a6]",
    panel: "bg-[rgba(249,244,252,0.8)]",
    number: "bg-[#7d3f91] text-white shadow-[0_2px_0_rgba(91,41,109,0.2)]",
    heading: "text-[#703783]",
    underline: "decoration-[#815094]",
    iconWrap: "text-[#8050a0]",
    dot: "bg-[#704084]",
  },
  orange: {
    border: "border-[#df715d]",
    panel: "bg-[rgba(255,247,240,0.82)]",
    number: "bg-[#e25f45] text-white shadow-[0_2px_0_rgba(167,64,44,0.2)]",
    heading: "text-[#d5533c]",
    underline: "decoration-[#dc6652]",
    iconWrap: "text-[#d5533c]",
    dot: "bg-[#bd4935]",
  },
};

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="box-decoration-clone rounded-[2px] bg-[linear-gradient(178deg,transparent_12%,#fff36d_12%,#ffef55_88%,transparent_88%)] px-1 py-0.5 font-semibold text-[#172238]">
      {children}
    </mark>
  );
}

export function StudyNoteCard({
  eyebrow = "Tome nota!",
  title,
  subtitle,
  media,
  sectionsLeft,
  sectionsRight,
  note,
  aside,
  pearl,
}: StudyNoteCardProps) {
  if (media) {
    return (
      <div className="study-note-sheet relative overflow-hidden rounded-[18px] border border-[#d1c9bb] bg-[#fffdf6] shadow-[0_28px_65px_-34px_rgba(39,31,22,0.34)] sm:rounded-[22px]">
        {media}
      </div>
    );
  }

  const sections = [sectionsLeft[0], sectionsRight[0], sectionsLeft[1], sectionsRight[1]].filter(
    (section): section is StudyNoteSectionData => Boolean(section),
  );

  return (
    <div className="study-note-sheet relative overflow-hidden rounded-[18px] border border-[#d1c9bb] bg-[#fffdf6] shadow-[0_28px_65px_-34px_rgba(39,31,22,0.34)] sm:rounded-[22px]">
      <SpiralBinding />

      <div className="study-note-paper relative py-5 pl-[3.8rem] pr-2.5 sm:pl-[7.25rem] sm:pr-6 lg:px-8 lg:py-6 lg:pl-[8.5rem]">
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-[3.05rem] w-px bg-[rgba(219,91,104,0.3)] sm:left-[5.25rem]" />
        <SparkleDecoration />

        <header className="relative mb-5 grid grid-cols-[4.4rem_minmax(0,1fr)] items-start gap-2 text-left sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-7">
          <div className="mx-auto mt-2 -rotate-6 scale-[0.78] sm:mt-1 sm:scale-100 lg:mt-2 lg:scale-[1.12]">
            <TomeNotaIcon />
          </div>

          <div className="min-w-0 pb-1 sm:text-center">
            <h2 className="study-note-title relative block text-[1.75rem] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[2.75rem] lg:text-[3.55rem]">
              <span className="text-[#161616]">{eyebrow}</span>{" "}
              <span className="italic text-[#8e1f52]">{title}</span>
              <MotionTicks className="absolute -right-8 -top-1 hidden h-9 w-9 text-[#bd3f69] lg:block" />
            </h2>

            {subtitle ? (
              <div className="mx-auto mt-2 max-w-4xl sm:mt-3">
                <p className="font-hand text-[0.95rem] font-semibold italic text-[#174d86] sm:text-xl lg:text-[1.55rem]">{subtitle}</p>
                <PinkUnderline />
              </div>
            ) : null}
          </div>
        </header>

        <div className={`relative z-[1] grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:gap-4 ${aside ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(19rem,1.05fr)]" : ""}`}>
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
            <div className={`flex items-center gap-3 rounded-[18px] border-2 border-dashed border-[#ddb424] bg-[rgba(255,253,230,0.82)] px-4 py-2.5 md:col-span-2 sm:gap-4 sm:px-5 ${aside ? "xl:col-span-3" : ""}`}>
              <DiamondIcon />
              <p className="font-hand text-base leading-7 text-[#1c2b45] sm:text-lg sm:leading-8">
                <span className="mr-1 inline-block border-b-2 border-[#8b3c2a] font-bold italic text-[#5f2a22]">Pérola:</span>
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
    <section className={`study-note-section rounded-[18px] border-2 border-dashed ${c.border} ${c.panel} ${compact ? "px-3 py-3 sm:px-3.5" : "px-3 py-3.5 sm:px-4"} ${className}`}>
      <div className={`${compact ? "mb-2" : "mb-2.5"} flex items-start justify-between gap-2 sm:gap-3`}>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full font-hand text-[1.35rem] font-bold leading-none sm:h-11 sm:w-11 sm:text-2xl ${c.number}`}>{section.number}</span>
          <h3 className={`min-w-0 break-words font-hand text-[1.22rem] font-bold italic leading-tight underline decoration-2 underline-offset-[6px] sm:text-[1.55rem] ${c.heading} ${c.underline} ${compact ? "lg:text-[1.45rem]" : "lg:text-[1.7rem]"}`}>
            <span>{section.title}</span>
          </h3>
        </div>
        <span className={`flex h-9 w-9 flex-none items-center justify-center [&_svg]:h-8 [&_svg]:w-8 sm:h-11 sm:w-11 sm:[&_svg]:h-9 sm:[&_svg]:w-9 ${c.iconWrap}`}>
          {section.icon}
        </span>
      </div>
      <div className={compact ? "px-1" : "px-1.5"}>
        <ul className={`${compact ? "space-y-1 text-[0.9rem] leading-[1.24rem]" : "space-y-1.5 text-[0.96rem] leading-[1.38rem] lg:text-[1.03rem]"} font-hand font-medium text-[#191b21]`}>
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
      className="absolute inset-y-0 left-0 z-10 flex w-9 flex-col items-start justify-between border-r border-[#d4cec4] bg-[linear-gradient(90deg,#ecebea,#fffdf7)] py-5 sm:w-[4.8rem] sm:py-7"
    >
      {Array.from({ length: 17 }).map((_, index) => (
        <span key={index} className="relative block h-4 w-8 flex-none sm:w-[4.25rem]">
          <span className="absolute left-0 top-1/2 h-3 w-[2.45rem] -translate-x-3 -translate-y-1/2 rounded-full border-[3px] border-[#252525] bg-transparent shadow-[0_2px_2px_rgba(0,0,0,0.3)] sm:w-[4.15rem] sm:border-[4px]" />
          <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#6c5841] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.45)] sm:right-0" />
        </span>
      ))}
    </div>
  );
}

function MotionTicks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 17 2.5 19M10 11 6 6M16 8l-1-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function PinkUnderline() {
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="mx-auto mt-0.5 h-2.5 w-[86%] max-w-2xl text-[#cb5a7c]" aria-hidden="true">
      <path d="M4 8C54 1 112 9 160 5c49-4 89 2 136 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M8 11c60-4 113 1 171-2 46-2 75 0 111-1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity=".65" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-14 flex-none text-[#a46e00]" fill="none" aria-hidden="true">
      <path d="m8 24 10-13h28l10 13-24 32L8 24Z" fill="#fff3a8" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m8 24 24 32 24-32M8 24h48M18 11l14 45 14-45M18 11l14 13 14-13" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
      <path d="m8 6 1.4 5.5L15 13l-5.6 1.5L8 20l-1.4-5.5L1 13l5.6-1.5L8 6Z" fill="#ffd83d" />
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
