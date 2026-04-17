export interface QuizTransitionSuccessSelection<TStage extends string = string> {
  stage: TStage;
  nodeId: string;
}

export const quizTransitionSuccessButtonClass =
  "border-transparent bg-[linear-gradient(135deg,#08110b_0%,#14532d_45%,#2f8f4e_100%)] text-white shadow-[0_18px_30px_-22px_rgba(20,83,45,0.42)]";

export function getQuizTransitionSuccessClass<TStage extends string>(
  selection: QuizTransitionSuccessSelection<TStage> | null,
  stage: TStage,
  nodeId: string,
  fallbackClassName: string,
) {
  if (selection?.stage === stage && selection.nodeId === nodeId) {
    return quizTransitionSuccessButtonClass;
  }

  return fallbackClassName;
}
