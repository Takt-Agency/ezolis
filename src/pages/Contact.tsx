import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEnvelopeOpenText,
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faShieldHalved,
  faEllipsis,
  faRoute,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { services as servicesData } from "../data/services";
import { db } from "../lib/firebase";
import Eyebrow from "../components/Eyebrow";
import Breadcrumb from "../components/Breadcrumb";

const budgets = [
  "Moins de 5 000 €",
  "5 000 € - 15 000 €",
  "15 000 € - 30 000 €",
  "30 000 € - 60 000 €",
  "Plus de 60 000 €",
  "À définir",
];

const timings = [
  "Dès que possible",
  "Sous 1 mois",
  "Sous 3 mois",
  "Sous 6 mois",
  "Pas de date précise",
];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function toggleService(label: string) {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      await addDoc(collection(db, "devis"), {
        firstName: (fd.get("firstName") as string) || "",
        lastName: (fd.get("lastName") as string) || "",
        email: (fd.get("email") as string) || "",
        phone: (fd.get("phone") as string) || "",
        postalCode: (fd.get("postalCode") as string) || "",
        project: (fd.get("project") as string) || "",
        surface: (fd.get("surface") as string) || "",
        budget: (fd.get("budget") as string) || "",
        timing: (fd.get("timing") as string) || "",
        services: selectedServices,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setSelectedServices([]);
      formRef.current?.reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError(
        "Une erreur s'est produite. Merci de réessayer ou de nous appeler au 06 62 24 40 83.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-hero relative pt-8 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
        <div className="absolute top-10 -right-20 w-96 h-96 bg-brand-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb items={[{ label: "Contact & devis" }]} />

            <div className="max-w-3xl">
              <Eyebrow icon={faEnvelopeOpenText}>Contact &amp; devis</Eyebrow>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                Contactez-nous ou
                <br />
                <span className="text-brand-600">demandez votre devis</span>
              </h1>

              <p className="mt-5 text-neutral-600 text-base lg:text-lg leading-relaxed">
                Une question, un projet à chiffrer ou une urgence ? Notre
                équipe vous répond rapidement. Devis gratuit et sans engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-4"
            >
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-6">Nos coordonnées</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      <div className="text-sm leading-relaxed pt-1">
                        106 avenue de St Louis
                        <br />
                        13015 Marseille
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <a
                        href="tel:0662244083"
                        className="text-sm font-medium hover:text-brand-100 transition-colors"
                      >
                        06 62 24 40 83
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <a
                        href="mailto:contact@ezolis.net"
                        className="text-sm font-medium hover:text-brand-100 transition-colors"
                      >
                        contact@ezolis.net
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                        <FontAwesomeIcon icon={faClock} />
                      </span>
                      <div className="text-sm">Lun - Sam : 8h - 19h</div>
                    </li>
                  </ul>

                  <div className="mt-7 pt-6 border-t border-white/15 flex items-center gap-3">
                    <a
                      href="https://wa.me/33662244083"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=106+avenue+de+St+Louis+13015+Marseille"
                target="_blank"
                rel="noreferrer"
                className="group relative block rounded-3xl overflow-hidden border border-neutral-100 shadow-md hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <iframe
                    title="Ezolis - 106 av. St Louis, Marseille"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5787.5!2d5.395!3d43.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s106+avenue+de+St+Louis+13015+Marseille!5e0!3m2!1sfr!2sfr!4v1700000000000"
                    className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-brand-600 group-hover:bg-brand-700 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg transition-colors">
                  <FontAwesomeIcon icon={faRoute} className="text-[10px]" />
                  Itinéraire
                </div>
              </a>

              <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faShieldHalved} />
                  </span>
                  <div className="font-semibold text-neutral-900">
                    Vos données protégées
                  </div>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Vos informations sont utilisées uniquement pour vous
                  recontacter. Aucun partage à des tiers.
                </p>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 lg:p-10 border border-neutral-100 shadow-xl space-y-8"
              >
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span>{error}</span>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Quel type de travaux souhaitez-vous réaliser ?{" "}
                    <span className="text-neutral-400 font-normal">
                      (plusieurs choix possibles)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesData.map((s) => {
                      const active = selectedServices.includes(s.shortTitle);
                      return (
                        <button
                          type="button"
                          key={s.slug}
                          onClick={() => toggleService(s.shortTitle)}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                            active
                              ? "bg-brand-600 text-white border-brand-600 shadow-md"
                              : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-400 hover:text-brand-700"
                          }`}
                        >
                          <FontAwesomeIcon icon={s.icon} className="text-xs" />
                          {s.shortTitle}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => toggleService("Autre")}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                        selectedServices.includes("Autre")
                          ? "bg-brand-600 text-white border-brand-600 shadow-md"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-400 hover:text-brand-700"
                      }`}
                    >
                      <FontAwesomeIcon icon={faEllipsis} className="text-xs" />
                      Autre
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-semibold text-neutral-900 mb-2"
                  >
                    Décrivez votre projet
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    rows={4}
                    required
                    placeholder="Décrivez brièvement les travaux souhaités..."
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="surface"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Surface
                    </label>
                    <input
                      id="surface"
                      name="surface"
                      type="text"
                      placeholder="Ex : 80 m²"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Budget estimatif
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm bg-white text-neutral-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    >
                      <option value="">Sélectionner</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="timing"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Quand ?
                    </label>
                    <select
                      id="timing"
                      name="timing"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm bg-white text-neutral-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    >
                      <option value="">Sélectionner</option>
                      {timings.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-neutral-900 mb-4">
                    Vos coordonnées
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prénom *"
                      required
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nom *"
                      required
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone *"
                      required
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail *"
                      required
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Code postal"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition sm:col-span-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
                    En envoyant ce formulaire, vous acceptez d'être recontacté
                    par Ezolis concernant votre demande.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting || submitted}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:-translate-y-0.5 disabled:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours…
                      </>
                    ) : submitted ? (
                      "Merci ! Nous vous recontactons."
                    ) : (
                      <>
                        Envoyer ma demande
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="tel:0662244083"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-neutral-100 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center text-brand-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <div>
                <div className="text-xs text-neutral-500">Appelez</div>
                <div className="font-semibold text-neutral-900">
                  06 62 24 40 83
                </div>
              </div>
            </a>
            <a
              href="https://wa.me/33662244083"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-neutral-100 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center text-brand-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faWhatsapp} />
              </span>
              <div>
                <div className="text-xs text-neutral-500">Message</div>
                <div className="font-semibold text-neutral-900">WhatsApp</div>
              </div>
            </a>
            <a
              href="mailto:contact@ezolis.net"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-neutral-100 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center text-brand-600 group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <div>
                <div className="text-xs text-neutral-500">Écrivez</div>
                <div className="font-semibold text-neutral-900">
                  contact@ezolis.net
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
