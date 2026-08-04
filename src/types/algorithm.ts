export type NodeType =
  | "decision"
  | "diagnosis"
  | "morphologic_terminal"
  | "info"
  | "placeholder";

export interface NodeOption {
  label: string;
  nextNodeId: string;
  hint?: string;
}

export interface ContentLink {
  label: string;
  url: string;
}

export interface ContentBlock {
  text: string;
  links?: ContentLink[];
}

export interface TerminalResult {
  title?: string;
  summary?: string;
  possibilities?: string[];
}

export interface AlgorithmNode {
  id: string;
  title: string;
  type: NodeType;
  description?: string;
  notes?: ContentBlock[];
  options?: NodeOption[];
  result?: TerminalResult;
  tags?: string[];
  synonyms?: string[];
  parentId?: string;
  image?: string;
  references?: ContentLink[];
  // Marca um nó de decisão cujos filhos são diagnósticos que compartilham um
  // mesmo achado e devem abrir juntos, de uma vez, na coluna de resultados
  // (ex.: "Papilas dérmicas preservadas..." -> Porfiria cutânea tarda /
  // Pseudoporfiria). Sem essa marcação, o nó é tratado como um branch normal
  // e seus filhos aparecem como cartões próprios em outra coluna, mesmo que
  // todos sejam diagnósticos finais — ver isPureTerminalGroup.
  groupBridge?: boolean;
}

export interface AlgorithmTree {
  rootId: string;
  nodes: Record<string, AlgorithmNode>;
}

export interface SearchResult {
  node: AlgorithmNode;
  score: number;
  excerpt: string;
}
