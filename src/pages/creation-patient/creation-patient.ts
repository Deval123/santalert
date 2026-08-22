import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events, Content} from 'ionic-angular';
import { AjoutInfoPage } from '../ajout-info/ajout-info';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
/**
 * Generated class for the CreationPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creation-patient',
  templateUrl: 'creation-patient.html',
})
export class CreationPatientPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("email") email;
  @ViewChild("username") username;
  @ViewChild("mobile") mobile;
  @ViewChild("mobile1") mobile1;
  @ViewChild("email1") email1;
  @ViewChild("password") password;
  @ViewChild("firstname") firstname;
  @ViewChild("nom") nom;
  @ViewChild("country") country;
  @ViewChild("matricule") matricule;
  @ViewChild("telephone") telephone;
  @ViewChild("emailpers") emailpers;
  @ViewChild("type_personnel") type_personnel;
  @ViewChild("passwordpers") passwordpers;
  @ViewChild("code") code;
  @ViewChild("passwordAdmin") passwordAdmin;
  @ViewChild("loginAdmin") loginAdmin;
  data:string;
  items:any;
  result = [];

  comparePays(a:{id: number, pays: string, capitale: string}
    , b:{id: number, pays: string, capitale: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
  }
  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreationPatientPage');
  }

  ngOnInit(){
    this.content.resize();
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showPays.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('pays', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  Register(){

    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.password.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Password field is empty",
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
        username: this.username.value,
        password: this.password.value,
        mobile: this.mobile.value,
        email: this.email.value,
        mobile1: this.mobile1.value,
        email1: this.email1.value,
        country: this.country.value,
        firstname: this.firstname.value
      };

      localStorage.setItem('patients', JSON.stringify(data));

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "register.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res.response=="Registration successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              localStorage.setItem('id', res.result);
              //this.events.publish('user:loggedin')
              this.result = res.result;
              this.navCtrl.push(AjoutInfoPage, this.result[0]);
              console.log(this.result);
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
