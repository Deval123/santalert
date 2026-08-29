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
  IonTextarea,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trashOutline, arrowBackOutline } from 'ionicons/icons';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

/** Port de `pages/agenda-personnel` — agenda de l'établissement (liste + ajout). */
@Component({
  selector: 'app-agenda-personnel',
  templateUrl: 'agenda-personnel.page.html',
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
    IonTextarea,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  ],
})
export class AgendaPersonnelPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  rows: any[] = [];
  adding = false;
  model: Record<string, string> = {};

  readonly fields = [
    { key: 'patient', label: 'Patient (nom)' },
    { key: 'datedebut', label: 'Date de début', type: 'datetime-local' },
    { key: 'datefin', label: 'Date de fin', type: 'datetime-local' },
    { key: 'nature', label: 'Nature' },
    { key: 'lieu', label: 'Lieu' },
    { key: 'tiers', label: 'Tiers' },
    { key: 'observation', label: 'Observation', type: 'textarea' },
  ];

  constructor() {
    addIcons({ add, 'trash-outline': trashOutline, 'arrow-back-outline': arrowBackOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ server_response: any[] }>(
            { personel: Session.personel },
            'showAgendaPersonelEts.php',
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

  async save(): Promise<void> {
    if (!this.model['patient'] || !this.model['datedebut']) {
      return this.ui.alert('ATTENTION', 'Patient et date de début sont requis');
    }
    await this.auth.ensureStaffLoaded();
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(
        this.post.postData<string>(
          { ...this.model, personel: Session.personel },
          'insertAgendaPersonelEts.php',
        ),
      ),
    );
    if (res === 'Successfull') {
      this.adding = false;
      this.model = {};
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }

  async remove(row: any): Promise<void> {
    const res = await this.ui.withLoading('Suppression…', () =>
      firstValueFrom(this.post.postData<string>({ id: row.id }, 'deleteAgendaPersonelEts.php')),
    );
    if (res === 'data deleted successfully') await this.reload();
    else await this.ui.alert('Erreur', String(res));
  }
}
