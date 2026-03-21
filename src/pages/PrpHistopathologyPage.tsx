import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import prpImage from "../assets/Dermatites/Perivasculares/Psoriasiforme/PRP.png";

export function PrpHistopathologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId;

  function goBackToDiagnosis() {
    navigate("/diagnostico", returnToNodeId ? { state: { nodeId: returnToNodeId } } : undefined);
  }

  return (
    <Layout
      title="Histopatológico"
      subtitle="Pitiríase rubra pilar"
      actions={
        <>
          <button
            type="button"
            onClick={goBackToDiagnosis}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Voltar ao diagnóstico
          </button>
          <Link
            to="/diagnostico"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
          >
            Voltar
          </Link>
        </>
      }
    >
      <div className="mx-auto max-w-[96rem]">
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.16),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.14),_transparent_38%)] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-700">Lâmina didática</p>
                <h2 className="font-serif text-3xl text-ink sm:text-4xl">Histopatológico — Pitiríase rubra pilar</h2>
                <p className="max-w-3xl text-sm leading-6 text-steel">
                  Visualização ampliada da imagem histopatológica, com foco total no conteúdo principal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="overflow-auto rounded-[24px] border border-slate-200 bg-white p-3 sm:p-4">
              <img
                src={prpImage}
                alt="Histopatológico — Pitiríase rubra pilar"
                className="mx-auto h-auto max-h-none w-full object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
