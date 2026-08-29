import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

/**
 * Wrapper autour de `@ionic/storage-angular` (remplace `@ionic/storage`
 * d'Ionic 3). `init()` est appelé une fois au démarrage via
 * `provideAppInitializer` dans `app.config.ts`.
 *
 * NB : l'app historique s'appuie surtout sur `window.localStorage`
 * (username, password, userProfile, patients, ...). On garde ce
 * comportement ; ce service est là pour les cas où l'ancien code
 * utilisait `Storage.get/set` de manière asynchrone.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    try {
      this._storage = await this.storage.create();
    } catch (e) {
      // Ne jamais bloquer le démarrage de l'app si le stockage échoue :
      // l'app s'appuie surtout sur window.localStorage.
      console.warn('[StorageService] init a échoué, fallback localStorage seul', e);
      this._storage = null;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    return (await this._storage?.get(key)) ?? null;
  }

  async set(key: string, value: any): Promise<any> {
    return this._storage?.set(key, value);
  }

  async remove(key: string): Promise<any> {
    return this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
