import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutDepartementPage } from '../ajout-departement/ajout-departement';
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
/**
 * Generated class for the DepartementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-departement',
  templateUrl: 'departement.html',
})
export class DepartementPage {

  data:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DepartementPage');
  }

  ngOnInit(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      patients: JSON.parse(localStorage.getItem('patients')),
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showDepartement.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('Departement', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteDepartement(id){
    id=id;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      id: id,
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + "deleteDepartement.php",data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          let alert = this.alertCtrl.create({
            title:"CONGRATS",
            subTitle:(res),
            buttons: ['OK']
          });
          alert.present();//window.location.reload()
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          console.log(this.items);

        });

    });
  }


  addDepartement(){
    let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(AjoutDepartementPage);
  }
}
