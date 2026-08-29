import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app.routes';
import { StorageService } from './core/services/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Le code porté est impératif (pas de signals) -> détection de changement
    // pilotée par zone.js. `eventCoalescing` limite les cycles superflus.
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // driverOrder par défaut : IndexedDB puis LocalStorage.
    importProvidersFrom(IonicStorageModule.forRoot({ name: '__mydb' })),
    provideAppInitializer(() => inject(StorageService).init()),
  ],
};
