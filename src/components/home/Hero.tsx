import { motion } from "framer-motion";
import { FaSun, FaCheckCircle } from "react-icons/fa";
import heroImg from "@/assets/hero-solar-house.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-solar-yellow/30 bg-solar-yellow/10 px-4 py-2 text-xs font-semibold text-solar-yellow shadow-sm">
            <FaSun className="animate-spin-slow" /> Trusted Solar Installation Company
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Power Your Future <br className="hidden sm:inline" />
            With <span className="text-gradient-sun">Solar Energy</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Reduce electricity bills by up to <span className="font-semibold text-foreground">90%</span> with reliable solar solutions for homes, businesses and industries.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full gradient-sunrise px-6 py-3.5 text-sm font-bold text-white shadow-premium hover:shadow-glow transition-all">
              Get Free Consultation →
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-white/15">
              View Our Projects
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/80">
            {["MNRE Approved", "5 Yr Free Service", "25 Yr Warranty"].map((t) => (
              <div key={t} className="inline-flex items-center gap-1.5"><FaCheckCircle className="text-[var(--color-solar-green)]" />{t}</div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center">
          <motion.img
            src={heroImg} alt="Solar powered home"
            width={1024} height={1024}
            className="relative z-10 mx-auto w-full max-w-xl drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
