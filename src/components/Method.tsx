import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCompassDrafting,
  faComments,
  faMagnifyingGlassChart,
  faFileSignature,
  faHammer,
  faHandshakeAngle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

type Step = {
  number: string;
  icon: IconDefinition;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: faComments,
    title: "Échange",
    description:
      "Vous nous présentez votre projet, vos besoins et vos attentes.",
  },
  {
    number: "02",
    icon: faMagnifyingGlassChart,
    title: "Analyse",
    description:
      "Nous étudions les travaux à réaliser afin d'identifier les différentes interventions nécessaires.",
  },
  {
    number: "03",
    icon: faFileSignature,
    title: "Proposition",
    description:
      "Nous vous proposons une solution adaptée à votre projet et à vos besoins.",
  },
  {
    number: "04",
    icon: faHammer,
    title: "Réalisation",
    description:
      "Les travaux sont réalisés avec attention et dans le respect des exigences du projet.",
  },
  {
    number: "05",
    icon: faHandshakeAngle,
    title: "Suivi",
    description:
      "Nous restons à votre écoute tout au long de votre projet afin de faciliter son bon déroulement.",
  },
];

export default function Method() {
  return (
    <section
      id="methode"
      className="relative bg-gradient-to-b from-neutral-50 to-white py-14 lg:py-20 overflow-hidden"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
              <FontAwesomeIcon
                icon={faCompassDrafting}
                className="text-white text-sm"
              />
              <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
              Notre méthode
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Une rénovation plus simple,
            <br />
            <span className="text-brand-600">étape par étape</span>
          </h2>

          <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
            Un projet de rénovation nécessite une bonne préparation et une
            communication claire. Ezolis vous accompagne à chaque étape.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-700 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group text-center"
              >
                <div className="relative mx-auto mb-6 w-28 h-28 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-brand-100/70 group-hover:bg-brand-200 transition-colors duration-500" />
                  <span className="absolute inset-2 rounded-full bg-white shadow-lg" />
                  <span className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <FontAwesomeIcon
                      icon={step.icon}
                      className="text-white text-xl"
                    />
                  </span>

                  <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-brand-500 text-brand-700 text-xs font-bold shadow-md z-10">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 bg-white rounded-2xl border border-neutral-100 shadow-lg px-6 py-6 lg:px-10"
        >
          <div className="text-center sm:text-left">
            <div className="text-lg lg:text-xl font-semibold text-neutral-900">
              Vous avez un projet ?
            </div>
            <div className="text-sm text-neutral-500 mt-1">
              Parlons-en. Nous vous répondons rapidement.
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-7 py-3.5 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Demander un devis
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
