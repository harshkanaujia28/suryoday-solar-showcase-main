import { useState } from "react";
import { PROJECTS } from "@/data/content";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBolt, FaRupeeSign } from "react-icons/fa";
import { Reveal } from "@/components/common/Reveal";

export function ProjectsGrid({ filter }: { filter?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = filter && filter !== "All" ? PROJECTS.filter((p) => p.category === filter) : PROJECTS;
  const active = list.find((p) => p.id === open);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 md:auto-rows-[260px]">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04} className={p.span}>
            <motion.button
              onClick={() => setOpen(p.id)}
              whileHover={{ scale: 1.02 }}
              className="group relative h-full w-full overflow-hidden rounded-3xl bg-muted shadow-sm ring-1 ring-black/5"
            >
              <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-solar-yellow)]">{p.category}</div>
                <div className="font-display font-bold">{p.title}</div>
                <div className="text-xs text-white/80">{p.capacity} · {p.location}</div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {active && (
            <>
              <img src={active.img} alt={active.title} className="h-72 w-full object-cover" />
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-solar-orange)]">{active.category} Project</div>
                <DialogTitle className="mt-1 font-display text-2xl font-bold">{active.title}</DialogTitle>
                <DialogDescription className="sr-only">{active.title} project details</DialogDescription>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-muted p-3"><FaBolt className="text-[var(--color-solar-orange)]" /><div className="mt-1 text-xs text-muted-foreground">Capacity</div><div className="font-bold">{active.capacity}</div></div>
                  <div className="rounded-xl bg-muted p-3"><FaMapMarkerAlt className="text-[var(--color-solar-blue)]" /><div className="mt-1 text-xs text-muted-foreground">Location</div><div className="font-bold">{active.location}</div></div>
                  <div className="rounded-xl bg-muted p-3"><FaRupeeSign className="text-[var(--color-solar-green)]" /><div className="mt-1 text-xs text-muted-foreground">Savings</div><div className="font-bold">{active.savings}</div></div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
