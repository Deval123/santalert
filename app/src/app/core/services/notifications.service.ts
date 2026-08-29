import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Remplacement de `de.appplant.cordova.plugin.local-notification` /
 * `@ionic-native/local-notifications` par `@capacitor/local-notifications`.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private granted = false;

  async ensurePermission(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    if (this.granted) return true;
    const res = await LocalNotifications.requestPermissions();
    this.granted = res.display === 'granted';
    return this.granted;
  }

  /** Programme une notification locale à la date donnée (ignorée si dans le passé). */
  async scheduleAt(title: string, body: string, at: Date): Promise<void> {
    if (!(await this.ensurePermission())) return;
    if (at.getTime() <= Date.now()) return;
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 2_000_000_000),
          title,
          body,
          schedule: { at },
        },
      ],
    });
  }

  /** Rappel 1h avant l'échéance (usage agenda / alertes). */
  async remindBefore(title: string, body: string, dueIso: string, hoursBefore = 1): Promise<void> {
    const due = new Date(dueIso);
    if (isNaN(due.getTime())) return;
    await this.scheduleAt(title, body, new Date(due.getTime() - hoursBefore * 3_600_000));
  }
}
