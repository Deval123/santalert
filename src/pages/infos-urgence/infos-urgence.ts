import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  App,
  ActionSheetController,
  Content
} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Storage } from '@ionic/storage';
import * as Enums from '../../enums/enums';
import { map } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PostProvider } from '../../providers/post/post';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-infos-urgence',
  templateUrl: 'infos-urgence.html',
})
export class InfosUrgencePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  public selectcity: any = [];
  groupeSanguin= "";
  allergie = "";
  incapacite = "";
  medecinFamille= "";
  assurance = "";
  rhesus = "";
  observationPhisyque= "";
  signeParticulier = "";
  sexe = "";
    cameraData: string;
    base64Image: string;
  items:any;
  userProfile: any;
  maladie: any;
  infos: any;
  update: any;
  show: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http, public alertCtrl: AlertController,
              public loading: LoadingController, private storage: Storage,
              private postPvdr: PostProvider, private appCtrl: App, private camera: Camera,
      public actionSheetController: ActionSheetController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosUrgencePage');
  }

  ngOnInit(){
    this.content.resize();
    this.show = "show";
    this.update = "";
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));

    if(!this.userProfile) {
      //this.userProfile = this.navParams.get('userProfile') ;
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      let data = {
        patients: JSON.parse(localStorage.getItem('patients')),
      };
      console.log(data);
      loader.present().then(() => {
        this.http.post(Enums.APIURL.URL1 +  '/' + 'showInfosUrgentPatients.php',data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            this.items=res.infos;
            this.maladie=res.maladie;
            localStorage.setItem('infosUrgent', JSON.stringify(this.items));
            localStorage.setItem('maladie', JSON.stringify(this.maladie));
            console.log(this.maladie);
            console.log(this.items);

          });

      });
    }

  }

  Edit(){
    this.show = "";
    this.update = "update";
    //this.navCtrl.push(EditPatientsPage, item)

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
 };

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
 };

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
    id: this.selectcity[0].id,
    groupeSanguin : this.groupeSanguin,
    allergie: this.allergie,
    incapacite: this.incapacite,
    medecinFamille : this.medecinFamille,
    assurance: this.assurance,
    rhesus: this.rhesus,
    sexe: this.sexe,
    signeParticulier: this.signeParticulier,
    observationPhisyque: this.observationPhisyque,
    filename: this.cameraData,
    aksi: 'add_infos'
};
console.log(body);
this.postPvdr.postData(body, 'aksi_patient.php').subscribe(data => {
   this.appCtrl.getRootNav().setRoot(InfosUrgencePage);
   console.log(data);
 });
}
}





/*id
filename
dateCreate
residenceSecondaire
nomTuteur
telTuteur
emailTuteur
professionTuteur
quartierTuteur
rueTuteur
proche1
tel_proche1
emailProche1
residenceProche1
professionProche1
proche2
tel_proche2
emailProche2
residenceProche2
professionProche2
proche3
tel_proche3
emailProche3
residenceProche3
professionProche3
*/


/*id
patients_id
nom
medecin_traitant
restriction
recommandation
commentaire*/
