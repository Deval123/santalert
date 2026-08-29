# Migration Sant'alert — Ionic 3 → Ionic 9 / Angular 22 / Capacitor 8

Ce dossier `app/` est la **réécriture** de l'app historique (racine `../src/`).
L'ancienne stack (`ionic-angular` 3.9, `@ionic/app-scripts`, Cordova) et la
nouvelle n'ont aucune version commune : chaque page est portée à la main.

## État

| Bloc | Statut |
|---|---|
| Toolchain (Node 22.23, Angular 22, Ionic 9, Capacitor 8) | ✅ |
| Build web (`ng build`) + APK Android (`gradlew assembleDebug`) | ✅ |
| Infra partagée (`src/app/core/**`) | ✅ |
| Shell + menu par rôle + routing + garde d'auth | ✅ |
| Pages portées | `login`, `register`, `profile`, `profile-personel`, `help`, `logout`, `pdf-view` + **domaine Suivi Personnel** (`suivi-perso` conteneur + `suivi-list`/`suivi-form`/`suivi-detail` génériques couvrant soins / regimes / bilan → remplacent 13 pages legacy) + `param-regime` (relevés d'un régime) + `departement` + `ajout-ets` |
| Pages restantes | **0 fonctionnelle** — toutes les entrées de menu sont portées ; les pages legacy encore dans `../src/pages/` sont soit des démos abandonnées, soit déjà couvertes par les écrans génériques (voir « Domaines restants » plus bas) |
| Backend | `../api/` — socle + auth/patient + CRUD bilan/regime/soins/agenda/maladie chronique + **param-regime / departement / etablissement** = **~50 endpoints**, testés (curl). |
| Domaines front OK — patient | auth · profil · Suivi Personnel · Alerte · Maladie chronique · Recommandation · Infos d'urgence · Infos utiles · Pharmacie de garde · Statistiques |
| Domaines front OK — personnel | Accueil · À propos · Agenda établissement · Gestion des patients · **Actes médicaux** (`ajout-info` : patient actif → segments Consultations / Hospitalisations, liste + ajout ; `insertConsultationPersonelEts.php` / `insertHospitalisationPersonelEts.php` / `showConsultation.php` / `showHospPatient.php`) |

**Infos générales patient — FAIT** (`pages/personnel/infos-general-patient.page.ts`) :
vue complète lecture seule du patient actif (Identité / Filiation / Infos d'urgence),
sans endpoint (lit `Session.patients[0]`).

**Lieu de consultation & prescripteur — FAIT** (`pages/personnel/infos-consul-prescripteur.page.ts`,
legacy vide) : établissement + personnel connecté + consultations du patient actif
(`showConsultation.php`).

**Ordonnance pour la pharmacie — FAIT** (`pages/personnel/pharmacie-labo.page.ts`,
legacy vide) : ordonnances + examens de labo du patient actif, toutes consultations
confondues (`showOrdonanceLabo.php`, jointure via `consultation`).

**Paramètres — FAIT** : `parametre-personnel` (personnel, statique : notifications /
à propos / déconnexion), `parametres` (patient : raccourcis), `update-profile`
(édition complète de la fiche patient — 3 groupes de champs, `aksi_patient.php`
`aksi=update_profile`). `aksi_patient.php` étendu (`get_patients`, `update_profile`).

**Suivi Médical — FAIT** (`pages/suivi-medical/`) : conteneur de raccourcis
+ `medical-list` générique lecture seule (route `/suivi-medical/:kind`) —
Consultations (`showConsulpers.php`, consultation enrichie médecin/établissement/
ordonnances/examens/RDV), Examens (`showExamenPatient.php` polymorphe
consultation/patient), Hospitalisations (`showHospitalisationPatient.php`).

**Suivi Mère & enfant — FAIT** (`pages/suivi-medical/suivi-mere-enfant.page.ts`) :
conteneur de raccourcis → entités `vaccin` / `visite` ajoutées au registre
générique `SUIVI` (CRUD complet, `insert/show/edit/delete Vaccin|Visite`).

**Examens pour le laboratoire — FAIT** (`pages/personnel/result.page.ts`) : file
des examens (jointure examen × consultation × patient, filtre établissement,
« à traiter » en tête) + saisie/édition du résultat (`showExamensLabo.php`,
`addExamenResult.php`). Upload photo remplacé par un champ texte (caméra à recâbler).

### Menus + navigation interne — état
- **Menus** (Patient · Personnel · Pharmacien · Laborantin) : **100 % branchés.**
- **Écrans secondaires FAITS** : `notification` (rappels locaux via
  `NotificationsService`), `edit-personel` (auto-édition personnel → `editPersonel.php`),
  `add-personel` (`insertPersonnel.php`), `admin` (dashboard + `showAdmin.php`),
  `add-admin` (`registerAdmin.php`). Liens `edit-patients`→`/update-profile`,
  `home-personnel`/`parametre-personnel` recâblés vers les vraies routes.
- **Plus aucun lien `/pending/…` dans le code** hormis la route `/pending/:name`
  elle-même (filet de sécurité).

**Domaines restants — FAIT** (lot « domaines réels ») :
- **`param-regime`** (`pages/suivi/param-regime.page.ts`, route
  `/suivi/regimes/:id/params`) : relevés de suivi d'un régime (poids /
  température / tension) — liste + ajout inline + suppression. Remplace les
  4 pages legacy `param-regime` + `add-param-regime` + `edit-param-regime` +
  `show-one-param-regime`. Atteint via un bouton « Paramètres de suivi » dans
  le détail d'un régime. Endpoints : `showParamRegime.php` / `insertParamRegime.php`
  / `editParamRegime.php` / `deleteParamRegime.php` (+ colonnes ajoutées à
  `param_regime`).
- **`departement`** (`pages/personnel/departement.page.ts`, route `/departement`,
  entrée de menu personnel) : services / départements d'un établissement —
  liste + ajout + suppression. Remplace `departement` + `ajout-departement`.
  Endpoints : `showDepartement.php` / `insertDepartement.php` /
  `deleteDepartement.php` (table `departement_geo` + colonnes `description`, `code`).
- **`ajout-ets`** (`pages/admin/ajout-ets.page.ts`, route `/ajout-ets`, lien depuis
  `admin`) : création d'un établissement. Endpoint `insertEts.php` (+ `showEts.php`).
- **`pdf-view`** (`pages/pdf-view/pdf-view.page.ts`, route `/pdf-view`) : visionneuse
  de document, ouverte via `router.navigate(['/pdf-view'], { state: { url } })` ou
  `{ base64, name, mime }`. Rendu délégué à `FilesService` (`openUrl` / `openBase64`).

Migration DB : `../api/schema/002_remaining_domains.sql` (+ seed `departement_geo`).

- **Abandonnés volontairement** (démos / échafaudages Ionic sans usage réel, jamais
  atteints par un lien) : `image` (« Devdactic Image Upload »), `camera` +
  `dashboard` + `update` (démo CRUD `aksi_user.php`, hors domaine médical),
  `conseils` (cases à cocher non câblées), `flore` (placeholder), `fiche-bilan` /
  `fiche-hospitalisation` / `fiche-patient` (`<ion-content>` vides), `m-e-p`
  (onglets — couverts par `suivi-mere-enfant`). À supprimer de `../src/` au
  nettoyage final.
- **Déjà couverts par le générique** (pas de page dédiée à porter) : `consult` →
  `/suivi-medical/consultations` + `infos-consul-prescripteur` ;
  `fiche-consultation` → `acte-detail` / `ajout-info` ; `edit-bilan` /
  `edit-soins` / `edit-regime` / `edit-maladie-chronique` / `edit-agenda-patients`
  → `/suivi/:entity/edit/:id` ; `show-one-bilan` / `show-one-regime` /
  `show-one-soins` → `/suivi/:entity/view/:id` ; `show-last-agenda-patients` →
  `/suivi/agenda` ; `edit-patients` → `/update-profile`.

**Actes chaînés — FAIT** (`pages/personnel/acte-detail.page.ts`, route
`/ajout-info/:parent/:id`) : depuis une consultation → examen · ordonnance ·
auscultation · paramètres · RDV ; depuis une hospitalisation → traitement ·
particularités. 14 endpoints (`insert*` + `show*` par parent), helper
`crud_list_by()` + `lib/ctx.php`. Tous curl-testés.

Fiche personnel : `AuthService.ensureStaffLoaded()` (pendant de `ensurePatientLoaded`)
recharge `localStorage.personel` / `.etablissement` à la demande.

### Pattern générique CRUD (réutilisable pour les autres domaines)

`core/services/record.service.ts` + `pages/suivi/suivi.config.ts` : un domaine =
une entrée de config (`title`, `endpoints`, `columns`, `fields`) et les 3 pages
génériques (`suivi-list` / `suivi-form` / `suivi-detail`) s'en servent. Pour un
nouveau domaine « par patient » (maladie-chronique, agenda, examen…), ajouter une
entrée dans un registre similaire plutôt que 4 pages à la main.

## ⚠️ Piège Ionic 9 : ne pas injecter `AlertController` / `LoadingController`

Avec `@ionic/angular` v9 (build "custom elements") + Vite, `alertController.create()`
et `loadingController.create()` **ne résolvent jamais leur promesse** → tout `await`
dessus fige la page. Utiliser **`UiService`** (`core/services/ui.service.ts`) qui crée
les éléments `<ion-alert>` / `<ion-loading>` à la main :

```ts
await this.ui.alert('Titre', 'Message');
const res = await this.ui.withLoading('Chargement…', () => this.post.postData(body, 'x.php').toPromise());
```

Même prudence pour tout autre `*Controller` : préférer la création manuelle de l'élément
si un `await` se met à bloquer.

## ⚠️ Détection de changement : zone.js **obligatoire**

Angular 22 démarre *zoneless* par défaut. Le code porté est impératif (pas de
signals) : sans zone, un `this.x = await ...` **ne rafraîchit pas la vue**.
`app.config.ts` force donc `provideZoneChangeDetection({ eventCoalescing: true })`
+ `polyfills: ["zone.js"]` dans `angular.json`. Ne pas retirer.

### Corollaire pratique : `cdr.detectChanges()` après chaque chargement async

Même avec `provideZoneChangeDetection`, un `this.x = await …` ne repeint pas
toujours la vue de façon fiable (Ionic + esbuild). **Règle** : injecter
`ChangeDetectorRef` et appeler `this.cdr.detectChanges()` dans le `finally` de
toute méthode qui charge des données (`reload()`, `ngOnInit` async, `save()`…).
Voir `pages/suivi/*` et `pages/infos-urgence`.

### Fiche patient : `AuthService.ensurePatientLoaded()`

Beaucoup de pages ont besoin de `Session.patients` / `Session.patientId`
(id du patient connecté), mais seule la page profil la remplissait → deep-links
cassés. Appeler `await this.auth.ensurePatientLoaded()` en tête des méthodes de
chargement (déjà fait dans `RecordService.list/create` et le shell).

## ⚠️ `withComponentInputBinding` + `@Input()` de route : timing

Ne pas mettre en cache une valeur dérivée d'un `@Input()` de route dans
`ngOnInit` (l'input peut arriver après). Utiliser un **getter** :
`get cfg() { return entityOf(this.entity); }` (voir `pages/suivi/*`).

## Prérequis machine

- Node **≥ 22.22.3** (installé ici : `~/.local/node-v22.23.2-darwin-arm64/bin`).
  Ajouter au PATH : `export PATH="$HOME/.local/node-v22.23.2-darwin-arm64/bin:$PATH"`
- JDK 21 (déjà présent), Android SDK dans `~/Library/Android/sdk`.

## Commandes

```bash
cd app
npm install
npx ng serve                 # dev web sur http://localhost:8100
npx ng build                 # build prod -> app/www
npx cap sync android         # copie www + plugins vers android/
cd android && ./gradlew assembleDebug
#  -> android/app/build/outputs/apk/debug/app-debug.apk
npx cap run android          # lance sur émulateur / appareil
```

## Recette de portage d'une page

Pour porter `../src/pages/<nom>/` :

1. Créer `src/app/pages/<nom>/<nom>.page.ts` + `.html` + `.scss`
   (composant **standalone**, plus de `<nom>.module.ts`).
2. Ajouter la route dans `src/app/app.routes.ts` :
   ```ts
   { path: '<nom>', canActivate: [authGuard],
     loadComponent: () => import('./pages/<nom>/<nom>.page').then(m => m.<Nom>Page) }
   ```
3. Dans le shell (`src/app/app.component.ts`), remplacer l'URL `/pending/<nom>`
   correspondante par `/<nom>` dans le(s) menu(s) de rôle.
4. Appliquer les transformations ci-dessous.

### Transformations systématiques

| Ancien (`ionic-angular`) | Nouveau |
|---|---|
| `@IonicPage()` + décorateur module | supprimés ; `@Component({ selector, templateUrl, imports: [...] })` |
| `import { X } from 'ionic-angular'` | `import { IonX } from '@ionic/angular'` (composants) ; contrôleurs : `AlertController`, `LoadingController`, `MenuController` depuis `@ionic/angular` |
| `NavController.push(XPage, params)` | `router.navigate(['/x'], { state: params })` |
| `NavController.setRoot(XPage)` | `router.navigateByUrl('/x')` |
| `NavParams.get('k')` | `this.router.getCurrentNavigation()?.extras.state?.['k']` (dans le constructeur) ou `history.state['k']` |
| `Events` | `EventsService` (`src/app/core/services/events.service.ts`) — même API `publish/subscribe` |
| `AlertController.create({title, subTitle, buttons:['OK']}).present()` | `ui.alert('Titre', 'Message')` (`UiService`) |
| `LoadingController.create({content}).present()` + `.dismiss()` | `ui.withLoading('Message', () => promesse)` (`UiService`) |
| `Http` / `Headers` / `RequestOptions` (`@angular/http`) | `PostService.postData(body, 'script.php')` → `Observable` ; `.toPromise()`/`firstValueFrom` si besoin |
| `.pipe(map((res:any) => res.json()))` | **à supprimer** — `HttpClient` parse déjà le JSON ; typer `postData<MonType>(...)` |
| `import 'rxjs/add/operator/map'` / `rxjs/Observable` | `import { map } from 'rxjs/operators'` / `import { Observable } from 'rxjs'` |
| `Observable.create(obs => …)` | `new Observable(obs => …)` |
| `Storage` (`@ionic/storage`) `get/set` | `StorageService` (`await`) — mais l'app s'appuie surtout sur `window.localStorage`, souvent inchangé |
| `ionViewDidLoad()` | `ngOnInit()` (ou `ionViewWillEnter()` si rechargement à chaque entrée) |
| `@ViewChild('ref') ref; … ref.value` | champ de classe + `[(ngModel)]="champ"` (importer `FormsModule`) |
| `enums/enums.ts` `Enums.APIURL.URL1 + '/'` | `API.base` / `apiUrl('script.php')` (`src/app/core/config/api.config.ts`) |

### Transformations de template

| Ancien | Nouveau |
|---|---|
| `<ion-header><ion-navbar>` + `<button ion-button menuToggle>` | `<ion-header><ion-toolbar color="primary"><ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons><ion-title>…</ion-title>` |
| `<button ion-button (click)>` | `<ion-button (click)>` |
| `<button ion-item>` | `<ion-item button>` |
| `<ion-input placeholder="X" #ref>` | `<ion-input label="X" labelPlacement="floating" [(ngModel)]="champ" name="champ">` |
| attrs `padding`, `text-center`, `text-right`, `margin-top` | classes `ion-padding`, `ion-text-center`, `ion-text-end`, `ion-margin-top` |
| `no-lines` | `lines="none"` |
| `item-left` / `item-right` | `slot="start"` / `slot="end"` |
| `<ion-col col-6>` | `<ion-col size="6">` |
| `<ion-slides>` / `<ion-slide>` | **retiré d'Ionic 7+** — utiliser `swiper/element` si un carrousel est vraiment nécessaire ; sinon supprimer (le footer pub `<marquee><ion-slides>` a été supprimé partout) |
| `[scrollHide]` / `[scrollContent]` (directives maison) | supprimés (dépendaient de `Content` d'ionic-angular) |
| texte nu dans `<ion-item>` | envelopper dans `<ion-label>` |
| icônes `<ion-icon name="foo">` | enregistrer l'icône dans `src/main.ts` via `addIcons({ foo })` (mode standalone : pas d'auto-chargement) |

Chaque `@Component({ imports: [...] })` doit lister **explicitement** chaque
`IonXxx` utilisé dans le template + `CommonModule` (pour `*ngIf`/`*ngFor`) +
`FormsModule` (pour `[(ngModel)]`).

## Plugins natifs — état

| Cordova / ionic-native | Capacitor | Service | Statut |
|---|---|---|---|
| `camera` | `@capacitor/camera` (+ `@ionic/pwa-elements` web) | `core/services/camera.service.ts` | **câblé** — `infos-urgence` (photo patient), `result` (photo résultat labo) |
| `file` / `file-path` / `file-opener2` / `file-transfer` / `document-viewer` | `@capacitor/filesystem` + `@capacitor-community/file-opener` | `core/services/files.service.ts` | **prêt** — `openBase64()` / `openUrl()` ; à brancher sur `pdf-view` / `fiche-*` |
| `local-notification` | `@capacitor/local-notifications` | `core/services/notifications.service.ts` | **câblé** — rappel 1 h avant sur `insertAgenda*` (`RecordService.create`) |
| `device` | `@capacitor/device` | — | installé, pas de besoin |
| `splashscreen` / `statusbar` | `@capacitor/splash-screen` / `status-bar` | — | scaffold |
| `advanced-http` | `HttpClient` | `PostService` | remplacé |
| `sqlite-storage` | `@ionic/storage-angular` (IndexedDB) | `StorageService` | en place |
| `filechooser` | `<input type="file">` / `@capawesome/capacitor-file-picker` | — | non câblé (pas de site d'appel porté) |
| `sms` | `@capacitor-community/sms` / lien `sms:` | — | non câblé |
| `facebook4` | `@capacitor-community/facebook-login` | `FacebookService` | **stub** — besoin des IDs OAuth à jour |
| `googleplus` | `@codetrix-studio/capacitor-google-auth` | — | **stub** (bouton désactivé) |
| `google-services.json` / Firebase | — | — | non ajouté (FCM non confirmé) |

APK debug ~19 Mo. Permissions `CAMERA` / `POST_NOTIFICATIONS` fusionnées depuis
les manifests des plugins au build Gradle.

## Ordre de portage conseillé (par domaine)

1. **Personnel** : `home-personnel`, `agenda-personnel`, `contact-personnel`, `parametre-personnel`, `edit-personel`, `add-personel`, `show-admin`, `add-admin`, `admin`
2. **Patient — suivi** : `suivi-perso`, `suivi-medical`, `suivi-mere-enfant`, `dashboard`, `statistique`
3. **Agenda / RDV** : `agenda`, `ajout-agenda`, `rdv`, `ajout-agenda-personel`, `edit-agenda-patients`, `show-last-agenda-patients`
4. **Dossier médical** : `soins`, `bilan`, `regimes`, `param-regime` + tous les `ajout-*`, `edit-*`, `show-one-*` associés
5. **Consultation / hospitalisation** : `consultation`, `fiche-consultation`, `hospitalisation`, `fiche-hospitalisation`, `examen`, `visite`, `vaccin`
6. **Pharmacie** : `pharmacie`, `pharmacie-labo`, `flore`, `result`
7. **Infos & divers** : `infos-utile`, `infos-urgence`, `infos-general-patient`, `infos-consul-prescripteur`, `conseils`, `recommandation`, `maladie-chronique`, `parametres`, `camera`, `image`, `pdf-view`

## Nettoyage final (quand tout est porté)

- Déplacer `app/*` à la racine du dépôt.
- Supprimer : `../src/` (ancien), `config.xml`, `*.apk`, `package1.json`,
  `ionic.starter.json`, `resources/` (splash/icônes Cordova), `config/` (sass/copy configs).
- Régénérer icônes/splash avec `@capacitor/assets` depuis `resources/icon.png`.
- Merger `migration-ionic8` → `master`.
