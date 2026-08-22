import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, AlertController, MenuController, App, NavParams, LoadingController, Content, Events} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { AjoutInfoPage } from '../ajout-info/ajout-info';
import { PostProvider } from '../../providers/post/post';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
import {ProfilePersonelPage} from "../profile-personel/profile-personel";
import {HomePersonnelPage} from "../home-personnel/home-personnel";


@IonicPage()
@Component({
  selector: 'page-rechercher-patients',
  templateUrl: 'rechercher-patients.html',
})
export class RechercherPatientsPage {
  items:any;
  server: string;
  _items1: any;
  typePerso: any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, private menu: MenuController, private nav: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, public events: Events, private storage: Storage, private postPvdr: PostProvider,
              private appCtrl: App,) {
                this.server = postPvdr.server;
               }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechercherPatientsPage');

  }

  ngOnInit(){
    window.localStorage.removeItem('patientsRecherche');
    this.content.resize();
    //let rech = this.navParams.get('rech') ;
   //this.server = Enums.APIURL.URL1 +  '/';
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      //nom: this.navParams.get('username'),
      nom: JSON.parse(localStorage.getItem('rech'))

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'rechecherPatients.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          if(this.items.length  > 0){
            console.log(this.items.length );
           /* let alert = this.alertCtrl.create({
              title:"CONGRATS",
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present();
*/
            this.items=res.server_response;
            console.log(JSON.stringify(this.items));


          } else
          {
            console.log(JSON.stringify(this.items));
            let alert = this.alertCtrl.create({
              title:"Pas de patient avec ce nom",
              subTitle:"éffectuez de nouveau",
              buttons: ['OK']
            });

            alert.present();
            //this.navCtrl.setRoot(RechercherPatientsPage);
            //this.navCtrl.push(RechercherPatientsPage);
            this.items="";
            //this.appCtrl.getRootNav().setRoot(RechercherPatientsPage);

          }





        });

    });
  }



  select(item){
    window.localStorage.setItem('patients', JSON.stringify(item));
    this.nav.setRoot(AjoutInfoPage, item);
    //this.navCtrl.push(RechercherPatientsPage);
  }

  add_examen(item){}
  show(item){}

}
