import { CrudEndpoints } from '../../core/services/record.service';

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'datetime-local' | 'number';
}

export interface SuiviEntity {
  slug: string;
  title: string;
  endpoints: CrudEndpoints;
  /** Colonnes affichées dans la liste. */
  columns: { key: string; label: string }[];
  /** Champs des formulaires ajout/édition. */
  fields: FieldDef[];
  /** true = liste consultée seulement (pas de +/édition/suppression). */
  readonly?: boolean;
}

/**
 * Domaine "Suivi Personnel" (ex pages `soins`, `regimes`, `bilan` +
 * leurs `ajout-*`, `edit-*`, `show-one-*`). Backend : lot 2.
 */
export const SUIVI: Record<string, SuiviEntity> = {
  soins: {
    slug: 'soins',
    title: 'Suivi des symptômes',
    endpoints: {
      list: 'showAuto_med.php',
      create: 'insertSoins.php',
      update: 'editSoins.php',
      remove: 'deleteAuto_med.php',
      one: 'showOneAuto_med.php',
    },
    columns: [
      { key: 'datecreate', label: 'Date' },
      { key: 'symtome', label: 'Symptôme' },
      { key: 'traitement', label: 'Traitement' },
    ],
    fields: [
      { key: 'datecreate', label: 'Date', type: 'datetime-local' },
      { key: 'symtome', label: 'Symptôme', type: 'textarea' },
      { key: 'traitement', label: 'Traitement', type: 'textarea' },
      { key: 'evaluation', label: 'Évaluation', type: 'textarea' },
      { key: 'observation', label: 'Observation', type: 'textarea' },
      { key: 'cout_traitement', label: 'Coût du traitement' },
    ],
  },

  regimes: {
    slug: 'regimes',
    title: 'Régimes',
    endpoints: {
      list: 'showRegime.php',
      create: 'insertRegimes.php',
      update: 'editRegime.php',
      remove: 'deleteRegime.php',
      one: 'showOneRegime.php',
    },
    columns: [
      { key: 'type_regime', label: 'Type' },
      { key: 'datedebut', label: 'Début' },
      { key: 'dateFin', label: 'Fin' },
    ],
    fields: [
      { key: 'type_regime', label: 'Type de régime' },
      { key: 'datedebut', label: 'Date de début', type: 'date' },
      { key: 'dateFin', label: 'Date de fin', type: 'date' },
      { key: 'poidsDepart', label: 'Poids de départ' },
      { key: 'imc', label: 'IMC' },
      { key: 'taille', label: 'Taille' },
      { key: 'natureRegime', label: 'Nature du régime' },
      { key: 'restrictions', label: 'Restrictions', type: 'textarea' },
      { key: 'alimentationRecommande', label: 'Alimentation recommandée', type: 'textarea' },
      { key: 'typeTraitement', label: 'Type de traitement' },
    ],
  },

  bilan: {
    slug: 'bilan',
    title: 'Suivi continu (bilan)',
    endpoints: {
      list: 'showBilan.php',
      create: 'insertBilan.php',
      update: 'editBilan.php',
      remove: 'deleteBilan.php',
      one: 'showOneBilan.php',
    },
    columns: [
      { key: 'dateCreate', label: 'Date' },
      { key: 'poidsActuel', label: 'Poids actuel' },
      { key: 'poidsNormal', label: 'Poids normal' },
    ],
    fields: [
      { key: 'datecreate', label: 'Date', type: 'datetime-local' },
      { key: 'intitule', label: 'Intitulé' },
      { key: 'temperature', label: 'Température' },
      { key: 'taille', label: 'Tour de taille' },
      { key: 'tension', label: 'Tension' },
      { key: 'poidsActuel', label: 'Poids actuel' },
      { key: 'poidsNormal', label: 'Poids normal' },
      { key: 'imc', label: 'IMC' },
      { key: 'tgc', label: 'Taux de graisse corporel' },
      { key: 'masseMinEraleOsseuse', label: 'Masse minérale osseuse' },
      { key: 'pourcentageEau', label: "Pourcentage d'eau" },
      { key: 'masseMusculaire', label: 'Masse musculaire' },
      { key: 'evaluationSihouette', label: 'Évaluation silhouette' },
      { key: 'tgViscerale', label: 'Taux de graisse viscérale' },
    ],
  },

  vaccin: {
    slug: 'vaccin',
    title: 'Vaccins',
    endpoints: {
      list: 'showVaccin.php',
      create: 'insertVaccin.php',
      update: 'editVaccin.php',
      remove: 'deleteVaccin.php',
    },
    columns: [
      { key: 'nom', label: 'Vaccin' },
      { key: 'date_realisation', label: 'Date' },
      { key: 'nom_hopital', label: 'Lieu' },
    ],
    fields: [
      { key: 'nom', label: 'Nom du vaccin' },
      { key: 'date_realisation', label: 'Date de réalisation', type: 'date' },
      { key: 'nom_hopital', label: 'Hôpital / centre' },
    ],
  },

  visite: {
    slug: 'visite',
    title: 'Visites',
    endpoints: {
      list: 'showVisite.php',
      create: 'insertVisite.php',
      update: 'editVisite.php',
      remove: 'deleteVisite.php',
    },
    columns: [
      { key: 'nom', label: 'Visite' },
      { key: 'date_realisation', label: 'Date' },
      { key: 'nom_hopital', label: 'Lieu' },
    ],
    fields: [
      { key: 'nom', label: 'Intitulé de la visite' },
      { key: 'date_realisation', label: 'Date de réalisation', type: 'date' },
      { key: 'nom_hopital', label: 'Hôpital / centre' },
    ],
  },

  recommandation: {
    slug: 'recommandation',
    title: 'Recommandations',
    readonly: true,
    endpoints: { list: 'showRecommandation.php' },
    columns: [
      { key: 'categorie', label: 'Catégorie' },
      { key: 'contenu', label: 'Recommandation' },
    ],
    fields: [
      { key: 'categorie', label: 'Catégorie' },
      { key: 'contenu', label: 'Recommandation', type: 'textarea' },
    ],
  },

  maladie: {
    slug: 'maladie',
    title: 'Maladies chroniques',
    endpoints: {
      list: 'showMaladieChronique.php',
      create: 'insertMaladieChronique.php',
      update: 'editMaladieChronique.php',
      remove: 'deleteMaladieChronique.php',
      one: 'showOneMaladieChronique.php',
    },
    columns: [
      { key: 'nom', label: 'Maladie' },
      { key: 'medecin_traitant', label: 'Médecin traitant' },
    ],
    fields: [
      { key: 'nom', label: 'Nom de la maladie' },
      { key: 'medecin_traitant', label: 'Médecin traitant' },
      { key: 'restriction', label: 'Restrictions', type: 'textarea' },
      { key: 'recommandation', label: 'Recommandations', type: 'textarea' },
      { key: 'commentaire', label: 'Commentaire', type: 'textarea' },
    ],
  },

  agenda: {
    slug: 'agenda',
    title: 'Alertes / agenda',
    endpoints: {
      list: 'showAgendaPatients.php',
      create: 'insertAgendaPatients.php',
      update: 'editAgendaPatients.php',
      remove: 'deleteAgendaPatients.php',
      // pas de showOne dédié : le détail se déduit de la liste
    },
    columns: [
      { key: 'datedebut', label: 'Début' },
      { key: 'nature', label: 'Nature' },
      { key: 'lieu', label: 'Lieu' },
    ],
    fields: [
      { key: 'datedebut', label: 'Date du jour', type: 'datetime-local' },
      { key: 'nature', label: 'Nature' },
      { key: 'lieu', label: 'Lieu' },
      { key: 'observation', label: 'Observation', type: 'textarea' },
      { key: 'tiers', label: 'Tiers' },
      { key: 'cout', label: 'Coût' },
      { key: 'datefin', label: 'Date de réalisation', type: 'datetime-local' },
      { key: 'datefin1', label: 'Rappel 1', type: 'datetime-local' },
      { key: 'datefin2', label: 'Rappel 2', type: 'datetime-local' },
      { key: 'datefin3', label: 'Rappel 3', type: 'datetime-local' },
    ],
  },
};

export const SUIVI_TABS = ['soins', 'regimes', 'bilan'];

export function entityOf(slug: string | null): SuiviEntity {
  return SUIVI[slug ?? ''] ?? SUIVI['bilan'];
}
