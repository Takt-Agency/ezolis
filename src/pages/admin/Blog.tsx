import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrashCan,
  faSpinner,
  faNewspaper,
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../lib/firebase";
import { type Article } from "../../hooks/useArticles";

function normalize(id: string, data: Record<string, unknown>): Article {
  return {
    id,
    slug: (data.slug as string) ?? id,
    title: (data.title as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    content: (data.content as string) ?? "",
    coverImage: (data.coverImage as string) ?? "",
    category: data.category as string | undefined,
    tags: data.tags as string[] | undefined,
    published: (data.published as boolean) ?? false,
    author: data.author as string | undefined,
    readTime: data.readTime as number | undefined,
    createdAt: data.createdAt as Timestamp | undefined,
    updatedAt: data.updatedAt as Timestamp | undefined,
  };
}

export default function BlogAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setArticles(snap.docs.map((d) => normalize(d.id, d.data())));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, []);

  const filtered = articles.filter((a) => {
    if (filter === "published" && !a.published) return false;
    if (filter === "draft" && a.published) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(s) ||
        a.excerpt.toLowerCase().includes(s) ||
        (a.category ?? "").toLowerCase().includes(s)
      );
    }
    return true;
  });

  async function handleDelete(a: Article) {
    if (!confirm(`Supprimer "${a.title}" ?`)) return;
    try {
      await deleteDoc(doc(db, "articles", a.id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  }

  async function togglePublish(a: Article) {
    try {
      await updateDoc(doc(db, "articles", a.id), {
        published: !a.published,
        updatedAt: serverTimestamp(),
      });
    } catch {
      alert("Erreur lors de la mise à jour.");
    }
  }

  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.published).length,
    draft: articles.filter((a) => !a.published).length,
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Blog
          </h1>
          <p className="text-neutral-500 mt-1">
            {articles.length} article{articles.length > 1 ? "s" : ""} ·{" "}
            {counts.published} publié{counts.published > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          to="/admin/blog/nouveau"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          <FontAwesomeIcon icon={faPlus} />
          Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm mb-4 p-4 flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article…"
            className="w-full rounded-xl border border-neutral-200 pl-11 pr-4 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                filter === f
                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-400"
              }`}
            >
              {f === "all"
                ? "Tous"
                : f === "published"
                  ? "Publiés"
                  : "Brouillons"}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === f
                    ? "bg-white/25 text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center text-neutral-500">
          <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mb-3" />
          <div>Chargement…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
          <FontAwesomeIcon
            icon={faNewspaper}
            className="text-4xl text-neutral-300 mb-3"
          />
          <div className="font-semibold text-neutral-700">Aucun article</div>
          <p className="text-sm text-neutral-500 mt-1 mb-5">
            Publiez votre premier article de blog.
          </p>
          <Link
            to="/admin/blog/nouveau"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Écrire un article
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden divide-y divide-neutral-100">
          {filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
              className="p-4 lg:p-5 flex items-center gap-4 hover:bg-neutral-50/50 transition-colors"
            >
              <Link
                to={`/admin/blog/${a.id}`}
                className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl bg-neutral-100 overflow-hidden"
              >
                {a.coverImage ? (
                  <img
                    src={a.coverImage}
                    alt={a.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    <FontAwesomeIcon icon={faNewspaper} className="text-xl" />
                  </div>
                )}
              </Link>
              <Link to={`/admin/blog/${a.id}`} className="flex-1 min-w-0 block">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${
                      a.published
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}
                  >
                    {a.published ? "Publié" : "Brouillon"}
                  </span>
                  {a.category && (
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-100">
                      {a.category}
                    </span>
                  )}
                  {a.createdAt && (
                    <span className="text-xs text-neutral-400">
                      {a.createdAt.toDate().toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
                <div className="font-bold text-neutral-900 truncate hover:text-brand-700 transition-colors">
                  {a.title || "Sans titre"}
                </div>
                <div className="text-sm text-neutral-500 truncate mt-0.5">
                  {a.excerpt || "Pas de résumé"}
                </div>
              </Link>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => togglePublish(a)}
                  aria-label={a.published ? "Dépublier" : "Publier"}
                  title={a.published ? "Dépublier" : "Publier"}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                    a.published
                      ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      : "border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={a.published ? faEye : faEyeSlash}
                    className="text-sm"
                  />
                </button>
                <Link
                  to={`/admin/blog/${a.id}`}
                  aria-label="Modifier"
                  className="w-10 h-10 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faPen} className="text-sm" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(a)}
                  aria-label="Supprimer"
                  className="w-10 h-10 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
