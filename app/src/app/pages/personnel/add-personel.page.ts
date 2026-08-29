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
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';

/** Port de `pages/add-personel` — inscription d'un personnel (code établissement requis). */
@Component({
  selector: 'app-add-personel',
  templateUrl: 'add-personel.page.html',
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
    IonButton,
  ],
})
export class AddPersonelPage {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);

  model: Record<string, string> = {
    nom: '',
    matricule: '',
    telephone: '',
    emailpers: '',
    type_personnel: '',
    passwordpers: '',
    code: JSON.parse(localStorage.getItem('code') ?? '""'),
  };

  readonly fields = [
    { key: 'nom', label: 'Nom' },
    { key: 'matricule', label: 'Matricule' },
    { key: 'telephone', label: 'Téléphone', type: 'tel' },
    { key: 'emailpers', label: 'Email', type: 'email' },
    { key: 'type_personnel', label: 'Fonction (medecin / Pharmacien / laborentin)' },
    { key: 'passwordpers', label: 'Mot de passe', type: 'password' },
    { key: 'code', label: "Code de l'établissement" },
  ];

  async submit(): Promise<void> {
    const m = this.model;
    if (!m['nom'] || !m['passwordpers'] || !m['code']) {
      return this.ui.alert('ATTENTION', 'Nom, mot de passe et code établissement sont requis');
    }
    const res = await this.ui.withLoading('Création…', () =>
      firstValueFrom(this.post.postData<string>(this.model, 'insertPersonnel.php')),
    );
    if (res === 'Registration successfull') {
      await this.ui.alert('OK', 'Personnel créé');
      this.router.navigateByUrl('/home-personnel');
    } else if (res === "don't exist") {
      await this.ui.alert('Erreur', "Ce code d'établissement n'existe pas");
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
