import { useEffect } from "react";
import { motion } from "motion/react";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Eyebrow from "./Eyebrow";
import Breadcrumb from "./Breadcrumb";

type Props = {
  title: string;
  intro?: string;
  icon?: IconDefinition;
  updatedAt?: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  intro,
  icon = faFileLines,
  updatedAt,
  children,
}: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [title]);

  return (
    <>
      <section className="page-hero relative pt-8 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb items={[{ label: title }]} />

            <Eyebrow icon={icon}>Informations légales</Eyebrow>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              {title}
            </h1>

            {intro && (
              <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
                {intro}
              </p>
            )}

            {updatedAt && (
              <p className="mt-4 text-xs text-neutral-500">
                Dernière mise à jour : {updatedAt}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose-content"
          >
            {children}
          </motion.article>
        </div>

        <style>{`
          .prose-content {
            color: #404040;
            font-size: 15px;
            line-height: 1.75;
          }
          .prose-content h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #171717;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
          }
          .prose-content h2:first-child { margin-top: 0; }
          .prose-content h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #262626;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
          }
          .prose-content p {
            margin: 0.75rem 0;
          }
          .prose-content ul {
            list-style: disc;
            padding-left: 1.5rem;
            margin: 0.75rem 0;
          }
          .prose-content ul li { margin: 0.35rem 0; }
          .prose-content a {
            color: var(--color-brand-700, #556131);
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .prose-content a:hover {
            color: var(--color-brand-800, #454e2b);
          }
          .prose-content strong { color: #171717; font-weight: 600; }
          .prose-content .info-card {
            background: #fafafa;
            border: 1px solid #e5e5e5;
            border-radius: 1rem;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
          }
          .prose-content .info-card p { margin: 0.25rem 0; }
        `}</style>
      </section>
    </>
  );
}
