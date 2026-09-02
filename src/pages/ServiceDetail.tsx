import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCheck,
  faArrowRight,
  faPhone,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { getService, services } from "../data/services";
import CTA from "../components/CTA";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

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
                to="/services"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                Tous les services
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5 w-fit">
                  <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-white text-sm"
                    />
                    <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                    {service.shortTitle}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                  {service.title}
                </h1>

                <p className="mt-5 text-lg lg:text-xl text-brand-700 font-medium leading-relaxed">
                  {service.tagline}
                </p>

                <p className="mt-4 text-neutral-600 text-base leading-relaxed">
                  {service.intro}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-7 py-4 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Demander un devis
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                  <a
                    href="tel:0662244083"
                    className="inline-flex items-center gap-2.5 bg-white border-2 border-neutral-200 hover:border-brand-600 text-neutral-900 font-medium px-7 py-4 rounded-full transition-all"
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-brand-600" />
                    06 62 24 40 83
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-8">
                Ce que nous proposons
              </h2>
              <ul className="space-y-4">
                {service.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center transition-colors duration-300">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-brand-600 group-hover:text-white transition-colors duration-300"
                      />
                    </span>
                    <span className="text-neutral-800 pt-2">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-8">
                Notre approche
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300" />
                <ul className="space-y-6">
                  {service.process.map((step, i) => (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="relative flex items-start gap-5 group"
                    >
                      <span className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-brand-500 text-brand-700 shadow-md group-hover:bg-brand-600 group-hover:text-white transition-colors font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-1.5">
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="py-14 lg:py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="text-white text-sm"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                  Questions fréquentes
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                Vous avez des questions ?
              </h2>
            </motion.div>

            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <motion.details
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group bg-white rounded-2xl border border-neutral-100 open:shadow-lg open:border-brand-200 transition-all"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900">
                    <span>{item.q}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center transition-transform group-open:rotate-45">
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 -mt-1 text-neutral-600 leading-relaxed">
                    {item.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                Découvrez aussi
              </h2>
              <p className="mt-2 text-neutral-500">
                Nos autres services pour vos projets
              </p>
            </div>
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Voir tous les services
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group block bg-white rounded-2xl p-6 border border-neutral-100 hover:border-brand-300 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-brand-50 group-hover:bg-brand-600 transition-colors">
                      <FontAwesomeIcon
                        icon={s.icon}
                        className="text-brand-600 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-900">
                        {s.shortTitle}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        {s.description.slice(0, 55)}…
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-brand-600 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
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
