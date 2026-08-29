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
  IonInput,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';
import { AuthService } from '../../core/services/auth.service';
import { Session } from '../../core/services/session';

/**
 * Port de `pages/departement` + `pages/ajout-departement` (2 pages legacy → 1).
 * Services / départements rattachés à un établissement : liste + ajout + suppression.
 * Le code établissement est pré-rempli avec celui du personnel connecté.
 */
@Component({
  selector: 'app-departement',
  templateUrl: 'departement.page.html',
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
    IonInput,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class DepartementPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  rows: any[] = [];
  loading = true;
  model: Record<string, string> = { nom: '', description: '', code: '' };

  constructor() {
    addIcons({ 'trash-outline': trashOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    this.model['code'] =
      Session.etablissement[0]?.code ?? JSON.parse(localStorage.getItem('code') ?? '""');
    await this.reload();
  }

  async reload(): Promise<void> {
    this.loading = true;
    try {
      const body = this.model['code'] ? { code: this.model['code'] } : {};
      const r = await firstValueFrom(
        this.post.postData<{ server_response: any[] }>(body, 'showDepartement.php'),
      );
      this.rows = r?.server_response ?? [];
    } catch {
      this.rows = [];
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async add(): Promise<void> {
    if (!this.model['nom'] || !this.model['code']) {
      return this.ui.alert('ATTENTION', 'Nom et code établissement sont requis');
    }
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(this.post.postData<string>({ ...this.model }, 'insertDepartement.php')),
    );
    if (res === 'Successfull') {
      this.model['nom'] = '';
      this.model['description'] = '';
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }

  async remove(row: any): Promise<void> {
    const res = await this.ui.withLoading('Suppression…', () =>
      firstValueFrom(this.post.postData<string>({ id: row.id }, 'deleteDepartement.php')),
    );
    if (res === 'data deleted successfully') {
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
