import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { SimuladoSalvo } from "../types/tedSimulado";
import type { TedQuestion } from "../types/ted";
import { tedQuestions } from "../data/ted";
import { getAreaById } from "./tedProgress";

// ─── Layout constants (mm) ───────────────────────────────────────────────────

const PAGE_W = 210;
const PAGE_H = 297;
const M = 20;
const CW = PAGE_W - M * 2; // 170 mm

// ─── Colour palette (R, G, B) ────────────────────────────────────────────────

type RGB = [number, number, number];

const C = {
  black: [30, 30, 30] as RGB,
  steel: [100, 100, 110] as RGB,
  green: [22, 163, 74] as RGB,
  red: [220, 38, 38] as RGB,
  amber: [180, 104, 0] as RGB,
  grayBg: [246, 246, 246] as RGB,
  grayLine: [210, 210, 210] as RGB,
  lightGreen: [240, 253, 244] as RGB,
  lightRed: [255, 241, 242] as RGB,
};

// ─── Cursor (mutable Y-position tracker) ────────────────────────────────────

interface Cur {
  y: number;
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function ink(doc: jsPDF, rgb: RGB): void {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

function fill(doc: jsPDF, rgb: RGB): void {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}

function stroke(doc: jsPDF, rgb: RGB): void {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}

function reset(doc: jsPDF): void {
  doc.setTextColor(C.black[0], C.black[1], C.black[2]);
}

function wrap(doc: jsPDF, text: string, maxW: number): string[] {
  return doc.splitTextToSize(text, maxW) as string[];
}

function ensureSpace(doc: jsPDF, cur: Cur, needed: number): void {
  if (cur.y + needed > PAGE_H - M) {
    doc.addPage();
    cur.y = M;
  }
}

function putText(
  doc: jsPDF,
  cur: Cur,
  text: string,
  x: number,
  maxW: number,
  lh: number,
): void {
  const lines = wrap(doc, text, maxW);
  for (const line of lines) {
    ensureSpace(doc, cur, lh + 1);
    doc.text(line, x, cur.y);
    cur.y += lh;
  }
}

function hRule(doc: jsPDF, cur: Cur): void {
  stroke(doc, C.grayLine);
  doc.line(M, cur.y, M + CW, cur.y);
  cur.y += 5;
}

function getClassLabel(pct: number): string {
  if (pct >= 90) return "Excelente";
  if (pct >= 75) return "Muito bom";
  if (pct >= 60) return "Bom";
  if (pct >= 40) return "Em progresso";
  return "Precisa revisar";
}

function diffLabel(d: string): string {
  const map: Record<string, string> = {
    facil: "Fácil",
    intermediaria: "Intermediária",
    avancada: "Avançada",
  };
  return map[d] ?? "Mista";
}

function ptDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function loadQuestions(questionIds: string[]): TedQuestion[] {
  return questionIds
    .map((id) => tedQuestions.find((q) => q.id === id))
    .filter((q): q is TedQuestion => q !== undefined);
}

// ─── Image helpers ────────────────────────────────────────────────────────────

async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function getImageDimensions(
  base64: string,
): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = base64;
  });
}

function pickImageUrl(question: TedQuestion): string | null {
  if (question.promptImageUrl) return question.promptImageUrl;
  const vp = question.visualPanelImages?.find((img) => Boolean(img.src));
  if (vp) return vp.src;
  const im = question.images?.find((img) => Boolean(img.src));
  if (im) return im.src;
  return null;
}

function detectFormat(base64: string): string {
  if (base64.includes("image/png")) return "PNG";
  if (base64.includes("image/webp")) return "WEBP";
  return "JPEG";
}

async function renderImage(doc: jsPDF, cur: Cur, url: string): Promise<void> {
  const base64 = await fetchImageAsBase64(url);
  if (!base64) return;

  const dims = await getImageDimensions(base64);
  const maxW = CW;
  const maxH = PAGE_H - 2 * M;

  let imgW = maxW;
  let imgH = dims ? (imgW * dims.height) / dims.width : imgW;

  // Scale down if taller than one full page
  if (imgH > maxH) {
    imgH = maxH;
    imgW = dims ? (imgH * dims.width) / dims.height : maxW;
  }

  // Move to next page if image doesn't fit remaining space
  if (cur.y + imgH > PAGE_H - M) {
    doc.addPage();
    cur.y = M;
  }

  const xOffset = M + (maxW - imgW) / 2;
  doc.addImage(base64, detectFormat(base64), xOffset, cur.y, imgW, imgH);
  cur.y += imgH + 6;
}

// ─── Cover page ───────────────────────────────────────────────────────────────

