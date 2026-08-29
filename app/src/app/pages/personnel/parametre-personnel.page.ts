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
  IonText,
} from '@ionic/angular';

/** Port de `pages/parametre-personnel` — réglages du personnel (statique). */
@Component({
  selector: 'app-parametre-personnel',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button (click)="go('/notification')"><ion-label>Notifications</ion-label></ion-item>
        <ion-item button (click)="apropos = !apropos"><ion-label>À propos</ion-label></ion-item>
        <ion-item button (click)="go('/logout')"><ion-label color="danger">Déconnexion</ion-label></ion-item>
      </ion-list>

      <ion-text *ngIf="apropos" class="ion-padding">
        <h3>Qu'est-ce que Sant'alert ?</h3>
        <p>Le compagnon fidèle de votre suivi médical.</p>
        <p>
          Sant'alert consigne vos consultations, ordonnances et examens pour un meilleur
          suivi par le corps médical et pour réduire les coûts de reprise d'examens.
        </p>
        <ul>
          <li>Consultations, ordonnances, examens</li>
          <li>Alertes vaccins &amp; déparasitage</li>
          <li>Alertes RDV médicaux</li>
          <li>Alertes prise de médicaments &amp; soins</li>
        </ul>
      </ion-text>
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
    IonText,
  ],
})
export class ParametrePersonnelPage {
  private router = inject(Router);
  apropos = false;

  go(url: string): void {
    this.router.navigateByUrl(url);
  }
}
