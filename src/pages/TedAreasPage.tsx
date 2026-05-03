import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AreaCard } from "../components/ted/AreaCard";
import { TedHeader } from "../components/ted/TedHeader";
import { ScopeSelector } from "../components/ted/ScopeSelector";
import { Layout } from "../components/Layout";
import type { TedArea, TedQuestionScope, TedSection } from "../types/ted";
import { getTedCompletoGroups } from "../data/ted";
import { getAreasBySection, getTedAreaPerformance, loadTedProgress } from "../utils/tedProgress";

export function TedAreasPage() {
  const [searchParams] = useSearchParams();
  const section = (searchParams.get("section") as TedSection | null) ?? undefined;
  const [progress] = useState(loadTedProgress);
  const [scope, setScope] = useState<TedQuestionScope>("dermatopatologia");

  const availableAreas = getAreasBySection(section);
  const tedCompletoGroups = getTedCompletoGroups(section);

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

        <ScopeSelector value={scope} onChange={setScope} />

        {scope === "dermatopatologia" ? (
          /* ── Flat list – dermatopatologia (existing behavior) ── */
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
        ) : (
          /* ── Grouped view – TED Completo ── */
          <div className="space-y-10">
            {tedCompletoGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                {/* Group header */}
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">
                    {group.nome}
                  </h2>
                  <div className="h-px flex-1 bg-[#efd7b5]" />
                </div>

                {/* Area cards grid */}
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.areas.map((area: TedArea) => {
                    if (area.isComingSoon) {
                      return (
                        <div
                          key={area.id}
                          className="flex flex-col gap-2 rounded-[24px] border border-dashed border-[#e8dfc8] bg-[#faf8f4] p-5 opacity-55"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold text-steel">{area.nome}</h3>
                            <span className="shrink-0 rounded-full bg-[#f0e8d8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#a36300]">
                              Em breve
                            </span>
                          </div>
                          <p className="text-sm leading-6 text-[#b8a890]">{area.descricao}</p>
                          <p className="mt-1 text-xs text-[#c8b89a]">Questões em preparação</p>
                        </div>
                      );
                    }

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
