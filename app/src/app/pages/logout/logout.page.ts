import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonContent, IonSpinner } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

/**
 * Port de `src/pages/logout/logout.ts`.
 * L'ancienne page vidait `localStorage` et faisait `navCtrl.setRoot(HomePage)`
 * depuis le constructeur ; ici on le fait dans `ionViewWillEnter`.
 */
@Component({
  selector: 'app-logout',
  imports: [IonContent, IonSpinner],
  template: `
    <ion-content class="ion-padding ion-text-center">
      <ion-spinner></ion-spinner>
      <p>Déconnexion…</p>
    </ion-content>
  `,
})
export class LogoutPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  private menu = inject(MenuController);

  async ionViewWillEnter(): Promise<void> {
    this.auth.logout();
    this.menu.close().catch(() => {});
    await this.router.navigateByUrl('/login');
  }
}
