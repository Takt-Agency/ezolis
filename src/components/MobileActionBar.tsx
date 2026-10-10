import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faPhone } from "@fortawesome/free-solid-svg-icons";

// Barre d'action fixe en bas d'écran sur mobile : appel direct + devis.
export default function MobileActionBar() {
  const { pathname } = useLocation();
  const onContact = pathname === "/contact";

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-white via-white/95 to-white/0 pointer-events-none">
      <div className="flex gap-2.5 pointer-events-auto">
        <a
          href="tel:0662244083"
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full font-semibold py-3.5 shadow-lg transition-colors ${
            onContact
              ? "bg-brand-600 text-white shadow-brand-600/30"
              : "bg-white text-neutral-900 border border-neutral-200 shadow-neutral-900/10"
          }`}
        >
          <FontAwesomeIcon icon={faPhone} className={onContact ? "" : "text-brand-600"} />
          Appeler
        </a>
        {!onContact && (
          <Link
            to="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 text-white font-semibold py-3.5 shadow-lg shadow-brand-600/30"
          >
            <FontAwesomeIcon icon={faFileLines} />
            Devis gratuit
          </Link>
        )}
      </div>
    </div>
  );
}