function buildCover(
  doc: jsPDF,
  cur: Cur,
  nome: string,
  criadoEm: string,
  config: SimuladoSalvo["config"],
  resultado: SimuladoSalvo["resultado"],
  versao: "com_gabarito" | "sem_gabarito",
): void {
  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  ink(doc, C.black);
  putText(doc, cur, nome, M, CW, 9);
  cur.y += 2;

  // Eyebrow
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  ink(doc, C.amber);
  doc.text("MINI-SIMULADO TED — DERMATOPATOLOGIA", M, cur.y);
  cur.y += 9;
  reset(doc);

  hRule(doc, cur);

  // Meta
  doc.setFontSize(10);

  ink(doc, C.steel);
  doc.text(`Data: ${ptDate(criadoEm)}`, M, cur.y);
  cur.y += 6;

  if (versao === "com_gabarito" && resultado) {
    doc.setFont("helvetica", "bold");
    ink(doc, C.black);
    const scoreText = `Resultado: ${resultado.correctCount} de ${config.quantidade} acertos (${resultado.scorePercent}%) — ${resultado.classification}`;
    putText(doc, cur, scoreText, M, CW, 6);
    doc.setFont("helvetica", "normal");
  }

  ink(doc, C.steel);
  doc.text(`Questões: ${config.quantidade}    Dificuldade: ${diffLabel(config.dificuldade)}`, M, cur.y);
  cur.y += 8;

  if (versao === "sem_gabarito") {
    doc.setFontSize(9);
    ink(doc, C.steel);
    doc.text(
      "Preencha suas respostas ao lado de cada alternativa. O gabarito está na última página.",
      M,
      cur.y,
    );
    cur.y += 7;
  }

  reset(doc);
  hRule(doc, cur);

  doc.addPage();
  cur.y = M;
}

// ─── Single question ──────────────────────────────────────────────────────────

