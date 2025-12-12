// src/app/[locale]/(MainLayout)/layout.tsx
import MainShell from "@/components/MainShel/MainShel";
import type { ReactNode } from "react";


type RouteParams = { locale: string };

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<RouteParams>;
}) {
  const { locale } = await params;
  return <MainShell locale={locale}>{children}</MainShell>;
}
