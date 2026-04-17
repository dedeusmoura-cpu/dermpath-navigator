import type { ReactNode } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translateNodeTitle } from "../i18n/translations";
import type { AlgorithmNode } from "../types/algorithm";

interface BreadcrumbsProps {
  path: AlgorithmNode[];
  onSelect: (nodeId: string) => void;
  actions?: ReactNode;
}

function getBreadcrumbLabel(node: AlgorithmNode, language: "pt" | "en") {
  if (node.id === "espongiotica-psoriasiforme-linfocitos") {
    return translateNodeTitle({ id: "espongiotica-psoriasiforme", title: "Espongiótica psoriasiforme" }, language);
  }

  if (node.id === "espongiotica-liquenoide-linfocitos") {
    return translateNodeTitle({ id: "espongiotica-liquenoide", title: "Espongiótica liquenoide" }, language);
  }

  if (node.id === "espongiotica-psor-liq-linfocitos") {
    return translateNodeTitle(
      { id: "espongiotica-psoriasiforme-liquenoide", title: "Espongiótica psoriasiforme-liquenoide" },
      language,
    );
  }

  return translateNodeTitle(node, language);
}

export function Breadcrumbs({ path, onSelect, actions }: BreadcrumbsProps) {
  const { language, t } = useLanguage();
  const hasVisiblePath = path.length > 0;

  return (
    <nav aria-label={t("breadcrumb_aria")} className="rounded-2xl border border-sand bg-white px-4 py-2 shadow-panel">
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-3">
        {hasVisiblePath ? (
          <ol className="flex min-w-0 items-center gap-2 overflow-x-auto text-sm text-steel lg:flex-nowrap">
            {path.map((node, index) => {
              const isLast = index === path.length - 1;
              const fullLabel = getBreadcrumbLabel(node, language);
              return (
                <li key={node.id} className="flex min-w-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelect(node.id)}
                    title={fullLabel}
                    aria-label={fullLabel}
                    className={`max-w-[42vw] truncate rounded-full px-3 py-1 transition lg:max-w-[30vw] ${isLast ? "bg-ink text-white" : "bg-paper hover:bg-sand"}`}
                  >
                    {fullLabel}
                  </button>
                  {!isLast ? <span>/</span> : null}
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="text-sm text-steel" />
        )}
        {actions ? <div className="flex shrink-0 items-center gap-3 lg:justify-end">{actions}</div> : null}
      </div>
    </nav>
  );
}

