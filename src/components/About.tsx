import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHandshake,
  faUsersGear,
  faComments,
  faHammer,
  faLightbulb,
  faArrowRight,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/hero-image.png";

const commitments = [
  { icon: faHandshake, text: "Un accompagnement adapté à votre projet" },
  { icon: faUsersGear, text: "Plusieurs corps de métier réunis" },
  { icon: faComments, text: "Une communication claire" },
  { icon: faHammer, text: "Des travaux réalisés avec soin" },
  { icon: faLightbulb, text: "Une solution adaptée à vos besoins" },
];

export default function About() {
  return (
    <section id="a-propos" className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div className="absolute top-40 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Rénovation Ezolis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 lg:-right-10 bg-white rounded-2xl shadow-2xl p-6 max-w-[240px] border border-neutral-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="text-white text-xl"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900 leading-none">
                    15+
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Années d'expertise
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Un partenaire de confiance pour tous vos projets.
              </p>
            </motion.div>

            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-brand-300 rounded-full opacity-40 pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-brand-500 rounded-full opacity-30 pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-white text-sm"
                />
                <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                Pourquoi Ezolis
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Un seul interlocuteur
              <br />
              <span className="text-brand-600">pour tous vos travaux</span>
            </h2>

            <div className="mt-6 space-y-4 text-neutral-600 text-base lg:text-lg leading-relaxed">
              <p>
                Rénover un logement ou un local peut rapidement devenir complexe
                lorsqu'il faut coordonner plusieurs professionnels.
              </p>
              <p>
                Avec Ezolis, vous bénéficiez d'un accompagnement complet pour
                vos différents travaux de rénovation et d'intervention.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-semibold tracking-[0.15em] text-neutral-500 uppercase mb-5">
                Notre engagement
              </h3>
              <ul className="space-y-3">
                {commitments.map((item, i) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center transition-colors duration-300">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-brand-600 group-hover:text-white transition-colors duration-300"
                      />
                    </span>
                    <span className="text-neutral-800 font-medium">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-7 py-4 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                En savoir plus
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <div className="text-neutral-700">
                <span className="text-lg font-semibold text-brand-700">
                  Votre projet,
                </span>{" "}
                <span className="text-neutral-500">nos solutions.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
