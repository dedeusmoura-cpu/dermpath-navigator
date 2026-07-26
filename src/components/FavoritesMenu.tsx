import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useFavorites } from "../hooks/useFavorites";
import { FavoritesDrawer } from "./FavoritesDrawer";

interface FavoritesMenuProps {
  tone?: "navy" | "light";
  compact?: boolean;
}

export function FavoritesMenu({ tone = "navy", compact = false }: FavoritesMenuProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function closeDialog() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  const isNavy = tone === "navy";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 ${
          isNavy
            ? "border-white/20 bg-white/[0.06] text-white/75 hover:border-[#d6b766]/55 hover:bg-white/[0.11] hover:text-white focus-visible:ring-[#d6b766]"
            : "border-sand bg-white/95 text-steel shadow-sm hover:bg-white hover:text-accent focus-visible:ring-accent/50"
        }`}
      >
        <StarIcon />
        <span className={compact ? "hidden xl:inline" : "hidden sm:inline"}>{t("favorites_kicker")}</span>
        {favorites.length > 0 ? (
          <span className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${isNavy ? "bg-[#d6b766] text-[#082d5c]" : "bg-[#082d5c] text-white"}`}>
            {favorites.length}
          </span>
        ) : null}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061a34]/60 p-4 backdrop-blur-sm"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDialog();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="favorites-dialog-title"
                className="relative max-h-[min(760px,calc(100vh-2rem))] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-[0_32px_90px_-28px_rgba(3,20,43,0.65)]"
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeDialog}
                  aria-label={t("favorites_close")}
                  className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-white text-steel shadow-sm transition hover:bg-paper hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <CloseIcon />
                </button>
                <div id="favorites-dialog-title" className="sr-only">{t("favorites_title")}</div>
                <FavoritesDrawer
                  favorites={favorites}
                  onOpenNode={(nodeId) => {
                    setOpen(false);
                    navigate(`/diagnostico?nodeId=${nodeId}`);
                  }}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3.8 2.56 5.18 5.72.83-4.14 4.04.98 5.7L12 16.84 6.88 19.55l.98-5.7L3.72 9.81l5.72-.83L12 3.8Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
