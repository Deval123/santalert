import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfosGeneralPatientPage } from './infos-general-patient';

@NgModule({
  declarations: [
    InfosGeneralPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(InfosGeneralPatientPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InfosGeneralPatientPageModule {}
