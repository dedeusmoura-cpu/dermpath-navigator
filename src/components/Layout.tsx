import type { PropsWithChildren, ReactNode } from "react";

interface LayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function Layout({ title, subtitle, actions, children }: LayoutProps) {
  return (
    <section className="space-y-6">
      <div className="glass-panel overflow-hidden rounded-[28px] border border-white/80 shadow-panel">
        <div className="bg-grid bg-[size:24px_24px] px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Dermatopatologia algorítmica</p>
              <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
              {subtitle ? <p className="max-w-2xl text-base text-steel sm:text-lg">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
