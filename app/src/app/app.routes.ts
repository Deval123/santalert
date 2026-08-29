import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

/**
 * Routes de la tranche verticale. Les ~80 pages restantes seront ajoutées
 * ici au fur et à mesure du portage (une entrée `loadComponent` par page,
 * plus de `*.module.ts`). En attendant, tout chemin inconnu tombe sur
 * `PendingPage` (voir `pages/pending`).
 */
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'profile-personel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile-personel/profile-personel.page').then((m) => m.ProfilePersonelPage),
  },
  // --- Domaine "Suivi Personnel" (soins / regimes / bilan) ---
  {
    path: 'suivi-perso',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/suivi-perso.page').then((m) => m.SuiviPersoPage),
  },
  {
    path: 'suivi-medical',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/suivi-medical/suivi-medical.page').then((m) => m.SuiviMedicalPage),
  },
  {
    path: 'suivi-medical/:kind',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/suivi-medical/medical-list.page').then((m) => m.MedicalListPage),
  },
  {
    path: 'suivi-mere-enfant',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/suivi-medical/suivi-mere-enfant.page').then((m) => m.SuiviMereEnfantPage),
  },
  {
    path: 'suivi/:entity/new',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/suivi-form.page').then((m) => m.SuiviFormPage),
  },
  {
    path: 'suivi/:entity/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/suivi-form.page').then((m) => m.SuiviFormPage),
  },
  {
    path: 'suivi/:entity/view/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/suivi-detail.page').then((m) => m.SuiviDetailPage),
  },
  {
    // Relevés de suivi d'un régime (ex pages `param-regime` + `add`/`edit`/`show-one`).
    path: 'suivi/regimes/:id/params',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/param-regime.page').then((m) => m.ParamRegimePage),
  },
  {
    path: 'suivi/:entity',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/suivi/suivi-list.page').then((m) => m.SuiviListPage),
  },

  {
    path: 'infos-urgence',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/infos-urgence/infos-urgence.page').then((m) => m.InfosUrgencePage),
  },
  {
    path: 'infos-utile',
    loadComponent: () =>
      import('./pages/infos-utile/infos-utile.page').then((m) => m.InfosUtilePage),
  },
  {
    path: 'pharmacie',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/pharmacie/pharmacie.page').then((m) => m.PharmaciePage),
  },
  {
    path: 'statistique',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/statistique/statistique.page').then((m) => m.StatistiquePage),
  },

  // --- Personnel médical ---
  {
    path: 'home-personnel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/home-personnel.page').then((m) => m.HomePersonnelPage),
  },
  {
    path: 'contact-personnel',
    loadComponent: () =>
      import('./pages/personnel/contact-personnel.page').then((m) => m.ContactPersonnelPage),
  },
  {
    path: 'agenda-personnel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/agenda-personnel.page').then((m) => m.AgendaPersonnelPage),
  },
  {
    path: 'gestion-patient',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/gestion-patient.page').then((m) => m.GestionPatientPage),
  },
  {
    path: 'rechercher-patients',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/rechercher-patients.page').then((m) => m.RechercherPatientsPage),
  },
  {
    path: 'creation-patient',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/creation-patient.page').then((m) => m.CreationPatientPage),
  },
  {
    path: 'ajout-info',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/ajout-info.page').then((m) => m.AjoutInfoPage),
  },
  {
    path: 'ajout-info/:parent/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/acte-detail.page').then((m) => m.ActeDetailPage),
  },
  {
    path: 'infos-general-patient',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/infos-general-patient.page').then((m) => m.InfosGeneralPatientPage),
  },
  {
    path: 'infos-consul-prescripteur',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/infos-consul-prescripteur.page').then(
        (m) => m.InfosConsulPrescripteurPage,
      ),
  },
  {
    path: 'pharmacie-labo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/pharmacie-labo.page').then((m) => m.PharmacieLaboPage),
  },
  {
    path: 'parametre-personnel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/parametre-personnel.page').then((m) => m.ParametrePersonnelPage),
  },
  {
    path: 'result',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/personnel/result.page').then((m) => m.ResultPage),
  },
  {
    path: 'edit-personel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/edit-personel.page').then((m) => m.EditPersonelPage),
  },
  {
    path: 'add-personel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/add-personel.page').then((m) => m.AddPersonelPage),
  },
  {
    path: 'notification',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/notification/notification.page').then((m) => m.NotificationPage),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/admin.page').then((m) => m.AdminPage),
  },
  {
    path: 'add-admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/add-admin.page').then((m) => m.AddAdminPage),
  },
  {
    path: 'ajout-ets',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/ajout-ets.page').then((m) => m.AjoutEtsPage),
  },
  {
    path: 'departement',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/personnel/departement.page').then((m) => m.DepartementPage),
  },
  {
    path: 'parametres',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/parametres/parametres.page').then((m) => m.ParametresPage),
  },
  {
    path: 'update-profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/update-profile/update-profile.page').then((m) => m.UpdateProfilePage),
  },

  {
    path: 'help',
    loadComponent: () => import('./pages/help/help.page').then((m) => m.HelpPage),
  },
  {
    // Visionneuse de document — ouverte via router state { url } ou { base64, name, mime }.
    path: 'pdf-view',
    loadComponent: () => import('./pages/pdf-view/pdf-view.page').then((m) => m.PdfViewPage),
  },
  {
    path: 'logout',
    loadComponent: () => import('./pages/logout/logout.page').then((m) => m.LogoutPage),
  },

  // Filet de sécurité pour les entrées de menu pas encore portées.
  {
    path: 'pending/:name',
    loadComponent: () => import('./pages/pending/pending.page').then((m) => m.PendingPage),
  },
  { path: '**', redirectTo: 'login' },
];
