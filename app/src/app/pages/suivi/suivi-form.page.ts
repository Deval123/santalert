import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
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
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/angular';

import { RecordService } from '../../core/services/record.service';
import { UiService } from '../../core/services/ui.service';
import { entityOf, SuiviEntity } from './suivi.config';

/** Formulaire ajout/édition générique (remplace `ajout-*` et `edit-*`). */
@Component({
  selector: 'app-suivi-form',
  templateUrl: 'suivi-form.page.html',
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
    IonTextarea,
    IonButton,
  ],
})
export class SuiviFormPage implements OnInit {
  private records = inject(RecordService);
  private ui = inject(UiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @Input() entity!: string;
  @Input() id?: string;

  get cfg(): SuiviEntity {
    return entityOf(this.entity);
  }
  model: Record<string, any> = {};
  get isEdit(): boolean {
    return !!this.id;
  }

  async ngOnInit(): Promise<void> {
    if (!this.id) return;

    // Ligne passée par la liste (state de navigation), sinon rechargée via `one`.
    let row: any = history.state?.row ?? null;
    if (!row && this.cfg.endpoints.one) {
      row = await this.records.one(this.cfg.endpoints.one, this.id).catch(() => null);
    }
    if (row) {
      for (const f of this.cfg.fields) this.model[f.key] = row[f.key] ?? row[lc(f.key)] ?? '';
      this.cdr.detectChanges();
    }
  }

  async save(): Promise<void> {
    const required = this.cfg.fields[0];
    if (!this.model[required.key]) {
      return this.ui.alert('ATTENTION', `Le champ « ${required.label} » est vide`);
    }

    const res = await this.ui.withLoading('Enregistrement…', () =>
      this.isEdit
        ? this.records.update(this.cfg.endpoints.update!, this.id!, this.model)
        : this.records.create(this.cfg.endpoints.create!, this.model),
    );

    const ok = res === 'Successfull' || res === 'data update successfull';
    if (ok) {
      await this.ui.alert('OK', 'Enregistré');
      this.router.navigate(['/suivi', this.cfg.slug]);
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }
}

function lc(s: string): string {
  return s.toLowerCase();
}
