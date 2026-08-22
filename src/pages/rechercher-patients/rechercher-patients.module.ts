import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechercherPatientsPage } from './rechercher-patients';

@NgModule({
  declarations: [
    RechercherPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(RechercherPatientsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RechercherPatientsPageModule {}
