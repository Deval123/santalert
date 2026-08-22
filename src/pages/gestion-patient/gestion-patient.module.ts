import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionPatientPage } from './gestion-patient';

@NgModule({
  declarations: [
    GestionPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionPatientPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GestionPatientPageModule {}
