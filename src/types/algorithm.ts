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
