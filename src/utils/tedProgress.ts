import { getTedAreasBySection, mockTedUserProgress, tedAreas, tedQuestions } from "../data/ted";
import type {
  TedArea,
  TedAreaPerformance,
  TedQuestion,
  TedQuestionBookmark,
  TedQuestionOutcome,
  TedSection,
  TedUserProgress,
} from "../types/ted";

const STORAGE_KEY = "dermpath-navigator:ted-progress";

function cloneProgress(progress: TedUserProgress): TedUserProgress {
  return JSON.parse(JSON.stringify(progress)) as TedUserProgress;
}

function createEmptyAreaPerformance(areaId: string): TedAreaPerformance {
  return {
    areaId,
    totalRespondidas: 0,
    totalCorretas: 0,
    totalErradas: 0,
    acuracia: 0,
  };
}

function createEmptySectionPerformance() {
  return {
    totalRespondidas: 0,
    totalCorretas: 0,
    totalErradas: 0,
    acuraciaGlobal: 0,
  };
}

function normalizeTedText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function resolveTedArea(areaRef: string): TedArea | undefined {
  const normalized = normalizeTedText(areaRef);
  return tedAreas.find((area) => normalizeTedText(area.id) === normalized || normalizeTedText(area.nome) === normalized);
}

export function resolveTedAreaId(areaRef: string) {
  return resolveTedArea(areaRef)?.id ?? areaRef;
}

export function matchesTedArea(questionArea: string, selectedAreaId: string) {
  const resolvedQuestionAreaId = resolveTedAreaId(questionArea);
  const resolvedSelectedAreaId = resolveTedAreaId(selectedAreaId);
  return resolvedQuestionAreaId === resolvedSelectedAreaId;
}

export function createInitialTedProgress(): TedUserProgress {
  const seeded = cloneProgress(mockTedUserProgress);

  for (const area of tedAreas) {
    if (!seeded.desempenhoPorArea[area.id]) {
      seeded.desempenhoPorArea[area.id] = createEmptyAreaPerformance(area.id);
    }
  }

  if (!seeded.outcomesByQuestion) {
    seeded.outcomesByQuestion = {};
  }

  seeded.desempenhoPorSecao = {
    theoretical: {
      ...createEmptySectionPerformance(),
      ...(seeded.desempenhoPorSecao?.theoretical ?? {}),
    },
    theoretical_practical: {
      ...createEmptySectionPerformance(),
      ...(seeded.desempenhoPorSecao?.theoretical_practical ?? {}),
    },
  };

  return seeded;
}

export function loadTedProgress(): TedUserProgress {
  if (typeof window === "undefined") {
    return createInitialTedProgress();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const initial = createInitialTedProgress();
    saveTedProgress(initial);
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as TedUserProgress;
    const merged = createInitialTedProgress();

    return {
      ...merged,
      ...parsed,
      desempenhoPorSecao: {
        theoretical: {
          ...merged.desempenhoPorSecao.theoretical,
          ...(parsed.desempenhoPorSecao?.theoretical ?? {}),
        },
        theoretical_practical: {
          ...merged.desempenhoPorSecao.theoretical_practical,
          ...(parsed.desempenhoPorSecao?.theoretical_practical ?? {}),
        },
      },
      desempenhoPorArea: {
        ...merged.desempenhoPorArea,
        ...parsed.desempenhoPorArea,
      },
      outcomesByQuestion: {
        ...merged.outcomesByQuestion,
        ...(parsed.outcomesByQuestion ?? {}),
      },
    };
  } catch {
    const fallback = createInitialTedProgress();
    saveTedProgress(fallback);
    return fallback;
  }
}

export function saveTedProgress(progress: TedUserProgress) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // QuotaExceededError em storage cheio ou modo privado iOS
  }
}

export function getTedAreaStatus(totalRespondidas: number, acuracia: number) {
  if (totalRespondidas === 0) {
    return "Não iniciado";
  }

  if (totalRespondidas <= 20) {
    return "Explorando";
  }

  if (acuracia >= 85 && totalRespondidas >= 30) {
    return "Alto domínio";
  }

  if (acuracia >= 72 && totalRespondidas >= 20) {
    return "Bom domínio";
  }

  return "Em progresso";
}

export function getTedAreaStatusTone(status: string) {
  switch (status) {
    case "Alto domínio":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "Bom domínio":
      return "text-sky-700 bg-sky-50 border-sky-200";
    case "Em progresso":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "Explorando":
      return "text-orange-700 bg-orange-50 border-orange-200";
    default:
      return "text-stone-600 bg-stone-50 border-stone-200";
  }
}

