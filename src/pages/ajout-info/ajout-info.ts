import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App, MenuController} from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import * as Enums from '../../enums/enums';
import {ConsultPage} from "../consult/consult";
import {HomePersonnelPage} from "../home-personnel/home-personnel";
import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {dateDataSortValue} from "ionic-angular/umd/util/datetime-util";
import {getSystemData} from "@ionic/app-scripts";
import {T} from "@angular/core/src/render3";

@IonicPage()
@Component({
  selector: 'page-ajout-info',
  templateUrl: 'ajout-info.html',
})
export class AjoutInfoPage {
//      id	hospitalisation_id
  @ViewChild("datedebut") datedebut;
  @ViewChild("datefin") datefin;
  @ViewChild("nature") nature;
  @ViewChild("lieu") lieu;
  @ViewChild("tiers") tiers;
  @ViewChild("patient") patient;
  @ViewChild("nommedecin") nommedecin;
  @ViewChild("date_entree") date_entree;
  @ViewChild("date_sortie") date_sortie;
  @ViewChild("causes") causes;
  @ViewChild("medecinTraitant") medecinTraitant;
  @ViewChild("recommandationsAlimentaire") recommandationsAlimentaire;
  @ViewChild("numeroChambre") numeroChambre;
  @ViewChild("numeroLit") numeroLit;
  @ViewChild("numeroDossier") numeroDossier;

  @ViewChild("symptome") symptome;
  @ViewChild("hopital") hopital;
  @ViewChild("diagnostique") diagnostique;
  @ViewChild("nom_medecin") nom_medecin;
  @ViewChild("image") image;
  @ViewChild("observation") observation;
  @ViewChild("cout") cout;
  @ViewChild("datecreate") datecreate;
  @ViewChild("nom") nom;
  @ViewChild("date_prescription") date_prescription;
  @ViewChild("date_reel") date_reel;
  @ViewChild("resultat") resultat;
  @ViewChild("patients_id") patients_id;
  @ViewChild("id") id;
  @ViewChild("mobile") mobile;
  items: string[];
  etablissements: any;
  consultation: any;
  anesthesie: any = "";
  soinsIntensifs: any= null;
  periode: any;
  particularites: any;
  autres: any = "";
  chirurgicale: any = "";
  urgences: any= null;
  hospitalisation: any;
  consult: any;
  typePerso: any;
  hosp: any="";
  hostpitalisation_id: any;
  public selectcity: any = [];
  constructor(public navCtrl: NavController, private menu: MenuController, public alertCtrl: AlertController,  private http: Http,
     public navParams: NavParams, private appCtrl: App, public loading: LoadingController/*,
      public norm: Normalize*/) {
    //this.initializeItems();
  }


  //id	patients_id	personelEts_id


  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionPatientPage');
    // Use the id to enable/disable the menus
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
  }

  ngOnInit(){
    this.consult = "consult";
    this.particularites = "";
    this.hospitalisation = "";
    this.id = this.navParams.get('id') ;
    this.etablissements = JSON.parse(localStorage.getItem('etablissement'));

  }

  autre(){
    window.localStorage.removeItem('patientsRecherche');
    this.appCtrl.getRootNav().setRoot(HomePersonnelPage);
  }

/*
  initializeItems(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });

    loader.present().then(() => {
      this.http.post('http://localhost/devdb/showPatients.php', options)
        //.map(res => res.json())
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

/!*  //items : {id:number, nom: string, password: string, telephone: string, email: string, prenom: string  };

 loader.dismiss();
           let alert = this.alertCtrl.create({
           title:"CONGRATS",
           subTitle:(res),
           buttons: ['OK']
           });
           alert.present(); //  this.navCtrl.push(SuiviPersoPage, data);
*!/

          //tous les patients, sont récupéré dans items
          this.items=res.server_response;
          localStorage.setItem('patients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }
*/


 /* initializeItems() {
    this.items = [
      //recupere les logins des patients sous forme de tableau ici
      'patient1',
      'patient2'
    ];
  }*/

/*
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       /!* if(item.nom.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1){
          return item.id;
        }*!/
        return (item.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);

      })
    }
  }
*/

