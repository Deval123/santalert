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
  selector: 'page-edit-regime',
  templateUrl: 'edit-regime.html',
})
export class EditRegimePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id : any;
  type_regime : any;
  datedebut : any;
  poidsDepart : any;
  imc : any;
  restrictions : any;
  taille : any;
  natureRegime : any;
  alimentationRecommande : any;
  typeTraitement : any;
  dateFin : any;

  oldid : any;
  oldtype_regime : any;
  olddatedebut : any;
  oldpoidsDepart : any;
  oldimc : any;
  oldrestrictions : any;
  oldtaille : any;
  oldnatureRegime : any;
  oldalimentationRecommande : any;
  oldtypeTraitement : any;
  olddateFin : any;

  @ViewChild("newtype_regime") newtype_regime;
  @ViewChild("newdatedebut") newdatedebut;
  @ViewChild("newpoidsDepart") newpoidsDepart;
  @ViewChild("newimc") newimc;
  @ViewChild("newrestrictions") newrestrictions;
  @ViewChild("newtaille") newtaille;
  @ViewChild("newnatureRegime") newnatureRegime;
  @ViewChild("newalimentationRecommande") newalimentationRecommande;
  @ViewChild("newtypeTraitement") newtypeTraitement;
  @ViewChild("newdateFin") newdateFin;

  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRegimePage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.type_regime = this.navParams.get('type_regime') ;
    this.datedebut = this.navParams.get('datedebut') ;
    this.poidsDepart = this.navParams.get('poidsDepart') ;
    this.imc = this.navParams.get('imc') ;
    this.restrictions = this.navParams.get('restrictions') ;
    this.taille = this.navParams.get('taille') ;
    this.natureRegime = this.navParams.get('natureRegime') ;
    this.alimentationRecommande = this.navParams.get('alimentationRecommande') ;
    this.typeTraitement = this.navParams.get('typeTraitement') ;
    this.dateFin = this.navParams.get('dateFin') ;

    this.oldid = this.navParams.get('id') ;
    this.oldtype_regime = this.navParams.get('type_regime') ;
    this.olddatedebut = this.navParams.get('datedebut') ;
    this.oldpoidsDepart = this.navParams.get('poidsDepart') ;
    this.oldimc = this.navParams.get('imc') ;
    this.oldrestrictions = this.navParams.get('restrictions') ;
    this.oldtaille = this.navParams.get('taille') ;
    this.oldnatureRegime = this.navParams.get('natureRegime') ;
    this.oldalimentationRecommande = this.navParams.get('alimentationRecommande') ;
    this.oldtypeTraitement = this.navParams.get('typeTraitement') ;
    this.olddateFin = this.navParams.get('dateFin') ;
  }

  Edit(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.newtype_regime.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"type regime field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.newdatedebut.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date début is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newpoidsDepart.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poids départ field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.newdateFin.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de Fin field is empty",
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
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
      let data = {
        id: this.oldid,

        type_regime: this.oldtype_regime,
        datedebut: this.olddatedebut,
        poidsDepart: this.oldpoidsDepart,
        imc: this.oldimc,
        restrictions: this.oldrestrictions,
        taille: this.oldtaille,
        natureRegime: this.oldnatureRegime,
        alimentationRecommande: this.oldalimentationRecommande,
        typeTraitement: this.oldtypeTraitement,
        dateFin: this.olddateFin,


      };

      //console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editRegime.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="data update successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.navCtrl.push(SuiviPersoPage);

            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
            }
          });
      });
    }

  }

}
