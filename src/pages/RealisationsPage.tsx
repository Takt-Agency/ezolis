import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faLocationDot,
  faArrowRight,
  faSpinner,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";
import { useProjects } from "../hooks/useProjects";
import CTA from "../components/CTA";
import Eyebrow from "../components/Eyebrow";
import Breadcrumb from "../components/Breadcrumb";

export default function RealisationsPage() {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return ["Toutes", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "Toutes") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      <section className="page-hero relative pt-8 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb items={[{ label: "Réalisations" }]} />

            <Eyebrow icon={faCameraRetro}>Nos réalisations</Eyebrow>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                Découvrez{" "}
                <span className="text-brand-600">nos derniers projets</span>
              </h1>
              <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
                Rénovation, isolation, façade, piscine… Un aperçu du savoir-faire
                Ezolis à travers nos chantiers réalisés à Marseille et alentours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    activeCategory === c
                      ? "bg-brand-600 text-white border-brand-600 shadow-md"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-400 hover:text-brand-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-neutral-500">
              <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mb-3" />
              <div>Chargement des projets…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 bg-neutral-50 rounded-3xl border border-neutral-100">
              <FontAwesomeIcon
                icon={faImages}
                className="text-4xl text-neutral-300 mb-3"
              />
              <div className="font-semibold text-neutral-700">
                Aucun projet à afficher
              </div>
              <p className="text-sm mt-1">
                Nos réalisations seront publiées prochainement.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                >
                  <Link
                    to={`/realisations/${p.id}`}
                    className="group block bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                      {p.images[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                          <FontAwesomeIcon icon={faImages} className="text-4xl" />
                        </div>
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
                      <h3 className="font-bold text-neutral-900 text-lg leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {p.title}
                      </h3>
                      {p.location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                          <FontAwesomeIcon icon={faLocationDot} />
                          {p.location}
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-sm font-semibold text-brand-600">
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
