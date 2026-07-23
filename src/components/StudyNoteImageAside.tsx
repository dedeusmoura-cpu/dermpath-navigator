interface StudyNoteImageAsideProps {
  title: string;
  image: string;
  alt: string;
  legend: Array<{ label: string; color: string }>;
  footer: string;
}

export function StudyNoteImageAside({ title, image, alt, legend, footer }: StudyNoteImageAsideProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border-2 border-sky-400 bg-white/90 p-4 shadow-sm">
      <h3 className="mx-auto mb-3 max-w-[16rem] -rotate-1 rounded bg-sky-200/80 px-3 py-1 text-center font-hand text-xl font-bold leading-6 text-[#1c2b45]">
        {title}
      </h3>

      <figure className="overflow-hidden rounded-xl border border-rose-100 bg-[#fff8f3]">
        <img src={image} alt={alt} className="aspect-[4/5] w-full object-cover" />
      </figure>

      <div className="mt-3 grid gap-1.5 font-hand text-sm font-semibold leading-5 text-[#1c2b45]">
        {legend.map((item) => (
          <p key={item.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 flex-none rounded-full ${item.color}`} />
            {item.label}
          </p>
        ))}
      </div>

      <p className="mt-3 text-center font-hand text-base font-semibold leading-6 text-[#173f78]">{footer}</p>
    </div>
  );
}
