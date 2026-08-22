import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultPage } from './consult';

@NgModule({
  declarations: [
    ConsultPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ConsultPageModule {}
