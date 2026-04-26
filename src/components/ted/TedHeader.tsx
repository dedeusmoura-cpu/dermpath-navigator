import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface TedHeaderNavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface TedHeaderProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  navItems?: TedHeaderNavItem[];
  actionSlot?: ReactNode;
}

const defaultTedNavItems: TedHeaderNavItem[] = [
  { to: "/treinamento-ted", label: "Início", end: true },
  { to: "/treinamento-ted/areas", label: "Treinar por área" },
  { to: "/treinamento-ted/aleatorio", label: "Questões aleatórias" },
  { to: "/treinamento-ted/desempenho", label: "Meu desempenho" },
  { to: "/treinamento-ted/revisao", label: "Revisar erros" },
];

export function TedHeader({ title, subtitle, eyebrow = "Aprendizado guiado", navItems = defaultTedNavItems, actionSlot }: TedHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#f5c98b] bg-[linear-gradient(135deg,_rgba(255,249,240,0.98)_0%,_rgba(255,244,225,0.98)_42%,_rgba(255,238,210,0.98)_100%)] shadow-[0_28px_64px_-36px_rgba(80,42,0,0.24)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(247,168,0,0.26),_transparent_56%)]" />
      <div className="absolute right-0 top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.88),_rgba(255,255,255,0))]" />

      <div className="relative space-y-6 px-6 py-6 sm:px-8">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-[#f3c37d] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b76600] shadow-sm">
            {eyebrow}
          </span>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-[#5f5a52] sm:text-base">{subtitle}</p>
          </div>
        </div>

        <nav className="flex w-full flex-wrap items-center gap-2" aria-label="Navegação do Treinamento TED">
          {navItems.map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#1f2f4c] text-white shadow-[0_14px_28px_-18px_rgba(31,47,76,0.7)]"
                    : "border border-[#f1c487] bg-white/86 text-[#8c5400] hover:border-[#eba94d] hover:bg-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {actionSlot ? (
            <div className="ml-auto flex items-center gap-2">{actionSlot}</div>
          ) : null}
        </nav>
      </div>
    </section>
  );
}
