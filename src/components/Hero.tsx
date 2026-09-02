import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPhone,
  faHouseChimney,
  faScrewdriverWrench,
  faUsers,
  faUserCheck,
  faHelmetSafety,
} from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/hero-image.png";

const stats = [
  { icon: faHouseChimney, value: "15+", label: "Années d'expérience" },
  { icon: faScrewdriverWrench, value: "15/an", label: "Projets réalisés" },
  { icon: faUsers, value: "2", label: "Équipes spécialisées" },
  { icon: faUserCheck, value: "24/7", label: "Dépannage & urgence" },
];

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
    <section id="accueil" className="relative bg-white">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden"
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-10 lg:pb-36">
          <div className="max-w-xl">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.05] tracking-tight"
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
              className="mt-6 text-base md:text-lg text-neutral-600 leading-relaxed"
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
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-7 py-4 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faFileLines} />
                Demander un devis
              </Link>
              <a
                href="tel:0662244083"
                className="inline-flex items-center gap-2.5 bg-white border-2 border-neutral-200 hover:border-brand-600 text-neutral-900 font-medium px-7 py-4 rounded-full transition-all"
              >
                <FontAwesomeIcon icon={faPhone} className="text-brand-600" />
                06 62 24 40 83
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative lg:absolute mx-6 lg:mx-0 lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-14 lg:w-[calc(100%-5rem)] max-w-6xl z-10"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-100 shadow-2xl px-6 lg:px-10 py-6 lg:py-7">
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
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block h-10" />
    </section>
  );
}
