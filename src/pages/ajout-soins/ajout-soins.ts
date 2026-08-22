import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { SoinsPage } from '../soins/soins';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


/**
 * Generated class for the AjoutSoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-soins',
  templateUrl: 'ajout-soins.html',
})
export class AjoutSoinsPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("datecreate") datecreate;
  @ViewChild("symtome") symtome;
  @ViewChild("traitement") traitement;
  @ViewChild("evaluation") evaluation;
  @ViewChild("observation") observation;
  @ViewChild("cout_traitement") cout_traitement;
  data:string;
  items:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutSoinsPage');
  }


  ngOnInit() {
    this.content.resize();
  }
  Ajouter(){

    if(this.datecreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date create field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.symtome.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }

    else
    if(this.cout_traitement.value==""){

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
      let data = {
        datecreate: this.datecreate.value,
        symtome: this.symtome.value,
        traitement: this.traitement.value,
        evaluation: this.evaluation.value,
        observation: this.observation.value,
        cout_traitement: this.cout_traitement.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

     console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertSoins.php",data, options)
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
