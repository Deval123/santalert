import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultationPage } from './consultation';

@NgModule({
  declarations: [
    ConsultationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultationPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ConsultationPageModule {}
