import { Link, useSearchParams } from "react-router-dom";
import { PerformanceCard } from "../components/ted/PerformanceCard";
import { TedHeader } from "../components/ted/TedHeader";
import { TedModeCard } from "../components/ted/TedModeCard";
import { Layout } from "../components/Layout";
import type { TedSection } from "../types/ted";
import { getAverageTedTime, getTedSectionPerformance, loadTedProgress } from "../utils/tedProgress";

const DEFAULT_SECTION: TedSection = "theoretical";

const SECTION_COPY: Record<
  TedSection,
  {
    title: string;
    body: string;
    shortLabel: string;
  }
> = {
  theoretical: {
    title: "Questões Teóricas",
    body: "Treine conteúdo conceitual e raciocínio anatomopatológico em questões clássicas do TED.",
    shortLabel: "Questões Teóricas",
  },
  theoretical_practical: {
    title: "Questões Teórico-Práticas",
    body: "Resolva questões com imagens clínicas e exames complementares, integrando morfologia, histopatologia e diagnóstico.",
    shortLabel: "Questões Teórico-Práticas",
  },
};

const TED_TEST_QUESTION_ROUTE = "/treinamento-ted/sessao?modo=demo&questionId=ted-tp-2023-q04&section=theoretical_practical";

function parseTedSection(raw: string | null): TedSection | undefined {
  if (raw === "theoretical" || raw === "theoretical_practical") {
    return raw;
  }

  return undefined;
}

function buildTedSectionRoute(basePath: string, section: TedSection) {
  return `${basePath}?section=${section}`;
}

