import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AjoutBilanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-bilan',
  templateUrl: 'ajout-bilan.html',
})
export class AjoutBilanPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("dateCreate") dateCreate;
  @ViewChild("intitule") intitule;
  @ViewChild("temperature") temperature;
  @ViewChild("taille") taille;
  @ViewChild("tension") tension;
  @ViewChild("poidsActuel") poidsActuel;
  @ViewChild("poidsNormal") poidsNormal;
  @ViewChild("imc") imc;
  @ViewChild("tgc") tgc;
  @ViewChild("masseMinEraleOsseuse") masseMinEraleOsseuse;
  @ViewChild("pourcentageEau") pourcentageEau;
  @ViewChild("masseMusculaire") masseMusculaire;
  @ViewChild("evaluationSihouette") evaluationSihouette;
  @ViewChild("tgViscerale") tgViscerale;
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutBilanPage');
  }

  ngOnInit() {
    this.content.resize();
  }
  Ajouter(){


    if(this.dateCreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.intitule.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"intitule field is empty",
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
      //					patients_id
      let data = {
        //nom: JSON.parse(localStorage.getItem('username')),
        //password: JSON.parse(localStorage.getItem('password')),
        datecreate: this.dateCreate.value,
        intitule: this.intitule.value,
        temperature: this.temperature.value,
        taille: this.taille.value,
        tension: this.tension.value,
        poidsActuel: this.poidsActuel.value,
        imc: this.imc.value,
        tgc: this.tgc.value,
        masseMinEraleOsseuse: this.masseMinEraleOsseuse.value,
        pourcentageEau: this.pourcentageEau.value,
        masseMusculaire: this.masseMusculaire.value,
        evaluationSihouette: this.evaluationSihouette.value,
        tgViscerale: this.tgViscerale.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertBilan.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="Successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              //this.navCtrl.setRoot(SuiviPersoPage);

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
