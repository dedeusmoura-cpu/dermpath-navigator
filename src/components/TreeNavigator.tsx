import nodulaDifusaImage from "../assets/Dermatites/nodula-difusa.png";
import perivascularImage from "../assets/Dermatites/perivascular.png";
import perivascularSemAlteracaoEpidermicaImage from "../assets/Dermatites/Perivasculares/perivascular-sem-alteracao-epidermica.png";
import perivascularInterfaceImage from "../assets/Dermatites/Perivasculares/perivascular-interface.png";
import perivascularBalonizanteImage from "../assets/Dermatites/Perivasculares/perivascular-balonizante.png";
import perivascularEspongioticaImage from "../assets/Dermatites/Perivasculares/perivascular-espongiotica.png";
import perivascularPsoriasiformeImage from "../assets/Dermatites/Perivasculares/perivascular-psoriasiforme.png";
import processoCistoImage from "../assets/ProcessoPatologico/processo-cisto.png";
import processoDepositoImage from "../assets/ProcessoPatologico/processo-deposito.png";
import processoDermatiteImage from "../assets/ProcessoPatologico/processo-dermatite.png";
import processoHamartomaMalformacaoImage from "../assets/ProcessoPatologico/processo-hamartoma-malformacao.png";
import processoNeoplasiaImage from "../assets/ProcessoPatologico/processo-neoplasia.png";
import vesicoBolhosaImage from "../assets/Dermatites/vesico-bolhosa.png";
import vasculiteImage from "../assets/Dermatites/vasculite.png";
import pustulosaImage from "../assets/Dermatites/pustulosa.png";
import foliculitePerifoliculiteImage from "../assets/Dermatites/foliculite-perifoliculite.png";
import fibrosanteImage from "../assets/Dermatites/fibrosante.png";
import paniculiteImage from "../assets/Dermatites/paniculite.png";
import type { AlgorithmNode } from "../types/algorithm";

interface TreeNavigatorProps {
  node: AlgorithmNode;
  onNavigate: (nextNodeId: string) => void;
}

const dermatiteCategoryImages: Record<string, string> = {
  perivascular: perivascularImage,
  "nodular-difusa": nodulaDifusaImage,
  "vesico-bolhosa": vesicoBolhosaImage,
  vasculites: vasculiteImage,
  pustulosas: pustulosaImage,
  "foliculite-perifoliculite": foliculitePerifoliculiteImage,
  fibrosantes: fibrosanteImage,
  paniculites: paniculiteImage,
};

const perivascularCategoryImages: Record<string, string> = {
  "perivascular-sem-epiderme": perivascularSemAlteracaoEpidermicaImage,
  "perivascular-interface": perivascularInterfaceImage,
  "perivascular-balonizante": perivascularBalonizanteImage,
  "perivascular-espongiotica": perivascularEspongioticaImage,
  "perivascular-psoriasiforme": perivascularPsoriasiformeImage,
};

const processCategoryImages: Record<string, string> = {
  dermatite: processoDermatiteImage,
  "placeholder-neoplasia": processoNeoplasiaImage,
  "placeholder-cisto": processoCistoImage,
  deposito: processoDepositoImage,
  "placeholder-hamartoma": processoHamartomaMalformacaoImage,
};

const processCircularPositions: Record<string, { angle: number; radius: number }> = {
  dermatite: { angle: -90, radius: 35.5 },
  "placeholder-neoplasia": { angle: -18, radius: 35.5 },
  "placeholder-cisto": { angle: 54, radius: 35.5 },
  deposito: { angle: 126, radius: 35.5 },
  "placeholder-hamartoma": { angle: 198, radius: 35.5 },
};

