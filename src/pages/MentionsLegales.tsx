import LegalLayout from "../components/LegalLayout";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

export default function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions légales"
      icon={faScaleBalanced}
      intro="Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (L.C.E.N.), nous portons à la connaissance des utilisateurs du site les présentes mentions légales."
      updatedAt="01/09/2026"
    >
      <h2>1. Éditeur du site</h2>
      <div className="info-card">
        <p><strong>Raison sociale :</strong> EZOLIS</p>
        <p><strong>Forme juridique :</strong> SASU (Société par actions simplifiée à associé unique)</p>
        <p><strong>Capital social :</strong> 50 000,00 €</p>
        <p><strong>Siège social :</strong> 106 avenue de St Louis, 13015 Marseille, France</p>
        <p><strong>SIREN :</strong> 917 526 303</p>
        <p><strong>RCS :</strong> 917 526 303 R.C.S. Marseille</p>
        <p><strong>Téléphone :</strong> <a href="tel:0662244083">06 62 24 40 83</a></p>
        <p><strong>Email :</strong> <a href="mailto:contact@ezolis.net">contact@ezolis.net</a></p>
      </div>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication du site est le représentant légal
        d'EZOLIS.
      </p>

      <h2>3. Hébergeur du site</h2>
      <div className="info-card">
        <p><strong>Hébergeur :</strong> OVH SAS</p>
        <p><strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
        <p><strong>Téléphone :</strong> 1007 (numéro non surtaxé)</p>
        <p><strong>Site web :</strong> <a href="https://www.ovhcloud.com/fr/" target="_blank" rel="noreferrer">www.ovhcloud.com/fr/</a></p>
        <p><strong>SIRET :</strong> 424 761 419 00045</p>
        <p><strong>RCS :</strong> Lille Métropole 424 761 419</p>
      </div>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus du site (textes, images, logos, graphismes,
        icônes, photographies, vidéos, marques) est la propriété exclusive
        d'EZOLIS ou fait l'objet d'une autorisation d'utilisation. Toute
        reproduction, représentation, modification, publication, adaptation ou
        exploitation, totale ou partielle, sans autorisation écrite préalable,
        est interdite et constitue un acte de contrefaçon sanctionné par les
        articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations diffusées sur le site sont présentées à titre indicatif
        et n'ont aucun caractère contractuel. EZOLIS ne saurait être tenu
        responsable des erreurs éventuelles ou des omissions. L'utilisateur
        reconnaît utiliser les informations sous sa propre responsabilité.
      </p>
      <p>
        EZOLIS ne peut être tenu responsable des dommages directs ou indirects
        liés à l'utilisation du site ou à l'impossibilité d'y accéder.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites externes. EZOLIS
        n'exerce aucun contrôle sur ces sites et décline toute responsabilité
        quant à leur contenu.
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En
        cas de litige, les tribunaux français seront seuls compétents.
      </p>

      <h2>8. Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales, vous
        pouvez nous contacter à l'adresse{" "}
        <a href="mailto:contact@ezolis.net">contact@ezolis.net</a>.
      </p>
    </LegalLayout>
  );
}
