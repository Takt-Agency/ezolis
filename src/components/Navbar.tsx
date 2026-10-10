import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faChevronDown,
  faBars,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo-Ezolis.png";
import { services as servicesData } from "../data/services";

const navLinks = [
  { label: "Accueil", to: "/", end: true },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Réalisations", to: "/realisations" },
  { label: "À propos", to: "/a-propos" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme les menus à chaque changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(58,66,39,0.18)]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link to="/" className="flex items-center" aria-label="Ezolis — Accueil">
          <img
            src={logo}
            alt="Ezolis - Rénovation & Dépannage"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-8 lg:h-9" : "h-9 lg:h-10"
            }`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
              onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
              onBlur={(e) => {
                if (link.hasDropdown && !e.currentTarget.contains(e.relatedTarget as Node)) {
                  setServicesOpen(false);
                }
              }}
            >
              <NavLink
                to={link.to}
                end={link.end}
                onFocus={() => link.hasDropdown && setServicesOpen(true)}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-700 bg-brand-50"
                      : "text-neutral-700 hover:text-brand-700 hover:bg-neutral-50"
                  }`
                }
              >
                {link.label}
                {link.hasDropdown && (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[10px] transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>

              {link.hasDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[34rem]"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl shadow-brand-900/15 border border-neutral-100 p-3">
                        <ul className="grid grid-cols-2 gap-1">
                          {servicesData.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                              >
                                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-neutral-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white flex items-center justify-center transition-colors">
                                  <FontAwesomeIcon icon={s.icon} className="text-sm" />
                                </span>
                                <span className="font-medium">{s.shortTitle}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/services"
                          className="mt-2 flex items-center justify-between px-4 py-3 rounded-xl bg-brand-50 text-sm font-semibold text-brand-800 hover:bg-brand-100 transition-colors"
                        >
                          Voir tous les services
                          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0662244083"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-brand-700 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
              <FontAwesomeIcon icon={faPhone} className="text-xs" />
            </span>
            06 62 24 40 83
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-brand-600/20 transition-all hover:shadow-xl hover:shadow-brand-600/30"
          >
            Devis gratuit
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-neutral-800 text-xl hover:bg-neutral-100 transition-colors"
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
            <nav className="px-6 py-4 flex flex-col max-h-[calc(100dvh-5rem)] overflow-y-auto">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="border-b border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      aria-expanded={mobileServicesOpen}
                      className={`w-full flex items-center justify-between py-3.5 font-medium ${
                        pathname.startsWith("/services") ? "text-brand-700" : "text-neutral-800"
                      }`}
                    >
                      {link.label}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-xs text-neutral-400 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden grid grid-cols-2 gap-1 pb-3"
                        >
                          {servicesData.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-neutral-600 hover:bg-brand-50"
                              >
                                <FontAwesomeIcon icon={s.icon} className="text-brand-600 text-xs w-4" />
                                {s.shortTitle}
                              </Link>
                            </li>
                          ))}
                          <li className="col-span-2">
                            <Link
                              to="/services"
                              className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-brand-700"
                            >
                              Voir tous les services
                              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `py-3.5 font-medium border-b border-neutral-100 last:border-none ${
                        isActive ? "text-brand-700" : "text-neutral-800"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:0662244083"
                  className="inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-900 font-semibold px-4 py-3 rounded-full"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-brand-600" />
                  Appeler
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold px-4 py-3 rounded-full"
                >
                  Devis gratuit
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
