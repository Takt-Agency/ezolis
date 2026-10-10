import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faCalendar,
  faTag,
  faArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useProject, useProjects } from "../hooks/useProjects";
import CTA from "../components/CTA";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Breadcrumb from "../components/Breadcrumb";

export default function RealisationDetail() {
  const { id } = useParams<{ id: string }>();
  const { project, loading, notFound } = useProject(id);
  const { projects } = useProjects();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">
        <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mr-3" />
        Chargement du projet…
      </div>
    );
  }

  if (notFound || !project) {
    return <Navigate to="/realisations" replace />;
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const hasMultipleImages = project.images.length > 1;

  return (
    <>
      <section className="page-hero relative pt-8 pb-10 lg:pt-10 lg:pb-14 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb items={[{ label: "Réalisations", to: "/realisations" }, { label: project.title }]} />

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-bold bg-brand-600 text-white">
                <FontAwesomeIcon icon={faTag} className="text-[9px]" />
                {project.category}
              </span>
              {project.location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white border border-neutral-200 text-neutral-700">
                  <FontAwesomeIcon icon={faLocationDot} className="text-brand-600 text-[10px]" />
                  {project.location}
                </span>
              )}
              {project.createdAt && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white border border-neutral-200 text-neutral-500">
                  <FontAwesomeIcon icon={faCalendar} className="text-[10px]" />
                  {project.createdAt.toDate().toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight max-w-4xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-100"
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination, Thumbs]}
              spaceBetween={0}
              slidesPerView={1}
              loop={hasMultipleImages}
              autoplay={
                hasMultipleImages
                  ? { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }
                  : false
              }
              navigation={{
                nextEl: ".gallery-next",
                prevEl: ".gallery-prev",
              }}
              pagination={{
                el: ".gallery-pagination",
                clickable: true,
                bulletClass: "gallery-bullet",
                bulletActiveClass: "gallery-bullet-active",
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              className="aspect-[16/10]"
            >
              {project.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${project.title} - image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  aria-label="Précédent"
                  className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur text-neutral-800 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  type="button"
                  aria-label="Suivant"
                  className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur text-neutral-800 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>

                <div className="gallery-pagination absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2" />
              </>
            )}
          </motion.div>

          {hasMultipleImages && (
            <div className="mt-4">
              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                breakpoints={{
                  640: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                }}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {project.images.map((img, i) => (
                  <SwiperSlide
                    key={i}
                    className="!h-20 lg:!h-24 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent transition-all"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      {(project.description || true) && (
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 lg:p-10"
            >
              <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-6">
                À propos du projet
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100">
                  <div className="text-[10px] uppercase tracking-widest text-brand-700 font-bold">
                    Catégorie
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-1.5">
                    {project.category}
                  </div>
                </div>
                {project.location && (
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                      Localisation
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 mt-1.5">
                      {project.location}
                    </div>
                  </div>
                )}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                    Photos
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-1.5">
                    {project.images.length} image
                    {project.images.length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {project.description ? (
                <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              ) : (
                <p className="text-neutral-500 italic text-sm">
                  Aucune description fournie pour ce projet.
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-full shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Un projet similaire ? Demandez un devis
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link
                  to="/realisations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Voir toutes les réalisations
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section className="py-10 lg:py-14 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                  D'autres réalisations
                </h2>
                <p className="mt-2 text-neutral-500">
                  Explorez nos autres projets récents
                </p>
              </div>
              <Link
                to="/realisations"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Voir tout
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/realisations/${p.id}`}
                    className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                      {p.images[0] && (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/95 backdrop-blur text-brand-800">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-neutral-900 line-clamp-1">
                        {p.title}
                      </div>
                      {p.location && (
                        <div className="text-xs text-neutral-500 mt-1">
                          {p.location}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />

      <style>{`
        .gallery-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.7);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gallery-bullet-active {
          width: 24px;
          background: #ffffff;
        }
        .thumbs-swiper .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1;
          border-color: var(--color-brand-600, #6e7d3d) !important;
        }
      `}</style>
    </>
  );
}
