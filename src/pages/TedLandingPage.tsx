import { Link } from "react-router-dom";
import { PerformanceCard } from "../components/ted/PerformanceCard";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { getAverageTedTime, loadTedProgress } from "../utils/tedProgress";

const TED_TEST_QUESTION_ROUTE = "/treinamento-ted/sessao?modo=demo&questionId=ted-dermatopatologia-003";

export function TedLandingPage() {
  const progress = loadTedProgress();

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Treinamento TED"
          subtitle="Escolha a área que deseja treinar ou resolva questões aleatórias, acompanhando sua evolução em cada tema."
          eyebrow="Treinamento comentado"
        />

        <section className="grid gap-4 lg:grid-cols-3">
          <PerformanceCard
            label="Acurácia global"
            value={`${progress.acuraciaGlobal}%`}
            helper="Uma visão rápida de como você vem performando no módulo TED."
          />
          <PerformanceCard
            label="Questões respondidas"
            value={`${progress.totalRespondidas}`}
            helper="Inclui sessões por área, treinos aleatórios e revisões recentes."
          />
          <PerformanceCard
            label="Tempo médio"
            value={`${getAverageTedTime(progress)}s`}
            helper="Tempo médio por questão para acompanhar ritmo e consistência."
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/treinamento-ted/areas"
            className="group flex items-center justify-between gap-4 rounded-[24px] border border-[#f0ba69] bg-[linear-gradient(135deg,#fff9ec_0%,#fff1d3_100%)] p-6 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_28px_58px_-32px_rgba(80,42,0,0.24)]"
          >
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-ink">Treinar por área</h3>
              <p className="text-sm leading-6 text-steel">Escolha um tema e evolua com foco no que mais importa.</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#1f2f4c] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#e98500]">
              Explorar →
            </span>
          </Link>

          <Link
            to="/treinamento-ted/aleatorio"
            className="group flex items-center justify-between gap-4 rounded-[24px] border border-[#efd9bb] bg-white/94 p-6 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_28px_58px_-32px_rgba(80,42,0,0.24)]"
          >
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-ink">Questões aleatórias</h3>
              <p className="text-sm leading-6 text-steel">Monte um treino com dificuldade e áreas sob medida.</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#1f2f4c] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#e98500]">
              Configurar →
            </span>
          </Link>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          <Link
            to="/treinamento-ted/desempenho"
            className="text-sm font-medium text-[#b96d00] underline decoration-[#b96d00]/40 underline-offset-4 transition hover:text-ink"
          >
            Ver meu desempenho detalhado
          </Link>
          <Link
            to="/treinamento-ted/revisao"
            className="text-sm font-medium text-[#b96d00] underline decoration-[#b96d00]/40 underline-offset-4 transition hover:text-ink"
          >
            Revisar erros anteriores
          </Link>
          <Link
            to={TED_TEST_QUESTION_ROUTE}
            className="text-sm font-medium text-[#b96d00] underline decoration-[#b96d00]/40 underline-offset-4 transition hover:text-ink"
          >
            Ver questão de exemplo →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
