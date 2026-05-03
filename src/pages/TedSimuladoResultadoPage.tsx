import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { TedHeader } from "../components/ted/TedHeader";
import { TedVideoCommentCard } from "../components/ted/TedVideoCommentCard";
import { tedQuestions } from "../data/ted";
import type { TedQuestion } from "../types/ted";
import { getAreaById } from "../utils/tedProgress";
import { buscarSimulado, salvarSimulado } from "../utils/tedSimuladoStorage";
import { gerarPdfSimulado } from "../utils/tedSimuladoPdf";

function getClassification(percent: number): { label: string; colorClass: string } {
  if (percent >= 90) return { label: "Excelente", colorClass: "text-emerald-700" };
  if (percent >= 75) return { label: "Muito bom", colorClass: "text-sky-700" };
  if (percent >= 60) return { label: "Bom", colorClass: "text-blue-700" };
  if (percent >= 40) return { label: "Em progresso", colorClass: "text-amber-700" };
  return { label: "Precisa revisar", colorClass: "text-rose-700" };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface QuestionResultCardProps {
  question: TedQuestion;
  index: number;
  userOptionId: string | undefined;
}

function QuestionResultCard({ question, index, userOptionId }: QuestionResultCardProps) {
  const area = getAreaById(question.area);
  const isCorrect =
    question.correctOption !== null && userOptionId === question.correctOption;
  const isWrong = userOptionId !== undefined && !isCorrect;
  const userOption = question.options.find((o) => o.id === userOptionId);
  const correctOption = question.options.find((o) => o.id === question.correctOption);

  return (
    <section
      className={`overflow-hidden rounded-[28px] border transition ${
        isCorrect
          ? "border-emerald-200 bg-emerald-50/40"
          : isWrong
            ? "border-rose-200 bg-rose-50/40"
            : "border-stone-200 bg-stone-50/40"
      }`}
    >
      {/* Card header */}
      <div
        className={`border-b px-5 py-4 ${
          isCorrect
            ? "border-emerald-100 bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)]"
            : isWrong
              ? "border-rose-100 bg-[linear-gradient(135deg,#fff1f2_0%,#ffe4e6_100%)]"
              : "border-stone-100 bg-stone-50"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                isCorrect ? "text-emerald-700" : isWrong ? "text-rose-700" : "text-stone-500"
              }`}
            >
              Questão {index + 1} • {question.sourceLabel}
            </p>
            <span className="inline-block rounded-full border border-[#f2cd97] bg-white px-3 py-0.5 text-xs font-semibold text-[#a26000]">
              {area?.nome ?? question.area}
            </span>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              isCorrect
                ? "border-emerald-300 bg-white text-emerald-700"
                : isWrong
                  ? "border-rose-300 bg-white text-rose-700"
                  : "border-stone-300 bg-white text-stone-600"
            }`}
          >
            {isCorrect ? "Acertou ✓" : isWrong ? "Errou ✗" : "Não respondida"}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Statement preview */}
        <p className="line-clamp-3 whitespace-pre-line text-sm leading-7 text-steel">
          {question.statement}
        </p>

        {/* User's answer */}
        {userOption ? (
          <div
            className={`rounded-[18px] border px-4 py-3 ${
              isCorrect ? "border-emerald-200 bg-white/80" : "border-rose-200 bg-white/80"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
              Sua resposta
            </p>
            <p className="mt-1 text-sm text-ink">
              {userOption.id} — {userOption.text}
            </p>
          </div>
        ) : (
          <div className="rounded-[18px] border border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-sm text-stone-500">Não respondida</p>
          </div>
        )}

        {/* Correct answer — only when user was wrong or didn't answer */}
        {!isCorrect && correctOption ? (
          <div className="rounded-[18px] border border-emerald-200 bg-white/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Alternativa correta
            </p>
            <p className="mt-1 text-sm text-ink">
              {correctOption.id} — {correctOption.text}
            </p>
          </div>
        ) : null}

        {/* Explanation */}
        <p className="text-sm leading-7 text-steel">{question.explanationShort}</p>

        {/* Video comment */}
        {question.videoCommentUrl && question.videoCommentUrl !== "PREENCHER_LINK_VIDEO" && (
          <TedVideoCommentCard
            videoCommentTitle={question.videoCommentTitle}
            videoCommentUrl={question.videoCommentUrl}
            videoProvider={question.videoProvider}
            helperText={question.teacherComment}
          />
        )}
      </div>
    </section>
  );
}

