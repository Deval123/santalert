import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  App,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import {PostProvider} from "../../providers/post/post";
import {Camera} from "@ionic-native/camera";

/**
 * Generated class for the VaccinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaccin',
  templateUrl: 'vaccin.html',
})
export class VaccinPage {
  Vaccin1: any;
  Vaccin2: any;
  Vaccin3: any;
  Vaccin5: any;
  Vaccin6: any;
  Vaccin8: any;
  Vaccin9: any;
  Vaccin10: any;
  private lieu: any;
  private vaccins: any;
  Vaccin11: any;
  Vaccin12: any;
  Vaccin13: any;
  Vaccin14: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController
    , private appCtrl: App, private alertCtrl: AlertController, private http: Http,
              private postPvdr: PostProvider, private camera: Camera,
              public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VaccinPage');
    //this.vaccins = [];
    //this.loaduser();
  }

  loaduser(){
    let body = {
      aksi: 'get_vaccin'
    };
    this.postPvdr.postData(body, 'aksi_visite.php').subscribe(data => {
      for(let vaccin of data.result){
        this.vaccins.push(vaccin);
      }
      console.log(this.vaccins);
      for(let vaccin of this.vaccins){
        if(vaccin.nom == "Vaccin1"){this.Vaccin1="Vaccin1"; console.log(this.Vaccin1);} else
        if(vaccin.nom == "Vaccin2"){this.Vaccin2="Vaccin2"; console.log(this.Vaccin2);} else
        if(vaccin.nom == "Vaccin3"){this.Vaccin3="Vaccin3"; console.log(this.Vaccin3);} else
        if(vaccin.nom == "Vaccin5"){this.Vaccin5="Vaccin5"; console.log(this.Vaccin5);} else
        if(vaccin.nom == "Vaccin6"){this.Vaccin6="Vaccin6"; console.log(this.Vaccin6);} else
        if(vaccin.nom == "Vaccin8"){this.Vaccin8="Vaccin8"; console.log(this.Vaccin8);} else
        if(vaccin.nom == "Vaccin9"){this.Vaccin9="Vaccin9"; console.log(this.Vaccin9);} else
        if(vaccin.nom == "Vaccin10"){this.Vaccin10="Vaccin10"; console.log(this.Vaccin10);} else
        if(vaccin.nom == "Vaccin11"){this.Vaccin11="Vaccin11"; console.log(this.Vaccin11);}else
        if(vaccin.nom == "Vaccin12"){this.Vaccin12="Vaccin12"; console.log(this.Vaccin12);}else
        if(vaccin.nom == "Vaccin13"){this.Vaccin13="Vaccin13"; console.log(this.Vaccin13);}else
        if(vaccin.nom == "Vaccin14"){this.Vaccin14="Vaccin14"; console.log(this.Vaccin14);}



      }
    });
  }

  ngOnInit(){
    this.vaccins = [];
    this.loaduser();

  }

  ajout() {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    let alert = this.alertCtrl.create({
      title: 'Ajout de vaccin',
      inputs: [
        {
          name: 'nom_hopital',
          placeholder: 'Lieu'
        },
        {
          name: 'date_realisation',
          placeholder: 'Date de réalisation',
          type: 'date',
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
          text: 'Ajouter',
          handler: data => {

            let data1 = {
              patients_id: JSON.parse(localStorage.getItem('patients'))[0].id,
              nom: this.lieu,
              date_realisation: data.date_realisation,
              nom_hopital: data.nom_hopital
            };
            //data.username
            //let rech = data.username;
            //localStorage.setItem('rech', JSON.stringify(data.username));
            //this.navCtrl.push(RechercherPatientsPage)
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 + '/' + "insertVaccin.php", data1, options)
                .pipe(map((res: any) => res.json()))
                .subscribe(res => {
                  loader.dismiss();
                  if (res == "Successfull") {
                    let alert = this.alertCtrl.create({
                      title: "CONGRATS",
                      subTitle: (res),
                      buttons: ['OK']
                    });

                    alert.present();
                    //this.navCtrl.setRoot(AdminPage);

                  } else {
                    let alert = this.alertCtrl.create({
                      title: "ERROR",
                      subTitle: (res),
                      buttons: ['OK']
                    });

                    alert.present();
                  }
                });
            });


          }
        }
      ]
    });
    alert.present();
  }

  vaccin1() {
    this.lieu="vaccin BCG";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin2() {
    this.lieu="diphtérie";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin3() {
    this.lieu="tétanos";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }



  vaccin5() {
    this.lieu="Poliomyélite (DTP)";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin6() {
    this.lieu="Coqueluche";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }



  vaccin8() {
    this.lieu="HIB (haemophilus influenzae b)";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin9() {
    this.lieu="Hépatite B";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin10() {
    this.lieu="Pneumocoque";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);

  }

  vaccin11() {
    this.lieu="Méningocoque C";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);
  }

  vaccin12() {
    this.lieu="Rougeole";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);
  }

  vaccin13() {
    this.lieu="Oreillons";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);
  }

  vaccin14() {
    this.lieu="HPV";
    this.ajout();
    this.appCtrl.getRootNav().setRoot(VaccinPage);
  }
}
