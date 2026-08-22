import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the MEPPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-e-p',
  templateUrl: 'm-e-p.html'
})
export class MEPPage {

  visitePRoot = 'VisitePPage'
  examenPRoot = 'ExamenPPage'
  vaccinPRoot = 'VaccinPPage'


  constructor(public navCtrl: NavController) {}

}
