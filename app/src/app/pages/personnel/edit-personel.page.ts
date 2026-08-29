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
  IonButton,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

/** Port de `pages/edit-personel` — édition de la fiche du personnel connecté. */
@Component({
  selector: 'app-edit-personel',
  templateUrl: 'edit-personel.page.html',
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
export class EditPersonelPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  model: Record<string, string> = {};
  readonly fields = [
    { key: 'nom', label: 'Nom' },
    { key: 'matricule', label: 'Matricule' },
    { key: 'telephone', label: 'Téléphone', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'type_personnel', label: 'Fonction' },
  ];

  async ngOnInit(): Promise<void> {
    await this.auth.ensureStaffLoaded();
    const p = Session.personel[0] ?? {};
    for (const f of this.fields) this.model[f.key] = p[f.key] ?? '';
    this.cdr.detectChanges();
  }

  async save(): Promise<void> {
    const id = Session.personel[0]?.id;
    if (!id) return this.ui.alert('Erreur', 'Personnel inconnu');
    const payload: Record<string, any> = { id };
    for (const f of this.fields) payload['new' + f.key] = this.model[f.key];

    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(this.post.postData<string>(payload, 'editPersonel.php')),
    );
    if (res === 'data update successfull') {
      localStorage.setItem(
        'personel',
        JSON.stringify([{ ...(Session.personel[0] ?? {}), ...this.model, id }]),
      );
      await this.ui.alert('OK', 'Fiche mise à jour');
      this.router.navigateByUrl('/profile-personel');
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}