export function getQuestionById(questionId: string) {
  return tedQuestions.find((question) => question.id === questionId);
}

export function getAreaById(areaId: string) {
  return resolveTedArea(areaId);
}

export function getQuestionsByArea(areaId: string, section?: TedSection) {
  return tedQuestions.filter((question) => matchesTedArea(question.area, areaId) && (!section || question.section === section));
}

export function getAreasBySection(section?: TedSection) {
  return getTedAreasBySection(section);
}

export function getQuestionSectionById(questionId: string): TedSection | undefined {
  return getQuestionById(questionId)?.section;
}

export function getTedSectionPerformance(progress: TedUserProgress, section: TedSection) {
  return progress.desempenhoPorSecao[section] ?? createEmptySectionPerformance();
}

export function getTedAreaPerformance(progress: TedUserProgress, areaId: string, section?: TedSection): TedAreaPerformance {
  if (!section) {
    return progress.desempenhoPorArea[areaId] ?? createEmptyAreaPerformance(areaId);
  }

  const filteredOutcomes = Object.values(progress.outcomesByQuestion).filter((outcome) => {
    if (outcome.areaId !== areaId) {
      return false;
    }

    return getQuestionSectionById(outcome.questionId) === section;
  });

  const totalRespondidas = filteredOutcomes.length;
  const totalCorretas = filteredOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length;
  const totalErradas = filteredOutcomes.filter((outcome) => !outcome.firstAttemptCorrect).length;
  const acuracia = totalRespondidas ? Math.round((totalCorretas / totalRespondidas) * 100) : 0;

  return {
    areaId,
    totalRespondidas,
    totalCorretas,
    totalErradas,
    acuracia,
  };
}

function updateGlobalMetrics(progress: TedUserProgress): TedUserProgress {
  const outcomes = Object.values(progress.outcomesByQuestion);
  const totalRespondidas = outcomes.length;
  const totalCorretas = outcomes.filter((outcome) => outcome.firstAttemptCorrect).length;
  const totalErradas = outcomes.filter((outcome) => !outcome.firstAttemptCorrect).length;
  const acuraciaGlobal = totalRespondidas
    ? Math.round((totalCorretas / totalRespondidas) * 100)
    : 0;

  const theoreticalOutcomes = outcomes.filter((outcome) => getQuestionSectionById(outcome.questionId) === "theoretical");
  const theoreticalPracticalOutcomes = outcomes.filter((outcome) => getQuestionSectionById(outcome.questionId) === "theoretical_practical");

  return {
    ...progress,
    totalRespondidas,
    totalCorretas,
    totalErradas,
    acuraciaGlobal,
    desempenhoPorSecao: {
      theoretical: {
        totalRespondidas: theoreticalOutcomes.length,
        totalCorretas: theoreticalOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length,
        totalErradas: theoreticalOutcomes.filter((outcome) => !outcome.firstAttemptCorrect).length,
        acuraciaGlobal: theoreticalOutcomes.length
          ? Math.round((theoreticalOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length / theoreticalOutcomes.length) * 100)
          : 0,
      },
      theoretical_practical: {
        totalRespondidas: theoreticalPracticalOutcomes.length,
        totalCorretas: theoreticalPracticalOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length,
        totalErradas: theoreticalPracticalOutcomes.filter((outcome) => !outcome.firstAttemptCorrect).length,
        acuraciaGlobal: theoreticalPracticalOutcomes.length
          ? Math.round((theoreticalPracticalOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length / theoreticalPracticalOutcomes.length) * 100)
          : 0,
      },
    },
  };
}

function updateAreaMetrics(progress: TedUserProgress, areaId: string): TedUserProgress {
  const areaOutcomes = Object.values(progress.outcomesByQuestion).filter((outcome) => outcome.areaId === areaId);
  const totalRespondidas = areaOutcomes.length;
  const totalCorretas = areaOutcomes.filter((outcome) => outcome.firstAttemptCorrect).length;
  const totalErradas = areaOutcomes.filter((outcome) => !outcome.firstAttemptCorrect).length;
  const acuracia = totalRespondidas
    ? Math.round((totalCorretas / totalRespondidas) * 100)
    : 0;
  return {
    ...progress,
    desempenhoPorArea: {
      ...progress.desempenhoPorArea,
      [areaId]: { areaId, totalRespondidas, totalCorretas, totalErradas, acuracia },
    },
  };
}

