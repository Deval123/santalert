import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';
import { API } from '../../core/config/api.config';
import { Session } from '../../core/services/session';

interface Patient {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  filename?: string;
}

/** Port de `src/pages/profile/profile.ts` + `profile.html`. */
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonButton,
  ],
})
export class ProfilePage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);

  readonly server = `${API.base}/`;
  items: Patient[] = [];

  async ngOnInit(): Promise<void> {
    const cached = localStorage.getItem('patients');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        this.items = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        /* ignore */
      }
    }

    const body = { nom: Session.username, password: Session.password };
    try {
      const res = await this.ui.withLoading('Chargement du profil…', () =>
        this.post.postData<{ server_response: Patient[] }>(body, 'show_users.php').toPromise(),
      );
      this.items = res?.server_response ?? this.items;
      localStorage.setItem('patients', JSON.stringify(this.items));
    } catch (e) {
      console.error(e);
    }
  }

  editPatients(item: Patient): void {
    this.router.navigate(['/update-profile'], { state: { item } });
  }
}
