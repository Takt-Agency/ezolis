import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faMagnifyingGlass,
  faPhone,
  faEnvelope,
  faLocationDot,
  faCalendar,
  faTrashCan,
  faXmark,
  faCircleCheck,
  faClock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../lib/firebase";

type DevisStatus = "new" | "in_progress" | "done";

type Devis = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode?: string;
  services: string[];
  project: string;
  surface?: string;
  budget?: string;
  timing?: string;
  status: DevisStatus;
  createdAt?: Timestamp;
};

const STATUS_LABELS: Record<DevisStatus, string> = {
  new: "Nouveau",
  in_progress: "En cours",
  done: "Traité",
};

const STATUS_STYLES: Record<DevisStatus, string> = {
  new: "bg-brand-100 text-brand-800 border-brand-200",
  in_progress: "bg-amber-100 text-amber-800 border-amber-200",
  done: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function DevisPage() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Devis | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DevisStatus | "all">("all");

  useEffect(() => {
    const q = query(collection(db, "devis"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: Devis[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Devis, "id">),
        }));
        setDevis(list);
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    return devis.filter((d) => {
      if (filter !== "all" && d.status !== filter) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          d.firstName?.toLowerCase().includes(s) ||
          d.lastName?.toLowerCase().includes(s) ||
          d.email?.toLowerCase().includes(s) ||
          d.phone?.includes(s) ||
          d.project?.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [devis, filter, search]);

  const counts = useMemo(
    () => ({
      all: devis.length,
      new: devis.filter((d) => d.status === "new").length,
      in_progress: devis.filter((d) => d.status === "in_progress").length,
      done: devis.filter((d) => d.status === "done").length,
    }),
    [devis],
  );

  async function updateStatus(id: string, status: DevisStatus) {
    await updateDoc(doc(db, "devis", id), { status });
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    await deleteDoc(doc(db, "devis", id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Demandes de devis
          </h1>
          <p className="text-neutral-500 mt-1">
            {devis.length} demande{devis.length > 1 ? "s" : ""} au total.
          </p>
        </div>
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
            placeholder="Rechercher (nom, email, téléphone, projet)…"
            className="w-full rounded-xl border border-neutral-200 pl-11 pr-4 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "in_progress", "done"] as const).map((f) => (
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
              {f === "all" ? "Tous" : STATUS_LABELS[f]}
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

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-neutral-500">
            <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mb-3" />
            <div>Chargement des demandes…</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-neutral-500">
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              className="text-4xl text-neutral-300 mb-3"
            />
            <div className="font-semibold text-neutral-700">
              Aucune demande
            </div>
            <p className="text-sm mt-1">
              Les nouvelles demandes apparaîtront ici automatiquement.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filtered.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelected(d)}
                className="w-full text-left p-4 lg:p-5 hover:bg-neutral-50 transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {d.firstName?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="font-semibold text-neutral-900 truncate">
                      {d.firstName} {d.lastName}
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[d.status]}`}
                    >
                      {STATUS_LABELS[d.status]}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-500 truncate mt-0.5">
                    {d.services?.slice(0, 3).join(" · ") || "—"}
                  </div>
                </div>
                <div className="hidden sm:block text-right text-xs text-neutral-500 flex-shrink-0">
                  {d.createdAt?.toDate().toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                    Demande de devis
                  </div>
                  <div className="font-bold text-neutral-900 text-lg mt-0.5">
                    {selected.firstName} {selected.lastName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 text-neutral-500"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                    Statut
                  </div>
                  <div className="flex gap-2">
                    {(["new", "in_progress", "done"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateStatus(selected.id, s)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                          selected.status === s
                            ? STATUS_STYLES[s] + " shadow-sm"
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-brand-400"
                        }`}
                      >
                        {s === "done" && <FontAwesomeIcon icon={faCircleCheck} className="text-[10px]" />}
                        {s === "in_progress" && <FontAwesomeIcon icon={faClock} className="text-[10px]" />}
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
                  >
                    <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                    </span>
                    <div className="text-sm">
                      <div className="text-xs text-neutral-500">Email</div>
                      <div className="font-medium text-neutral-900">
                        {selected.email}
                      </div>
                    </div>
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
                  >
                    <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={faPhone} className="text-sm" />
                    </span>
                    <div className="text-sm">
                      <div className="text-xs text-neutral-500">Téléphone</div>
                      <div className="font-medium text-neutral-900">
                        {selected.phone}
                      </div>
                    </div>
                  </a>
                  {selected.postalCode && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100">
                      <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                      </span>
                      <div className="text-sm">
                        <div className="text-xs text-neutral-500">Code postal</div>
                        <div className="font-medium text-neutral-900">
                          {selected.postalCode}
                        </div>
                      </div>
                    </div>
                  )}
                  {selected.createdAt && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100">
                      <span className="w-9 h-9 rounded-lg bg-neutral-50 text-neutral-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                      </span>
                      <div className="text-sm">
                        <div className="text-xs text-neutral-500">Reçue le</div>
                        <div className="font-medium text-neutral-900">
                          {selected.createdAt.toDate().toLocaleString("fr-FR")}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selected.services?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                      Services demandés
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.services.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-800 border border-brand-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {selected.surface && (
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                        Surface
                      </div>
                      <div className="text-sm font-semibold text-neutral-900 mt-1">
                        {selected.surface}
                      </div>
                    </div>
                  )}
                  {selected.budget && (
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                        Budget
                      </div>
                      <div className="text-sm font-semibold text-neutral-900 mt-1">
                        {selected.budget}
                      </div>
                    </div>
                  )}
                  {selected.timing && (
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                        Délai
                      </div>
                      <div className="text-sm font-semibold text-neutral-900 mt-1">
                        {selected.timing}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                    Description du projet
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {selected.project || "—"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(selected.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 font-semibold text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  Supprimer la demande
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
