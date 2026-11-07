import type { ReactNode } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { FloatingCTAs } from "@/components/common/FloatingCTAs";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingCTAs />
      <Toaster position="top-center" richColors />
    </>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden gradient-hero pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && <div className="mb-3 inline-flex rounded-full bg-solar-yellow/10 px-3 py-1 text-xs font-semibold text-solar-yellow">{eyebrow}</div>}
        <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/75 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, desc, center = true }: { eyebrow?: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && <div className="mb-3 inline-flex rounded-full bg-solar-yellow/10 px-3 py-1 text-xs font-semibold text-solar-yellow">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}
