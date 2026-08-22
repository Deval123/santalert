import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule,  } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FacebookServiceProvider } from '../providers/facebook-service/facebook-service';
import { Facebook } from "@ionic-native/facebook";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { ProfilePage } from '../pages/profile/profile';

import { Tab1Page } from '../pages/tab1/tab1';
import { Tab2Page } from '../pages/tab2/tab2';
import { Tab3Page } from '../pages/tab3/tab3';

import { SoinsPage } from '../pages/soins/soins';
import { BilanPage } from '../pages/bilan/bilan';
import { RegimesPage } from '../pages/regimes/regimes';

import { AjoutAgendaPageModule } from '../pages/ajout-agenda/ajout-agenda.module';
import { MaladieChroniquePageModule } from '../pages/maladie-chronique/maladie-chronique.module';
import { StatistiquePageModule } from '../pages/statistique/statistique.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { Tab1PageModule } from '../pages/tab1/tab1.module';
import { Tab2PageModule } from '../pages/tab2/tab2.module';
import { Tab3PageModule } from '../pages/tab3/tab3.module';
import { SoinsPageModule } from '../pages/soins/soins.module';
import { BilanPageModule } from '../pages/bilan/bilan.module';
import { RegimesPageModule } from '../pages/regimes/regimes.module';
import { SuiviPersoPageModule } from '../pages/suivi-perso/suivi-perso.module';
import { ParametresPageModule } from '../pages/parametres/parametres.module';
import { LogoutPageModule } from '../pages/logout/logout.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { AgendaPageModule } from '../pages/agenda/agenda.module';
import { RecommandationPageModule } from '../pages/recommandation/recommandation.module';
import { SuiviMedicalPageModule } from '../pages/suivi-medical/suivi-medical.module';
import { SuiviMereEnfantPageModule } from '../pages/suivi-mere-enfant/suivi-mere-enfant.module';
import { AjoutSoinsPageModule } from '../pages/ajout-soins/ajout-soins.module';
import { AjoutBilanPageModule } from '../pages/ajout-bilan/ajout-bilan.module';
import { AjoutRegimesPageModule } from '../pages/ajout-regimes/ajout-regimes.module';
import { AjoutEtsPageModule } from '../pages/ajout-ets/ajout-ets.module';
import { NotificationPage } from '../pages/notification/notification';

import { ConsultationPageModule } from '../pages/consultation/consultation.module';
import { ExamenPageModule } from '../pages/examen/examen.module';
import { HospitalisationPageModule } from '../pages/hospitalisation/hospitalisation.module';
import { HelpPageModule } from '../pages/help/help.module';

import { VaccinPageModule } from '../pages/vaccin/vaccin.module';
import { VisitePageModule } from '../pages/visite/visite.module';
import { ConseilsPageModule } from '../pages/conseils/conseils.module';

import { AjoutAgendaPage } from '../pages/ajout-agenda/ajout-agenda';
import { MaladieChroniquePage } from '../pages/maladie-chronique/maladie-chronique';

