import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizTreeLine, useEnteringLines } from "../components/QuizTreeLine";
import nb1Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB1.jpg";
import nb2Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB2.jpg";
import nb3Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB3.jpg";
import nb4Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB4.jpg";
import nb5Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB5.jpg";
import nb6Image from "../assets/Dermatites/Nodular-Difusa/Casos/Necrobiose Lipoidica/NB6.jpg";
import { CorrectAnswerBanner } from "../components/CorrectAnswerBanner";
import { Layout } from "../components/Layout";
import { QuizTransitionImageCard } from "../components/QuizTransitionImageCard";
import { useLanguage } from "../context/LanguageContext";
import { getFinalColumnNodeClass, getFinalColumnNodeStyle } from "../utils/quizFinalColumnLayout";
import { getQuizTransitionSuccessClass, type QuizTransitionSuccessSelection } from "../utils/quizTransitionSuccess";

type QuizStage = "initial" | "histiocytes" | "palisaded" | "deposit" | "diagnosis";
type NodeStatus = "default" | "path" | "correct" | "wrong";

interface TreeOption {
  id: string;
  label: { pt: string; en: string };
  isCorrect?: boolean;
}

interface TreeLine {
  id: string;
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const rootColumnOptions: TreeOption[] = [
  { id: "dermatite", label: { pt: "Dermatite", en: "Dermatitis" }, isCorrect: true },
  { id: "neoplasia", label: { pt: "Neoplasia", en: "Neoplasia" } },
  { id: "cisto", label: { pt: "Cisto", en: "Cyst" } },
  { id: "deposito", label: { pt: "Doença de depósito", en: "Deposit disease" } },
  { id: "hamartoma", label: { pt: "Hamartoma / malformação", en: "Hamartoma / malformation" } },
];

const nodularFamilyOptions: TreeOption[] = [
  { id: "perivascular", label: { pt: "Dermatites perivasculares", en: "Perivascular dermatitis" } },
  { id: "nodular", label: { pt: "Dermatites nodulares / difusas", en: "Nodular / diffuse dermatitis" }, isCorrect: true },
  { id: "vesicobolhosas", label: { pt: "Dermatites vésico-bolhosas", en: "Vesicobullous dermatitis" } },
  { id: "vasculites", label: { pt: "Vasculites", en: "Vasculitis" } },
  { id: "pustulosas", label: { pt: "Pustulosas", en: "Pustular" } },
  { id: "foliculites", label: { pt: "Foliculites / perifoliculites", en: "Folliculitis / perifolliculitis" } },
  { id: "fibrosantes", label: { pt: "Fibrosantes", en: "Fibrosing" } },
  { id: "paniculites", label: { pt: "Paniculites", en: "Panniculitis" } },
  { id: "invisiveis", label: { pt: "Dermatoses invisíveis", en: "Invisible dermatoses" } },
];

const histiocytePatternOptions: TreeOption[] = [
  { id: "linfocitos", label: { pt: "Linfócitos predominam", en: "Lymphocytes predominate" } },
  { id: "neutrofilos", label: { pt: "Neutrófilos predominam", en: "Neutrophils predominate" } },
  {
    id: "neutrofilos-poeira",
    label: {
      pt: "Neutrófilos, poeira nuclear, eosinófilos e plasmócitos",
      en: "Neutrophils, nuclear dust, eosinophils and plasma cells",
    },
  },
  { id: "eosinofilos", label: { pt: "Eosinófilos predominam", en: "Eosinophils predominate" } },
  { id: "histiocitos", label: { pt: "Histiócitos predominam", en: "Histiocytes predominate" }, isCorrect: true },
];

const granulomatousOptions: TreeOption[] = [
  { id: "sarcoidico", label: { pt: "Sarcoídico", en: "Sarcoidal" } },
  { id: "tuberculoide", label: { pt: "Tuberculoide", en: "Tuberculoid" } },
  { id: "palicada", label: { pt: "Paliçada", en: "Palisaded" }, isCorrect: true },
  { id: "intersticial", label: { pt: "Intersticial", en: "Interstitial" } },
  { id: "supurativo", label: { pt: "Supurativo", en: "Suppurative" } },
];

const depositOptions: TreeOption[] = [
  { id: "mucina", label: { pt: "Mucina", en: "Mucin" } },
  { id: "colageno-degenerado", label: { pt: "Colágeno degenerado", en: "Degenerated collagen" }, isCorrect: true },
  {
    id: "colageno-fendas",
    label: {
      pt: "Colágeno degenerado + fendas de colesterol + lipófagos",
      en: "Degenerated collagen + cholesterol clefts + lipophages",
    },
  },
  { id: "fibrina", label: { pt: "Fibrina", en: "Fibrin" } },
  { id: "outros", label: { pt: "Urato", en: "Urate" } },
];

const diagnosisOptions: TreeOption[] = [
  { id: "granuloma-anular", label: { pt: "Granuloma anular", en: "Granuloma annulare" } },
  { id: "necrobiose-lipoidica", label: { pt: "Necrobiose lipoídica", en: "Necrobiosis lipoidica" }, isCorrect: true },
  { id: "xantogranuloma", label: { pt: "Xantogranuloma necrobiótico", en: "Necrobiotic xanthogranuloma" } },
  { id: "nodulo-reumatoide", label: { pt: "Nódulo reumatoide", en: "Rheumatoid nodule" } },
  { id: "outros-granulomas", label: { pt: "Gota", en: "Gout" } },
];

const quiz2FinalColumnPairs = [
  { from: "mucina", to: "granuloma-anular" },
  { from: "colageno-degenerado", to: "necrobiose-lipoidica" },
  { from: "colageno-fendas", to: "xantogranuloma" },
  { from: "fibrina", to: "nodulo-reumatoide" },
  { from: "outros", to: "outros-granulomas" },
] as const;

export function DermatiteQuizCase2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const [stage, setStage] = useState<QuizStage>("initial");
  const [selectedSecondColumn, setSelectedSecondColumn] = useState<string | null>(null);
  const [wrongSecondColumn, setWrongSecondColumn] = useState<string | null>(null);
  const [selectedThirdColumn, setSelectedThirdColumn] = useState<string | null>(null);
  const [wrongThirdColumn, setWrongThirdColumn] = useState<string | null>(null);
  const [selectedFourthColumn, setSelectedFourthColumn] = useState<string | null>(null);
  const [wrongFourthColumn, setWrongFourthColumn] = useState<string | null>(null);
  const [selectedFifthColumn, setSelectedFifthColumn] = useState<string | null>(null);
  const [wrongFifthColumn, setWrongFifthColumn] = useState<string | null>(null);
  const [selectedDiagnosisColumn, setSelectedDiagnosisColumn] = useState<string | null>(null);
  const [wrongDiagnosisColumn, setWrongDiagnosisColumn] = useState<string | null>(null);
  const [treeLines, setTreeLines] = useState<TreeLine[]>([]);
  const [transitionSuccessSelection, setTransitionSuccessSelection] = useState<QuizTransitionSuccessSelection<QuizStage> | null>(null);
  const [transitionNoticeStage, setTransitionNoticeStage] = useState<QuizStage | null>(null);
  const showTransitionBanner = transitionNoticeStage === stage;
  const enteringIds = useEnteringLines(treeLines);

