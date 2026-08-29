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
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

/**
 * Port de `pages/pharmacie-labo` (legacy vide) — « Ordonnance pour la pharmacie ».
 * Ordonnances + examens de laboratoire du patient actif, toutes consultations
 * confondues (`showOrdonanceLabo.php`).
 */
@Component({
  selector: 'app-pharmacie-labo',
  templateUrl: 'pharmacie-labo.page.html',
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
export class PharmacieLaboPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  patient: any = Session.patients[0] ?? null;
  ordonnances: any[] = [];
  examens: any[] = [];

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    if (!Session.patientId) {
      this.cdr.detectChanges();
      return;
    }
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ ordonnances: any[]; examens: any[] }>(
            { patients_id: Session.patientId, patients: Session.patients },
            'showOrdonanceLabo.php',
          ),
        ),
      );
      this.ordonnances = res?.ordonnances ?? [];
      this.examens = res?.examens ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }
}