import { RegisterPage } from '../pages/register/register';
import { ParametresPage } from '../pages/parametres/parametres';
import { SuiviPersoPage } from '../pages/suivi-perso/suivi-perso';
import { LogoutPage } from '../pages/logout/logout';
import { AgendaPage } from '../pages/agenda/agenda';
import { RecommandationPage } from '../pages/recommandation/recommandation';
import { SuiviMedicalPage } from '../pages/suivi-medical/suivi-medical';
import { SuiviMereEnfantPage } from '../pages/suivi-mere-enfant/suivi-mere-enfant';
import { AjoutSoinsPage } from '../pages/ajout-soins/ajout-soins';
import { AjoutBilanPage } from '../pages/ajout-bilan/ajout-bilan';
import { AjoutRegimesPage } from '../pages/ajout-regimes/ajout-regimes';
import { ConsultationPage } from '../pages/consultation/consultation';
import { ExamenPage } from '../pages/examen/examen';
import { HospitalisationPage } from '../pages/hospitalisation/hospitalisation';
import { StatistiquePage } from '../pages/statistique/statistique';
import { AjoutEtsPage } from '../pages/ajout-ets/ajout-ets';
import { EditSoinsPage } from '../pages/edit-soins/edit-soins';
import { EditBilanPage } from '../pages/edit-bilan/edit-bilan';
import { EditRegimePage } from '../pages/edit-regime/edit-regime';
import { EditPatientsPage } from '../pages/edit-patients/edit-patients';
import { ShowOneBilanPage } from '../pages/show-one-bilan/show-one-bilan';
import { ShowOneRegimePage } from '../pages/show-one-regime/show-one-regime';
import { ShowOneSoinsPage } from '../pages/show-one-soins/show-one-soins';
import { AddParamRegimePage } from '../pages/add-param-regime/add-param-regime';
import { ParamRegimePage } from '../pages/param-regime/param-regime';
import { EditParamRegimePage } from '../pages/edit-param-regime/edit-param-regime';
import { ShowOneParamRegimePage } from '../pages/show-one-param-regime/show-one-param-regime';
import { EditAgendaPatientsPage } from '../pages/edit-agenda-patients/edit-agenda-patients';
import { ShowLastAgendaPatientsPage } from '../pages/show-last-agenda-patients/show-last-agenda-patients';
import { DepartementPage } from '../pages/departement/departement';
import { AjoutDepartementPage } from '../pages/ajout-departement/ajout-departement';
import { AdminPage } from '../pages/admin/admin';
import { AddAdminPage } from '../pages/add-admin/add-admin';
import { AddPersonelPage } from '../pages/add-personel/add-personel';
import { ShowAdminPage } from '../pages/show-admin/show-admin';
import { ProfilePersonelPage } from '../pages/profile-personel/profile-personel';
import { EditPersonelPage } from '../pages/edit-personel/edit-personel';
import { AjoutAgendaPersonelPage } from '../pages/ajout-agenda-personel/ajout-agenda-personel';
import { RechercherPatientsPage } from '../pages/rechercher-patients/rechercher-patients';
import { EditMaladieChroniquePage } from '../pages/edit-maladie-chronique/edit-maladie-chronique';
import { ImagePage } from '../pages/image/image';


import { VaccinPage } from '../pages/vaccin/vaccin';
import { VisitePage } from '../pages/visite/visite';
import { ConseilsPage } from '../pages/conseils/conseils';
import { HomePersonnelPage } from '../pages/home-personnel/home-personnel';
import { HomePersonnelPageModule } from '../pages/home-personnel/home-personnel.module';
import { AgendaPersonnelPage } from '../pages/agenda-personnel/agenda-personnel';
import { ContactPersonnelPage } from '../pages/contact-personnel/contact-personnel';
import { AgendaPersonnelPageModule } from '../pages/agenda-personnel/agenda-personnel.module';
import { ContactPersonnelPageModule } from '../pages/contact-personnel/contact-personnel.module';
import { GestionPatientPage } from '../pages/gestion-patient/gestion-patient';
import { GestionPatientPageModule } from '../pages/gestion-patient/gestion-patient.module';
import { FicheHospitalisationPage } from '../pages/fiche-hospitalisation/fiche-hospitalisation';
import { FicheConsultationPage } from '../pages/fiche-consultation/fiche-consultation';
import { FicheBilanPage } from '../pages/fiche-bilan/fiche-bilan';
import { FicheHospitalisationPageModule } from '../pages/fiche-hospitalisation/fiche-hospitalisation.module';
import { FicheConsultationPageModule } from '../pages/fiche-consultation/fiche-consultation.module';
import { FicheBilanPageModule } from '../pages/fiche-bilan/fiche-bilan.module';
import { FichePatientPage } from '../pages/fiche-patient/fiche-patient';
import { CreationPatientPage } from '../pages/creation-patient/creation-patient';
import { FichePatientPageModule } from '../pages/fiche-patient/fiche-patient.module';
import { CreationPatientPageModule } from '../pages/creation-patient/creation-patient.module';
import { AjoutInfoPage } from '../pages/ajout-info/ajout-info';
import { AjoutInfoPageModule } from '../pages/ajout-info/ajout-info.module';
import { ParametrePersonnelPage } from '../pages/parametre-personnel/parametre-personnel';
import { ParametrePersonnelPageModule } from '../pages/parametre-personnel/parametre-personnel.module';
import { EditSoinsPageModule } from '../pages/edit-soins/edit-soins.module';
import { EditBilanPageModule } from '../pages/edit-bilan/edit-bilan.module';
import { EditRegimePageModule } from '../pages/edit-regime/edit-regime.module';
import { EditPatientsPageModule } from '../pages/edit-patients/edit-patients.module';
import { ShowOneBilanPageModule } from '../pages/show-one-bilan/show-one-bilan.module';
import { ShowOneRegimePageModule } from '../pages/show-one-regime/show-one-regime.module';
import { ShowOneSoinsPageModule } from '../pages/show-one-soins/show-one-soins.module';
import { AddParamRegimePageModule } from '../pages/add-param-regime/add-param-regime.module';
import { ParamRegimePageModule } from '../pages/param-regime/param-regime.module';
import { EditParamRegimePageModule } from '../pages/edit-param-regime/edit-param-regime.module';
import { ShowOneParamRegimePageModule } from '../pages/show-one-param-regime/show-one-param-regime.module';
import { EditAgendaPatientsPageModule } from '../pages/edit-agenda-patients/edit-agenda-patients.module';
import { ShowLastAgendaPatientsPageModule } from '../pages/show-last-agenda-patients/show-last-agenda-patients.module';
import { DepartementPageModule } from '../pages/departement/departement.module';
import { AjoutDepartementPageModule } from '../pages/ajout-departement/ajout-departement.module';
import { AdminPageModule } from '../pages/admin/admin.module';
import { HomePageModule } from '../pages/home/home.module';
import { AddAdminPageModule } from '../pages/add-admin/add-admin.module';
import { AddPersonelPageModule } from '../pages/add-personel/add-personel.module';
import { ShowAdminPageModule } from '../pages/show-admin/show-admin.module';
import { ProfilePersonelPageModule } from '../pages/profile-personel/profile-personel.module';
import { EditPersonelPageModule } from '../pages/edit-personel/edit-personel.module';
import { AjoutAgendaPersonelPageModule } from '../pages/ajout-agenda-personel/ajout-agenda-personel.module';
import { RechercherPatientsPageModule } from '../pages/rechercher-patients/rechercher-patients.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { RdvPageModule } from '../pages/rdv/rdv.module';
import { EditMaladieChroniquePageModule } from '../pages/edit-maladie-chronique/edit-maladie-chronique.module';
import { CameraPageModule } from '../pages/camera/camera.module';

