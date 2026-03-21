import { Link } from "react-router-dom";
import type { AlgorithmNode } from "../types/algorithm";
import { getTerminalLabel } from "../utils/tree";

interface ResultCardProps {
  node: AlgorithmNode;
  breadcrumb: string;
  onBack: () => void;
  onRestart: () => void;
  onCopy: () => void;
  onExport: () => void;
}

const GOLD_TIPS_TARGET_TITLE = "Membrana basal espessada / interface borrada / epiderme afinada";
const ROSACEA_GOLD_TIPS_TARGET_TITLE = "Rosácea granulomatosa";
const PRP_TARGET_TITLE = "Pitiríase rubra pilar";

export function ResultCard({ node, breadcrumb, onBack, onRestart, onCopy, onExport }: ResultCardProps) {
  const resultTitle = node.result?.title ?? node.title;
  const showLupusGoldButton = resultTitle === GOLD_TIPS_TARGET_TITLE;
  const showRosaceaGoldButton = resultTitle === ROSACEA_GOLD_TIPS_TARGET_TITLE;
  const showPrpHistopathologyButton = resultTitle === PRP_TARGET_TITLE;

  return (
    <section className="rounded-[28px] border border-ink/10 bg-ink p-6 text-white shadow-panel">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Resultado final</p>
            <h2 className="font-serif text-3xl sm:text-4xl">{resultTitle}</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-200">{node.description}</p>
          </div>
          <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
            {getTerminalLabel(node)}
          </span>
        </div>

        {node.result?.possibilities?.length ? (
          <div className="space-y-4 rounded-[22px] bg-white/8 p-5">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Possibilidades diagnósticas</h3>
              <ul className="space-y-2 text-sm text-slate-100">
                {node.result.possibilities.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {showLupusGoldButton ? (
              <Link
                to="/dicas-que-valem-ouro"
                state={{ returnToNodeId: node.id }}
                className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-amber-300/70 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 px-5 py-4 text-left text-amber-950 shadow-[0_16px_34px_rgba(217,168,23,0.28)] transition duration-200 hover:-translate-y-0.5 hover:from-amber-200 hover:via-yellow-200 hover:to-amber-100 hover:shadow-[0_22px_40px_rgba(217,168,23,0.32)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <GoldBarsIcon />
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-amber-900/80">Conteúdo especial</p>
                    <p className="font-serif text-xl leading-tight sm:text-2xl">DICAS QUE VALEM OURO</p>
                  </div>
                </div>
                <span className="rounded-full border border-amber-900/15 bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
                  Abrir
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}

        {showRosaceaGoldButton ? <GoldTipsLink to="/dicas-que-valem-ouro/rosacea" nodeId={node.id} /> : null}

        {showPrpHistopathologyButton ? <HistopathologyLink to="/histopatologico/prp" nodeId={node.id} /> : null}

        <div className="rounded-[22px] bg-white/8 p-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Breadcrumb</h3>
          <p className="text-sm leading-6 text-slate-100">{breadcrumb}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ActionButton label="Voltar" onClick={onBack} />
          <ActionButton label="Reiniciar" onClick={onRestart} />
          <ActionButton label="Copiar caminho" onClick={onCopy} />
          <ActionButton label="Exportar texto" onClick={onExport} />
        </div>
      </div>
    </section>
  );
}

function HistopathologyLink({ to, nodeId }: { to: string; nodeId: string }) {
  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-fuchsia-300/45 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 px-5 py-4 text-left text-white shadow-[0_14px_30px_rgba(168,85,247,0.28)] transition duration-200 hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-pink-400 hover:to-violet-400 hover:shadow-[0_18px_36px_rgba(168,85,247,0.34)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <MicroscopeIcon />
        <div className="min-w-0">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-fuchsia-50/85">Conteúdo didático</p>
          <p className="font-serif text-xl leading-tight sm:text-2xl">Histopatológico</p>
        </div>
      </div>
      <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
        Abrir
      </span>
    </Link>
  );
}

function GoldTipsLink({ to, nodeId }: { to: string; nodeId: string }) {
  return (
    <Link
      to={to}
      state={{ returnToNodeId: nodeId }}
      className="group flex w-full items-center justify-between gap-4 rounded-[22px] border border-amber-300/70 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 px-5 py-4 text-left text-amber-950 shadow-[0_16px_34px_rgba(217,168,23,0.28)] transition duration-200 hover:-translate-y-0.5 hover:from-amber-200 hover:via-yellow-200 hover:to-amber-100 hover:shadow-[0_22px_40px_rgba(217,168,23,0.32)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <GoldBarsIcon />
        <div className="min-w-0">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-amber-900/80">Conteúdo especial</p>
          <p className="font-serif text-xl leading-tight sm:text-2xl">DICAS QUE VALEM OURO</p>
        </div>
      </div>
      <span className="rounded-full border border-amber-900/15 bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
        Abrir
      </span>
    </Link>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-slate-100">
      {label}
    </button>
  );
}

function GoldBarsIcon() {
  return (
    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-amber-900/10 bg-white/50 shadow-sm">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
        <defs>
          <linearGradient id="gold-bar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <path d="M8 36 24 28l10 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M28 30 44 22l12 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 18 36 10l12 8-16 8Z" fill="url(#gold-bar-gradient)" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function MicroscopeIcon() {
  return (
    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-white/18 bg-white/14 shadow-sm backdrop-blur-sm">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true" fill="none">
        <path d="M25 10h10l4 8-10 6-4-8Z" fill="white" fillOpacity="0.92" />
        <path d="m39 18 5 5-9 9-5-5" fill="white" fillOpacity="0.82" />
        <path d="M20 28c0-3.3 2.7-6 6-6h2v7l-5 5a8 8 0 0 0-2-6Z" fill="white" fillOpacity="0.72" />
        <path d="M31 34a10 10 0 0 1 10 10v2H23v-2a8 8 0 0 1 8-8Z" fill="white" fillOpacity="0.92" />
        <path d="M18 50h28" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M46 50h4" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 50h2" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <circle cx="43" cy="37" r="5" fill="white" fillOpacity="0.85" />
      </svg>
    </span>
  );
}
