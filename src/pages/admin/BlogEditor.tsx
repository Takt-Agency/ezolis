import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSpinner,
  faCloudArrowUp,
  faTriangleExclamation,
  faTag,
  faEye,
  faPen,
  faFloppyDisk,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../lib/firebase";
import { compressImageToBase64 } from "../../lib/imageUtils";
import {
  slugify,
  estimateReadTime,
  useArticleById,
} from "../../hooks/useArticles";

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { article, loading: loadingArticle } = useArticleById(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [author, setAuthor] = useState("Ezolis");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setSlugTouched(true);
      setExcerpt(article.excerpt);
      setCategory(article.category ?? "");
      setTagsText(article.tags?.join(", ") ?? "");
      setAuthor(article.author ?? "Ezolis");
      setContent(article.content);
      setCoverImage(article.coverImage);
      setPublished(article.published);
    }
  }, [article]);

  useEffect(() => {
    if (!slugTouched && title) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Merci de choisir un fichier image.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 10 Mo.");
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const b64 = await compressImageToBase64(f);
      setCoverImage(b64);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de traitement.");
    } finally {
      setProcessing(false);
    }
  }

  async function saveArticle(publish?: boolean) {
    setError(null);

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!coverImage) {
      setError("Merci d'ajouter une image de couverture.");
      return;
    }
    if (!content.trim()) {
      setError("Le contenu est obligatoire.");
      return;
    }

    setSaving(true);
    try {
      const cleanSlug = slug ? slugify(slug) : slugify(title);
      const tags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const finalPublished = publish !== undefined ? publish : published;

      const payload = {
        title: title.trim(),
        slug: cleanSlug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage,
        category: category.trim() || null,
        tags: tags.length > 0 ? tags : null,
        author: author.trim() || "Ezolis",
        readTime: estimateReadTime(content),
        published: finalPublished,
      };

      if (isEdit && id) {
        await updateDoc(doc(db, "articles", id), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "articles"), {
          ...payload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      navigate("/admin/blog");
    } catch {
      setError("Erreur lors de l'enregistrement.");
      setSaving(false);
    }
  }

  if (isEdit && loadingArticle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">
        <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mr-3" />
        Chargement…
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors mb-3"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            Retour au blog
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            {isEdit ? "Modifier l'article" : "Nouvel article"}
          </h1>
          <p className="text-neutral-500 mt-1">
            {isEdit
              ? "Modifiez le contenu et enregistrez vos changements."
              : "Rédigez votre article et publiez-le en un clic."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-700 border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} />
            Annuler
          </Link>
          {published && (
            <button
              type="button"
              onClick={() => saveArticle()}
              disabled={saving || processing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faFloppyDisk} />
              )}
              Enregistrer
            </button>
          )}
          {!published && (
            <button
              type="button"
              onClick={() => saveArticle(false)}
              disabled={saving || processing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-700 border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-60"
            >
              {saving ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faFloppyDisk} />
              )}
              Enregistrer en brouillon
            </button>
          )}
          <button
            type="button"
            onClick={() => saveArticle(true)}
            disabled={saving || processing}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
          >
            {saving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Publication…
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                {published ? "Enregistrer & Publier" : "Publier"}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl mb-6"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 lg:p-7">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-neutral-900 mb-2"
            >
              Titre *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Un titre accrocheur…"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-lg font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
            />

            <div className="mt-4">
              <label
                htmlFor="slug"
                className="block text-xs font-semibold text-neutral-600 mb-1.5"
              >
                URL de l'article
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-neutral-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition">
                <span className="pl-4 text-neutral-400 text-sm select-none">
                  /blog/
                </span>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugTouched(true);
                  }}
                  placeholder="url-de-larticle"
                  className="flex-1 px-2 py-2.5 text-sm bg-transparent placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="excerpt"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Résumé
              </label>
              <textarea
                id="excerpt"
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Court résumé affiché dans la liste (1-2 phrases)"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <div className="flex items-center gap-1 bg-neutral-100 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setTab("write")}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    tab === "write"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faPen} className="text-xs" />
                  Écrire
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    tab === "preview"
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faEye} className="text-xs" />
                  Aperçu
                </button>
              </div>
              <div className="text-xs text-neutral-500">
                {estimateReadTime(content)} min de lecture · {content.trim().split(/\s+/).filter(Boolean).length} mots
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                required
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`# Titre principal\n\nVotre premier paragraphe…\n\n## Sous-titre\n\nUtilisez **gras** ou *italique*.\n\n- Point 1\n- Point 2\n\n[Lien](https://exemple.com)\n\n> Une citation importante`}
                className="w-full px-6 py-5 text-sm font-mono leading-relaxed placeholder:text-neutral-400 focus:outline-none resize-y min-h-[500px]"
              />
            ) : (
              <div className="px-6 py-5 min-h-[500px] blog-content-preview">
                {content.trim() ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                ) : (
                  <div className="text-neutral-400 italic text-sm">
                    Rien à afficher. Écrivez du contenu pour voir l'aperçu.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sticky top-24">
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-4">
              Publication
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between mb-5">
              <div>
                <div className="font-semibold text-neutral-900 text-sm">
                  {published ? "Publié" : "Brouillon"}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {published
                    ? "Visible sur le site public"
                    : "Non visible en public"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                aria-label={published ? "Dépublier" : "Publier"}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  published ? "bg-brand-600" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    published ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Image de couverture *
              </label>
              <div
                onClick={() => !processing && fileInputRef.current?.click()}
                className={`relative aspect-video rounded-xl border-2 border-dashed border-neutral-200 hover:border-brand-500 hover:bg-brand-50/30 transition-all overflow-hidden flex items-center justify-center bg-neutral-50 ${
                  processing ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                {coverImage ? (
                  <>
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    {!processing && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center transition-colors opacity-0 hover:opacity-100">
                        <div className="text-white text-xs font-semibold flex items-center gap-2">
                          <FontAwesomeIcon icon={faCloudArrowUp} />
                          Changer
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-neutral-500 px-4">
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      className="text-2xl text-neutral-400 mb-1.5"
                    />
                    <div className="text-xs font-semibold">
                      Cliquez pour uploader
                    </div>
                  </div>
                )}
                {processing && (
                  <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-brand-700 text-xs font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faSpinner} spin />
                      Compression…
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-neutral-900 mb-2"
                >
                  Catégorie
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Conseils, Rénovation…"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-neutral-900 mb-2"
                >
                  Tags
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xs"
                  />
                  <input
                    id="tags"
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="rénovation, marseille"
                    className="w-full rounded-xl border border-neutral-200 pl-9 pr-4 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Séparés par des virgules
                </p>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-neutral-900 mb-2"
                >
                  Auteur
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .blog-content-preview { color: #404040; font-size: 15px; line-height: 1.75; }
        .blog-content-preview h1 { font-size: 1.75rem; font-weight: 700; color: #171717; margin: 1.5rem 0 0.75rem; }
        .blog-content-preview h2 { font-size: 1.5rem; font-weight: 700; color: #171717; margin: 1.5rem 0 0.75rem; }
        .blog-content-preview h3 { font-size: 1.2rem; font-weight: 700; color: #262626; margin: 1.25rem 0 0.5rem; }
        .blog-content-preview p { margin: 0.75rem 0; }
        .blog-content-preview ul { list-style: disc; padding-left: 1.5rem; margin: 0.75rem 0; }
        .blog-content-preview ol { list-style: decimal; padding-left: 1.5rem; margin: 0.75rem 0; }
        .blog-content-preview li { margin: 0.25rem 0; }
        .blog-content-preview a { color: var(--color-brand-700, #556131); text-decoration: underline; }
        .blog-content-preview strong { color: #171717; font-weight: 700; }
        .blog-content-preview em { font-style: italic; }
        .blog-content-preview blockquote { border-left: 4px solid var(--color-brand-500, #8a9b4f); padding: 0.4rem 1rem; margin: 1rem 0; background: var(--color-brand-50, #f6f7f0); border-radius: 0.5rem; font-style: italic; color: #525252; }
        .blog-content-preview code { background: #f5f5f5; padding: 0.15rem 0.4rem; border-radius: 0.3rem; font-size: 0.9em; }
        .blog-content-preview hr { border: none; border-top: 1px solid #e5e5e5; margin: 1.5rem 0; }
      `}</style>
    </div>
  );
}
