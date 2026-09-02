import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClock,
  faUser,
  faSpinner,
  faArrowRight,
  faTag,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useArticleBySlug, useArticles } from "../hooks/useArticles";
import CTA from "../components/CTA";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, notFound } = useArticleBySlug(slug);
  const { articles } = useArticles({ publishedOnly: true });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">
        <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mr-3" />
        Chargement de l'article…
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/blog" replace />;
  }

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(article.title);

  return (
    <>
      <article>
        <section className="relative bg-gradient-to-b from-brand-50 to-white py-10 lg:py-14 overflow-hidden">
          <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                  Tous les articles
                </Link>
              </div>

              {article.category && (
                <div className="text-[11px] font-bold tracking-[0.22em] text-brand-700 uppercase mb-4">
                  {article.category}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                {article.author && (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-xs" />
                    </span>
                    <span className="font-medium text-neutral-800">
                      {article.author}
                    </span>
                  </span>
                )}
                <span className="text-neutral-300">·</span>
                {article.createdAt && (
                  <span>
                    {article.createdAt.toDate().toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
                {article.readTime && (
                  <>
                    <span className="text-neutral-300">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faClock} />
                      {article.readTime} min de lecture
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="blog-content"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </motion.div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faTag} className="text-brand-600 text-xs" />
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    Tags
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-800 border border-brand-100"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-sm text-neutral-500 flex items-center gap-2">
                  <FontAwesomeIcon icon={faShareNodes} className="text-brand-600" />
                  Partager cet article
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Partager sur Facebook"
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-brand-600 hover:text-white text-neutral-600 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="text-xs" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Partager sur X"
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-brand-600 hover:text-white text-neutral-600 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="text-xs" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Partager sur LinkedIn"
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-brand-600 hover:text-white text-neutral-600 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-xs" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Partager sur WhatsApp"
                    className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-brand-600 hover:text-white text-neutral-600 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      {otherArticles.length > 0 && (
        <section className="py-10 lg:py-14 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                  D'autres articles
                </h2>
                <p className="mt-2 text-neutral-500">
                  Continuez votre lecture
                </p>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Voir tout
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.id}
                  to={`/blog/${a.slug}`}
                  className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    {a.category && (
                      <div className="text-[10px] font-bold tracking-widest text-brand-700 uppercase mb-2">
                        {a.category}
                      </div>
                    )}
                    <div className="font-bold text-neutral-900 line-clamp-2 group-hover:text-brand-700 transition-colors">
                      {a.title}
                    </div>
                    <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                      {a.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />

      <style>{`
        .blog-content {
          color: #404040;
          font-size: 17px;
          line-height: 1.8;
        }
        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #171717;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #171717;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #262626;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .blog-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #262626;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-content p {
          margin: 1.25rem 0;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin: 1.25rem 0;
        }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content li { margin: 0.5rem 0; }
        .blog-content a {
          color: var(--color-brand-700, #556131);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: var(--color-brand-800, #454e2b);
        }
        .blog-content strong { color: #171717; font-weight: 700; }
        .blog-content em { font-style: italic; }
        .blog-content blockquote {
          border-left: 4px solid var(--color-brand-500, #8a9b4f);
          padding: 0.5rem 1.25rem;
          margin: 1.5rem 0;
          background: var(--color-brand-50, #f6f7f0);
          border-radius: 0.75rem;
          font-style: italic;
          color: #525252;
        }
        .blog-content code {
          background: #f5f5f5;
          padding: 0.15rem 0.45rem;
          border-radius: 0.35rem;
          font-size: 0.9em;
          color: #171717;
        }
        .blog-content pre {
          background: #171717;
          color: #f5f5f5;
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        .blog-content img {
          border-radius: 1rem;
          margin: 1.5rem 0;
          max-width: 100%;
          height: auto;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid #e5e5e5;
          margin: 2.5rem 0;
        }
      `}</style>
    </>
  );
}