export function recordTedQuestionFirstAttempt(params: {
  progress: TedUserProgress;
  question: TedQuestion;
  selectedOptionId: string;
  tempoSegundos?: number;
}) {
  let next = cloneProgress(params.progress);
  const existing = next.outcomesByQuestion[params.question.id];

  if (existing) {
    return next;
  }

  const firstAttemptCorrect = params.selectedOptionId === params.question.correctOption;
  const now = new Date().toISOString();
  const canonicalAreaId = resolveTedAreaId(params.question.area);

  next.outcomesByQuestion[params.question.id] = {
    questionId: params.question.id,
    areaId: canonicalAreaId,
    firstAttemptCorrect,
    resolvedCorrectly: firstAttemptCorrect,
    attempts: 1,
    firstAnsweredAt: now,
    resolvedAt: firstAttemptCorrect ? now : undefined,
    tempoPrimeiraTentativaSegundos: params.tempoSegundos,
    tempoResolucaoSegundos: firstAttemptCorrect ? params.tempoSegundos : undefined,
  };

  if (!firstAttemptCorrect && !next.questoesErradas.includes(params.question.id)) {
    next.questoesErradas.unshift(params.question.id);
  }

  next.totalTempoSegundos += params.tempoSegundos ?? 0;
  next.historicoRecente.unshift({
    questionId: params.question.id,
    areaId: canonicalAreaId,
    firstAttemptCorrect,
    resolvedCorrectly: firstAttemptCorrect,
    respondedAt: now,
    tempoSegundos: params.tempoSegundos,
  });
  next.historicoRecente = next.historicoRecente.slice(0, 20);

  next = updateAreaMetrics(next, canonicalAreaId);
  next = updateGlobalMetrics(next);
  saveTedProgress(next);
  return next;
}

export function markTedQuestionResolved(params: {
  progress: TedUserProgress;
  question: TedQuestion;
  tempoSegundos?: number;
}) {
  const next = cloneProgress(params.progress);
  const outcome = next.outcomesByQuestion[params.question.id];
  const now = new Date().toISOString();
  const canonicalAreaId = resolveTedAreaId(params.question.area);

  if (!outcome) {
    return recordTedQuestionFirstAttempt({
      progress: next,
      question: params.question,
      selectedOptionId: params.question.correctOption ?? "",
      tempoSegundos: params.tempoSegundos,
    });
  }

  if (outcome.resolvedCorrectly) {
    return next;
  }

  outcome.attempts += 1;
  outcome.resolvedCorrectly = true;
  outcome.resolvedAt = now;
  outcome.tempoResolucaoSegundos = params.tempoSegundos;
  next.outcomesByQuestion[params.question.id] = outcome;

  next.historicoRecente.unshift({
    questionId: params.question.id,
    areaId: canonicalAreaId,
    firstAttemptCorrect: outcome.firstAttemptCorrect,
    resolvedCorrectly: true,
    respondedAt: now,
    tempoSegundos: params.tempoSegundos,
  });
  next.historicoRecente = next.historicoRecente.slice(0, 20);

  saveTedProgress(next);
  return next;
}

export function incrementTedQuestionAttempts(progress: TedUserProgress, questionId: string) {
  const next = cloneProgress(progress);
  const outcome = next.outcomesByQuestion[questionId];

  if (!outcome) {
    return next;
  }

  outcome.attempts += 1;
  next.outcomesByQuestion[questionId] = outcome;
  saveTedProgress(next);
  return next;
}

export function toggleTedReview(progress: TedUserProgress, questionId: string) {
  const next = cloneProgress(progress);
  const current = next.questoesFavoritasOuMarcadas.find((item) => item.questionId === questionId);

  if (current) {
    next.questoesFavoritasOuMarcadas = next.questoesFavoritasOuMarcadas.filter((item) => item.questionId !== questionId);
  } else {
    next.questoesFavoritasOuMarcadas.unshift({ questionId, markedAt: new Date().toISOString() });
  }

  saveTedProgress(next);
  return next;
}

export function isTedQuestionMarked(markedItems: TedQuestionBookmark[], questionId: string) {
  return markedItems.some((item) => item.questionId === questionId);
}

export function getAverageTedTime(progress: TedUserProgress) {
  return progress.totalRespondidas ? Math.round(progress.totalTempoSegundos / progress.totalRespondidas) : 0;
}

export function formatTedDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getTedQuestionOutcome(progress: TedUserProgress, questionId: string): TedQuestionOutcome | undefined {
  return progress.outcomesByQuestion[questionId];
}
