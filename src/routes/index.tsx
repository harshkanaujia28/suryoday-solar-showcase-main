import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { TrustBar, Stats, WhyUs, ProcessSection, FAQ, Testimonials, FinalCTA } from "@/components/home/Sections";
import { AboutSection, ContactSection, ProjectsSection, ServicesSection, SubsidySection } from "@/components/home/SinglePageSections";
import { VideoSection } from "@/components/VideoSection";
import { ProductsShowcase } from "@/components/ProductsShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suryoday Solar Energy — Premium Solar Installation in India" },
      { name: "description", content: "Reduce electricity bills by up to 90% with reliable solar solutions for homes, businesses and industries. MNRE approved. 500+ projects." },
      { property: "og:title", content: "Suryoday Solar Energy — Premium Solar Installation in India" },
      { property: "og:description", content: "Reduce electricity bills by up to 90% with premium solar from a trusted MNRE-approved installer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <div id="home" className="scroll-mt-20"><Hero /></div>
      <TrustBar />
      <Stats />
      <AboutSection />
      <WhyUs />
      <ServicesSection />
      <ProductsShowcase />
      <ProjectsSection />
      <SubsidySection />
      <ProcessSection />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <FinalCTA />
      <VideoSection />
    </SiteLayout>
  );
}
