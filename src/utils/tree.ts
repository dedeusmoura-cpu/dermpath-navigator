import { algorithmTree } from "../data/algorithm";
import { Language, capitalizeFirstLetter, getTranslatedTerminalLabel, translateNodeDescription, translateNodeResultTitle, translateNodeTitle, translateOptionHint, translateOptionLabel, translateText } from "../i18n/translations";
import type { AlgorithmNode, ContentBlock } from "../types/algorithm";

export function getNode(nodeId: string): AlgorithmNode {
  return algorithmTree.nodes[nodeId];
}

export function buildPathToNode(nodeId: string): AlgorithmNode[] {
  const path: AlgorithmNode[] = [];
  let current: AlgorithmNode | undefined = algorithmTree.nodes[nodeId];

  while (current) {
    // Keep the structural root internal so the visible flow starts directly from the first real choices.
    if (current.id !== algorithmTree.rootId) {
      path.unshift(current);
    }
    current = current.parentId ? algorithmTree.nodes[current.parentId] : undefined;
  }

  return path;
}

export function getTerminalLabel(node: AlgorithmNode, language: Language = "pt"): string {
  return getTranslatedTerminalLabel(node.type, language);
}

export function contentToText(block: ContentBlock, language: Language = "pt"): string {
  const text = translateText(block.text, language);
  const links = block.links?.map((link) => `${translateText(link.label, language)} (${link.url})`).join(" ") ?? "";
  return `${text} ${links}`.trim();
}

export function nodeText(node: AlgorithmNode, language: Language = "pt"): string {
  const notes = (node.notes ?? []).map((block) => contentToText(block, language)).join(" ");
  const references = (node.references ?? []).map((item) => `${translateText(item.label, language)} ${item.url}`).join(" ");
  const options = (node.options ?? [])
    .map((option) => `${translateOptionLabel(node.id, option, language)} ${translateOptionHint(node.id, option, language)}`)
    .join(" ");
  const possibilities = (node.result?.possibilities ?? []).map((item) => translateText(item, language)).join(" ");

  return [
    translateNodeTitle(node, language),
    translateNodeDescription(node, language),
    notes,
    options,
    possibilities,
    (node.tags ?? []).map((item) => translateText(item, language)).join(" "),
    (node.synonyms ?? []).map((item) => translateText(item, language)).join(" "),
    references,
    translateText(node.title, language),
    translateText(node.description ?? "", language),
  ]
    .join(" ")
    .toLowerCase();
}

export function buildExportText(path: AlgorithmNode[], node: AlgorithmNode, language: Language = "pt"): string {
  const breadcrumb = path.map((item) => translateNodeTitle(item, language)).join(" > ");
  const notes = (node.notes ?? []).map((block) => `- ${contentToText(block, language)}`).join("\n");
  const possibilities = node.result?.possibilities?.length
    ? `${language === "en" ? "Possibilities" : "Possibilidades"}:\n${node.result.possibilities.map((item) => `- ${capitalizeFirstLetter(translateText(item, language))}`).join("\n")}\n`
    : "";

  return [
    "DermPath Navigator",
    "",
    `${language === "en" ? "Result" : "Resultado"}: ${translateNodeResultTitle(node, language)}`,
    `${language === "en" ? "Type" : "Tipo"}: ${getTerminalLabel(node, language)}`,
    `${language === "en" ? "Path" : "Caminho"}: ${breadcrumb}`,
    "",
    `${language === "en" ? "Description" : "Descrição"}: ${translateNodeDescription(node, language) || translateText("Sem descrição.", language)}`,
    possibilities.trim(),
    notes ? `${language === "en" ? "Notes" : "Observações"}:\n${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function getChildMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  Object.values(algorithmTree.nodes).forEach((node) => {
    if (!node.parentId) return;
    const existing = map.get(node.parentId) ?? [];
    existing.push(node.id);
    map.set(node.parentId, existing);
  });

  Object.values(algorithmTree.nodes).forEach((node) => {
    const children = map.get(node.id);
    if (!children?.length || !node.options?.length) return;

    const optionOrder = new Map(node.options.map((option, index) => [option.nextNodeId, index]));
    const sortedChildren = [...children].sort((left, right) => {
      const leftIndex = optionOrder.get(left);
      const rightIndex = optionOrder.get(right);

      if (leftIndex === undefined && rightIndex === undefined) return 0;
      if (leftIndex === undefined) return 1;
      if (rightIndex === undefined) return -1;
      return leftIndex - rightIndex;
    });

    map.set(node.id, sortedChildren);
  });

  return map;
}

