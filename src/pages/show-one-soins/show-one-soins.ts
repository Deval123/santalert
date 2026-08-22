import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams, LoadingController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {EditSoinsPage} from "../edit-soins/edit-soins";
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-show-one-soins',
  templateUrl: 'show-one-soins.html',
})
export class ShowOneSoinsPage {

  items:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowOneSoinsPage');
  }

  ngOnInit(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      patients: JSON.parse(localStorage.getItem('patients')),
      id: this.navParams.get('id') ,
    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showOneAuto_med.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.server_response;
          console.log(this.items);

        });

    });
  }

  editSoins(item){

    this.navCtrl.push(EditSoinsPage, item)

  }
}
