import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton,
  IonTextarea,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { CameraService } from '../../core/services/camera.service';
import { Session } from '../../core/services/session';

/**
 * Port de `pages/result` — file des examens du laboratoire + saisie du résultat.
 * (Upload photo du legacy remplacé par un champ texte ; caméra à recâbler.)
 */
@Component({
  selector: 'app-result',
  templateUrl: 'result.page.html',
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
    IonLabel,
    IonBadge,
    IonButton,
    IonTextarea,
  ],
})
export class ResultPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private camera = inject(CameraService);
  private cdr = inject(ChangeDetectorRef);

  rows: any[] = [];
  editing: number | null = null;
  draft = '';
  draftImage = '';

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    await this.reload();
  }

  async reload(): Promise<void> {
    this.editing = null;
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ server_response: any[] }>(
            { personel: Session.personel },
            'showExamensLabo.php',
          ),
        ),
      );
      this.rows = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  startResult(row: any): void {
    this.editing = row.id;
    this.draft = row.resultat ?? '';
    this.draftImage = '';
  }

  async attachPhoto(): Promise<void> {
    const dataUrl = await this.camera.takePhoto();
    if (dataUrl) {
      this.draftImage = dataUrl;
      this.cdr.detectChanges();
    }
  }

  async saveResult(row: any): Promise<void> {
    const body: Record<string, any> = { id: row.id, resultat: this.draft };
    if (this.draftImage) body['image'] = this.draftImage;
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(this.post.postData<string>(body, 'addExamenResult.php')),
    );
    if (res === 'data update successfull') {
      this.draft = '';
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
