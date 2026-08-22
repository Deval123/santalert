import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Content, App} from 'ionic-angular';
import { CreationPatientPage } from '../creation-patient/creation-patient';
import { RechercherPatientsPage } from '../rechercher-patients/rechercher-patients';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
import {AjoutInfoPage} from "../ajout-info/ajout-info";

@IonicPage()
@Component({
  selector: 'page-gestion-patient',
  templateUrl: 'gestion-patient.html',
})
export class GestionPatientPage {
  items: string[];
  @ViewChild("nom") nom;
  etablissements: any;
  id:any;
  dev:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, private appCtrl: App, public navParams: NavParams, private alertCtrl: AlertController) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionPatientPage');
  }
  initializeItems() {
    this.items = [
      //recupere les logins des patients sous forme de tableau ici
      'patient1',
      'patient2'
    ];
  }


  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.etablissements = JSON.parse(localStorage.getItem('etablissement'));
    let patientsRecherche = JSON.parse(localStorage.getItem('patientsRecherche'));

    if(patientsRecherche)
      this.appCtrl.getRootNav().setRoot(AjoutInfoPage);
     //else
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);

      }



  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  creation(){
    this.navCtrl.push(CreationPatientPage);
  }
/*  ajout(){
    //this.navCtrl.push(AjoutInfoPage);
    this.navCtrl.push(RechercherPatientsPage);
  }*/

  ajout() {
    let alert = this.alertCtrl.create({
      title: 'Rechercher un patient',
      inputs: [
        {
          name: 'username',
          placeholder: 'Nom ou Prenom'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rechercher',
          handler: data => {//data.username
            //let rech = data.username;
            localStorage.setItem('rech', JSON.stringify(data.username));
            this.navCtrl.push(RechercherPatientsPage)
          }
        }
      ]
    });
    alert.present();
  }



}
