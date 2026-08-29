import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { CameraService } from '../../core/services/camera.service';
import { Session } from '../../core/services/session';

interface Field {
  key: string;
  label: string;
}

/** Port de `pages/infos-urgence` (fiche d'urgence patient, lecture + édition). */
@Component({
  selector: 'app-infos-urgence',
  templateUrl: 'infos-urgence.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class InfosUrgencePage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private camera = inject(CameraService);
  private cdr = inject(ChangeDetectorRef);

  patient: any = null;
  maladies: any[] = [];
  editing = false;
  model: Record<string, any> = {};

  readonly identity: Field[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'sexe', label: 'Sexe' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'email', label: 'Email' },
    { key: 'anneeNais', label: 'Année de naissance' },
    { key: 'lieuNais', label: 'Lieu de naissance' },
  ];

  readonly medical: Field[] = [
    { key: 'groupeSanguin', label: 'Groupe sanguin' },
    { key: 'rhesus', label: 'Rhésus' },
    { key: 'allergie', label: 'Allergies' },
    { key: 'incapacite', label: 'Incapacité' },
    { key: 'medecinFamille', label: 'Médecin de famille' },
    { key: 'assurance', label: 'Assurance' },
    { key: 'observationPhisyque', label: 'Observation physique' },
    { key: 'signeParticulier', label: 'Signe particulier' },
  ];

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    await this.auth.ensurePatientLoaded();
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ infos: any[]; maladie: any[] }>(
            { patients: Session.patients },
            'showInfosUrgentPatients.php',
          ),
        ),
      );
      this.patient = res?.infos?.[0] ?? null;
      this.maladies = res?.maladie ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  startEdit(): void {
    this.model = {};
    for (const f of this.medical) this.model[f.key] = this.patient?.[f.key] ?? '';
    this.model['sexe'] = this.patient?.['sexe'] ?? '';
    this.model['filename'] = this.patient?.['filename'] ?? '';
    this.editing = true;
  }

  async takePhoto(): Promise<void> {
    const dataUrl = await this.camera.takePhoto();
    if (dataUrl) {
      this.model['filename'] = dataUrl;
      this.cdr.detectChanges();
    }
  }

  async save(): Promise<void> {
    const id = Session.patientId;
    if (!id) return this.ui.alert('Erreur', 'Patient inconnu');
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(
        this.post.postData<string>({ ...this.model, id, aksi: 'add_infos' }, 'aksi_patient.php'),
      ),
    );
    if (res === 'Successfull') {
      this.editing = false;
      this.cdr.detectChanges();
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
