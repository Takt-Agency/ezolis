import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faArrowRight,
  faSpinner,
  faClock,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useArticles } from "../hooks/useArticles";
import CTA from "../components/CTA";
import Eyebrow from "../components/Eyebrow";
import Breadcrumb from "../components/Breadcrumb";

export default function Blog() {
  const { articles, loading } = useArticles({ publishedOnly: true });
  const [activeCategory, setActiveCategory] = useState<string>("Toutes");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.category && set.add(a.category));
    return ["Toutes", ...Array.from(set)];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (activeCategory !== "Toutes" && a.category !== activeCategory) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          a.title.toLowerCase().includes(s) ||
          a.excerpt.toLowerCase().includes(s) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(s))
        );
      }
      return true;
    });
  }, [articles, activeCategory, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

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
            <Breadcrumb items={[{ label: "Blog" }]} />

            <Eyebrow icon={faNewspaper}>Blog Ezolis</Eyebrow>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                Conseils, actualités &{" "}
                <span className="text-brand-600">retours d'expérience</span>
              </h1>
              <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
                Rénovation, isolation, dépannage : découvrez nos conseils
                pratiques et les dernières actualités du monde du bâtiment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un article…"
                className="w-full rounded-full border border-neutral-200 pl-11 pr-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
            {categories.length > 2 && (
              <div className="flex flex-wrap items-center gap-2">
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
          </div>

          {loading ? (
            <div className="py-16 text-center text-neutral-500">
              <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mb-3" />
              <div>Chargement des articles…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 bg-neutral-50 rounded-3xl border border-neutral-100">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="text-4xl text-neutral-300 mb-3"
              />
              <div className="font-semibold text-neutral-700">
                Aucun article
              </div>
              <p className="text-sm mt-1">
                Nos articles seront bientôt disponibles.
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-10"
                >
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="group block bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-[4/3] lg:aspect-auto bg-neutral-100 relative overflow-hidden">
                        <img
                          src={featured.coverImage}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold bg-brand-600 text-white shadow-lg">
                          À la une
                        </span>
                      </div>
                      <div className="p-6 lg:p-10 flex flex-col justify-center">
                        {featured.category && (
                          <div className="text-[11px] font-bold tracking-[0.22em] text-brand-700 uppercase mb-3">
                            {featured.category}
                          </div>
                        )}
                        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight group-hover:text-brand-700 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="mt-4 text-neutral-600 leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500">
                          {featured.author && (
                            <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faUser} />
                              {featured.author}
                            </span>
                          )}
                          {featured.createdAt && (
                            <span>
                              {featured.createdAt.toDate().toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          )}
                          {featured.readTime && (
                            <span className="flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faClock} />
                              {featured.readTime} min
                            </span>
                          )}
                        </div>
                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 self-start">
                          <span className="transition-transform group-hover:translate-x-1">
                            Lire l'article
                          </span>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                    >
                      <Link
                        to={`/blog/${a.slug}`}
                        className="group block h-full bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden">
                          <img
                            src={a.coverImage}
                            alt={a.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {a.category && (
                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/95 backdrop-blur text-brand-800 shadow-sm">
                              {a.category}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-neutral-900 text-lg leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                            {a.title}
                          </h3>
                          <p className="mt-2 text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                            {a.excerpt}
                          </p>
                          <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                            {a.createdAt && (
                              <span>
                                {a.createdAt.toDate().toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                            {a.readTime && (
                              <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faClock} />
                                {a.readTime} min
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
