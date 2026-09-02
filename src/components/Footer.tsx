import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faArrowRight,
  faPaperPlane,
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
  { label: "Accueil", href: "/#accueil" },
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
        className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                Prêt à démarrer votre projet ?
              </h3>
              <p className="mt-3 text-white/80 text-base lg:text-lg">
                Recevez un devis gratuit et personnalisé sous 24h.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-white text-brand-700 hover:bg-neutral-100 font-semibold px-7 py-4 rounded-full shadow-lg transition-all hover:-translate-y-0.5"
              >
                Demander un devis
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <a
                href="tel:0662244083"
                className="inline-flex items-center gap-2.5 bg-brand-800/40 hover:bg-brand-900/60 text-white font-semibold px-7 py-4 rounded-full border border-white/20 transition-all"
              >
                <FontAwesomeIcon icon={faPhone} />
                06 62 24 40 83
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="#accueil" className="inline-block mb-5">
              <img
                src={logo}
                alt="Ezolis"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </a>
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
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-400 transition-all" />
                    {link.label}
                  </a>
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

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-brand-500 transition-colors"
            >
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-transparent outline-none px-4 py-2 text-sm text-white placeholder:text-neutral-500"
              />
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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
