import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { AgendaPage } from '../agenda/agenda';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
/**
 * Generated class for the EditAgendaPatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-agenda-patients',
  templateUrl: 'edit-agenda-patients.html',
})
export class EditAgendaPatientsPage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id:any;
  patients_id:any;
  datedebut:any;
  datefin:any;
  datefin1:any;
  datefin2:any;
  datefin3:any;
  nature:any;
  lieu:any;
  observation:any;
  tiers:any;
  cout: any;

  oldid:any;
  oldpatients_id:any;
  olddatedebut:any;
  olddatefin:any;
  olddatefin1:any;
  olddatefin2:any;
  olddatefin3:any;
  oldnature:any;
  oldlieu:any;
  oldobservation:any;
  oldtiers:any;
  oldcout:any;
  @ViewChild("newdatedebut") newdatedebut;
  @ViewChild("newdatefin") newdatefin;
  @ViewChild("newdatefin1") newdatefin1;
  @ViewChild("newdatefin2") newdatefin2;
  @ViewChild("newdatefin3") newdatefin3;
  @ViewChild("newnature") newnature;
  @ViewChild("newlieu") newlieu;
  @ViewChild("newobservation") newobservation;
  @ViewChild("newtiers") newtiers;
  @ViewChild("newcout") newcout;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAgendaPatientsPage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.datedebut = this.navParams.get('datedebut') ;
    this.datefin = this.navParams.get('datefin') ;
    this.datefin1 = this.navParams.get('datefin1') ;
    this.datefin2 = this.navParams.get('datefin2') ;
    this.datefin3 = this.navParams.get('datefin3') ;
    this.nature = this.navParams.get('nature') ;
    this.lieu = this.navParams.get('lieu') ;
    this.observation = this.navParams.get('observation') ;
    this.tiers = this.navParams.get('tiers') ;
    this.cout = this.navParams.get('cout') ;

    this.oldid = this.navParams.get('id') ;
    this.olddatedebut = this.navParams.get('datedebut') ;
    this.olddatefin = this.navParams.get('datefin') ;
    this.olddatefin1 = this.navParams.get('datefin1') ;
    this.olddatefin2 = this.navParams.get('datefin2') ;
    this.olddatefin3 = this.navParams.get('datefin3') ;
    this.oldnature = this.navParams.get('nature') ;
    this.oldlieu = this.navParams.get('lieu') ;
    this.oldobservation = this.navParams.get('observation') ;
    this.oldtiers = this.navParams.get('tiers') ;
    this.oldcout = this.navParams.get('cout') ;
  }

  Edit(){

    if(this.newdatedebut.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date début field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.newdatefin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de fin field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newnature.value=="" ){

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
        id: this.oldid,
        datedebut: this.olddatedebut,
        datefin: this.olddatefin,
        datefin1: this.olddatefin1,
        datefin2: this.olddatefin2,
        datefin3: this.olddatefin3,
        nature: this.oldnature,
        lieu: this.oldlieu,
        observation: this.oldobservation,
        tiers: this.oldtiers,
        cout: this.oldcout,

        newdatedebut: this.newdatedebut.value,
        newdatefin: this.newdatefin.value,
        newdatefin1: this.newdatefin1.value,
        newdatefin2: this.newdatefin2.value,
        newdatefin3: this.newdatefin3.value,
        newnature: this.newnature.value,
        newlieu: this.newlieu.value,
        newobservation: this.newobservation.value,
        newtiers: this.newtiers.value,
        newcout: this.newcout.value,

      };

      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editAgendaPatients.php",data, options)
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
              this.navCtrl.push(AgendaPage);

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
