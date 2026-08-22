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
  selector: 'page-edit-soins',
  templateUrl: 'edit-soins.html',
})
export class EditSoinsPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id:any;
  datecreate:any;
  symtome:any;
  traitement:any;
  evaluation:any;
  observation:any;
  cout_traitement:any;

  oldid:any;
  olddatecreate:any;
  oldsymtome:any;
  oldtraitement:any;
  oldevaluation:any;
  oldobservation:any;
  oldcout_traitement:any;

  @ViewChild("newdatecreate") newdatecreate;
  @ViewChild("newsymtome") newsymtome;
  @ViewChild("newtraitement") newtraitement;
  @ViewChild("newevaluation") newevaluation;
  @ViewChild("newobservation") newobservation;
  @ViewChild("newcout_traitement") newcout_traitement;
  items: any;
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSoinsPage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.datecreate = this.navParams.get('datecreate') ;
    this.symtome = this.navParams.get('symtome') ;
    this.traitement = this.navParams.get('traitement') ;
    this.evaluation = this.navParams.get('evaluation') ;
    this.observation = this.navParams.get('observation') ;
    this.cout_traitement = this.navParams.get('cout_traitement') ;

    //this.oldCountryValue = this.navParams.get(‘country’) ;

    this.oldid = this.navParams.get('id') ;
    this.olddatecreate = this.navParams.get('datecreate') ;
    this.oldsymtome = this.navParams.get('symtome') ;
    this.oldtraitement = this.navParams.get('traitement') ;
    this.oldevaluation = this.navParams.get('evaluation') ;
    this.oldobservation = this.navParams.get('observation') ;
    this.oldcout_traitement = this.navParams.get('cout_traitement') ;
  }

  Edit(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.newdatecreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.newsymtome.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newtraitement.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"traitement number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }  else
    if(this.newcout_traitement.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"cout_traitement field is empty",
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
        datecreate: this.olddatecreate,
        symtome: this.oldsymtome,
        traitement: this.oldtraitement,
        evaluation: this.oldevaluation,
        observation: this.oldobservation,
        cout_traitement: this.oldcout_traitement,
        newdatecreate: this.newdatecreate.value,
        newsymtome: this.newsymtome.value,
        newtraitement: this.newtraitement.value,
        newevaluation: this.newevaluation.value,
        newobservation: this.newobservation.value,
        newcout_traitement: this.newcout_traitement.value,

      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editSoins.php",data, options)
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
















