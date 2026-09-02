import { useRef } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faQuoteRight,
  faChevronLeft,
  faChevronRight,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "swiper/css";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  initial: string;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sophie Martin",
    role: "Particulier",
    location: "Marseille 13008",
    rating: 5,
    text: "Rénovation complète de mon appartement. Équipe très professionnelle, à l'écoute et respectueuse des délais. Je recommande vivement Ezolis.",
    initial: "S",
    color: "from-brand-400 to-brand-600",
  },
  {
    name: "Karim Benali",
    role: "Propriétaire",
    location: "Marseille 13015",
    rating: 5,
    text: "Intervention rapide pour une urgence plomberie un dimanche soir. Efficaces, propres et prix honnête. Un vrai soulagement !",
    initial: "K",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Marie Dupont",
    role: "Commerçante",
    location: "Aubagne",
    rating: 5,
    text: "Rénovation de mon local commercial de A à Z. Un seul interlocuteur pour tout, communication claire et travail soigné. Bravo à toute l'équipe.",
    initial: "M",
    color: "from-rose-400 to-rose-600",
  },
  {
    name: "Julien Rossi",
    role: "Particulier",
    location: "La Ciotat",
    rating: 5,
    text: "Isolation extérieure et ravalement de façade. Résultat magnifique, dans les délais et le budget annoncé. Merci Ezolis !",
    initial: "J",
    color: "from-amber-400 to-amber-600",
  },
  {
    name: "Nathalie Leroy",
    role: "Propriétaire",
    location: "Aix-en-Provence",
    rating: 5,
    text: "Installation d'une climatisation et rénovation salle de bain. Prestations impeccables et devis respecté. Je referai appel à eux.",
    initial: "N",
    color: "from-purple-400 to-purple-600",
  },
];

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="avis" className="relative bg-neutral-50 py-14 lg:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />

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
                  icon={faCommentDots}
                  className="text-white text-sm"
                />
                <span className="absolute inset-0 rounded-full border-2 border-brand-300 scale-125 opacity-60" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.22em] text-brand-800 uppercase">
                Avis clients
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Ce que disent
              <br />
              <span className="text-brand-600">nos clients</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-neutral-100 shadow-md px-5 py-3">
              <FontAwesomeIcon icon={faGoogle} className="text-2xl text-neutral-800" />
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-amber-400 text-sm"
                    />
                  ))}
                  <span className="ml-2 font-bold text-neutral-900">4.9</span>
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  Basé sur 127 avis Google
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Précédent"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                type="button"
                aria-label="Suivant"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all shadow-sm flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            className="!pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="!h-auto">
                <div className="group relative h-full bg-white rounded-3xl p-7 border border-neutral-100 hover:shadow-2xl hover:border-brand-300 transition-all duration-300 hover:-translate-y-1">
                  <FontAwesomeIcon
                    icon={faQuoteRight}
                    className="absolute top-6 right-6 text-4xl text-brand-100 group-hover:text-brand-200 transition-colors"
                  />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-amber-400 text-sm"
                      />
                    ))}
                  </div>

                  <p className="text-neutral-700 leading-relaxed mb-6 relative z-10">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold shadow-md`}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {t.role} · {t.location}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
