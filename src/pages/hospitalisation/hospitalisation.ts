import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  AlertController,
  NavParams,
  App,
  LoadingController,
  Content
} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { PostProvider } from '../../providers/post/post';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-hospitalisation',
  templateUrl: 'hospitalisation.html',
})
export class HospitalisationPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  addOne: any;
  show: any;
  server: string;
  hospitalisation: any;
  lieuHospitalisation= "";
  datecreate = "";
  cout= "";
  nature = "";
  showOne= "";
  item: any;
  cameraData: string;
  base64Image: string;
  public selectcity: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
    public loading: LoadingController, private postPvdr: PostProvider, private storage: Storage, private appCtrl: App, private camera: Camera,
    public actionSheetController: ActionSheetController) {
      this.server = Enums.APIURL.URL1 +  '/';
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalisationPage');
  }
  ngOnInit(){
    this.content.resize();
    this.show = "show";
    this.addOne = "";
    this.showOne = "";
    //this.showOneConsul= "";
    //this.etablissements = JSON.parse(localStorage.getItem('etablissement'));

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      patients: JSON.parse(localStorage.getItem('patients')),
      //password: JSON.parse(localStorage.getItem('password')),
    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showHospitalisationPatient.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
         /*  let alert = this.alertCtrl.create({
            title:"CONGRATS",
            subTitle:(res),
            buttons: ['OK']
          }); alert.present(); */
          this.hospitalisation=res.server_response;
          localStorage.setItem('hospitalisation', JSON.stringify(this.hospitalisation));
          console.log(this.hospitalisation);

        });

    });
  }

  formadd(){
    this.addOne = "addOne";
    this.show = "";
    this.showOne = "";
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
//$image $lieuExamen $datecreate
    this.selectcity = JSON.parse(localStorage.getItem('patients'));
      let body = {
        patients_id: this.selectcity[0].id,
        lieuHospitalisation : this.lieuHospitalisation,
        image: this.cameraData,
        nature: this.nature,
        cout: this.cout,
        aksi: 'add_hospitalisation'
      }; console.log(body);
        this.postPvdr.postData(body, 'insertHospitalisation.php').subscribe(data => {
          this.appCtrl.getRootNav().setRoot(HospitalisationPage);
      });

  }

  showOneExamen(item){
    this.showOne = "showOne";
    this.addOne = "";
    this.show = "";
    this.item = item;
    console.log(this.item);
  }
}
