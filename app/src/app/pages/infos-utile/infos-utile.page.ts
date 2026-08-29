import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { callOutline, medkitOutline, informationCircleOutline } from 'ionicons/icons';

/**
 * Port de `pages/infos-utile` — la page legacy était **vide**.
 * Contenu statique de démarrage : à compléter avec les vraies infos
 * (numéros d'urgence locaux, liens, mode d'emploi).
 */
@Component({
  selector: 'app-infos-utile',
  templateUrl: 'infos-utile.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
  ],
})
export class InfosUtilePage {
  // TODO: remplacer par les vrais numéros (Cameroun par défaut).
  readonly urgences = [
    { label: 'Police secours', value: '117' },
    { label: 'Sapeurs-pompiers', value: '118' },
    { label: 'SAMU', value: '119' },
  ];

  constructor() {
    addIcons({
      'call-outline': callOutline,
      'medkit-outline': medkitOutline,
      'information-circle-outline': informationCircleOutline,
    });
  }
}
