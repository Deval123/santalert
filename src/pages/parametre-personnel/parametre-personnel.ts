import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, Content} from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { NotificationPage } from '../notification/notification';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-parametre-personnel',
  templateUrl: 'parametre-personnel.html',
})
export class ParametrePersonnelPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  apropo: any;
  show: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParametrePersonnelPage');
  }

  ngOnInit(){
    this.content.resize();
    this.show="show";
  }
  logout(){
    this.events.publish('user:loggedout');
    localStorage.clear();
    this.navCtrl.setRoot(LogoutPage);
  }

  notification(){
    this.navCtrl.push(NotificationPage);

  }

  apropos(){
    this.apropo = "apropo";
    this.show="";

  }
}
