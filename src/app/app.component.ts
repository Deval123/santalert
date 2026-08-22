import {Component, HostBinding, ViewChild, OnInit, Input } from '@angular/core';
import { Nav, Platform, Events, IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Content } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ProfilePersonelPage } from '../pages/profile-personel/profile-personel';
import { Storage } from '@ionic/storage';
import * as Enums from '../enums/enums';
import {ScrollHideConfig} from "../directives/scroll-hide/scroll-hide";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{// HomePage




  rootPage: any;
 // public rootPage; // Just declare the property, don't set a value here
  @ViewChild(Nav) nav: Nav;
  public selectcity: any;
  pages: Array<{title: string, component:any}>;
  devpages: Array<{title: string, component:any}>;
  server: string;
  typePerso: any;
  @ViewChild(Nav) navCtrl: Nav;
  @ViewChild(Content) content: Content;
  @HostBinding('class.has-global-footer') public globalFooterEnabled: boolean = false;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events,
     public splashScreen: SplashScreen, private storage: Storage) {

    // You can toggle the footer from a Service or something.
    setTimeout(() => this.globalFooterEnabled = false,   3000);
    // myService.somethingHappened$
    /*setTimeout(() => {
      this.globalFooterEnabled = true;

      setTimeout(() => {
        this.content.resize();
      }, 3000);
    }, 3000);*/




    this.initializeApp();
    this.pages = [
      { title: 'Login', component: 'HomePage'},
      { title: 'Help', component: 'HelpPage'}
      ];

//class="icon ion-log-out"
    events.subscribe('user:loggedIn', ()=>{
        this.pages = [
          { title: 'Suivi Personnel', component: 'SuiviPersoPage'},
          { title: 'Suivi Médical', component: 'SuiviMedicalPage' },
          {title: 'Suivi Mère & enfants ', component: 'SuiviMereEnfantPage' },
          { title: 'Alerte', component: 'AgendaPage' },
          { title: 'Recommandation', component: 'RecommandationPage'},
          { title: 'Maladie chronique', component: 'MaladieChroniquePage'},
          { title: 'Statistiques', component: 'StatistiquePage'},
          { title: 'Pdf-View', component: 'PdfViewPage'}, //upload et image a enlever
          { title: 'Infos d\'urgence', component: 'InfosUrgencePage'},
          { title: 'Infos utile', component: 'InfosUtilePage'},
          { title: 'Pharmacie de garde', component: 'PharmaciePage'},//  FlorePage PharmaciePage
          { title: 'Paramètres', component: 'ParametresPage'},
          { title: 'Déconnexion', component: 'LogoutPage'}
        ];

      }
    );

    events.subscribe('user:loggedOut', ()=>{
      this.pages = [
          { title: 'Login', component: 'HomePage'},
          { title: 'Help', component: 'HelpPage'},
          { title: 'Apropos', component: 'ContactPersonnelPage'}
        ];
      }
    );

    events.subscribe('personaluser:loggedIn', ()=>{
      this.pages = [
          { title: 'Home', component: 'HomePersonnelPage'},
          { title: 'Agenda', component: 'AgendaPersonnelPage' },
          { title: 'Infos utile', component: 'InfosUtilePage'},
          { title: 'Pharmacie de garde', component: 'PharmaciePage'},
          { title: 'informations sur le lieu de la consultation et le prescripteur', component: 'InfosConsulPrescripteurPage'},
          { title: 'Help', component: 'HelpPage'},
          { title: 'Apropos', component: 'ContactPersonnelPage'},
          { title: 'Paramètres', component: 'ParametrePersonnelPage'},
          { title: 'Déconnexion', component: 'LogoutPage'}
        ];

      this.devpages = [
        { title: 'Home', component: 'HomePersonnelPage'},
        { title: 'Gestion patient', component: 'AjoutInfoPage'},
        { title: 'Agenda', component: 'AgendaPersonnelPage' },
        { title: 'Infos d\'urgence', component: 'InfosUrgencePage'},
        { title: 'Suivi mère & enfant', component: 'EnfMerePage'},
        { title: 'Infos utile', component: 'InfosUtilePage'},
        { title: 'Pharmacie de garde', component: 'PharmaciePage'},
        { title: 'Informations générales sur le patient', component: 'InfosGeneralPatientPage'},
        { title: 'informations sur le lieu de la consultation et le prescripteur', component: 'InfosConsulPrescripteurPage'},
        { title: 'l\'ordonnance pour la pharmacie', component: 'PharmacieLaboPage'},
        { title: 'Help', component: 'HelpPage'},
        { title: 'Apropos', component: 'ContactPersonnelPage'},
        { title: 'Paramètres', component: 'ParametrePersonnelPage'},
        { title: 'Déconnexion', component: 'LogoutPage'}
      ];
      }
    );

    events.subscribe('Pharmacien:loggedIn', ()=>{
        this.pages = [
          { title: 'Home', component: 'HomePersonnelPage'},
          { title: 'Infos utile', component: 'InfosUtilePage'},
          { title: 'Pharmacie de garde', component: 'PharmaciePage'},
          { title: 'Help', component: 'HelpPage'},
          { title: 'Déconnexion', component: 'LogoutPage'}
        ];

      this.devpages = [
        { title: 'Home', component: 'HomePersonnelPage'},
        { title: 'Infos utile', component: 'InfosUtilePage'},
        { title: 'Pharmacie de garde', component: 'PharmaciePage'},
        { title: 'Help', component: 'HelpPage'},
        { title: 'Déconnexion', component: 'LogoutPage'}
      ];
      }
    );


    events.subscribe('laborentin:loggedIn', ()=>{
        this.pages = [
          { title: 'Home', component: 'HomePersonnelPage'},
          { title: 'Infos utile', component: 'InfosUtilePage'},
          { title: 'Help', component: 'HelpPage'},
          { title: 'Déconnexion', component: 'LogoutPage'}
        ];

      this.devpages = [
        { title: 'Home', component: 'HomePersonnelPage'},
        { title: 'Infos d\'urgence', component: 'InfosUrgencePage'},
        { title: 'Infos utile', component: 'InfosUtilePage'},
        { title: 'Examens pour le laboratoire', component: 'ResultPage'},
        { title: 'Help', component: 'HelpPage'},
        { title: 'Déconnexion', component: 'LogoutPage'}
      ];
      }
    );
  }

  initializeApp(){
    //const skipIntro = localStorage.getItem('skipIntro');
      //if (skipIntro) {
      //  this.rootPage = HomePage;
      //} else {
      //  this.rootPage = IntroPage;
      //  localStorage.setItem('skipIntro', 'true');
      //}
    this.typePerso = localStorage.getItem('typePerso');
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

     this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.server = Enums.APIURL.URL1 +  '/';
      this.selectcity = JSON.parse(localStorage.getItem('patients'));
      console.log(this.storage.get('login:status'));
      this.checkPreviousAuthorization();

    });

  }

  checkPreviousAuthorization(): void {
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
       (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = HomePage;
    } else if(window.localStorage.getItem('userPatient') === "patient") {
      this.events.publish('user:loggedIn');
      this.rootPage = ProfilePage;
            }

    else if(window.localStorage.getItem('personaluser') === "personal") {
      this.events.publish('personaluser:loggedIn');
      this.rootPage = ProfilePersonelPage;
            }
    else {
      this.rootPage = HomePage;
    }
  }

  openPage(page){
    // reset the content nav to have just this page
    //we wouldn't want the back button to show in this scenario devpages
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    setTimeout(() => {
      this.globalFooterEnabled = true;

      setTimeout(() => {
        this.content.resize();
      }, 3000);
    }, 3000);
  }
}

