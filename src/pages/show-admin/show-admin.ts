import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-show-admin',
  templateUrl: 'show-admin.html',
})
export class ShowAdminPage {
  items:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("email") email;
  @ViewChild("password") password;
  @ViewChild("nom") nom;
  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowAdminPage');
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showAdmin.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.server_response;
          //localStorage.setItem('AgendaPatients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  showOneAdmin(item){}

  editAdmin(item){}

  deleteAdmin(item){}
}
