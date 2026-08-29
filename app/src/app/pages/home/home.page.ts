import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular';

import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { FacebookService } from '../../core/services/facebook.service';

/**
 * Port de `src/pages/home/home.ts` + `home.html`.
 * - `@ViewChild('username')` (refs de template) → `[(ngModel)]`
 * - `Http` + `.map(res.json())` → `AuthService` (HttpClient)
 * - `navCtrl.setRoot/push` → `Router`
 * - SSO Google/Facebook : boutons conservés mais désactivés (stub) — voir MIGRATION.md
 * - footer pub `<ion-slides>` : supprimé (composant retiré d'Ionic 7+)
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class HomePage {
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private router = inject(Router);
  facebook = inject(FacebookService);

  opt: 'patient' | 'personnel' = 'patient';
  username = '';
  password = '';
  userProfile: any;

  async signIn(): Promise<void> {
    if (!this.username) return this.ui.alert('ATTENTION', 'Le champ Nom est vide');
    if (!this.password) return this.ui.alert('ATTENTION', 'Le champ Mot de passe est vide');

    try {
      const res = await this.ui.withLoading('Connexion…', () =>
        this.auth.loginPatient(this.username, this.password),
      );
      if (res.ok) {
        await this.ui.alert('BIENVENUE', res.raw);
        await this.router.navigateByUrl(res.redirectTo!);
      } else {
        await this.ui.alert('ERREUR', res.raw || 'Identifiants invalides');
      }
    } catch (e) {
      await this.ui.alert('ERREUR', 'Impossible de joindre le serveur');
      console.error(e);
    }
  }

  async signInPersonel(): Promise<void> {
    if (!this.username) return this.ui.alert('ATTENTION', 'Le champ Login est vide');
    if (!this.password) return this.ui.alert('ATTENTION', 'Le champ Mot de passe est vide');

    try {
      const res = await this.ui.withLoading('Connexion…', () =>
        this.auth.loginStaff(this.username, this.password),
      );
      if (res.ok) {
        await this.ui.alert('BIENVENUE', res.raw);
        await this.router.navigateByUrl(res.redirectTo!);
      } else {
        await this.ui.alert('ERREUR', res.raw || 'Identifiants invalides');
      }
    } catch (e) {
      await this.ui.alert('ERREUR', 'Impossible de joindre le serveur');
      console.error(e);
    }
  }

  signUp(): void {
    this.router.navigateByUrl('/register');
  }

  forgotPass(): void {
    this.ui.alert('Mot de passe oublié', 'Fonction à venir.');
  }

  fbLogin(): void {
    this.facebook.login().subscribe((connected) => {
      if (connected) this.facebook.getProfile().subscribe((p) => (this.userProfile = p));
    });
  }

  googleLogin(): void {
    this.ui.alert('Google', 'SSO Google désactivé pour l’instant (voir MIGRATION.md).');
  }
}
