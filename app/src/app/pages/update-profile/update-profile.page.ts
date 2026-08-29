import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

const GROUPS: { title: string; fields: { key: string; label: string; type?: string }[] }[] = [
  {
    title: 'Identité',
    fields: [
      { key: 'nom', label: 'Nom' },
      { key: 'prenom', label: 'Prénom' },
      { key: 'sexe', label: 'Sexe' },
      { key: 'anneeNais', label: 'Année de naissance' },
      { key: 'lieuNais', label: 'Lieu de naissance' },
      { key: 'profession', label: 'Profession' },
      { key: 'telephone', label: 'Téléphone', type: 'tel' },
      { key: 'telBureau', label: 'Téléphone bureau', type: 'tel' },
      { key: 'email', label: 'Email principal', type: 'email' },
      { key: 'email1', label: 'Email secondaire', type: 'email' },
      { key: 'residencePrincipal', label: 'Résidence principale' },
      { key: 'residenceSecondaire', label: 'Résidence secondaire' },
    ],
  },
  {
    title: 'Filiation',
    fields: [
      { key: 'nomPere', label: 'Père' },
      { key: 'telPere', label: 'Tél père', type: 'tel' },
      { key: 'emailPere', label: 'Email père', type: 'email' },
      { key: 'professionPere', label: 'Profession père' },
      { key: 'nomMere', label: 'Mère' },
      { key: 'telMere', label: 'Tél mère', type: 'tel' },
      { key: 'emailMere', label: 'Email mère', type: 'email' },
      { key: 'professionMere', label: 'Profession mère' },
    ],
  },
  {
    title: "Informations d'urgence",
    fields: [
      { key: 'groupeSanguin', label: 'Groupe sanguin' },
      { key: 'rhesus', label: 'Rhésus' },
      { key: 'allergie', label: 'Allergies' },
      { key: 'incapacite', label: 'Incapacité' },
      { key: 'medecinFamille', label: 'Médecin de famille' },
      { key: 'assurance', label: 'Assurance' },
      { key: 'observationPhisyque', label: 'Observation physique' },
      { key: 'signeParticulier', label: 'Signe particulier' },
    ],
  },
];

/** Port de `pages/update-profile` — édition de la fiche du patient connecté. */
@Component({
  selector: 'app-update-profile',
  templateUrl: 'update-profile.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
  ],
})
export class UpdateProfilePage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  groups = GROUPS;
  model: Record<string, string> = {};

  async ngOnInit(): Promise<void> {
    await this.auth.ensurePatientLoaded();
    const p = Session.patients[0] ?? {};
    for (const g of this.groups) {
      for (const f of g.fields) this.model[f.key] = p[f.key] ?? '';
    }
    this.cdr.detectChanges();
  }

  async save(): Promise<void> {
    const id = Session.patientId;
    if (!id) return this.ui.alert('Erreur', 'Patient inconnu');
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(
        this.post.postData<string>({ ...this.model, id, aksi: 'update_profile' }, 'aksi_patient.php'),
      ),
    );
    if (res === 'data update successfull') {
      // rafraîchit le cache local puis retour
      localStorage.setItem(
        'patients',
        JSON.stringify([{ ...(Session.patients[0] ?? {}), ...this.model, id }]),
      );
      await this.ui.alert('OK', 'Profil mis à jour');
      this.router.navigateByUrl('/profile');
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
