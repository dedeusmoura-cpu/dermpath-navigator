import { useEffect, useRef, useState } from "react";

export interface QuizLineData {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface QuizTreeLineProps {
  line: QuizLineData;
  isEntering: boolean;
}

export function QuizTreeLine({ line, isEntering }: QuizTreeLineProps) {
  const strokeColor = "rgba(78, 191, 114, 0.44)";
  const circleRadius = 3;
  const circleGap = 18;
  const circleX = line.x2 - circleGap;
  const pathEndX = circleX - circleRadius - 1.5;
  const horizontalSpan = Math.max(pathEndX - line.x1, 24);
  const controlOffset = Math.max(14, Math.min(44, horizontalSpan * 0.42));
  const d = `M ${line.x1} ${line.y1} C ${line.x1 + controlOffset} ${line.y1}, ${pathEndX - controlOffset} ${line.y2}, ${pathEndX} ${line.y2}`;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.1"
        strokeLinecap="round"
        className={isEntering ? "quiz-tree-line-base--enter" : undefined}
        pathLength={isEntering ? 1 : undefined}
      />
      {isEntering ? (
        <path
          className="quiz-tree-line-pulse"
          d={d}
          fill="none"
          stroke="rgba(72, 220, 110, 0.92)"
          strokeWidth="3.8"
          strokeLinecap="round"
          pathLength={1}
          style={{ filter: "drop-shadow(0 0 4px rgba(50, 200, 90, 0.85))" }}
        />
      ) : null}
      <circle cx={circleX} cy={line.y2} r={circleRadius} fill="white" stroke={strokeColor} strokeWidth="1.7" />
    </g>
  );
}

export function useEnteringLines(lines: ReadonlyArray<{ id: string }>) {
  const [enteringIds, setEnteringIds] = useState<ReadonlySet<string>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const prevIdsRef = useRef<ReadonlySet<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const currentIds = new Set(lines.map((l) => l.id));

    if (prefersReducedMotion) {
      prevIdsRef.current = currentIds;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setEnteringIds(new Set());
      return;
    }

    const newIds = new Set<string>();
    currentIds.forEach((id) => {
      if (!prevIdsRef.current.has(id)) newIds.add(id);
    });
    prevIdsRef.current = currentIds;

    if (newIds.size === 0) return;

    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setEnteringIds(newIds);
    timerRef.current = window.setTimeout(() => {
      setEnteringIds(new Set());
      timerRef.current = null;
    }, 850);
  }, [lines, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  return enteringIds;
}
