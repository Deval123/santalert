import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, Events, NavController, NavParams, AlertController, LoadingController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { mergeMap, map } from 'rxjs/operators';


@Injectable()
export class DataProvider {

   items:any;
  _items:any;
  _items1:any;
  _items2:any;
  _items3:any;
  modifiedData: any;
  constructor(public http: Http, public loading: LoadingController, public alertCtrl: AlertController) {


    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      nom: JSON.parse(localStorage.getItem('username')),
      password: JSON.parse(localStorage.getItem('password')),

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showAllPharmacie.php',data, options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {
          loader.dismiss();

          this._items=res.server_response;
          this._items1=res.server_response1;
          this._items2=res.server_response2;
          this._items3=res.server_response3;
          localStorage.setItem('pharmacie', JSON.stringify(this._items));
          localStorage.setItem('regions', JSON.stringify(this._items1));
          localStorage.setItem('department', JSON.stringify(this._items2));
          localStorage.setItem('city', JSON.stringify(this._items3));
          console.log(this._items);
          console.log(this._items1);
          console.log(this._items2);
          console.log(this._items3);

        });

    });



  }

  filterItems(searchTerm){
    this.items= JSON.parse(localStorage.getItem('city'));
    console.log(this.items);
    if (!this.items)
        return this.items;
      return this.items.filter((item) => {
          return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });

  }


/*
  transform1(items: any[], filterQuery: any): any[] {
    if (!filterQuery) return items;
    return items.filter(item => item.whateverProperty.toLowerCase().includes(filterQuery.toLowerCase()));
  }


  transform(data: any[], searchTerm: string): any[] {
    if(!data) return [];
    searchTerm = searchTerm.toUpperCase();
    return data.filter(item => {
      return item.toUpperCase().indexOf(searchTerm) !== -1
    });
  }
*/

}
