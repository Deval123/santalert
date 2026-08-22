import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutRegimesPage } from '../ajout-regimes/ajout-regimes';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditRegimePage } from '../edit-regime/edit-regime';
import { ShowOneRegimePage } from '../show-one-regime/show-one-regime';
import { AddParamRegimePage } from '../add-param-regime/add-param-regime';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-regimes',
  templateUrl: 'regimes.html',
})
export class RegimesPage {
  data:string;
  items:any;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegimesPage');
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showRegime.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          //localStorage.setItem('auto_med', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteRegime(item) {

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
              this.http.post(Enums.APIURL.URL1 +  '/' + 'deleteRegime.php', item, options)
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
    this.navCtrl.setRoot(AjoutRegimesPage);
  }

  editRegime(item){

    this.navCtrl.push(EditRegimePage, item)

  }

  showOneRegime(item){

    this.navCtrl.push(ShowOneRegimePage, item)

  }

  addParamRegime(item){
    this.navCtrl.push(AddParamRegimePage, item)

  }
}
