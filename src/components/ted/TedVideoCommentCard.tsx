interface TedVideoCommentCardProps {
  videoCommentTitle: string;
  videoCommentUrl: string;
  videoProvider: string;
  helperText: string;
}

export function TedVideoCommentCard({ videoCommentTitle, videoCommentUrl, videoProvider, helperText }: TedVideoCommentCardProps) {
  const hasEmbeddableVideo =
    /youtube\.com\/embed\/|player\.vimeo\.com\/video\//.test(videoCommentUrl);

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#f0c889] bg-white shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
      <div className="border-b border-[#f6d7aa] bg-[linear-gradient(135deg,#fff9ee_0%,#fff2d8_100%)] px-5 py-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b46800]">Comentário em vídeo</p>
          <h3 className="font-serif text-2xl text-ink">{videoCommentTitle}</h3>
          <p className="max-w-2xl text-sm leading-7 text-steel">{helperText}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-[22px] border border-[#f2ddba] bg-[#fff9ef]">
          {hasEmbeddableVideo ? (
            <div className="aspect-video w-full">
              <iframe
                src={videoCommentUrl}
                title={videoCommentTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center bg-[linear-gradient(135deg,#fff4de_0%,#fff9f0_100%)] px-6">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffdca2] text-[#b86f00] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
                    <path d="M8 6.82v10.36c0 .69.74 1.13 1.35.8l8.14-4.59a.91.91 0 0 0 0-1.58L9.35 6.02A.91.91 0 0 0 8 6.82Z" />
                  </svg>
                </div>
                <p className="text-sm leading-7 text-steel">
                  O link do vídeo ainda será inserido. A estrutura já está pronta para receber o player definitivo.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-[#8f5700]">{videoCommentTitle}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-[#b07a1f]">Provider: {videoProvider}</p>
          </div>
          <a
            href={hasEmbeddableVideo ? videoCommentUrl : "#"}
            target={hasEmbeddableVideo ? "_blank" : undefined}
            rel={hasEmbeddableVideo ? "noreferrer" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              hasEmbeddableVideo
                ? "bg-[#1f2f4c] text-white transition hover:bg-[#14233c]"
                : "cursor-default bg-[#eadfce] text-[#8f816f]"
            }`}
          >
            Assistir comentário
          </a>
        </div>
      </div>
    </section>
  );
}
