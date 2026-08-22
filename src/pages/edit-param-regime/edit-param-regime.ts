import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { ParamRegimePage } from '../param-regime/param-regime';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-edit-param-regime',
  templateUrl: 'edit-param-regime.html',
})
export class EditParamRegimePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id:any;
  regime_id:any;
  poids:any;
  dateParam:any;
  temperature:any;
  tension:any;
  observation:any;

  oldid:any;
  oldregime_id:any;
  oldpoids:any;
  olddateParam:any;
  oldtemperature:any;
  oldtension:any;
  oldobservation:any;

  @ViewChild("newpoids") newpoids;
  @ViewChild("newdateParam") newdateParam;
  @ViewChild("newtemperature") newtemperature;
  @ViewChild("newevaluation") newevaluation;
  @ViewChild("newtension") newtension;
  @ViewChild("newobservation") newobservation;
  items: any;
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditParamRegimePage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.poids = this.navParams.get('poids') ;
    this.dateParam = this.navParams.get('dateParam') ;
    this.temperature = this.navParams.get('temperature') ;
    this.tension = this.navParams.get('tension') ;
    this.observation = this.navParams.get('observation') ;
    this.regime_id = this.navParams.get('regime_id') ;

//regime_id	poids	dateParam	temperature	tension	observation

    this.oldid = this.navParams.get('id') ;
    this.oldpoids = this.navParams.get('poids') ;
    this.olddateParam = this.navParams.get('dateParam') ;
    this.oldtemperature = this.navParams.get('temperature') ;
    this.oldtension = this.navParams.get('tension') ;
    this.oldobservation = this.navParams.get('observation') ;
    this.oldregime_id = this.navParams.get('regime_id') ;
  }

  Edit(){

    if(this.newdateParam.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.newpoids.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"poids field is empty",
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
        dateParam: this.olddateParam,
        poids: this.oldpoids,
        temperature: this.oldtemperature,
        tension: this.oldtension,
        observation: this.oldobservation,
        newdateParam: this.newdateParam.value,
        newpoids: this.newpoids.value,
        newtemperature: this.newtemperature.value,
        newtension: this.newtension.value,
        newobservation: this.newobservation.value,
      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editParamRegime.php",data, options)
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
              this.navCtrl.push(ParamRegimePage);

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
