interface AnswerFeedbackProps {
  acertou: boolean;
  alternativaCorreta: string;
  explicacao: string;
  pontoChave: string;
}

export function AnswerFeedback({ acertou, alternativaCorreta, explicacao, pontoChave }: AnswerFeedbackProps) {
  return (
    <section className={`rounded-[28px] border p-5 ${acertou ? "border-emerald-200 bg-emerald-50/80" : "border-rose-200 bg-rose-50/80"}`}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${acertou ? "text-emerald-700" : "text-rose-700"}`}>
              {acertou ? "Resposta correta" : "Resposta incorreta"}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{acertou ? "Muito bem." : "Vamos revisar juntos."}</h3>
          </div>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${acertou ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
            Alternativa correta: {alternativaCorreta}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] bg-white/82 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad6700]">Explicação resumida</p>
            <p className="mt-3 text-sm leading-7 text-steel">{explicacao}</p>
          </div>
          <div className="rounded-[22px] bg-white/82 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad6700]">Ponto-chave</p>
            <p className="mt-3 text-sm leading-7 text-steel">{pontoChave}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
