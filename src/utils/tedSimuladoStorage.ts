import type { SimuladoSalvo } from "../types/tedSimulado";

const STORAGE_KEY = "dermpath-navigator:simulados-salvos";
const MAX_SIMULADOS = 30;

function readAll(): SimuladoSalvo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SimuladoSalvo[];
  } catch {
    return [];
  }
}

function writeAll(simulados: SimuladoSalvo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(simulados));
}

export function listarSimulados(): SimuladoSalvo[] {
  return readAll().sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function salvarSimulado(simulado: SimuladoSalvo): void {
  const all = readAll();
  const existingIndex = all.findIndex((s) => s.id === simulado.id);
  if (existingIndex >= 0) {
    all[existingIndex] = simulado;
  } else {
    if (all.length >= MAX_SIMULADOS) {
      throw new Error(
        "Limite de 30 simulados salvos atingido. Exclua um simulado antes de criar um novo.",
      );
    }
    all.push(simulado);
  }
  writeAll(all);
}

export function excluirSimulado(id: string): void {
  writeAll(readAll().filter((s) => s.id !== id));
}

export function buscarSimulado(id: string): SimuladoSalvo | null {
  return readAll().find((s) => s.id === id) ?? null;
}
