import {Component, ViewChild} from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutAgendaPersonelPage } from '../ajout-agenda-personel/ajout-agenda-personel';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {EditAgendaPatientsPage} from "../edit-agenda-patients/edit-agenda-patients";
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AgendaPersonnelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda-personnel',
  templateUrl: 'agenda-personnel.html',
})
export class AgendaPersonnelPage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  data:string;
  items:any;
  showOne: any;
  show: any;
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPersonnelPage');
  }

  ngOnInit(){
    this.content.resize();
    this.show = "show";
    this.showOne = "";

    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        personel: JSON.parse(localStorage.getItem('personel')),
      };
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      console.log(data);
      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + 'showAgendaPersonelEts.php',data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

         loader.dismiss();

            /*let alert = this.alertCtrl.create({
              title:"CONGRATS",
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present();*/

            this.items=res.server_response;
            localStorage.setItem('AgendaPersonel', JSON.stringify(this.items));
            console.log(this.items);

          });

      });



  }

  deleteAgendaPatients(id){
    id=id;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      id: id,
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + "deleteAgendaPatients.php",data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          let alert = this.alertCtrl.create({
            title:"CONGRATS",
            subTitle:(res),
            buttons: ['OK']
          });
          alert.present();//window.location.reload()
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          console.log(this.items);

        });

    });
  }

  addAgendaPersonel(){
    let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(AjoutAgendaPersonelPage);
  }

  editAgendaPatients(item){
    this.navCtrl.push(EditAgendaPatientsPage, item);
  }

  showOneAgendaPatients(item){
    this.showOne = "showOne";
    this.show = "";
    this.item = item;

  }
}
