import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditPatientsPage } from '../edit-patients/edit-patients';
import { Content } from 'ionic-angular';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{
  items:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  userProfile: any;
  server: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {


  }

  ionViewDidLoad() {

    console.log('Your name is');

  }
  ngOnInit(){
    this.content.resize();
    this.server = Enums.APIURL.URL1 +  '/';
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));

    if(!this.userProfile) {
      //this.userProfile = this.navParams.get('userProfile') ;
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      let data = {
        nom: JSON.parse(window.localStorage.getItem('username')),
        password: JSON.parse(window.localStorage.getItem('password')),

      };
      console.log(data);
      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + 'show_users.php',data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            this.items=res.server_response;
            localStorage.setItem('patients', JSON.stringify(this.items));
            console.log(this.items);

          });

      });
    }

  }

  editPatients(item){

    this.navCtrl.push(EditPatientsPage, item)

  }
}
