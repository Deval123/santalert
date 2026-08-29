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

/** Port de `pages/suivi-medical` (conteneur à onglets) — liste de raccourcis. */
@Component({
  selector: 'app-suivi-medical',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
        <ion-title>Suivi Médical</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button *ngFor="let e of entries" (click)="open(e.kind)" detail="false">
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
export class SuiviMedicalPage {
  private router = inject(Router);
  entries = [
    { kind: 'consultation', title: 'Consultations' },
    { kind: 'examen', title: 'Examens' },
    { kind: 'hospitalisation', title: 'Hospitalisations' },
  ];
  constructor() {
    addIcons({ 'chevron-forward': chevronForward });
  }
  open(kind: string): void {
    this.router.navigate(['/suivi-medical', kind]);
  }
}
