import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { AgendaPage } from '../agenda/agenda';
import * as Enums from '../../enums/enums';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";
import {EditAgendaPatientsPage} from "../edit-agenda-patients/edit-agenda-patients";

@IonicPage()
@Component({
  selector: 'page-show-last-agenda-patients',
  templateUrl: 'show-last-agenda-patients.html',
})
export class ShowLastAgendaPatientsPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };


  data: string;
  items: any;
  edit: any;
  show: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private http: Http, public loading: LoadingController, public events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowOneAgendaPatientsPage');
  }

  ngOnInit(){
    this.content.resize();
    this.show = "show";
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
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showLastAgendaPatients.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();
          this.items=res.server_response;
          localStorage.setItem('AgendaLastPatients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }


  GoBack(){
    this.navCtrl.push(AgendaPage);
  }

  Modifier(item){
    this.navCtrl.push(EditAgendaPatientsPage, item)
  }

}
