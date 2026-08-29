import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Port de `providers/facebook-service/facebook-service.ts`.
 *
 * STUB : le SSO Facebook (ex `cordova-plugin-facebook4` / `@ionic-native/facebook`)
 * est désactivé pour l'instant. À réactiver avec
 * `@capacitor-community/facebook-login` + des identifiants OAuth à jour
 * (ceux du `config.xml` datent de 2018).
 */
@Injectable({ providedIn: 'root' })
export class FacebookService {
  readonly enabled = false;
  session: any;

  login(): Observable<boolean> {
    console.warn('[FacebookService] SSO Facebook désactivé (stub).');
    return of(false);
  }

  getProfile(): Observable<any> {
    return of(undefined);
  }
}
