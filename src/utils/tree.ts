import { algorithmTree } from "../data/algorithm";
import type { AlgorithmNode, ContentBlock } from "../types/algorithm";

export function getNode(nodeId: string): AlgorithmNode {
  return algorithmTree.nodes[nodeId];
}

export function buildPathToNode(nodeId: string): AlgorithmNode[] {
  const path: AlgorithmNode[] = [];
  let current = algorithmTree.nodes[nodeId];

  while (current) {
    path.unshift(current);
    current = current.parentId ? algorithmTree.nodes[current.parentId] : undefined;
  }

  return path;
}

export function getTerminalLabel(node: AlgorithmNode): string {
  switch (node.type) {
    case "diagnosis":
      return "Diagnóstico";
    case "morphologic_terminal":
      return "Terminal morfológico";
    case "placeholder":
      return "Ramo futuro";
    case "info":
      return "Informação";
    default:
      return "Decisão";
  }
}

export function contentToText(block: ContentBlock): string {
  const links = block.links?.map((link) => `${link.label} (${link.url})`).join(" ") ?? "";
  return `${block.text} ${links}`.trim();
}

export function nodeText(node: AlgorithmNode): string {
  const notes = (node.notes ?? []).map(contentToText).join(" ");
  const references = (node.references ?? []).map((item) => `${item.label} ${item.url}`).join(" ");
  const options = (node.options ?? []).map((option) => `${option.label} ${option.hint ?? ""}`).join(" ");
  const possibilities = node.result?.possibilities?.join(" ") ?? "";

  return [
    node.title,
    node.description ?? "",
    notes,
    options,
    possibilities,
    node.tags?.join(" ") ?? "",
    node.synonyms?.join(" ") ?? "",
    references,
  ]
    .join(" ")
    .toLowerCase();
}

export function buildExportText(path: AlgorithmNode[], node: AlgorithmNode): string {
  const breadcrumb = path.map((item) => item.title).join(" > ");
  const notes = (node.notes ?? []).map((block) => `- ${contentToText(block)}`).join("\n");
  const possibilities = node.result?.possibilities?.length
    ? `Possibilidades:\n${node.result.possibilities.map((item) => `- ${item}`).join("\n")}\n`
    : "";

  return [
    "Dr. A.I. Ackerman",
    "",
    `Resultado: ${node.result?.title ?? node.title}`,
    `Tipo: ${getTerminalLabel(node)}`,
    `Caminho: ${breadcrumb}`,
    "",
    `Descrição: ${node.description ?? "Sem descrição."}`,
    possibilities.trim(),
    notes ? `Observações:\n${notes}` : "",
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

  return map;
}
