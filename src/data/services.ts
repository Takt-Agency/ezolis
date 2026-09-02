import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouseChimney,
  faTemperatureLow,
  faBorderAll,
  faPaintRoller,
  faWater,
  faBuilding,
  faFaucet,
  faBolt,
  faFan,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

import imgRenovation from "../assets/image service/Rénovation générale.webp";
import imgIsolation from "../assets/image service/Isolation intérieure & extérieure.webp";
import imgCarrelage from "../assets/image service/Carrelage.webp";
import imgPeinture from "../assets/image service/Peinture & finitions.webp";
import imgPiscine from "../assets/image service/Piscine.webp";
import imgFacade from "../assets/image service/facade.webp";
import imgPlomberie from "../assets/image service/Plomberie.webp";
import fallbackImg from "../assets/hero-image.png";

export type Service = {
  slug: string;
  icon: IconDefinition;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  accent: string;
  image: string;
  intro: string;
  features: string[];
  process: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "renovation-generale",
    icon: faHouseChimney,
    title: "Rénovation générale",
    shortTitle: "Rénovation générale",
    tagline: "De la conception à la livraison, tous vos travaux gérés par un seul interlocuteur.",
    description:
      "Transformation complète de votre intérieur et extérieur avec un accompagnement sur-mesure.",
    accent: "from-brand-500/20 to-brand-600/5",
    image: imgRenovation,
    intro:
      "Ezolis coordonne l'ensemble de vos travaux de rénovation, du gros œuvre au second œuvre. Nos deux équipes spécialisées interviennent en parfaite complémentarité pour vous livrer un projet clé en main.",
    features: [
      "Rénovation complète d'appartement, maison ou local",
      "Coordination de tous les corps de métier",
      "Gestion des démarches et autorisations",
      "Sélection des matériaux et fournisseurs",
      "Suivi de chantier régulier",
      "Livraison propre et finitions soignées",
    ],
    process: [
      { title: "Visite technique", text: "Nous évaluons ensemble l'ampleur des travaux à réaliser." },
      { title: "Devis détaillé", text: "Vous recevez un devis clair, poste par poste." },
      { title: "Planification", text: "Nous organisons les interventions par phase." },
      { title: "Exécution", text: "Nos équipes réalisent les travaux dans les règles de l'art." },
    ],
    faq: [
      {
        q: "Combien de temps dure une rénovation complète ?",
        a: "En moyenne 2 à 6 mois selon la surface et l'ampleur des travaux. Un planning précis est fourni avec le devis.",
      },
      {
        q: "Puis-je continuer à habiter pendant les travaux ?",
        a: "Cela dépend de l'ampleur. Nous organisons le chantier par zones lorsque possible pour limiter la gêne.",
      },
    ],
  },
  {
    slug: "isolation",
    icon: faTemperatureLow,
    title: "Isolation intérieure & extérieure",
    shortTitle: "Isolation",
    tagline: "Réduisez vos factures énergétiques et gagnez en confort au quotidien.",
    description:
      "Améliorez votre confort thermique et réduisez durablement vos dépenses énergétiques.",
    accent: "from-blue-500/20 to-blue-600/5",
    image: imgIsolation,
    intro:
      "Une bonne isolation, c'est jusqu'à 30 % d'économies sur votre facture énergétique. Nous étudions votre logement et vous proposons les solutions les plus adaptées.",
    features: [
      "Isolation par l'extérieur (ITE)",
      "Isolation par l'intérieur (ITI)",
      "Isolation des combles perdus ou aménagés",
      "Isolation des murs, sols et plafonds",
      "Matériaux performants et écologiques",
      "Éligibilité aux aides financières",
    ],
    process: [
      { title: "Audit thermique", text: "Nous identifions les déperditions de chaleur de votre logement." },
      { title: "Solutions adaptées", text: "Nous vous conseillons les matériaux les mieux adaptés à votre bâti." },
      { title: "Pose professionnelle", text: "Installation dans le respect des normes RT et RE." },
      { title: "Résultats mesurables", text: "Confort thermique amélioré dès la première saison." },
    ],
    faq: [
      {
        q: "Quelles aides sont disponibles ?",
        a: "MaPrimeRénov', CEE, éco-PTZ, TVA à 5,5 %. Nous vous accompagnons dans vos démarches.",
      },
    ],
  },
  {
    slug: "carrelage",
    icon: faBorderAll,
    title: "Carrelage",
    shortTitle: "Carrelage",
    tagline: "Une pose précise pour des sols et murs à la finition parfaite.",
    description:
      "Pose de carrelage, faïence, sols intérieurs et extérieurs avec finition parfaite.",
    accent: "from-amber-500/20 to-amber-600/5",
    image: imgCarrelage,
    intro:
      "Que ce soit pour une salle de bain, une cuisine, un salon ou une terrasse, nous réalisons la pose de vos carrelages avec précision et souci du détail.",
    features: [
      "Pose de carrelage grand format",
      "Faïence murale (cuisine, salle de bain)",
      "Sols intérieurs et extérieurs",
      "Carrelage antidérapant piscine",
      "Réfection de joints",
      "Découpes techniques et finitions",
    ],
    process: [
      { title: "Préparation du support", text: "Vérification et mise à niveau du support existant." },
      { title: "Choix des matériaux", text: "Sélection de carreaux adaptés à l'usage et à l'esthétique." },
      { title: "Pose méthodique", text: "Alignement précis, coupes soignées, joints réguliers." },
      { title: "Nettoyage & livraison", text: "Nettoyage complet avant remise du chantier." },
    ],
    faq: [
      {
        q: "Quel type de carrelage pour une terrasse ?",
        a: "Un carrelage grès cérame antidérapant classé R11 minimum, résistant au gel.",
      },
    ],
  },
  {
    slug: "peinture",
    icon: faPaintRoller,
    title: "Peinture & finitions",
    shortTitle: "Peinture",
    tagline: "Donnez une nouvelle identité à vos espaces avec des finitions soignées.",
    description:
      "Peinture intérieure et extérieure, finitions soignées pour des espaces uniques.",
    accent: "from-rose-500/20 to-rose-600/5",
    image: imgPeinture,
    intro:
      "De la préparation des supports aux finitions, nous apportons un soin particulier à chaque étape pour un rendu impeccable qui dure dans le temps.",
    features: [
      "Peinture intérieure (murs, plafonds, boiseries)",
      "Peinture extérieure et façade",
      "Préparation des supports (enduit, ponçage)",
      "Papier peint et revêtements muraux",
      "Peintures décoratives et effets",
      "Peintures écologiques",
    ],
    process: [
      { title: "Diagnostic", text: "Analyse des supports et conseils sur les finitions." },
      { title: "Préparation", text: "Enduit, ponçage, protection des surfaces." },
      { title: "Application", text: "Sous-couche puis 2 couches de finition minimum." },
      { title: "Finitions", text: "Vérification finale et retouches si nécessaire." },
    ],
    faq: [
      {
        q: "Combien de couches sont nécessaires ?",
        a: "En général une sous-couche + 2 couches de finition pour un rendu optimal.",
      },
    ],
  },
  {
    slug: "piscine",
    icon: faWater,
    title: "Piscine",
    shortTitle: "Piscine",
    tagline: "Construction, rénovation et entretien pour profiter pleinement de l'été.",
    description:
      "Construction, rénovation et entretien de piscines pour profiter tout l'été.",
    accent: "from-cyan-500/20 to-cyan-600/5",
    image: imgPiscine,
    intro:
      "Sous le soleil marseillais, une piscine est un investissement plaisir. Nous vous accompagnons dans la création, rénovation ou entretien de votre espace aquatique.",
    features: [
      "Construction de piscines maçonnées",
      "Rénovation complète (étanchéité, revêtement)",
      "Changement de liner ou de carrelage",
      "Local technique et filtration",
      "Aménagement des plages",
      "Mise en conformité sécurité",
    ],
    process: [
      { title: "Étude de faisabilité", text: "Terrain, réglementation, budget : nous étudions votre projet." },
      { title: "Terrassement & maçonnerie", text: "Réalisation du bassin par nos équipes gros œuvre." },
      { title: "Étanchéité & finition", text: "Revêtement, plages, éclairage, filtration." },
      { title: "Mise en eau", text: "Test complet et livraison prête à profiter." },
    ],
    faq: [
      {
        q: "Faut-il un permis de construire ?",
        a: "Selon la taille et la couverture : déclaration préalable ou permis. Nous vous accompagnons.",
      },
    ],
  },
  {
    slug: "facade",
    icon: faBuilding,
    title: "Façade",
    shortTitle: "Façade",
    tagline: "Ravalement, étanchéité et embellissement pour un extérieur durable.",
    description:
      "Ravalement, étanchéité et traitement des façades pour un extérieur durable.",
    accent: "from-stone-500/20 to-stone-600/5",
    image: imgFacade,
    intro:
      "Votre façade est la première image de votre bien. Nous la préservons et l'embellissons avec des techniques adaptées à chaque type de bâti.",
    features: [
      "Ravalement complet",
      "Nettoyage haute pression",
      "Traitement anti-mousse et hydrofuge",
      "Enduits de finition (traditionnel, monocouche)",
      "Isolation thermique par l'extérieur",
      "Peinture façade tous supports",
    ],
    process: [
      { title: "Diagnostic", text: "État de la façade, fissures, humidité, revêtement existant." },
      { title: "Préparation", text: "Nettoyage, réparation, application des sous-couches." },
      { title: "Application", text: "Enduit ou peinture selon la solution choisie." },
      { title: "Protection", text: "Traitement hydrofuge pour prolonger la durée de vie." },
    ],
    faq: [
      {
        q: "À quelle fréquence rénover sa façade ?",
        a: "Un ravalement tous les 10 à 15 ans est recommandé. La loi impose un ravalement tous les 10 ans dans certaines communes.",
      },
    ],
  },
  {
    slug: "plomberie",
    icon: faFaucet,
    title: "Plomberie",
    shortTitle: "Plomberie",
    tagline: "Installation, dépannage et réparation de vos équipements sanitaires.",
    description:
      "Installation, dépannage et réparation de vos équipements sanitaires.",
    accent: "from-sky-500/20 to-sky-600/5",
    image: imgPlomberie,
    intro:
      "De l'installation neuve au dépannage d'urgence, nos plombiers interviennent rapidement et efficacement pour tous vos besoins.",
    features: [
      "Installation sanitaire complète",
      "Dépannage fuite, débouchage, chauffe-eau",
      "Rénovation salle de bain",
      "Remplacement robinetterie",
      "Installation chauffe-eau et ballon",
      "Détection de fuites",
    ],
    process: [
      { title: "Diagnostic rapide", text: "Nous identifions la cause du problème." },
      { title: "Devis transparent", text: "Vous validez avant intervention." },
      { title: "Intervention", text: "Réparation ou installation dans les règles." },
      { title: "Garantie", text: "Nos interventions sont garanties." },
    ],
    faq: [
      {
        q: "Intervenez-vous en urgence ?",
        a: "Oui, disponibilité 7j/7 pour les urgences plomberie.",
      },
    ],
  },
  {
    slug: "electricite",
    icon: faBolt,
    title: "Électricité",
    shortTitle: "Électricité",
    tagline: "Installation, rénovation et dépannage électrique aux normes en vigueur.",
    description:
      "Installation, rénovation et dépannage électrique aux normes en vigueur.",
    accent: "from-yellow-500/20 to-yellow-600/5",
    image: fallbackImg,
    intro:
      "Une installation électrique conforme et sécurisée, c'est la garantie de votre tranquillité. Nous intervenons dans le respect des normes NF C 15-100.",
    features: [
      "Mise aux normes complète",
      "Rénovation tableau électrique",
      "Installation neuve (prises, points lumineux)",
      "Domotique et éclairage LED",
      "Dépannage panne, court-circuit",
      "Attestation Consuel",
    ],
    process: [
      { title: "Étude", text: "Analyse de votre installation existante." },
      { title: "Devis", text: "Détail des interventions et matériel." },
      { title: "Réalisation", text: "Travaux conformes NF C 15-100." },
      { title: "Contrôle", text: "Vérification et attestation." },
    ],
    faq: [
      {
        q: "Faut-il refaire toute l'installation ?",
        a: "Pas toujours. Nous vous conseillons selon l'état existant et vos besoins.",
      },
    ],
  },
  {
    slug: "vmc-extraction",
    icon: faFan,
    title: "VMC / Extraction",
    shortTitle: "VMC / Extraction",
    tagline: "Un air sain à la maison grâce à une ventilation efficace.",
    description:
      "Systèmes de ventilation et d'extraction pour un air sain à la maison.",
    accent: "from-teal-500/20 to-teal-600/5",
    image: fallbackImg,
    intro:
      "Une bonne ventilation évite l'humidité, les moisissures et améliore la qualité de l'air intérieur. Nous installons et entretenons tous types de VMC.",
    features: [
      "VMC simple flux hygro A / hygro B",
      "VMC double flux",
      "Extraction cuisine et sanitaires",
      "Entretien et nettoyage des bouches",
      "Remplacement de moteur",
      "Diagnostic humidité",
    ],
    process: [
      { title: "Diagnostic", text: "Analyse de vos besoins et contraintes." },
      { title: "Choix du système", text: "Simple ou double flux, hygro-réglable." },
      { title: "Installation", text: "Pose du caisson, gaines et bouches." },
      { title: "Mise en service", text: "Réglage et vérification des débits." },
    ],
    faq: [
      {
        q: "Comment entretenir sa VMC ?",
        a: "Nettoyage des bouches tous les 3 mois, entretien complet tous les 3 ans.",
      },
    ],
  },
  {
    slug: "climatisation",
    icon: faSnowflake,
    title: "Climatisation",
    shortTitle: "Climatisation",
    tagline: "Installation, entretien et dépannage de vos climatisations toute l'année.",
    description:
      "Installation, entretien et dépannage de vos climatisations toute l'année.",
    accent: "from-indigo-500/20 to-indigo-600/5",
    image: fallbackImg,
    intro:
      "Fraîcheur en été, chauffage en hiver : la climatisation réversible est une solution efficace. Nous installons et entretenons tous types d'équipements.",
    features: [
      "Climatisation réversible mono-split",
      "Climatisation multi-splits",
      "Pompe à chaleur air/air et air/eau",
      "Entretien annuel obligatoire",
      "Dépannage tous équipements",
      "Certification RGE QualiPAC",
    ],
    process: [
      { title: "Bilan thermique", text: "Calcul de la puissance nécessaire selon vos pièces." },
      { title: "Choix du matériel", text: "Marques fiables, performances garanties." },
      { title: "Installation", text: "Pose de l'unité intérieure et extérieure." },
      { title: "Mise en service", text: "Test complet et formation à l'utilisation." },
    ],
    faq: [
      {
        q: "Faut-il entretenir sa climatisation ?",
        a: "Oui, un entretien annuel est obligatoire pour les équipements > 4 kg de fluide.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
