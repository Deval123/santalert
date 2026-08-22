import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheConsultationPage } from './fiche-consultation';

@NgModule({
  declarations: [
    FicheConsultationPage,
  ],
  imports: [
    IonicPageModule.forChild(FicheConsultationPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FicheConsultationPageModule {}
