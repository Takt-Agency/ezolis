import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Eyebrow from "./Eyebrow";
import {
  faPhone,
  faClock,
  faBolt,
  faFaucet,
  faFan,
  faSnowflake,
  faArrowRight,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  { icon: faFaucet, label: "Plomberie" },
  { icon: faBolt, label: "Électricité" },
  { icon: faFan, label: "VMC / Extraction" },
  { icon: faSnowflake, label: "Climatisation" },
];

export default function Emergency() {
  return (
    <section id="urgence" className="relative py-14 lg:py-20 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <Eyebrow icon={faTruckFast} tone="dark">
              Dépannage &amp; urgence
            </Eyebrow>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Besoin d'une intervention
              <br />
              <span className="text-brand-400">rapide ?</span>
            </h2>

            <p className="mt-5 text-neutral-300 text-base lg:text-lg leading-relaxed max-w-xl">
              Ezolis intervient pour vos besoins de dépannage en plomberie,
              électricité, VMC, extraction et climatisation. Décrivez-nous
              votre problème et nous vous recontactons.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {services.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 hover:border-brand-400 hover:bg-white/10 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    className="text-brand-400 text-sm"
                  />
                  <span className="text-sm text-neutral-200 font-medium">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium px-7 py-4 rounded-full shadow-lg transition-all hover:-translate-y-0.5"
              >
                Contacter Ezolis
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <FontAwesomeIcon icon={faClock} className="text-brand-400" />
                Réponse rapide 7j/7
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <a
              href="tel:0662244083"
              className="group relative block bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden border border-brand-500/50"
            >
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-white text-xl"
                    />
                    <span className="absolute inset-0 rounded-2xl border-2 border-white/40 animate-pulse" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                      Appelez-nous
                    </div>
                    <div className="text-xs text-white/60">
                      Disponible immédiatement
                    </div>
                  </div>
                </div>

                <div className="text-white text-4xl lg:text-5xl font-bold tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                  06 62 24 40 83
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    Un conseiller vous répond
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white text-brand-700 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
