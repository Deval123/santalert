import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { AdminPage } from '../admin/admin';
import * as Enums from '../../enums/enums';


/**
 * Generated class for the AddAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-admin',
  templateUrl: 'add-admin.html',
})
export class AddAdminPage {

  items:any;
  @ViewChild("login") login;
  @ViewChild("password") password;
  @ViewChild("description") description;
  @ViewChild("telephone") telephone;
  @ViewChild("email") email;
  @ViewChild("gender") gender;


//login, password, description, telephone, email, gender
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdminPage');
  }

  Ajouter(){
    //// check to confirm the username, email, telephone and password fields are filled

    if(this.login.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"login field is empty",
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
    if(this.password.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Mobile number field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.telephone.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"telephone field is empty",
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
        login: this.login.value,
        password: this.password.value,
        description: this.description.value,
        email: this.email.value,
        telephone: this.telephone.value,
        gender: this.gender.value
      };


//login, password, description, telephone, email, gender

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
     console.log(data);
      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "registerAdmin.php",data, options)
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
              this.navCtrl.setRoot(AdminPage);

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