async function renderQuestion(
  doc: jsPDF,
  cur: Cur,
  question: TedQuestion,
  index: number,
  selectedAnswers: Record<string, string>,
  versao: "com_gabarito" | "sem_gabarito",
): Promise<void> {
  const areaLabel = getAreaById(question.area)?.nome ?? question.area;
  const userOptId = selectedAnswers[question.id];
  const isCorrect =
    question.correctOption !== null && userOptId === question.correctOption;
  const isWrong = userOptId !== undefined && !isCorrect;

  ensureSpace(doc, cur, 44);

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  ink(doc, C.black);
  doc.text(`Questão ${index + 1}  •  ${question.sourceLabel}`, M, cur.y);

  if (versao === "com_gabarito") {
    doc.setFontSize(9);
    const badge = isCorrect ? "✓ Acertou" : isWrong ? "✗ Errou" : "Não respondida";
    ink(doc, isCorrect ? C.green : isWrong ? C.red : C.steel);
    doc.text(badge, PAGE_W - M, cur.y, { align: "right" });
    reset(doc);
  }

  cur.y += 5;

  // Area
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  ink(doc, C.steel);
  doc.text(areaLabel, M, cur.y);
  cur.y += 6;
  reset(doc);

  hRule(doc, cur);

  // ── Statement ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  putText(doc, cur, question.statement, M, CW, 5.5);

  if (question.postStatement) {
    cur.y += 2;
    doc.setFont("helvetica", "bold");
    putText(doc, cur, question.postStatement, M, CW, 5.5);
    doc.setFont("helvetica", "normal");
  }

  // ── Matching columns ──
  if (question.statementType === "matching_columns" && question.matchingColumns) {
    const mc = question.matchingColumns;
    cur.y += 4;
    const colW = CW / 2 - 6;
    const colRx = M + CW / 2 + 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    ink(doc, C.amber);
    doc.text(mc.leftTitle, M, cur.y);
    doc.text(mc.rightTitle, colRx, cur.y);
    cur.y += 5;
    reset(doc);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const count = Math.max(mc.leftItems.length, mc.rightItems.length);

    for (let i = 0; i < count; i++) {
      const lLines = mc.leftItems[i] ? wrap(doc, mc.leftItems[i], colW) : [];
      const rLines = mc.rightItems[i] ? wrap(doc, mc.rightItems[i], colW) : [];
      const rowH = Math.max(lLines.length, rLines.length) * 5 + 1;
      ensureSpace(doc, cur, rowH);

      const startY = cur.y;
      for (let j = 0; j < lLines.length; j++) {
        doc.text(lLines[j], M, startY + j * 5);
      }
      for (let j = 0; j < rLines.length; j++) {
        doc.text(rLines[j], colRx, startY + j * 5);
      }
      cur.y += rowH;
    }
    cur.y += 3;
  }

  cur.y += 4;

  // ── Image (fetch and embed; silently skipped if unavailable) ──
  const imageUrl = pickImageUrl(question);
  if (imageUrl) {
    await renderImage(doc, cur, imageUrl);
  }

  // ── Alternatives ──
  doc.setFontSize(10);

  for (const opt of question.options) {
    const isCorrectOpt = opt.id === question.correctOption;
    const isUserOpt = opt.id === userOptId;

    if (versao === "com_gabarito") {
      if (isCorrectOpt) {
        ink(doc, C.green);
        doc.setFont("helvetica", "bold");
      } else if (isUserOpt) {
        ink(doc, C.red);
        doc.setFont("helvetica", "bold");
      } else {
        ink(doc, C.black);
        doc.setFont("helvetica", "normal");
      }
    } else {
      ink(doc, C.black);
      doc.setFont("helvetica", "normal");
    }

    const prefix =
      versao === "com_gabarito"
        ? isCorrectOpt
          ? "✓ "
          : isUserOpt
            ? "✗ "
            : "   "
        : "   ";

    putText(doc, cur, `${prefix}${opt.id}) ${opt.text}`, M + 2, CW - 4, 5.5);
    reset(doc);
    doc.setFont("helvetica", "normal");
  }

  cur.y += 3;

  // ── Explanation box (com gabarito) ──
  if (versao === "com_gabarito" && question.explanationShort) {
    const expLines = wrap(doc, question.explanationShort, CW - 8);
    const boxH = expLines.length * 5 + 10;

    ensureSpace(doc, cur, boxH + 4);

    fill(doc, C.grayBg);
    stroke(doc, C.grayLine);
    doc.rect(M, cur.y - 1, CW, boxH, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    ink(doc, C.amber);
    doc.text("EXPLICAÇÃO", M + 4, cur.y + 4);
    cur.y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    ink(doc, C.steel);
    for (const line of expLines) {
      ensureSpace(doc, cur, 5.5);
      doc.text(line, M + 4, cur.y);
      cur.y += 5;
    }
    cur.y += 3;
    reset(doc);
  }

  // ── Blank annotation box (sem gabarito) ──
  if (versao === "sem_gabarito") {
    ensureSpace(doc, cur, 14);
    stroke(doc, C.grayLine);
    doc.rect(M, cur.y, CW, 11, "S");
    cur.y += 15;
  }

  // Separator
  cur.y += 4;
  hRule(doc, cur);
  cur.y += 2;
}

// ─── Compact answer key (sem gabarito, last page) ────────────────────────────

function buildAnswerKey(doc: jsPDF, questions: TedQuestion[]): void {
  doc.addPage();
  let y = M;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  ink(doc, C.black);
  doc.text("Gabarito", M, y);
  y += 8;

  // Horizontal rule
  stroke(doc, C.grayLine);
  doc.line(M, y, M + CW, y);
  y += 8;

  // Build rows of 5 for autoTable
  const PER_ROW = 5;
  const rows: string[][] = [];
  let row: string[] = [];

  for (let i = 0; i < questions.length; i++) {
    const ans = questions[i].correctOption ?? "—";
    row.push(`${i + 1}.  ${ans}`);
    if (row.length === PER_ROW || i === questions.length - 1) {
      while (row.length < PER_ROW) row.push("");
      rows.push(row);
      row = [];
    }
  }

  autoTable(doc, {
    startY: y,
    body: rows,
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 11,
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
      textColor: [30, 30, 30],
    },
    columnStyles: {
      0: { fontStyle: "bold" },
      1: { fontStyle: "bold" },
      2: { fontStyle: "bold" },
      3: { fontStyle: "bold" },
      4: { fontStyle: "bold" },
    },
    margin: { left: M, right: M },
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function gerarPdfSimulado(
  simulado: SimuladoSalvo,
  versao: "com_gabarito" | "sem_gabarito",
): Promise<void> {
  const questions = loadQuestions(simulado.questionIds);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const cur: Cur = { y: M };

  buildCover(
    doc,
    cur,
    simulado.nome,
    simulado.criadoEm,
    simulado.config,
    simulado.resultado,
    versao,
  );

  for (let i = 0; i < questions.length; i++) {
    await renderQuestion(doc, cur, questions[i], i, simulado.selectedAnswers, versao);
  }

  if (versao === "sem_gabarito") {
    buildAnswerKey(doc, questions);
  }

  const safeName = simulado.nome.replace(/\s+/g, "-").toLowerCase();
  doc.save(`simulado-${safeName}.pdf`);
}

export async function gerarPdfSimuladoInline(
  questions: TedQuestion[],
  selectedAnswers: Record<string, string>,
  nomeSimulado: string,
  versao: "com_gabarito" | "sem_gabarito" = "com_gabarito",
): Promise<void> {
  const correctCount = questions.filter(
    (q) => q.correctOption !== null && selectedAnswers[q.id] === q.correctOption,
  ).length;
  const scorePercent = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  const fakeConfig: SimuladoSalvo["config"] = {
    quantidade: questions.length,
    dificuldade: "mista",
    areaIds: [],
  };
  const fakeResultado: NonNullable<SimuladoSalvo["resultado"]> = {
    correctCount,
    scorePercent,
    classification: getClassLabel(scorePercent),
    finalizadoEm: new Date().toISOString(),
  };

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const cur: Cur = { y: M };

  buildCover(
    doc,
    cur,
    nomeSimulado,
    new Date().toISOString(),
    fakeConfig,
    fakeResultado,
    versao,
  );

  for (let i = 0; i < questions.length; i++) {
    await renderQuestion(doc, cur, questions[i], i, selectedAnswers, versao);
  }

  if (versao === "sem_gabarito") {
    buildAnswerKey(doc, questions);
  }

  const safeName = nomeSimulado.replace(/\s+/g, "-").toLowerCase();
  doc.save(`simulado-${safeName}.pdf`);
}
