
"use client";

import type { ReactNode } from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";


export default function MainShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
   <div className="min-h-screen flex flex-col">
     <Header locale={locale} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
