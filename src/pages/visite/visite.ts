import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  App,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {RechercherPatientsPage} from "../rechercher-patients/rechercher-patients";
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import {PostProvider} from "../../providers/post/post";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DashboardPage} from "../dashboard/dashboard";

/**
 * Generated class for the VisitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visite',
  templateUrl: 'visite.html',
})
export class VisitePage {
  Visite1: any="";
  Visite2: any;
  Visite3: any;
  Visite4: any;
  Visite5: any;
  Visite7: any;
  Visite8: any;
  Visite9: any;
  Visite10: any;
  user_name= "";
  phone_number = "";
  gender = "";
  cameraData: string;
  base64Image: string;
  button: String ="";
  Visite6: any;
  nom_hopital: any;
  private date_realisation: any;
  visites: any = [];
  server: string;
  lieu: string="";
  constructor(public navCtrl: NavController, public navParams: NavParams , public loading: LoadingController
              , private appCtrl: App,  private alertCtrl: AlertController, private http: Http,
              private postPvdr: PostProvider, private camera: Camera,
              public actionSheetController: ActionSheetController) {
    this.server = postPvdr.server;
  }



  ionViewDidLoad() {
    //this.visites = [];
    //this.loaduser();
  }


  loaduser(){
    let body = {
      aksi: 'get_visite'
    };
    this.postPvdr.postData(body, 'aksi_visite.php').subscribe(data => {
      for(let visite of data.result){
        this.visites.push(visite);
      }
      console.log(this.visites);
      for(let visite of this.visites){
        if(visite.nom == "Visite1"){this.Visite1="Visite1"; console.log(this.visite1);} else
        if(visite.nom == "Visite2"){this.Visite2="Visite2"; console.log(this.visite2);} else
        if(visite.nom == "Visite3"){this.Visite3="Visite2"; console.log(this.visite3);} else
        if(visite.nom == "Visite4"){this.Visite4="Visite3"; console.log(this.visite4);} else
        if(visite.nom == "Visite5"){this.Visite5="Visite5"; console.log(this.visite5);} else
        if(visite.nom == "Visite6"){this.Visite6="Visite6"; console.log(this.visite6);} else
        if(visite.nom == "Visite7"){this.Visite7="Visite7"; console.log(this.visite7);} else
        if(visite.nom == "Visite8"){this.Visite8="Visite8"; console.log(this.visite8);} else
        if(visite.nom == "Visite9"){this.Visite9="Visite9"; console.log(this.visite9);} else
        if(visite.nom == "Visite10"){this.Visite10="Visite10"; console.log(this.visite10);}

      }
    });
  }

  shVisite(s:any []){
    for(let visite of s){
      if(visite.nom == "Visite1"){this.Visite1=visite.nom; console.log(this.visite1);} else
      if(visite.nom == "Visite2"){this.Visite2=visite.nom; console.log(this.visite2);} else
      if(visite.nom == "Visite3"){this.Visite3=visite.nom; console.log(this.visite3);} else
      if(visite.nom == "Visite4"){this.Visite4=visite.nom; console.log(this.visite4);} else
      if(visite.nom == "Visite5"){this.Visite5=visite.nom; console.log(this.visite5);} else
      if(visite.nom == "Visite6"){this.Visite6=visite.nom; console.log(this.visite6);} else
      if(visite.nom == "Visite7"){this.Visite7=visite.nom; console.log(this.visite7);} else
      if(visite.nom == "Visite8"){this.Visite8=visite.nom; console.log(this.visite8);} else
      if(visite.nom == "Visite9"){this.Visite9=visite.nom; console.log(this.visite9);} else
      if(visite.nom == "Visite10"){this.Visite10=visite.nom; console.log(this.visite10);}

        }
  }

  ngOnInit(){
    this.visites = [];
    this.loaduser();

  }
  visite2() {
    this.button ='button';
    console.log("visite 2");
    this.lieu ="Visite2";
  }

  visite10() {
    this.button ='button';
    console.log("visite 10");
    this.lieu ="Visite10";
  }

  visite9() {
    this.button ='button';
    this.lieu ="Visite9";
    console.log("visite 9");
  }

  visite8() {
    this.button ='button';
    this.lieu ="Visite8";
    console.log("visite 8");
  }

  visite7() {
    this.button ='button';
    this.lieu ="Visite7";
    console.log("visite 7");
  }

  visite5() {
    this.button ='button';
    console.log("visite 5");
    this.lieu ="Visite5";
  }

  visite6() {
    this.button ='button';
    this.lieu ="Visite6";
    console.log("visite 6");
  }

  visite4() {
    this.button ='button';
    console.log("visite 4");
    this.lieu ="Visite4";
  }

  visite3() {
    this.button ='button';
    console.log("visite 3");
    this.lieu ="Visite3";
  }

  visite1() {
/////patients_id	nom	date_realisation	nom_hopital
    this.button ='button';
    console.log("visite 1");
    this.lieu ="Visite1";
  }

  ajout() {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let alert = this.alertCtrl.create({
      title: 'Ajout de visite',
      inputs: [
        {
          name: 'nom_hopital',
          placeholder: 'Lieu'
        },
        {
          name: 'date_realisation',
          placeholder: 'Date de réalisation',
          type: 'date',
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {

            let data1 = {
              patients_id: JSON.parse(localStorage.getItem('patients'))[0].id,
              nom:'visite1',
              date_realisation: data.date_realisation,
              nom_hopital: data.nom_hopital
            };
            //data.username
            //let rech = data.username;
            //localStorage.setItem('rech', JSON.stringify(data.username));
            //this.navCtrl.push(RechercherPatientsPage)
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertVisite.php",data1, options)
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
                    //this.navCtrl.setRoot(AdminPage);

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
      ]
    });
    alert.present();
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetController.create({
      title: 'Choice Media',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        }, {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.openGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  add(){
    let body = {
      patients_id: JSON.parse(localStorage.getItem('patients'))[0].id,
      nom: this.lieu,
      date_realisation: this.date_realisation,
      nom_hopital: this.nom_hopital,
      images: this.cameraData,
      aksi: 'add_visite'
    };
    console.log(body);
    this.postPvdr.postData(body, 'aksi_visite.php').subscribe(data => {
      this.appCtrl.getRootNav().setRoot(VisitePage);
      console.log(data);
    });
  }
}
