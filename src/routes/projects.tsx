import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — 500+ Solar Installations | Suryoday" },
      { name: "description", content: "Browse our portfolio of residential, commercial and industrial solar installations across India." },
      { property: "og:title", content: "Projects — Suryoday Solar Energy" },
      { property: "og:description", content: "500+ rooftop and ground-mount solar installations delivered." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "projects" }); },
});
