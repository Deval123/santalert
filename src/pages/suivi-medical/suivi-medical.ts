import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import { ConsultationPage } from '../consultation/consultation';
import { ExamenPage } from '../examen/examen';
import { HospitalisationPage } from '../hospitalisation/hospitalisation';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-suivi-medical',
  templateUrl: 'suivi-medical.html',
})
export class SuiviMedicalPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  tab1Root = ConsultationPage;
  tab2Root = ExamenPage;
  tab3Root = HospitalisationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuiviMedicalPage');
  }
  ngOnInit() {
    this.content.resize();
  }

}
