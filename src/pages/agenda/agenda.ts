import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutAgendaPage } from '../ajout-agenda/ajout-agenda';
import { EditAgendaPatientsPage } from '../edit-agenda-patients/edit-agenda-patients';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { NotificationPage } from '../notification/notification';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  data:string;
  items:any;
  showOne: any;
  show: any;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
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
      patients: JSON.parse(localStorage.getItem('patients')),
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showAgendaPatients.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('AgendaPatients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  addNotification(){
   this.navCtrl.push(NotificationPage);
  }


  deleteAgendaPatients(item) {

    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you really want to delete this row?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }

      },

        {
          text: 'Delete',
          handler: () => {
            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });

            let loader = this.loading.create({
              content: 'Processing please wait…',
            });
            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 +  '/' + "deleteAgendaPatients.php", item, options)
                .pipe(map((res: any) => res.json()))
                .subscribe(res => {
                  loader.dismiss();
                  if(res=="data deleted successfully"){

                    let alert = this.alertCtrl.create({
                      title:"CONGRATS",
                      subTitle:(res),
                      buttons: ['OK']

                    });
                    alert.present();//window.location.reload()
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);

                  }else {
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

      ]

    });

    alert.present();

  }

  addAgendaPatients(){
   /* let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present();*/
    this.navCtrl.setRoot(AjoutAgendaPage);
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
