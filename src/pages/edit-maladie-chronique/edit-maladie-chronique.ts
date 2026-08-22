import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import { MaladieChroniquePage } from '../maladie-chronique/maladie-chronique';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-edit-maladie-chronique',
  templateUrl: 'edit-maladie-chronique.html',
})
export class EditMaladieChroniquePage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("medecin_traitant") medecin_traitant;
  @ViewChild("restriction") restriction;
  @ViewChild("recommandation") recommandation;
  @ViewChild("nom") nom;
  @ViewChild("commentaire") commentaire;
  etablissements: any;
  items: any;
  id: any;



  oldid:any;
  oldpatients_id: any;
  oldnom: any;
  oldmedecin_traitant: any;
  oldrestriction: any;
  oldrecommandation: any;
  oldcommentaire: any;

  @ViewChild("newnom") newnom;
  @ViewChild("newmedecin_traitant") newmedecin_traitant;
  @ViewChild("newrestriction") newrestriction;
  @ViewChild("newrecommandation") newrecommandation;
  @ViewChild("newcommentaire") newcommentaire;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,
              public navParams: NavParams, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMaladieChroniquePage');
  }

  ngOnInit(){
    this.content.resize();
    this.id = this.navParams.get('id') ;
    this.nom = this.navParams.get('nom') ;
    this.medecin_traitant = this.navParams.get('medecin_traitant') ;
    this.restriction = this.navParams.get('restriction') ;
    this.recommandation = this.navParams.get('recommandation') ;
    this.commentaire = this.navParams.get('commentaire') ;

    //this.oldCountryValue = this.navParams.get(‘country’) ;

    this.oldid = this.navParams.get('id') ;
    this.oldnom = this.navParams.get('nom') ;
    this.oldmedecin_traitant = this.navParams.get('medecin_traitant') ;
    this.oldrestriction = this.navParams.get('restriction') ;
    this.oldrecommandation = this.navParams.get('recommandation') ;
    this.oldcommentaire = this.navParams.get('commentaire') ;

  }

  Edit(){

    if(this.newnom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom de la maladie non définit",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.newmedecin_traitant.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"newmedecin traitant field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newrestriction.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"restriction  field is empty",
        buttons: ['OK']
      });

      alert.present();
    }  else
    if(this.newrecommandation.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"recommandation field is empty",
        buttons: ['OK']
      });

      alert.present();

    }
    else
    if(this.newcommentaire.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"commentaire field is empty",
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
        id: this.oldid,
        nom : this.oldnom,
        medecin_traitant : this.oldmedecin_traitant,
        restriction : this.oldrestriction,
        recommandation : this.oldrecommandation,
        commentaire : this.oldcommentaire,

        newnom : this.newnom.value,
        newmedecin_traitant : this.newmedecin_traitant.value,
        newrestriction : this.newrestriction.value,
        newrecommandation : this.newrecommandation.value,
        newcommentaire : this.newcommentaire.value,

      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "editMaladieChronique.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="data update successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();//window.location.reload()
              //this.navCtrl.setRoot(this.navCtrl.getActive().component);
              this.navCtrl.setRoot(MaladieChroniquePage);

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
