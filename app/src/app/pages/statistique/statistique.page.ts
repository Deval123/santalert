import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/angular';

import { RecordService } from '../../core/services/record.service';
import { UiService } from '../../core/services/ui.service';

interface Tile {
  key: string;
  label: string;
  route: string;
}

/**
 * Port de `pages/statistique` — la page legacy était vide.
 * Synthèse chiffrée du dossier patient (compteurs cliquables).
 */
@Component({
  selector: 'app-statistique',
  templateUrl: 'statistique.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
  ],
})
export class StatistiquePage implements OnInit {
  private records = inject(RecordService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  stats: Record<string, number> = {};
  readonly tiles: Tile[] = [
    { key: 'bilans', label: 'Bilans', route: '/suivi/bilan' },
    { key: 'regimes', label: 'Régimes', route: '/suivi/regimes' },
    { key: 'soins', label: 'Suivis symptômes', route: '/suivi/soins' },
    { key: 'agenda', label: 'Alertes / RDV', route: '/suivi/agenda' },
    { key: 'maladies', label: 'Maladies chroniques', route: '/suivi/maladie' },
  ];

  async ngOnInit(): Promise<void> {
    try {
      const rows = await this.ui.withLoading('Chargement…', () =>
        this.records.list('showStatistique.php'),
      );
      this.stats = rows?.[0] ?? {};
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  open(route: string): void {
    this.router.navigateByUrl(route);
  }
}
