import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, Content } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { ProfilePersonelPage } from '../profile-personel/profile-personel';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

/**
 * Generated class for the AddPersonelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-personel',
  templateUrl: 'add-personel.html',
})
export class AddPersonelPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("email") email;
  @ViewChild("password") password;
  @ViewChild("nom") nom;
  @ViewChild("matricule") matricule;
  @ViewChild("telephone") telephone;
  @ViewChild("type_personnel") type_personnel;
  @ViewChild("code") code;
  data:string;
  items:any;

  constructor(public navCtrl: NavController, public events: Events,public alertCtrl: AlertController,  private http: Http,
              public loading: LoadingController, public navParams: NavParams) {

  }

  compare(a:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}
    , b:{id: number, statut: string, nom: string, code: string, telephone: string, email: string, type: string, adresse: string, ville: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonelPage');
  }

  ngOnInit(){

    this.content.resize();
    let cod = this.navParams.get('cod') ;
    let code1 = JSON.parse(localStorage.getItem('code'));
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(this.navParams.get('cod'));
    console.log(code1);

    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showDepartementEts.php', code1, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
            /*console.log(res);
            let alert = this.alertCtrl.create({
              title:"CONGRATS",
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present();*/
          this.items=res.server_response;
          //localStorage.setItem('Ets', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }


  ajouter(){
    ///etablissement_id		premon		email	type_personnel

    if(this.nom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
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
        nom: this.nom.value,
        password: this.password.value,
        telephone: this.telephone.value,
        email: this.email.value,
        type_personnel: this.type_personnel.value,
        matricule: this.matricule.value,
        code: this.code.value
      };
      localStorage.setItem('nom', JSON.stringify(this.nom.value));
      localStorage.setItem('password', JSON.stringify(this.password.value));

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
              this.navCtrl.setRoot(ProfilePersonelPage);
            }else
            {
              let alert = this.alertCtrl.create({
                title:"ERROR",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              //this.navCtrl.setRoot(RegisterPage);
            }
          });
      });


    }

    //this.navCtrl.push(HomePersonnelPage);
  }

}
