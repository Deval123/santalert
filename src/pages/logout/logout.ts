import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, Content, MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController,  private menu: MenuController, public navParams: NavParams, events: Events) {

    events.publish('user:loggedout');
    events.publish('personaluser:loggedout');

    window.localStorage.removeItem('username');
		window.localStorage.removeItem('password');
    window.localStorage.clear();

    //setTimeout(() => this.backToWelcome(), 1000);
    navCtrl.setRoot(HomePage);

  }

/*  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    // Use the id to enable/disable the menus
    this.menu.enable(false, 'menu1');
    this.menu.enable(true , 'menu-avatar');
  }

  ngOnInit() {
    this.content.resize();
  }
}
