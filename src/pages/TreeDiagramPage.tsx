import { Link } from "react-router-dom";
import { InteractiveTreeDiagram } from "../components/InteractiveTreeDiagram";
import { algorithmTree } from "../data/algorithm";
import { useLanguage } from "../context/LanguageContext";

export function TreeDiagramPage() {
  const { language } = useLanguage();
  const rootNodeId = algorithmTree.rootId;

  const sequentialUrl = `/mapa-da-arvore`;

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Link
          to={sequentialUrl}
          className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-paper px-3 py-1.5 text-xs font-semibold text-steel shadow-sm transition hover:bg-sand hover:text-ink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          {language === "en" ? "Sequential view" : "Vista sequencial"}
        </Link>
      </div>
      <InteractiveTreeDiagram rootNodeId={rootNodeId} />
    </div>
  );
}
