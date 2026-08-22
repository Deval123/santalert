import { PostProvider } from '../../providers/post/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

    user_name= "";
    phone_number = "";
    gender = "";
    cameraData: string;
    base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private postPvdr: PostProvider, private appCtrl: App, private camera: Camera,
      public actionSheetController: ActionSheetController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
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
      user_name : this.user_name,
      phone_number: this.phone_number,
      gender: this.gender,
      images: this.cameraData,
      aksi: 'add_user'
    }
    this.postPvdr.postData(body, 'aksi_user.php').subscribe(data => {
        this.appCtrl.getRootNav().setRoot(DashboardPage);
        console.log(data);
      });
  }
}
