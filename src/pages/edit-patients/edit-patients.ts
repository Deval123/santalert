import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { SuiviPersoPage } from '../suivi-perso/suivi-perso';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-edit-patients',
  templateUrl: 'edit-patients.html',
})
export class EditPatientsPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id: any;
  nom: any;
  password: any;
  telephone: any;
  email: any;
  prenom: any;
  anneeNais: any;
  lieuNais: any;
  profession: any;
  filename: any;
  lieuService: any;
  telBureau: any;
  residencePrincipal: any;
  residenceSecondaire: any;
  nomPere: any;
  telPere: any;
  emailPere: any;
  professionPere: any;
  quartierPere: any;
  ruePere: any;
  nomMere: any;
  telMere: any;
  emailMere: any;
  professionMere: any;
  quartierMere: any;
  rueMere: any;
  nomTuteur: any;
  telTuteur: any;
  emailTuteur: any;
  professionTuteur: any;
  quartierTuteur: any;
  rueTuteur: any;
  proche1: any;
  tel_proche1: any;
  emailProche1: any;
  residenceProche1: any;
  professionProche1: any;
  proche2: any;
  tel_proche2: any;
  emailProche2: any;
  residenceProche2: any;
  professionProche2: any;
  proche3: any;
  tel_proche3: any;
  emailProche3: any;
  residenceProche3: any;
  professionProche3: any;
  groupeSanguin: any;
  allergie: any;
  incapacite: any;
  medecinFamille: any;
  assurance: any;
  rhesus: any;
  observationPhisyque: any;
  signeParticulier: any;

  oldid:any;
  oldnom: any;
  oldpassword: any;
  oldtelephone: any;
  oldemail: any;
  oldprenom: any;
  oldanneeNais: any;
  oldlieuNais: any;
  oldprofession: any;
  oldfilename: any;
  oldlieuService: any;
  oldtelBureau: any;
  oldresidencePrincipal: any;
  oldresidenceSecondaire: any;
  oldnomPere: any;
  oldtelPere: any;
  oldemailPere: any;
  oldprofessionPere: any;
  oldquartierPere: any;
  oldruePere: any;
  oldnomMere: any;
  oldtelMere: any;
  oldemailMere: any;
  oldprofessionMere: any;
  oldquartierMere: any;
  oldrueMere: any;
  oldnomTuteur: any;
  oldtelTuteur: any;
  oldemailTuteur: any;
  oldprofessionTuteur: any;
  oldquartierTuteur: any;
  oldrueTuteur: any;
  oldproche1: any;
  oldtel_proche1: any;
  oldemailProche1: any;
  oldresidenceProche1: any;
  oldprofessionProche1: any;
  oldproche2: any;
  oldtel_proche2: any;
  oldemailProche2: any;
  oldresidenceProche2: any;
  oldprofessionProche2: any;
  oldproche3: any;
  oldtel_proche3: any;
  oldemailProche3: any;
  oldresidenceProche3: any;
  oldprofessionProche3: any;
  oldgroupeSanguin: any;
  oldallergie: any;
  oldincapacite: any;
  oldmedecinFamille: any;
  oldassurance: any;
  oldrhesus: any;
  oldobservationPhisyque: any;
  oldsigneParticulier: any;

  @ViewChild("newnom") newnom;
  @ViewChild("newtelephone") newtelephone;
  @ViewChild("newevaluation") newevaluation;
  @ViewChild("newprenom") newprenom;
  @ViewChild("newanneeNais") newanneeNais;
  @ViewChild("newlieuNais") newlieuNais;
  @ViewChild("newprofession") newprofession;
  @ViewChild("newfilename") newfilename;
  @ViewChild("newlieuService") newlieuService;
  @ViewChild("newtelBureau") newtelBureau;
  @ViewChild("newresidencePrincipal") newresidencePrincipal;
  @ViewChild("newresidenceSecondaire") newresidenceSecondaire;
  @ViewChild("newnomPere") newnomPere;
  @ViewChild("newtelPere") newtelPere;
  @ViewChild("newemailPere") newemailPere;
  @ViewChild("newprofessionPere") newprofessionPere;
  @ViewChild("newquartierPere") newquartierPere;
  @ViewChild("newruePere") newruePere;
  @ViewChild("newnomMere") newnomMere;
  @ViewChild("newtelMere") newtelMere;
  @ViewChild("newemailMere") newemailMere;
  @ViewChild("newprofessionMere") newprofessionMere;
  @ViewChild("newquartierMere") newquartierMere;
  @ViewChild("newrueMere") newrueMere;
  @ViewChild("newnomTuteur") newnomTuteur;
  @ViewChild("newtelTuteur") newtelTuteur;
  @ViewChild("newemailTuteur") newemailTuteur;
  @ViewChild("newprofessionTuteur") newprofessionTuteur;
  @ViewChild("newquartierTuteur") newquartierTuteur;
  @ViewChild("newrueTuteur") newrueTuteur;
  @ViewChild("newproche1") newproche1;
  @ViewChild("newtel_proche1") newtel_proche1;
  @ViewChild("newemailProche1") newemailProche1;
  @ViewChild("newresidenceProche1") newresidenceProche1;
  @ViewChild("newprofessionProche1") newprofessionProche1;
  @ViewChild("newproche2") newproche2;
  @ViewChild("newtel_proche2") newtel_proche2;
  @ViewChild("newemailProche2") newemailProche2;
  @ViewChild("newresidenceProche2") newresidenceProche2;
  @ViewChild("newprofessionProche2") newprofessionProche2;
  @ViewChild("newproche3") newproche3;
  @ViewChild("newtel_proche3") newtel_proche3;
  @ViewChild("newemailProche3") newemailProche3;
  @ViewChild("newresidenceProche3") newresidenceProche3;
  @ViewChild("newprofessionProche3") newprofessionProche3;
  @ViewChild("newgroupeSanguin") newgroupeSanguin;
  @ViewChild("newincapacite") newincapacite;
  @ViewChild("newmedecinFamille") newmedecinFamille;
  @ViewChild("newallergie") newallergie;
  @ViewChild("newassurance") newassurance;
  @ViewChild("newrhesus") newrhesus;
  @ViewChild("newobservationPhisyque") newobservationPhisyque;
  @ViewChild("newsigneParticulier") newsigneParticulier;

  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPatientsPage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.nom = this.navParams.get('nom') ;
    this.telephone = this.navParams.get('telephone') ;
    this.prenom = this.navParams.get('prenom') ;
    this.anneeNais = this.navParams.get('anneeNais') ;
    this.lieuNais = this.navParams.get('lieuNais') ;
    this.profession = this.navParams.get('profession') ;
    this.filename = this.navParams.get('filename') ;
    this.lieuService = this.navParams.get('lieuService') ;
    this.telBureau = this.navParams.get('telBureau') ;
    this.residencePrincipal = this.navParams.get('residencePrincipal') ;
    this.residenceSecondaire = this.navParams.get('residenceSecondaire') ;
    this.nomPere = this.navParams.get('nomPere') ;
    this.telPere = this.navParams.get('telPere') ;
    this.emailPere = this.navParams.get('emailPere') ;
    this.professionPere = this.navParams.get('professionPere') ;
    this.quartierPere = this.navParams.get('quartierPere') ;
    this.ruePere = this.navParams.get('ruePere') ;
    this.nomMere = this.navParams.get('nomMere') ;
    this.telMere = this.navParams.get('telMere') ;
    this.emailMere = this.navParams.get('emailMere') ;
    this.professionMere = this.navParams.get('professionMere') ;
    this.quartierMere = this.navParams.get('quartierMere') ;
    this.rueMere = this.navParams.get('rueMere') ;
    this.nomTuteur = this.navParams.get('nomTuteur') ;
    this.telTuteur = this.navParams.get('telTuteur') ;
    this.emailTuteur = this.navParams.get('emailTuteur') ;
    this.professionTuteur = this.navParams.get('professionTuteur') ;
    this.quartierTuteur = this.navParams.get('quartierTuteur') ;
    this.rueTuteur = this.navParams.get('rueTuteur') ;
    this.proche1 = this.navParams.get('proche1') ;
    this.tel_proche1 = this.navParams.get('tel_proche1') ;
    this.emailProche1 = this.navParams.get('emailProche1') ;
    this.residenceProche1 = this.navParams.get('residenceProche1') ;
    this.professionProche1 = this.navParams.get('professionProche1') ;
    this.proche2 = this.navParams.get('proche2') ;
    this.tel_proche2 = this.navParams.get('tel_proche2') ;
    this.emailProche2 = this.navParams.get('emailProche2') ;
    this.residenceProche2 = this.navParams.get('residenceProche2') ;
    this.professionProche2 = this.navParams.get('professionProche2') ;
    this.proche3 = this.navParams.get('proche3') ;
    this.tel_proche3 = this.navParams.get('tel_proche3') ;
    this.emailProche3 = this.navParams.get('emailProche3') ;
    this.residenceProche3 = this.navParams.get('residenceProche3') ;
    this.professionProche3 = this.navParams.get('professionProche3') ;
    this.groupeSanguin = this.navParams.get('groupeSanguin') ;
    this.allergie = this.navParams.get('allergie') ;
    this.incapacite = this.navParams.get('incapacite') ;
    this.medecinFamille = this.navParams.get('medecinFamille') ;
    this.assurance = this.navParams.get('assurance') ;
    this.rhesus = this.navParams.get('rhesus') ;
    this.observationPhisyque = this.navParams.get('observationPhisyque') ;
    this.signeParticulier = this.navParams.get('signeParticulier') ;


    this.oldid = this.navParams.get('id') ;
    this.oldnom = this.navParams.get('nom') ;
    this.oldtelephone = this.navParams.get('telephone') ;
    this.oldprenom = this.navParams.get('prenom') ;
    this.oldanneeNais = this.navParams.get('anneeNais') ;
    this.oldlieuNais = this.navParams.get('lieuNais') ;
    this.oldprofession = this.navParams.get('profession') ;
    this.oldfilename = this.navParams.get('filename') ;
    this.oldlieuService = this.navParams.get('lieuService') ;
    this.oldtelBureau = this.navParams.get('telBureau') ;
    this.oldresidencePrincipal = this.navParams.get('residencePrincipal') ;
    this.oldresidenceSecondaire = this.navParams.get('residenceSecondaire') ;
    this.oldnomPere = this.navParams.get('nomPere') ;
    this.oldtelPere = this.navParams.get('telPere') ;
    this.oldemailPere = this.navParams.get('emailPere') ;
    this.oldprofessionPere = this.navParams.get('professionPere') ;
    this.oldquartierPere = this.navParams.get('quartierPere') ;
    this.oldruePere = this.navParams.get('ruePere') ;
    this.oldnomMere = this.navParams.get('nomMere') ;
    this.oldtelMere = this.navParams.get('telMere') ;
    this.oldemailMere = this.navParams.get('emailMere') ;
    this.oldprofessionMere = this.navParams.get('professionMere') ;
    this.oldquartierMere = this.navParams.get('quartierMere') ;
    this.oldrueMere = this.navParams.get('rueMere') ;
    this.oldnomTuteur = this.navParams.get('nomTuteur') ;
    this.oldtelTuteur = this.navParams.get('telTuteur') ;
    this.oldemailTuteur = this.navParams.get('emailTuteur') ;
    this.oldprofessionTuteur = this.navParams.get('professionTuteur') ;
    this.oldquartierTuteur = this.navParams.get('quartierTuteur') ;
    this.oldrueTuteur = this.navParams.get('rueTuteur') ;
    this.oldproche1 = this.navParams.get('proche1') ;
    this.oldtel_proche1 = this.navParams.get('tel_proche1') ;
    this.oldemailProche1 = this.navParams.get('emailProche1') ;
    this.oldresidenceProche1 = this.navParams.get('residenceProche1') ;
    this.oldprofessionProche1 = this.navParams.get('professionProche1') ;
    this.oldproche2 = this.navParams.get('proche2') ;
    this.oldtel_proche2 = this.navParams.get('tel_proche2') ;
    this.oldemailProche2 = this.navParams.get('emailProche2') ;
    this.oldresidenceProche2 = this.navParams.get('residenceProche2') ;
    this.oldprofessionProche2 = this.navParams.get('professionProche2') ;
    this.oldproche3 = this.navParams.get('proche3') ;
    this.oldtel_proche3 = this.navParams.get('tel_proche3') ;
    this.oldemailProche3 = this.navParams.get('emailProche3') ;
    this.oldresidenceProche3 = this.navParams.get('residenceProche3') ;
    this.oldprofessionProche3 = this.navParams.get('professionProche3') ;
    this.oldgroupeSanguin = this.navParams.get('groupeSanguin') ;
    this.oldallergie = this.navParams.get('allergie') ;
    this.oldincapacite = this.navParams.get('incapacite') ;
    this.oldmedecinFamille = this.navParams.get('medecinFamille') ;
    this.oldassurance = this.navParams.get('assurance') ;
    this.oldrhesus = this.navParams.get('rhesus') ;
    this.oldobservationPhisyque = this.navParams.get('observationPhisyque') ;
    this.oldsigneParticulier = this.navParams.get('signeParticulier') ;

  }

  Edit(){

    if(this.newnom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else

    {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        id: this.oldid,
        newnom: this.newnom.value,
        newprenom: this.newprenom.value,
        newtelephone: this.newtelephone.value,
        newanneeNais: this.newanneeNais.value,
        newlieuNais: this.newlieuNais.value,
        newprofession: this.newprofession.value,
        newfilename: this.newfilename.value,
        newlieuService: this.newlieuService.value,
        newtelBureau: this.newtelBureau.value,
        newresidencePrincipal: this.newresidencePrincipal.value,
        newresidenceSecondaire: this.newresidenceSecondaire.value,
        newnomPere: this.newnomPere.value,
        newtelPere: this.newtelPere.value,
        newemailPere: this.newemailPere.value,
        newprofessionPere: this.newprofessionPere.value,
        newquartierPere: this.newquartierPere.value,
        newruePere: this.newruePere.value,
        newnomMere: this.newnomMere.value,
        newtelMere: this.newtelMere.value,
        newemailMere: this.newemailMere.value,
        newprofessionMere: this.newprofessionMere.value,
        newquartierMere: this.newquartierMere.value,
        newrueMere: this.newrueMere.value,
        newnomTuteur: this.newnomTuteur.value,
        newtelTuteur: this.newtelTuteur.value,
        newemailTuteur: this.newemailTuteur.value,
        newprofessionTuteur: this.newprofessionTuteur.value,
        newquartierTuteur: this.newquartierTuteur.value,
        newrueTuteur: this.newrueTuteur.value,
        newproche1: this.newproche1.value,
        newtel_proche1: this.newtel_proche1.value,
        newemailProche1: this.newemailProche1.value,
        newresidenceProche1: this.newresidenceProche1.value,
        newprofessionProche1: this.newprofessionProche1.value,
        newproche2: this.newproche2.value,
        newtel_proche2: this.newtel_proche2.value,
        newemailProche2: this.newemailProche2.value,
        newresidenceProche2: this.newresidenceProche2.value,
        newprofessionProche2: this.newprofessionProche2.value,
        newproche3: this.newproche3.value,
        newtel_proche3: this.newtel_proche3.value,
        newemailProche3: this.newemailProche3.value,
        newresidenceProche3: this.newresidenceProche3.value,
        newprofessionProche3: this.newprofessionProche3.value,
        newgroupeSanguin: this.newgroupeSanguin.value,
        newallergie: this.newallergie.value,
        newincapacite: this.newincapacite.value,
        newmedecinFamille: this.newmedecinFamille.value,
        newassurance: this.newassurance.value,
        newrhesus: this.newrhesus.value,
        newobservationPhisyque: this.newobservationPhisyque.value,
        newsigneParticulier: this.newsigneParticulier.value,



    };

      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editPatients.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="data update successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),

                buttons: ['OK']
              });
              console.log(res),
              alert.present();
              this.navCtrl.push(SuiviPersoPage);

            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });
              console.log(res),
              alert.present();
            }
          });
      });
    }

  }

}
