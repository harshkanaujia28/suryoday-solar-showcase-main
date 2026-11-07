import { useState } from "react";
import aboutSolar from "@/assets/about-solar.jpg";
import { FaCheck, FaCheckCircle, FaClock, FaEnvelope, FaEye, FaFileAlt, FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaBullseye } from "react-icons/fa";
import { SERVICES } from "@/data/content";
import { SITE } from "@/data/site";
import { Reveal } from "@/components/common/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProjectsGrid } from "@/components/projectCards/ProjectsGrid";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/layouts/SiteLayout";

const VALUES = [
  { Icon: FaBullseye, title: "Our Mission", desc: "Make clean, affordable solar energy accessible to every Indian home and business." },
  { Icon: FaEye, title: "Our Vision", desc: "Be India's most trusted solar brand — known for quality, honesty and lifetime support." },
  { Icon: FaHeart, title: "Our Values", desc: "Customer first. Premium components only. Transparent pricing. Long-term partnership." },
];

const CERTS = ["MNRE Approved", "ISO 9001:2015", "Tier-1 Panel Partner", "DISCOM Empanelled", "GST Registered", "Make In India"];
const SLABS = [
  { kw: "Up to 2 kW", amt: "₹30,000 per kW" },
  { kw: "2 kW – 3 kW", amt: "₹18,000 per additional kW" },
  { kw: "Above 3 kW", amt: "Capped at ₹78,000 total" },
];
const ELIGIBILITY = ["Indian resident with own home", "Valid electricity connection (DISCOM)", "Roof area available (≈100 sq ft per kW)", "First-time solar applicant"];
const DOCS = ["Aadhaar Card", "PAN Card", "Latest Electricity Bill", "Property Ownership Proof", "Cancelled Cheque / Bank Passbook", "Passport-size Photo"];
const PROJECT_FILTERS = ["All", "Residential", "Commercial", "Industrial"];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-premium ring-1 ring-white/10">
                <img src={aboutSolar} alt="Suryoday Solar technicians installing rooftop solar panels" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="absolute -bottom-5 left-6 rounded-2xl gradient-sunrise px-6 py-4 text-white shadow-premium">
                <div className="font-display text-3xl font-bold leading-none">10+</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest">Years Powering India</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="inline-flex rounded-full bg-solar-yellow/10 px-3 py-1 text-xs font-semibold text-solar-yellow">About Suryoday</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Built By Engineers, Trusted By Thousands</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Since 2015, Suryoday Solar Energy has delivered carefully engineered rooftop and industrial systems across seven states. Every project combines Tier-1 components, transparent pricing and dependable long-term service.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {CERTS.map((item) => <div key={item} className="flex items-center gap-2 text-sm font-medium"><FaCheckCircle className="shrink-0 text-[var(--color-solar-green)]" />{item}</div>)}
            </div>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {VALUES.map((value, index) => <Reveal key={value.title} delay={index * 0.06}><div className="h-full rounded-3xl border border-white/10 bg-card p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-sunrise text-white"><value.Icon /></div><h3 className="mt-4 font-display text-xl font-bold">{value.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 solar-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Services" title="End-to-End Solar Solutions" desc="From a 1 kW home rooftop to a MW-scale industrial plant — one expert team from survey to service." />
        <div className="space-y-16">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug}>
              <article id={service.slug} className={`grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-3xl shadow-premium"><img src={service.img} alt={service.title} loading="lazy" className="h-72 w-full object-cover sm:h-80" /></div>
                <div><span className="text-xs font-bold uppercase text-[var(--color-solar-orange)]">Solution {index + 1}</span><h3 className="mt-2 font-display text-3xl font-bold">{service.title}</h3><p className="mt-3 text-muted-foreground">{service.short}</p><ul className="mt-5 grid gap-2 sm:grid-cols-2">{service.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-2 text-sm"><FaCheck className="mt-1 shrink-0 text-[var(--color-solar-green)]" />{benefit}</li>)}</ul><a href="#contact" className="mt-6 inline-flex rounded-full gradient-sunrise px-6 py-3 text-sm font-bold text-white shadow-premium">Get Quote →</a></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Project Showcase" title="500+ Installations & Counting" desc="Explore homes, institutions and industries already saving with Suryoday." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">{PROJECT_FILTERS.map((item) => <Button key={item} onClick={() => setFilter(item)} variant={filter === item ? "default" : "outline"} className={filter === item ? "gradient-sunrise border-0 text-white" : ""}>{item}</Button>)}</div>
        <ProjectsGrid filter={filter} />
      </div>
    </section>
  );
}

export function SubsidySection() {
  return (
    <section id="subsidy" className="scroll-mt-20 solar-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="PM Surya Ghar Yojana" title="Get Up To ₹78,000 Solar Subsidy" desc="We guide eligible homeowners through documents, approval and the complete application process." />
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal><div className="h-full rounded-3xl border border-white/10 bg-card p-6 shadow-sm"><h3 className="font-display text-xl font-bold">Subsidy Slabs</h3><ul className="mt-4 space-y-3">{SLABS.map((item) => <li key={item.kw} className="rounded-xl bg-solar-yellow/10 p-3 text-sm"><b>{item.kw}</b><div className="text-muted-foreground">{item.amt}</div></li>)}</ul></div></Reveal>
          <Reveal delay={0.05}><div className="h-full rounded-3xl border border-white/10 bg-card p-6 shadow-sm"><h3 className="font-display text-xl font-bold">Eligibility</h3><ul className="mt-4 space-y-3">{ELIGIBILITY.map((item) => <li key={item} className="flex gap-2 text-sm"><FaCheckCircle className="mt-1 shrink-0 text-[var(--color-solar-green)]" />{item}</li>)}</ul></div></Reveal>
          <Reveal delay={0.1}><div className="h-full rounded-3xl border border-white/10 bg-card p-6 shadow-sm"><h3 className="font-display text-xl font-bold">Documents Required</h3><ul className="mt-4 space-y-3">{DOCS.map((item) => <li key={item} className="flex gap-2 text-sm"><FaFileAlt className="mt-1 shrink-0 text-[var(--color-solar-yellow)]" />{item}</li>)}</ul></div></Reveal>
        </div>
        <div className="mt-12 rounded-3xl border border-white/10 bg-card p-6 text-center shadow-premium sm:p-8"><span className="text-xs font-bold uppercase text-solar-yellow">Application Support</span><h3 className="mt-2 font-display text-3xl font-bold">We File Your Application — Free</h3><p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Our team will help submit your PM Surya Ghar application at no extra cost.</p><a href="#contact" className="mt-6 inline-flex rounded-full gradient-sunrise px-6 py-3 text-sm font-bold text-white shadow-premium">Contact Our Team →</a></div>
      </div>
    </section>
  );
}

const INFO = [
  { Icon: FaMapMarkerAlt, label: "Office", value: SITE.address },
  { Icon: FaPhoneAlt, label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
  { Icon: FaEnvelope, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: FaClock, label: "Hours", value: SITE.hours },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 solar-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Get In Touch" title="Let's Power Your Future" desc="Call, message or send your details for a free site visit and tailored proposal." />
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal><div className="space-y-4">{INFO.map((item) => <a key={item.label} href={item.href ?? "#contact"} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-card p-5 shadow-sm"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-sunrise text-white"><item.Icon /></div><div className="min-w-0"><div className="text-xs font-bold uppercase text-muted-foreground">{item.label}</div><div className="break-words font-medium">{item.value}</div></div></a>)}<div className="grid grid-cols-2 gap-3"><a href={`tel:${SITE.phoneRaw}`} className="rounded-full gradient-sunrise px-5 py-3 text-center text-sm font-bold text-white">Call Now</a><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-solar-green)] px-5 py-3 text-sm font-bold text-white"><FaWhatsapp /> WhatsApp</a></div><div className="aspect-video overflow-hidden rounded-2xl shadow-sm ring-1 ring-white/10"><iframe title="Office map" src="https://www.openstreetmap.org/export/embed.html?bbox=73.8%2C18.5%2C73.9%2C18.6&layer=mapnik" className="h-full w-full" loading="lazy" /></div></div></Reveal>
          <Reveal delay={0.1}><LeadForm source="contact-section" fields={["name", "phone", "email", "city", "bill", "message"]} cta="Send Inquiry" /></Reveal>
        </div>
      </div>
    </section>
  );
}