export function TreeNavigator({ node, onNavigate }: TreeNavigatorProps) {
  if (!node.options?.length) {
    return <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-6 text-sm text-steel">Este nó não possui desdobramentos adicionais.</div>;
  }

  const isDermatiteHub = node.id === "dermatite";
  const isPerivascularHub = node.id === "perivascular";
  const isProcessHub = node.id === "root";

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Próxima decisão</p>
        <h2 className="mt-2 font-serif text-2xl text-ink">{node.title}</h2>
      </div>

      {isProcessHub ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
            {node.options.map((option) => {
              const imageSrc = processCategoryImages[option.nextNodeId];

              return (
                <button
                  key={`${node.id}-${option.label}`}
                  type="button"
                  onClick={() => onNavigate(option.nextNodeId)}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[5/4] overflow-hidden bg-slate-100">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={option.label}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-steel">{option.label}</div>
                    )}
                  </div>
                  <div className="flex min-h-[82px] items-center justify-center px-4 py-4 text-center">
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold leading-6 text-ink">{option.label}</h3>
                      {option.hint ? <p className="text-sm text-steel">{option.hint}</p> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative hidden min-h-[900px] overflow-hidden rounded-[36px] border border-slate-200 bg-[radial-gradient(circle_at_center,_rgba(203,213,225,0.24),_transparent_55%)] px-8 py-8 xl:block">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/85 bg-[radial-gradient(circle,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.78)_58%,_rgba(241,245,249,0.2)_100%)] shadow-inner" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[690px] w-[690px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-[#7F5FB3]/90 shadow-[0_0_0_10px_rgba(127,95,179,0.08)]" />

            {node.options.map((option) => {
              const imageSrc = processCategoryImages[option.nextNodeId];
              const position = processCircularPositions[option.nextNodeId] ?? { angle: -90, radius: 0 };
              const angleInRadians = (position.angle * Math.PI) / 180;
              const orbitX = Math.cos(angleInRadians) * position.radius;
              const orbitY = Math.sin(angleInRadians) * position.radius;

              return (
                <button
                  key={`${node.id}-${option.label}`}
                  type="button"
                  onClick={() => onNavigate(option.nextNodeId)}
                  style={{
                    left: `calc(50% + ${orbitX.toFixed(2)}%)`,
                    top: `calc(50% + ${orbitY.toFixed(2)}%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="group absolute w-[228px] overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:z-10 hover:-translate-y-1 hover:scale-[1.04] hover:border-accent/30 hover:shadow-xl focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                >
                  <div className="aspect-[5/4] overflow-hidden bg-slate-100">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={option.label}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-steel">{option.label}</div>
                    )}
                  </div>
                  <div className="flex min-h-[84px] items-center justify-center px-4 py-3.5 text-center">
                    <div className="space-y-1">
                      <h3 className="text-[0.98rem] font-semibold leading-6 text-ink">{option.label}</h3>
                      {option.hint ? <p className="text-sm text-steel">{option.hint}</p> : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : isDermatiteHub ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {node.options.map((option) => {
            const imageSrc = dermatiteCategoryImages[option.nextNodeId];

            return (
              <button
                key={`${node.id}-${option.label}`}
                type="button"
                onClick={() => onNavigate(option.nextNodeId)}
                className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={option.label}
                      className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-steel">{option.label}</div>
                  )}
                </div>
                <div className="flex min-h-[70px] items-center justify-center px-3 py-3 text-center">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold leading-5 text-ink xl:text-[0.95rem]">{option.label}</h3>
                    {option.hint ? <p className="text-xs text-steel">{option.hint}</p> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : isPerivascularHub ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {node.options.map((option) => {
            const imageSrc = perivascularCategoryImages[option.nextNodeId];

            return (
              <button
                key={`${node.id}-${option.label}`}
                type="button"
                onClick={() => onNavigate(option.nextNodeId)}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
              >
                <div className="aspect-[5/4] overflow-hidden bg-slate-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={option.label}
                      className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-steel">{option.label}</div>
                  )}
                </div>
                <div className="flex min-h-[84px] items-center justify-center px-4 py-4 text-center">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold leading-6 text-ink">{option.label}</h3>
                    {option.hint ? <p className="text-sm text-steel">{option.hint}</p> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3">
          {node.options.map((option) => (
            <button
              key={`${node.id}-${option.label}`}
              type="button"
              onClick={() => onNavigate(option.nextNodeId)}
              className="group rounded-[22px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-ink">{option.label}</h3>
                  {option.hint ? <p className="text-sm text-steel">{option.hint}</p> : null}
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white transition group-hover:bg-accent">Avançar</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
