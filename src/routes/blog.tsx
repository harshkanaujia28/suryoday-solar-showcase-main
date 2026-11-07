import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Solar Insights — Suryoday Solar Energy" },
      { name: "description", content: "Solar guides, subsidy explainers and industry insights from Suryoday Solar Energy." },
      { property: "og:title", content: "Solar Insights — Suryoday Solar Energy" },
      { property: "og:description", content: "Practical solar guides, subsidy information and maintenance advice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => { throw redirect({ to: "/" }); },
});