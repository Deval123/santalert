import {Component, ViewChild} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  App,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as Enums from "../../enums/enums";
import {map} from "rxjs/operators";
import {PostProvider} from "../../providers/post/post";
import {Camera} from "@ionic-native/camera";
import {HomePersonnelPage} from "../home-personnel/home-personnel";

/**
 * Generated class for the VisitePPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visite-p',
  templateUrl: 'visite-p.html',
})
export class VisitePPage {
  visite: any;
  private etablissements: any;
  private hospitalisation: string;
  private _id: any;
  private grossesses: any = [];
  private visites: any = []; //Une visite est une consultation
  consultation: any;
  @ViewChild("datecreate") datecreate;
  @ViewChild("nom_medecin") nom_medecin;
  @ViewChild("grossesses_id") grossesses_id;
  anesthesie: any = "";
  soinsIntensifs: any= null;
  periode: any;
  particularites: any;
  autres: any = "";
  chirurgicale: any = "";
  urgences: any= null;
  consult: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController
    , private appCtrl: App, private alertCtrl: AlertController, private http: Http,
              private postPvdr: PostProvider, private camera: Camera,
              public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitePPage');
    this.grossesses = [];
    this.loadGrossesse();
  }

  loadGrossesse() {
    let body = {
      aksi: 'get_grossesse'
    };
    this.postPvdr.postData(body, 'aksi_visite.php').subscribe(data => {
      for (let grossesse of data.result) {
        this.grossesses.push(grossesse);
      }
      console.log(this.grossesses);
    });
  }

  loadVisite() {
    let body = {
      patients_id: JSON.parse(localStorage.getItem('patients')).id,
      aksi: 'get_visite_consult' //Une visite est une consultation
    };
    console.log(body);

    this.postPvdr.postData(body, 'aksi_visite.php').subscribe(data => {
      for (let v of data.result) {
        this.visites.push(v);
      }
      console.log(this.visites);
    });
  }

  ngOnInit() {
    this.visite = "visite";
    this.particularites = "";
    this.hospitalisation = "";
    this._id = this.navParams.get('id');
    this.etablissements = JSON.parse(localStorage.getItem('etablissement'));
    this.visites = [];
    this.loadVisite();

  }

  add_grossesse() {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
/////////patients_id	datecreate	date_debut	rang	date_accouchement	note	type_accouchement	verdict	observation
    let alert = this.alertCtrl.create({
      title: 'Ajout de grossesse',
      inputs: [
        {
          name: 'nom_medecin',
          placeholder: 'nom medecin',
          type: 'text',
        },
        {
          name: 'rang',
          placeholder: 'quantième grossesse ?',
          type: 'number',
        },
        {
          name: 'date_debut',
          placeholder: 'Date conception',
          type: 'date',
        },
        {
          name: 'date_accouchement',
          placeholder: 'Date probable accouchement',
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
              patients_id: JSON.parse(localStorage.getItem('patients')).id,
              nom_medecin: data.nom_medecin,
              rang: data.rang,
              date_debut: data.date_debut,
              date_accouchement: data.date_accouchement,
              nom_hopital: JSON.parse(localStorage.getItem('etablissement'))[0].nom
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
              this.http.post(Enums.APIURL.URL1 + '/' + "insertGrossesse.php", data1, options)
                .pipe(map((res: any) => res.json()))
                .subscribe(res => {
                  loader.dismiss();
                  if (res == "Successfull") {
                    let alert = this.alertCtrl.create({
                      title: "CONGRATS",
                      subTitle: (res),
                      buttons: ['OK']
                    });

                    alert.present();
                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    this.grossesses = [];
                    this.loadGrossesse();
                  } else {
                    let alert = this.alertCtrl.create({
                      title: "ERROR",
                      subTitle: (res),
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


  add_visite() {
    this.visite = "";
    if (this.datecreate.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "date du jour field is empty",
        buttons: ['OK']
      });

      alert.present();
      this.visite = "visite";
    } else if (this.nom_medecin.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "nom medecin field is empty",
        buttons: ['OK']
      });

      alert.present();
      this.visite = "visite";
    } else if (this.grossesses_id.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "rang grossesse field is empty",
        buttons: ['OK']
      });

      alert.present();
      this.visite = "visite";
    } else {


      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({headers: headers});
      let data = {
        //patients_id: this.navParams.get('id'),
        patients_id: JSON.parse(localStorage.getItem('patients')).id,
        hopital: JSON.parse(localStorage.getItem('etablissement'))[0].id,
        nom_medecin: this.nom_medecin.value,
        datecreate: this.datecreate.value,
        grossesses_id: this.grossesses_id.value,
        personelEts_id: JSON.parse(localStorage.getItem('personel'))[0].id,

      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });
      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 + '/' + "insertConsultationPersonelEtsMereEnf.php", data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();

            this.consultation = res.consultation;
            localStorage.setItem('consultation', JSON.stringify(this.consultation));
            console.log(this.consultation);

            if (res.server_response == "Successfull") {
              let alert = this.alertCtrl.create({
                title: "CONGRATS",
                subTitle: (res),
                buttons: ['OK']
              });

              alert.present();
              //this.navCtrl.setRoot(AdminPage);
              this.visites = [];
              this.loadVisite();
            } else {
              let alert = this.alertCtrl.create({
                title: "ERROR",
                subTitle: (res),
                buttons: ['OK']
              });

              alert.present();
            }
          });
      });
    }

  }

  list_grossesse() {

  }


  add_param() {
    let alert = this.alertCtrl.create({
      title: 'Paramètre',
      inputs: [
        {
          name: 'datecreate',
          type: 'datetime-local',
          placeholder: 'Date du jour'
        },
        {
          name: 'ta',
          placeholder: 'Tension artériel',
          type: 'float'
        },
        {
          name: 'db',
          placeholder: 'DB',
          type: 'float'
        },
        {
          name: 'poids',
          placeholder: 'Poids',
          type: 'float'
        },
        {
          name: 'bg',
          placeholder: 'DG',
          type: 'float'
        },
        {
          name: 'pouls',
          placeholder: 'Pouls',
          type: 'float'
        },
        {
          name: 'taille',
          placeholder: 'Taille',
          type: 'float'
        },
        {
          name: 'ddr',
          placeholder: 'DDR',
          type: 'float'
        },
        {
          name: 'dpa',
          placeholder: 'DPA',
          type: 'float'
        },
        {
          name: 'tension',
          placeholder: 'Tension',
          type: 'float'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
///id		datecreate	ta	db	bg	pouls	taille	ddr	dpa	tension
            let data1 = {
              ta: data.ta,
              datecreate: data.datecreate,
              db: data.db,
              bg: data.bg,
              pouls: data.pouls,
              taille: data.taille,
              ddr: data.ddr,
              dpa: data.dpa,
              poids: data.poids,
              tension: data.tension,
              consultation: JSON.parse(localStorage.getItem('consultation')),
              personel: JSON.parse(localStorage.getItem('personel'))
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertParametres.php",data1, options)
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

  onChange($event){
    if($event == "Anesthésie"){
      let alert = this.alertCtrl.create({
        title: 'type d\'anesthésie'
      });
      alert.addInput({
        type:'radio',
        label:'Anesthésie Local',
        value:'Anesthésie Local',
        name: 'anesthesie'
      });
      alert.addInput({
        type:'radio',
        label:'Anesthésie générale',
        value:'Anesthésie générale',
        name: 'anesthesie'
      });
      alert.addButton({
        text: 'Okay',
        handler: data  => {
          console.log('Confirm Ok');
          this.anesthesie = data.valueOf();
        }
      });
      alert.present();
    }
    else
    if($event == "Chirurgicale"){
      let alert = this.alertCtrl.create({
        title: 'Veuillez décrire la nature de la nature'
      });
      alert.addInput({
        type:'text',
        label:'Période',
        value:'',
        name:'chirurgicale'
      });
      alert.addButton({
        text: 'Okay',
        cssClass: 'secondary',
        handler: data  => {
          console.log('Confirm Ok');
          this.chirurgicale = data.chirurgicale;
        }
      });
      alert.present();

    }

    if($event == "Soins Intensifs"){
      let alert = this.alertCtrl.create({
        title: 'Période soins intensifs'
      });
      alert.addInput({
        type:'datetime-local',
        label:'Période',
        value:'periode',
        name: 'periode'
      });
      alert.addButton({
        text: 'Okay',
        handler: data  => {
          console.log('Confirm Ok');
          this.soinsIntensifs = data.periode;
        }
      });
      alert.present();

    }
    else if($event == "Urgences"){
      let alert = this.alertCtrl.create({
        title: 'Période Urgences'
      });
      alert.addInput({
        type:'datetime-local',
        label:'Période',
        value:'periode',
        name: 'periode'
      });
      alert.addButton({
        text: 'Okay',
        cssClass: 'secondary',
        handler: data  => {
          console.log('Confirm Ok');
          this.urgences = data.periode;
        }
      });
      alert.present();

    }
    else if($event == "Autres"){
      let alert = this.alertCtrl.create({
        title: 'Veuillez décrire la nature de la paticularité'
      });
      alert.addInput({
        type:'text',
        label:'Période',
        value:'',
        name:'autres'
      });
      alert.addButton({
        text: 'Okay',
        cssClass: 'secondary',
        handler: data  => {
          console.log('Confirm Ok');
          this.autres = data.autres;
        }
      });
      alert.present();

    }
  }

  add_auscultation() {
    let alert = this.alertCtrl.create({
      title: 'Auscultation',
      inputs: [

        {
          name: 'contenu',
          placeholder: 'Contenu',
          type: 'text'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data1 = {
              contenu: data.contenu,
              consultation: JSON.parse(localStorage.getItem('consultation')),
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertAuscultation.php",data1, options)
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
                      cssClass:'alert-success',
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

  add_ordonance() {
    let alert = this.alertCtrl.create({
      title: 'Ordonance',
      inputs: [

        {
          name: 'contenu',
          placeholder: 'Contenu',
          type: 'text'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data1 = {
              contenu: data.contenu,
              consultation: JSON.parse(localStorage.getItem('consultation')),
              personel: JSON.parse(localStorage.getItem('personel'))
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertOrdonance.php",data1, options)
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

  add_examen() {
    let alert = this.alertCtrl.create({
      title: 'Examen',
      inputs: [

        {
          name: 'contenu',
          placeholder: 'Contenu Examen',
          type: 'text'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data1 = {
              contenu: data.contenu,
              consultation: JSON.parse(localStorage.getItem('consultation')),
              personel: JSON.parse(localStorage.getItem('personel'))
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertExamenPersonelEts.php",data1, options)
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

  addRdv() {
    let alert = this.alertCtrl.create({
      title: 'Rendez-vous',
      inputs: [

        {
          name: 'datedebut',
          placeholder: 'Date et heure du jour',
          type: 'datetime-local'
        },
        {
          name: 'datefin',
          placeholder: 'Date et heure du rendez-vous',
          type: 'datetime-local'
        },
        {
          name: 'nommedecin',
          placeholder: 'Nom du médecin',
          type: 'text'
        },
        {
          name: 'nature',
          placeholder: 'Nature',
          type: 'text'
        },
        {
          name: 'lieu',
          placeholder: 'Lieu du rendez-vous',
          type: 'text'
        },
        {
          name: 'observation',
          placeholder: 'Observation',
          type: 'text'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data1 = {
              patients_id: this.navParams.get('id'),
              datedebut: data.datedebut,
              datefin: data.datefin,
              nature: data.nature,
              lieu: data.lieu,
              observation: data.observation,
              consultation: JSON.parse(localStorage.getItem('consultation')),
              personel: JSON.parse(localStorage.getItem('personel'))
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertRdvConsult.php",data1, options)
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

  add_particularites(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });


    let data = {
      chirurgicale: this.chirurgicale,
      anesthesie: this.anesthesie,
      soinsIntensifs: this.soinsIntensifs,
      urgences: this.urgences,
      autres: this.autres,
      hospitalisation_id: JSON.parse(localStorage.getItem('hostpitalisation_id')),

    };
    console.log(data);
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
      this.http.post(Enums.APIURL.URL1 +  '/' + "insertParticularites.php",data, options)
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
            this.visite = "";
            this.particularites = "";
            this.hospitalisation = "hospitalisation";
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
  add_traitement() {
    let alert = this.alertCtrl.create({
      title: 'Traitement',
      inputs: [
        {
          name: 'datecreate',
          placeholder: 'Date du jour',
          type: 'datetime-local'
        },
        {
          name: 'contenu',
          placeholder: 'Contenu Traitement',
          type: 'text'
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
          text: 'Save',
          handler: data => {//data.username

            console.log(data);

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ headers: headers });
            let data1 = {
              contenu: data.contenu,
              datecreate: data.datecreate,
              personel: JSON.parse(localStorage.getItem('personel')),
              hospitalisation_id: JSON.parse(localStorage.getItem('hostpitalisation_id')),
            };
            console.log(data1);

            let loader = this.loading.create({
              content: 'Processing please wait...',
            });

            loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
              this.http.post(Enums.APIURL.URL1 +  '/' + "insertTraitement.php",data1, options)
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

  showOneExamen(item) {

  }
}
