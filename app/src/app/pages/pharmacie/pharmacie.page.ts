import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { refreshOutline, arrowBackOutline } from 'ionicons/icons';

import { DataService } from '../../core/services/data.service';
import { UiService } from '../../core/services/ui.service';

/** Port de `pages/pharmacie` — recherche par ville puis pharmacies de garde. */
@Component({
  selector: 'app-pharmacie',
  templateUrl: 'pharmacie.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonContent,
    IonSearchbar,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonBadge,
  ],
})
export class PharmaciePage implements OnInit {
  private data = inject(DataService);
  private ui = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  searchTerm = '';
  cities: any[] = [];
  selectedCity: any = null;
  pharmacies: any[] = [];

  async ngOnInit(): Promise<void> {
    try {
      await this.ui.withLoading('Chargement…', () => this.data.loadPharmacies());
    } catch (e) {
      console.error(e);
    }
    this.applyFilter();
  }

  applyFilter(): void {
    this.cities = this.data.filterItems(this.searchTerm);
    this.cdr.detectChanges();
  }

  async selectCity(city: any): Promise<void> {
    this.selectedCity = city;
    this.pharmacies = await this.ui.withLoading('Chargement…', () =>
      this.data.pharmaciesForCity(city.id),
    );
    this.cdr.detectChanges();
  }

  reset(): void {
    this.selectedCity = null;
    this.pharmacies = [];
    this.searchTerm = '';
    this.applyFilter();
  }

  constructor() {
    addIcons({ 'refresh-outline': refreshOutline, 'arrow-back-outline': arrowBackOutline });
  }
}
