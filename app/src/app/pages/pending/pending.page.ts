import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
 * Page bouchon affichée pour toute entrée de menu dont la page Ionic 3
 * n'a pas encore été portée. À supprimer quand toutes les routes réelles
 * existent.
 */
@Component({
  selector: 'app-pending',
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonText],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>{{ name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-text>
        <h2>Page « {{ name }} » pas encore migrée</h2>
        <p>
          Cette page existe dans l'app Ionic 3 (<code>src/pages/{{ name }}</code>) mais n'a pas
          encore été portée vers Ionic 8. Voir <code>app/MIGRATION.md</code>.
        </p>
      </ion-text>
    </ion-content>
  `,
})
export class PendingPage {
  name = inject(ActivatedRoute).snapshot.paramMap.get('name') ?? 'inconnue';
}
