import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Suryoday Solar Energy" },
      { name: "description", content: "10+ years of premium solar installations. Learn about our mission, vision and team of certified solar experts." },
      { property: "og:title", content: "About — Suryoday Solar Energy" },
      { property: "og:description", content: "Trusted MNRE solar partner with 500+ installations across India." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "about" }); },
});
