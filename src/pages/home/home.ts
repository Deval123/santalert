import { HttpClient } from '@angular/common/http';
import { Component, ViewChild  } from '@angular/core';
import {IonicPage, NavController, AlertController, Events, Platform, NavParams, Content} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { AjoutDepartementPage } from '../ajout-departement/ajout-departement';
import { ProfilePersonelPage } from '../profile-personel/profile-personel';
import * as Enums from '../../enums/enums';

import { FacebookServiceProvider } from '../../providers/facebook-service/facebook-service';
import { GooglePlus } from '@ionic-native/google-plus';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GooglePlus]
})
export class HomePage {
  userProfile: any;

  //google
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;

  @ViewChild("username") username;
  @ViewChild("password") password;
  data:string;
  items:any;
  slidesPerView : number = 1;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events,
              private storage: Storage, public facebook: FacebookServiceProvider,
              private googlePlus: GooglePlus, public platform : Platform, public navParams: NavParams) {}


  ionViewDidLoad(){
    console.log('Screen Width is: ',this.platform.width());

    // On a desktop, and is wider than 1200px
    if(this.platform.width() > 1200) {
      this.slidesPerView = 5;
    }

    // On a desktop, and is wider than 768px
    else if(this.platform.width() > 768) {
      this.slidesPerView = 4;
    }

    // On a desktop, and is wider than 400px
    else if(this.platform.width() > 400) {
      this.slidesPerView = 2;
    }

    // On a desktop, and is wider than 319px
    else if(this.platform.width() > 319) {
      this.slidesPerView = 1;
    }
  }

  ngOnInit() {
    this.content.resize();
  }
  login() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }





  fbLogin() {
    this.facebook.login().subscribe((connected)=>{
      if(connected === true){
        this.facebook.getProfile().subscribe((profile)=>{
          this.userProfile = profile;
        }, (error)=>{console.log(error);});
      }
    }, (error)=>{console.log(error);});
  }

  face(){
    //this.navCtrl.push(AjoutEtsPage);
    this.navCtrl.push(AjoutDepartementPage);

  }


  signUp(){
    this.navCtrl.push(RegisterPage);
  }

  signIn(){

    //// check to confirm the username and password fields are filled

    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else

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
        password: this.password.value
      };

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {

        this.http.post(Enums.APIURL.URL1 +  '/' + "login.php",data,options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="Your Login success"){

              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present(); //  this.navCtrl.push(SuiviPersoPage, data);
              this.events.publish('user:loggedIn');
              //this.storage.set('login', 'loggedIn');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('userPatient', "patient");
              this.navCtrl.setRoot(ProfilePage);
            }else
            { this.storage.get('login');
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res), //"Your Login Username or Password is invalid",
                buttons: ['OK']
              });
              this.navCtrl.setRoot(HomePage);

              alert.present();
            }
          });
      });
    }

  }

  forgotPass(){}

  signInPersonel(){
    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else

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
        nom: this.username.value,
        password: this.password.value
      };


      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {

        this.http.post(Enums.APIURL.URL1 +  '/' + "loginPersonel.php",data,options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            if(res=="Your Login success"){

              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.events.publish('personaluser:loggedIn');
              //this.storage.set('login', 'loggedIn');
              window.localStorage.setItem('typePerso', 'medecin');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('personaluser', "personal");

              this.navCtrl.push(ProfilePersonelPage);
            }else
            if(res=="Pharmacien"){

              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.events.publish('Pharmacien:loggedIn');
              window.localStorage.setItem('typePerso', 'Pharmacien');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('personaluser', "Pharmacien");
              this.navCtrl.push(ProfilePersonelPage);
            }else
            if(res=="laborentin"){

              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.events.publish('laborentin:loggedIn');
              //this.storage.set('login', 'loggedIn');
              window.localStorage.setItem('typePerso', 'laborentin');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('personaluser', "laborentin");

              this.navCtrl.push(ProfilePersonelPage);
            } else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res), //"Your Login Username or Password is invalid",
                buttons: ['OK']
              });
              this.navCtrl.setRoot(HomePage);

              alert.present();
            }
          });
      });
    }

  }

}
