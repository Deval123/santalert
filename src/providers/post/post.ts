import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import  'rxjs/add/operator/map';
import * as Enums from '../../enums/enums';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {

  server: string = Enums.APIURL.URL1 +  '/';
  //server: string = 'http://192.168.137.1/devdb/';
  constructor(public http: Http) {
    console.log('Hello PostProvider Provider');
  }

  postData(body, file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({'Content-type' : type});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.server + file, JSON.stringify(body), options)
    .map(res => res.json());

  }

}
