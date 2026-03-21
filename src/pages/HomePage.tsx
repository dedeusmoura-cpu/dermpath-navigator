import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const homeHighlightImage = new URL("../assets/foto.png.png", import.meta.url).href;

export function HomePage() {
  return (
    <Layout
      title="Dr. A.I. Ackerman"
      subtitle="Apoio visual ao raciocínio diagnóstico em dermatopatologia pelo método algorítmico."
    >
      <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,_rgba(245,248,252,0.96)_0%,_rgba(227,236,245,0.95)_38%,_rgba(235,233,228,0.96)_100%)] shadow-panel">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(43,90,138,0.22),_transparent_58%)]" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.75),_rgba(255,255,255,0))]" />

        <div className="relative grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:py-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent shadow-sm">
                Dermatopatologia algorítmica
              </span>
              <div className="space-y-3">
                <h1 className="max-w-xl font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                  Um caminho mais claro até o diagnóstico.
                </h1>
                <p className="max-w-lg text-base leading-7 text-steel sm:text-lg">
                  Navegue por uma árvore diagnóstica visual, objetiva e organizada para apoiar a leitura do HE sem transformar a experiência em um painel técnico.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/diagnostico"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-ink via-accent to-[#36638d] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(16,36,59,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-22px_rgba(16,36,59,0.85)]"
              >
                Iniciar diagnóstico
              </Link>
              <Link
                to="/visao-geral"
                className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/75 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Visão geral
              </Link>
              <Link
                to="/buscar"
                className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/85 px-5 py-3 text-sm font-semibold text-steel transition hover:bg-white hover:text-ink"
              >
                Buscar
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FeaturePill title="Fluxo guiado" text="Da morfologia ao diagnóstico final, etapa por etapa." />
              <FeaturePill title="Sem chatbot" text="Interação centrada em árvore diagnóstica clicável." />
            </div>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[520px] lg:min-h-[620px]">
            <div className="absolute inset-6 rounded-[32px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.9),_rgba(255,255,255,0.35)_62%,_rgba(255,255,255,0)_100%)]" />
            <div className="absolute inset-x-10 bottom-6 top-10 rounded-[34px] border border-white/60 bg-[linear-gradient(180deg,_rgba(255,255,255,0.72),_rgba(244,247,250,0.34))] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]" />
            <img
              src={homeHighlightImage}
              alt=""
              className="relative z-10 h-full max-h-[600px] w-full object-contain object-center drop-shadow-[0_24px_50px_rgba(16,36,59,0.16)]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Sobre o método</p>
          <h2 className="mt-3 font-serif text-3xl text-ink">Leitura organizada, sem excesso de ruído.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-steel">
            A proposta é oferecer uma primeira etapa de orientação visual e morfológica: quando o HE fecha uma entidade, isso aparece de forma direta; quando não fecha, o sistema assume isso com clareza como terminal morfológico.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SoftCard title="Estrutura local" text="Dados mantidos no frontend, com árvore tipada e expansão modular." />
          <SoftCard title="Foco prático" text="Imagem, hierarquia visual e início rápido para entrar direto no algoritmo." />
        </div>
      </section>
    </Layout>
  );
}

function FeaturePill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-white/80 bg-white/70 px-4 py-4 shadow-sm backdrop-blur">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm leading-6 text-steel">{text}</p>
    </div>
  );
}

function SoftCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-white to-stone-50 p-5 shadow-sm">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
    </div>
  );
}
