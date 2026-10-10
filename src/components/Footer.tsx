import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo-Ezolis.png";

import { services as servicesData } from "../data/services";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: faFacebookF, href: "#", label: "Facebook" },
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: faWhatsapp, href: "https://wa.me/33662244083", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-neutral-300 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-28 lg:pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img
                src={logo}
                alt="Ezolis"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Ezolis accompagne les particuliers et professionnels dans leurs
              projets de rénovation, d'amélioration et de dépannage à Marseille
              et alentours.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-600 text-neutral-300 hover:text-white border border-white/10 transition-all hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-400 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesData.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-400 transition-all" />
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-[0.15em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                </span>
                <div className="text-sm text-neutral-400 leading-relaxed">
                  106 avenue de St Louis
                  <br />
                  13015 Marseille
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                </span>
                <a
                  href="tel:0662244083"
                  className="text-sm text-neutral-300 hover:text-brand-400 transition-colors"
                >
                  06 62 24 40 83
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </span>
                <a
                  href="mailto:contact@ezolis.net"
                  className="text-sm text-neutral-300 hover:text-brand-400 transition-colors"
                >
                  contact@ezolis.net
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} className="text-sm" />
                </span>
                <div className="text-sm text-neutral-400">
                  Lun - Sam : 8h - 19h
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Ezolis. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <Link
              to="/mentions-legales"
              className="hover:text-brand-400 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite"
              className="hover:text-brand-400 transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link to="/cgv" className="hover:text-brand-400 transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
