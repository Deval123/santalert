import { Component, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { DepartementPage } from '../departement/departement';

/**
 * Generated class for the AjoutDepartementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-departement',
  templateUrl: 'ajout-departement.html',
})


export class AjoutDepartementPage {

  compare(a:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}
    , b:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
  }

  @ViewChild("nom") nom;
  @ViewChild("description") description;
  @ViewChild("code") code;

  data:string;
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutDepartementPage');
  }

  ngOnInit(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      nom: JSON.parse(localStorage.getItem('username')),
      password: JSON.parse(localStorage.getItem('password')),

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showEts.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();

          this.items=res.server_response;
          localStorage.setItem('Ets', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }



  Ajouter(){

    if(this.code.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"code établissement field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.description.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"description field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.nom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    {

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let data = {
        nom: this.nom.value,
        description: this.description.value,
        code: this.code.value,
      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data) "http://localhost/devdb/insertAgendaPatients.php"
          this.http.post(Enums.APIURL.URL1 +  '/' + "insertDepartement.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            if(res=="Successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.navCtrl.push(DepartementPage);

            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
            }
          });
      });
    }

  }

}
