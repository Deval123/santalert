import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  NavParams,
  LoadingController,
  App,
  ActionSheetController,
  Content
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { PostProvider } from '../../providers/post/post';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";


@IonicPage()
@Component({
  selector: 'page-parametres',
  templateUrl: 'parametres.html',
})
export class ParametresPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  users: any = [];
  server: string;
  public selectcity: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private storage: Storage, private postPvdr: PostProvider, private appCtrl: App,) {

                this.server = postPvdr.server;
  }

  ionViewDidLoad() {
    this.users = [];
    this.loaduser();
  }


  loaduser(){
    this.selectcity = JSON.parse(localStorage.getItem('patients'));
    let body = {
      patients_id: this.selectcity[0].id,
      aksi: 'get_patients'
    }
    console.log(body);
    this.postPvdr.postData(body, 'aksi_patient.php').subscribe(data => {
       for(let user of data.result){
         this.users.push(user);
       }
      });
  }


formadd(){
  this.navCtrl.push(UpdateProfilePage);
}

showData(id){
  console.log(id);
}

updateData(id, nom, telephone, sexe,  telephone1, email, email1, prenom, anneeNais,
  lieuNais, profession, filename, lieuService, telBureau, residencePrincipal,
  residenceSecondaire, nomPere, telPere, emailPere, professionPere, quartierPere,
  ruePere, nomMere, telMere, emailMere, professionMere, quartierMere, rueMere,
  nomTuteur, telTuteur, emailTuteur, professionTuteur, quartierTuteur, rueTuteur,
  proche1, tel_proche1, emailProche1, residenceProche1, professionProche1, proche2,
  tel_proche2, emailProche2, residenceProche2, professionProche2, proche3, tel_proche3,
  emailProche3, residenceProche3, professionProche3, groupeSanguin, allergie, incapacite,
  medecinFamille, assurance, rhesus, observationPhisyque, signeParticulier){
  this.navCtrl.push(UpdateProfilePage, {

    'id' : id,
    'nom' : nom,
    'sexe' : sexe,
    'telephone' : telephone,
    'telephone1' : telephone1,
    'email' : email,
    'email1' : email1,
    'prenom' : prenom,
    'anneeNais' : anneeNais,
    'lieuNais' : lieuNais,
    'profession' : profession,
    'filename' : filename,
    'lieuService' : lieuService,
    'telBureau' : telBureau,
    'residencePrincipal' : residencePrincipal,
    'residenceSecondaire' : residenceSecondaire,
    'nomPere' : nomPere,
    'telPere' : telPere,
    'emailPere' : emailPere,
    'professionPere' : professionPere,
    'quartierPere' : quartierPere,
    'ruePere' : ruePere,
    'nomMere' : nomMere,
    'telMere' : telMere,
    'emailMere' : emailMere,
    'professionMere' : professionMere,
    'quartierMere' : quartierMere,
    'rueMere' : rueMere,
    'nomTuteur' : nomTuteur,
    'telTuteur' : telTuteur,
    'emailTuteur' : emailTuteur,
    'professionTuteur' : professionTuteur,
    'quartierTuteur' : quartierTuteur,
    'rueTuteur' : rueTuteur,
    'proche1' : proche1,
    'tel_proche1' : tel_proche1,
    'emailProche1' : emailProche1,
    'residenceProche1' : residenceProche1,
    'professionProche1' : professionProche1,
    'proche2' : proche2,
    'tel_proche2' : tel_proche2,
    'emailProche2' : emailProche2,
    'residenceProche2' : residenceProche2,
    'professionProche2' : professionProche2,
    'proche3' : proche3,
    'tel_proche3' : tel_proche3,
    'emailProche3' : emailProche3,
    'residenceProche3' : residenceProche3,
    'professionProche3' : professionProche3,
    'groupeSanguin' : groupeSanguin,
    'allergie' : allergie,
    'incapacite' : incapacite,
    'medecinFamille' : medecinFamille,
    'assurance' : assurance,
    'rhesus' : rhesus,
    'observationPhisyque' : observationPhisyque,
    'signeParticulier' : signeParticulier,
  });
  console.log(id);
}

deleteData(id){
  let body = {
    user_id : id,
    aksi: 'del_user'
  }
  this.postPvdr.postData(body, 'aksi_user.php').subscribe(data => {
      this.appCtrl.getRootNav().setRoot(ParametresPage);
    });
}

  ngOnInit() {
    this.content.resize();
  }

}
