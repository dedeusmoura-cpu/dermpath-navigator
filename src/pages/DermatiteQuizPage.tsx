import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import pk1Image from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Poroceratose/PK1.jpg";
import pk2Image from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Poroceratose/PK2.jpg";
import pk3Image from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Poroceratose/PK3.jpg";
import pk4Image from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Poroceratose/PK4.jpg";
import pk5Image from "../assets/Dermatites/Perivasculares/Interface/liquenoide/Poroceratose/PK5.jpg";
import { CorrectAnswerBanner } from "../components/CorrectAnswerBanner";
import { Layout } from "../components/Layout";
import { QuizTransitionImageCard } from "../components/QuizTransitionImageCard";
import { useLanguage } from "../context/LanguageContext";
import { getFinalColumnNodeClass, getFinalColumnNodeStyle } from "../utils/quizFinalColumnLayout";
import { getQuizTransitionSuccessClass, type QuizTransitionSuccessSelection, quizTransitionSuccessButtonClass } from "../utils/quizTransitionSuccess";

type QuizStage = "initial-question" | "interface-question" | "final-images" | "final-pk5";
type QuizAnswerState = "idle" | "correct" | "wrong";
type TreeNodeStatus = "default" | "correct" | "wrong";

interface QuizOption {
  id: string;
  label: { pt: string; en: string };
  isCorrect?: boolean;
}

interface QuizLeftColumnItem {
  id: string;
  label: { pt: string; en: string };
  isPrimary?: boolean;
}

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

const initialQuizOptions: QuizOption[] = [
  { id: "perivascular", label: { pt: "Dermatites perivasculares", en: "Perivascular dermatitis" }, isCorrect: true },
  { id: "nodular", label: { pt: "Dermatites nodulares / difusas", en: "Nodular / diffuse dermatitis" } },
  { id: "vesicobullous", label: { pt: "Dermatites vésico-bolhosas", en: "Vesicobullous dermatitis" } },
  { id: "vasculitis", label: { pt: "Vasculites", en: "Vasculitis" } },
  { id: "pustular", label: { pt: "Pustulosas", en: "Pustular" } },
  { id: "folliculitis", label: { pt: "Foliculites / perifoliculites", en: "Folliculitis / perifolliculitis" } },
  { id: "fibrosing", label: { pt: "Fibrosantes", en: "Fibrosing" } },
];

const leftColumnItems: QuizLeftColumnItem[] = [
  { id: "dermatitis", label: { pt: "Dermatite", en: "Dermatitis" }, isPrimary: true },
  { id: "neoplasia", label: { pt: "Neoplasia", en: "Neoplasia" } },
  { id: "cyst", label: { pt: "Cisto", en: "Cyst" } },
  { id: "deposit", label: { pt: "Doença de depósito", en: "Deposit disease" } },
  { id: "hamartoma", label: { pt: "Hamartoma / malformação", en: "Hamartoma / malformation" } },
];

const secondColumnOptions: TreeOption[] = [
  { id: "perivascular", label: { pt: "Dermatites perivasculares", en: "Perivascular dermatitis" }, isCorrect: true },
  { id: "nodular", label: { pt: "Dermatites nodulares / difusas", en: "Nodular / diffuse dermatitis" } },
  { id: "vesicobullous", label: { pt: "Dermatites vésico-bolhosas", en: "Vesicobullous dermatitis" } },
  { id: "vasculitis", label: { pt: "Vasculites", en: "Vasculitis" } },
  { id: "pustular", label: { pt: "Pustulosas", en: "Pustular" } },
  { id: "folliculitis", label: { pt: "Foliculites / perifoliculites", en: "Folliculitis / perifolliculitis" } },
  { id: "fibrosing", label: { pt: "Fibrosantes", en: "Fibrosing" } },
];

const thirdColumnOptions: TreeOption[] = [
  { id: "no-epidermal-change", label: { pt: "Sem alteração epidérmica", en: "No epidermal change" } },
  { id: "interface", label: { pt: "Interface", en: "Interface" }, isCorrect: true },
  { id: "ballooning", label: { pt: "Balonizante", en: "Ballooning" } },
  { id: "spongiotic", label: { pt: "Espongiótica", en: "Spongiotic" } },
  { id: "psoriasiform", label: { pt: "Psoriasiforme", en: "Psoriasiform" } },
];

const fourthColumnOptions: TreeOption[] = [
  { id: "vacuolar", label: { pt: "Vacuolar", en: "Vacuolar" } },
  { id: "lichenoid", label: { pt: "Liquenoide", en: "Lichenoid" }, isCorrect: true },
];

const fifthColumnOptions: TreeOption[] = [
  { id: "lymphocytes-predominate", label: { pt: "Linfócitos predominam", en: "Lymphocytes predominate" }, isCorrect: true },
  { id: "histiocytes-predominate", label: { pt: "Histiocitos predominam", en: "Histiocytes predominate" } },
  { id: "langerhans-predominate", label: { pt: "Células de Langerhans predominam", en: "Langerhans cells predominate" } },
];

