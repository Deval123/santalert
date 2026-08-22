import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AjoutRegimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-regimes',
  templateUrl: 'ajout-regimes.html',
})
export class AjoutRegimesPage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("type_regime") type_regime;
  @ViewChild("datedebut") datedebut;
  @ViewChild("poidsDepart") poidsDepart;
  @ViewChild("imc") imc;
  @ViewChild("restrictions") restrictions;
  @ViewChild("taille") taille;
  @ViewChild("natureRegime") natureRegime;
  @ViewChild("alimentationRecommande") alimentationRecommande;
  @ViewChild("typeTraitement") typeTraitement;
  @ViewChild("dateFin") dateFin;
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutRegimesPage');
  }
  //						patients_id

  ngOnInit() {
    this.content.resize();
  }
  Ajouter(){


    if(this.type_regime.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"type regime  field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.datedebut.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date debut field is empty",
        buttons: ['OK']
      });

      alert.present();

    }


    else
    if(this.dateFin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"dateFin field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.dateFin.value <= this.datedebut.value){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de Fin inferieure à  date de début",
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
 //						patients_id

      let data = {
        type_regime: this.type_regime.value,
        datedebut: this.datedebut.value,
        poidsDepart: this.poidsDepart.value,
        taille: this.taille.value,
        restrictions: this.restrictions.value,
        natureRegime: this.natureRegime.value,
        alimentationRecommande: this.alimentationRecommande.value,
        imc: this.imc.value,
        typeTraitement: this.typeTraitement.value,
        dateFin: this.dateFin.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertRegimes.php",data, options)
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
