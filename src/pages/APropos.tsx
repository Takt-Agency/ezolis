import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faUsers,
  faHouseChimney,
  faScrewdriverWrench,
  faUserGroup,
  faUserCheck,
  faHandshake,
  faLightbulb,
  faShieldHalved,
  faLeaf,
  faComments,
  faMagnifyingGlassChart,
  faHammer,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import aproposImage from "../assets/image-apropos.png";
import CTA from "../components/CTA";

const stats = [
  { icon: faHouseChimney, value: "15+", label: "Années d'expérience" },
  { icon: faScrewdriverWrench, value: "15/an", label: "Projets réalisés" },
  { icon: faUserGroup, value: "2", label: "Équipes spécialisées" },
  { icon: faUserCheck, value: "24/7", label: "Dépannage & urgence" },
];

type Value = { icon: IconDefinition; title: string; text: string };

const values: Value[] = [
  {
    icon: faHandshake,
    title: "Écoute & proximité",
    text: "Nous prenons le temps de comprendre vos besoins pour vous proposer la solution la plus adaptée.",
  },
  {
    icon: faShieldHalved,
    title: "Sérieux & fiabilité",
    text: "Artisan assuré et certifié, nous nous engageons sur la qualité et le respect des délais.",
  },
  {
    icon: faLightbulb,
    title: "Expertise technique",
    text: "Plusieurs corps de métier réunis pour un accompagnement complet et cohérent.",
  },
  {
    icon: faLeaf,
    title: "Solutions durables",
    text: "Des matériaux de qualité et des techniques respectueuses pour des travaux qui durent.",
  },
];

const steps = [
  {
    icon: faComments,
    title: "Écoute",
    text: "Nous échangeons avec vous pour comprendre vos attentes.",
  },
  {
    icon: faMagnifyingGlassChart,
    title: "Analyse",
    text: "Nous identifions les travaux nécessaires à votre projet.",
  },
  {
    icon: faLightbulb,
    title: "Proposition",
    text: "Nous vous orientons vers les solutions les plus adaptées.",
  },
  {
    icon: faHammer,
    title: "Réalisation",
    text: "Nous exécutons les travaux avec sérieux et attention.",
  },
];

export default function APropos() {
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

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5 w-fit">
                  <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-white text-sm"
                    />
                    <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                    Qui sommes-nous
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                  Ezolis,{" "}
                  <span className="text-brand-600">
                    votre partenaire pour vos travaux
                  </span>{" "}
                  à Marseille
                </h1>

                <p className="mt-6 text-neutral-600 text-base lg:text-lg leading-relaxed">
                  Ezolis accompagne les particuliers et professionnels dans
                  leurs projets de rénovation, d'amélioration et de dépannage
                  depuis plus de 15 ans.
                </p>

                <p className="mt-4 text-neutral-600 text-base lg:text-lg leading-relaxed">
                  Notre objectif est simple : vous proposer des solutions
                  adaptées à vos besoins, avec un accompagnement clair et un
                  travail réalisé avec sérieux.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src={aproposImage}
                    alt="Ezolis - Rénovation à Marseille"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-brand-300 rounded-full opacity-40 pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-brand-500 rounded-full opacity-30 pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-neutral-100 shadow-xl px-6 lg:px-10 py-8 lg:py-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 md:justify-center"
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    className="text-brand-600 text-3xl"
                  />
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-neutral-900">
                      {s.value}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <div className="flex items-center gap-3 mb-5 w-fit">
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                <FontAwesomeIcon
                  icon={faHouseChimney}
                  className="text-white text-sm"
                />
                <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                Notre approche
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Une approche globale
              <br />
              <span className="text-brand-600">de la rénovation</span>
            </h2>

            <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
              Rénovation intérieure, extérieure, isolation, carrelage, peinture,
              façade, piscine ou interventions techniques : nous vous
              accompagnons selon les besoins de votre projet.
            </p>
            <p className="mt-4 text-neutral-600 text-base lg:text-lg leading-relaxed">
              De la rénovation générale aux interventions techniques, Ezolis
              intervient dans différents domaines pour vous permettre de
              centraliser vos travaux auprès d'un même interlocuteur.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-3xl p-7 border border-neutral-100 hover:border-brand-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-100/60 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-50 group-hover:bg-brand-600 transition-colors duration-300 mb-5">
                    <FontAwesomeIcon
                      icon={v.icon}
                      className="text-brand-600 group-hover:text-white text-xl transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5 w-fit">
                <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="text-white text-sm"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                  Notre accompagnement
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                De votre projet
                <br />
                <span className="text-brand-600">à sa réalisation</span>
              </h2>

              <p className="mt-6 text-neutral-600 text-base lg:text-lg leading-relaxed">
                Chaque projet commence par l'écoute de vos besoins. Nous
                échangeons avec vous afin de comprendre vos attentes, identifier
                les travaux nécessaires et vous orienter vers les solutions les
                plus adaptées.
              </p>

              <div className="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-100">
                <div className="text-lg font-semibold text-brand-800 mb-1">
                  Votre projet mérite
                </div>
                <div className="text-2xl font-bold text-brand-700">
                  une solution adaptée.
                </div>
              </div>

              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-7 py-4 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Découvrir nos services
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300" />

              <ul className="space-y-6">
                {steps.map((step, i) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative flex items-start gap-5 group"
                  >
                    <span className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-brand-500 text-brand-700 shadow-md group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={step.icon} />
                    </span>
                    <div className="pt-1.5">
                      <div className="text-[11px] font-bold tracking-[0.22em] text-brand-600 uppercase mb-1">
                        Étape {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-lg font-bold text-neutral-900 mb-1">
                        {step.title}
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
