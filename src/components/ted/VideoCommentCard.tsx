interface VideoCommentCardProps {
  videoUrl: string;
  videoTitulo: string;
  comentarioCurto: string;
  unlocked: boolean;
}

export function VideoCommentCard({ videoUrl, videoTitulo, comentarioCurto, unlocked }: VideoCommentCardProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#f0c889] bg-white shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
      <div className="border-b border-[#f6d7aa] bg-[linear-gradient(135deg,#fff9ee_0%,#fff2d8_100%)] px-5 py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b46800]">Comentário do professor</p>
            <h3 className="font-serif text-2xl text-ink">{videoTitulo}</h3>
            <p className="max-w-2xl text-sm leading-7 text-steel">{comentarioCurto}</p>
          </div>
          <span className="rounded-full bg-[#1f2f4c] px-4 py-2 text-sm font-semibold text-white">
            {unlocked ? "Assistir comentário" : "Disponível após responder"}
          </span>
        </div>
      </div>

      {unlocked ? (
        <div className="p-4 sm:p-5">
          <div className="overflow-hidden rounded-[22px] border border-[#f2ddba] bg-[#fff9ef]">
            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title={videoTitulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex min-h-[180px] items-center justify-center rounded-[22px] border border-dashed border-[#f0ca8f] bg-[#fff9ef] px-6 text-center text-sm leading-7 text-steel">
            Responda a questão para liberar o comentário em vídeo e revisar o raciocínio com a explicação guiada do professor.
          </div>
        </div>
      )}
    </section>
  );
}
