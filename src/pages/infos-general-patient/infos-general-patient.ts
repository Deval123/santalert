import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-infos-general-patient',
  templateUrl: 'infos-general-patient.html',
})
export class InfosGeneralPatientPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  items:any =[];
  server: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosGeneralPatientPage');
  }

  ngOnInit(){
    this.content.resize();
    this.server = Enums.APIURL.URL1 +  '/';
    this.items= Array.of(JSON.parse(window.localStorage.getItem('patients')));
    console.log(this.items);
  }


}
