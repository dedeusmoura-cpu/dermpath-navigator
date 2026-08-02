import type { ReactNode } from "react";

interface StudyNoteAsideFrameProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function StudyNoteAsideFrame({ title, children, footer }: StudyNoteAsideFrameProps) {
  return (
    <div className="study-note-aside flex h-full flex-col rounded-[18px] border-2 border-dashed border-[#8d603e] bg-[rgba(255,252,240,0.84)] p-4 [&_mark]:!bg-[#fff36d]">
      <h3 className="mx-auto mb-3 max-w-[17rem] -rotate-1 text-center font-hand text-xl font-bold italic leading-6 text-[#653b29] underline decoration-[#9a6845] decoration-2 underline-offset-[7px]">
        {title}
      </h3>

      {children}

      {footer ? (
        <p className="mt-3 rounded-xl border border-[#8d603e]/45 bg-[#fffaf0]/80 px-3 py-2 text-center font-hand text-base font-semibold leading-6 text-[#173f78]">
          {footer}
        </p>
      ) : null}
    </div>
  );
}