/*  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
 //return (this.norm.normalize(item.toLowerCase()).indexOf(this.norm.normalize(val.toLowerCase())) >= 0);
 return (this.norm.normalize(item.toString().toLowerCase()).indexOf(this.norm.normalize(val.toString().toLowerCase())) >= 0);
      })
    }
  }*/

  add_consultation(){
    this.consult = "";
    if(this.datecreate.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"date du jour field is empty",
        buttons: ['OK']
      });

      alert.present();
      this.consult = "consult";
    }
    else
    if(this.nom_medecin.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"nom medecin field is empty",
        buttons: ['OK']
      });

      alert.present();
      this.consult = "consult";
    }
    else
    {


      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let data = {
        patients_id: this.navParams.get('id'),
        //patients_id: JSON.parse(localStorage.getItem('patients_id')),
        hopital: JSON.parse(localStorage.getItem('etablissement')),
        nom_medecin: this.nom_medecin.value,
        datecreate: this.datecreate.value,
        personel: JSON.parse(localStorage.getItem('personel')),

      };

      console.log(data);

      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertConsultationPersonelEts.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();

           this.consultation=res.consultation;
            localStorage.setItem('consultation', JSON.stringify(this.consultation));
            console.log(this.consultation);

            if(res.server_response=="Successfull"){
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




  add_hospitalisation(){

    if(this.symptome.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Symptome doit être rempli",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.medecinTraitant.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"le nom medecin du Traitant doit être rempli",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    if(this.date_entree.value=="" ){

      let alert = this.alertCtrl.create({

        title:"ATTENTION",
        subTitle:"Date d'entree doit être rempli",
        buttons: ['OK']
      });

      alert.present();
    }
    else
    {


      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let data = {
        patients_id: this.navParams.get('id'),
        hopital: JSON.parse(localStorage.getItem('etablissement')),
        date_entree: this.date_entree.value,
        personel: JSON.parse(localStorage.getItem('personel')),
        symptome: this.symptome.value,
        date_sortie: this.date_sortie.value,
        causes: this.causes.value,
        medecinTraitant: this.medecinTraitant.value,
        diagnostique: this.diagnostique.value,
        recommandationsAlimentaire: this.recommandationsAlimentaire.value,
        numeroChambre: this.numeroChambre.value,
        numeroLit: this.numeroLit.value,
        numeroDossier: this.numeroDossier.value,
        consultation: JSON.parse(localStorage.getItem('consultation'))

      };
      console.log(data);
      let loader = this.loading.create({
        content: 'Processing please wait...',
      });

      loader.present().then(() => {  ///JSON.stringify(res.url)  JSON.stringify(data)
        this.http.post(Enums.APIURL.URL1 +  '/' + "insertHospitalisationPersonelEts.php",data, options)
          .pipe(map((res: any) => res.json()))
          .subscribe(res => {
            loader.dismiss();
            if(res.server_response=="Successfull"){
              let alert = this.alertCtrl.create({
                title:"CONGRATS",
                subTitle:(res),
                buttons: ['OK']
              });
              alert.present();
              this.selectcity = res.resp;
              this.hostpitalisation_id = this.selectcity[0].id;
              console.log(this.hostpitalisation_id);
              localStorage.setItem('hostpitalisation_id', this.hostpitalisation_id);

              this.consult = "";
              this.particularites = "particularites";
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
              this.consult = "";
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

  /*show_consultationa(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });


    let data = {
      patients_id: this.navParams.get('id'),
      personel: JSON.parse(localStorage.getItem('personel'))
    };
    console.log(data);
    let loader = this.loading.create({
      content: 'Processing please wait...',
    });


    loader.present().then(() => {
      this.http.post('http://localhost/devdb/showConsulpers.php', data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          let alert = this.alertCtrl.create({
            title:"CONGRATS",
            subTitle:(res),
            buttons: ['OK']
          });
          alert.present();
          //tous les consult, sont récupéré dans items
          this.items=res.server_response;
          localStorage.setItem('patients', JSON.stringify(this.items));
          console.log(this.items);

        });

    });
  }*/

  show_consultation(){
    this.navCtrl.push(ConsultPage);
  }
   hospi(){
     this.consult = "";
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    let data = {
      patients_id: JSON.parse(localStorage.getItem('patients')).id,
      //patients_id: this.navParams.get('id'),

    };
    console.log(data);
    loader.present().then(() => {
      this.http.post(Enums.APIURL.URL1 +  '/' + 'showHospPatient.php',data, options)
        .pipe(map((res: any) => res.json()))
        .subscribe(res => {

          loader.dismiss();
          this.hosp=res.server_response;
          localStorage.setItem('hosp', JSON.stringify(this.hosp));
          console.log(this.hosp);

        });

    });
  }

  // @ts-ignore
  showOneExamen(item: T) {
    console.log('ionViewDidLoad GestionPatientPage');

  }

  formadd() {

  }
}
