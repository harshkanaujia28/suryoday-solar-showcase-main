import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Solar Guide — Suryoday Solar Energy" },
      { name: "description", content: "Practical solar guides and advice from Suryoday Solar Energy." },
      { property: "og:title", content: "Solar Guide — Suryoday Solar Energy" },
      { property: "og:description", content: "Practical solar guides and advice from Suryoday Solar Energy." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => { throw redirect({ to: "/" }); },
});