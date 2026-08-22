import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Http }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { AjoutEtsPage } from '../ajout-ets/ajout-ets';
import { AjoutDepartementPage } from '../ajout-departement/ajout-departement';
import { LogoutPage } from '../logout/logout';
import { ShowAdminPage } from '../show-admin/show-admin';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  items:any;
  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  etablissement(){
    this.navCtrl.push(AjoutEtsPage);

  }

  addDepartement(){
    this.navCtrl.push(AjoutDepartementPage);

  }


  visualiser(){
    this.navCtrl.push(ShowAdminPage);
  }

  logout(){
    this.navCtrl.push(LogoutPage);

  }

}
