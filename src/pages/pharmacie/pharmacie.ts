import { Component, ViewChild } from '@angular/core';
import {IonicPage, Events, NavController, NavParams, AlertController, LoadingController, App, Content} from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { DataProvider } from '../../providers/data/data';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';

import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";

@IonicPage()
@Component({
  selector: 'page-pharmacie',
  templateUrl: 'pharmacie.html',
})

export class PharmaciePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  compare(a:{id: number, country_id: string, name: string, chef_lieu: string}
    , b:{id: number, country_id: string, name: string, chef_lieu: string}) : boolean{
    if(a.id === b.id){return true;}
    return false;
  }




  @ViewChild("name") name;
  @ViewChild("chef_lieu") chef_lieu;

  @ViewChild("description") description;
  @ViewChild("code") code;

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;
  All: any;
  AllPhamarcie: any;
  pharmacies: any;
  filtercities = [];
  filterpharmacie = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appCtrl: App, private alertCtrl: AlertController, private http: Http,
     public loading: LoadingController, public events: Events, public dataService: DataProvider) {
      this.searchControl = new FormControl();

    }

  ionViewDidLoad() {
    this.pharmacies= '';

    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

        this.searching = false;
        this.setFilteredItems();

    });


}


  showAll(id){
    this.All = 'All';
    this.items = '';
    this.pharmacies = '';
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
      city_id: id,
    };
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showAllPhamarcie.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.AllPhamarcie=res.server_response;
          localStorage.setItem('AllPhamarcie', JSON.stringify(this.AllPhamarcie));
          console.log(this.All);

        });

    });
  }

    onSearchInput(){
        this.searching = true;
    }

    resetData(){
      this.All = '';
      this.setFilteredItems();
         // this.appCtrl.getRootNav().setRoot(PharmaciePage);
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    setFilteredItems() {
      this.All = '';
      this.items = this.dataService.filterItems(this.searchTerm);
      console.log(this.items);

    if(this.filtercities){
      this.filtercities = this.filterItemscity(this.searchTerm);
      console.log(this.filtercities);
    }

    }

      filterData(id){
        this.All = '';
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
        this.items ='';
        this.pharmacies= JSON.parse(localStorage.getItem('pharmacie'));
        for(let pharmacie of this.pharmacies) {
          if(pharmacie.city_id == id){
            this.filterpharmacie.push(pharmacie);
          }
       }
       console.log(JSON.stringify(this.filterpharmacie));
      }

      filterItemscity(searchTerm){
        this.All = '';
        if (!this.filtercities)
            return this.filtercities;
          return this.filtercities.filter((item) => {
              return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });

      }

  ngOnInit() {
    this.All = '';
    this.content.resize();
  }
}
