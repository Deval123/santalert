import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { SoinsPage } from '../soins/soins';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AddParamRegimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-param-regime',
  templateUrl: 'add-param-regime.html',
})
export class AddParamRegimePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("dateParam") dateParam;
  @ViewChild("poids") poids;
  @ViewChild("temperature") temperature;
  @ViewChild("tension") tension;
  @ViewChild("observation") observation;
  data:string;
  items:any;
  regime_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ngOnInit(){
    this.content.resize();
    this.regime_id = this.navParams.get('id') ;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddParamRegimePage');
  }

  Ajouter(){

    if(this.dateParam.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.temperature.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Temperature field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.observation.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"observation field is empty",
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
      //regime_id	poids	dateParam	temperature	tension	observation
      let data = {
        regime_id: this.regime_id,
        dateParam: this.dateParam.value,
        poids: this.poids.value,
        temperature: this.temperature.value,
        tension: this.tension.value,
        observation: this.observation.value,
      };

      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertParamRegime.php",data, options)
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
              this.navCtrl.push(SoinsPage);

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
