import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalisationPage } from './hospitalisation';

@NgModule({
  declarations: [
    HospitalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalisationPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HospitalisationPageModule {}