import { ImagePageModule } from '../pages/image/image.module';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { AuthServiceProvider } from "../providers/auth-service/auth-service";

import { RdvPage } from '../pages/rdv/rdv';
import { FileTransfer } from '@ionic-native/file-transfer';

import { CameraPage } from '../pages/camera/camera';
import { PostProvider } from '../providers/post/post';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { UpdatePageModule } from '../pages/update/update.module';
import { UpdatePage } from '../pages/update/update';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { UpdateProfilePageModule } from '../pages/update-profile/update-profile.module';
import { InfosConsulPrescripteurPageModule } from '../pages/infos-consul-prescripteur/infos-consul-prescripteur.module';
import { InfosGeneralPatientPageModule } from '../pages/infos-general-patient/infos-general-patient.module';
import { PharmacieLaboPageModule } from '../pages/pharmacie-labo/pharmacie-labo.module';
import { InfosConsulPrescripteurPage } from '../pages/infos-consul-prescripteur/infos-consul-prescripteur';
import { InfosGeneralPatientPage } from '../pages/infos-general-patient/infos-general-patient';
import { PharmacieLaboPage } from '../pages/pharmacie-labo/pharmacie-labo';
import { DataProvider } from '../providers/data/data';
import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { HideHeaderDirective } from '../directives/hide-header/hide-header';

import { FlorePage } from '../pages/flore/flore';
import { FlorePageModule } from '../pages/flore/flore.module';
import { ConsultPageModule } from '../pages/consult/consult.module';
import { ConsultPage } from '../pages/consult/consult';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { ResultPageModule } from '../pages/result/result.module';
import { ResultPage } from '../pages/result/result';
import {EnfMerePage} from "../pages/enf-mere/enf-mere";
import {EnfMerePageModule} from "../pages/enf-mere/enf-mere.module";
import {MEPPage} from "../pages/m-e-p/m-e-p";
import {MEPPageModule} from "../pages/m-e-p/m-e-p.module";




