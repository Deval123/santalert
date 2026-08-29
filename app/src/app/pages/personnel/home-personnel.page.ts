import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronForward, settingsOutline } from 'ionicons/icons';

/**
 * Port de `pages/home-personnel` (conteneur à onglets Gestion patients / Agenda /
 * Contacts + bouton paramètres). Rendu en liste de raccourcis.
 */
@Component({
  selector: 'app-home-personnel',
  templateUrl: 'home-personnel.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class HomePersonnelPage {
  private router = inject(Router);

  entries = [
    { title: 'Gestion des patients', url: '/gestion-patient' },
    { title: 'Agenda', url: '/agenda-personnel' },
    { title: 'Contacts / À propos', url: '/contact-personnel' },
    { title: "Infos d'urgence patient", url: '/infos-urgence' },
    { title: 'Paramètres', url: '/parametre-personnel' },
  ];

  constructor() {
    addIcons({ 'chevron-forward': chevronForward, 'settings-outline': settingsOutline });
  }

  open(url: string): void {
    this.router.navigateByUrl(url);
  }
}
