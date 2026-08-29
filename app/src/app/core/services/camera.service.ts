import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 * Remplacement de `@ionic-native/camera` (Cordova) par `@capacitor/camera`.
 * `takePhoto()` renvoie une data URL base64 (`data:image/jpeg;base64,...`),
 * exactement ce que l'ancien code stockait dans `cameraData` / `base64Image`.
 * Sur le web, Capacitor ouvre un sélecteur de fichier / la webcam.
 */
@Injectable({ providedIn: 'root' })
export class CameraService {
  async takePhoto(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // Caméra ou Galerie
        width: 1024,
      });
      return photo.dataUrl ?? null;
    } catch {
      // annulation utilisateur / permission refusée
      return null;
    }
  }
}
