import LegalLayout from "../components/LegalLayout";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";

export default function CGV() {
  return (
    <LegalLayout
      title="Conditions générales de vente"
      icon={faFileContract}
      intro="Les présentes conditions générales de vente (CGV) régissent l'ensemble des prestations de services proposées par EZOLIS à ses clients particuliers et professionnels."
      updatedAt="01/09/2026"
    >
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes CGV ont pour objet de définir les modalités et conditions
        dans lesquelles EZOLIS réalise des prestations de rénovation, dépannage,
        installation et intervention technique (plomberie, électricité,
        peinture, carrelage, isolation, climatisation, VMC, façade, piscine).
      </p>

      <h2>Article 2 — Devis et commande</h2>
      <p>
        Toute prestation fait l'objet d'un devis détaillé, gratuit et sans
        engagement. Le devis précise la nature des travaux, les matériaux
        utilisés, les délais estimés et le prix.
      </p>
      <p>
        Le devis est valable <strong>30 jours</strong> à compter de son
        émission. La commande devient ferme et définitive dès réception du
        devis daté et signé, accompagné de la mention manuscrite « bon pour
        accord » et, le cas échéant, de l'acompte demandé.
      </p>

      <h2>Article 3 — Prix</h2>
      <p>
        Les prix sont indiqués en euros, hors taxes et toutes taxes comprises.
        Le taux de TVA applicable est celui en vigueur au jour de
        l'établissement du devis (TVA réduite à 10 % ou 5,5 % applicable sous
        conditions pour les travaux dans les logements de plus de 2 ans).
      </p>
      <p>
        Tout travail supplémentaire non prévu au devis fera l'objet d'un devis
        complémentaire soumis à l'accord préalable du client.
      </p>

      <h2>Article 4 — Modalités de paiement</h2>
      <ul>
        <li><strong>Acompte :</strong> 30 % du montant TTC à la commande</li>
        <li><strong>Situations intermédiaires :</strong> selon avancement des travaux</li>
        <li><strong>Solde :</strong> à la réception des travaux</li>
      </ul>
      <p>
        Les paiements sont acceptés par virement bancaire, chèque ou espèces
        (dans la limite légale). Aucun escompte n'est accordé en cas de
        paiement anticipé.
      </p>

      <h2>Article 5 — Retard de paiement</h2>
      <p>
        Tout retard de paiement entraînera de plein droit l'application de
        pénalités calculées au taux d'intérêt légal majoré de 10 points, ainsi
        qu'une indemnité forfaitaire pour frais de recouvrement de 40 € pour
        les clients professionnels (articles L.441-6 et D.441-5 du Code de
        commerce).
      </p>

      <h2>Article 6 — Délais d'exécution</h2>
      <p>
        Les délais d'intervention sont donnés à titre indicatif. Ils peuvent
        varier en fonction des conditions météorologiques, des délais de
        livraison des matériaux ou d'événements de force majeure.
      </p>
      <p>
        Un retard raisonnable dans l'exécution des travaux ne peut donner lieu
        à aucune indemnité ou annulation de la commande.
      </p>

      <h2>Article 7 — Exécution des travaux</h2>
      <p>
        Le client s'engage à mettre à la disposition d'EZOLIS un accès libre
        aux zones concernées par les travaux, l'eau, l'électricité et un
        espace de stockage pour les matériaux et outils.
      </p>
      <p>
        Toute intervention supplémentaire liée à un défaut de préparation du
        chantier par le client pourra faire l'objet d'une facturation
        complémentaire.
      </p>

      <h2>Article 8 — Réception des travaux</h2>
      <p>
        À l'achèvement des travaux, un procès-verbal de réception peut être
        établi conjointement. Le client dispose d'un délai raisonnable pour
        formuler d'éventuelles réserves. À défaut, les travaux sont réputés
        acceptés sans réserve.
      </p>

      <h2>Article 9 — Garanties</h2>
      <ul>
        <li><strong>Garantie de parfait achèvement :</strong> 1 an après la réception</li>
        <li><strong>Garantie biennale (bon fonctionnement) :</strong> 2 ans pour les éléments d'équipement dissociables</li>
        <li><strong>Garantie décennale :</strong> 10 ans pour les travaux relevant du gros œuvre et de l'étanchéité</li>
      </ul>
      <p>
        EZOLIS est couvert par une assurance responsabilité civile
        professionnelle et une assurance décennale.
      </p>

      <h2>Article 10 — Droit de rétractation</h2>
      <p>
        Conformément aux articles L.221-18 et suivants du Code de la
        consommation, le client particulier dispose d'un délai de{" "}
        <strong>14 jours</strong> pour exercer son droit de rétractation à
        compter de la signature du devis, sauf demande expresse d'exécution
        anticipée des travaux.
      </p>

      <h2>Article 11 — Réclamations</h2>
      <p>
        Toute réclamation doit être adressée par écrit à EZOLIS dans un délai
        de 8 jours à compter de la constatation du désordre, à l'adresse{" "}
        <a href="mailto:contact@ezolis.net">contact@ezolis.net</a>.
      </p>
      <p>
        En cas de litige, le client peut recourir gratuitement à un médiateur
        de la consommation en vue d'une résolution amiable.
      </p>

      <h2>Article 12 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige
        non résolu amiablement, seuls les tribunaux du ressort du siège social
        d'EZOLIS seront compétents.
      </p>
    </LegalLayout>
  );
}
