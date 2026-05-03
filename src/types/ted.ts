export type TedDifficulty = "facil" | "intermediaria" | "avancada" | "mista" | "basica";
export type TedQuestionScope = "dermatopatologia" | "ted_completo";
export type TedSourceType = "sbd_exam" | "custom" | "adapted" | "mock_exam";
export type TedStatementType = "text_only" | "text_with_image" | "matching_columns" | "clinical_case" | "histology_image" | "image_based";
export type TedVideoProvider = "youtube" | "vimeo" | "internal" | "external";
export type TedSourceConfidence = "high" | "medium" | "low";
export type TedSection = "theoretical" | "theoretical_practical";
export type TedImageType =
  | "clinical"
  | "histopathology"
  | "dermoscopy"
  | "ihc"
  | "ifd"
  | "mycology"
  | "culture"
  | "radiology"
  | "composite"
  | "immunofluorescence";
export type TedImageMode = "single" | "multiple";

export interface TedMatchingColumns {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export interface TedQuestionImage {
  id: string;
  label: string;
  type: TedImageType;
  src: string;
}

export interface TedArea {
  id: string;
  nome: string;
  descricao: string;
  numeroQuestoes: number;
  subareas: string[];
  isComingSoon?: boolean;
}

export interface TedAreaGroup {
  id: string;
  nome: string;
  areas: TedArea[];
}

export interface TedQuestion {
  id: string;
  slug: string;
  questionNumber: number;
  shortTitle?: string;
  sourceType: TedSourceType;
  sourceLabel: string;
  area: string;
  subarea?: string | null;
  section: TedSection;
  difficulty: Exclude<TedDifficulty, "mista">;
  tags: string[];
  statementType: TedStatementType;
  statement: string;
  postStatement?: string | null;
  matchingColumns?: TedMatchingColumns;
  hasImages?: boolean;
  imageMode?: TedImageMode;
  // For theoretical-practical questions, this must contain only the visual panel
  // needed to solve the case. Do not include the exam header, question number,
  // statement, alternatives, or any text that the app already renders in HTML.
  visualPanelImages?: TedQuestionImage[];
  visualPanelCleanupPending?: boolean;
  images?: TedQuestionImage[];
  promptImageUrl?: string | null;
  supportImageUrl?: string | null;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOption: string | null;
  explanationShort: string;
  keyPoint: string;
  teacherComment: string;
  notes?: string | null;
  videoCommentTitle: string;
  videoCommentUrl: string;
  videoProvider: TedVideoProvider;
  isProvisional: boolean;
  isAnnulled?: boolean;
  wasAnnulled?: boolean;
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
  desempenhoPorSecao: Record<TedSection, {
    totalRespondidas: number;
    totalCorretas: number;
    totalErradas: number;
    acuraciaGlobal: number;
  }>;
  desempenhoPorArea: Record<string, TedAreaPerformance>;
  questoesErradas: string[];
  questoesFavoritasOuMarcadas: TedQuestionBookmark[];
  historicoRecente: TedRecentHistoryItem[];
  outcomesByQuestion: Record<string, TedQuestionOutcome>;
}

export interface TedSessionConfig {
  modo: "area" | "aleatorio" | "revisao" | "simulado";
  areaIds: string[];
  section?: TedSection;
  quantidade: number;
  dificuldade: TedDifficulty;
  comTimer: boolean;
  questionId?: string;
}
