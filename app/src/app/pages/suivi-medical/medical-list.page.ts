import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  IonLabel,
} from '@ionic/angular';

import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { Session } from '../../core/services/session';

interface Kind {
  title: string;
  endpoint: string;
  lines: (r: any) => string[];
}

const KINDS: Record<string, Kind> = {
  consultation: {
    title: 'Consultations',
    endpoint: 'showConsulpers.php',
    lines: (r) => [
      `${r.datecreate || '—'} · ${r.nom_medecin || '—'}${r.Etsnom ? ' · ' + r.Etsnom : ''}`,
      r.ordo_contenu ? `Ordonnance : ${r.ordo_contenu}` : '',
      r.examen_contenu ? `Examen : ${r.examen_contenu}` : '',
      r.auscul_contenu ? `Auscultation : ${r.auscul_contenu}` : '',
      r.rdv_datedebut ? `Prochain RDV : ${r.rdv_datedebut}` : '',
      r.observation ? r.observation : '',
    ],
  },
  examen: {
    title: 'Examens',
    endpoint: 'showExamenPatient.php',
    lines: (r) => [
      `${r.consultation_date || r.datecreate || '—'} · ${r.medecin || '—'}`,
      r.contenu || '',
      r.resultat ? `Résultat : ${r.resultat}` : '',
    ],
  },
  hospitalisation: {
    title: 'Hospitalisations',
    endpoint: 'showHospitalisationPatient.php',
    lines: (r) => [
      `Entrée ${r.date_entree || '—'}${r.date_sortie ? ' → sortie ' + r.date_sortie : ''}`,
      r.medecinTraitant ? `Médecin : ${r.medecinTraitant}` : '',
      r.diagnostique ? `Diagnostic : ${r.diagnostique}` : '',
      r.symptome ? `Symptômes : ${r.symptome}` : '',
      r.numeroChambre ? `Chambre ${r.numeroChambre} / lit ${r.numeroLit || '—'}` : '',
    ],
  },
};

/** Liste médicale lecture seule (route `/suivi-medical/:kind`). */
@Component({
  selector: 'app-medical-list',
  templateUrl: 'medical-list.page.html',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class MedicalListPage implements OnInit {
  private post = inject(PostService);
  private auth = inject(AuthService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  cfg!: Kind;
  rows: any[] = [];

  async ngOnInit(): Promise<void> {
    const kind = this.route.snapshot.paramMap.get('kind') ?? 'consultation';
    this.cfg = KINDS[kind] ?? KINDS['consultation'];
    await this.auth.ensurePatientLoaded();
    try {
      const res = await this.ui.withLoading('Chargement…', () =>
        firstValueFrom(
          this.post.postData<{ server_response: any[] }>(
            { patients_id: Session.patientId, patients: Session.patients },
            this.cfg.endpoint,
          ),
        ),
      );
      this.rows = res?.server_response ?? [];
    } catch (e) {
      console.error(e);
    } finally {
      this.cdr.detectChanges();
    }
  }

  linesOf(r: any): string[] {
    return this.cfg.lines(r).filter(Boolean);
  }
}
