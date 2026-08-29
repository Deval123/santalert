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

/** Port de `pages/add-admin` — création d'un compte administrateur. */
@Component({
  selector: 'app-add-admin',
  templateUrl: 'add-admin.page.html',
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
export class AddAdminPage {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);

  model: Record<string, string> = {
    login: '',
    password: '',
    description: '',
    email: '',
    telephone: '',
    gender: '',
  };
  readonly fields = [
    { key: 'login', label: 'Login' },
    { key: 'password', label: 'Mot de passe', type: 'password' },
    { key: 'description', label: 'Description' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'telephone', label: 'Téléphone', type: 'tel' },
    { key: 'gender', label: 'Genre' },
  ];

  async submit(): Promise<void> {
    if (!this.model['login'] || !this.model['password']) {
      return this.ui.alert('ATTENTION', 'Login et mot de passe sont requis');
    }
    const res = await this.ui.withLoading('Création…', () =>
      firstValueFrom(this.post.postData<string>(this.model, 'registerAdmin.php')),
    );
    if (res === 'Registration successfull') {
      await this.ui.alert('OK', 'Administrateur créé');
      this.router.navigateByUrl('/admin');
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
