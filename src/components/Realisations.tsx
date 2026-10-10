import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faImages,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useProjects } from "../hooks/useProjects";

import "swiper/css";
import Eyebrow from "./Eyebrow";

export default function Realisations() {
  const { projects, loading } = useProjects();
  const swiperRef = useRef<SwiperType | null>(null);

  if (!loading && projects.length === 0) return null;

  return (
    <section id="realisations" className="relative bg-white py-14 lg:py-20 overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Eyebrow icon={faCameraRetro}>Nos réalisations</Eyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Découvrez
              <br />
              <span className="text-brand-600">nos derniers projets</span>
            </h2>
            <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
              Un aperçu de nos réalisations récentes à Marseille et alentours.
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
              to="/realisations"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 mr-2"
            >
              Voir toutes les réalisations
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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-100 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-neutral-100 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-neutral-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded animate-pulse w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={projects.length > 3}
              autoplay={
                projects.length > 3
                  ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
                  : false
              }
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              className="!pb-2"
            >
              {projects.map((p) => (
                <SwiperSlide key={p.id} className="!h-auto">
                  <Link
                    to={`/realisations/${p.id}`}
                    className="group block h-full bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                      {p.images[0] && (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/95 backdrop-blur text-brand-800 shadow-sm">
                        {p.category}
                      </span>
                      {p.images.length > 1 && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur text-white flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faImages} className="text-[9px]" />
                          {p.images.length}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-neutral-900 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {p.title}
                      </h3>
                      {p.location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                          <FontAwesomeIcon icon={faLocationDot} />
                          {p.location}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-600">
                        <span className="transition-transform group-hover:translate-x-1">
                          Voir le projet
                        </span>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-xs transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="sm:hidden mt-8 text-center">
              <Link
                to="/realisations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Voir toutes les réalisations
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
