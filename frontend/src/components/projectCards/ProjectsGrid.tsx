import { useState } from "react";
import { PROJECTS } from "@/data/content";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaBolt,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";

import { Reveal } from "@/components/common/Reveal";

function getProjectBadge(category: string, title: string) {
  if (category === "Hybrid Solar") return "With Battery";

  if (category === "On-Grid Solar") return "Without Battery";

  if (title.toLowerCase().includes("team")) return "Installation Work";

  if (title.toLowerCase().includes("rooftop")) return "Rooftop System";

  return "Solar Installation";
}

export function ProjectsGrid({ filter }: { filter?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const list =
    filter && filter !== "All"
      ? PROJECTS.filter((p) => p.category === filter)
      : PROJECTS;

  const active = PROJECTS.find((p) => p.id === open);

  return (
    <>
      {/* Projects Gallery */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {list.map((p, i) => (
          <Reveal
            key={p.id}
            delay={i * 0.04}
            className="h-full min-w-0"
          >
            <motion.button
              type="button"
              onClick={() => setOpen(p.id)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              aria-label={`View ${p.title} project`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted text-left shadow-sm ring-1 ring-white/10 transition-shadow hover:shadow-premium"
            >
              {/* Project Image */}
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002D25] via-black/20 to-transparent" />

              {/* Top Right Badge */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[11px] font-bold text-[#123B30] shadow-lg sm:text-xs">
                <FaCheckCircle className="shrink-0 text-green-600" />
                <span>{getProjectBadge(p.category, p.title)}</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">

                <div className="mb-2 inline-flex rounded-full bg-[#164A32] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-solar-yellow)] sm:text-xs">
                  {p.category}
                </div>

                <h3 className="font-display text-base font-bold leading-snug sm:text-lg">
                  {p.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-white/85 sm:text-sm">
                  <FaMapMarkerAlt className="shrink-0 text-[var(--color-solar-yellow)]" />
                  <span>{p.location}</span>
                </div>

              </div>
            </motion.button>
          </Reveal>
        ))}

      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={open !== null}
        onOpenChange={(o) => !o && setOpen(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto overflow-x-hidden p-0">

          {active && (
            <>
              {/* Image */}
              <img
                src={active.img}
                alt={active.title}
                className="aspect-video w-full object-cover"
              />

              {/* Details */}
              <div className="p-5 sm:p-6">

                <div className="inline-flex rounded-full bg-[#164A32] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-solar-yellow)]">
                  {active.category}
                </div>

                <DialogTitle className="mt-3 font-display text-xl font-bold sm:text-2xl">
                  {active.title}
                </DialogTitle>

                <DialogDescription className="sr-only">
                  {active.title} project details
                </DialogDescription>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="min-w-0 rounded-xl bg-muted p-3">
                    <FaBolt className="text-[var(--color-solar-orange)]" />

                    <div className="mt-2 text-xs text-muted-foreground">
                      Capacity / System
                    </div>

                    <div className="mt-1 break-words text-sm font-bold">
                      {active.capacity}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-xl bg-muted p-3">
                    <FaMapMarkerAlt className="text-[var(--color-solar-orange)]" />

                    <div className="mt-2 text-xs text-muted-foreground">
                      Location
                    </div>

                    <div className="mt-1 break-words text-sm font-bold">
                      {active.location}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-xl bg-muted p-3">
                    <FaRupeeSign className="text-[var(--color-solar-green)]" />

                    <div className="mt-2 text-xs text-muted-foreground">
                      Savings
                    </div>

                    <div className="mt-1 break-words text-sm font-bold">
                      {active.savings}
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
}