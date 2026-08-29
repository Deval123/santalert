import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostService } from './post.service';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';
import { Session } from './session';

export interface CrudEndpoints {
  list: string;
  create?: string;
  update?: string;
  remove?: string;
  one?: string;
}

/**
 * Accès générique aux endpoints CRUD "par patient" du backend
 * (bilan, regime, auto_med, patientsagenda, …). Reproduit les contrats du
 * front historique : `{patients:[...]}` en entrée, `{server_response:[...]}`
 * en sortie, `new<Col>` pour les updates.
 */
@Injectable({ providedIn: 'root' })
export class RecordService {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private notifs = inject(NotificationsService);

  async list(script: string): Promise<any[]> {
    await this.auth.ensurePatientLoaded();
    const r = await firstValueFrom(
      this.post.postData<{ server_response: any[] }>({ patients: Session.patients }, script),
    );
    return r?.server_response ?? [];
  }

  one(script: string, id: number | string): Promise<any | null> {
    return firstValueFrom(
      this.post.postData<{ server_response: any[] }>({ id }, script),
    ).then((r) => r?.server_response?.[0] ?? null);
  }

  async create(script: string, body: Record<string, any>): Promise<string> {
    await this.auth.ensurePatientLoaded();
    const res = await firstValueFrom(
      this.post.postData<string>({ ...body, patients: Session.patients }, script),
    );
    // Alerte agenda -> rappel local 1h avant.
    if (res === 'Successfull' && script.startsWith('insertAgenda') && body['datedebut']) {
      void this.notifs.remindBefore(
        'Rappel Sant’alert',
        body['nature'] ? `${body['nature']} — ${body['lieu'] ?? ''}`.trim() : 'Rendez-vous à venir',
        body['datedebut'],
      );
    }
    return res;
  }

  update(script: string, id: number | string, changes: Record<string, any>): Promise<string> {
    const payload: Record<string, any> = { id };
    for (const [k, v] of Object.entries(changes)) payload['new' + k] = v;
    return firstValueFrom(this.post.postData<string>(payload, script));
  }

  remove(script: string, id: number | string): Promise<string> {
    return firstValueFrom(this.post.postData<string>({ id }, script));
  }
}
