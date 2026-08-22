import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-fiche-hospitalisation',
  templateUrl: 'fiche-hospitalisation.html',
})
export class FicheHospitalisationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheHospitalisationPage');
  }

}
