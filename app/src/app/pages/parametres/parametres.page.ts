import { Component, inject } from '@angular/core';
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
} from '@ionic/angular';

/** Port de `pages/parametres` — réglages du patient. */
@Component({
  selector: 'app-parametres',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button (click)="go('/update-profile')"><ion-label>Modifier mon profil</ion-label></ion-item>
        <ion-item button (click)="go('/infos-urgence')"><ion-label>Mes infos d'urgence</ion-label></ion-item>
        <ion-item button (click)="go('/notification')"><ion-label>Notifications</ion-label></ion-item>
        <ion-item button (click)="go('/logout')"><ion-label color="danger">Déconnexion</ion-label></ion-item>
      </ion-list>
    </ion-content>
  `,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class ParametresPage {
  private router = inject(Router);
  go(url: string): void {
    this.router.navigateByUrl(url);
  }
}
