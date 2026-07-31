import dermpathSkin from "../../assets/dermpath-skin@2x.png";
import dermpathCompass from "../../assets/dermpath-compass@2x.png";

interface DiagnosticNavigationEmblemProps {
  className?: string;
  /** Dispara uma volta completa da agulha dourada (a pele permanece parada). */
  spinning?: boolean;
}

// Centro do anel da bússola dentro do PNG (963x518), usado como eixo do giro.
const COMPASS_PIVOT = "43.51% 55.02%";

/**
 * Brand mark for the tree map empty state.
 *
 * The skin-and-compass illustration from the main logo sits free of any frame,
 * over a cream halo, ringed by the same thin gold circles used in the homepage
 * hero. The four cardinal ticks keep the navigation reading of the compass.
 *
 * A ilustração é servida em duas camadas — pele e bússola — para que a agulha
 * possa girar sozinha quando o usuário escolhe uma categoria.
 */
export function DiagnosticNavigationEmblem({ className, spinning = false }: DiagnosticNavigationEmblemProps) {
  return (
    <div className={`relative grid place-items-center ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className="absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,#fffcf4_0%,rgba(252,247,235,0.85)_42%,rgba(252,250,244,0)_70%)]"
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 330 230" fill="none" aria-hidden="true">
        <circle cx="165" cy="115" r="98" stroke="#d6b766" strokeOpacity="0.38" strokeWidth="1" />
        <circle cx="165" cy="115" r="72" stroke="#d6b766" strokeOpacity="0.22" strokeWidth="1" />
        <g stroke="#b58a2a" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round">
          <path d="M165 8v9" />
          <path d="M165 213v9" />
          <path d="M58 115h9" />
          <path d="M263 115h9" />
        </g>
      </svg>
      <span className="relative block w-[300px] max-w-full">
        <img
          src={dermpathSkin}
          alt=""
          aria-hidden="true"
          className="block w-full drop-shadow-[0_18px_26px_rgba(90,30,80,0.2)]"
        />
        <img
          src={dermpathCompass}
          alt=""
          aria-hidden="true"
          style={{ transformOrigin: COMPASS_PIVOT }}
          className={`absolute inset-0 block w-full${spinning ? " dermpath-compass-spin" : ""}`}
        />
      </span>
    </div>
  );
}
