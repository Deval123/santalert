import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
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
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Session } from '../../core/services/session';

interface Field {
  key: string;
  label: string;
}

/**
 * Port de `pages/infos-consul-prescripteur` — la page legacy était vide.
 * Récapitulatif : établissement (lieu de consultation) + personnel connecté
 * (prescripteur) + consultations du patient actif.
 */
@Component({
  selector: 'app-infos-consul-prescripteur',
  templateUrl: 'infos-consul-prescripteur.page.html',
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
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class InfosConsulPrescripteurPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ets: any = null;
  prescripteur: any = null;
  patient: any = null;
  consultations: any[] = [];

  readonly etsFields: Field[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'type', label: 'Type' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'email', label: 'Email' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'ville', label: 'Ville' },
    { key: 'code', label: 'Code' },
  ];
  readonly presFields: Field[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'type_personnel', label: 'Fonction' },
    { key: 'matricule', label: 'Matricule' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'email', label: 'Email' },
  ];

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    this.ets = Session.etablissement[0] ?? null;
    this.prescripteur = Session.personel[0] ?? null;
    this.patient = Session.patients[0] ?? null;

    if (Session.patientId) {
      try {
        const res = await firstValueFrom(
          this.post.postData<{ server_response: any[] }>(
            { patients_id: Session.patientId, patients: Session.patients },
            'showConsultation.php',
          ),
        );
        this.consultations = res?.server_response ?? [];
      } catch (e) {
        console.error(e);
      }
    }
    this.cdr.detectChanges();
  }
}
