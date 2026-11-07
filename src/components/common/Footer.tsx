
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { SITE, NAV } from "@/data/site";
import { SERVICES } from "@/data/content";
import logo from "@/assets/suryoday-logo.webp";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-solar-blue-dark text-white/85">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company Logo & About */}
          <div>
            <a href="#home" className="inline-flex items-center">
              <img
                src={logo}
                alt="Suryoday Solar Energy"
                className="h-[65px] w-auto object-contain"
                width={1920}
                height={640}
              />
            </a>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Trusted solar installation partner for homes, businesses and
              industries across India. MNRE-approved channel partner.
            </p>

            <div className="mt-5 flex gap-3">
              {[
                { Icon: FaFacebookF, href: SITE.socials.facebook },
                { Icon: FaInstagram, href: SITE.socials.instagram },
                { Icon: FaYoutube, href: SITE.socials.youtube },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:gradient-sunrise"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="transition-colors hover:text-[var(--color-solar-yellow)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="transition-colors hover:text-[var(--color-solar-yellow)]"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[var(--color-solar-yellow)]" />
                <span>{SITE.address}</span>
              </li>

              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-[var(--color-solar-yellow)]" />
                <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>
              </li>

              <li className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-[var(--color-solar-yellow)]" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Suryoday Solar Energy. All rights
            reserved.
          </p>
          <p>MNRE Approved · ISO 9001:2015 · GST Registered</p>
        </div>
      </div>
    </footer>
  );
}
