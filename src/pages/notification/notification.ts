import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, AlertController, Content} from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  @ViewChild(Content) content: Content;
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
  userProfile: any;
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {

    this.notifyTime = moment(new Date()).format();

    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      {title: 'Monday', dayCode: 1, checked: false},
      {title: 'Tuesday', dayCode: 2, checked: false},
      {title: 'Wednesday', dayCode: 3, checked: false},
      {title: 'Thursday', dayCode: 4, checked: false},
      {title: 'Friday', dayCode: 5, checked: false},
      {title: 'Saturday', dayCode: 6, checked: false},
      {title: 'Sunday', dayCode: 0, checked: false}
    ];

  }
/*  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);




    this.platform.ready().then((rdy)=>{
      this.localNotifications.on('click').subscribe(notification => {
        let json = JSON.parse(notification.data);

        let alert = this.alertCtrl.create({
          title:notification.title,
          subTitle:json.mydata
        });
        alert.present();
      });
    });


/!*
    this.localNotifications.requestPermission().then((permission) => {

 this.localNotifications.schedule({
 text: 'Delayed ILocalNotification',
 trigger: {at: new Date(new Date().getTime() + 3600)},
 led: 'FF0000',
 sound: null
 });
      this.localNotifications.schedule({
        text: 'Delayed ILocalNotification',
        at: date,
        led: 'FF0000',
        sound: this.setSound()
      });
      let alert = this.alertCtrl.create({
        title: 'Congratulation!',
        subTitle: 'Notification setup successfully at '+date,
        buttons: ['OK']
      });
      alert.present();
      this.data = { title:'', description:'', date:'', time:'' };
    });
*!/
  }

 setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Kerozen_Victoire.mp3'
    } else {
      return 'file://assets/sounds/BEN DECCA_Aimer.mp3'
    }
  }*/

  ionViewDidLoad(){
    this.platform.ready().then(() => {
      console.log("-----------------in view did load-------------------");
      this.localNotifications.hasPermission().then(function(granted) {
        if (!granted) {
          this.localNotifications.registerPermission();
        }
      });
    });
  }


  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Kerozen_Victoire.mp3'
    } else {
      return 'file://assets/sounds/BEN DECCA _Aimer.mp3'
    }
  }

  addNotifications(){

    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    for(let day of this.days){

      if(day.checked){

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if(dayDifference < 0){
          dayDifference = dayDifference + 7; // for cases where the day is in the following week
        }

        firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        firstNotificationTime.setHours(this.chosenHours);
        firstNotificationTime.setMinutes(this.chosenMinutes);

        let notification = {
          id: day.dayCode,
          title: 'Hey!',
          text: 'You just got notified :)',
          at: firstNotificationTime,
          every: 'week',
          led: 'FF0000',
          sound: this.setSound()
        };

        this.notifications.push(notification);

      }

    }

    console.log("Notifications to be scheduled: ", this.notifications);

    if(this.platform.is('cordova')){

      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {

        // Schedule the new notifications
        this.localNotifications.schedule(this.notifications);

        this.notifications = [];

        let alert = this.alertCtrl.create({
          title: 'Notifications set',
          buttons: ['Ok']
        });

        alert.present();

      });

    }

  }

  cancelAll(){

    this.localNotifications.cancelAll();

    let alert = this.alertCtrl.create({
      title: 'Notifications cancelled',
      buttons: ['Ok']
    });

    alert.present();

  }

  ngOnInit(){
    this.content.resize();
  }
}
