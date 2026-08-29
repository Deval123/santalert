import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline, eyeOutline, trashOutline } from 'ionicons/icons';

import { RecordService } from '../../core/services/record.service';
import { UiService } from '../../core/services/ui.service';
import { entityOf, SuiviEntity } from './suivi.config';

/**
 * Liste générique d'un sous-domaine de "Suivi Personnel"
 * (remplace `pages/soins`, `pages/regimes`, `pages/bilan`).
 * Route : `/suivi/:entity` — ou embarquée via [entity] dans `suivi-perso`.
 */
@Component({
  selector: 'app-suivi-list',
  templateUrl: 'suivi-list.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  ],
})
export class SuiviListPage implements OnInit {
  private records = inject(RecordService);
  private ui = inject(UiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  /** Fourni par la route (`withComponentInputBinding`). */
  @Input() entity!: string;

  /** Recalculé à chaque accès : robuste au timing du binding d'input. */
  get cfg(): SuiviEntity {
    return entityOf(this.entity);
  }
  rows: any[] = [];
  loading = true;

  constructor() {
    addIcons({ add, 'create-outline': createOutline, 'eye-outline': eyeOutline, 'trash-outline': trashOutline });
  }

  ngOnInit(): void {
    void this.reload();
  }

  async reload(): Promise<void> {
    this.loading = true;
    try {
      this.rows = await this.records.list(this.cfg.endpoints.list);
    } catch {
      this.rows = [];
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  add(): void {
    this.router.navigate(['/suivi', this.cfg.slug, 'new']);
  }

  edit(row: any): void {
    this.router.navigate(['/suivi', this.cfg.slug, 'edit', row.id], { state: { row } });
  }

  view(row: any): void {
    this.router.navigate(['/suivi', this.cfg.slug, 'view', row.id], { state: { row } });
  }

  async remove(row: any): Promise<void> {
    const script = this.cfg.endpoints.remove;
    if (!script) return;
    const res = await this.ui.withLoading('Suppression…', () =>
      this.records.remove(script, row.id),
    );
    if (res === 'data deleted successfully') {
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
