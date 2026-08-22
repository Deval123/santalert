import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { AgendaPersonnelPage } from '../agenda-personnel/agenda-personnel';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AjoutAgendaPersonelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-agenda-personel',
  templateUrl: 'ajout-agenda-personel.html',
})
export class AjoutAgendaPersonelPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("datedebut") datedebut;
  @ViewChild("datefin") datefin;
  @ViewChild("nature") nature;
  @ViewChild("lieu") lieu;
  @ViewChild("observation") observation;
  @ViewChild("tiers") tiers;
  @ViewChild("patient") patient;


  data:string;
  items:any;
  url:string;
  id:any;
  etablissements:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutAgendaPersonelPage');
  }
  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.etablissements = JSON.parse(localStorage.getItem('etablissement'));

  }

  Ajouter(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.datedebut.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date début field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.datefin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de fin field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.nature.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nature field is empty",
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
        datedebut: this.datedebut.value,
        datefin: this.datefin.value,
        nature: this.nature.value,
        lieu: this.lieu.value,
        observation: this.observation.value,
        tiers: this.tiers.value,
        patient: this.patient.value,

        personel: JSON.parse(localStorage.getItem('personel')),

      };

      console.log(JSON.parse(localStorage.getItem('personel')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      //this.url = JSON.parse(localStorage.getItem('Url'));

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data) "http://localhost/devdb/insertAgendaPatients.php"
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertAgendaPersonelEts.php",data, options)
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
              this.navCtrl.push(AgendaPersonnelPage);

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
