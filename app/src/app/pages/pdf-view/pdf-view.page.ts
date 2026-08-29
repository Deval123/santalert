import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular';

import { FilesService } from '../../core/services/files.service';
import { UiService } from '../../core/services/ui.service';

/**
 * Port de `pages/pdf-view` (Cordova `DocumentViewer` + `FileTransfer`).
 * Ouvre un PDF passé via l'état de navigation :
 *   router.navigate(['/pdf-view'], { state: { url } })
 *   router.navigate(['/pdf-view'], { state: { base64, name, mime } })
 * Le rendu réel (visionneuse système / téléchargement) est délégué à `FilesService`.
 */
@Component({
  selector: 'app-pdf-view',
  templateUrl: 'pdf-view.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class PdfViewPage {
  private files = inject(FilesService);
  private ui = inject(UiService);

  readonly url: string | null = history.state?.url ?? null;
  readonly base64: string | null = history.state?.base64 ?? null;
  readonly name: string = history.state?.name ?? 'document.pdf';
  readonly mime: string = history.state?.mime ?? 'application/pdf';

  get hasDoc(): boolean {
    return !!this.url || !!this.base64;
  }

  async open(): Promise<void> {
    try {
      if (this.base64) {
        await this.files.openBase64(this.base64, this.name, this.mime);
      } else if (this.url) {
        await this.files.openUrl(this.url);
      }
    } catch (e) {
      await this.ui.alert('Erreur', "Impossible d'ouvrir le document : " + String(e));
    }
  }
}
