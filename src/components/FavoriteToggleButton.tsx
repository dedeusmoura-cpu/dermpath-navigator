import { useLanguage } from "../context/LanguageContext";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteToggleButtonProps {
  nodeId: string;
  favorite?: boolean;
  onToggleFavorite?: (nodeId: string) => void;
  className?: string;
}

export function FavoriteToggleButton({
  nodeId,
  favorite: favoriteProp,
  onToggleFavorite,
  className = "",
}: FavoriteToggleButtonProps) {
  const { tx } = useLanguage();
  const favorites = useFavorites();
  const favorite = favoriteProp ?? favorites.isFavorite(nodeId);
  const toggle = onToggleFavorite ?? favorites.toggleFavorite;

  return (
    <button
      type="button"
      onClick={() => toggle(nodeId)}
      aria-label={favorite ? tx("Favorito") : tx("Favoritar")}
      aria-pressed={favorite}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-ink shadow-panel transition hover:bg-[#fff7e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 ${className}`.trim()}
    >
      <StarIcon filled={favorite} />
    </button>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="m12 3.8 2.56 5.18 5.72.83-4.14 4.04.98 5.7L12 16.84 6.88 19.55l.98-5.7L3.72 9.81l5.72-.83L12 3.8Z"
        fill={filled ? "#facc15" : "none"}
        stroke={filled ? "#facc15" : "currentColor"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
