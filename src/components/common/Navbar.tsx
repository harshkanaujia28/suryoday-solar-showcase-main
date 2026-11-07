import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/suryoday-logo.webp";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Subsidy", href: "#subsidy" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-solar-blue-dark/95 shadow-sm backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:min-h-[80px] sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#home"
          aria-label="Suryoday Solar Energy home"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="Suryoday Solar Energy"
            className="h-11 w-auto object-contain sm:h-14"
            width={1920}
            height={640}
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 xl:flex 2xl:gap-6"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-[var(--color-solar-yellow)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full gradient-sunrise px-3 py-2.5 text-[11px] font-bold text-white shadow-premium transition hover:shadow-glow sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Get Quote</span>
            <span className="hidden sm:inline">Get Free Quote</span>
            <ArrowRight className="hidden h-4 w-4 sm:block" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:bg-white/10 xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile navigation"
            className="overflow-hidden border-t border-white/10 bg-solar-blue-dark xl:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6 lg:px-8">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-[var(--color-solar-yellow)]"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}