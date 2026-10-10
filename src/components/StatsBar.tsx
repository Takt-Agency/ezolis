import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faScrewdriverWrench,
  faUsers,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  { icon: faHouseChimney, value: "15+", label: "Années d'expérience" },
  { icon: faScrewdriverWrench, value: "15/an", label: "Projets réalisés" },
  { icon: faUsers, value: "2", label: "Équipes spécialisées" },
  { icon: faUserCheck, value: "24/7", label: "Dépannage & urgence" },
];

export default function StatsBar() {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-neutral-100 shadow-2xl shadow-brand-900/10 px-5 py-6 lg:px-6 lg:py-7">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:divide-x md:divide-neutral-100">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3.5 md:justify-center md:px-4"
          >
            <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600">
              <FontAwesomeIcon icon={s.icon} className="text-lg" />
            </span>
            <div>
              <div className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 leading-none">
                {s.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-neutral-500">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
