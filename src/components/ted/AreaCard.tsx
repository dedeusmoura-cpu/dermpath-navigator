import { Link } from "react-router-dom";
import { getTedAreaStatus, getTedAreaStatusTone } from "../../utils/tedProgress";

interface AreaCardProps {
  areaId: string;
  nome: string;
  descricao: string;
  numeroQuestoes: number;
  acuracia: number;
  totalRespondidas: number;
  section?: "theoretical" | "theoretical_practical";
}

export function AreaCard({ areaId, nome, descricao, numeroQuestoes, acuracia, totalRespondidas, section }: AreaCardProps) {
  const status = getTedAreaStatus(totalRespondidas, acuracia);
  const sectionSuffix = section ? `&section=${section}` : "";

  return (
    <article className="rounded-[26px] border border-[#f0dcc0] bg-white/94 p-5 shadow-[0_22px_48px_-34px_rgba(80,42,0,0.18)]">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl text-ink">{nome}</h3>
            <p className="mt-2 text-sm leading-7 text-steel">{descricao}</p>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTedAreaStatusTone(status)}`}>{status}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Questões disponíveis" value={`${numeroQuestoes}`} />
          <Metric label="Desempenho" value={`${acuracia}%`} />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/treinamento-ted/sessao?modo=area&area=${areaId}&quantidade=5&dificuldade=mista&timer=0${sectionSuffix}`}
            className="rounded-full bg-[#ea8e00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d97f00]"
          >
            Treinar
          </Link>
          <Link
            to={`/treinamento-ted/desempenho?area=${areaId}${sectionSuffix}`}
            className="rounded-full border border-[#efcb97] bg-[#fff7ea] px-4 py-2 text-sm font-semibold text-[#9f6100] transition hover:bg-white"
          >
            Ver desempenho
          </Link>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-[#fff8ee] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ba7102]">{label}</p>
      <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
    </div>
  );
}
