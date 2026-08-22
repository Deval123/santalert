import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import {FicheConsultationPage} from "../fiche-consultation/fiche-consultation";
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-consult',
  templateUrl: 'consult.html',
})
export class ConsultPage {

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
    console.log('ionViewDidLoad ConsultPage');
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
      patients: JSON.parse(localStorage.getItem('patients')).id,
      personel: JSON.parse(localStorage.getItem('personel'))
    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showConsulpers.php',data, options)
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
