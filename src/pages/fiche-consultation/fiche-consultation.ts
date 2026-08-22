import {Component, ViewChild} from '@angular/core';
import { PostProvider } from '../../providers/post/post';
import {IonicPage, NavController, NavParams, App, ActionSheetController, Content} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConsultationPage } from '../consultation/consultation';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-fiche-consultation',
  templateUrl: 'fiche-consultation.html',
})
export class FicheConsultationPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
    lieu= "";
    nom_medecin = "";
    particularite = "";
    cameraData: string;
    base64Image: string;
    cout: any;
    public selectcity: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider, private appCtrl: App, private camera: Camera,
    public actionSheetController: ActionSheetController) {


}


  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheConsultationPage');
  }
  ngOnInit() {
    this.content.resize();
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

      this.selectcity = JSON.parse(localStorage.getItem('patients'));
        let body = {
          patients_id: this.selectcity[0].id,
          lieu : this.lieu,
          nom_medecin: this.nom_medecin,
          particularite: this.particularite,
          cout: this.cout,
          image: this.cameraData,
          aksi: 'add_consult'
        };
          this.postPvdr.postData(body, 'consultPatient.php').subscribe(data => {
            this.appCtrl.getRootNav().setRoot(ConsultationPage);
        });
        console.log(body);
    }
}
