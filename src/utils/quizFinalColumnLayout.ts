import type { CSSProperties } from "react";

export interface FinalColumnNodeLayout {
  top: number;
  height: number;
}

// Shared pattern for the quiz final column:
// when a layout slot exists, the visible button must coincide with that slot,
// so we only append absolute positioning classes and never mix in a fallback relative.
export function getFinalColumnNodeClass(baseClassName: string, layout?: FinalColumnNodeLayout) {
  return `${baseClassName}${layout ? " absolute left-0 right-0" : ""}`;
}

export function getFinalColumnNodeStyle(baseStyle: CSSProperties | undefined, layout?: FinalColumnNodeLayout) {
  if (!layout) {
    return baseStyle;
  }

  return {
    ...(baseStyle ?? {}),
    top: `${layout.top}px`,
    height: `${layout.height}px`,
  };
}
