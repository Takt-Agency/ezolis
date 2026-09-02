import LegalLayout from "../components/LegalLayout";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      icon={faShieldHalved}
      intro="La présente politique de confidentialité décrit comment EZOLIS collecte, utilise et protège les données personnelles des utilisateurs de son site internet, conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi Informatique et Libertés."
      updatedAt="01/09/2026"
    >
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles collectées sur
        le site est&nbsp;:
      </p>
      <div className="info-card">
        <p><strong>EZOLIS</strong></p>
        <p>106 avenue de St Louis, 13015 Marseille</p>
        <p>Email : <a href="mailto:contact@ezolis.net">contact@ezolis.net</a></p>
        <p>Téléphone : <a href="tel:0662244083">06 62 24 40 83</a></p>
      </div>

      <h2>2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires à nos services :</p>
      <ul>
        <li>Identité : nom, prénom</li>
        <li>Coordonnées : adresse email, numéro de téléphone, code postal</li>
        <li>Contenu de votre demande : description du projet, surface, budget, délais</li>
        <li>Données techniques : adresse IP, type de navigateur, pages consultées (à des fins statistiques)</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées exclusivement pour :</p>
      <ul>
        <li>Répondre à vos demandes de devis et de contact</li>
        <li>Assurer le suivi de nos prestations</li>
        <li>Vous adresser, avec votre accord, des informations sur nos services</li>
        <li>Respecter nos obligations légales et comptables</li>
        <li>Améliorer la qualité de notre site et de nos services</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Le traitement de vos données repose sur votre consentement (formulaire
        de contact), l'exécution d'un contrat (devis, prestation) et le respect
        de nos obligations légales.
      </p>

      <h2>5. Destinataires des données</h2>
      <p>
        Vos données sont destinées uniquement à EZOLIS. Elles ne sont ni
        vendues, ni louées, ni cédées à des tiers à des fins commerciales.
      </p>
      <p>
        Elles peuvent être communiquées à nos sous-traitants techniques
        (hébergeur OVH, service de messagerie) dans le cadre strict de leur
        mission et sous notre contrôle.
      </p>

      <h2>6. Durée de conservation</h2>
      <ul>
        <li><strong>Prospects (formulaire de contact) :</strong> 3 ans à compter du dernier contact</li>
        <li><strong>Clients :</strong> pendant la durée de la relation contractuelle + 10 ans (obligations comptables)</li>
        <li><strong>Cookies :</strong> 13 mois maximum</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos
        données&nbsp;:
      </p>
      <ul>
        <li>Droit d'accès et de rectification</li>
        <li>Droit à l'effacement (droit à l'oubli)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit d'opposition au traitement</li>
        <li>Droit de retirer votre consentement à tout moment</li>
      </ul>
      <p>
        Pour exercer vos droits, contactez-nous à{" "}
        <a href="mailto:contact@ezolis.net">contact@ezolis.net</a> en joignant un
        justificatif d'identité. Nous nous engageons à répondre sous 1 mois.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>.
      </p>

      <h2>8. Sécurité des données</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles
        appropriées pour protéger vos données contre tout accès non autorisé,
        modification, divulgation ou destruction. Notre hébergeur OVH est
        certifié conforme aux standards de sécurité les plus élevés.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Le site utilise des cookies strictement nécessaires à son fonctionnement.
        Aucun cookie publicitaire ou de traçage n'est utilisé sans votre
        consentement explicite.
      </p>

      <h2>10. Modification de la politique</h2>
      <p>
        La présente politique peut être modifiée à tout moment pour rester en
        conformité avec la législation. Nous vous invitons à la consulter
        régulièrement.
      </p>
    </LegalLayout>
  );
}
