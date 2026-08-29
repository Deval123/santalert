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

/** Port de `pages/suivi-mere-enfant` (conteneur à onglets) — raccourcis vaccins / visites. */
@Component({
  selector: 'app-suivi-mere-enfant',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>Suivi mère &amp; enfant</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button *ngFor="let e of entries" (click)="open(e.slug)" detail="false">
          <ion-label>{{ e.title }}</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
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
export class SuiviMereEnfantPage {
  private router = inject(Router);
  entries = [
    { slug: 'visite', title: 'Visites' },
    { slug: 'vaccin', title: 'Vaccins' },
  ];
  constructor() {
    addIcons({ 'chevron-forward': chevronForward });
  }
  open(slug: string): void {
    this.router.navigate(['/suivi', slug]);
  }
}
