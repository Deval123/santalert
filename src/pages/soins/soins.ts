import { Component, ViewChild, OnInit } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { AjoutSoinsPage } from '../ajout-soins/ajout-soins';
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { EditSoinsPage } from '../edit-soins/edit-soins';
import { ShowOneSoinsPage } from '../show-one-soins/show-one-soins';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-soins',
  templateUrl: 'soins.html',
})
export class SoinsPage implements OnInit{
//datecreate	symtome	traitement	evaluation	observation	cout_traitement	patients_id
  @ViewChild("datecreate") datecreate;
  @ViewChild("symtome") symtome;
  @ViewChild("traitement") traitement;
  @ViewChild("evaluation") evaluation;
  @ViewChild("observation") observation;
  @ViewChild("cout_traitement") cout_traitement;
  data:string;
  items:any;
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoinsPage');
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showAuto_med.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('auto_med', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }

  deleteAuto_med(item) {

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
  this.http.post(Enums.APIURL.URL1 +  '/' + 'deleteAuto_med.php', item, options)
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
  /*   let alert = this.alertCtrl.create({
      title:"Ajouter ?",
      subTitle:"confirmé l'ajout",
      buttons: ['OK']
    });
    alert.present(); */
    this.navCtrl.setRoot(AjoutSoinsPage);
  }

  editSoins(item){

    this.navCtrl.push(EditSoinsPage, item)

  }

  showOneSoins(item){

    this.navCtrl.push(ShowOneSoinsPage, item)

  }
}
