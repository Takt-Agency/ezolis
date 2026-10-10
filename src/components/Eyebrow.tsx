import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  icon: IconDefinition;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export default function Eyebrow({
  icon,
  children,
  tone = "light",
  className = "mb-5",
}: Props) {
  const dark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border ${
        dark
          ? "bg-white/5 border-white/15"
          : "bg-white/80 border-brand-200/70 shadow-sm shadow-brand-900/5 backdrop-blur"
      } ${className}`}
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-600 text-white">
        <FontAwesomeIcon icon={icon} className="text-[11px]" />
      </span>
      <span
        className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${
          dark ? "text-brand-300" : "text-brand-800"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
