import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonText,
} from '@ionic/angular';

/**
 * Port de `pages/contact-personnel` — page « À propos / Contacts » (legacy
 * quasi vide). Contenu statique à compléter.
 */
@Component({
  selector: 'app-contact-personnel',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>À propos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-text>
        <h2>Sant'alert</h2>
        <p>
          Application de suivi médical — solution développée par Habitech Solutions &amp; Services.
        </p>
        <p><strong>Contact :</strong> 697 019 629 / 673 230 997</p>
        <!-- TODO: coordonnées et informations réelles. -->
      </ion-text>
    </ion-content>
  `,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonText],
})
export class ContactPersonnelPage {}
