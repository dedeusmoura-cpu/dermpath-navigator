import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PerformanceBar } from "../components/ted/PerformanceBar";
import { PerformanceCard } from "../components/ted/PerformanceCard";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { tedAreas } from "../data/ted";
import { getAverageTedTime, getTedAreaStatus, loadTedProgress } from "../utils/tedProgress";

export function TedPerformancePage() {
  const [searchParams] = useSearchParams();
  const highlightedArea = searchParams.get("area");
  const [progress] = useState(loadTedProgress);

  const areaRows = tedAreas.map((area) => ({
    area,
    performance: progress.desempenhoPorArea[area.id],
  }));

  const strongerAreas = [...areaRows]
    .filter((row) => (row.performance?.totalRespondidas ?? 0) > 0)
    .sort((a, b) => (b.performance?.acuracia ?? 0) - (a.performance?.acuracia ?? 0))
    .slice(0, 3);

  const weakerAreas = [...areaRows]
    .filter((row) => (row.performance?.totalRespondidas ?? 0) > 0)
    .sort((a, b) => (a.performance?.acuracia ?? 0) - (b.performance?.acuracia ?? 0))
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Meu desempenho"
          subtitle="Acompanhe sua evolução global, compare áreas e identifique onde vale investir o próximo ciclo de estudo."
        />

        <section className="grid gap-4 lg:grid-cols-4">
          <PerformanceCard
            label="Acurácia global"
            value={`${progress.acuraciaGlobal}%`}
            helper="Taxa geral de acerto em todas as sessões do TED."
          />
          <PerformanceCard
            label="Questões respondidas"
            value={`${progress.totalRespondidas}`}
            helper="Volume acumulado de treino comentado."
          />
          <PerformanceCard
            label="Tempo médio"
            value={`${getAverageTedTime(progress)}s`}
            helper="Tempo médio por questão nas sessões registradas."
          />
          <PerformanceCard
            label="Questões para revisão"
            value={`${progress.questoesErradas.length + progress.questoesFavoritasOuMarcadas.length}`}
            helper="Erros recentes e questões marcadas para revisar com o vídeo."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#efd8b7] bg-white/94 p-6 shadow-panel">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Desempenho por área</p>
                <h2 className="mt-2 font-serif text-3xl text-ink">Onde você está mais forte e onde vale reforçar</h2>
              </div>

              <div className="space-y-4">
                {areaRows.map(({ area, performance }) => (
                  <div
                    key={area.id}
                    className={highlightedArea === area.id ? "rounded-[24px] ring-2 ring-[#f0b75f] ring-offset-2 ring-offset-[#fffaf2]" : undefined}
                  >
                    <PerformanceBar
                      nome={area.nome}
                      percentual={performance?.acuracia ?? 0}
                      respondidas={performance?.totalRespondidas ?? 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <StatusList
              title="Áreas mais fortes"
              description="Temas em que você já demonstra boa segurança."
              items={strongerAreas.map(({ area, performance }) => ({
                label: area.nome,
                value: `${performance?.acuracia ?? 0}%`,
                helper: getTedAreaStatus(performance?.totalRespondidas ?? 0, performance?.acuracia ?? 0),
              }))}
            />
            <StatusList
              title="Áreas para reforçar"
              description="Temas que podem render mais ganho com revisão comentada."
              items={weakerAreas.map(({ area, performance }) => ({
                label: area.nome,
                value: `${performance?.acuracia ?? 0}%`,
                helper: `${performance?.totalErradas ?? 0} erros registrados`,
              }))}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

function StatusList({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Array<{ label: string; value: string; helper: string }>;
}) {
  return (
    <section className="rounded-[28px] border border-[#efd8b7] bg-white/94 p-6 shadow-panel">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">{title}</p>
          <p className="mt-2 text-sm leading-7 text-steel">{description}</p>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-[22px] bg-[#fff9ef] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-ink">{item.label}</h3>
                <span className="text-base font-semibold text-[#a15e00]">{item.value}</span>
              </div>
              <p className="mt-1 text-sm text-steel">{item.helper}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
