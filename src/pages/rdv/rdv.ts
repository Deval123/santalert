import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, AlertController, LoadingController, Content} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import {Storage} from "@ionic/storage";
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-rdv',
  templateUrl: 'rdv.html',
})
export class RdvPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  @ViewChild("observation") observation;
  @ViewChild("mobile") mobile;
  @ViewChild("datedebut") datedebut;
  @ViewChild("datefin") datefin;
  @ViewChild("nature") nature;
  @ViewChild("lieu") lieu;
  @ViewChild("tiers") tiers;
  @ViewChild("patient") patient;
  @ViewChild("nommedecin") nommedecin;
  data:string;
  items: any;
  show: any;
  addrdv: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RdvPage');
  }

  ngOnInit(){
      this.content.resize();
      this.show = "show";
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        personel: JSON.parse(localStorage.getItem('personel')),
      };
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      console.log(data);
      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + 'showRdv.php',data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {

            loader.dismiss();

            let alert = this.alertCtrl.create({
              title:"CONGRATS",
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present();

            this.items=res.server_response;
            localStorage.setItem('rdv', JSON.stringify(this.items));
            console.log(this.items);

          });

      });

  }

  editRdv(){}

  showOneRdv(){}

  deleteRdv(){}

  addRdv(){
        this.addrdv = "addrdv";
        this.show = "";
    if(this.datedebut.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date début field is empty",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.datefin.value==""){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date de fin field is empty",
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
        datedebut: this.datedebut.value,
        datefin: this.datefin.value,
        nature: this.nature.value,
        lieu: this.lieu.value,
        observation: this.observation.value,
        nommedecin: this.nommedecin.value,
        patient: this.patient.value,
        mobile: this.mobile.value,
        personel: JSON.parse(localStorage.getItem('personel')),

      };

      console.log(JSON.parse(localStorage.getItem('personel')));
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data) "http://localhost/devdb/insertAgendaPatients.php"
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertRdv.php",data, options)
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
              //window.location.reload()
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
