import { Link } from "react-router-dom";

interface ReviewListItem {
  id: string;
  titulo: string;
  area: string;
  comentarioCurto: string;
  tipo: "erro" | "marcada";
}

interface ReviewListProps {
  items: ReviewListItem[];
}

export function ReviewList({ items }: ReviewListProps) {
  if (!items.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-[#efcb94] bg-white/88 p-6 text-sm leading-7 text-steel">
        Nenhuma questão separada para revisão no momento. Continue treinando e marque as questões que merecem uma segunda leitura.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-[24px] border border-[#f1dcc0] bg-white/94 p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#fff3dc] px-3 py-1 text-xs font-semibold text-[#b66e00]">{item.area}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tipo === "erro" ? "bg-rose-50 text-rose-700" : "bg-[#fff8e9] text-[#b26d00]"}`}>
                  {item.tipo === "erro" ? "Respondida incorretamente" : "Marcada para revisão"}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-ink">{item.titulo}</h3>
              <p className="text-sm leading-7 text-steel">{item.comentarioCurto}</p>
            </div>

            <Link
              to={`/treinamento-ted/sessao?modo=revisao&questionId=${item.id}&quantidade=1&dificuldade=mista&timer=0`}
              className="rounded-full bg-[#1f2f4c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea8e00]"
            >
              Rever questão
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
