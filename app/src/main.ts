import { bootstrapApplication } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import {
  logIn,
  logInOutline,
  logoFacebook,
  logoGoogle,
  menuOutline,
  menu,
  checkmark,
} from 'ionicons/icons';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Enregistre les custom elements `ion-alert` / `ion-loading` : aucun composant ne
// les importe (ils sont créés à la main dans `UiService`), donc le build prod les
// tree-shake sinon -> `document.createElement('ion-loading').present` undefined.
import { IonAlert, IonLoading } from '@ionic/angular';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Référence conservée pour empêcher le tree-shaking de l'import ci-dessus.
void [IonAlert, IonLoading];

// UI caméra / toast pour @capacitor/camera sur le web.
defineCustomElements(window);

// Enregistrement des icônes utilisées (mode standalone : pas d'auto-chargement).
addIcons({
  'log-in': logIn,
  'log-in-outline': logInOutline,
  'logo-facebook': logoFacebook,
  'logo-google': logoGoogle,
  menu,
  'menu-outline': menuOutline,
  checkmark,
});

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
