import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationPatientPage } from './creation-patient';

@NgModule({
  declarations: [
    CreationPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(CreationPatientPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CreationPatientPageModule {}
