import { Component, ViewChild } from '@angular/core';
import {NavController, AlertController, Events, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { ProfilePage } from '../profile/profile';
import { HomePersonnelPage } from '../home-personnel/home-personnel';
import { AdminPage } from '../admin/admin';
import { AddAdminPage } from '../add-admin/add-admin';
import { AddPersonelPage } from '../add-personel/add-personel';
import * as Enums from '../../enums/enums';
import { Storage } from '@ionic/storage';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  comparePays(a:{id: number, pays: string, capitale: string}
    , b:{id: number, pays: string, capitale: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
  }

  @ViewChild("pays") pays;
  @ViewChild("capitale") capitale;
  @ViewChild("country") country;

  @ViewChild("email") email;
  @ViewChild("email1") email1;
  @ViewChild("username") username;
  @ViewChild("mobile") mobile;
  @ViewChild("mobile1") mobile1;
  @ViewChild("password") password;
  @ViewChild("firstname") firstname;
  @ViewChild("nom") nom;
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

  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController, private storage: Storage) {

  }

  compare(a:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}
    , b:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
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
        //.map(res => res.json())
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
    //// check to confirm the username, email, telephone and password fields are filled

    if(this.username.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.email.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.mobile.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Mobile number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.firstname.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"firstname name field is empty",
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
        mobile1: this.mobile1.value,
        email: this.email.value,
        email1: this.email1.value,
        country: this.country.value,
        firstname: this.firstname.value
      };
      console.log(data);
      localStorage.setItem('patients', JSON.stringify(data));

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "register.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="Registration successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              this.events.publish('user:loggedin');
              //this.storage.set('login', 'loggedIn');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('userPatient', "Patient");
              this.navCtrl.setRoot(ProfilePage);

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

  Registerpersonnel(){

    if(this.nom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.emailpers.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Email field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.telephone.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"telephone number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.code.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"code etablissement field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.type_personnel.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"type personnel name field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.passwordpers.value==""){

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
        nom: this.nom.value,
        passwordpers: this.passwordpers.value,
        telephone: this.telephone.value,
        emailpers: this.emailpers.value,
        type_personnel: this.type_personnel.value,
        matricule: this.matricule.value,
        code: this.code.value
      };

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      console.log(data);
      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertPersonnel.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            if(res == "Registration successfull"){
              console.log(res);
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              this.events.publish('user:loggedin');
              //this.storage.set('login', 'loggedIn');
              window.localStorage.setItem('username', JSON.stringify(this.username.value));
              window.localStorage.setItem('password', JSON.stringify(this.password.value));
              window.localStorage.setItem('personaluser', "personal");
              this.navCtrl.setRoot(HomePersonnelPage);
            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot(RegisterPage);
            }
          });
      });


    }
  }

  SignIn(){

      if(this.loginAdmin.value=="" ){

        let alert = this.alertCtrl.create({

          title:"ATTENTION",
          subTitle:"login field is empty",
          buttons: ['OK']
        });

        alert.present();
      }
      else
      if(this.passwordAdmin.value==""){

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
          login: this.loginAdmin.value,
          password: this.passwordAdmin.value,
        };

        let loader = this.loading.create({
          content: 'Processing please wait...',
        });

        console.log(data);
        loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
          this.http.post(Enums.APIURL.URL1 +  '/' + "loginAdmin.php",data, options)
            .pipe(map((res: any) => res.json()))
            .subscribe(res => {
              loader.dismiss();
              if(res == "Your Login success"){
                console.log(res);
                let alert = this.alertCtrl.create({
                  title:"CONGRATS",
                  subTitle:(res),
                  buttons: ['OK']
                });
                alert.present();
                this.events.publish('user:loggedin');
                this.storage.set('login', 'loggedIn');
                this.navCtrl.setRoot(AdminPage);
              }else
              {
                let alert = this.alertCtrl.create({
                  title:"ERROR",
                  subTitle:(res),
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.setRoot(RegisterPage);
              }
            });
        });


      }

      //this.navCtrl.push(HomePersonnelPage);
    }

  SignUp(){
    this.navCtrl.setRoot(AddAdminPage);

  }

  addPersonnel(){

    if(this.code.value=="" ){
      let alert = this.alertCtrl.create({
        title:"ATTENTION",
        subTitle:"code etablissement field is empty",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let data = {
        cod: this.code.value
      };
      localStorage.setItem('code', JSON.stringify(this.code.value));

      this.navCtrl.push(AddPersonelPage, data);
    }

  }


}
