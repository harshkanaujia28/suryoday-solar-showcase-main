import { motion } from "framer-motion";
import { FaSun, FaCheckCircle } from "react-icons/fa";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-20">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-solar-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-solar-green/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-solar-green/20 bg-white px-4 py-2 text-xs font-semibold text-solar-green shadow-sm sm:text-sm"
          >
            <FaSun className="text-solar-orange" />
            Trusted Solar Installation Company
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-solar-green-dark sm:text-5xl lg:text-6xl"
          >
            Power Your Future
            <br className="hidden sm:inline" />
            With{" "}
            <span className="text-gradient-sun">
              Solar Energy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Reduce electricity bills by up to{" "}
            <span className="font-bold text-solar-green-dark">
              90%
            </span>{" "}
            with reliable solar solutions for homes, businesses and industries.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full gradient-sunrise px-6 py-3.5 text-sm font-bold text-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              Get Free Consultation →
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-solar-green/20 bg-white px-6 py-3.5 text-sm font-bold text-solar-green shadow-sm transition-all hover:-translate-y-1 hover:bg-solar-surface"
            >
              View Our Projects
            </a>
          </motion.div>

          {/* TRUST INDICATORS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-solar-green-dark"
          >
            {[
              "MNRE Approved",
              "5 Yr Free Service",
              "25 Yr Warranty",
            ].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-1.5"
              >
                <FaCheckCircle className="text-solar-green-light" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE - 360 DEGREE SOLAR HOUSE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >

          {/* Decorative Circle */}
          <div className="absolute h-[75%] w-[75%] rounded-full bg-solar-green/5 blur-2xl" />

          {/* Animated Solar House */}
          <motion.img
            src="/suryoday-solar-house-transparent.webp"
            alt="360 degree view of a modern solar powered home"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
            draggable={false}
            className="relative z-10 mx-auto w-full max-w-[540px] object-contain drop-shadow-[0_25px_35px_rgba(6,69,47,0.15)]"
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </motion.div>
      </div>
    </section>
  );
}