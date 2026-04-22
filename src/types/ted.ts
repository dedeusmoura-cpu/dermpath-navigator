export type TedDifficulty = "facil" | "intermediaria" | "avancada" | "mista";
export type TedSourceType = "sbd_exam" | "custom" | "adapted" | "mock_exam";
export type TedStatementType = "text_only" | "text_with_image" | "matching_columns" | "clinical_case" | "histology_image";
export type TedVideoProvider = "youtube" | "vimeo" | "internal" | "external";
export type TedSourceConfidence = "high" | "medium" | "low";

export interface TedMatchingColumns {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export interface TedArea {
  id: string;
  nome: string;
  descricao: string;
  numeroQuestoes: number;
  subareas: string[];
}

export interface TedQuestion {
  id: string;
  slug: string;
  questionNumber: number;
  sourceType: TedSourceType;
  sourceLabel: string;
  area: string;
  subarea: string;
  difficulty: Exclude<TedDifficulty, "mista">;
  tags: string[];
  statementType: TedStatementType;
  statement: string;
  postStatement?: string | null;
  matchingColumns?: TedMatchingColumns;
  promptImageUrl?: string | null;
  supportImageUrl?: string | null;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOption: string;
  explanationShort: string;
  keyPoint: string;
  teacherComment: string;
  videoCommentTitle: string;
  videoCommentUrl: string;
  videoProvider: TedVideoProvider;
  isProvisional: boolean;
  sourceConfidence: TedSourceConfidence;
  tempoEstimado?: number;
}

export interface TedAreaPerformance {
  areaId: string;
  totalRespondidas: number;
  totalCorretas: number;
  totalErradas: number;
  acuracia: number;
}

export interface TedRecentHistoryItem {
  questionId: string;
  areaId: string;
  firstAttemptCorrect: boolean;
  resolvedCorrectly: boolean;
  respondedAt: string;
  tempoSegundos?: number;
}

export interface TedQuestionOutcome {
  questionId: string;
  areaId: string;
  firstAttemptCorrect: boolean;
  resolvedCorrectly: boolean;
  attempts: number;
  firstAnsweredAt: string;
  resolvedAt?: string;
  tempoPrimeiraTentativaSegundos?: number;
  tempoResolucaoSegundos?: number;
}

export interface TedQuestionBookmark {
  questionId: string;
  markedAt: string;
}

export interface TedUserProgress {
  totalRespondidas: number;
  totalCorretas: number;
  totalErradas: number;
  acuraciaGlobal: number;
  totalTempoSegundos: number;
  desempenhoPorArea: Record<string, TedAreaPerformance>;
  questoesErradas: string[];
  questoesFavoritasOuMarcadas: TedQuestionBookmark[];
  historicoRecente: TedRecentHistoryItem[];
  outcomesByQuestion: Record<string, TedQuestionOutcome>;
}

export interface TedSessionConfig {
  modo: "area" | "aleatorio" | "revisao";
  areaIds: string[];
  quantidade: number;
  dificuldade: TedDifficulty;
  comTimer: boolean;
  questionId?: string;
}
