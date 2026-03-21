import { NavLink, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { LupusGoldTipsPage } from "./pages/LupusGoldTipsPage";
import { OverviewPage } from "./pages/OverviewPage";
import { PrpHistopathologyPage } from "./pages/PrpHistopathologyPage";
import { RosaceaGoldTipsPage } from "./pages/RosaceaGoldTipsPage";
import { SearchPage } from "./pages/SearchPage";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/diagnostico", label: "Árvore diagnóstica" },
  { to: "/visao-geral", label: "Visão geral" },
  { to: "/buscar", label: "Buscar" },
];

export default function App() {
  return (
    <div className="app-shell min-h-screen text-ink">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <NavLink to="/" className="font-serif text-2xl font-semibold tracking-tight text-ink">
              Dr. A.I. Ackerman
            </NavLink>
            <p className="text-sm text-steel">Árvore diagnóstica para dermatopatologia</p>
          </div>
          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-ink text-white" : "text-steel hover:bg-slate-100 hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnostico" element={<DiagnosticPage />} />
          <Route path="/dicas-que-valem-ouro" element={<LupusGoldTipsPage />} />
          <Route path="/dicas-que-valem-ouro/rosacea" element={<RosaceaGoldTipsPage />} />
          <Route path="/histopatologico/prp" element={<PrpHistopathologyPage />} />
          <Route path="/visao-geral" element={<OverviewPage />} />
          <Route path="/buscar" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  );
}
