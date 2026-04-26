import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import type { TedDifficulty, TedSection } from "../types/ted";
import { tedQuestions } from "../data/ted";
import { getAreasBySection } from "../utils/tedProgress";

const quantityOptions = [5, 10, 20, 30, 40];

const difficultyOptions: Array<{ value: TedDifficulty; label: string }> = [
  { value: "facil", label: "Fácil" },
  { value: "intermediaria", label: "Intermediária" },
  { value: "avancada", label: "Avançada" },
  { value: "mista", label: "Mista" },
];

export function TedSimuladoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const section = (searchParams.get("section") as TedSection | null) ?? undefined;
  const availableAreas = useMemo(() => getAreasBySection(section), [section]);
  const availableYears = useMemo(() => {
    const pool = section ? tedQuestions.filter((q) => q.section === section) : tedQuestions;
    const years = new Set(
      pool
        .map((q) => parseInt(q.sourceLabel.match(/\d{4}/)?.[0] ?? "0", 10))
        .filter((y) => y > 0),
    );
    return Array.from(years).sort((a, b) => b - a);
  }, [section]);

  const [quantidade, setQuantidade] = useState(20);
  const [dificuldade, setDificuldade] = useState<TedDifficulty>("mista");
  const [selectedAreas, setSelectedAreas] = useState<string[]>(() => availableAreas.map((a) => a.id));
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  useEffect(() => {
    setSelectedAreas(availableAreas.map((a) => a.id));
  }, [availableAreas]);

  useEffect(() => {
    setSelectedYears([]);
  }, [section]);

  function toggleArea(areaId: string) {
    setSelectedAreas((current) =>
      current.includes(areaId) ? current.filter((id) => id !== areaId) : [...current, areaId],
    );
  }

  function toggleYear(year: number) {
    setSelectedYears((current) =>
      current.includes(year) ? current.filter((y) => y !== year) : [...current, year],
    );
  }

  function startSimulado() {
    const areaParam = selectedAreas.length
      ? selectedAreas.join(",")
      : availableAreas.map((a) => a.id).join(",");
    const anosParam = selectedYears.length > 0 ? `&anos=${selectedYears.join(",")}` : "";
    navigate(
      `/treinamento-ted/simulado/sessao?quantidade=${quantidade}&dificuldade=${dificuldade}&areas=${areaParam}${section ? `&section=${section}` : ""}${anosParam}`,
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Mini-Simulado"
          subtitle="Responda todas as questões sem feedback imediato e veja o gabarito completo no final."
          eyebrow="Treinamento comentado"
        />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Config panel */}
          <div className="rounded-[28px] border border-[#efd7b5] bg-white/94 p-6 shadow-panel">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Configuração</p>
                <h2 className="font-serif text-3xl text-ink">Monte seu simulado</h2>
                <p className="text-sm leading-7 text-steel">
                  Escolha a quantidade de questões, dificuldade e as áreas que deseja incluir.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-ink">Número de questões</p>
                <div className="flex flex-wrap gap-3">
                  {quantityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setQuantidade(option)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        quantidade === option
                          ? "bg-[#1f2f4c] text-white"
                          : "border border-[#efcc98] bg-[#fff8ec] text-[#a36300] hover:bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-ink">Dificuldade</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDificuldade(option.value)}
                      className={`rounded-[20px] border px-4 py-4 text-left transition ${
                        dificuldade === option.value
                          ? "border-[#eeab48] bg-[#fff3de] text-ink"
                          : "border-[#efdfc6] bg-white text-steel hover:border-[#e9aa50]"
                      }`}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-ink">Ano das questões</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedYears([])}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedYears.length === 0
                        ? "bg-[#1f2f4c] text-white"
                        : "border border-[#efcc98] bg-[#fff8ec] text-[#a36300] hover:bg-white"
                    }`}
                  >
                    Todos
                  </button>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => toggleYear(year)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        selectedYears.includes(year)
                          ? "bg-[#1f2f4c] text-white"
                          : "border border-[#efcc98] bg-[#fff8ec] text-[#a36300] hover:bg-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={startSimulado}
                className="w-full rounded-full bg-[linear-gradient(90deg,#1f2f4c_0%,#2d4470_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_44px_-24px_rgba(31,47,76,0.45)] transition hover:-translate-y-0.5"
              >
                Iniciar Simulado →
              </button>
            </div>
          </div>

          {/* Area selector */}
          <div className="rounded-[28px] border border-[#efd7b5] bg-white/94 p-6 shadow-panel">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Áreas incluídas</p>
                  <h2 className="mt-2 font-serif text-3xl text-ink">Selecione os temas</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAreas(availableAreas.map((a) => a.id))}
                    className="rounded-full border border-[#efcc98] bg-[#fff7e9] px-4 py-2 text-sm font-semibold text-[#a36300]"
                  >
                    Todas
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAreas([])}
                    className="rounded-full border border-[#efdfc6] bg-white px-4 py-2 text-sm font-semibold text-steel"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {availableAreas.map((area) => {
                  const active = selectedAreas.includes(area.id);
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleArea(area.id)}
                      className={`rounded-[22px] border px-4 py-4 text-left transition ${
                        active ? "border-[#eda847] bg-[#fff3de]" : "border-[#efdfc6] bg-white hover:border-[#e9aa50]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base font-semibold text-ink">{area.nome}</h3>
                          <span className={`h-3 w-3 shrink-0 rounded-full ${active ? "bg-[#ea9000]" : "bg-[#ddd2bf]"}`} />
                        </div>
                        <p className="text-sm leading-6 text-steel">{area.numeroQuestoes} questões disponíveis</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
