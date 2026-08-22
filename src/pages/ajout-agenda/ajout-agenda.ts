import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { ShowLastAgendaPatientsPage } from '../show-last-agenda-patients/show-last-agenda-patients';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AjoutAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-agenda',
  templateUrl: 'ajout-agenda.html',
})
export class AjoutAgendaPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("datedebut") datedebut;
  @ViewChild("datefin") datefin;
  @ViewChild("datefin1") datefin1;
  @ViewChild("datefin2") datefin2;
  @ViewChild("datefin3") datefin3;
  @ViewChild("nature") nature;
  @ViewChild("lieu") lieu;
  @ViewChild("cout") cout;
  @ViewChild("observation") observation;
  @ViewChild("tiers") tiers;

  data:string;
  items:any;
  url:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }///patients_id


  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutAgendaPage');
  }
  ngOnInit() {
    this.content.resize();
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
        datefin1: this.datefin1.value,
        datefin2: this.datefin2.value,
        datefin3: this.datefin3.value,
        nature: this.nature.value,
        lieu: this.lieu.value,
        cout: this.cout.value,
        observation: this.observation.value,
        tiers: this.tiers.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertAgendaPatients.php",data, options)
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
              this.navCtrl.push(ShowLastAgendaPatientsPage);

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
