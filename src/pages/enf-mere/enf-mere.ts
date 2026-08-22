import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ParametrePersonnelPage} from "../parametre-personnel/parametre-personnel";
import {MEPPage} from "../m-e-p/m-e-p";

/**
 * Generated class for the EnfMerePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enf-mere',
  templateUrl: 'enf-mere.html',
})
export class EnfMerePage {
  periode:any;
  periode1:any;
  periode2:any;
  periode3:any;
  periode4:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnfMerePage');
  }

  ngOnInit(){
    this.periode="periode";
    this.periode1="";
    this.periode2="";
    this.periode3="";
    this.periode4="";

  }

  Accouchement() {
    this.periode="";
    this.periode1="periode1";
    this.periode2="";
    this.periode3="";
    this.periode4="";
  }

  suiviGrossesse() {
    this.navCtrl.push(MEPPage);
  }


  goTo1(){
    this.periode1="";
    this.periode2="periode2";
    this.periode3="";
    this.periode4="";

  }

  goTo2(){
    this.periode1="";
    this.periode2="";
    this.periode3="periode3";
    this.periode4="";

  }

  goTo3(){
    this.periode1="";
    this.periode2="";
    this.periode3="";
    this.periode4="periode4";

  }

  SaveTo2() {

  }

  Save1() {

  }

  SaveTo3() {

  }

  SaveTo4() {

  }

  Save() {

  }

  goToparam() {
    this.navCtrl.push(MEPPage);

  }


}
