import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
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

interface FieldDef {
  key: string;
  label: string;
  type?: string;
}

/**
 * Port de `pages/param-regime` + `add-param-regime` + `edit-param-regime`
 * + `show-one-param-regime` (4 pages legacy → 1).
 * Relevés de suivi rattachés à un régime : liste + ajout inline + suppression.
 * Route : `/suivi/regimes/:id/params` (id = regime_id). Atteint depuis le
 * détail d'un régime (`suivi-detail`).
 */
@Component({
  selector: 'app-param-regime',
  templateUrl: 'param-regime.page.html',
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
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class ParamRegimePage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  /** regime_id, fourni par la route (`withComponentInputBinding`). */
  @Input() id!: string;

  readonly fields: FieldDef[] = [
    { key: 'dateParam', label: 'Date du jour', type: 'datetime-local' },
    { key: 'poids', label: 'Poids' },
    { key: 'temperature', label: 'Température' },
    { key: 'tension', label: 'Tension' },
    { key: 'observation', label: 'Observation' },
  ];

  rows: any[] = [];
  loading = true;
  model: Record<string, string> = {};

  constructor() {
    addIcons({ 'trash-outline': trashOutline });
  }

  ngOnInit(): void {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading = true;
    try {
      const r = await firstValueFrom(
        this.post.postData<{ server_response: any[] }>({ id: Number(this.id) }, 'showParamRegime.php'),
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
    if (!this.model['dateParam']) {
      return this.ui.alert('ATTENTION', 'La date est obligatoire');
    }
    const body = { ...this.model, regime_id: Number(this.id) };
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(this.post.postData<string>(body, 'insertParamRegime.php')),
    );
    if (res === 'Successfull') {
      this.model = {};
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }

  async remove(row: any): Promise<void> {
    const res = await this.ui.withLoading('Suppression…', () =>
      firstValueFrom(this.post.postData<string>({ id: row.id }, 'deleteParamRegime.php')),
    );
    if (res === 'data deleted successfully') {
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
