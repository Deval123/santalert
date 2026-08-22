import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Content} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from "@angular/http";
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { SuiviPersoPage } from '../suivi-perso/suivi-perso';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-edit-bilan',
  templateUrl: 'edit-bilan.html',
})
export class EditBilanPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id:any;
  intitule:any;
  temperature:any;
  taille:any;
  tension:any;
  datecreate:any;
  patients_id:any;
  poidsActuel:any;
  imc:any;
  tgc:any;
  masseMinEraleOsseuse:any;
  pourcentageEau:any;
  masseMusculaire:any;
  evaluationSihouette:any;
  tgViscerale:any;

  oldid:any;
  oldintitule:any;
  oldtemperature:any;
  oldtaille:any;
  oldtension:any;
  olddatecreate:any;
  oldpoidsActuel:any;
  oldimc:any;
  oldpatients_id:any;
  oldtgc:any;
  oldmasseMinEraleOsseuse:any;
  oldpourcentageEau:any;
  oldmasseMusculaire:any;
  oldevaluationSihouette:any;
  oldtgViscerale:any;

  @ViewChild("newdatecreate") newdatecreate;
  @ViewChild("newintitule") newintitule;
  @ViewChild("newtemperature") newtemperature;
  @ViewChild("newtaille") newtaille;
  @ViewChild("newtension") newtension;
  @ViewChild("newpoidsActuel") newpoidsActuel;
  @ViewChild("newimc") newimc;
  @ViewChild("newtgc") newtgc;
  @ViewChild("newmasseMinEraleOsseuse") newmasseMinEraleOsseuse;
  @ViewChild("newpourcentageEau") newpourcentageEau;
  @ViewChild("newmasseMusculaire") newmasseMusculaire;
  @ViewChild("newevaluationSihouette") newevaluationSihouette;
  @ViewChild("newtgViscerale") newtgViscerale;

  items: any;
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBilanPage');
  }

  ngOnInit(){

    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.datecreate = this.navParams.get('datecreate') ;
    this.intitule = this.navParams.get('intitule') ;
    this.temperature = this.navParams.get('temperature') ;
    this.taille = this.navParams.get('taille') ;
    this.tension = this.navParams.get('tension') ;
    this.patients_id = this.navParams.get('patients_id') ;
    this.poidsActuel = this.navParams.get('poidsActuel') ;
    this.imc = this.navParams.get('imc') ;
    this.tgc = this.navParams.get('tgc') ;
    this.masseMinEraleOsseuse = this.navParams.get('masseMinEraleOsseuse') ;
    this.pourcentageEau = this.navParams.get('pourcentageEau') ;
    this.masseMusculaire = this.navParams.get('masseMusculaire') ;
    this.evaluationSihouette = this.navParams.get('evaluationSihouette') ;
    this.tgViscerale = this.navParams.get('tgViscerale') ;


    //this.oldCountryValue = this.navParams.get(‘country’) ;

    this.oldid = this.navParams.get('id') ;
    this.olddatecreate = this.navParams.get('datecreate') ;
    this.oldintitule = this.navParams.get('intitule') ;
    this.oldtemperature = this.navParams.get('temperature') ;
    this.oldtaille = this.navParams.get('taille') ;
    this.oldtension = this.navParams.get('tension') ;
    this.oldpatients_id = this.navParams.get('patients_id') ;
    this.oldpoidsActuel = this.navParams.get('poidsActuel') ;
    this.oldimc = this.navParams.get('imc') ;
    this.oldtgc = this.navParams.get('tgc') ;
    this.oldmasseMinEraleOsseuse = this.navParams.get('masseMinEraleOsseuse') ;
    this.oldpourcentageEau = this.navParams.get('pourcentageEau') ;
    this.oldmasseMusculaire = this.navParams.get('masseMusculaire') ;
    this.oldevaluationSihouette = this.navParams.get('evaluationSihouette') ;
    this.oldtgViscerale = this.navParams.get('tgViscerale') ;
  }

  Edit(){

    if(this.newdatecreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.newintitule.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"intitule field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newtemperature.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"temperature  field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.newtaille.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"taille field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.newtension.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tension field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newpoidsActuel.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poidsActuel field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newimc.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"imc field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newtgc.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tgc field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newmasseMinEraleOsseuse.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"masseMinEraleOsseuse field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newpourcentageEau.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"pourcentageEau field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newmasseMusculaire.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"masseMusculaire field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newevaluationSihouette.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"evaluationSihouette field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newtgViscerale.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"tgViscerale field is empty",
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
        datecreate: this.olddatecreate,
        intitule: this.oldintitule,
        temperature: this.oldtemperature,
        taille: this.oldtaille,
        tension: this.oldtension,
        poidsActuel: this.oldpoidsActuel,
        imc: this.oldimc,
        tgc: this.oldtgc,
        masseMinEraleOsseuse: this.oldmasseMinEraleOsseuse,
        pourcentageEau: this.oldpourcentageEau,
        masseMusculaire: this.oldmasseMusculaire,
        evaluationSihouette: this.oldevaluationSihouette,
        tgViscerale: this.oldtgViscerale,

        newdatecreate: this.newdatecreate.value,
        newintitule: this.newintitule.value,
        newtemperature: this.newtemperature.value,
        newtaille: this.newtaille.value,
        newtension: this.newtension.value,
        newpoidsActuel: this.newpoidsActuel.value,
        newimc: this.newimc.value,
        newtgc: this.newtgc.value,
        newmasseMinEraleOsseuse: this.newmasseMinEraleOsseuse.value,
        newpourcentageEau: this.newpourcentageEau.value,
        newmasseMusculaire: this.newmasseMusculaire.value,
        newevaluationSihouette: this.newevaluationSihouette.value,
        newtgViscerale: this.newtgViscerale.value,


      };

      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editBilan.php",data, options)
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
