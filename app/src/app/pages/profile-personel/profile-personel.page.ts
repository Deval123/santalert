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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

/** Port de `src/pages/profile-personel/profile-personel.ts` + template. */
@Component({
  selector: 'app-profile-personel',
  templateUrl: 'profile-personel.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
  ],
})
export class ProfilePersonelPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);

  etablissements: any[] = [];
  items: any[] = [];

  async ngOnInit(): Promise<void> {
    const body = { username: Session.username, password: Session.password };
    try {
      const res = await this.ui.withLoading('Chargement du profil…', () =>
        this.post
          .postData<{ personel: any[]; etablissement: any[] }>(body, 'showPersonel.php')
          .toPromise(),
      );
      this.items = res?.personel ?? [];
      this.etablissements = res?.etablissement ?? [];
      localStorage.setItem('personel', JSON.stringify(this.items));
      localStorage.setItem('etablissement', JSON.stringify(this.etablissements));
    } catch (e) {
      console.error(e);
    }
  }

  editPersonel(item: any): void {
    this.router.navigate(['/edit-personel'], { state: { item } });
  }

  goToHome(): void {
    this.router.navigateByUrl('/home-personnel');
  }
}
