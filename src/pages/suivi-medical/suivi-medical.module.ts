import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuiviMedicalPage } from './suivi-medical';

@NgModule({
  declarations: [
    SuiviMedicalPage,
  ],
  imports: [
    IonicPageModule.forChild(SuiviMedicalPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SuiviMedicalPageModule {}
