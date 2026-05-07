import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MatchingColumnsInteraction } from "../components/ted/MatchingColumnsInteraction";
import { TedHeader } from "../components/ted/TedHeader";
import { TedOptionList } from "../components/ted/TedOptionList";
import { TedVideoCommentCard } from "../components/ted/TedVideoCommentCard";
import { Layout } from "../components/Layout";
import { tedQuestions } from "../data/ted";
import type { TedQuestion, TedQuestionImage, TedSection } from "../types/ted";
import type { SimuladoSalvo } from "../types/tedSimulado";
import { formatTedStatement } from "../utils/tedStatement";
import { getAreaById, matchesTedArea } from "../utils/tedProgress";
import { buscarSimulado, salvarSimulado } from "../utils/tedSimuladoStorage";
import { gerarPdfSimulado, gerarPdfSimuladoInline } from "../utils/tedSimuladoPdf";

function shuffleOnce<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function parseTedSection(raw: string | null): TedSection | undefined {
  if (raw === "theoretical" || raw === "theoretical_practical") return raw;
  return undefined;
}

function getClassification(percent: number): { label: string; colorClass: string } {
  if (percent >= 90) return { label: "Excelente", colorClass: "text-emerald-700" };
  if (percent >= 75) return { label: "Muito bom", colorClass: "text-sky-700" };
  if (percent >= 60) return { label: "Bom", colorClass: "text-blue-700" };
  if (percent >= 40) return { label: "Em progresso", colorClass: "text-amber-700" };
  return { label: "Precisa revisar", colorClass: "text-rose-700" };
}

interface SimuladoQuestionCardProps {
  question: TedQuestion;
  index: number;
  selectedAnswerId: string | undefined;
  isFinished: boolean;
  onSelect: (optionId: string) => void;
}

function ImageLightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={label}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        />
        {label && (
          <p className="mt-2 text-center text-sm font-medium text-white/80">{label}</p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-ink shadow-lg hover:bg-stone-100"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function SimuladoQuestionCard({
  question,
  index,
  selectedAnswerId,
  isFinished,
  onSelect,
}: SimuladoQuestionCardProps) {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);
  const formattedStatement = formatTedStatement(question.statement);
  const matchingColumns =
    question.statementType === "matching_columns" ? (question.matchingColumns ?? null) : null;
  const area = getAreaById(question.area);

  let practicalImages: TedQuestionImage[] = [];
  if (question.section === "theoretical_practical" && question.hasImages) {
    const base =
      (question.visualPanelImages?.filter((img) => Boolean(img.src)).length ?? 0) > 0
        ? question.visualPanelImages
        : question.images;
    practicalImages = base?.filter((img) => Boolean(img.src)) ?? [];
  }

  const isCorrect = isFinished && (question.isAnnulled ? !!selectedAnswerId : selectedAnswerId === question.correctOption);
  const isWrong = isFinished && !!selectedAnswerId && !isCorrect;
  const correctOption = question.options.find((o) => o.id === question.correctOption);

  return (
    <section
      className={`overflow-hidden rounded-[30px] border shadow-panel transition ${
        isFinished
          ? isCorrect
            ? "border-emerald-200 bg-white/95"
            : "border-rose-200 bg-white/95"
          : "border-[#efd6b3] bg-white/95"
      }`}
    >
      {/* Card header */}
      <div
        className={`border-b px-6 py-5 ${
          isFinished
            ? isCorrect
              ? "border-emerald-100 bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)]"
              : "border-rose-100 bg-[linear-gradient(135deg,#fff1f2_0%,#ffe4e6_100%)]"
            : "border-[#f2dfc3] bg-[linear-gradient(135deg,#fffaf0_0%,#fff3dd_100%)]"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isFinished
                  ? isCorrect
                    ? "text-emerald-700"
                    : "text-rose-700"
                  : "text-[#b46800]"
              }`}
            >
              Questão {index + 1} • {question.sourceLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#f2cd97] bg-white px-3 py-1 text-xs font-semibold text-[#a26000]">
                {area?.nome ?? question.area}
              </span>
            </div>
          </div>
          {isFinished ? (
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-rose-300 bg-rose-50 text-rose-700"
              }`}
            >
              {isCorrect ? "Acertou ✓" : "Errou ✗"}
            </span>
          ) : selectedAnswerId ? (
            <span className="rounded-full border border-[#c9d0de] bg-[#f3f5f9] px-3 py-1 text-xs font-semibold text-steel">
              Respondida
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 px-6 py-6">
        {/* Statement */}
        <div className="rounded-[24px] border border-[#f2e2ca] bg-[#fffdfa] p-5">
          <div className="space-y-5">
            {question.wasAnnulled ? (
              <div className="flex items-start gap-2 rounded-[12px] border border-amber-300 bg-amber-50 px-3 py-2.5">
                <span className="mt-px text-amber-500">⚠️</span>
                <p className="text-xs leading-5 text-amber-800">
                  Esta questão foi <strong>anulada</strong> no gabarito oficial do TED SBD e reativada com gabarito adaptado para fins didáticos.
                </p>
              </div>
            ) : null}
            {formattedStatement.kind === "true_false" ? (
              <div className="space-y-4">
                {formattedStatement.intro ? (
                  <p className="text-base leading-8 text-steel">{formattedStatement.intro}</p>
                ) : null}
                <div className="space-y-3">
                  {formattedStatement.assertions.map((assertion, i) => (
                    <p
                      key={i}
                      className="rounded-[18px] border border-[#f6e8cf] bg-white px-4 py-3 text-base leading-8 text-steel"
                    >
                      {assertion}
                    </p>
                  ))}
                </div>
                {formattedStatement.closing ? (
                  <p className="text-sm font-medium leading-7 text-ink">{formattedStatement.closing}</p>
                ) : null}
              </div>
            ) : (
              <p className="whitespace-pre-line text-base leading-8 text-steel">{formattedStatement.text}</p>
            )}

            {matchingColumns ? (
              <MatchingColumnsInteraction
                key={question.id}
                columns={matchingColumns}
                correctOptionText={
                  question.options.find((o) => o.id === question.correctOption)?.text ?? null
                }
                postStatement={question.postStatement}
              />
            ) : null}

            {!matchingColumns && question.postStatement ? (
              <p className="text-sm font-medium leading-7 text-ink">{question.postStatement}</p>
            ) : null}
          </div>
        </div>

        {/* Prompt image */}
        {question.promptImageUrl ? (
          <figure className="overflow-hidden rounded-[24px] border border-[#f2dfc3] bg-white shadow-sm">
            <img
              src={question.promptImageUrl}
              alt={`Enunciado visual da questão ${question.questionNumber}`}
              className="block h-auto w-full object-contain"
            />
          </figure>
        ) : null}

        {/* Practical images */}
        {practicalImages.length > 0 ? (
          <section className="space-y-4">
            <div
              className={
                practicalImages.length === 1
                  ? "mx-auto max-w-[480px]"
                  : practicalImages.length === 2
                    ? "grid grid-cols-2 gap-3"
                    : practicalImages.length === 3
                      ? "grid grid-cols-3 gap-3"
                      : "grid grid-cols-2 gap-3"
              }
            >
              {practicalImages.map((image) => (
                <figure
                  key={image.id}
                  className="group overflow-hidden rounded-2xl border border-sand/80 bg-paper shadow-sm cursor-zoom-in transition hover:border-[#e0b87a] hover:shadow-md"
                  onClick={() => setLightbox({ src: image.src, label: image.label })}
                >
                  <img src={image.src} alt={image.label} className="block w-full object-contain max-h-52 transition group-hover:opacity-90" />
                  {image.label && (
                    <figcaption className="mt-2 px-3 pb-3 text-center text-xs font-medium text-steel">
                      {image.label}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {lightbox && (
          <ImageLightbox src={lightbox.src} label={lightbox.label} onClose={() => setLightbox(null)} />
        )}

        {/* Options */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Alternativas</p>
          <TedOptionList
            options={question.options}
            selectedWrongOptionIds={
              isFinished && isWrong && selectedAnswerId ? [selectedAnswerId] : []
            }
            correctOptionId={isFinished ? (question.correctOption ?? undefined) : undefined}
            resolved={isFinished}
            selectedPendingOptionId={!isFinished ? selectedAnswerId : undefined}
            onSelect={onSelect}
          />
        </div>

        {/* Post-finish explanation */}
        {isFinished ? (
          <section
            className={`rounded-[28px] border p-5 ${
              isCorrect ? "border-emerald-200 bg-emerald-50/80" : "border-rose-200 bg-rose-50/80"
            }`}
          >
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-ink">
                Alternativa correta: {correctOption?.id}
                {correctOption ? ` • ${correctOption.text}` : ""}
              </h3>
              <p className="text-sm leading-7 text-steel">{question.explanationShort}</p>
            </div>
          </section>
        ) : null}
      </div>

      {/* Video comment — inside the card, below the question body */}
      {isFinished && question.videoCommentUrl && question.videoCommentUrl !== "PREENCHER_LINK_VIDEO" && (
        <div className="border-t border-[#f2dfc3] px-6 py-6">
          <TedVideoCommentCard
            videoCommentTitle={question.videoCommentTitle}
            videoCommentUrl={question.videoCommentUrl}
            videoProvider={question.videoProvider}
            helperText={question.teacherComment}
          />
        </div>
      )}
    </section>
  );
}

export function TedSimuladoSessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const simuladoId = searchParams.get("simuladoId");
  const section = parseTedSection(searchParams.get("section"));

  // Synchronous — localStorage is sync, safe to call at render time
  const savedSimulado = simuladoId ? buscarSimulado(simuladoId) : null;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    () => savedSimulado?.selectedAnswers ?? {},
  );
  const [isFinished, setIsFinished] = useState(() => savedSimulado?.status === "concluido");
  const [saveOpen, setSaveOpen] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [pdfLoadingMode, setPdfLoadingMode] = useState<"com_gabarito" | "sem_gabarito" | null>(null);
  const [barPdfLoading, setBarPdfLoading] = useState(false);

  const activeSimuladoIdRef = useRef<string | null>(simuladoId);

  // Computed once on mount — URL params don't change during the session
  const questions = useMemo<TedQuestion[]>(() => {
    // Restore exact question order from saved simulado
    if (savedSimulado) {
      return savedSimulado.questionIds
        .map((id) => tedQuestions.find((q) => q.id === id))
        .filter((q): q is TedQuestion => q !== undefined);
    }

    const areaParam = searchParams.get("areas") ?? "";
    const areaIds = areaParam.split(",").filter(Boolean);
    const quantity = Math.max(1, Number(searchParams.get("quantidade") ?? "10"));
    const difficulty = searchParams.get("dificuldade") ?? "mista";
    const sec = parseTedSection(searchParams.get("section"));
    const anosParam = searchParams.get("anos") ?? "";
    const yearFilters = anosParam.split(",").map(Number).filter((n) => n > 0);

    const filtered = tedQuestions.filter((q) => {
      const areaMatch = areaIds.length === 0 || areaIds.some((id) => matchesTedArea(q.area, id));
      const diffMatch = difficulty === "mista" || q.difficulty === difficulty;
      const secMatch = !sec || q.section === sec;
      const yearMatch =
        yearFilters.length === 0 ||
        yearFilters.includes(parseInt(q.sourceLabel.match(/\d{4}/)?.[0] ?? "0", 10));
      return areaMatch && diffMatch && secMatch && yearMatch;
    });
    // Um único ano selecionado E quantidade ≥ total disponível → ordem original da prova (Q1→Q40)
    const useOriginalOrder = yearFilters.length === 1 && quantity >= filtered.length;
    const ordered = useOriginalOrder
      ? [...filtered].sort((a, b) => a.questionNumber - b.questionNumber)
      : shuffleOnce(filtered);
    return ordered.slice(0, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = Object.keys(selectedAnswers).length;
  const canFinish = questions.length > 0 && answeredCount === questions.length;
  const isSaved = !!simuladoId;

  const { correctCount, scorePercent, classification } = useMemo(() => {
    if (!isFinished) return { correctCount: 0, scorePercent: 0, classification: getClassification(0) };
    const correct = questions.filter((q) => q.isAnnulled ? !!selectedAnswers[q.id] : selectedAnswers[q.id] === q.correctOption).length;
    const percent = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    return { correctCount: correct, scorePercent: percent, classification: getClassification(percent) };
  }, [isFinished, questions, selectedAnswers]);

  // Auto-save silencioso a cada resposta dada
  useEffect(() => {
    const id = activeSimuladoIdRef.current;
    if (!id || isFinished || Object.keys(selectedAnswers).length === 0) return;
    const sim = buscarSimulado(id);
    if (!sim) return;
    salvarSimulado({ ...sim, selectedAnswers, status: "em_andamento" });
  }, [selectedAnswers, isFinished]);

  function handleSelect(questionId: string, optionId: string) {
    if (isFinished) return;
    setSelectedAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function handleFinish() {
    setIsFinished(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const id = activeSimuladoIdRef.current;
    if (!id) return;
    const sim = buscarSimulado(id);
    if (!sim) return;
    const correct = questions.filter((q) => q.isAnnulled ? !!selectedAnswers[q.id] : selectedAnswers[q.id] === q.correctOption).length;
    const percent = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    salvarSimulado({
      ...sim,
      selectedAnswers,
      status: "concluido",
      resultado: {
        correctCount: correct,
        scorePercent: percent,
        classification: getClassification(percent).label,
        finalizadoEm: new Date().toISOString(),
      },
    });
  }

  function handleSave() {
    const id = crypto.randomUUID();
    const areaParam = searchParams.get("areas") ?? "";
    const areaIds = areaParam.split(",").filter(Boolean);
    const sim: SimuladoSalvo = {
      id,
      nome: pendingName.trim() || "Simulado sem nome",
      criadoEm: new Date().toISOString(),
      status: Object.keys(selectedAnswers).length > 0 ? "em_andamento" : "nao_iniciado",
      section: section,
      config: {
        quantidade: questions.length,
        dificuldade: searchParams.get("dificuldade") ?? "mista",
        areaIds,
      },
      questionIds: questions.map((q) => q.id),
      selectedAnswers,
    };
    try {
      salvarSimulado(sim);
      activeSimuladoIdRef.current = id;
      const newSearch = new URLSearchParams(searchParams);
      newSearch.set("simuladoId", id);
      navigate(`/treinamento-ted/simulado/sessao?${newSearch.toString()}`, { replace: true });
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Erro ao salvar simulado.");
    }
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="space-y-8">
          <TedHeader
            title="Nenhuma questão encontrada"
            subtitle="A combinação escolhida não possui questões com esses filtros."
          />
          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-6 shadow-panel">
            <Link
              to={section ? `/treinamento-ted/simulado?section=${section}` : "/treinamento-ted/simulado"}
              className="inline-flex rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white"
            >
              Voltar e reconfigurar
            </Link>
          </section>
        </div>
      </Layout>
    );
  }

  const nomeSimulado = (savedSimulado?.nome ?? pendingName.trim()) || "Mini-Simulado";

  return (
    <Layout>
      <div className="space-y-8 pb-24">
        <TedHeader
          title="Mini-Simulado"
          eyebrow="Treinamento comentado"
          subtitle={
            isFinished
              ? `Gabarito liberado — ${correctCount} de ${questions.length} acertos (${scorePercent}%).`
              : `${questions.length} questões. Responda todas e clique em "Finalizar Simulado".`
          }
          actionSlot={
            !isFinished ? (
              <>
                <button
                  type="button"
                  disabled={barPdfLoading}
                  onClick={async () => {
                    setBarPdfLoading(true);
                    await gerarPdfSimuladoInline(questions, selectedAnswers, nomeSimulado, "sem_gabarito");
                    setBarPdfLoading(false);
                  }}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 disabled:opacity-60"
                >
                  {barPdfLoading ? "⏳ Gerando..." : "📄 PDF sem gabarito"}
                </button>
                {!isSaved ? (
                  <button
                    type="button"
                    onClick={() => setSaveOpen((v) => !v)}
                    className="rounded-full border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    💾 Salvar simulado
                  </button>
                ) : (
                  <span className="rounded-full border border-green-400 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    ✓ Salvo
                  </span>
                )}
              </>
            ) : undefined
          }
        />

        {/* Painel de salvar — expansível, inline */}
        {saveOpen && !isSaved && !isFinished ? (
          <section className="rounded-[22px] border border-amber-200 bg-amber-50/70 p-5">
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[200px] flex-1 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Nome do simulado
                </p>
                <input
                  type="text"
                  value={pendingName}
                  onChange={(e) => setPendingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                  }}
                  placeholder="Ex: Revisão Melanoma - Semana 3"
                  maxLength={80}
                  autoFocus
                  className="w-full rounded-[14px] border border-amber-200 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-steel/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
                {saveError ? <p className="text-xs text-rose-600">{saveError}</p> : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-[#1f2f4c] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setSaveOpen(false)}
                  className="rounded-full border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-steel"
                >
                  ✕
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {/* Result card — shown after finishing */}
        {isFinished ? (
          <section
            className={`rounded-[30px] border p-6 shadow-panel ${
              scorePercent >= 60 ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"
            }`}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] bg-white/80 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Acertos</p>
                <p className="mt-2 font-serif text-4xl text-ink">
                  {correctCount}/{questions.length}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/80 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Desempenho</p>
                <p className={`mt-2 font-serif text-4xl ${classification.colorClass}`}>{scorePercent}%</p>
              </div>
              <div className="rounded-[22px] bg-white/80 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Classificação</p>
                <p className={`mt-2 font-serif text-3xl ${classification.colorClass}`}>{classification.label}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={section ? `/treinamento-ted/simulado?section=${section}` : "/treinamento-ted/simulado"}
                className="rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Novo simulado
              </Link>
              {simuladoId ? (
                <>
                  <Link
                    to={`/treinamento-ted/simulado/resultado?simuladoId=${simuladoId}`}
                    className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-5 py-3 text-sm font-semibold text-[#a16100]"
                  >
                    Ver resultado detalhado
                  </Link>
                  <button
                    type="button"
                    disabled={pdfLoadingMode !== null}
                    onClick={async () => {
                      const sim = buscarSimulado(simuladoId);
                      if (!sim) return;
                      setPdfLoadingMode("com_gabarito");
                      await gerarPdfSimulado(sim, "com_gabarito");
                      setPdfLoadingMode(null);
                    }}
                    className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel transition hover:border-[#e0b87a] disabled:opacity-60"
                  >
                    {pdfLoadingMode === "com_gabarito" ? "⏳ Gerando PDF..." : "📄 PDF com gabarito"}
                  </button>
                  <button
                    type="button"
                    disabled={pdfLoadingMode !== null}
                    onClick={async () => {
                      const sim = buscarSimulado(simuladoId);
                      if (!sim) return;
                      setPdfLoadingMode("sem_gabarito");
                      await gerarPdfSimulado(sim, "sem_gabarito");
                      setPdfLoadingMode(null);
                    }}
                    className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel transition hover:border-[#e0b87a] disabled:opacity-60"
                  >
                    {pdfLoadingMode === "sem_gabarito" ? "⏳ Gerando PDF..." : "📄 PDF sem gabarito"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  disabled={pdfLoadingMode !== null}
                  onClick={async () => {
                    setPdfLoadingMode("com_gabarito");
                    await gerarPdfSimuladoInline(questions, selectedAnswers, "Mini-Simulado");
                    setPdfLoadingMode(null);
                  }}
                  className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel transition hover:border-[#e0b87a] disabled:opacity-60"
                >
                  {pdfLoadingMode === "com_gabarito" ? "⏳ Gerando PDF..." : "📄 PDF com gabarito"}
                </button>
              )}
              <Link
                to="/treinamento-ted/meus-simulados"
                className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-5 py-3 text-sm font-semibold text-[#a16100]"
              >
                Meus Simulados
              </Link>
              <Link
                to="/treinamento-ted/desempenho"
                className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel"
              >
                Ver desempenho
              </Link>
              <Link
                to="/treinamento-ted"
                className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel"
              >
                Início TED
              </Link>
            </div>
          </section>
        ) : null}

        {/* All questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <SimuladoQuestionCard
              key={question.id}
              question={question}
              index={index}
              selectedAnswerId={selectedAnswers[question.id]}
              isFinished={isFinished}
              onSelect={(optionId) => handleSelect(question.id, optionId)}
            />
          ))}
        </div>
      </div>

      {/* Sticky footer — always visible */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#efd8b7] bg-white/95 shadow-[0_-8px_24px_-12px_rgba(20,27,43,0.18)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Início do simulado"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-steel transition hover:border-stone-300 hover:bg-stone-50"
            >
              ↑
            </button>
            <p className="text-sm text-steel">
              {isFinished ? (
                <>
                  <span className="font-semibold text-ink">{correctCount}</span> de{" "}
                  <span className="font-semibold text-ink">{questions.length}</span> acertos
                </>
              ) : (
                <>
                  <span className="font-semibold text-ink">{answeredCount}</span> de{" "}
                  <span className="font-semibold text-ink">{questions.length}</span> respondidas
                </>
              )}
            </p>
          </div>
          {!isFinished && (
            <button
              type="button"
              onClick={handleFinish}
              disabled={!canFinish}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                canFinish
                  ? "bg-[#1f2f4c] text-white hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#1f2f4c]/30"
                  : "cursor-not-allowed bg-stone-100 text-stone-400"
              }`}
            >
              Finalizar Simulado
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
