import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams, LoadingController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { FicheConsultationPage } from '../fiche-consultation/fiche-consultation';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the ConsultationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultation',
  templateUrl: 'consultation.html',
})
export class ConsultationPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  consultation: any;
  item: any;
  etablissements: any;
  show: any;
  showOne: any;
  showOneConsul: any;
  server: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
                this.server = Enums.APIURL.URL1 +  '/';
                }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultationPage');
  }


  ngOnInit(){
    this.content.resize();
    this.show = "show";
    this.showOne = "";
    this.showOneConsul= "";
    this.etablissements = JSON.parse(localStorage.getItem('etablissement'));

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      nom: JSON.parse(localStorage.getItem('username')),
      password: JSON.parse(localStorage.getItem('password')),

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showConsultation.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.consultation=res.server_response;
          localStorage.setItem('consultation', JSON.stringify(this.consultation));
          console.log(this.consultation);

        });

    });
  }


  showOneConsult(item){
    this.showOne = "showOne";
    this.show = "";
    this.showOneConsul= "";
    this.item = item;
    console.log(this.item);

  }

  showConsul(item){
    this.showOne = "";
    this.show = "";
    this.showOneConsul= "showOneConsul";
    this.item = item;
    console.log(this.item);

  }

  formadd(){
    this.navCtrl.push(FicheConsultationPage);
  }
}
