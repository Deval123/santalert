import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, LoadingController, NavParams, AlertController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import { EditMaladieChroniquePage } from '../edit-maladie-chronique/edit-maladie-chronique';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-maladie-chronique',
  templateUrl: 'maladie-chronique.html',
})
export class MaladieChroniquePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("medecin_traitant") medecin_traitant;
  @ViewChild("restriction") restriction;
  @ViewChild("recommandation") recommandation;
  @ViewChild("nom") nom;
  @ViewChild("commentaire") commentaire;
  etablissements: any;
  ajout: any;
  edit: any;
  items: any;
  item: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,
              public navParams: NavParams, public loading: LoadingController) {
  }


  ionViewDidLoad() {///
    console.log('ionViewDidLoad MaladieChroniquePage');
  }

  ngOnInit(){
    this.content.resize();
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showMaladieChronique.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('MaladieChronique', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }



  editMaladieChronique(item){
    this.navCtrl.push(EditMaladieChroniquePage, item);
  }


  showOneMaladieChronique(item){
    this.item = item;
    this.edit = "";
    this.ajout = "";
    this.items = "";
  }


  deleteMaladieChronique(item) {

    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you really want to delete this row?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }

      },

        {
          text: 'Delete',
          handler: () => {
            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let loader = this.loading.create({
              content: 'Processing please wait…',
            });
            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 +  '/' + 'deleteMaladieChronique.php', item, options)
                .pipe(map((res: any) => res.json()))
                .subscribe(res => {
                  loader.dismiss();
                  if(res=="data deleted successfully"){

                    let alert = this.alertCtrl.create({
                      title:"CONGRATS",
                      subTitle:(res),
                      buttons: ['OK']

                    });
                    alert.present();//window.location.reload()
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);

                  }else {
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

      ]

    });

    alert.present();

  }


  addautomed(){
    this.ajout = "ajouter une maladie";
    this.items = "";

  }


  Ajouter(){

    if(this.nom.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"name field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else
    if(this.medecin_traitant.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Médecin traitant field is empty",
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
        medecin_traitant: this.medecin_traitant.value,
        restriction: this.restriction.value,
        recommandation: this.recommandation.value,
        commentaire: this.commentaire.value,
        patients: JSON.parse(localStorage.getItem('patients')),

      };

      console.log(JSON.parse(localStorage.getItem('patients')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertMaladieChronique.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();
            if(res=="Successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();//window.location.reload()
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
