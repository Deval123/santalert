import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Content } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutBilanPage } from '../ajout-bilan/ajout-bilan';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditBilanPage } from '../edit-bilan/edit-bilan';
import { ShowOneBilanPage } from '../show-one-bilan/show-one-bilan';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


/**
 * Generated class for the BilanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilan',
  templateUrl: 'bilan.html',
})
export class BilanPage {
  @ViewChild(Content) content: Content;
  data:string;
  items:any;
  bilan:any;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  userProfile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BilanPage');
  }

  ngOnInit(){
    this.content.resize();
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showBilan.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('bilan', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }


  deleteBilan(item) {

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
              this.http.post(Enums.APIURL.URL1 +  '/' + 'deleteBilan.php', item, options)
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


  addautomed(){
    /* let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present(); */
    this.navCtrl.setRoot(AjoutBilanPage);
  }

  editBilan(item){

    this.navCtrl.push(EditBilanPage, item)

  }

  showOneBilan(item){

    this.navCtrl.push(ShowOneBilanPage, item)

  }
}
