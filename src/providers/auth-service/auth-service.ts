//import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

let apiUrl = "http://localhost/PHP-Slim-Restful/api/";
//let apiUrl = '/api';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      //let headers = new Headers();

      let type1 = "application/json; charset=UTF-8";
      let headers = new Headers({'Content-type' : type1});
      let options = new RequestOptions({headers: headers});

      this.http.post(apiUrl + type, JSON.stringify(credentials), options).
        subscribe(res =>{
          resolve(res.json());
        }, (err) =>{
          reject(err);
        });

    });

  }
}
