import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AreaCard } from "../components/ted/AreaCard";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import type { TedSection } from "../types/ted";
import { getAreasBySection, getTedAreaPerformance, loadTedProgress } from "../utils/tedProgress";

export function TedAreasPage() {
  const [searchParams] = useSearchParams();
  const section = (searchParams.get("section") as TedSection | null) ?? undefined;
  const [progress] = useState(loadTedProgress);
  const availableAreas = getAreasBySection(section);

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Treinar por área"
          subtitle={
            section
              ? "Escolha o tema que deseja revisar dentro da seção ativa e entre em uma sessão comentada com foco direcionado."
              : "Escolha o tema que deseja revisar, acompanhe seu desempenho atual e entre em uma sessão comentada com foco direcionado."
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {availableAreas.map((area) => {
            const areaProgress = getTedAreaPerformance(progress, area.id, section);
            return (
              <AreaCard
                key={area.id}
                areaId={area.id}
                section={section}
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
