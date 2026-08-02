interface TomeNotaIconProps {
  compact?: boolean;
}

export function TomeNotaIcon({ compact = false }: TomeNotaIconProps) {
  return (
    <span
      className={`relative flex flex-none items-center justify-center rounded-md border border-[#e5c96e] bg-[linear-gradient(145deg,#fff7cf,#f9e8a5)] shadow-[0_10px_16px_rgba(73,61,24,0.22)] ${
        compact ? "h-[4.75rem] w-[4.5rem]" : "h-[4.75rem] w-[4.5rem] sm:h-[6.4rem] sm:w-24"
      }`}
    >
      <span className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-3 border border-[#ddc47c]/70 bg-[#f4e2b3]/90 shadow-sm sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#16356f] sm:h-14 sm:w-14" fill="none" aria-hidden="true">
        <path
          d="M12 3a6 6 0 0 0-3.5 10.9c.6.44 1 1.1 1 1.9v.7h5v-.7c0-.8.4-1.46 1-1.9A6 6 0 0 0 12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 19h4M10.5 21h3M12 7v4M9.5 9.5l2.5 1.5 2.5-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
