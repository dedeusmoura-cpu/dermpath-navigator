import type { PropsWithChildren, ReactNode } from "react";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  compactHeader?: boolean;
}

export function Layout({ children }: LayoutProps) {
  return (
    <section>{children}</section>
  );
}
