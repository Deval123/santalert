import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfosConsulPrescripteurPage } from './infos-consul-prescripteur';

@NgModule({
  declarations: [
    InfosConsulPrescripteurPage,
  ],
  imports: [
    IonicPageModule.forChild(InfosConsulPrescripteurPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InfosConsulPrescripteurPageModule {}
