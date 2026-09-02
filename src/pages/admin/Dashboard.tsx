import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  collection,
  getCountFromServer,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelopeOpenText,
  faImages,
  faCircleCheck,
  faClock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { db } from "../../lib/firebase";

type Stat = {
  label: string;
  value: number | string;
  icon: IconDefinition;
  color: string;
  to?: string;
  loading?: boolean;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Demandes reçues", value: "…", icon: faEnvelopeOpenText, color: "brand", to: "/admin/devis", loading: true },
    { label: "Nouvelles (7j)", value: "…", icon: faClock, color: "amber", loading: true },
    { label: "Traitées", value: "…", icon: faCircleCheck, color: "emerald", loading: true },
    { label: "Réalisations", value: "…", icon: faImages, color: "blue", to: "/admin/realisations", loading: true },
  ]);

  useEffect(() => {
    async function loadStats() {
      try {
        const devisRef = collection(db, "devis");
        const projectsRef = collection(db, "projects");

        const sevenDaysAgo = Timestamp.fromDate(
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        );

        const [totalDevis, recentDevis, doneDevis, totalProjects] = await Promise.all([
          getCountFromServer(devisRef),
          getCountFromServer(query(devisRef, where("createdAt", ">=", sevenDaysAgo))),
          getCountFromServer(query(devisRef, where("status", "==", "done"))),
          getCountFromServer(projectsRef),
        ]);

        setStats([
          {
            label: "Demandes reçues",
            value: totalDevis.data().count,
            icon: faEnvelopeOpenText,
            color: "brand",
            to: "/admin/devis",
          },
          {
            label: "Nouvelles (7j)",
            value: recentDevis.data().count,
            icon: faClock,
            color: "amber",
          },
          {
            label: "Traitées",
            value: doneDevis.data().count,
            icon: faCircleCheck,
            color: "emerald",
          },
          {
            label: "Réalisations",
            value: totalProjects.data().count,
            icon: faImages,
            color: "blue",
            to: "/admin/realisations",
          },
        ]);
      } catch {
        setStats((prev) => prev.map((s) => ({ ...s, value: 0, loading: false })));
      }
    }

    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
          Tableau de bord
        </h1>
        <p className="text-neutral-500 mt-1">
          Vue d'ensemble de votre activité Ezolis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                    {s.label}
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 mt-2">
                    {s.loading ? (
                      <span className="inline-block w-10 h-8 bg-neutral-100 rounded animate-pulse" />
                    ) : (
                      s.value
                    )}
                  </div>
                </div>
                <span
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    s.color === "brand"
                      ? "bg-brand-100 text-brand-700"
                      : s.color === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : s.color === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <FontAwesomeIcon icon={s.icon} />
                </span>
              </div>
            </motion.div>
          );
          return s.to ? (
            <Link key={s.label} to={s.to}>
              {inner}
            </Link>
          ) : (
            <div key={s.label}>{inner}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Link
          to="/admin/devis"
          className="group bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-3xl mb-4" />
            <h2 className="text-xl font-bold mb-2">Demandes de devis</h2>
            <p className="text-white/80 text-sm mb-4">
              Consultez et gérez les demandes reçues via le formulaire du site.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              Voir les demandes
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        <Link
          to="/admin/realisations"
          className="group bg-white border border-neutral-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <FontAwesomeIcon icon={faImages} className="text-3xl text-brand-600 mb-4" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Réalisations
          </h2>
          <p className="text-neutral-500 text-sm mb-4">
            Ajoutez, modifiez ou supprimez vos projets réalisés avec leurs images.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            Gérer les projets
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs transition-transform group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
