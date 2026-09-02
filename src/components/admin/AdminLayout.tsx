import { useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGauge,
  faEnvelopeOpenText,
  faImages,
  faNewspaper,
  faRightFromBracket,
  faBars,
  faXmark,
  faArrowUpRightFromSquare,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-Ezolis.png";

type NavItem = { to: string; label: string; icon: IconDefinition; end?: boolean };

const navItems: NavItem[] = [
  { to: "/admin", label: "Tableau de bord", icon: faGauge, end: true },
  { to: "/admin/devis", label: "Demandes de devis", icon: faEnvelopeOpenText },
  { to: "/admin/realisations", label: "Réalisations", icon: faImages },
  { to: "/admin/blog", label: "Blog", icon: faNewspaper },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-100 flex-col">
        <SidebarContent onNavigate={() => {}} onLogout={handleLogout} email={user?.email ?? ""} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col"
            >
              <SidebarContent
                onNavigate={() => setMobileOpen(false)}
                onLogout={handleLogout}
                email={user?.email ?? ""}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64 min-w-0">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-100 h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
          >
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
          </button>

          <div className="hidden lg:block text-sm text-neutral-500">
            Bienvenue,{" "}
            <span className="font-semibold text-neutral-800">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors"
            >
              Voir le site
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-xs"
              />
            </Link>
            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  onNavigate,
  onLogout,
  email,
}: {
  onNavigate: () => void;
  onLogout: () => void;
  email: string;
}) {
  return (
    <>
      <div className="h-16 px-6 flex items-center border-b border-neutral-100">
        <Link to="/admin" onClick={onNavigate} className="flex items-center gap-2">
          <img src={logo} alt="Ezolis" className="h-9 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="px-3 mb-3 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
          Administration
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-neutral-500">Connecté</div>
            <div className="text-sm font-semibold text-neutral-900 truncate">
              {email}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
          Déconnexion
        </button>
      </div>
    </>
  );
}
