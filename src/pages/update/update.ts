import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  user_id: number;
  user_name: string;
  phone_number: string;
  gender: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider, private appCtrl: App) {
  }

  ionViewDidLoad() {
    this.user_id = this.navParams.get('user_id');
    this.user_name = this.navParams.get('user_name');
    this.phone_number = this.navParams.get('phone_number');
    this.gender = this.navParams.get('gender');

  }

  update(){
    let body = {
      user_id : this.user_id,
      user_name : this.user_name,
      phone_number: this.phone_number,
      gender: this.gender,
     // images: this.cameraData,
      aksi: 'update_user'
    }
    this.postPvdr.postData(body, 'aksi_user.php').subscribe(data => {
        this.appCtrl.getRootNav().setRoot(DashboardPage);
      });
  }

}
