import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";



@IonicPage()
@Component({
  selector: 'page-pharmacie-labo',
  templateUrl: 'pharmacie-labo.html',
})
export class PharmacieLaboPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  userProfile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmacieLaboPage');
  }
  ngOnInit() {
    this.content.resize();
  }

}
