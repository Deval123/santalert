import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonRouterOutlet,
  IonNote,
} from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

import { EventsService } from './core/services/events.service';
import { AuthService } from './core/services/auth.service';
import { Session } from './core/services/session';

interface MenuLink {
  title: string;
  url: string;
}

/**
 * Port de `src/app/app.component.ts` + `src/app/app.html`.
 * - `Events` → `EventsService`
 * - navigation par string (`component: 'HomePage'`) → routes Angular
 * - `<ion-nav [root]>` + 3 `<ion-menu>` → `<ion-split-pane>` + 1 `<ion-menu>` piloté par rôle
 * Toutes les entrées de menu pointent désormais sur des pages portées.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonMenuToggle,
    IonRouterOutlet,
    IonNote,
  ],
})
export class AppComponent implements OnInit {
  private events = inject(EventsService);
  private auth = inject(AuthService);
  private router = inject(Router);

  pages: MenuLink[] = [
    { title: 'Login', url: '/login' },
    { title: 'Help', url: '/help' },
  ];
  displayName = "Sant'Alert";

  private readonly loggedOutMenu: MenuLink[] = [
    { title: 'Login', url: '/login' },
    { title: 'Help', url: '/help' },
    { title: 'Apropos', url: '/contact-personnel' },
  ];

  private readonly patientMenu: MenuLink[] = [
    { title: 'Suivi Personnel', url: '/suivi-perso' },
    { title: 'Suivi Médical', url: '/suivi-medical' },
    { title: 'Suivi Mère & enfants', url: '/suivi-mere-enfant' },
    { title: 'Alerte', url: '/suivi/agenda' },
    { title: 'Recommandation', url: '/suivi/recommandation' },
    { title: 'Maladie chronique', url: '/suivi/maladie' },
    { title: 'Statistiques', url: '/statistique' },
    { title: "Infos d'urgence", url: '/infos-urgence' },
    { title: 'Infos utile', url: '/infos-utile' },
    { title: 'Pharmacie de garde', url: '/pharmacie' },
    { title: 'Paramètres', url: '/parametres' },
    { title: 'Mon profil', url: '/profile' },
    { title: 'Déconnexion', url: '/logout' },
  ];

  private readonly staffMenu: MenuLink[] = [
    { title: 'Accueil', url: '/home-personnel' },
    { title: 'Gestion patient', url: '/gestion-patient' },
    { title: 'Départements / services', url: '/departement' },
    { title: 'Agenda', url: '/agenda-personnel' },
    { title: "Infos d'urgence", url: '/infos-urgence' },
    { title: 'Suivi mère & enfant', url: '/suivi-mere-enfant' },
    { title: 'Infos utile', url: '/infos-utile' },
    { title: 'Pharmacie de garde', url: '/pharmacie' },
    { title: 'Infos générales patient', url: '/infos-general-patient' },
    { title: 'Lieu de consultation & prescripteur', url: '/infos-consul-prescripteur' },
    { title: 'Ordonnance pour la pharmacie', url: '/pharmacie-labo' },
    { title: 'Help', url: '/help' },
    { title: 'Apropos', url: '/contact-personnel' },
    { title: 'Paramètres', url: '/parametre-personnel' },
    { title: 'Mon profil', url: '/profile-personel' },
    { title: 'Déconnexion', url: '/logout' },
  ];

  private readonly pharmacienMenu: MenuLink[] = [
    { title: 'Accueil', url: '/home-personnel' },
    { title: 'Infos utile', url: '/infos-utile' },
    { title: 'Pharmacie de garde', url: '/pharmacie' },
    { title: 'Help', url: '/help' },
    { title: 'Déconnexion', url: '/logout' },
  ];

  private readonly laborantinMenu: MenuLink[] = [
    { title: 'Accueil', url: '/home-personnel' },
    { title: "Infos d'urgence", url: '/infos-urgence' },
    { title: 'Infos utile', url: '/infos-utile' },
    { title: 'Examens pour le laboratoire', url: '/result' },
    { title: 'Help', url: '/help' },
    { title: 'Déconnexion', url: '/logout' },
  ];

  constructor() {
    this.events.subscribe('user:loggedIn', () => (this.pages = this.patientMenu));
    this.events.subscribe('personaluser:loggedIn', () => (this.pages = this.staffMenu));
    this.events.subscribe('Pharmacien:loggedIn', () => (this.pages = this.pharmacienMenu));
    this.events.subscribe('laborentin:loggedIn', () => (this.pages = this.laborantinMenu));
    this.events.subscribe('user:loggedOut', () => (this.pages = this.loggedOutMenu));
    this.events.subscribe('personaluser:loggedOut', () => (this.pages = this.loggedOutMenu));
  }

  async ngOnInit(): Promise<void> {
    // Rejoue les events de session (menu par rôle). La redirection éventuelle
    // est gérée par le guard de la route `/login`, pas ici — on ne casse pas
    // un deep-link (ex. rechargement sur /suivi/agenda).
    this.auth.restoreSession();
    if (Session.username) this.displayName = Session.username;
    void this.auth.ensurePatientLoaded();
    void this.auth.ensureStaffLoaded();
    try {
      await SplashScreen.hide();
    } catch {
      /* pas de plateforme native (web) */
    }
  }

  openPage(page: MenuLink): void {
    this.router.navigateByUrl(page.url);
  }
}
