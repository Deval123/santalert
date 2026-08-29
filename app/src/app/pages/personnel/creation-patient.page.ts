import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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

/** Port de `pages/creation-patient` — création d'un compte patient par le personnel. */
@Component({
  selector: 'app-creation-patient',
  templateUrl: 'creation-patient.page.html',
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
export class CreationPatientPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  countries: any[] = [];
  model = {
    username: '',
    firstname: '',
    email: '',
    email1: '',
    mobile: '',
    mobile1: '',
    password: '',
    country: null as any,
  };

  async ngOnInit(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.post.postData<{ server_response: any[] }>({}, 'showPays.php'),
      );
      this.countries = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async create(): Promise<void> {
    const m = this.model;
    if (!m.username) return this.ui.alert('ATTENTION', 'Le login est vide');
    if (!m.password) return this.ui.alert('ATTENTION', 'Le mot de passe est vide');
    if (!m.email) return this.ui.alert('ATTENTION', "L'email est vide");

    const res = await this.ui.withLoading('Création…', () =>
      firstValueFrom(this.post.postData<string>(m, 'register.php')),
    );
    if (res === 'Registration successfull') {
      await this.ui.alert('OK', 'Compte patient créé');
      this.router.navigateByUrl('/gestion-patient');
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
