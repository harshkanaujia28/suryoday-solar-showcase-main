import { createFileRoute, redirect } from "@tanstack/react-router";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Suryoday Solar Energy" },
      { name: "description", content: `Reach Suryoday Solar Energy — ${SITE.phone}. Free site visit and proposal in 24 hours.` },
      { property: "og:title", content: "Contact Suryoday Solar Energy" },
      { property: "og:description", content: "Free site visit and proposal in 24 hours." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          telephone: SITE.phone,
          email: SITE.email,
          address: SITE.address,
          openingHours: "Mo-Sa 09:00-19:00",
        }),
      },
    ],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "contact" }); },
});
