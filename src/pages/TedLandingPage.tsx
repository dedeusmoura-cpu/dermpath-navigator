import React from "react";
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

const TED_TEST_QUESTION_ROUTE = "/treinamento-ted/sessao?modo=demo&questionId=ted-dermatites-inflamatorias-046&section=theoretical";

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
        />

        {/* Seletor de seção */}
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
                    ? "border-[#2a3f6a] bg-[#1a2640] shadow-[0_26px_60px_-28px_rgba(26,38,64,0.5)] hover:shadow-[0_32px_68px_-26px_rgba(26,38,64,0.6)]"
                    : "border-[#efd9bb] bg-white shadow-[0_22px_48px_-34px_rgba(80,42,0,0.14)] hover:border-[#f0c98a] hover:shadow-[0_28px_58px_-32px_rgba(80,42,0,0.20)]"
                }`}
              >
                {active && (
                  <span className="mb-3 inline-block rounded-md border border-[#3a5a9a] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7aabef]">
                    Seção ativa
                  </span>
                )}
                <div className="space-y-2">
                  <h3 className={`font-serif text-2xl ${active ? "text-white" : "text-ink"}`}>
                    {SECTION_COPY[section].title}
                  </h3>
                  <p className={`text-sm leading-7 ${active ? "text-white/55" : "text-steel"}`}>
                    {SECTION_COPY[section].body}
                  </p>
                </div>
                <span
                  className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#2e6fd4] text-white group-hover:bg-[#3a7fe0]"
                      : "border border-[#d6c9b0] text-steel group-hover:border-[#b96d00] group-hover:text-[#b96d00]"
                  }`}
                >
                  {active ? "Seção ativa" : "Selecionar seção"}
                </span>
                {/* Motivo decorativo — apenas no card ativo */}
                {active && (
                  <React.Fragment key={section}>
                    <div className="section-circle-outer pointer-events-none absolute bottom-[-20px] right-[-20px] h-28 w-28 rounded-full border-2 border-white/8" style={{ transformOrigin: 'center' }} />
                    <div className="section-circle-inner pointer-events-none absolute bottom-[-6px] right-[-6px] h-14 w-14 rounded-full border border-white/6" style={{ transformOrigin: 'center' }} />
                  </React.Fragment>
                )}
              </Link>
            );
          })}
        </section>

        {/* Ações primárias */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TedModeCard
            to={tedActionRoutes.simulado}
            title="Mini-Simulado"
            body="Responda todas as questões sem feedback e veja o gabarito completo no final."
            cta="Simular"
            icon="📋"
            tone="featured"
          />
          <TedModeCard
            to={tedActionRoutes.random}
            title="Treinar"
            body="Questões com feedback imediato. Configure a dificuldade e as áreas antes de começar."
            cta="Treinar"
            icon="⚡"
          />
          <TedModeCard
            to={tedActionRoutes.areas}
            title="Treinar por área"
            body="Escolha um tema específico e evolua com foco na seção ativa."
            cta="Explorar"
            icon="🔬"
          />
        </section>

        {/* Ações secundárias */}
        <section className="grid gap-3 sm:grid-cols-3">
          {[
            { to: "/treinamento-ted/meus-simulados", label: "Meus Simulados", sub: "Retome ou reveja salvos", icon: "💾" },
            { to: tedActionRoutes.performance, label: "Meu desempenho", sub: "Acurácia e volume de treino", icon: "📈" },
            { to: tedActionRoutes.review, label: "Revisar erros", sub: "Questões erradas ou marcadas", icon: "↩️" },
          ].map(({ to, label, sub, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-[18px] border border-[#efd9bb] bg-[#fffdf8] px-4 py-3 transition hover:-translate-y-0.5 hover:border-[#f0c98a] hover:shadow-[0_10px_28px_-18px_rgba(80,42,0,0.18)]"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-white/70 text-lg shadow-[0_2px_8px_-2px_rgba(80,42,0,0.12)]">
                {icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="text-xs text-steel">{sub}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="grid gap-3 lg:grid-cols-3">
          <PerformanceCard
            label={`Acurácia ${sectionLabel}`}
            value={`${sectionProgress?.acuraciaGlobal ?? 0}%`}
            helper={`Visão rápida do seu desempenho em ${SECTION_COPY[selectedSection].shortLabel.toLowerCase()}.`}
            currentNum={sectionProgress?.acuraciaGlobal ?? 0}
            target={70}
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
