import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { TedHeader } from "../components/ted/TedHeader";
import type { SimuladoSalvo } from "../types/tedSimulado";
import {
  buscarSimulado,
  excluirSimulado,
  listarSimulados,
  salvarSimulado,
} from "../utils/tedSimuladoStorage";
import { gerarPdfSimulado } from "../utils/tedSimuladoPdf";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDifficultyLabel(d: string): string {
  if (d === "facil") return "Fácil";
  if (d === "intermediaria") return "Intermediária";
  if (d === "avancada") return "Avançada";
  return "Mista";
}

function getStatusBadge(status: SimuladoSalvo["status"]) {
  switch (status) {
    case "nao_iniciado":
      return { label: "Não iniciado", className: "border-stone-200 bg-stone-50 text-stone-600" };
    case "em_andamento":
      return { label: "Em andamento", className: "border-amber-200 bg-amber-50 text-amber-700" };
    case "concluido":
      return { label: "Concluído", className: "border-emerald-200 bg-emerald-50 text-emerald-700" };
  }
}

export function MeusSimuladosPage() {
  const [simulados, setSimulados] = useState<SimuladoSalvo[]>(() => listarSimulados());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  function refreshList() {
    setSimulados(listarSimulados());
  }

  function handleDelete(id: string) {
    excluirSimulado(id);
    setConfirmDeleteId(null);
    setOpenMenuId(null);
    refreshList();
  }

  function handleRename(id: string) {
    const sim = buscarSimulado(id);
    if (!sim) return;
    salvarSimulado({ ...sim, nome: renameValue.trim() || sim.nome });
    setRenamingId(null);
    refreshList();
  }

  function handleRedo(id: string) {
    const sim = buscarSimulado(id);
    if (!sim) return;
    salvarSimulado({ ...sim, selectedAnswers: {}, status: "nao_iniciado", resultado: undefined });
    setOpenMenuId(null);
    refreshList();
  }

  function startRename(sim: SimuladoSalvo) {
    setRenameValue(sim.nome);
    setRenamingId(sim.id);
    setOpenMenuId(null);
  }

  function closeMenu() {
    setOpenMenuId(null);
    setConfirmDeleteId(null);
  }

  return (
    <Layout>
      {/* Backdrop to close open menus */}
      {openMenuId !== null ? (
        <div className="fixed inset-0 z-10" onClick={closeMenu} aria-hidden="true" />
      ) : null}

      <div className="space-y-8">
        <TedHeader
          title="Meus Simulados"
          eyebrow="Treinamento comentado"
          subtitle="Seus mini-simulados salvos. Continue de onde parou ou reveja resultados anteriores."
          navItems={[
            { to: "/treinamento-ted", label: "Início TED", end: true },
            { to: "/treinamento-ted/simulado", label: "Novo Simulado" },
          ]}
        />

        {simulados.length >= 27 ? (
          <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">
              Você está próximo do limite de 30 simulados salvos ({simulados.length}/30). Exclua
              simulados antigos para continuar salvando novos.
            </p>
          </div>
        ) : null}

        {simulados.length === 0 ? (
          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-8 shadow-panel">
            <div className="space-y-4 text-center">
              <p className="font-serif text-2xl text-ink">Nenhum simulado salvo ainda</p>
              <p className="text-sm leading-7 text-steel">
                Crie seu primeiro simulado e salve para continuar de onde parou.
              </p>
              <Link
                to="/treinamento-ted/simulado"
                className="inline-flex rounded-full bg-[#1f2f4c] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Criar meu primeiro simulado
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {simulados.map((sim) => {
              const badge = getStatusBadge(sim.status);
              const sessionUrl = `/treinamento-ted/simulado/sessao?simuladoId=${sim.id}${sim.section ? `&section=${sim.section}` : ""}`;
              const resultUrl = `/treinamento-ted/simulado/resultado?simuladoId=${sim.id}`;

              return (
                <article
                  key={sim.id}
                  className="relative overflow-visible rounded-[28px] border border-[#efd6b3] bg-white/95 shadow-panel"
                >
                  <div className="space-y-4 p-6">
                    {/* Badge row + menu */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                        {sim.resultado ? (
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                              sim.resultado.scorePercent >= 60
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-rose-200 bg-rose-50 text-rose-700"
                            }`}
                          >
                            {sim.resultado.scorePercent}%
                          </span>
                        ) : null}
                      </div>

                      {/* ··· menu */}
                      <div className="relative z-20 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (openMenuId === sim.id) {
                              closeMenu();
                            } else {
                              setOpenMenuId(sim.id);
                              setConfirmDeleteId(null);
                            }
                          }}
                          aria-label="Mais ações"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#efd6b3] bg-white text-sm font-bold text-steel transition hover:border-[#e0b87a] hover:text-ink"
                        >
                          ···
                        </button>

                        {openMenuId === sim.id ? (
                          <div className="absolute right-0 top-full z-20 mt-1 min-w-[168px] rounded-[16px] border border-[#efd6b3] bg-white py-1.5 shadow-lg">
                            {confirmDeleteId === sim.id ? (
                              <div className="space-y-2 px-3 py-2">
                                <p className="text-xs font-semibold text-rose-700">Confirmar exclusão?</p>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(sim.id)}
                                    className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
                                  >
                                    Excluir
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setConfirmDeleteId(null);
                                      setOpenMenuId(null);
                                    }}
                                    className="rounded-full border border-[#efdfc6] px-3 py-1 text-xs font-semibold text-steel"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => startRename(sim)}
                                  className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-[#fff8eb]"
                                >
                                  Renomear
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRedo(sim.id)}
                                  className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-[#fff8eb]"
                                >
                                  Refazer
                                </button>
                                <hr className="my-1 border-[#f2dfc3]" />
                                {sim.status === "concluido" ? (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      closeMenu();
                                      setPdfLoading(true);
                                      await gerarPdfSimulado(sim, "com_gabarito");
                                      setPdfLoading(false);
                                    }}
                                    className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-[#fff8eb]"
                                  >
                                    📄 PDF com gabarito
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  onClick={async () => {
                                    closeMenu();
                                    setPdfLoading(true);
                                    await gerarPdfSimulado(sim, "sem_gabarito");
                                    setPdfLoading(false);
                                  }}
                                  className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-[#fff8eb]"
                                >
                                  📄 PDF sem gabarito
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(sim.id)}
                                  className="block w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                                >
                                  Excluir
                                </button>
                              </>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Title or rename input */}
                    {renamingId === sim.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(sim.id);
                            if (e.key === "Escape") setRenamingId(null);
                          }}
                          autoFocus
                          maxLength={80}
                          className="min-w-0 flex-1 rounded-[14px] border border-[#f2dfc3] bg-[#fffdfa] px-3 py-2 text-sm text-ink focus:border-[#e9a840] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRename(sim.id)}
                          className="shrink-0 rounded-full bg-[#1f2f4c] px-3 py-2 text-xs font-semibold text-white"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => setRenamingId(null)}
                          className="shrink-0 rounded-full border border-[#efdfc6] bg-white px-3 py-2 text-xs font-semibold text-steel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <h3 className="font-serif text-2xl leading-tight text-ink">{sim.nome}</h3>
                    )}

                    {/* Metadata */}
                    <div className="space-y-1 text-sm text-steel">
                      <p>
                        {sim.config.quantidade} questões · {getDifficultyLabel(sim.config.dificuldade)} ·{" "}
                        {formatDate(sim.criadoEm)}
                      </p>
                      {sim.resultado ? (
                        <p className="font-medium text-ink">
                          {sim.resultado.correctCount}/{sim.config.quantidade} acertos —{" "}
                          {sim.resultado.classification}
                        </p>
                      ) : null}
                    </div>

                    {/* Primary action */}
                    {sim.status === "concluido" ? (
                      <Link
                        to={resultUrl}
                        className="inline-flex rounded-full bg-[#1f2f4c] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                      >
                        Ver resultado
                      </Link>
                    ) : (
                      <Link
                        to={sessionUrl}
                        className="inline-flex rounded-full bg-[#1f2f4c] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                      >
                        {sim.status === "em_andamento" ? "⏯ Continuar" : "▶ Iniciar"}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {pdfLoading ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-full border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-700 shadow-lg">
          ⏳ Gerando PDF...
        </div>
      ) : null}
    </Layout>
  );
}
