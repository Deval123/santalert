import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, App, ActionSheetController, Content} from 'ionic-angular';
import { PostProvider } from '../../providers/post/post';
import { ParametresPage } from '../parametres/parametres';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
    id: number;
    nom : string;
    sexe: string;
    password : string;
    telephone : string;
    telephone1 : string;
    email : string;
    email1 : string;
    prenom : string;
    anneeNais : string;
    lieuNais : string;
    profession : string;
    filename : string;
    lieuService : string;
    telBureau : string;
    residencePrincipal : string;
    residenceSecondaire : string;
    nomPere : string;
    telPere : string;
    emailPere : string;
    professionPere : string;
    quartierPere : string;
    ruePere : string;
    nomMere : string;
    telMere : string;
    emailMere : string;
    professionMere : string;
    quartierMere : string;
    rueMere : string;
    nomTuteur : string;
    telTuteur : string;
    emailTuteur : string;
    professionTuteur : string;
    quartierTuteur : string;
    rueTuteur : string;
    proche1 : string;
    tel_proche1 : string;
    emailProche1 : string;
    residenceProche1 : string;
    professionProche1 : string;
    proche2 : string;
    tel_proche2 : string;
    emailProche2 : string;
    residenceProche2 : string;
    professionProche2 : string;
    proche3 : string;
    tel_proche3 : string;
    emailProche3 : string;
    residenceProche3 : string;
    professionProche3 : string;
    groupeSanguin : string;
    allergie : string;
    incapacite : string;
    medecinFamille : string;
    assurance : string;
    rhesus : string;
    observationPhisyque : string;
    signeParticulier : string;
    cameraData: string;
    base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider, private appCtrl: App, private camera: Camera,
    public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.content.resize();
    this.id = this.navParams.get('id');
    this.nom = this.navParams.get('nom');
    this.sexe = this.navParams.get('sexe');
    this.telephone = this.navParams.get('telephone');
    this.telephone1 = this.navParams.get('telephone1');
    this.email = this.navParams.get('email');
    this.email1 = this.navParams.get('email1');
    this.prenom = this.navParams.get('prenom');
    this.anneeNais = this.navParams.get('anneeNais');
    this.lieuNais = this.navParams.get('lieuNais');
    this.profession = this.navParams.get('profession');
    this.filename = this.navParams.get('filename');
    this.lieuService = this.navParams.get('lieuService');
    this.telBureau = this.navParams.get('telBureau');
    this.residencePrincipal = this.navParams.get('residencePrincipal');
    this.residenceSecondaire = this.navParams.get('residenceSecondaire');
    this.nomPere = this.navParams.get('nomPere');
    this.telPere = this.navParams.get('telPere');
    this.emailPere = this.navParams.get('emailPere');
    this.professionPere = this.navParams.get('professionPere');
    this.quartierPere = this.navParams.get('quartierPere');
    this.ruePere = this.navParams.get('ruePere');
    this.nomMere = this.navParams.get('nomMere');
    this.telMere = this.navParams.get('telMere');
    this.emailMere = this.navParams.get('emailMere');
    this.professionMere = this.navParams.get('professionMere');
    this.quartierMere = this.navParams.get('quartierMere');
    this.rueMere = this.navParams.get('rueMere');
    this.nomTuteur = this.navParams.get('nomTuteur');
    this.telTuteur = this.navParams.get('telTuteur');
    this.emailTuteur = this.navParams.get('emailTuteur');
    this.professionTuteur = this.navParams.get('professionTuteur');
    this.quartierTuteur = this.navParams.get('quartierTuteur');
    this.rueTuteur = this.navParams.get('rueTuteur');
    this.proche1 = this.navParams.get('proche1');
    this.tel_proche1 = this.navParams.get('tel_proche1');
    this.emailProche1 = this.navParams.get('emailProche1');
    this.residenceProche1 = this.navParams.get('residenceProche1');
    this.professionProche1 = this.navParams.get('professionProche1');
    this.proche2 = this.navParams.get('proche2');
    this.tel_proche2 = this.navParams.get('tel_proche2');
    this.emailProche2 = this.navParams.get('emailProche2');
    this.residenceProche2 = this.navParams.get('residenceProche2');
    this.professionProche2 = this.navParams.get('professionProche2');
    this.proche3 = this.navParams.get('proche3');
    this.tel_proche3 = this.navParams.get('tel_proche3');
    this.emailProche3 = this.navParams.get('emailProche3');
    this.residenceProche3 = this.navParams.get('residenceProche3');
    this.professionProche3 = this.navParams.get('professionProche3');
    this.groupeSanguin = this.navParams.get('groupeSanguin');
    this.allergie = this.navParams.get('allergie');
    this.incapacite = this.navParams.get('incapacite');
    this.medecinFamille = this.navParams.get('medecinFamille');
    this.assurance = this.navParams.get('assurance');
    this.rhesus = this.navParams.get('rhesus');
    this.observationPhisyque = this.navParams.get('observationPhisyque');
    this.signeParticulier = this.navParams.get('signeParticulier');
  }

  update(){
    let body = {
      id : this.id,
      nom : this.nom,
      sexe : this.sexe,
      telephone : this.telephone,
      telephone1 : this.telephone1,
      email : this.email,
      email1 : this.email1,
      prenom : this.prenom,
      anneeNais : this.anneeNais,
      lieuNais : this.lieuNais,
      profession : this.profession,
      lieuService : this.lieuService,
      telBureau : this.telBureau,
      residencePrincipal : this.residencePrincipal,
      residenceSecondaire : this.residenceSecondaire,
      nomPere : this.nomPere,
      telPere : this.telPere,
      emailPere : this.emailPere,
      professionPere : this.professionPere,
      quartierPere : this.quartierPere,
      ruePere : this.ruePere,
      nomMere : this.nomMere,
      telMere : this.telMere,
      emailMere : this.emailMere,
      professionMere : this.professionMere,
      quartierMere : this.quartierMere,
      rueMere : this.rueMere,
      nomTuteur : this.nomTuteur,
      telTuteur : this.telTuteur,
      emailTuteur : this.emailTuteur,
      professionTuteur : this.professionTuteur,
      quartierTuteur : this.quartierTuteur,
      rueTuteur : this.rueTuteur,
      proche1 : this.proche1,
      tel_proche1 : this.tel_proche1,
      emailProche1 : this.emailProche1,
      residenceProche1 : this.residenceProche1,
      professionProche1 : this.professionProche1,
      proche2 : this.proche2,
      tel_proche2 : this.tel_proche2,
      emailProche2 : this.emailProche2,
      residenceProche2 : this.residenceProche2,
      professionProche2 : this.professionProche2,
      proche3 : this.proche3,
      tel_proche3 : this.tel_proche3,
      emailProche3 : this.emailProche3,
      residenceProche3 : this.residenceProche3,
      professionProche3 : this.professionProche3,
      groupeSanguin : this.groupeSanguin,
      allergie : this.allergie,
      incapacite : this.incapacite,
      medecinFamille : this.medecinFamille,
      assurance : this.assurance,
      rhesus : this.rhesus,
      observationPhisyque : this.observationPhisyque,
      signeParticulier : this.signeParticulier,
     filename : this.cameraData,
      aksi: 'update_patients'
    }
    console.log(body);
    this.postPvdr.postData(body, 'aksi_patient.php').subscribe(data => {
        this.appCtrl.getRootNav().setRoot(ParametresPage);
      });
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
  id : this.id,
  nom : this.nom,
  sexe : this.sexe,
  telephone : this.telephone,
  telephone1 : this.telephone1,
  email : this.email,
  email1 : this.email1,
  prenom : this.prenom,
  anneeNais : this.anneeNais,
  lieuNais : this.lieuNais,
  profession : this.profession,
  lieuService : this.lieuService,
  telBureau : this.telBureau,
  residencePrincipal : this.residencePrincipal,
  residenceSecondaire : this.residenceSecondaire,
  nomPere : this.nomPere,
  telPere : this.telPere,
  emailPere : this.emailPere,
  professionPere : this.professionPere,
  quartierPere : this.quartierPere,
  ruePere : this.ruePere,
  nomMere : this.nomMere,
  telMere : this.telMere,
  emailMere : this.emailMere,
  professionMere : this.professionMere,
  quartierMere : this.quartierMere,
  rueMere : this.rueMere,
  nomTuteur : this.nomTuteur,
  telTuteur : this.telTuteur,
  emailTuteur : this.emailTuteur,
  professionTuteur : this.professionTuteur,
  quartierTuteur : this.quartierTuteur,
  rueTuteur : this.rueTuteur,
  proche1 : this.proche1,
  tel_proche1 : this.tel_proche1,
  emailProche1 : this.emailProche1,
  residenceProche1 : this.residenceProche1,
  professionProche1 : this.professionProche1,
  proche2 : this.proche2,
  tel_proche2 : this.tel_proche2,
  emailProche2 : this.emailProche2,
  residenceProche2 : this.residenceProche2,
  professionProche2 : this.professionProche2,
  proche3 : this.proche3,
  tel_proche3 : this.tel_proche3,
  emailProche3 : this.emailProche3,
  residenceProche3 : this.residenceProche3,
  professionProche3 : this.professionProche3,
  groupeSanguin : this.groupeSanguin,
  allergie : this.allergie,
  incapacite : this.incapacite,
  medecinFamille : this.medecinFamille,
  assurance : this.assurance,
  rhesus : this.rhesus,
  observationPhisyque : this.observationPhisyque,
  signeParticulier : this.signeParticulier,
 // images: this.cameraData,
 filename : this.cameraData,
 aksi: 'add_patients'
}
this.postPvdr.postData(body, 'aksi_patient.php').subscribe(data => {
   this.appCtrl.getRootNav().setRoot(ParametresPage);
   console.log(data);
 });
}
}

