import { Link } from "react-router-dom";
import { PerformanceCard } from "../components/ted/PerformanceCard";
import { TedHeader } from "../components/ted/TedHeader";
import { TedHero } from "../components/ted/TedHero";
import { TedModeCard } from "../components/ted/TedModeCard";
import { Layout } from "../components/Layout";
import { tedVideoHighlight } from "../data/ted";
import { getAverageTedTime, loadTedProgress } from "../utils/tedProgress";

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

        <TedHero
          title="Treine com orientação, feedback e comentário em vídeo."
          subtitle="O TED foi desenhado para transformar cada questão em um momento de estudo guiado. Você responde, recebe explicação objetiva e aprofunda o raciocínio com o comentário do professor."
          highlight={tedVideoHighlight}
        />

        <section className="grid gap-4 lg:grid-cols-4">
          <TedModeCard
            to="/treinamento-ted/areas"
            title="Treinar por área"
            body="Escolha um tema específico, acompanhe seu percentual de acerto e evolua com foco no que mais importa."
            cta="Explorar áreas"
            tone="primary"
          />
          <TedModeCard
            to="/treinamento-ted/aleatorio"
            title="Questões aleatórias"
            body="Monte um treino sob medida com quantidade de questões, dificuldade, timer e seleção de áreas."
            cta="Configurar treino"
          />
          <TedModeCard
            to="/treinamento-ted/desempenho"
            title="Meu desempenho"
            body="Visualize sua acurácia global, fortalezas e temas que merecem reforço nas próximas sessões."
            cta="Ver análise"
          />
          <TedModeCard
            to="/treinamento-ted/revisao"
            title="Revisar erros"
            body="Retorne às questões erradas ou marcadas e use o vídeo comentado como ferramenta de consolidação."
            cta="Revisar agora"
          />
        </section>

        <section className="rounded-[28px] border border-[#f1bf72] bg-[linear-gradient(135deg,#f59e0b_0%,#f8b632_48%,#ffd57d_100%)] p-6 text-white shadow-[0_24px_58px_-34px_rgba(156,94,0,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/78">Aviso importante</p>
              <h2 className="font-serif text-3xl leading-tight">{tedVideoHighlight}</h2>
              <p className="max-w-3xl text-sm leading-7 text-white/88">
                A proposta do TED é unir treino ativo e explicação guiada. O comentário em vídeo não é complementar: ele faz parte da experiência de aprendizagem.
              </p>
            </div>
            <Link
              to="/treinamento-ted/aleatorio"
              className="rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10203a]"
            >
              Iniciar uma sessão agora
            </Link>
          </div>
        </section>

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
      </div>
    </Layout>
  );
}
