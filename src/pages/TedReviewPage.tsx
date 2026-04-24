import { useState } from "react";
import { ReviewList } from "../components/ted/ReviewList";
import { TedHeader } from "../components/ted/TedHeader";
import { Layout } from "../components/Layout";
import { tedAreas, tedQuestions } from "../data/ted";
import { loadTedProgress, matchesTedArea, resolveTedArea } from "../utils/tedProgress";

export function TedReviewPage() {
  const [progress] = useState(loadTedProgress);
  const [areaFilter, setAreaFilter] = useState("todas");

  const reviewItems = tedQuestions
    .filter((question) => {
      const marked = progress.questoesFavoritasOuMarcadas.some((item) => item.questionId === question.id);
      const erro = progress.questoesErradas.includes(question.id);
      const areaMatches = areaFilter === "todas" || matchesTedArea(question.area, areaFilter);
      return areaMatches && (marked || erro);
    })
    .map((question) => ({
      id: question.id,
      titulo: `Questão ${question.questionNumber} • ${question.subarea ?? question.area}`,
      area: resolveTedArea(question.area)?.nome ?? question.area,
      comentarioCurto: question.teacherComment,
      tipo: (progress.questoesErradas.includes(question.id) ? "erro" : "marcada") as "erro" | "marcada",
    }));

  return (
    <Layout>
      <div className="space-y-8">
        <TedHeader
          title="Revisar erros"
          subtitle="Revisite as questões erradas ou marcadas e use o comentário em vídeo para transformar erro em aprendizado consolidado."
        />

        <section className="rounded-[28px] border border-[#efd8b7] bg-white/94 p-6 shadow-panel">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b56d00]">Filtro por área</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Fila de revisão comentada</h2>
            </div>
            <select
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value)}
              className="rounded-full border border-[#efcc98] bg-[#fff8eb] px-4 py-2 text-sm font-semibold text-[#8f5700] outline-none transition focus:border-[#e29b37]"
            >
              <option value="todas">Todas as áreas</option>
              {tedAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.nome}
                </option>
              ))}
            </select>
          </div>
        </section>

        <ReviewList items={reviewItems} />
      </div>
    </Layout>
  );
}
