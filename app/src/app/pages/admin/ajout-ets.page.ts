import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';

/** Port de `pages/ajout-ets` — création d'un établissement (contexte admin). */
@Component({
  selector: 'app-ajout-ets',
  templateUrl: 'ajout-ets.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
})
export class AjoutEtsPage {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);

  model: Record<string, string> = {
    statut: '',
    type: '',
    nom: '',
    code: '',
    ville: '',
    telephone: '',
    email: '',
    adresse: '',
  };

  readonly fields = [
    { key: 'nom', label: 'Nom' },
    { key: 'code', label: "Code de l'établissement" },
    { key: 'ville', label: 'Ville' },
    { key: 'telephone', label: 'Téléphone', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'adresse', label: 'Adresse' },
  ];

  async submit(): Promise<void> {
    if (!this.model['nom'] || !this.model['code']) {
      return this.ui.alert('ATTENTION', 'Nom et code sont requis');
    }
    const res = await this.ui.withLoading('Création…', () =>
      firstValueFrom(this.post.postData<string>(this.model, 'insertEts.php')),
    );
    if (res === 'Registration successfull') {
      await this.ui.alert('OK', 'Établissement créé');
      this.router.navigateByUrl('/admin');
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
