import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditParamRegimePage } from '../edit-param-regime/edit-param-regime';
import { ShowOneParamRegimePage } from '../show-one-param-regime/show-one-param-regime';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-param-regime',
  templateUrl: 'param-regime.html',
})
export class ParamRegimePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  data:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParamRegimePage');
  }

  ngOnInit(){
    this.content.resize();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      id : this.navParams.get('id')
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showParamRegime.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('param', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteParamRegime(item) {
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
              this.http.post(Enums.APIURL.URL1 +  '/' + 'deleteParamRegime.php', item, options)
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

  showParamRegime(item){
    this.navCtrl.push(ShowOneParamRegimePage, item)

  }
  editParamRegime(item){
    this.navCtrl.push(EditParamRegimePage, item)
  }
}
