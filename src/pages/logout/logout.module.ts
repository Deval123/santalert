import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPage } from './logout';

@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LogoutPageModule {}