const sixthColumnOptions: TreeOption[] = [
  {
    id: "irregular-hyperplasia",
    label: {
      pt: "Hiperplasia epidérmica irregular serrilhada, hipergranulose em cunha, ortoceratose compacta",
      en: "Irregular sawtooth epidermal hyperplasia, wedge hypergranulosis, compact orthokeratosis",
    },
  },
  {
    id: "eosinophils-focal",
    label: {
      pt: "Eosinófilos às vezes, epiderme focalmente afinada, paraceratose focal",
      en: "Occasional eosinophils, focally thinned epidermis, focal parakeratosis",
    },
  },
  {
    id: "eccrine-lymphocytes",
    label: {
      pt: "Linfócitos ao longo de glândulas écrinas na derme reticular, queratinócitos necróticos individuais",
      en: "Lymphocytes along eccrine glands in the reticular dermis, individual necrotic keratinocytes",
    },
  },
  { id: "extravasated-rbc", label: { pt: "Hemácias extravasadas e/ou siderófagos", en: "Extravasated red blood cells and/or siderophages" } },
  {
    id: "necrotic-keratinocytes",
    label: {
      pt: "Queratinócitos necróticos, paraceratose focal, resíduo de lentigo solar às vezes",
      en: "Necrotic keratinocytes, focal parakeratosis, residual solar lentigo sometimes",
    },
  },
  { id: "cornoid-lamella", label: { pt: "Lamela cornoide", en: "Cornoid lamella" }, isCorrect: true },
];

const seventhColumnOptions: TreeOption[] = [
  { id: "lichen-planus", label: { pt: "Líquen plano", en: "Lichen planus" } },
  {
    id: "drug-photodermatitis",
    label: { pt: "Líquen plano-símile por droga / Fotodermatite liquenoide", en: "Drug-induced lichen planus-like eruption / Lichenoid photodermatitis" },
  },
  { id: "lichen-striatus", label: { pt: "Líquen estriado", en: "Lichen striatus" } },
  { id: "gougerot-blum", label: { pt: "Púrpura liquenoide de Gougerot e Blum", en: "Gougerot-Blum lichenoid purpura" } },
  { id: "lichen-keratosis", label: { pt: "Ceratose liquenoide benigna", en: "Benign lichenoid keratosis" } },
  { id: "porokeratosis", label: { pt: "Poroceratose", en: "Porokeratosis" }, isCorrect: true },
];

const quiz1FinalColumnPairs = [
  { from: "irregular-hyperplasia", to: "lichen-planus" },
  { from: "eosinophils-focal", to: "drug-photodermatitis" },
  { from: "eccrine-lymphocytes", to: "lichen-striatus" },
  { from: "extravasated-rbc", to: "gougerot-blum" },
  { from: "necrotic-keratinocytes", to: "lichen-keratosis" },
  { from: "cornoid-lamella", to: "porokeratosis" },
] as const;

