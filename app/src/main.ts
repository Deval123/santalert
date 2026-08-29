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

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

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
