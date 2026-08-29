import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';
import { AuthService } from '../../core/services/auth.service';
import { EventsService } from '../../core/services/events.service';
import { Session } from '../../core/services/session';

/**
 * Port de `src/pages/register/register.ts` + `register.html`.
 * - refs de template `#username` … → modèle `patient` / `staff` / `admin` (ngModel)
 * - `Http` + `.map(res.json())` → `PostService`
 * - navigation → `Router` ; pages cibles non portées → `/pending/:name`
 */
@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
})
export class RegisterPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private auth = inject(AuthService);
  private events = inject(EventsService);
  private router = inject(Router);

  opt: 'patient' | 'personnel' | 'admin' = 'patient';
  countries: any[] = [];

  patient = {
    username: '',
    firstname: '',
    email: '',
    email1: '',
    mobile: '',
    mobile1: '',
    password: '',
    country: null as any,
  };
  staff = { code: '' };
  admin = { login: '', password: '' };

  async ngOnInit(): Promise<void> {
    const body = { nom: Session.username, password: Session.password };
    try {
      const res = await this.post
        .postData<{ server_response: any[] }>(body, 'showPays.php')
        .toPromise();
      this.countries = res?.server_response ?? [];
      localStorage.setItem('pays', JSON.stringify(this.countries));
    } catch (e) {
      console.error(e);
    }
  }

  async register(): Promise<void> {
    const p = this.patient;
    if (!p.username) return this.ui.alert('ATTENTION', 'Le champ Login est vide');
    if (!p.email) return this.ui.alert('ATTENTION', 'Le champ Email est vide');
    if (!p.mobile) return this.ui.alert('ATTENTION', 'Le numéro à contacter est vide');
    if (!p.firstname) return this.ui.alert('ATTENTION', 'Le champ Nom est vide');
    if (!p.password) return this.ui.alert('ATTENTION', 'Le champ Mot de passe est vide');

    localStorage.setItem('patients', JSON.stringify(p));
    try {
      const res = await this.ui.withLoading('Enregistrement…', () =>
        this.post.postData<string>(p, 'register.php').toPromise(),
      );
      if (res === 'Registration successfull') {
        await this.ui.alert('BIENVENUE', res);
        Session.setCredentials(p.username, p.password);
        Session.setPatient();
        this.events.publish('user:loggedIn');
        await this.router.navigateByUrl('/profile');
      } else {
        await this.ui.alert('ERREUR', String(res));
      }
    } catch (e) {
      await this.ui.alert('ERREUR', 'Impossible de joindre le serveur');
      console.error(e);
    }
  }

  async verifyCompanyCode(): Promise<void> {
    if (!this.staff.code) return this.ui.alert('ATTENTION', "Le code de l'entreprise est vide");
    localStorage.setItem('code', JSON.stringify(this.staff.code));
    await this.router.navigate(['/add-personel'], { state: { cod: this.staff.code } });
  }

  async adminSignIn(): Promise<void> {
    if (!this.admin.login) return this.ui.alert('ATTENTION', 'Le champ Login est vide');
    if (!this.admin.password) return this.ui.alert('ATTENTION', 'Le champ Password est vide');
    try {
      const res = await this.ui.withLoading('Connexion…', () =>
        this.post
          .postData<string>(
            { login: this.admin.login, password: this.admin.password },
            'loginAdmin.php',
          )
          .toPromise(),
      );
      if (res === 'Your Login success') {
        await this.ui.alert('BIENVENUE', res);
        await this.router.navigateByUrl('/admin');
      } else {
        await this.ui.alert('ERREUR', String(res));
      }
    } catch (e) {
      await this.ui.alert('ERREUR', 'Impossible de joindre le serveur');
      console.error(e);
    }
  }

  adminSignUp(): void {
    this.router.navigateByUrl('/add-admin');
  }
}
