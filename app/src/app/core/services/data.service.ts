import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { apiUrl } from '../config/api.config';
import { Session } from './session';

interface PharmacieResponse {
  server_response: any[];
  server_response1: any[];
  server_response2: any[];
  server_response3: any[];
}

/**
 * Port de `providers/data/data.ts`.
 * L'ancien provider lançait un appel réseau dans son constructeur — ici
 * on l'expose via `loadPharmacies()`, à appeler explicitement.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  items: any[] | null = null;

  async loadPharmacies(): Promise<void> {
    const body = { nom: Session.username, password: Session.password };
    const res = await firstValueFrom(
      this.http.post<PharmacieResponse>(apiUrl('showAllPharmacie.php'), body, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }),
    );
    localStorage.setItem('pharmacie', JSON.stringify(res.server_response));
    localStorage.setItem('regions', JSON.stringify(res.server_response1));
    localStorage.setItem('department', JSON.stringify(res.server_response2));
    localStorage.setItem('city', JSON.stringify(res.server_response3));
  }

  /** Villes du référentiel, filtrées par nom. */
  filterItems(searchTerm: string): any[] {
    const cities: any[] = JSON.parse(localStorage.getItem('city') ?? '[]') ?? [];
    const term = (searchTerm ?? '').toLowerCase();
    return cities.filter((c) => (c.name ?? '').toLowerCase().includes(term));
  }

  /** Pharmacies d'une ville (endpoint historique `showAllPhamarcie.php`). */
  async pharmaciesForCity(cityId: number | string): Promise<any[]> {
    const res = await firstValueFrom(
      this.http.post<{ server_response: any[] }>(
        apiUrl('showAllPhamarcie.php'),
        { city_id: cityId },
        { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } },
      ),
    );
    return res?.server_response ?? [];
  }
}
