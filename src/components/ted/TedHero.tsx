interface TedHeroProps {
  title: string;
  subtitle: string;
  highlight: string;
}

export function TedHero({ title, subtitle, highlight }: TedHeroProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="rounded-[28px] border border-[#f4cf9c] bg-white/92 p-6 shadow-panel sm:p-7">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-[#fff3d9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#bd7200]">
            Comentado pelo especialista
          </span>
          <div className="space-y-3">
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
            <p className="max-w-2xl text-sm leading-7 text-steel sm:text-base">{subtitle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <TedHeroMetric label="Fluxo" value="Treinar, corrigir e revisar" />
            <TedHeroMetric label="Foco" value="Raciocínio diagnóstico" />
            <TedHeroMetric label="Formato" value="Questão + comentário em vídeo" />
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#f0bb6c] bg-[linear-gradient(135deg,#f59e0b_0%,#f7b733_55%,#ffd378_100%)] p-6 text-white shadow-[0_24px_58px_-34px_rgba(156,94,0,0.5)]">
        <div className="space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/18 shadow-sm">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
              <path d="M4 5.75A2.75 2.75 0 0 1 6.75 3h6.19a3.75 3.75 0 0 1 2.652 1.098l2.31 2.31A3.75 3.75 0 0 1 19 9.06v8.19A2.75 2.75 0 0 1 16.25 20H6.75A2.75 2.75 0 0 1 4 17.25zM8 9a.75.75 0 0 0 0 1.5h8A.75.75 0 0 0 16 9zm0 3.5a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">Destaque do módulo</p>
            <h3 className="font-serif text-2xl leading-tight">{highlight}</h3>
          </div>
          <p className="text-sm leading-7 text-white/88">
            Primeiro você responde. Em seguida, aprofunda o raciocínio com o comentário do professor e consolida os pontos-chave da questão.
          </p>
        </div>
      </div>
    </section>
  );
}

function TedHeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[#f5ddba] bg-[#fffaf0] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#bb7205]">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  );
}
