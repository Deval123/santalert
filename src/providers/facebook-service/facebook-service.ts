import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";
import { Observable } from 'rxjs/Observable';

//import { Observable } from 'rxjs';


/*
  Generated class for the FacebookServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookServiceProvider {
  session: any;
  constructor(public http: HttpClient, public facebook: Facebook) {
    console.log('Hello FacebookServiceProvider Provider');
  }


  login(){
    //On retourne un observable pour gérer les réponses Asynchrones
    return Observable.create(observer => {
      this.facebook.login(['email']).then((response) => {
        if (response.status === "connected") {
          this.session = response;
          observer.next(true);        //On retourne true ou false qui correspond au statut de la connexion
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, (error) => {
        console.log(error);
      });
    });
  }



  getProfile(){ // Nouvelle fonction qui retourne un Observable avec les informations de profil
    return Observable.create(observer => {
      if(this.session.status === "connected"){
        this.facebook.api("/me?fields=name,picture", ["public_profile"]).then((response)=>{
          console.log(response);
          observer.next(response);    //On retourne la réponse Facebook avec les champs name et picture
          observer.complete();
        },(error) => {
          console.log(error) });
      } else {
        observer.next(undefined);
        observer.complete();
      }
    });
  }

}
