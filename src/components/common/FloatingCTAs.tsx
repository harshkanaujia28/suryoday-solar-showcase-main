import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SITE } from "@/data/site";
import { motion } from "framer-motion";

export function FloatingCTAs() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Suryoday%2C%20I%20want%20a%20solar%20quote`}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-solar-green)] text-white shadow-premium transition-transform hover:scale-110"
      >
        <FaWhatsapp className="h-7 w-7" />
        <span className="absolute h-14 w-14 rounded-full bg-[var(--color-solar-green)] opacity-50 animate-ping" />
      </motion.a>
      <motion.a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="flex h-14 w-14 items-center justify-center rounded-full gradient-sunrise text-white shadow-premium hover:scale-110 transition-transform"
      >
        <FaPhoneAlt className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
