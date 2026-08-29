import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { UiService } from '../../core/services/ui.service';
import { API } from '../../core/config/api.config';

/** Port de `pages/rechercher-patients` — résultats de recherche + sélection. */
@Component({
  selector: 'app-rechercher-patients',
  templateUrl: 'rechercher-patients.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class RechercherPatientsPage implements OnInit {
  private post = inject(PostService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  term = '';
  results: any[] = [];
  searched = false;
  readonly server = `${API.base}/`;

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap.get('q');
    this.term = q || JSON.parse(localStorage.getItem('rech') ?? '""');
    if (this.term) void this.search();
  }

  async search(): Promise<void> {
    const nom = this.term.trim();
    if (!nom) return;
    localStorage.setItem('rech', JSON.stringify(nom));
    try {
      const res = await this.ui.withLoading('Recherche…', () =>
        firstValueFrom(
          this.post.postData<{ server_response: any[] }>({ nom }, 'rechecherPatients.php'),
        ),
      );
      this.results = res?.server_response ?? [];
      this.searched = true;
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  /** Sélectionne un patient : devient le patient « actif » pour les autres écrans. */
  select(patient: any): void {
    localStorage.setItem('patients', JSON.stringify([patient]));
    this.router.navigateByUrl('/ajout-info');
  }
}
