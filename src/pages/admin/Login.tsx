import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faArrowRight,
  faTriangleExclamation,
  faHouse,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-Ezolis.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur d'authentification";
      if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
        setError("Email ou mot de passe incorrect.");
      } else if (msg.includes("too-many-requests")) {
        setError("Trop de tentatives. Réessayez plus tard.");
      } else {
        setError("Impossible de se connecter. Vérifiez vos identifiants.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-brand-50 via-white to-brand-100 flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-0 -left-40 w-96 h-96 bg-brand-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-brand-300/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-700 transition-colors mb-6"
        >
          <FontAwesomeIcon icon={faHouse} className="text-xs" />
          Retour au site
        </Link>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-2xl p-8 lg:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <img src={logo} alt="Ezolis" className="h-12 w-auto mb-5" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] text-brand-700 uppercase">
                Espace administrateur
              </span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Connexion
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Accédez au tableau de bord Ezolis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl"
              >
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mt-0.5 flex-shrink-0"
                />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ezolis.fr"
                  className="w-full rounded-2xl border border-neutral-200 pl-11 pr-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-900 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FontAwesomeIcon icon={faLock} className="text-sm" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-neutral-200 pl-11 pr-11 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Masquer" : "Afficher"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-sm"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 text-white font-semibold px-6 py-3.5 rounded-full shadow-lg transition-all hover:-translate-y-0.5 disabled:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion…
                </>
              ) : (
                <>
                  Se connecter
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Accès réservé aux administrateurs Ezolis.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
