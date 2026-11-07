import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solar Services — Residential, Commercial & Industrial | Suryoday" },
      { name: "description", content: "Complete solar services: rooftop installation, commercial solar, industrial plants, solar water pumps and maintenance AMC." },
      { property: "og:title", content: "Solar Services — Suryoday Solar Energy" },
      { property: "og:description", content: "Residential, commercial, industrial solar and AMC services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "services" }); },
});
