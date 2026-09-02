import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faScrewdriverWrench,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { services } from "../data/services";
import CTA from "../components/CTA";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-b from-brand-50 to-white py-14 lg:py-20 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                Retour à l'accueil
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5 w-fit">
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  className="text-white text-sm"
                />
                <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                Nos services
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                Des solutions complètes{" "}
                <span className="text-brand-600">pour tous vos projets</span>
              </h1>
              <p className="mt-6 text-neutral-600 text-base lg:text-lg leading-relaxed">
                Ezolis regroupe plusieurs corps de métier autour de deux
                équipes spécialisées : maçonnerie gros œuvre et rénovation
                second œuvre. Découvrez l'ensemble de nos prestations à
                Marseille et alentours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative block h-full bg-white rounded-3xl p-7 border border-neutral-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-300"
                >
                  <div
                    className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${s.accent} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-50 group-hover:bg-brand-600 transition-colors duration-300 mb-5">
                      <FontAwesomeIcon
                        icon={s.icon}
                        className="text-brand-600 group-hover:text-white text-xl transition-colors duration-300"
                      />
                    </div>

                    <h2 className="text-xl font-bold text-neutral-900 mb-2 leading-snug">
                      {s.title}
                    </h2>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                      {s.tagline}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {s.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-neutral-600"
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-brand-600 text-xs mt-1 flex-shrink-0"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-600 pt-4 border-t border-neutral-100">
                      <span className="transition-transform group-hover:translate-x-1">
                        Découvrir
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
