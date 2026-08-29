import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline } from 'ionicons/icons';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

interface SubActe {
  slug: string;
  title: string;
  list: string;
  insert: string;
  columns: string[];
  fields: { key: string; label: string; type?: string }[];
}

const TXT = (key: string, label: string) => ({ key, label, type: 'textarea' as const });

/** Sous-actes rattachés à une consultation ou une hospitalisation. */
const SUBS: Record<'consultation' | 'hospitalisation', SubActe[]> = {
  consultation: [
    {
      slug: 'examen',
      title: 'Examens',
      list: 'showExamenPatient.php',
      insert: 'insertExamenPersonelEts.php',
      columns: ['contenu'],
      fields: [TXT('contenu', 'Examen demandé'), { key: 'resultat', label: 'Résultat', type: 'textarea' }],
    },
    {
      slug: 'ordonnance',
      title: 'Ordonnances',
      list: 'showOrdonance.php',
      insert: 'insertOrdonance.php',
      columns: ['contenu'],
      fields: [TXT('contenu', 'Contenu de l’ordonnance')],
    },
    {
      slug: 'auscultation',
      title: 'Auscultations',
      list: 'showAuscultation.php',
      insert: 'insertAuscultation.php',
      columns: ['contenu'],
      fields: [TXT('contenu', 'Auscultation')],
    },
    {
      slug: 'parametres',
      title: 'Paramètres',
      list: 'showParametres.php',
      insert: 'insertParametres.php',
      columns: ['datecreate', 'ta', 'pouls', 'poids'],
      fields: [
        { key: 'datecreate', label: 'Date', type: 'datetime-local' },
        { key: 'ta', label: 'TA' },
        { key: 'db', label: 'DB' },
        { key: 'bg', label: 'BG' },
        { key: 'pouls', label: 'Pouls' },
        { key: 'taille', label: 'Taille' },
        { key: 'poids', label: 'Poids' },
        { key: 'tension', label: 'Tension' },
        { key: 'ddr', label: 'DDR' },
        { key: 'dpa', label: 'DPA' },
      ],
    },
    {
      slug: 'rdv',
      title: 'RDV',
      list: 'showRdv.php',
      insert: 'insertRdvConsult.php',
      columns: ['datedebut', 'nature', 'lieu'],
      fields: [
        { key: 'datedebut', label: 'Date de début', type: 'datetime-local' },
        { key: 'datefin', label: 'Date de fin', type: 'datetime-local' },
        { key: 'nature', label: 'Nature' },
        { key: 'lieu', label: 'Lieu' },
        TXT('observation', 'Observation'),
      ],
    },
  ],
  hospitalisation: [
    {
      slug: 'traitement',
      title: 'Traitements',
      list: 'showTraitement.php',
      insert: 'insertTraitement.php',
      columns: ['datecreate', 'contenu'],
      fields: [
        { key: 'datecreate', label: 'Date', type: 'datetime-local' },
        TXT('contenu', 'Contenu du traitement'),
      ],
    },
    {
      slug: 'particularites',
      title: 'Particularités',
      list: 'showParticularites.php',
      insert: 'insertParticularites.php',
      columns: ['chirurgicale', 'anesthesie'],
      fields: [
        TXT('chirurgicale', 'Chirurgicale'),
        TXT('anesthesie', 'Anesthésie'),
        TXT('soinsIntensifs', 'Soins intensifs'),
        TXT('urgences', 'Urgences'),
        TXT('autres', 'Autres'),
      ],
    },
  ],
};

/** Détail d'une consultation / hospitalisation : ses sous-actes (route `/ajout-info/:parent/:id`). */
@Component({
  selector: 'app-acte-detail',
  templateUrl: 'acte-detail.page.html',
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
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
  ],
})
export class ActeDetailPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  parent: 'consultation' | 'hospitalisation' = 'consultation';
  parentId = 0;
  subs: SubActe[] = [];
  active = '';
  rows: any[] = [];
  adding = false;
  model: Record<string, string> = {};

  get sub(): SubActe {
    return this.subs.find((s) => s.slug === this.active) ?? this.subs[0];
  }

  async ngOnInit(): Promise<void> {
    const p = this.route.snapshot.paramMap.get('parent');
    this.parent = p === 'hospitalisation' ? 'hospitalisation' : 'consultation';
    this.parentId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.subs = SUBS[this.parent];
    this.active = this.subs[0].slug;
    await this.auth.ensureStaffLoaded();
    await this.reload();
  }

  async reload(): Promise<void> {
    this.adding = false;
    const body: Record<string, any> = { [this.parent + '_id']: this.parentId };
    body[this.parent] = [{ id: this.parentId }];
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(this.post.postData<{ server_response: any[] }>(body, this.sub.list)),
      );
      this.rows = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  switch(slug: string): void {
    this.active = slug;
    void this.reload();
  }

  async save(): Promise<void> {
    const first = this.sub.fields[0];
    if (!this.model[first.key]) return this.ui.alert('ATTENTION', `« ${first.label} » est requis`);

    const body: Record<string, any> = {
      ...this.model,
      personel: Session.personel,
      [this.parent]: [{ id: this.parentId }],
    };
    const res = await this.ui.withLoading('Enregistrement…', () =>
      firstValueFrom(this.post.postData<string>(body, this.sub.insert)),
    );
    if (res === 'Successfull') {
      this.model = {};
      await this.reload();
    } else {
      await this.ui.alert('Erreur', String(res));
    }
  }

  constructor() {
    addIcons({ add, 'arrow-back-outline': arrowBackOutline });
  }
}
