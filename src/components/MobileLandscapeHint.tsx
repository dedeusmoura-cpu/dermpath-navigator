import { useEffect, useMemo, useState } from "react";

const QUIZ_LANDSCAPE_HINT_KEY = "quiz-landscape-hint-seen";

interface MobileLandscapeHintProps {
  active: boolean;
  message: string;
}

export function MobileLandscapeHint({ active, message }: MobileLandscapeHintProps) {
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    return coarsePointer || window.innerWidth <= 1024;
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active || !isMobile || typeof window === "undefined") {
      setIsVisible(false);
      return;
    }

    const alreadySeen = window.sessionStorage.getItem(QUIZ_LANDSCAPE_HINT_KEY) === "true";
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (alreadySeen || !isPortrait) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    window.sessionStorage.setItem(QUIZ_LANDSCAPE_HINT_KEY, "true");

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [active, isMobile]);

  useEffect(() => {
    if (!isVisible || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const hideOverlay = () => setIsVisible(false);

    mediaQuery.addEventListener("change", hideOverlay);
    return () => {
      mediaQuery.removeEventListener("change", hideOverlay);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,27,43,0.52)] px-6 backdrop-blur-[3px] md:hidden"
      role="presentation"
      onClick={() => setIsVisible(false)}
    >
      <div className="flex w-full max-w-[320px] items-center gap-4 rounded-[28px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(248,244,255,0.95)_100%)] px-5 py-5 shadow-[0_32px_80px_-36px_rgba(20,27,43,0.9)]">
        <div className="mobile-landscape-hint-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#6610d9_0%,#b01feb_48%,#ff5ccf_100%)] shadow-[0_18px_30px_-20px_rgba(118,30,194,0.8)]">
          <div className="mobile-landscape-hint-phone relative h-7 w-12 rounded-[0.8rem] border-[2.5px] border-white" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-6 text-ink">{message}</p>
        </div>
      </div>
    </div>
  );
}
