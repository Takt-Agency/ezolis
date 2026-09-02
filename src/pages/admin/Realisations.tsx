import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  collection,
  addDoc,
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
  faXmark,
  faImage,
  faSpinner,
  faCloudArrowUp,
  faTriangleExclamation,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../lib/firebase";
import { services as servicesData } from "../../data/services";
import {
  compressImageToBase64,
  GALLERY_IMAGE_OPTIONS,
  MAX_IMAGES_PER_PROJECT,
} from "../../lib/imageUtils";

type Project = {
  id: string;
  title: string;
  category: string;
  location?: string;
  description?: string;
  images: string[];
  createdAt?: Timestamp;
};

export default function Realisations() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setProjects(
          snap.docs.map((d) => {
            const data = d.data() as Partial<Project> & { imageData?: string };
            const images =
              data.images && data.images.length > 0
                ? data.images
                : data.imageData
                  ? [data.imageData]
                  : [];
            return {
              id: d.id,
              title: data.title ?? "",
              category: data.category ?? "",
              location: data.location,
              description: data.description,
              images,
              createdAt: data.createdAt,
            };
          }),
        );
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, []);

  async function handleDelete(p: Project) {
    if (!confirm(`Supprimer "${p.title}" ?`)) return;
    try {
      await deleteDoc(doc(db, "projects", p.id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setModalOpen(true);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Réalisations
          </h1>
          <p className="text-neutral-500 mt-1">
            {projects.length} projet{projects.length > 1 ? "s" : ""} publié
            {projects.length > 1 ? "s" : ""}.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          <FontAwesomeIcon icon={faPlus} />
          Nouveau projet
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center text-neutral-500">
          <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mb-3" />
          <div>Chargement…</div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
          <FontAwesomeIcon
            icon={faImages}
            className="text-4xl text-neutral-300 mb-3"
          />
          <div className="font-semibold text-neutral-700">
            Aucune réalisation
          </div>
          <p className="text-sm text-neutral-500 mt-1 mb-5">
            Commencez par ajouter votre premier projet.
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Ajouter un projet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
              className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                {p.images[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    <FontAwesomeIcon icon={faImage} className="text-4xl" />
                  </div>
                )}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur text-brand-800">
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
                <div className="font-bold text-neutral-900 line-clamp-1">
                  {p.title}
                </div>
                {p.location && (
                  <div className="text-xs text-neutral-500 mt-1">
                    {p.location}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faPen} className="text-xs" />
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p)}
                    aria-label="Supprimer"
                    className="w-10 h-10 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal
            project={editing}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [location, setLocation] = useState(project?.location ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [images, setImages] = useState<string[]>(project?.images ?? []);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const remaining = MAX_IMAGES_PER_PROJECT - images.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_IMAGES_PER_PROJECT} images par projet.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const toProcess = files.slice(0, remaining);
    const ignored = files.length - toProcess.length;

    setError(null);
    setProcessing(true);
    setProgress({ done: 0, total: toProcess.length });

    const compressed: string[] = [];
    try {
      for (let i = 0; i < toProcess.length; i++) {
        const f = toProcess[i];
        if (!f.type.startsWith("image/")) continue;
        if (f.size > 10 * 1024 * 1024) {
          setError(`"${f.name}" dépasse 10 Mo, ignorée.`);
          continue;
        }
        const b64 = await compressImageToBase64(f, GALLERY_IMAGE_OPTIONS);
        compressed.push(b64);
        setProgress({ done: i + 1, total: toProcess.length });
      }
      setImages((prev) => [...prev, ...compressed]);
      if (ignored > 0) {
        setError(
          `${ignored} image(s) ignorée(s) — maximum ${MAX_IMAGES_PER_PROJECT} par projet.`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de traitement.");
    } finally {
      setProcessing(false);
      setProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError("Merci d'ajouter au moins une image.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        category: category.trim(),
        location: location.trim(),
        description: description.trim(),
        images,
      };

      if (project) {
        await updateDoc(doc(db, "projects", project.id), payload);
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } catch {
      setError("Erreur lors de l'enregistrement. Réessayez.");
      setSaving(false);
    }
  }

  const totalKb = Math.round(
    images.reduce((sum, s) => sum + s.length, 0) / 1024,
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
            <div className="font-bold text-neutral-900 text-lg">
              {project ? "Modifier le projet" : "Nouveau projet"}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-neutral-100 text-neutral-500 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  Images du projet *{" "}
                  <span className="text-neutral-400 font-normal">
                    ({images.length}/{MAX_IMAGES_PER_PROJECT})
                  </span>
                </label>
                {images.length > 0 && !processing && (
                  <span className="text-xs text-neutral-500">
                    Total : {totalKb} Ko
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100"
                  >
                    <img
                      src={img}
                      alt={`Image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold bg-brand-600 text-white">
                        Cover
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => moveImage(i, -1)}
                          aria-label="Vers la gauche"
                          className="w-8 h-8 rounded-full bg-white/95 text-neutral-800 hover:bg-white text-xs flex items-center justify-center transition-colors"
                        >
                          ←
                        </button>
                      )}
                      {i < images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveImage(i, 1)}
                          aria-label="Vers la droite"
                          className="w-8 h-8 rounded-full bg-white/95 text-neutral-800 hover:bg-white text-xs flex items-center justify-center transition-colors"
                        >
                          →
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        aria-label="Supprimer"
                        className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 text-xs flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                ))}

                {images.length < MAX_IMAGES_PER_PROJECT && (
                  <button
                    type="button"
                    onClick={() => !processing && fileInputRef.current?.click()}
                    disabled={processing}
                    className={`aspect-square rounded-xl border-2 border-dashed border-neutral-200 hover:border-brand-500 hover:bg-brand-50/30 transition-all flex flex-col items-center justify-center text-neutral-500 hover:text-brand-700 p-3 ${
                      processing ? "cursor-wait" : "cursor-pointer"
                    }`}
                  >
                    {processing ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-brand-600 mb-2" />
                        {progress && (
                          <div className="text-xs font-semibold">
                            {progress.done}/{progress.total}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="text-2xl mb-2"
                        />
                        <div className="text-xs font-semibold text-center">
                          {images.length === 0 ? "Ajouter des images" : "Ajouter"}
                        </div>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                JPG, PNG ou WEBP · La 1<sup>ère</sup> image sert de cover ·
                Survolez pour réorganiser ou supprimer.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onFilesChange}
                className="hidden"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Titre du projet *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Rénovation appartement Vieux-Port"
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-neutral-900 mb-2"
                >
                  Catégorie *
                </label>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm bg-white text-neutral-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                >
                  <option value="">Sélectionner</option>
                  {servicesData.map((s) => (
                    <option key={s.slug} value={s.shortTitle}>
                      {s.shortTitle}
                    </option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-neutral-900 mb-2"
                >
                  Localisation
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex : Marseille 13008"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails du projet réalisé..."
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving || processing}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition-all"
              >
                {saving ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Enregistrement…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faImage} />
                    {project ? "Enregistrer" : "Publier"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
