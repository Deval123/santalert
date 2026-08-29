import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular';
import { Router } from '@angular/router';

import { RecordService } from '../../core/services/record.service';
import { entityOf, SuiviEntity } from './suivi.config';

/** Vue détail lecture seule (remplace `show-one-*`). */
@Component({
  selector: 'app-suivi-detail',
  templateUrl: 'suivi-detail.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class SuiviDetailPage implements OnInit {
  private records = inject(RecordService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @Input() entity!: string;
  @Input() id!: string;

  get cfg(): SuiviEntity {
    return entityOf(this.entity);
  }
  row: any = null;

  async ngOnInit(): Promise<void> {
    this.row = history.state?.row ?? null;
    if (!this.row && this.cfg.endpoints.one) {
      this.row = await this.records.one(this.cfg.endpoints.one, this.id).catch(() => null);
      this.cdr.detectChanges();
    }
  }

  edit(): void {
    this.router.navigate(['/suivi', this.cfg.slug, 'edit', this.id]);
  }

  /** Le domaine "régime" a un sous-suivi de relevés (ex page `param-regime`). */
  get isRegime(): boolean {
    return this.cfg.slug === 'regimes';
  }

  params(): void {
    this.router.navigate(['/suivi/regimes', this.id, 'params']);
  }
}
