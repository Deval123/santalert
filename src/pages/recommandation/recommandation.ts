import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Content} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-recommandation',
  templateUrl: 'recommandation.html',
})
export class RecommandationPage {

  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  items:any;
  server: string;
  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams,
     public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandationPage');
  }

  ngOnInit(){
    this.content.resize();
    this.server = Enums.APIURL.URL1 +  '/';

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      let data = {
        nom: JSON.parse(window.localStorage.getItem('username')),
        password: JSON.parse(window.localStorage.getItem('password')),

      };
      console.log(data);
      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + 'showRecommandation.php',data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            this.items=res.server_response;
            localStorage.setItem('recommandation', JSON.stringify(this.items));
            console.log(this.items);

          });

      });


  }

}
