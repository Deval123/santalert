import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';

/** Port de `pages/admin` — tableau de bord administrateur. */
@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class AdminPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  admins: any[] = [];

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(this.post.postData<{ server_response: any[] }>({}, 'showAdmin.php')),
      );
      this.admins = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  go(url: string): void {
    this.router.navigateByUrl(url);
  }
}
