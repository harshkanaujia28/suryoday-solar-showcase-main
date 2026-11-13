import { FaShieldAlt, FaBolt, FaAward, FaCheckCircle, FaStar, FaQuoteLeft } from "react-icons/fa";
import * as Fa from "react-icons/fa";
import { TRUST, STATS, WHY_US, PROCESS, FAQS, TESTIMONIALS } from "@/data/content";
import { CountUp } from "@/components/common/CountUp";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/layouts/SiteLayout";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { SITE } from "@/data/site";

const trustIcons = [FaCheckCircle, FaBolt, FaShieldAlt, FaAward];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-card py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {TRUST.map((t, i) => {
          const Icon = trustIcons[i];
          return (
            <div key={t.label} className="flex items-center justify-center gap-2 text-sm">
              <Icon className="h-5 w-5 text-[var(--color-solar-orange)]" />
              <span className="font-semibold">{t.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-solar-blue-dark py-16 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-20 left-20 h-64 w-64 rounded-full bg-[var(--color-solar-orange)] blur-3xl" />
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-[var(--color-solar-green)] blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((s) => (
          <Reveal key={s.label} className="text-center">
            <div className="font-display text-4xl font-bold text-gradient-sun sm:text-5xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-white/75">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why Suryoday" title="Built For Real Savings" desc="Six reasons thousands trust us with their solar journey." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => {
            const Icon = (Fa as Record<string, React.ComponentType<{ className?: string }>>)[w.icon] ?? Fa.FaSolarPanel;
            return (
              <Reveal key={w.title} delay={i * 0.05}>
                <motion.div whileHover={{ y: -6 }} className="group relative h-full rounded-3xl bg-card p-7 shadow-sm ring-1 ring-white/10 hover:shadow-premium transition-all">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-sunrise text-white shadow-glow group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 solar-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How We Work" title="From Quote to Power in 6 Steps" />
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 gradient-sunrise opacity-30 lg:block" />
          <div className="space-y-8 lg:space-y-0">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n}>
                <div className={`relative grid items-center gap-6 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`${i % 2 ? "lg:text-left lg:pl-12" : "lg:text-right lg:pr-12"}`}>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full gradient-sunrise text-lg font-bold text-white shadow-premium">{p.n}</div>
                    <h3 className="mt-3 font-display text-2xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.desc}</p>
                  </div>
                  <div className="hidden lg:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQs" title="Solar Questions, Answered" />
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="mb-3 rounded-2xl border border-white/10 bg-card px-5 shadow-sm">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="scroll-mt-20 solar-section py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Customer Love" title="Reviews That Speak Volumes" />
        <div className="relative">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl rounded-3xl bg-card p-8 text-center shadow-premium ring-1 ring-white/10 sm:p-10">
            <FaQuoteLeft className="mx-auto h-8 w-8 text-[var(--color-solar-orange)] opacity-40" />
            <p className="mt-4 font-display text-lg sm:text-xl leading-relaxed">"{TESTIMONIALS[i].text}"</p>
            <div className="mt-5 flex justify-center gap-1 text-[var(--color-solar-yellow)]">
              {Array.from({ length: TESTIMONIALS[i].rating }).map((_, k) => <FaStar key={k} />)}
            </div>
            <div className="mt-4">
              <div className="font-bold">{TESTIMONIALS[i].name}</div>
              <div className="text-sm text-muted-foreground">{TESTIMONIALS[i].role}</div>
            </div>
          </motion.div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 gradient-sunrise" : "w-2 bg-border"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl gradient-sunrise p-8 text-center sm:p-12 lg:p-16 shadow-premium">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-white">
            <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">Ready To Start Saving With Solar?</h2>
            <p className="mt-3 text-white/90 sm:text-lg">Free site visit. Custom proposal in 24 hours. Zero obligation.</p>
             <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--color-solar-orange)] shadow-md transition hover:scale-105">📞 Call Now</a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center rounded-full bg-solar-blue-dark px-6 py-3 text-sm font-bold text-white shadow-md transition hover:scale-105">💬 WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
