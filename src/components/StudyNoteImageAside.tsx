import { StudyNoteAsideFrame } from "./StudyNoteAsideFrame";

interface StudyNoteImageAsideProps {
  title: string;
  image: string;
  alt: string;
  legend: Array<{ label: string; color: string }>;
  footer: string;
}

export function StudyNoteImageAside({ title, image, alt, legend, footer }: StudyNoteImageAsideProps) {
  return (
    <StudyNoteAsideFrame title={title} footer={footer}>
      <figure className="overflow-hidden rounded-xl border border-[#d9b9aa] bg-[#fff8f3] shadow-[inset_0_0_18px_rgba(109,66,40,0.06)]">
        <img src={image} alt={alt} className="aspect-[4/5] w-full object-cover" />
      </figure>

      <div className="mt-3 grid gap-1.5 rounded-xl border border-[#8d603e]/25 bg-white/45 px-3 py-2 font-hand text-sm font-semibold leading-5 text-[#1c2b45]">
        {legend.map((item) => (
          <p key={item.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 flex-none rounded-full ${item.color}`} />
            {item.label}
          </p>
        ))}
      </div>
    </StudyNoteAsideFrame>
  );
}