  const timeoutRef = useRef<number | null>(null);
  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const treeScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const treeNodeRefs = useRef<Record<string, HTMLDivElement | HTMLButtonElement | null>>({});
  const diagnosisColumnLayoutRef = useRef<HTMLDivElement | null>(null);
  const [diagnosisColumnLayout, setDiagnosisColumnLayout] = useState<Record<string, { top: number; height: number }>>({});

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [stage]);

  useEffect(() => {
    const nextStage = (location.state as { quizStage?: QuizStage } | null)?.quizStage;
    if (!nextStage || nextStage === stage) {
      return;
    }

    setStage(nextStage);
  }, [location.state, stage]);

  useEffect(() => {
    const scrollArea = treeScrollAreaRef.current;
    if (!scrollArea) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollArea.scrollTo({
          left: Math.max(0, scrollArea.scrollWidth - scrollArea.clientWidth),
          behavior: stage === "deposit" || stage === "diagnosis" ? "smooth" : "auto",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [stage, treeLines.length, selectedFifthColumn]);

  const diagnosisColumnHeight = useMemo(() => {
    const values = Object.values(diagnosisColumnLayout);
    if (values.length === 0) return undefined;
    return Math.max(...values.map((value) => value.top + value.height));
  }, [diagnosisColumnLayout]);

  const visibleEdges = useMemo(() => {
    if (stage === "initial") {
      return nodularFamilyOptions.map((option) => ({ from: "dermatite-root", to: option.id }));
    }

    if (stage === "histiocytes") {
      return [
        ...nodularFamilyOptions.map((option) => ({ from: "dermatite-root", to: option.id })),
        ...histiocytePatternOptions.map((option) => ({ from: "nodular-root", to: option.id })),
      ];
    }

    if (stage === "palisaded") {
      return [
        ...nodularFamilyOptions.map((option) => ({ from: "dermatite-root", to: option.id })),
        ...histiocytePatternOptions.map((option) => ({ from: "nodular-root", to: option.id })),
        ...granulomatousOptions.map((option) => ({ from: "histiocitos-root", to: option.id })),
        ...depositOptions.map((option) => ({ from: "palicada-root", to: option.id })),
      ];
    }

    if (stage === "deposit") {
      return [
        ...nodularFamilyOptions.map((option) => ({ from: "dermatite-root", to: option.id })),
        ...histiocytePatternOptions.map((option) => ({ from: "nodular-root", to: option.id })),
        ...granulomatousOptions.map((option) => ({ from: "histiocitos-root", to: option.id })),
        ...depositOptions.map((option) => ({ from: "palicada-root", to: option.id })),
        ...(selectedFifthColumn === "colageno-degenerado"
          ? [
              { from: "mucina", to: "granuloma-anular" },
              { from: "colageno-degenerado", to: "necrobiose-lipoidica" },
              { from: "colageno-fendas", to: "xantogranuloma" },
              { from: "fibrina", to: "nodulo-reumatoide" },
              { from: "outros", to: "outros-granulomas" },
            ]
          : []),
      ];
    }

    return [
      ...nodularFamilyOptions.map((option) => ({ from: "dermatite-root", to: option.id })),
      ...histiocytePatternOptions.map((option) => ({ from: "nodular-root", to: option.id })),
      ...granulomatousOptions.map((option) => ({ from: "histiocitos-root", to: option.id })),
      ...depositOptions.map((option) => ({ from: "palicada-root", to: option.id })),
      ...diagnosisOptions.map((option) => ({ from: "colageno-root", to: option.id })),
    ];
  }, [stage, selectedFifthColumn]);

  useLayoutEffect(() => {
    function measureTreeLines() {
      const container = treeContainerRef.current;
      if (!container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const nextLines = visibleEdges
        .map((edge) => {
          const fromElement = treeNodeRefs.current[edge.from];
          const toElement = treeNodeRefs.current[edge.to];
          if (!fromElement || !toElement) {
            return null;
          }

          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();

          return {
            id: `${edge.from}-${edge.to}`,
            from: edge.from,
            to: edge.to,
            x1: fromRect.right - containerRect.left,
            y1: fromRect.top - containerRect.top + fromRect.height / 2,
            x2: toRect.left - containerRect.left,
            y2: toRect.top - containerRect.top + toRect.height / 2,
          };
        })
        .filter((line): line is TreeLine => Boolean(line));

      setTreeLines(nextLines);
    }

    measureTreeLines();

    const observer = new ResizeObserver(() => measureTreeLines());
    if (treeContainerRef.current) {
      observer.observe(treeContainerRef.current);
    }

    Object.values(treeNodeRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("resize", measureTreeLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTreeLines);
    };
  }, [visibleEdges, stage]);

  useLayoutEffect(() => {
    if (!(stage === "deposit" && selectedFifthColumn === "colageno-degenerado")) {
      setDiagnosisColumnLayout({});
      return;
    }

    let frameId = 0;

    function measureDiagnosisColumnLayout() {
      const container = diagnosisColumnLayoutRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const nextLayout: Record<string, { top: number; height: number }> = {};

      quiz2FinalColumnPairs.forEach(({ from, to }) => {
        const parentElement = treeNodeRefs.current[from];
        const targetElement = treeNodeRefs.current[to];
        if (!parentElement || !targetElement) return;

        const parentRect = parentElement.getBoundingClientRect();

        nextLayout[to] = {
          top: parentRect.top - containerRect.top,
          height: parentRect.height,
        };
      });

      setDiagnosisColumnLayout(nextLayout);
    }

    measureDiagnosisColumnLayout();
    frameId = window.requestAnimationFrame(() => {
      measureDiagnosisColumnLayout();
    });

    const observer = new ResizeObserver(() => measureDiagnosisColumnLayout());
    if (diagnosisColumnLayoutRef.current) observer.observe(diagnosisColumnLayoutRef.current);
    quiz2FinalColumnPairs.forEach(({ from, to }) => {
      const sourceElement = treeNodeRefs.current[from];
      const targetElement = treeNodeRefs.current[to];
      if (sourceElement) observer.observe(sourceElement);
      if (targetElement) observer.observe(targetElement);
    });

    window.addEventListener("resize", measureDiagnosisColumnLayout);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", measureDiagnosisColumnLayout);
    };
  }, [stage, selectedFifthColumn, treeLines.length]);

  function handleSecondColumnClick(option: TreeOption) {
    setWrongSecondColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedSecondColumn(option.id);
      setTransitionSuccessSelection({ stage: "initial", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("histiocytes");
        setStage("histiocytes");
        navigate(".", { state: { quizStage: "histiocytes" } });
      }, 900);
      return;
    }

    setWrongSecondColumn(option.id);
  }

  function handleThirdColumnClick(option: TreeOption) {
    setWrongThirdColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedThirdColumn(option.id);
      setTransitionSuccessSelection({ stage: "histiocytes", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("palisaded");
        setStage("palisaded");
        navigate(".", { state: { quizStage: "palisaded" } });
      }, 900);
      return;
    }

    setWrongThirdColumn(option.id);
  }

  function handleFourthColumnClick(option: TreeOption) {
    setWrongFourthColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedFourthColumn(option.id);
      setTransitionSuccessSelection({ stage: "palisaded", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("deposit");
        setStage("deposit");
        navigate(".", { state: { quizStage: "deposit" } });
      }, 900);
      return;
    }

    setWrongFourthColumn(option.id);
  }

  function handleFifthColumnClick(option: TreeOption) {
    setWrongFifthColumn(null);

    if (option.isCorrect) {
      setSelectedFifthColumn(option.id);
      return;
    }

    setWrongFifthColumn(option.id);
  }

  function handleDiagnosisClick(option: TreeOption) {
    setWrongDiagnosisColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedDiagnosisColumn(option.id);
      setTransitionSuccessSelection({ stage, nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        navigate("/diagnostico?nodeId=dx-necrobiose-lipoidica", {
          state: { nodeId: "dx-necrobiose-lipoidica" },
        });
      }, 900);
      return;
    }

    setWrongDiagnosisColumn(option.id);
  }

  function getNodeStatus(nodeId: string): NodeStatus {
    if (stage === "initial") {
      if (selectedSecondColumn === nodeId) return "correct";
      if (wrongSecondColumn === nodeId) return "wrong";
      return "default";
    }

    if (stage === "histiocytes") {
      if (nodeId === "dermatite-root" || nodeId === "nodular-root" || selectedSecondColumn === nodeId) return "path";
      if (selectedThirdColumn === nodeId) return "correct";
      if (wrongThirdColumn === nodeId) return "wrong";
      return "default";
    }

    if (stage === "palisaded") {
      if (
        nodeId === "dermatite-root" ||
        nodeId === "nodular-root" ||
        nodeId === "histiocitos-root" ||
        selectedSecondColumn === nodeId ||
        selectedThirdColumn === nodeId
      ) {
        return "path";
      }

      if (selectedFourthColumn === nodeId) return "correct";
      if (wrongFourthColumn === nodeId) return "wrong";
      return "default";
    }

    if (stage === "deposit") {
      if (selectedFifthColumn === nodeId) return "correct";
      if (selectedDiagnosisColumn === nodeId) return "correct";
      if (wrongDiagnosisColumn === nodeId) return "wrong";
      if (wrongFifthColumn === nodeId) return "wrong";

      if (
        nodeId === "nodular-root" ||
        nodeId === "histiocitos-root" ||
        nodeId === "palicada-root" ||
        nodeId === "colageno-root" ||
        selectedSecondColumn === nodeId ||
        selectedThirdColumn === nodeId ||
        selectedFourthColumn === nodeId
      ) {
        return "path";
      }
      return "default";
    }
    return "default";
  }

  function getTreeOptionButtonClass(status: NodeStatus) {
    if (status === "correct") {
      return "border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]";
    }

    if (status === "wrong") {
      return "border-transparent bg-[linear-gradient(135deg,#ff5a6f_0%,#f54e8a_45%,#a855f7_100%)] text-white shadow-[0_16px_34px_-22px_rgba(160,45,120,0.42)]";
    }

    if (status === "path") {
      return "border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]";
    }

    return "border-[#d7c8ea] bg-white text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)] hover:border-[#cdb5eb] hover:-translate-y-0.5";
  }

  function getTreeOptionStyle(_status: NodeStatus) {
    return undefined;
  }

  function getTransitionTreeButtonClass(status: NodeStatus, nodeId: string) {
    return getQuizTransitionSuccessClass(transitionSuccessSelection, stage, nodeId, getTreeOptionButtonClass(status));
  }

  function renderImageCard(src: string, alt: string) {
    return <QuizTransitionImageCard key={alt} src={src} alt={alt} maxHeightClass="max-h-[560px]" />;
  }

  function renderArrow(status: NodeStatus) {
    const iconColor = status === "correct" || status === "path" ? "#2b8a57" : "#ff4b61";

    return (
      <span className="pointer-events-none absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[1.9rem] font-medium leading-none shadow-[0_10px_24px_-14px_rgba(5,18,11,0.35)]">
        <span style={{ color: iconColor }}>›</span>
      </span>
    );
  }

  return (
    <Layout title={isPortuguese ? "Quiz Dermatite 2" : "Dermatitis Quiz 2"} subtitle={isPortuguese ? "Quiz Dermatite 2" : "Dermatitis Quiz 2"}>
      <section className="overflow-hidden rounded-[28px] border border-sand bg-[linear-gradient(180deg,_rgba(252,250,244,0.98)_0%,_rgba(247,242,232,0.96)_100%)] shadow-panel">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {stage === "initial" ? <div className="quiz-images-row quiz-images-row--two">{[renderImageCard(nb1Image, "NB1"), renderImageCard(nb2Image, "NB2")]}</div> : null}
          {stage === "histiocytes" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}
              <div className="quiz-images-row quiz-images-row--two">
              {renderImageCard(nb3Image, "NB3")}
              <QuizTransitionImageCard src={nb6Image} alt="NB6" maxHeightClass="max-h-[560px]" />
              </div>
            </div>
          ) : null}
          {stage === "palisaded" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}
              <div className="quiz-images-row quiz-images-row--two">
                {renderImageCard(nb4Image, "NB4")}
                {renderImageCard(nb5Image, "NB5")}
                <QuizTransitionImageCard src={nb6Image} alt="NB6" maxHeightClass="max-h-[560px]" />
              </div>
            </div>
          ) : null}
          {stage === "deposit" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}
              <div className="quiz-images-row quiz-images-row--two">
                {renderImageCard(nb2Image, "NB2")}
                <QuizTransitionImageCard src={nb5Image} alt="NB5" maxHeightClass="max-h-[560px]" />
              </div>
            </div>
          ) : null}

          <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,244,0.98)_100%)] p-5 shadow-[0_26px_64px_-42px_rgba(16,30,20,0.42)]">
            <div ref={treeScrollAreaRef} className="quiz-mobile-scroll overflow-x-auto overflow-y-hidden">
              <div ref={treeContainerRef} className="quiz-tree-track quiz-tree-columns-spacious relative flex min-w-max flex-nowrap items-start">
                <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                  {treeLines.map((line) => <QuizTreeLine key={line.id} line={line} isEntering={enteringIds.has(line.id)} />)}
                </svg>

                {stage !== "deposit" && stage !== "diagnosis" ? (
                  <div className="quiz-tree-column quiz-tree-column--root-desktop quiz-tree-card relative z-10 flex shrink-0 flex-col gap-3">
                    {rootColumnOptions.map((option) =>
                      option.id === "dermatite" ? (
                        <div
                          key={option.id}
                          ref={(element) => {
                            treeNodeRefs.current["dermatite-root"] = element;
                          }}
                          className={`quiz-node-box--root relative text-left ${getTreeOptionButtonClass(stage === "initial" ? "correct" : "path")}`}
                          style={getTreeOptionStyle(stage === "initial" ? "correct" : "path")}
                        >
                          {option.label[isPortuguese ? "pt" : "en"]}
                          {renderArrow(stage === "initial" ? "correct" : "path")}
                        </div>
                      ) : (
                        <div
                          key={option.id}
                          className="quiz-node-box border border-[#eadff3] bg-white text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]"
                        >
                          {option.label[isPortuguese ? "pt" : "en"]}
                        </div>
                      ),
                    )}
                  </div>
                ) : null}

                <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-card relative z-10 flex shrink-0 flex-col gap-5">
                  {nodularFamilyOptions.map((option) => {
                    const status = stage === "initial" ? getNodeStatus(option.id) : option.id === "nodular" ? "path" : "default";
                    const isActiveCurrent = stage === "initial";

                    return (
                      <button
                        key={option.id}
                        type="button"
                        ref={(element) => {
                          treeNodeRefs.current[option.id] = element;
                          if (option.id === "nodular") {
                            treeNodeRefs.current["nodular-root"] = element;
                          }
                        }}
                        onClick={isActiveCurrent ? () => handleSecondColumnClick(option) : undefined}
                        className={`quiz-node-box relative border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                        style={getTreeOptionStyle(status)}
                        disabled={!isActiveCurrent}
                      >
                        {option.label[isPortuguese ? "pt" : "en"]}
                        {option.id === "nodular" && stage !== "initial" ? renderArrow("path") : null}
                      </button>
                    );
                  })}
                </div>

                {stage !== "initial" ? (
                  <div className="quiz-tree-column quiz-tree-column--wide-desktop quiz-tree-card quiz-tree-column-enter relative z-10 flex shrink-0 flex-col gap-5">
                    {histiocytePatternOptions.map((option) => {
                      const status = stage === "histiocytes" ? getNodeStatus(option.id) : option.id === "histiocitos" ? "path" : "default";
                      const isActiveCurrent = stage === "histiocytes";

                      return (
                        <button
                          key={option.id}
                          type="button"
                          ref={(element) => {
                            treeNodeRefs.current[option.id] = element;
                            if (option.id === "histiocitos") {
                              treeNodeRefs.current["histiocitos-root"] = element;
                            }
                          }}
                          onClick={isActiveCurrent ? () => handleThirdColumnClick(option) : undefined}
                          className={`quiz-node-box relative border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                          style={getTreeOptionStyle(status)}
                          disabled={!isActiveCurrent}
                        >
                          {option.label[isPortuguese ? "pt" : "en"]}
                          {option.id === "histiocitos" && (stage === "palisaded" || stage === "deposit" || stage === "diagnosis") ? renderArrow("path") : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {stage === "palisaded" || stage === "deposit" || stage === "diagnosis" ? (
                  <div className="quiz-tree-column quiz-tree-column--mid-desktop quiz-tree-card quiz-tree-column-enter relative z-10 flex shrink-0 flex-col gap-5">
                    {granulomatousOptions.map((option) => {
                      const status = stage === "palisaded" ? getNodeStatus(option.id) : option.id === "palicada" ? "path" : "default";
                      const isActiveCurrent = stage === "palisaded";

                      return (
                        <button
                          key={option.id}
                          type="button"
                          ref={(element) => {
                            treeNodeRefs.current[option.id] = element;
                            if (option.id === "palicada") {
                              treeNodeRefs.current["palicada-root"] = element;
                            }
                          }}
                          onClick={isActiveCurrent ? () => handleFourthColumnClick(option) : undefined}
                          className={`quiz-node-box relative border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                          style={getTreeOptionStyle(status)}
                          disabled={!isActiveCurrent}
                        >
                          {option.label[isPortuguese ? "pt" : "en"]}
                          {option.id === "palicada" && (stage === "deposit" || stage === "diagnosis") ? renderArrow("path") : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {stage === "deposit" || stage === "diagnosis" ? (
                  <div className="quiz-tree-column quiz-tree-column--wide-desktop quiz-tree-card quiz-tree-column-enter relative z-10 flex shrink-0 flex-col gap-5">
                    {depositOptions.map((option) => {
                      const status = getNodeStatus(option.id);

                      return (
                        <button
                          key={option.id}
                          type="button"
                          ref={(element) => {
                            treeNodeRefs.current[option.id] = element;
                            if (option.id === "colageno-degenerado") {
                              treeNodeRefs.current["colageno-root"] = element;
                            }
                          }}
                          onClick={stage === "deposit" ? () => handleFifthColumnClick(option) : undefined}
                          className={`quiz-node-box relative border text-left transition duration-200 ${getTreeOptionButtonClass(status)}`}
                          style={getTreeOptionStyle(status)}
                          disabled={stage !== "deposit"}
                        >
                          {option.label[isPortuguese ? "pt" : "en"]}
                          {option.id === "colageno-degenerado" && selectedFifthColumn === "colageno-degenerado" ? renderArrow("path") : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {stage === "deposit" && selectedFifthColumn === "colageno-degenerado" ? (
                  <div className="quiz-tree-column quiz-tree-column--narrow-desktop quiz-tree-column--narrow quiz-tree-card quiz-tree-column-enter relative z-10 shrink-0 self-start">
                    <div
                      ref={diagnosisColumnLayoutRef}
                      className="relative"
                      style={diagnosisColumnHeight ? { height: `${diagnosisColumnHeight}px` } : undefined}
                    >
                      {diagnosisOptions.map((option) => {
                        const status = getNodeStatus(option.id);
                        const layout = diagnosisColumnLayout[option.id];

                        return (
                          <button
                            key={option.id}
                            type="button"
                            ref={(element) => {
                              treeNodeRefs.current[option.id] = element;
                            }}
                            onClick={() => handleDiagnosisClick(option)}
                            className={getFinalColumnNodeClass(
                              `quiz-node-box--compact border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`,
                              layout,
                            )}
                            style={getFinalColumnNodeStyle(getTreeOptionStyle(status), layout)}
                          >
                            {option.label[isPortuguese ? "pt" : "en"]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

