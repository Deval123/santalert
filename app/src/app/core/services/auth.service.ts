import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { apiUrl, API } from '../config/api.config';
import { EventsService } from './events.service';
import { Session, StaffKind } from './session';

export interface LoginResult {
  ok: boolean;
  /** Réponse brute renvoyée par le backend PHP. */
  raw: string;
  /** Route cible après connexion réussie. */
  redirectTo?: string;
}

/**
 * Port de `providers/auth-service/auth-service.ts` + de la logique de
 * connexion dispersée dans `pages/home/home.ts`.
 * Passe de `@angular/http` (supprimé) à `HttpClient`.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private events = inject(EventsService);

  private readonly JSON_HEADERS = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };

  /** login.php — connexion patient. */
  async loginPatient(username: string, password: string): Promise<LoginResult> {
    const raw = await this.post('login.php', { username, password });
    if (raw === 'Your Login success') {
      Session.setCredentials(username, password);
      Session.setPatient();
      this.events.publish('user:loggedIn');
      return { ok: true, raw, redirectTo: '/profile' };
    }
    return { ok: false, raw };
  }

  /** loginPersonel.php — connexion personnel médical / pharmacien / laborantin. */
  async loginStaff(nom: string, password: string): Promise<LoginResult> {
    const raw = await this.post('loginPersonel.php', { nom, password });

    const roleByResponse: Record<string, { kind: StaffKind; type: string; event: string }> = {
      'Your Login success': { kind: 'personal', type: 'medecin', event: 'personaluser:loggedIn' },
      Pharmacien: { kind: 'Pharmacien', type: 'Pharmacien', event: 'Pharmacien:loggedIn' },
      laborentin: { kind: 'laborentin', type: 'laborentin', event: 'laborentin:loggedIn' },
    };

    const role = roleByResponse[raw];
    if (role) {
      Session.setCredentials(nom, password);
      Session.setStaff(role.kind, role.type);
      this.events.publish(role.event);
      return { ok: true, raw, redirectTo: '/profile-personel' };
    }
    return { ok: false, raw };
  }

  /** POST API Slim (ancien `AuthServiceProvider.postData`). */
  postSlim<T = any>(credentials: unknown, type: string): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(`${API.slim}/${type}`, JSON.stringify(credentials), this.JSON_HEADERS),
    );
  }

  logout(): void {
    this.events.publish('user:loggedOut');
    this.events.publish('personaluser:loggedOut');
    Session.clear();
  }

  /**
   * S'assure que `localStorage.patients` (fiche du patient connecté) est chargée.
   * Beaucoup de pages en dépendent (`Session.patients` / `patientId`) mais
   * seule la page profil la remplissait jusqu'ici — cassait les deep-links.
   */
  async ensurePatientLoaded(): Promise<void> {
    if (!Session.isPatient || Session.patientId > 0) return;
    try {
      const text = await this.post('show_users.php', {
        nom: Session.username,
        password: Session.password,
      });
      const parsed = JSON.parse(text);
      const rows = parsed?.server_response ?? [];
      if (rows.length) localStorage.setItem('patients', JSON.stringify(rows));
    } catch (e) {
      console.error('[auth] ensurePatientLoaded', e);
    }
  }

  /**
   * S'assure que `localStorage.personel` / `.etablissement` (fiche du personnel
   * connecté) sont chargées. Même logique que `ensurePatientLoaded`.
   */
  async ensureStaffLoaded(): Promise<void> {
    if (!Session.staffKind || Session.etablissementId > 0) return;
    try {
      const text = await this.post('showPersonel.php', {
        username: Session.username,
        password: Session.password,
      });
      const parsed = JSON.parse(text);
      if (parsed?.personel?.length) {
        localStorage.setItem('personel', JSON.stringify(parsed.personel));
      }
      if (parsed?.etablissement?.length) {
        localStorage.setItem('etablissement', JSON.stringify(parsed.etablissement));
      }
    } catch (e) {
      console.error('[auth] ensureStaffLoaded', e);
    }
  }

  /** Rejoue les events de session au démarrage (ex-`checkPreviousAuthorization`). */
  restoreSession(): string {
    if (!Session.isLoggedIn) return '/login';
    if (Session.isPatient) {
      this.events.publish('user:loggedIn');
      return '/profile';
    }
    const kind = Session.staffKind;
    if (kind === 'Pharmacien') this.events.publish('Pharmacien:loggedIn');
    else if (kind === 'laborentin') this.events.publish('laborentin:loggedIn');
    else this.events.publish('personaluser:loggedIn');
    return '/profile-personel';
  }

  private post(script: string, body: unknown): Promise<string> {
    return firstValueFrom(
      this.http.post(apiUrl(script), body, { ...this.JSON_HEADERS, responseType: 'text' as const }),
    ).then((text) => {
      // le backend renvoie tantôt du JSON ("..."), tantôt du texte brut
      try {
        const parsed = JSON.parse(text);
        return typeof parsed === 'string' ? parsed : text;
      } catch {
        return text;
      }
    });
  }
}
