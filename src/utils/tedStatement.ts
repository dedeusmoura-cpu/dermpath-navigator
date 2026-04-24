interface PlainTedStatement {
  kind: "plain";
  text: string;
}

interface TrueFalseTedStatement {
  kind: "true_false";
  intro: string;
  assertions: string[];
  closing?: string;
}

export type FormattedTedStatement = PlainTedStatement | TrueFalseTedStatement;

const TRUE_FALSE_MARKER_REGEX = /\(\s*\)/g;
const CLOSING_PROMPT_REGEX = /\bAssinale\s+a\s+sequ[êe]ncia\s+correta\.?/i;
const TRUE_FALSE_CONTEXT_REGEX =
  /(verdadeir[ao]s?\s+e\s+com\s+F\s+as\s+falsas|Verdadeiro\s*\(V\)\s+ou\s+Falso\s*\(F\)|sequ[êe]ncia\s+correta\s+de\s+Verdadeiro\s*\(V\)\s+ou\s+Falso\s*\(F\))/i;

function splitClosingPrompt(text: string) {
  const closingMatch = text.match(CLOSING_PROMPT_REGEX);

  if (!closingMatch || closingMatch.index === undefined) {
    return { assertion: text.trim() };
  }

  return {
    assertion: text.slice(0, closingMatch.index).trim(),
    closing: text.slice(closingMatch.index).trim(),
  };
}

export function formatTedStatement(statement: string): FormattedTedStatement {
  const markerMatches = [...statement.matchAll(TRUE_FALSE_MARKER_REGEX)];

  if (markerMatches.length < 2 || !TRUE_FALSE_CONTEXT_REGEX.test(statement)) {
    return { kind: "plain", text: statement };
  }

  const firstMarkerIndex = markerMatches[0].index ?? -1;

  if (firstMarkerIndex < 0) {
    return { kind: "plain", text: statement };
  }

  const intro = statement.slice(0, firstMarkerIndex).trim();
  const assertionsText = statement.slice(firstMarkerIndex).trim();
  const chunks = assertionsText.split(/(?=\(\s*\))/g).map((chunk) => chunk.trim()).filter(Boolean);
  const assertions: string[] = [];
  let closing: string | undefined;

  for (const chunk of chunks) {
    const splitChunk = splitClosingPrompt(chunk);

    if (splitChunk.assertion) {
      assertions.push(splitChunk.assertion);
    }

    if (splitChunk.closing) {
      closing = closing ? `${closing} ${splitChunk.closing}` : splitChunk.closing;
    }
  }

  if (assertions.length < 2) {
    return { kind: "plain", text: statement };
  }

  return {
    kind: "true_false",
    intro,
    assertions,
    closing,
  };
}
