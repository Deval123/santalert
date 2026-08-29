import { Component, inject } from '@angular/core';
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
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';

import { SUIVI, SUIVI_TABS } from './suivi.config';

/**
 * Accueil "Suivi Personnel" (ex `pages/suivi-perso` + ses `<ion-tab>`).
 * Liste de raccourcis vers les 3 sous-domaines (soins / regimes / bilan).
 */
@Component({
  selector: 'app-suivi-perso',
  templateUrl: 'suivi-perso.page.html',
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
    IonIcon,
  ],
})
export class SuiviPersoPage {
  private router = inject(Router);
  entries = SUIVI_TABS.map((slug) => ({ slug, title: SUIVI[slug].title }));

  constructor() {
    addIcons({ 'chevron-forward': chevronForward });
  }

  open(slug: string): void {
    this.router.navigate(['/suivi', slug]);
  }
}
