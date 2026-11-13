import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/subsidy")({
  head: () => ({
    meta: [
      { title: "PM Surya Ghar Solar Subsidy — Apply With Suryoday" },
      { name: "description", content: "Get up to ₹78,000 subsidy under PM Surya Ghar Muft Bijli Yojana. We handle eligibility, documents and DISCOM application end-to-end." },
      { property: "og:title", content: "Solar Subsidy — Up to ₹78,000 | Suryoday" },
      { property: "og:description", content: "PM Surya Ghar subsidy assistance — eligibility, documents, application." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/subsidy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/subsidy" }],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "subsidy" }); },
});
