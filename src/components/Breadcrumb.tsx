import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";

type Crumb = { label: string; to?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-brand-700 transition-colors"
          >
            <FontAwesomeIcon icon={faHouse} className="text-xs" />
            Accueil
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 min-w-0">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[9px] text-neutral-300"
            />
            {item.to ? (
              <Link
                to={item.to}
                className="hover:text-brand-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="font-medium text-neutral-800 truncate max-w-[16rem] sm:max-w-md"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
