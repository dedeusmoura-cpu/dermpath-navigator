import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TedQuestionView } from "../components/ted/TedQuestionView";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { tedQuestions } from "../data/ted";
import type { TedQuestion, TedSection } from "../types/ted";
import {
  formatTedDuration,
  getAreaById,
  getAreasBySection,
  getTedAreaStatus,
  getTedQuestionOutcome,
  incrementTedQuestionAttempts,
  isTedQuestionMarked,
  loadTedProgress,
  markTedQuestionResolved,
  matchesTedArea,
  recordTedQuestionFirstAttempt,
  resolveTedAreaId,
  toggleTedReview,
} from "../utils/tedProgress";

function shuffleQuestions(questions: TedQuestion[]) {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const VALID_MODES = ["area", "aleatorio", "revisao", "demo"] as const;
type SessionMode = typeof VALID_MODES[number];

function parseSessionMode(raw: string | null): SessionMode {
  const value = raw ?? "aleatorio";
  return (VALID_MODES as readonly string[]).includes(value) ? (value as SessionMode) : "aleatorio";
}

const VALID_DIFFICULTIES = ["facil", "intermediaria", "avancada", "mista"] as const;

function parseDifficulty(raw: string | null): string {
  const value = raw ?? "mista";
  return (VALID_DIFFICULTIES as readonly string[]).includes(value) ? value : "mista";
}

function parseTedSection(raw: string | null): TedSection | undefined {
  if (raw === "theoretical" || raw === "theoretical_practical") {
    return raw;
  }

  return undefined;
}

function getDifficultyLabel(difficulty: TedQuestion["difficulty"]) {
  switch (difficulty) {
    case "facil":
      return "Fácil";
    case "intermediaria":
      return "Intermediária";
    default:
      return "Avançada";
  }
}

export function TedSessionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = parseSessionMode(searchParams.get("modo"));
  const singleQuestionId = searchParams.get("questionId");
  const singleAreaId = searchParams.get("area");
  const areasParam = searchParams.get("areas") ?? "";
  const anosParam = searchParams.get("anos") ?? "";
  const quantity = Number(searchParams.get("quantidade") ?? "5");
  const difficulty = parseDifficulty(searchParams.get("dificuldade"));
  const timerEnabled = searchParams.get("timer") === "1";
  const section = parseTedSection(searchParams.get("section"));
  const availableAreas = useMemo(() => getAreasBySection(section), [section]);
  const yearFilters = useMemo(
    () => anosParam.split(",").map(Number).filter((n) => n > 0),
    [anosParam],
  );
  const sessionSignature = `${mode}|${singleQuestionId ?? ""}|${singleAreaId ?? ""}|${areasParam}|${quantity}|${difficulty}|${timerEnabled ? 1 : 0}|${section ?? ""}|${anosParam}`;

  const selectedAreaIds = useMemo(() => {
    const queryAreas = areasParam.split(",").filter(Boolean);
    return singleAreaId ? [singleAreaId] : queryAreas.length ? queryAreas : availableAreas.map((area) => area.id);
  }, [areasParam, availableAreas, singleAreaId]);

  const filteredQuestions = useMemo(() => {
    if (singleQuestionId) {
      return tedQuestions.filter((question) => question.id === singleQuestionId && (!section || question.section === section));
    }

    return shuffleQuestions(
      tedQuestions.filter((question) => {
        const areaMatch = selectedAreaIds.some((areaId) => matchesTedArea(question.area, areaId));
        const difficultyMatch = difficulty === "mista" || question.difficulty === difficulty;
        const sectionMatch = !section || question.section === section;
        const questionYear = parseInt(question.sourceLabel.match(/\d{4}/)?.[0] ?? "0", 10);
        const yearMatch = yearFilters.length === 0 || yearFilters.includes(questionYear);
        return areaMatch && difficultyMatch && sectionMatch && yearMatch;
      }),
    ).slice(0, Math.max(1, quantity));
  }, [difficulty, quantity, section, selectedAreaIds, singleQuestionId, yearFilters]);

  const [progress, setProgress] = useState(loadTedProgress());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resolvedQuestionIds, setResolvedQuestionIds] = useState<string[]>([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const currentQuestion = filteredQuestions[currentIndex];
  const currentArea = currentQuestion ? getAreaById(currentQuestion.area) : undefined;
  const isMarked = currentQuestion ? isTedQuestionMarked(progress.questoesFavoritasOuMarcadas, currentQuestion.id) : false;
  const isFinished = currentIndex >= filteredQuestions.length;
  const currentOutcome = currentQuestion ? getTedQuestionOutcome(progress, currentQuestion.id) : undefined;

  useEffect(() => {
    if (!timerEnabled || isFinished || currentOutcome?.resolvedCorrectly) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsElapsed((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentOutcome?.resolvedCorrectly, isFinished, timerEnabled, currentIndex]);

  useEffect(() => {
    setSecondsElapsed(0);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
    setResolvedQuestionIds([]);
    setSecondsElapsed(0);
  }, [sessionSignature]);

  useEffect(() => {
    if (isFinished) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [isFinished]);

  if (!filteredQuestions.length) {
    return (
      <Layout>
        <div className="space-y-8">
          <TedHeader
            title="Nenhuma questão encontrada"
            subtitle="A combinação escolhida ainda não possui questões mockadas com esse filtro nesta primeira versão funcional do TED."
          />

          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-6 shadow-panel">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-steel">
                Você pode voltar e ajustar a dificuldade, selecionar mais áreas ou iniciar um treino aleatório mais amplo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/treinamento-ted/aleatorio" className="rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white">
                  Voltar para questões aleatórias
                </Link>
                <Link to={section ? `/treinamento-ted/areas?section=${section}` : "/treinamento-ted/areas"} className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-5 py-3 text-sm font-semibold text-[#a16100]">
                  Escolher uma área
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  if (isFinished || !currentQuestion) {
    return (
      <Layout>
        <div className="space-y-8">
          <TedHeader
            title="Sessão concluída"
            subtitle="Você terminou esta rodada do TED. Aproveite para revisar seu desempenho e voltar às questões marcadas."
          />

          <section className="rounded-[30px] border border-[#efd6b3] bg-white/95 p-6 shadow-panel">
            <div className="grid gap-4 lg:grid-cols-4">
              <SummaryMetric label="Questões na sessão" value={`${filteredQuestions.length}`} />
              <SummaryMetric label="Questões resolvidas" value={`${resolvedQuestionIds.length}`} />
              <SummaryMetric label="Acurácia de 1ª tentativa" value={`${progress.acuraciaGlobal}%`} />
              <SummaryMetric
                label="Resolução final"
                value={`${filteredQuestions.length ? Math.round((resolvedQuestionIds.length / filteredQuestions.length) * 100) : 0}%`}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/treinamento-ted/desempenho" className="rounded-full bg-[#1f2f4c] px-5 py-3 text-sm font-semibold text-white">
                Ver meu desempenho
              </Link>
              <Link to={section ? `/treinamento-ted/revisao?section=${section}` : "/treinamento-ted/revisao"} className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-5 py-3 text-sm font-semibold text-[#a16100]">
                Revisar erros
              </Link>
              <button
                type="button"
                onClick={() => navigate(section ? `/treinamento-ted/aleatorio?section=${section}` : "/treinamento-ted/aleatorio")}
                className="rounded-full border border-[#efdfc6] bg-white px-5 py-3 text-sm font-semibold text-steel"
              >
                Novo treino
              </button>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  const currentAreaId = resolveTedAreaId(currentQuestion.area);
  const areaPerformance = progress.desempenhoPorArea[currentAreaId];
  const areaStatus = getTedAreaStatus(areaPerformance?.totalRespondidas ?? 0, areaPerformance?.acuracia ?? 0);
  const currentQuestionResolved = resolvedQuestionIds.includes(currentQuestion.id);
  const nextQuestionLabel = currentQuestionResolved ? "Próxima questão" : "Pular questão";
  const isDemoMode = mode === "demo";

  function handleFirstAttempt(params: { selectedOptionId: string; firstAttemptCorrect: boolean }) {
    const alreadyRecorded = getTedQuestionOutcome(progress, currentQuestion.id);

    if (alreadyRecorded) {
      if (!params.firstAttemptCorrect) {
        setProgress((current) => incrementTedQuestionAttempts(current, currentQuestion.id));
      }
      return;
    }

    const nextProgress = recordTedQuestionFirstAttempt({
      progress,
      question: currentQuestion,
      selectedOptionId: params.selectedOptionId,
      tempoSegundos: timerEnabled ? secondsElapsed : undefined,
    });

    setProgress(nextProgress);
  }

  function handleResolved() {
    const outcome = getTedQuestionOutcome(progress, currentQuestion.id);

    if (outcome && !outcome.firstAttemptCorrect && !outcome.resolvedCorrectly) {
      setProgress((current) =>
        markTedQuestionResolved({
          progress: current,
          question: currentQuestion,
          tempoSegundos: timerEnabled ? secondsElapsed : undefined,
        }),
      );
    }

    setResolvedQuestionIds((current) => (current.includes(currentQuestion.id) ? current : [...current, currentQuestion.id]));
  }

  function handleNextQuestion() {
    setCurrentIndex((current) => current + 1);
  }

  function handleToggleReview() {
    setProgress((current) => toggleTedReview(current, currentQuestion.id));
  }

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title={
            mode === "area"
              ? currentArea?.nome ?? "Treino por área"
              : mode === "revisao"
                ? "Revisão comentada"
                : mode === "demo"
                  ? "Questão teste"
                  : "Sessão aleatória"
          }
          subtitle={
            mode === "demo"
              ? "Modo provisório para demonstração: a questão abre diretamente com o fluxo completo de resposta, explicação e comentário em vídeo."
              : section === "theoretical_practical"
                ? "Sessão filtrada para questões teórico-práticas, com imagens integradas ao enunciado quando disponíveis."
                : "Agora o TED avalia imediatamente no clique, permite nova tentativa em caso de erro e libera o comentário em vídeo apenas após o acerto."
          }
        />

        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <TedQuestionView
            key={currentQuestion.id}
            question={currentQuestion}
            areaLabel={currentArea?.nome ?? currentQuestion.area}
            difficultyLabel={getDifficultyLabel(currentQuestion.difficulty)}
            badgeLabel={isDemoMode ? "Questão teste" : undefined}
            onFirstAttempt={handleFirstAttempt}
            onResolved={handleResolved}
            onNextQuestion={handleNextQuestion}
            nextQuestionLabel={nextQuestionLabel}
          />

          <div className="space-y-4">
            <SessionSideCard label="Área atual" value={currentArea?.nome ?? currentQuestion.area} helper={`Status nesta área: ${areaStatus}`} />
            {currentQuestion.subarea ? (
              <SessionSideCard label="Subárea" value={currentQuestion.subarea} helper="Útil para consolidar padrões específicos." />
            ) : null}
            <SessionSideCard
              label="Timer"
              value={timerEnabled ? formatTedDuration(secondsElapsed) : "Desativado"}
              helper={timerEnabled ? "Tempo correndo até você resolver a questão." : "Sessão sem controle de tempo."}
            />
            <SessionSideCard
              label="Primeira tentativa"
              value={currentOutcome ? (currentOutcome.firstAttemptCorrect ? "Correta" : "Errada") : "Pendente"}
              helper="Esta métrica é registrada no primeiro clique do usuário."
            />
            <div className="rounded-[24px] border border-[#efd8b7] bg-white/94 p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">Ações</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleToggleReview}
                    className="rounded-full border border-[#efcc98] bg-[#fff7ea] px-4 py-2 text-sm font-semibold text-[#a16100]"
                  >
                    {isMarked ? "Remover da revisão" : "Marcar para revisão"}
                  </button>
                  <Link
                    to={`/treinamento-ted/desempenho?area=${currentAreaId}${section ? `&section=${section}` : ""}`}
                    className="rounded-full border border-[#efdfc6] bg-white px-4 py-2 text-sm font-semibold text-steel"
                  >
                    Ver desempenho da área
                  </Link>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="rounded-full border border-[#efcc98] bg-[#fff7ea] px-4 py-2 text-sm font-semibold text-[#a16100] transition hover:bg-[#fff1dc] focus:outline-none focus:ring-2 focus:ring-[#f4a000]/30"
                  >
                    {nextQuestionLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function SessionSideCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-[24px] border border-[#efd8b7] bg-white/94 p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">{label}</p>
      <p className="mt-3 font-serif text-3xl text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-steel">{helper}</p>
    </div>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] bg-[#fff9ef] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b56d00]">{label}</p>
      <p className="mt-2 font-serif text-3xl text-ink">{value}</p>
    </div>
  );
}
