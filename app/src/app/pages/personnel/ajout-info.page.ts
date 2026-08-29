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
  IonMenuButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline } from 'ionicons/icons';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

interface Acte {
  slug: string;
  title: string;
  list: string;
  insert: string;
  columns: { key: string; label: string }[];
  fields: { key: string; label: string; type?: string }[];
}

const ACTES: Acte[] = [
  {
    slug: 'consultation',
    title: 'Consultations',
    list: 'showConsultation.php',
    insert: 'insertConsultationPersonelEts.php',
    columns: [
      { key: 'datecreate', label: 'Date' },
      { key: 'nom_medecin', label: 'Médecin' },
    ],
    fields: [
      { key: 'datecreate', label: 'Date de consultation', type: 'datetime-local' },
      { key: 'nom_medecin', label: 'Nom du médecin' },
      { key: 'observation', label: 'Observation', type: 'textarea' },
    ],
  },
  {
    slug: 'hospitalisation',
    title: 'Hospitalisations',
    list: 'showHospPatient.php',
    insert: 'insertHospitalisationPersonelEts.php',
    columns: [
      { key: 'date_entree', label: 'Entrée' },
      { key: 'medecinTraitant', label: 'Médecin traitant' },
    ],
    fields: [
      { key: 'date_entree', label: "Date d'entrée", type: 'datetime-local' },
      { key: 'date_sortie', label: 'Date de sortie', type: 'datetime-local' },
      { key: 'symptome', label: 'Symptômes', type: 'textarea' },
      { key: 'causes', label: 'Causes', type: 'textarea' },
      { key: 'medecinTraitant', label: 'Médecin traitant' },
      { key: 'diagnostique', label: 'Diagnostic', type: 'textarea' },
      { key: 'recommandationsAlimentaire', label: 'Recommandations alimentaires', type: 'textarea' },
      { key: 'numeroChambre', label: 'N° chambre' },
      { key: 'numeroLit', label: 'N° lit' },
      { key: 'numeroDossier', label: 'N° dossier' },
    ],
  },
];

/**
 * Port (partiel) de `pages/ajout-info` — actes médicaux sur le patient
 * sélectionné : consultation, hospitalisation. Les actes chaînés à une
 * consultation (examen, RDV, paramètres, ordonnance…) restent à porter.
 */
@Component({
  selector: 'app-ajout-info',
  templateUrl: 'ajout-info.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  ],
})
export class AjoutInfoPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  actes = ACTES;
  active = ACTES[0].slug;
  rows: any[] = [];
  adding = false;
  model: Record<string, string> = {};

  get acte(): Acte {
    return ACTES.find((a) => a.slug === this.active) ?? ACTES[0];
  }
  get patientName(): string {
    const p = Session.patients[0];
    return p ? `${p.nom ?? ''} ${p.prenom ?? ''}`.trim() : '';
  }

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    if (!Session.patientId) {
      await this.ui.alert('Patient requis', "Sélectionnez d'abord un patient (Gestion des patients).");
      this.router.navigateByUrl('/gestion-patient');
      return;
    }
    await this.reload();
  }

  async reload(): Promise<void> {
    this.adding = false;
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ server_response: any[] }>(
            { patients_id: Session.patientId, patients: Session.patients },
            this.acte.list,
          ),
        ),
      );
      this.rows = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  switch(slug: string): void {
    this.active = slug;
    void this.reload();
  }

  /** Ouvre le détail d'une consultation / hospitalisation (ses sous-actes). */
  openRow(r: any): void {
    this.router.navigate(['/ajout-info', this.active, r.id]);
  }

  async save(): Promise<void> {
    const first = this.acte.fields[0];
    if (!this.model[first.key]) {
      return this.ui.alert('ATTENTION', `« ${first.label} » est requis`);
    }
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(
        this.post.postData<string>(
          {
            ...this.model,
            patients_id: Session.patientId,
            personel: Session.personel,
            hopital: Session.etablissement,
          },
          this.acte.insert,
        ),
      ),
    );
    if (res === 'Successfull') {
      this.model = {};
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }

  constructor() {
    addIcons({ add, 'arrow-back-outline': arrowBackOutline });
  }
}
