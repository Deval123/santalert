import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonSearchbar,
  IonButton,
} from '@ionic/angular';

import { AuthService } from '../../core/services/auth.service';
import { Session } from '../../core/services/session';

/** Port de `pages/gestion-patient` — hub : nouveau compte / rechercher un patient. */
@Component({
  selector: 'app-gestion-patient',
  templateUrl: 'gestion-patient.page.html',
  imports: [
    CommonModule,
    FormsModule,
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
    IonSearchbar,
    IonButton,
  ],
})
export class GestionPatientPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  etablissements: any[] = [];
  term = '';

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    this.etablissements = Session.etablissement;
  }

  nouveau(): void {
    this.router.navigateByUrl('/creation-patient');
  }

  rechercher(): void {
    const t = this.term.trim();
    if (!t) return;
    localStorage.setItem('rech', JSON.stringify(t));
    this.router.navigate(['/rechercher-patients'], { queryParams: { q: t } });
  }
}
