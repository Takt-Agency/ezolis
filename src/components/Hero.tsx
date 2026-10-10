import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPhone,
  faHelmetSafety,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/hero-image.png";
import StatsBar from "./StatsBar";

const trustPoints = ["Devis gratuit", "Réponse sous 24h", "Marseille & alentours"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="accueil" className="relative bg-neutral-50">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-x-0 top-0 bottom-24 lg:bottom-0 overflow-hidden"
        >
          <motion.img
            src={heroImage}
            alt="Intérieur rénové par Ezolis"
            initial={{ scale: 1.15, x: 20 }}
            animate={{
              scale: [1.15, 1.05, 1.12, 1.15],
              x: [20, -15, 10, 20],
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent md:from-white md:via-white/70 md:to-transparent lg:from-white lg:via-white/60 lg:via-40% lg:to-transparent lg:to-65%" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-10 lg:pb-40">
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2.5 mb-6 pl-2 pr-4 py-2 rounded-full bg-brand-50 border border-brand-100 shadow-sm"
            >
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-brand-600">
                <FontAwesomeIcon
                  icon={faHelmetSafety}
                  className="text-white text-[10px]"
                />
                <span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-60" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-brand-800 uppercase">
                Spécialiste <span className="text-brand-600">rénovation &amp; dépannage</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[2.6rem] md:text-6xl lg:text-[4.25rem] font-bold text-neutral-900 leading-[1.02] tracking-tight"
            >
              Rénovation générale
              <br />
              &amp; dépannage
              <br />
              <span className="text-brand-600">À Marseille</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 max-w-xl text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Rénovation intérieure et extérieure, isolation, carrelage,
              peinture, plomberie, électricité, climatisation et bien plus
              encore. Un seul interlocuteur pour tous vos travaux.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-4 rounded-full shadow-lg shadow-brand-600/25 transition-all hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faFileLines} />
                Demander un devis
              </Link>
              <a
                href="tel:0662244083"
                className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur border border-neutral-200 hover:border-brand-500 text-neutral-900 font-semibold px-7 py-4 rounded-full shadow-sm transition-all"
              >
                <FontAwesomeIcon icon={faPhone} className="text-brand-600" />
                06 62 24 40 83
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustPoints.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-700"
                >
                  <FontAwesomeIcon icon={faCircleCheck} className="text-brand-600" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative lg:absolute mx-6 lg:mx-0 lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-14 lg:w-[calc(100%-5rem)] max-w-6xl z-10"
        >
          <StatsBar />
        </motion.div>
      </div>

      <div className="hidden lg:block h-10" />
    </section>
  );
}
