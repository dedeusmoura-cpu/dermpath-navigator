import { useEffect, useMemo, useState } from "react";
import { algorithmTree } from "../data/algorithm";
import type { AlgorithmNode } from "../types/algorithm";

const STORAGE_KEY = "dr-ai-ackerman-favorites";
const FAVORITES_CHANGED_EVENT = "dermpath-favorites-changed";

function readFavoriteIds() {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readFavoriteIds);

  useEffect(() => {
    function syncFavorites() {
      setFavoriteIds(readFavoriteIds());
    }

    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    };
  }, []);

  const favorites = useMemo<AlgorithmNode[]>(
    () => favoriteIds.map((id) => algorithmTree.nodes[id]).filter(Boolean),
    [favoriteIds],
  );

  function toggleFavorite(nodeId: string) {
    setFavoriteIds((current) => {
      const next = current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      queueMicrotask(() => window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT)));
      return next;
    });
  }

  function isFavorite(nodeId: string) {
    return favoriteIds.includes(nodeId);
  }

  return { favorites, toggleFavorite, isFavorite };
}