export function TedSimuladoResultadoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pdfLoadingMode, setPdfLoadingMode] = useState<"com_gabarito" | "sem_gabarito" | null>(null);
  const simuladoId = searchParams.get("simuladoId");

  const simulado = simuladoId ? buscarSimulado(simuladoId) : null;

  const questions = useMemo<TedQuestion[]>(() => {
    if (!simulado) return [];
    return simulado.questionIds
      .map((id) => tedQuestions.find((q) => q.id === id))
      .filter((q): q is TedQuestion => q !== undefined);
  }, [simulado]);

  if (!simuladoId || !simulado) {
    return (
      <Layout>
        <div className="space-y-8">
          <TedHeader title="Simulado não encontrado" subtitle="O simulado solicitado não existe ou foi excluído." />
          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-6 shadow-panel">
            <Link
              to="/treinamento-ted/meus-simulados"
              className="inline-flex rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white"
            >
              Voltar para Meus Simulados
            </Link>
          </section>
        </div>
      </Layout>
    );
  }

  if (simulado.status !== "concluido" || !simulado.resultado) {
    return (
      <Layout>
        <div className="space-y-8">
          <TedHeader
            title={simulado.nome}
            subtitle="Este simulado ainda não foi finalizado."
          />
          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-6 shadow-panel">
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/treinamento-ted/simulado/sessao?simuladoId=${simulado.id}${simulado.section ? `&section=${simulado.section}` : ""}`}
                className="inline-flex rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white"
              >
                Continuar simulado
              </Link>
              <Link
                to="/treinamento-ted/meus-simulados"
                className="inline-flex rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel"
              >
                Meus Simulados
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  const { correctCount, scorePercent, classification: classLabel } = simulado.resultado;
  const { colorClass } = getClassification(scorePercent);

  function handleRefazer() {
    salvarSimulado({
      ...simulado!,
      selectedAnswers: {},
      status: "nao_iniciado",
      resultado: undefined,
    });
    navigate(
      `/treinamento-ted/simulado/sessao?simuladoId=${simulado!.id}${simulado!.section ? `&section=${simulado!.section}` : ""}`,
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title={simulado.nome}
          eyebrow="Resultado do Simulado"
          subtitle={`Finalizado em ${formatDate(simulado.resultado.finalizadoEm)}`}
        />

        {/* Score summary */}
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
              <p className={`mt-2 font-serif text-4xl ${colorClass}`}>{scorePercent}%</p>
            </div>
            <div className="rounded-[22px] bg-white/80 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Classificação</p>
              <p className={`mt-2 font-serif text-3xl ${colorClass}`}>{classLabel}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRefazer}
              className="rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Refazer simulado
            </button>
            <button
              type="button"
              disabled={pdfLoadingMode !== null}
              onClick={async () => {
                setPdfLoadingMode("com_gabarito");
                await gerarPdfSimulado(simulado, "com_gabarito");
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
                setPdfLoadingMode("sem_gabarito");
                await gerarPdfSimulado(simulado, "sem_gabarito");
                setPdfLoadingMode(null);
              }}
              className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel transition hover:border-[#e0b87a] disabled:opacity-60"
            >
              {pdfLoadingMode === "sem_gabarito" ? "⏳ Gerando PDF..." : "📄 PDF sem gabarito"}
            </button>
            <Link
              to="/treinamento-ted/meus-simulados"
              className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-5 py-3 text-sm font-semibold text-[#a16100]"
            >
              Voltar para Meus Simulados
            </Link>
          </div>
        </section>

        {/* Per-question breakdown */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-ink">Gabarito detalhado</h2>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuestionResultCard
                key={question.id}
                question={question}
                index={index}
                userOptionId={simulado.selectedAnswers[question.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
