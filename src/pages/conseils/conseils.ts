import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConseilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conseils',
  templateUrl: 'conseils.html',
})
export class ConseilsPage {
  ExamenPre1: any;
  ExamenPre2: any;
  ExamenPre3: any;
  ExamenPre4: any;
  ExamenPre5: any;
  ExamenPre6: any;
  ExamenPre8: any;
  ExamenPre9: any;
  ExamenPre10: any;
  ExamenPost3: any;
  ExamenPost4: any;
  ExamenPost5: any;
  ExamenPost6: any;
  ExamenPost8: any;
  ExamenPost1: any;
  ExamenPost2: any;
  ExamenPost7: any;
  ExamenPost9: any;
  ExamenPost10: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConseilsPage');
  }

}
