import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { Session } from '../../core/services/session';

interface Field {
  key: string;
  label: string;
}

/**
 * Port de `pages/infos-general-patient` — vue complète (lecture seule) du
 * patient actif. Aucun endpoint : lit `Session.patients[0]` (renseigné par
 * la recherche / la sélection d'un patient).
 */
@Component({
  selector: 'app-infos-general-patient',
  templateUrl: 'infos-general-patient.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
  ],
})
export class InfosGeneralPatientPage {
  patient: any = Session.patients[0] ?? null;

  readonly identite: Field[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'sexe', label: 'Sexe' },
    { key: 'anneeNais', label: 'Année de naissance' },
    { key: 'lieuNais', label: 'Lieu de naissance' },
    { key: 'profession', label: 'Profession' },
    { key: 'lieuService', label: 'Lieu de service' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'telBureau', label: 'Téléphone bureau' },
    { key: 'email', label: 'Email principal' },
    { key: 'email1', label: 'Email secondaire' },
    { key: 'residencePrincipal', label: 'Résidence principale' },
    { key: 'residenceSecondaire', label: 'Résidence secondaire' },
  ];

  readonly filiation: Field[] = [
    { key: 'nomPere', label: 'Père' },
    { key: 'telPere', label: 'Tél père' },
    { key: 'emailPere', label: 'Email père' },
    { key: 'professionPere', label: 'Profession père' },
    { key: 'nomMere', label: 'Mère' },
    { key: 'telMere', label: 'Tél mère' },
    { key: 'emailMere', label: 'Email mère' },
    { key: 'professionMere', label: 'Profession mère' },
  ];

  readonly urgence: Field[] = [
    { key: 'groupeSanguin', label: 'Groupe sanguin' },
    { key: 'rhesus', label: 'Rhésus' },
    { key: 'incapacite', label: 'Incapacité' },
    { key: 'medecinFamille', label: 'Médecin de famille' },
    { key: 'assurance', label: 'Assurance' },
    { key: 'observationPhisyque', label: 'Observation physique' },
    { key: 'signeParticulier', label: 'Signe particulier' },
  ];
}
