import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { PostProvider } from '../../providers/post/post';
import { UpdatePage } from '../update/update';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  users: any = [];
  server: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider, private appCtrl: App) {
      this.server = postPvdr.server;
  }

      ionViewDidLoad() {
          this.users = [];
          this.loaduser();
      }


  loaduser(){
    let body = {
      aksi: 'get_user'
    }
    this.postPvdr.postData(body, 'aksi_user.php').subscribe(data => {
       for(let user of data.result){
         this.users.push(user);
       }
      });
  }

  formadd(){
    this.navCtrl.push(CameraPage);
  }

  showData(id){
    console.log(id);
  }

  updateData(id, name, phone, gender){
    this.navCtrl.push(UpdatePage, {
      'user_id': id,
      'user_name': name,
      'phone_number': phone,
      'gender': gender
    });
    console.log(id);
  }

  deleteData(id){
    let body = {
      user_id : id,
      aksi: 'del_user'
    }
    this.postPvdr.postData(body, 'aksi_user.php').subscribe(data => {
        this.appCtrl.getRootNav().setRoot(DashboardPage);
      });
  }
}
