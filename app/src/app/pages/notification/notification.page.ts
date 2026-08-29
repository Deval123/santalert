import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/angular';

import { NotificationsService } from '../../core/services/notifications.service';
import { UiService } from '../../core/services/ui.service';

/**
 * Port de `pages/notification` — planification d'un rappel local.
 * (Ancienne page : `@ionic-native/local-notifications`.)
 */
@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonLabel,
    IonButton,
    IonText,
  ],
})
export class NotificationPage {
  private notifs = inject(NotificationsService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  isNative = Capacitor.isNativePlatform();
  titre = 'Rappel Sant’alert';
  message = '';
  when = new Date(Date.now() + 3600_000).toISOString();

  async schedule(): Promise<void> {
    if (!this.message) return this.ui.alert('ATTENTION', 'Le message est vide');
    const at = new Date(this.when);
    if (at.getTime() <= Date.now()) return this.ui.alert('ATTENTION', 'Choisissez une date future');

    const ok = await this.notifs.ensurePermission();
    if (!ok) {
      return this.ui.alert(
        'Indisponible',
        this.isNative
          ? "Permission de notifications refusée."
          : 'Les rappels locaux ne fonctionnent que dans l’application mobile.',
      );
    }
    await this.notifs.scheduleAt(this.titre, this.message, at);
    await this.ui.alert('OK', 'Rappel programmé pour le ' + at.toLocaleString());
    this.message = '';
    this.cdr.detectChanges();
  }
}
