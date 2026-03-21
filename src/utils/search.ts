import { algorithmTree } from "../data/algorithm";
import type { SearchResult } from "../types/algorithm";
import { nodeText } from "./tree";

export function searchNodes(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return Object.values(algorithmTree.nodes)
    .map((node) => {
      const haystack = nodeText(node);
      if (!haystack.includes(normalized)) return null;

      let score = 0;
      if (node.title.toLowerCase().includes(normalized)) score += 5;
      if (node.tags?.some((tag) => tag.toLowerCase().includes(normalized))) score += 3;
      if (node.synonyms?.some((tag) => tag.toLowerCase().includes(normalized))) score += 4;
      if (node.description?.toLowerCase().includes(normalized)) score += 2;
      if (node.result?.possibilities?.some((item) => item.toLowerCase().includes(normalized))) score += 3;

      return {
        node,
        score,
        excerpt: node.description ?? node.notes?.[0]?.text ?? node.result?.possibilities?.[0] ?? "Sem resumo disponível.",
      } satisfies SearchResult;
    })
    .filter((item): item is SearchResult => item !== null)
    .sort((a, b) => b.score - a.score || a.node.title.localeCompare(b.node.title, "pt-BR"));
}
