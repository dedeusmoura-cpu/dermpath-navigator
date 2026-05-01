import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { tedQuestions } from "../data/ted";
import type { TedSection } from "../types/ted";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function TedBuscaPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q")?.trim() ?? "";
  const section = (searchParams.get("section") as TedSection | null) ?? undefined;
  const [inputValue, setInputValue] = useState(q);

  const results = useMemo(() => {
    const term = normalize(q);
    if (term.length < 2) return [];
    return tedQuestions.filter((question) => {
      const sectionMatches = !section || question.section === section;
      const textMatches =
        normalize(question.statement).includes(term) ||
        question.options.some((o) => normalize(o.text).includes(term)) ||
        question.tags.some((t) => normalize(t).includes(term)) ||
        normalize(question.area).includes(term) ||
        (question.subarea && normalize(question.subarea).includes(term));
      return sectionMatches && textMatches;
    });
  }, [q, section]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = inputValue.trim();
    if (!term) return;
    const url = `/treinamento-ted/busca?q=${encodeURIComponent(term)}${section ? `&section=${section}` : ""}`;
    navigate(url);
  }

  function openQuestion(questionId: string, qSection: TedSection) {
    navigate(`/treinamento-ted/sessao?modo=demo&questionId=${questionId}&section=${qSection}`);
  }

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader title="Buscar questões" />

        <section className="rounded-[28px] border border-[#efd8b7] bg-white/94 p-6 shadow-panel">
          {/* Campo de busca */}
          <form onSubmit={handleSearch} className="mb-6 flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar questões... ex: merkel, sarcoidose"
                className="w-full rounded-full border border-[#f0d8b0] bg-white px-5 py-2.5 pr-12 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-[#eba94d] focus:ring-2 focus:ring-[#f1c487]/40"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2f4c] text-white transition hover:bg-[#2a3f6a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>

          {/* Estado vazio */}
          {q.length < 2 && (
            <p className="py-12 text-center text-sm text-steel">Digite ao menos 2 caracteres para buscar.</p>
          )}

          {/* Sem resultados */}
          {q.length >= 2 && results.length === 0 && (
            <p className="py-12 text-center text-sm text-steel">
              Nenhuma questão encontrada para <strong>"{q}"</strong>.
            </p>
          )}

          {/* Resultados */}
          {results.length > 0 && (
            <>
              <p className="mb-4 text-xs text-steel">
                <span className="font-semibold text-ink">{results.length}</span> questão{results.length !== 1 ? "ões" : ""} encontrada{results.length !== 1 ? "s" : ""} para "{q}"
              </p>
              <ul className="divide-y divide-[#f5f0e8]">
                {results.map((q_item) => {
                  const sectionLabel = q_item.section === "theoretical" ? "Teórica" : "Teórico-Prática";
                  const snippet = q_item.statement.length > 160
                    ? q_item.statement.slice(0, 160) + "…"
                    : q_item.statement;
                  return (
                    <li key={q_item.id}>
                      <button
                        type="button"
                        onClick={() => openQuestion(q_item.id, q_item.section)}
                        className="flex w-full items-start gap-4 py-4 text-left transition hover:bg-[#fffbf3] rounded-xl px-3 -mx-3"
                      >
                        <div className="mt-0.5 w-16 shrink-0 text-right">
                          <span className="block text-[10px] font-semibold text-[#b96d00]">{q_item.sourceLabel}</span>
                          <span className="block text-[10px] text-steel">Q{q_item.questionNumber}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-[#f1c487] bg-[#fff8ec] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8c5400]">
                              {sectionLabel}
                            </span>
                            <span className="text-[10px] text-steel">{q_item.area}</span>
                            {q_item.subarea && (
                              <span className="text-[10px] text-stone-400">· {q_item.subarea}</span>
                            )}
                          </div>
                          <p className="text-sm leading-6 text-ink">{snippet}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-1 h-4 w-4 shrink-0 text-stone-300">
                          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