@NgModule({
  declarations: [
    MyApp,
    ScrollHideDirective,
    HideHeaderDirective

  ],
  imports: [
    BrowserModule,
    FlorePageModule,
    ResultPageModule,
    ConsultPageModule,
    InfosConsulPrescripteurPageModule,
    PharmacieLaboPageModule,
    InfosGeneralPatientPageModule,
    UpdatePageModule,
    UpdateProfilePageModule,
    CameraPageModule,
    HomePageModule,
    ImagePageModule,
    HttpModule,
    HttpClientModule,
    NotificationPageModule,
    HelpPageModule,
    RegisterPageModule,
    ShowAdminPageModule,
    ProfilePageModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule,
    ProfilePersonelPageModule,
    EditSoinsPageModule,
    EditBilanPageModule,
    EditRegimePageModule,
    EditPatientsPageModule,
    SoinsPageModule,
    BilanPageModule,
    RegimesPageModule,
    SuiviPersoPageModule,
    ParametresPageModule,
    LogoutPageModule,
    AgendaPageModule,
    RecommandationPageModule,
    SuiviMedicalPageModule,
    SuiviMereEnfantPageModule,
    AjoutAgendaPageModule,
    AjoutSoinsPageModule,
    AjoutBilanPageModule,
    AjoutRegimesPageModule,
    ConsultationPageModule,
    VisitePageModule,
    VaccinPageModule,
    ConseilsPageModule,
    StatistiquePageModule,
    ExamenPageModule,
    HomePersonnelPageModule,
    ContactPersonnelPageModule,
    AgendaPersonnelPageModule,
    HospitalisationPageModule,
    GestionPatientPageModule,
    FicheHospitalisationPageModule,
    FicheConsultationPageModule,
    FicheBilanPageModule,
    CreationPatientPageModule,
    FichePatientPageModule,
    AjoutInfoPageModule,
    AjoutEtsPageModule,
    MaladieChroniquePageModule,
    ParametrePersonnelPageModule,
    ShowOneBilanPageModule,
    ShowOneRegimePageModule,
    ShowOneSoinsPageModule,
    AddParamRegimePageModule,
    ParamRegimePageModule,
    EditParamRegimePageModule,
    EditAgendaPatientsPageModule,
    ShowOneParamRegimePageModule,
    ShowLastAgendaPatientsPageModule,
    DepartementPageModule,
    AjoutDepartementPageModule,
    AdminPageModule,
    EnfMerePageModule,
    AddAdminPageModule,
    AddPersonelPageModule,
    EditPersonelPageModule,
    AjoutAgendaPersonelPageModule,
    RechercherPatientsPageModule,
    RdvPageModule,
    MEPPageModule,
    DashboardPageModule,
    EditMaladieChroniquePageModule,
    IonicModule.forRoot(MyApp, {}),
    IonicPageModule.forChild(IonicPageModule),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localStorage', 'indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    ResultPage,
    FlorePage,
    InfosConsulPrescripteurPage,
    HomePage,
    RegisterPage,
    ProfilePage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    ConsultPage,
    SoinsPage,
    UpdatePage,
    BilanPage,
    RegimesPage,
    SuiviPersoPage,
    CameraPage,
    LogoutPage,
    AgendaPage,
    RecommandationPage,
    SuiviMedicalPage,
    SuiviMereEnfantPage,
    AjoutSoinsPage,
    AjoutBilanPage,
    AjoutRegimesPage,
    ConsultationPage,
    VisitePage,
    VaccinPage,
    ConseilsPage,
    ExamenPage,
    HospitalisationPage,
    HomePersonnelPage,
    ContactPersonnelPage,
    AgendaPersonnelPage,
    GestionPatientPage,
    FicheHospitalisationPage,
    FicheConsultationPage,
    CreationPatientPage,
    FichePatientPage,
    FicheBilanPage,
    AjoutInfoPage,
    ParametrePersonnelPage,
    InfosGeneralPatientPage,
    StatistiquePage,
    AjoutAgendaPage,
    MaladieChroniquePage,
    AjoutEtsPage,
    EditSoinsPage,
    EditBilanPage,
    EditRegimePage,
    EditPatientsPage,
    ShowOneBilanPage,
    ShowOneRegimePage,
    ShowOneSoinsPage,
    AddParamRegimePage,
    ParamRegimePage,
    EditParamRegimePage,
    ShowOneParamRegimePage,
    EditAgendaPatientsPage,
    ShowLastAgendaPatientsPage,
    DepartementPage,
    AjoutDepartementPage,
    AdminPage,
    AddAdminPage,
    AddPersonelPage,
    ShowAdminPage,
    ProfilePersonelPage,
    EditPersonelPage,
    AjoutAgendaPersonelPage,
    RechercherPatientsPage,
    NotificationPage,
    ParametresPage,
    RdvPage,
    EnfMerePage,
    HelpPage,
    UpdateProfilePage,
    EditMaladieChroniquePage,
    PharmacieLaboPage,
    ImagePage,
    MEPPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Facebook,
    Camera,
    FileTransfer,
    File,
    FileChooser,
    Transfer,
    FilePath,
    FacebookServiceProvider,
    AuthServiceProvider,
    PostProvider,
    DataProvider,
    DocumentViewer
  ]
})
export class AppModule {}
