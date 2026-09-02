import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo-Ezolis.png";
import { services as servicesData } from "../data/services";

const navLinks = [
  { label: "Accueil", href: "/#accueil", active: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Ezolis - Rénovation & Dépannage"
            className="h-9 lg:h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
              onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
            >
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-2 relative ${
                  link.active
                    ? "text-brand-600"
                    : "text-neutral-700 hover:text-brand-600"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                )}
                {link.active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
                )}
              </a>

              {link.hasDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-60"
                    >
                      <ul className="bg-white rounded-xl shadow-xl border border-neutral-100 py-2">
                        {servicesData.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                            >
                              {s.shortTitle}
                            </Link>
                          </li>
                        ))}
                        <li className="border-t border-neutral-100 mt-1 pt-1">
                          <Link
                            to="/services"
                            className="block px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                          >
                            Voir tous les services →
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <a
          href="tel:0662244083"
          className="hidden lg:inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-3 rounded-full shadow-sm transition-all hover:shadow-md"
        >
          <FontAwesomeIcon icon={faPhone} className="text-sm" />
          06 62 24 40 83
        </a>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden text-neutral-800 text-xl"
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-neutral-100 bg-white"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-neutral-700 hover:text-brand-600 border-b border-neutral-50 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:0662244083"
                className="mt-3 inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-medium px-5 py-3 rounded-full"
              >
                <FontAwesomeIcon icon={faPhone} />
                06 62 24 40 83
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