export function DermatiteQuizPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const [stage, setStage] = useState<QuizStage>("initial-question");
  const [initialSelectedId, setInitialSelectedId] = useState<string | null>(null);
  const [initialAnswerState, setInitialAnswerState] = useState<QuizAnswerState>("idle");

  const [selectedSecondColumn, setSelectedSecondColumn] = useState<string | null>("perivascular");
  const [selectedThirdColumn, setSelectedThirdColumn] = useState<string | null>(null);
  const [selectedFourthColumn, setSelectedFourthColumn] = useState<string | null>(null);
  const [wrongSecondColumn, setWrongSecondColumn] = useState<string | null>(null);
  const [wrongThirdColumn, setWrongThirdColumn] = useState<string | null>(null);
  const [wrongFourthColumn, setWrongFourthColumn] = useState<string | null>(null);
  const [treeLines, setTreeLines] = useState<TreeLine[]>([]);
  const [selectedFifthColumn, setSelectedFifthColumn] = useState<string | null>(null);
  const [selectedSixthColumn, setSelectedSixthColumn] = useState<string | null>(null);
  const [wrongFifthColumn, setWrongFifthColumn] = useState<string | null>(null);
  const [wrongSixthColumn, setWrongSixthColumn] = useState<string | null>(null);
  const [selectedSeventhColumn, setSelectedSeventhColumn] = useState<string | null>(null);
  const [wrongSeventhColumn, setWrongSeventhColumn] = useState<string | null>(null);
  const [finalTreeLines, setFinalTreeLines] = useState<TreeLine[]>([]);
  const [transitionSuccessSelection, setTransitionSuccessSelection] = useState<QuizTransitionSuccessSelection<QuizStage> | null>(null);
  const [transitionNoticeStage, setTransitionNoticeStage] = useState<QuizStage | null>(null);

  const timeoutRef = useRef<number | null>(null);
  const initialConnectorAreaRef = useRef<HTMLDivElement | null>(null);
  const initialSourceCardRef = useRef<HTMLButtonElement | null>(null);
  const initialOptionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const initialLinesRef = useRef<TreeLine[]>([]);

  const treeContainerRef = useRef<HTMLDivElement | null>(null);
  const treeScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const treeNodeRefs = useRef<Record<string, HTMLDivElement | HTMLButtonElement | null>>({});
  const fourthColumnRef = useRef<HTMLDivElement | null>(null);
  const finalTreeContainerRef = useRef<HTMLDivElement | null>(null);
  const finalTreeScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const finalTreeNodeRefs = useRef<Record<string, HTMLDivElement | HTMLButtonElement | null>>({});
  const sixthColumnRef = useRef<HTMLDivElement | null>(null);
  const seventhColumnRef = useRef<HTMLDivElement | null>(null);
  const seventhColumnLayoutRef = useRef<HTMLDivElement | null>(null);
  const [seventhColumnLayout, setSeventhColumnLayout] = useState<Record<string, { top: number; height: number }>>({});

  const showFourthColumn = selectedThirdColumn === "interface";
  const showSixthColumn = selectedFifthColumn === "lymphocytes-predominate";
  const showSeventhColumn = stage === "final-pk5" && selectedSixthColumn === "cornoid-lamella";
  const showTransitionBanner = transitionNoticeStage === stage;

  const visibleTreeEdges = useMemo(() => {
    const edges = secondColumnOptions.map((option) => ({ from: "dermatitis-root", to: option.id }));

    if (selectedSecondColumn === "perivascular") {
      edges.push(...thirdColumnOptions.map((option) => ({ from: "perivascular", to: option.id })));
    }

    if (showFourthColumn) {
      edges.push(...fourthColumnOptions.map((option) => ({ from: "interface", to: option.id })));
    }

    return edges;
  }, [selectedSecondColumn, showFourthColumn]);

  const finalVisibleTreeEdges = useMemo(() => {
    const edges = fourthColumnOptions.map((option) => ({ from: "interface-root", to: option.id }));
    edges.push(...fifthColumnOptions.map((option) => ({ from: "lichenoid-root", to: option.id })));

    if (showSixthColumn) {
      edges.push(...sixthColumnOptions.map((option) => ({ from: "lymphocytes-root", to: option.id })));
    }

    if (showSeventhColumn) {
      edges.push(...quiz1FinalColumnPairs);
    }

    return edges;
  }, [showSeventhColumn, showSixthColumn]);

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
    if (stage !== "interface-question") return;

    const scrollArea = treeScrollAreaRef.current;
    if (!scrollArea) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollArea.scrollTo({
          left: scrollArea.scrollWidth - scrollArea.clientWidth,
          behavior: "auto",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [stage, visibleTreeEdges.length, selectedSecondColumn, selectedThirdColumn]);

  useEffect(() => {
    if (stage !== "final-images" && stage !== "final-pk5") return;

    const scrollArea = finalTreeScrollAreaRef.current;
    if (!scrollArea) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollArea.scrollTo({
          left: scrollArea.scrollWidth - scrollArea.clientWidth,
          behavior: "auto",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [stage, finalVisibleTreeEdges.length, selectedFifthColumn, selectedSixthColumn, selectedSeventhColumn]);

  const seventhColumnHeight = useMemo(() => {
    const values = Object.values(seventhColumnLayout);
    if (values.length === 0) return undefined;
    return Math.max(...values.map((value) => value.top + value.height));
  }, [seventhColumnLayout]);

  useLayoutEffect(() => {
    if (stage !== "initial-question") {
      initialLinesRef.current = [];
      return;
    }

    function measureInitialLines() {
      const connectorArea = initialConnectorAreaRef.current;
      const sourceCard = initialSourceCardRef.current;
      if (!connectorArea || !sourceCard) return;

      const connectorRect = connectorArea.getBoundingClientRect();
      const sourceRect = sourceCard.getBoundingClientRect();
      const sourceX = sourceRect.right - connectorRect.left;
      const sourceY = sourceRect.top - connectorRect.top + sourceRect.height / 2;

      initialLinesRef.current = initialQuizOptions
        .map((option) => {
          const optionElement = initialOptionRefs.current[option.id];
          if (!optionElement) return null;

          const optionRect = optionElement.getBoundingClientRect();
          return {
            id: option.id,
            from: "dermatitis-root",
            to: option.id,
            x1: sourceX,
            y1: sourceY,
            x2: optionRect.left - connectorRect.left,
            y2: optionRect.top - connectorRect.top + optionRect.height / 2,
          };
        })
        .filter((line): line is TreeLine => Boolean(line));

      setTreeLines(initialLinesRef.current);
    }

    measureInitialLines();

    const observer = new ResizeObserver(() => measureInitialLines());
    if (initialConnectorAreaRef.current) observer.observe(initialConnectorAreaRef.current);
    if (initialSourceCardRef.current) observer.observe(initialSourceCardRef.current);
    Object.values(initialOptionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measureInitialLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureInitialLines);
    };
  }, [stage]);

  useLayoutEffect(() => {
    if (stage !== "interface-question") {
      return;
    }

    function measureTreeLines() {
      const container = treeContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const nextLines = visibleTreeEdges
        .map((edge) => {
          const fromElement = treeNodeRefs.current[edge.from];
          const toElement = treeNodeRefs.current[edge.to];
          if (!fromElement || !toElement) return null;

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
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measureTreeLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTreeLines);
    };
  }, [stage, visibleTreeEdges]);

  useLayoutEffect(() => {
    if (stage !== "final-images" && stage !== "final-pk5") {
      return;
    }

    function measureFinalTreeLines() {
      const container = finalTreeContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const nextLines = finalVisibleTreeEdges
        .map((edge) => {
          const fromElement = finalTreeNodeRefs.current[edge.from];
          const toElement = finalTreeNodeRefs.current[edge.to];
          if (!fromElement || !toElement) return null;

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

      setFinalTreeLines(nextLines);
    }

    measureFinalTreeLines();

    const observer = new ResizeObserver(() => measureFinalTreeLines());
    if (finalTreeContainerRef.current) {
      observer.observe(finalTreeContainerRef.current);
    }
    Object.values(finalTreeNodeRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measureFinalTreeLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureFinalTreeLines);
    };
  }, [stage, finalVisibleTreeEdges]);

  useLayoutEffect(() => {
    if (!showSeventhColumn) {
      setSeventhColumnLayout({});
      return;
    }

    function measureSeventhColumnLayout() {
      const container = seventhColumnLayoutRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const nextLayout: Record<string, { top: number; height: number }> = {};

      quiz1FinalColumnPairs.forEach(({ from, to }) => {
        const parentElement = finalTreeNodeRefs.current[from];
        if (!parentElement) return;

        const parentRect = parentElement.getBoundingClientRect();
        nextLayout[to] = {
          top: parentRect.top - containerRect.top,
          height: parentRect.height,
        };
      });

      setSeventhColumnLayout(nextLayout);
    }

    measureSeventhColumnLayout();

    const observer = new ResizeObserver(() => measureSeventhColumnLayout());
    if (seventhColumnLayoutRef.current) observer.observe(seventhColumnLayoutRef.current);
    quiz1FinalColumnPairs.forEach(({ from }) => {
      const element = finalTreeNodeRefs.current[from];
      if (element) observer.observe(element);
    });

    window.addEventListener("resize", measureSeventhColumnLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureSeventhColumnLayout);
    };
  }, [showSeventhColumn, stage, finalTreeLines.length]);

  function handleInitialOptionClick(option: QuizOption) {
    if (initialAnswerState === "correct") return;

    setInitialSelectedId(option.id);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setInitialAnswerState("correct");
      setTransitionSuccessSelection({ stage: "initial-question", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("interface-question");
        setSelectedSecondColumn("perivascular");
        setSelectedThirdColumn(null);
        setSelectedFourthColumn(null);
        setWrongSecondColumn(null);
        setWrongThirdColumn(null);
        setWrongFourthColumn(null);
        setStage("interface-question");
      }, 900);
      return;
    }

    setInitialAnswerState("wrong");
  }

  function handleInitialPrimaryClick() {
    const correctInitialOption = initialQuizOptions.find((option) => option.isCorrect);
    if (!correctInitialOption) return;
    handleInitialOptionClick(correctInitialOption);
  }

  function handleSecondColumnClick(option: TreeOption) {
    setWrongSecondColumn(null);

    if (option.isCorrect) {
      setSelectedSecondColumn(option.id);
      setSelectedThirdColumn(null);
      setSelectedFourthColumn(null);
      setWrongThirdColumn(null);
      setWrongFourthColumn(null);
      return;
    }

    setWrongSecondColumn(option.id);
  }

  function handleThirdColumnClick(option: TreeOption) {
    if (selectedSecondColumn !== "perivascular") return;

    setWrongThirdColumn(null);

    if (option.isCorrect) {
      setSelectedThirdColumn(option.id);
      setSelectedFourthColumn(null);
      setWrongFourthColumn(null);
      return;
    }

    setWrongThirdColumn(option.id);
  }

  function handleFourthColumnClick(option: TreeOption) {
    if (!showFourthColumn) return;

    setWrongFourthColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedFourthColumn(option.id);
      setTransitionSuccessSelection({ stage: "interface-question", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("final-images");
        setSelectedFifthColumn(null);
        setSelectedSixthColumn(null);
        setSelectedSeventhColumn(null);
        setWrongFifthColumn(null);
        setWrongSixthColumn(null);
        setWrongSeventhColumn(null);
        setStage("final-images");
      }, 900);
      return;
    }

    setWrongFourthColumn(option.id);
  }

  function handleFifthColumnClick(option: TreeOption) {
    setWrongFifthColumn(null);

    if (option.isCorrect) {
      setSelectedFifthColumn(option.id);
      setSelectedSixthColumn(null);
      setSelectedSeventhColumn(null);
      setWrongSixthColumn(null);
      setWrongSeventhColumn(null);
      return;
    }

    setWrongFifthColumn(option.id);
  }

  function handleSixthColumnClick(option: TreeOption) {
    if (!showSixthColumn) return;

    setWrongSixthColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedSixthColumn(option.id);

      if (stage === "final-pk5") {
        setSelectedSeventhColumn(null);
        setWrongSeventhColumn(null);
        return;
      }

      setTransitionSuccessSelection({ stage: "final-images", nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        setTransitionNoticeStage("final-pk5");
        setSelectedFifthColumn("lymphocytes-predominate");
        setSelectedSixthColumn("cornoid-lamella");
        setSelectedSeventhColumn(null);
        setWrongFifthColumn(null);
        setWrongSixthColumn(null);
        setWrongSeventhColumn(null);
        setStage("final-pk5");
      }, 900);
      return;
    }

    setWrongSixthColumn(option.id);
  }

  function handleSeventhColumnClick(option: TreeOption) {
    if (!showSeventhColumn) return;

    setWrongSeventhColumn(null);
    setTransitionSuccessSelection(null);

    if (option.isCorrect) {
      setSelectedSeventhColumn(option.id);
      setTransitionSuccessSelection({ stage, nodeId: option.id });
      timeoutRef.current = window.setTimeout(() => {
        navigate("/diagnostico?nodeId=dx-poroqueratose-actinica-superficial-disseminada", {
          state: { nodeId: "dx-poroqueratose-actinica-superficial-disseminada" },
        });
      }, 900);
      return;
    }

    setWrongSeventhColumn(option.id);
  }

  function getInitialOptionClassName(option: QuizOption) {
    const isSelected = initialSelectedId === option.id;
    const isCorrectSelection = isSelected && option.isCorrect && initialAnswerState === "correct";
    const isWrongSelection = isSelected && !option.isCorrect && initialAnswerState === "wrong";
    const isTransitionSuccess = transitionSuccessSelection?.stage === "initial-question" && transitionSuccessSelection.nodeId === option.id;

    if (isTransitionSuccess) {
      return quizTransitionSuccessButtonClass;
    }

    if (isCorrectSelection) {
      return getTreeOptionButtonClass("correct");
    }

    if (isWrongSelection) {
      return "border-transparent bg-[linear-gradient(135deg,#ff5a6f_0%,#f54e8a_45%,#a855f7_100%)] text-white shadow-[0_16px_34px_-22px_rgba(160,45,120,0.42)]";
    }

    return "border-[#d7c8ea] bg-white text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)] hover:border-[#cdb5eb] hover:-translate-y-0.5";
  }

  function getTreeNodeStatus(nodeId: string): TreeNodeStatus {
    if (nodeId === "dermatitis-root") return "correct";
    if (selectedSecondColumn === nodeId || selectedThirdColumn === nodeId || selectedFourthColumn === nodeId) return "correct";
    if (wrongSecondColumn === nodeId || wrongThirdColumn === nodeId || wrongFourthColumn === nodeId) return "wrong";
    return "default";
  }

  function getFinalTreeNodeStatus(nodeId: string): TreeNodeStatus {
    if (nodeId === "interface-root" || nodeId === "lichenoid-root") return "correct";
    if (selectedFifthColumn === nodeId || selectedSixthColumn === nodeId || selectedSeventhColumn === nodeId) return "correct";
    if (wrongFifthColumn === nodeId || wrongSixthColumn === nodeId || wrongSeventhColumn === nodeId) return "wrong";
    return "default";
  }

  function registerFinalTreeNodeRef(element: HTMLDivElement | HTMLButtonElement | null, ...nodeIds: string[]) {
    nodeIds.forEach((nodeId) => {
      finalTreeNodeRefs.current[nodeId] = element;
    });
  }

  function getTreeOptionButtonClass(status: TreeNodeStatus) {
    if (status === "correct") {
      return "border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]";
    }

    if (status === "wrong") {
      return "border-transparent bg-[linear-gradient(135deg,#ff5a6f_0%,#f54e8a_45%,#a855f7_100%)] text-white shadow-[0_16px_34px_-22px_rgba(160,45,120,0.42)]";
    }

    return "border-[#d7c8ea] bg-white text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)] hover:border-[#cdb5eb] hover:-translate-y-0.5";
  }

  function getTreeOptionStyle(_status: TreeNodeStatus) {
    return undefined;
  }

  function getTransitionTreeButtonClass(status: TreeNodeStatus, nodeId: string) {
    return getQuizTransitionSuccessClass(transitionSuccessSelection, stage, nodeId, getTreeOptionButtonClass(status));
  }

  function renderTransitionImageFrame(src: string, alt: string, maxHeightClass: string) {
    return (
      <QuizTransitionImageCard
        src={src}
        alt={alt}
        maxHeightClass={maxHeightClass}
      />
    );
  }

  function renderTreeLine(line: TreeLine) {
    const strokeColor = "rgba(78, 191, 114, 0.44)";
    const circleRadius = 3;
    const circleGap = 18;
    const circleX = line.x2 - circleGap;
    const pathEndX = circleX - circleRadius - 1.5;
    const horizontalSpan = Math.max(pathEndX - line.x1, 24);
    const controlOffset = Math.max(14, Math.min(44, horizontalSpan * 0.42));

    return (
      <g key={line.id}>
        <path
          d={`M ${line.x1} ${line.y1} C ${line.x1 + controlOffset} ${line.y1}, ${pathEndX - controlOffset} ${line.y2}, ${pathEndX} ${line.y2}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx={circleX} cy={line.y2} r={circleRadius} fill="white" stroke={strokeColor} strokeWidth="1.7" />
      </g>
    );
  }

  return (
    <Layout title="Quiz Dermatite" subtitle="Quiz Dermatite">
      <section className="overflow-hidden rounded-[28px] border border-sand bg-[linear-gradient(180deg,_rgba(252,250,244,0.98)_0%,_rgba(247,242,232,0.96)_100%)] shadow-panel">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {stage === "initial-question" ? (
            <>
              <div className="quiz-images-row">
                <QuizTransitionImageCard src={pk1Image} alt="PK1" maxHeightClass="max-h-[520px]" />
              </div>

              <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,244,0.98)_100%)] p-5 shadow-[0_26px_64px_-42px_rgba(16,30,20,0.42)]">
                <div className="quiz-mobile-scroll overflow-x-auto overflow-y-hidden">
                <div ref={initialConnectorAreaRef} className="quiz-tree-track quiz-tree-columns-spacious relative flex min-w-max flex-nowrap items-start">
                  <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                    {treeLines.map((line) => renderTreeLine(line))}
                  </svg>

                  <div className="quiz-tree-column quiz-tree-column--root-desktop quiz-tree-card relative z-10 flex shrink-0 flex-col gap-3">
                    {leftColumnItems.map((item) =>
                      item.isPrimary ? (
                        <button
                          key={item.id}
                          ref={initialSourceCardRef}
                          type="button"
                          onClick={handleInitialPrimaryClick}
                          className="quiz-node-box--root group relative pr-16 border border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)] transition duration-200 hover:-translate-y-0.5 active:scale-[0.985]"
                          aria-label={isPortuguese ? "Abrir etapa Dermatite" : "Open Dermatitis step"}
                        >
                          {item.label[isPortuguese ? "pt" : "en"]}
                          <span className="pointer-events-none absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[1.9rem] font-medium leading-none text-[#2b8a57] shadow-[0_10px_24px_-14px_rgba(5,18,11,0.8)] transition duration-200 group-hover:translate-x-0.5">
                            ›
                          </span>
                        </button>
                      ) : (
                        <div
                          key={item.id}
                          className="quiz-node-box border border-[#eadff3] bg-white text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]"
                        >
                          {item.label[isPortuguese ? "pt" : "en"]}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-card relative z-10 flex shrink-0 flex-col gap-5">
                        {initialQuizOptions.map((option) => {
                          return (
                            <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                initialOptionRefs.current[option.id] = element;
                              }}
                              onClick={() => handleInitialOptionClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getInitialOptionClassName(option)}`}
                              style={undefined}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </button>
                          );
                        })}
                  </div>
                </div>
                </div>
              </div>
            </>
          ) : null}

          {stage === "interface-question" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}

              <div className="quiz-images-row">
                {renderTransitionImageFrame(pk2Image, "PK2", "max-h-[720px]")}
              </div>

              <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,244,0.98)_100%)] p-5 shadow-[0_26px_64px_-42px_rgba(16,30,20,0.42)]">
                <div ref={treeScrollAreaRef} className="quiz-mobile-scroll relative overflow-x-auto overflow-y-hidden">
                  <div ref={treeContainerRef} className="quiz-tree-track relative min-w-max">
                  <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                    {treeLines.map((line) => renderTreeLine(line))}
                  </svg>

                  <div className="quiz-tree-columns-spacious relative z-10 inline-flex min-w-max items-start pb-2">
                    <div className="quiz-tree-column quiz-tree-column--root-desktop quiz-tree-column--mid quiz-tree-card flex shrink-0 flex-col gap-3">
                      {leftColumnItems.map((item) =>
                        item.isPrimary ? (
                          <div
                            key={item.id}
                            ref={(element) => {
                              treeNodeRefs.current["dermatitis-root"] = element;
                            }}
                            className="quiz-node-box--root border border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]"
                          >
                            {item.label[isPortuguese ? "pt" : "en"]}
                          </div>
                        ) : (
                          <div
                            key={item.id}
                            className="quiz-node-box border border-[#eadff3] bg-white text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]"
                          >
                            {item.label[isPortuguese ? "pt" : "en"]}
                          </div>
                        ),
                      )}
                    </div>

                    <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-card flex shrink-0 flex-col gap-5 pt-0 xl:pt-0">
                      {secondColumnOptions.map((option) => {
                        const status = getTreeNodeStatus(option.id);
                        if (stage === "interface-question" && option.id === "perivascular" && status === "correct") {
                          return (
                            <div
                              key={option.id}
                              ref={(element) => {
                                treeNodeRefs.current[option.id] = element;
                              }}
                              className="quiz-node-box relative border border-[#d9caf7] bg-[linear-gradient(180deg,#f4efff_0%,#ece4ff_100%)] text-left text-[#7b5fd1] shadow-[0_18px_28px_-24px_rgba(39,19,71,0.16)]"
                              style={{ opacity: 1, filter: "none" }}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={option.id}
                            type="button"
                            ref={(element) => {
                              treeNodeRefs.current[option.id] = element;
                            }}
                            onClick={() => handleSecondColumnClick(option)}
                            className={`quiz-node-box border text-left transition duration-200 ${getTreeOptionButtonClass(status)}`}
                            style={getTreeOptionStyle(status)}
                          >
                            {option.label[isPortuguese ? "pt" : "en"]}
                          </button>
                        );
                      })}
                    </div>

                    {selectedSecondColumn === "perivascular" ? (
                      <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-card flex shrink-0 flex-col gap-5">
                        {thirdColumnOptions.map((option) => {
                          const status = getTreeNodeStatus(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                treeNodeRefs.current[option.id] = element;
                              }}
                              onClick={() => handleThirdColumnClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {showFourthColumn ? (
                      <div ref={fourthColumnRef} className="quiz-tree-column quiz-tree-column--narrow-desktop quiz-tree-column--narrow quiz-tree-card flex shrink-0 flex-col gap-5">
                        {fourthColumnOptions.map((option) => {
                          const status = getTreeNodeStatus(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                treeNodeRefs.current[option.id] = element;
                              }}
                              onClick={() => handleFourthColumnClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
                </div>
              </div>
            </div>
          ) : null}

          {stage === "final-images" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}

              <div className="quiz-images-row quiz-images-row--two">
                {renderTransitionImageFrame(pk3Image, "PK3", "max-h-[460px]")}
                {renderTransitionImageFrame(pk4Image, "PK4", "max-h-[460px]")}
              </div>

              <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,244,0.98)_100%)] p-5 shadow-[0_26px_64px_-42px_rgba(16,30,20,0.42)]">
                <div ref={finalTreeScrollAreaRef} className="quiz-mobile-scroll relative overflow-x-auto overflow-y-hidden">
                  <div ref={finalTreeContainerRef} className="quiz-tree-track relative min-w-max">
                    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                      {finalTreeLines.map((line) => renderTreeLine(line))}
                    </svg>

                    <div className="quiz-tree-columns-spacious relative z-10 inline-flex min-w-max items-start pb-2">
                      <div className="quiz-tree-column quiz-tree-column--mid-desktop quiz-tree-column--compact quiz-tree-card flex shrink-0 flex-col gap-5">
                        <div
                          ref={(element) => {
                            finalTreeNodeRefs.current["interface-root"] = element;
                          }}
                          className="hidden"
                        />
                        {fourthColumnOptions.map((option) => {
                          const status = option.id === "lichenoid" ? "correct" : "default";
                          return (
                            <div
                              key={option.id}
                              ref={(element) => {
                                registerFinalTreeNodeRef(element, option.id, ...(option.id === "lichenoid" ? ["lichenoid-root"] : []));
                              }}
                              className={`quiz-node-box--compact border text-left ${getTreeOptionButtonClass(status)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </div>
                          );
                        })}
                      </div>

                      <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-column--narrow quiz-tree-card flex shrink-0 flex-col gap-5">
                        {fifthColumnOptions.map((option) => {
                          const status = getFinalTreeNodeStatus(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                registerFinalTreeNodeRef(
                                  element,
                                  option.id,
                                  ...(option.id === "lymphocytes-predominate" ? ["lymphocytes-root"] : []),
                                );
                              }}
                              onClick={() => handleFifthColumnClick(option)}
                              className={`quiz-node-box--compact border text-left transition duration-200 ${getTreeOptionButtonClass(status)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </button>
                          );
                        })}
                      </div>

                      {showSixthColumn ? (
                        <div ref={sixthColumnRef} className="quiz-tree-column quiz-tree-column--wide-desktop quiz-tree-card flex shrink-0 flex-col gap-5">
                          {sixthColumnOptions.map((option) => {
                            const status = getFinalTreeNodeStatus(option.id);
                            return (
                              <button
                                key={option.id}
                                type="button"
                                ref={(element) => {
                                  finalTreeNodeRefs.current[option.id] = element;
                                }}
                                onClick={() => handleSixthColumnClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getTransitionTreeButtonClass(status, option.id)}`}
                                style={getTreeOptionStyle(status)}
                              >
                                {option.label[isPortuguese ? "pt" : "en"]}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {stage === "final-pk5" ? (
            <div className="space-y-5">
              {showTransitionBanner ? <CorrectAnswerBanner isPortuguese={isPortuguese} /> : null}

              <div className="quiz-images-row quiz-images-row--two">
                {renderTransitionImageFrame(pk2Image, "PK2", "max-h-[460px]")}
                {renderTransitionImageFrame(pk5Image, "PK5", "max-h-[460px]")}
              </div>

              <div className="rounded-[28px] border border-[#d7c8ea] bg-[radial-gradient(circle_at_top,_rgba(95,190,120,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(244,248,244,0.98)_100%)] p-5 shadow-[0_26px_64px_-42px_rgba(16,30,20,0.42)]">
                <div ref={finalTreeScrollAreaRef} className="quiz-mobile-scroll relative overflow-x-auto overflow-y-hidden">
                  <div ref={finalTreeContainerRef} className="quiz-tree-track relative min-w-max">
                    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                      {finalTreeLines.map((line) => renderTreeLine(line))}
                    </svg>

                    <div className="quiz-tree-columns-spacious relative z-10 inline-flex min-w-max items-start pb-2">
                      <div className="quiz-tree-column quiz-tree-column--mid-desktop quiz-tree-column--compact quiz-tree-card flex shrink-0 flex-col gap-5">
                        <div
                          ref={(element) => {
                            finalTreeNodeRefs.current["interface-root"] = element;
                          }}
                          className="hidden"
                        />
                        {fourthColumnOptions.map((option) => {
                          const status = option.id === "lichenoid" ? "correct" : "default";
                          return (
                            <div
                              key={option.id}
                              ref={(element) => {
                                registerFinalTreeNodeRef(element, option.id, ...(option.id === "lichenoid" ? ["lichenoid-root"] : []));
                              }}
                              className={`quiz-node-box border text-left ${getTreeOptionButtonClass(status)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </div>
                          );
                        })}
                      </div>

                      <div className="quiz-tree-column quiz-tree-column--standard-desktop quiz-tree-column--mid quiz-tree-card flex shrink-0 flex-col gap-5">
                        {fifthColumnOptions.map((option) => {
                          const status = getFinalTreeNodeStatus(option.id);
                          return (
                            <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                registerFinalTreeNodeRef(
                                  element,
                                  option.id,
                                  ...(option.id === "lymphocytes-predominate" ? ["lymphocytes-root"] : []),
                                );
                              }}
                              onClick={() => handleFifthColumnClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getTreeOptionButtonClass(status)}`}
                              style={getTreeOptionStyle(status)}
                            >
                              {option.label[isPortuguese ? "pt" : "en"]}
                            </button>
                          );
                        })}
                      </div>

                      {showSixthColumn ? (
                        <div ref={sixthColumnRef} className="quiz-tree-column quiz-tree-column--wide-desktop quiz-tree-column--wide quiz-tree-card flex shrink-0 flex-col gap-5">
                          {sixthColumnOptions.map((option) => {
                            const status = getFinalTreeNodeStatus(option.id);
                            return (
                              <button
                              key={option.id}
                              type="button"
                              ref={(element) => {
                                  registerFinalTreeNodeRef(
                                    element,
                                    option.id,
                                    ...(option.id === "cornoid-lamella" ? ["cornoid-lamella-root"] : []),
                                  );
                              }}
                              onClick={() => handleSixthColumnClick(option)}
                              className={`quiz-node-box border text-left transition duration-200 ${getTreeOptionButtonClass(status)}`}
                              style={getTreeOptionStyle(status)}
                              >
                                {option.label[isPortuguese ? "pt" : "en"]}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {showSeventhColumn ? (
                        <div
                          ref={seventhColumnRef}
                          className="quiz-tree-column quiz-tree-column--narrow-desktop quiz-tree-column--narrow quiz-tree-card relative shrink-0 self-start"
                        >
                          <div
                            ref={seventhColumnLayoutRef}
                            className="relative"
                            style={seventhColumnHeight ? { height: `${seventhColumnHeight}px` } : undefined}
                          >
                            {seventhColumnOptions.map((option) => {
                              const status = getFinalTreeNodeStatus(option.id);
                              const layout = seventhColumnLayout[option.id];
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  ref={(element) => {
                                    finalTreeNodeRefs.current[option.id] = element;
                                  }}
                                  onClick={() => handleSeventhColumnClick(option)}
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
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}