export function TedLandingPage() {
  const [searchParams] = useSearchParams();
  const requestedSection = parseTedSection(searchParams.get("section"));
  const selectedSection = requestedSection ?? DEFAULT_SECTION;
  const progress = loadTedProgress();
  const sectionProgress = getTedSectionPerformance(progress, selectedSection);
  const sectionLabel = SECTION_COPY[selectedSection].shortLabel;
  const heroSubtitle = `Seção ativa: ${SECTION_COPY[selectedSection].title}. Agora escolha abaixo como deseja treinar.`;
  const tedActionRoutes = {
    areas: buildTedSectionRoute("/treinamento-ted/areas", selectedSection),
    random: buildTedSectionRoute("/treinamento-ted/aleatorio", selectedSection),
    simulado: buildTedSectionRoute("/treinamento-ted/simulado", selectedSection),
    performance: buildTedSectionRoute("/treinamento-ted/desempenho", selectedSection),
    review: buildTedSectionRoute("/treinamento-ted/revisao", selectedSection),
  };

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Treinamento TED"
          subtitle={heroSubtitle}
          eyebrow="Treinamento comentado"
          navItems={[
            { to: "/treinamento-ted", label: "Início", end: true },
            { to: tedActionRoutes.areas, label: "Treinar por área" },
            { to: tedActionRoutes.random, label: "Questões aleatórias" },
            { to: tedActionRoutes.performance, label: "Meu desempenho" },
            { to: tedActionRoutes.review, label: "Revisar erros" },
          ]}
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {(Object.keys(SECTION_COPY) as TedSection[]).map((section) => {
            const active = selectedSection === section;

            return (
              <Link
                key={section}
                to={`/treinamento-ted?section=${section}`}
                aria-current={active ? "true" : undefined}
                className={`group relative overflow-hidden rounded-[28px] border p-6 transition hover:-translate-y-1 ${
                  active
                    ? "border-[#a9c8ff] bg-[linear-gradient(135deg,#eff5ff_0%,#e4eeff_100%)] shadow-[0_26px_60px_-36px_rgba(50,109,235,0.35)] hover:shadow-[0_30px_68px_-34px_rgba(50,109,235,0.4)]"
                    : "border-[#efd9bb] bg-[linear-gradient(135deg,#fffdf8_0%,#fff8ef_100%)] shadow-[0_22px_48px_-34px_rgba(80,42,0,0.14)] hover:border-[#f0c98a] hover:shadow-[0_28px_58px_-32px_rgba(80,42,0,0.2)]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-3xl text-ink">{SECTION_COPY[section].title}</h3>
                    {active ? (
                      <span className="rounded-full border border-[#adc8ff] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A47BF] shadow-[0_10px_24px_-18px_rgba(26,71,191,0.55)]">
                        Seção ativa
                      </span>
                    ) : null}
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-steel">{SECTION_COPY[section].body}</p>
                </div>
                <span
                  className={`mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-[#1A47BF] bg-[#1A47BF] text-white group-hover:bg-[#245FE7]"
                      : "border-[#f0ba69] bg-white/92 text-[#b96d00] group-hover:border-[#e79a31] group-hover:bg-[#fff3dc]"
                  }`}
                >
                  {active ? "Seção ativa" : "Selecionar seção"}
                </span>
              </Link>
            );
          })}
        </section>

        <section className="space-y-2 rounded-[24px] border border-[#e8edf7] bg-white/78 px-5 py-4 shadow-[0_18px_42px_-34px_rgba(31,47,76,0.22)]">
          <h2 className="font-serif text-2xl text-ink">Como deseja treinar?</h2>
          <p className="text-sm leading-7 text-steel">Escolha uma opção para começar usando a seção ativa.</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TedModeCard
            to={tedActionRoutes.areas}
            title="Treinar por área"
            body="Escolha um tema e evolua com foco na seção ativa."
            cta="Explorar"
            tone="primary"
          />
          <TedModeCard
            to={tedActionRoutes.random}
            title="Questões aleatórias"
            body="Monte um treino com dificuldade e áreas sob medida, usando a seção selecionada."
            cta="Configurar"
          />
          <TedModeCard
            to={tedActionRoutes.simulado}
            title="Mini-Simulado"
            body="Responda todas as questões sem feedback e veja o gabarito completo no final."
            cta="Simular"
            tone="primary"
          />
          <TedModeCard
            to="/treinamento-ted/meus-simulados"
            title="Meus Simulados"
            body="Retome simulados salvos, veja resultados anteriores ou refaça um treino."
            cta="Ver salvos"
            tone="primary"
          />
          <TedModeCard
            to={tedActionRoutes.performance}
            title="Meu desempenho"
            body="Acompanhe seu volume de treino e acurácia dentro da seção selecionada."
            cta="Analisar"
          />
          <TedModeCard
            to={tedActionRoutes.review}
            title="Revisar erros"
            body="Retome questões erradas ou marcadas mantendo o filtro da seção ativa."
            cta="Revisar"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <PerformanceCard
            label={`Acurácia ${sectionLabel}`}
            value={`${sectionProgress?.acuraciaGlobal ?? 0}%`}
            helper={`Visão rápida do seu desempenho em ${SECTION_COPY[selectedSection].shortLabel.toLowerCase()}.`}
          />
          <PerformanceCard
            label={`Respondidas ${sectionLabel}`}
            value={`${sectionProgress?.totalRespondidas ?? 0}`}
            helper="Contagem acumulada apenas desta seção."
          />
          <PerformanceCard
            label="Tempo médio"
            value={`${getAverageTedTime(progress)}s`}
            helper="Tempo médio por questão considerando todo o módulo."
          />
        </section>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {requestedSection ? (
            <Link
              to="/treinamento-ted"
              className="text-sm font-medium text-[#b96d00] underline decoration-[#b96d00]/40 underline-offset-4 transition hover:text-ink"
            >
              Voltar para todas as seções
            </Link>
          ) : null}
          <Link
            to={TED_TEST_QUESTION_ROUTE}
            className="text-sm font-medium text-[#b96d00] underline decoration-[#b96d00]/40 underline-offset-4 transition hover:text-ink"
          >
            Ver questão teórico-prática de exemplo →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
