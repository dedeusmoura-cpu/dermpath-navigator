import { AreaCard } from "../components/ted/AreaCard";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { tedAreas } from "../data/ted";
import { loadTedProgress } from "../utils/tedProgress";

export function TedAreasPage() {
  const progress = loadTedProgress();

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Treinar por área"
          subtitle="Escolha o tema que deseja revisar, acompanhe seu desempenho atual e entre em uma sessão comentada com foco direcionado."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {tedAreas.map((area) => {
            const areaProgress = progress.desempenhoPorArea[area.id];
            return (
              <AreaCard
                key={area.id}
                areaId={area.id}
                nome={area.nome}
                descricao={area.descricao}
                numeroQuestoes={area.numeroQuestoes}
                acuracia={areaProgress?.acuracia ?? 0}
                totalRespondidas={areaProgress?.totalRespondidas ?? 0}
              />
            );
          })}
        </section>
      </div>
    </Layout>
  );
}
