import { Injectable } from '@angular/core';

/**
 * Alertes & spinner de chargement.
 *
 * On crée les éléments `<ion-alert>` / `<ion-loading>` à la main : avec
 * `@ionic/angular` v9 (build "custom elements") + Vite, `AlertController` /
 * `LoadingController.create()` ne résolvent jamais leur promesse et figent
 * tout `await`. Les éléments créés directement fonctionnent.
 *
 * Chaque `present()` / `dismiss()` est borné par un timeout : même si l'overlay
 * se comporte mal, l'appli ne se fige pas.
 */
@Injectable({ providedIn: 'root' })
export class UiService {
  async alert(header: string, message: string): Promise<void> {
    const el = document.createElement('ion-alert') as HTMLIonAlertElement;
    el.header = header;
    el.message = message;
    el.buttons = ['OK'];
    document.body.appendChild(el);
    try {
      await withTimeout(el.present(), 2000);
      await el.onDidDismiss(); // attente volontaire : action utilisateur
    } catch {
      /* overlay indisponible : on n'empêche pas le flux */
    } finally {
      el.remove();
    }
  }

  /** Exécute `fn` en affichant un spinner ; le masque quoi qu'il arrive. */
  async withLoading<T>(message: string, fn: () => Promise<T>): Promise<T> {
    const el = document.createElement('ion-loading') as HTMLIonLoadingElement;
    el.message = message;
    document.body.appendChild(el);
    await withTimeout(el.present(), 2000).catch(() => {});
    try {
      return await fn();
    } finally {
      await withTimeout(el.dismiss(), 2000).catch(() => {});
      el.remove();
    }
  }
}

/** Résout quand `p` résout, ou au bout de `ms` (sans rejeter). */
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([p, new Promise<void>((r) => setTimeout(r, ms))]);
}
