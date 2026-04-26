import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import type { TedDifficulty, TedSection } from "../types/ted";
import { getAreasBySection } from "../utils/tedProgress";

const quantityOptions = [5, 10, 20];
const difficultyOptions: Array<{ value: TedDifficulty; label: string }> = [
  { value: "facil", label: "Fácil" },
  { value: "intermediaria", label: "Intermediária" },
  { value: "avancada", label: "Avançada" },
  { value: "mista", label: "Mista" },
];

export function TedRandomPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const section = (searchParams.get("section") as TedSection | null) ?? undefined;
  const availableAreas = useMemo(() => getAreasBySection(section), [section]);
  const [quantidade, setQuantidade] = useState(10);
  const [dificuldade, setDificuldade] = useState<TedDifficulty>("mista");
  const [comTimer, setComTimer] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(availableAreas.map((area) => area.id));

  useEffect(() => {
    setSelectedAreas(availableAreas.map((area) => area.id));
  }, [availableAreas]);

  function toggleArea(areaId: string) {
    setSelectedAreas((current) =>
      current.includes(areaId) ? current.filter((id) => id !== areaId) : [...current, areaId],
    );
  }

  function startRandomTraining() {
    const areaParam = selectedAreas.length ? selectedAreas.join(",") : availableAreas.map((area) => area.id).join(",");
    navigate(
      `/treinamento-ted/sessao?modo=aleatorio&areas=${areaParam}&quantidade=${quantidade}&dificuldade=${dificuldade}&timer=${comTimer ? 1 : 0}${section ? `&section=${section}` : ""}`,
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Questões aleatórias"
          subtitle={
            section
              ? "Monte uma sessão personalizada dentro da seção escolhida, mantendo o treino variado sem perder o foco."
              : "Monte uma sessão personalizada para desafiar o raciocínio em várias áreas e manter o treino sempre variado."
          }
        />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#efd7b5] bg-white/94 p-6 shadow-panel">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Configuração do treino</p>
                <h2 className="font-serif text-3xl text-ink">Ajuste sua sessão</h2>
                <p className="text-sm leading-7 text-steel">
                  Defina quantidade, dificuldade, timer e escolha se deseja misturar todas as áreas ou focar apenas em algumas.
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

              <label className="flex items-center justify-between gap-4 rounded-[22px] border border-[#efdcc1] bg-[#fffaf2] px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Modo com timer</p>
                  <p className="text-sm text-steel">Ative para acompanhar tempo de resposta durante o treino.</p>
                </div>
                <input
                  type="checkbox"
                  checked={comTimer}
                  onChange={(event) => setComTimer(event.target.checked)}
                  className="h-5 w-5 rounded border-[#e3c48f] text-[#ea9300] focus:ring-[#ea9300]"
                />
              </label>

              <button
                type="button"
                onClick={startRandomTraining}
                className="w-full rounded-full bg-[linear-gradient(90deg,#ea8c00_0%,#f7b130_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_44px_-24px_rgba(156,94,0,0.4)] transition hover:-translate-y-0.5"
              >
                Iniciar treino aleatório
              </button>
            </div>
          </div>

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
                    onClick={() => setSelectedAreas(availableAreas.map((area) => area.id))}
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
                          <span className={`h-3 w-3 rounded-full ${active ? "bg-[#ea9000]" : "bg-[#ddd2bf]"}`} />
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
