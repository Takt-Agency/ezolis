import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { services, type Service } from "../data/services";

import "swiper/css";
import "swiper/css/pagination";

export default function Services() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="services" className="relative bg-neutral-50 py-14 lg:py-20 overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-5">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Des solutions complètes
              <br />
              <span className="text-brand-600">pour tous vos projets</span>
            </h2>
            <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
              Rénovation, isolation, dépannage : un seul interlocuteur, plusieurs corps de métier.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 mr-2"
            >
              Voir tous les services
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
            <button
              type="button"
              aria-label="Précédent"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-white/70 backdrop-blur-sm rounded-[2rem] border border-neutral-100 shadow-xl p-6 lg:p-10"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent" />

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".services-pagination",
              bulletClass: "services-bullet",
              bulletActiveClass: "services-bullet-active",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            className="!pb-2"
          >
            {services.map((s) => (
              <SwiperSlide key={s.slug} className="!h-auto">
                <ServiceCard service={s} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="services-pagination flex items-center justify-center gap-2 mt-8" />
        </motion.div>
      </div>

      <style>{`
        .services-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #d4d4d4;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .services-bullet-active {
          width: 28px;
          background: var(--color-brand-600, #6e7d3d);
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative block h-full bg-white rounded-2xl p-7 border border-neutral-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-300"
    >
      <div
        className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${service.accent} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-50 group-hover:bg-brand-600 transition-colors duration-300 mb-6">
          <FontAwesomeIcon
            icon={service.icon}
            className="text-brand-600 group-hover:text-white text-xl transition-colors duration-300"
          />
        </div>

        <h3 className="text-lg font-bold text-neutral-900 mb-3 leading-snug">
          {service.shortTitle}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
          <span className="transition-transform group-hover:translate-x-1">En savoir plus</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
