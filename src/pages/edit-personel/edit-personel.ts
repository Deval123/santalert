import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { ProfilePersonelPage } from '../profile-personel/profile-personel';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-edit-personel',
  templateUrl: 'edit-personel.html',
})
export class EditPersonelPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  id:any;
  nom:any;
  matricule:any;
  telephone:any;
  email:any;
  type_personnel:any;

  oldid:any;
  oldnom:any;
  oldmatricule:any;
  oldtelephone:any;
  oldemail:any;
  oldtype_personnel:any;

  @ViewChild("newnom") newnom;
  @ViewChild("newmatricule") newmatricule;
  @ViewChild("newtelephone") newtelephone;
  @ViewChild("newemail") newemail;
  @ViewChild("newtype_personnel") newtype_personnel;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPersonelPage');
  }

  ngOnInit(){
    this.content.resize();
//patients_id, datedebut, datefin, nature, lieu, observation, tiers
    this.id = this.navParams.get('id') ;
    this.nom = this.navParams.get('nom') ;
    this.matricule = this.navParams.get('matricule') ;
    this.telephone = this.navParams.get('telephone') ;
    this.email = this.navParams.get('email') ;
    this.type_personnel = this.navParams.get('type_personnel') ;
    //this.oldCountryValue = this.navParams.get(‘country’) ;

    this.oldid = this.navParams.get('id') ;
    this.oldnom = this.navParams.get('nom') ;
    this.oldmatricule = this.navParams.get('matricule') ;
    this.oldtelephone = this.navParams.get('telephone') ;
    this.oldemail = this.navParams.get('email') ;
    this.oldtype_personnel = this.navParams.get('type_personnel') ;
  }

  Edit(){
    //// check to confirm the username, email, telephone and password fields are filled


    if(this.newnom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Nnom field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.newmatricule.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"matriculefield is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newtelephone.value=="" ){

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
//patients_id, datedebut, datefin, nature, lieu, observation, tiers
      let data = {
        id: this.oldid,
        nom: this.oldnom,
        matricule: this.oldmatricule,
        telephone: this.oldtelephone,
        email: this.oldemail,
        type_personnel: this.oldtype_personnel,

        newnom: this.newnom.value,
        newmatricule: this.newmatricule.value,
        newtelephone: this.newtelephone.value,
        newemail: this.newemail.value,
        newtype_personnel: this.newtype_personnel.value,

      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editPersonel.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            if(res=="data update successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });

              alert.present();
              this.navCtrl.push(ProfilePersonelPage);

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
