import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import heroImage from "../assets/hero-image.png";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-12 lg:py-16 overflow-hidden bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 shadow-2xl"
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={heroImage}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-800/95 via-brand-700/85 to-brand-600/70" />

          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-400/30 rounded-full blur-3xl" />

          <div className="relative px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]"
                >
                  Prêt à démarrer
                  <br />
                  votre projet&nbsp;?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-4 text-white/80 text-base lg:text-lg max-w-md"
                >
                  Recevez un devis gratuit et personnalisé sous 24h. Sans
                  engagement.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="self-start lg:self-auto flex-shrink-0 flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-brand-700 hover:bg-neutral-100 font-semibold pl-7 pr-2 py-2 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
                >
                  Demander un devis
                  <span className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                  </span>
                </Link>
                <a
                  href="tel:0662244083"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-full border border-white/25 backdrop-blur transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  06 62 24 40 83
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
