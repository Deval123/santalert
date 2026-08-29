import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';

/**
 * Remplacement de `document-viewer` / `file` / `file-transfer` (Cordova).
 * - natif : écrit le fichier dans Cache puis l'ouvre avec l'app système
 * - web : déclenche un téléchargement navigateur
 */
@Injectable({ providedIn: 'root' })
export class FilesService {
  /** Ouvre un fichier fourni en base64 (sans préfixe data:) ou en data URL. */
  async openBase64(base64: string, fileName: string, mimeType: string): Promise<void> {
    const data = base64.includes(',') ? base64.split(',')[1] : base64;

    if (!Capacitor.isNativePlatform()) {
      const a = document.createElement('a');
      a.href = `data:${mimeType};base64,${data}`;
      a.download = fileName;
      a.click();
      return;
    }

    const written = await Filesystem.writeFile({
      path: fileName,
      data,
      directory: Directory.Cache,
    });
    await FileOpener.open({ filePath: written.uri, contentType: mimeType });
  }

  /** Ouvre une URL distante (PDF, image) — navigateur système / in-app. */
  async openUrl(url: string): Promise<void> {
    window.open(url, '_blank');
  }
}
