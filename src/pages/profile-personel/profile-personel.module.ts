import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePersonelPage } from './profile-personel';

@NgModule({
  declarations: [
    ProfilePersonelPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePersonelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfilePersonelPageModule {}
