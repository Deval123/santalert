import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
} from '@ionic/angular';

/** Port de `src/pages/help/help.ts` + `help.html` (contenu statique). */
@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent],
})
export class HelpPage {}
