import { useEffect, useMemo, useState } from "react";
import { algorithmTree } from "../data/algorithm";
import type { AlgorithmNode } from "../types/algorithm";

const STORAGE_KEY = "dr-ai-ackerman-favorites";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as string[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favorites = useMemo<AlgorithmNode[]>(
    () => favoriteIds.map((id) => algorithmTree.nodes[id]).filter(Boolean),
    [favoriteIds],
  );

  function toggleFavorite(nodeId: string) {
    setFavoriteIds((current) =>
      current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId],
    );
  }

  function isFavorite(nodeId: string) {
    return favoriteIds.includes(nodeId);
  }

  return { favorites, toggleFavorite, isFavorite };
}
