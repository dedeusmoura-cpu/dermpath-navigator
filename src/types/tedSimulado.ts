export type SimuladoStatus = "nao_iniciado" | "em_andamento" | "concluido";

export interface SimuladoSalvo {
  id: string;
  nome: string;
  criadoEm: string;
  status: SimuladoStatus;
  section?: string;
  config: {
    quantidade: number;
    dificuldade: string;
    areaIds: string[];
  };
  questionIds: string[];
  selectedAnswers: Record<string, string>;
  resultado?: {
    correctCount: number;
    scorePercent: number;
    classification: string;
    finalizadoEm: string;
  };
}
