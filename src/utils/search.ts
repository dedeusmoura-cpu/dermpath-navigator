import { algorithmTree } from "../data/algorithm";
import { Language, translateNodeDescription, translateNodeResultTitle, translateText } from "../i18n/translations";
import type { SearchResult } from "../types/algorithm";
import { nodeText } from "./tree";

export function searchNodes(query: string, language: Language): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return Object.values(algorithmTree.nodes)
    .map((node) => {
      const haystack = nodeText(node, language);
      if (!haystack.includes(normalized)) return null;

      const translatedTitle = translateNodeResultTitle(node, language);
      const translatedDescription = translateNodeDescription(node, language);
      const translatedPossibilities = (node.result?.possibilities ?? []).map((item) => translateText(item, language));
      const translatedTags = (node.tags ?? []).map((tag) => translateText(tag, language));
      const translatedSynonyms = (node.synonyms ?? []).map((tag) => translateText(tag, language));
      const translatedNodeTitle = translateText(node.title, language);

      let score = 0;
      if (translatedTitle.toLowerCase().includes(normalized) || translatedNodeTitle.toLowerCase().includes(normalized)) score += 5;
      if (translatedTags.some((tag) => tag.toLowerCase().includes(normalized))) score += 3;
      if (translatedSynonyms.some((tag) => tag.toLowerCase().includes(normalized))) score += 4;
      if (translatedDescription.toLowerCase().includes(normalized)) score += 2;
      if (translatedPossibilities.some((item) => item.toLowerCase().includes(normalized))) score += 3;

      return {
        node,
        score,
        excerpt:
          translatedDescription ||
          translateText(node.notes?.[0]?.text, language) ||
          translatedPossibilities[0] ||
          translateText("Sem resumo disponível.", language),
      } satisfies SearchResult;
    })
    .filter((item): item is SearchResult => item !== null)
    .sort((a, b) => b.score - a.score || translateText(a.node.title, language).localeCompare(translateText(b.node.title, language), language === "en" ? "en-US" : "pt-BR"));
}

