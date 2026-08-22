import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams, LoadingController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditPersonelPage } from '../edit-personel/edit-personel';
import { HomePersonnelPage } from '../home-personnel/home-personnel';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-profile-personel',
  templateUrl: 'profile-personel.html',
})
export class ProfilePersonelPage {
  etablissements:any;
  items:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePersonelPage');
  }

  ngOnInit(){
    this.content.resize();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      username: JSON.parse(localStorage.getItem('username')),
      password: JSON.parse(localStorage.getItem('password')),
    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showPersonel.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.personel;
          this.etablissements=res.etablissement;
          localStorage.setItem('personel', JSON.stringify(this.items));
          localStorage.setItem('etablissement', JSON.stringify(this.etablissements));
          console.log(this.items);
          console.log(this.etablissements);


        });

    });
  }


  editPersonel(item){
    this.navCtrl.push(EditPersonelPage, item)

  }

  GoTo(){
    this.navCtrl.push(HomePersonnelPage)

  }
}
