import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutBilanPage } from './ajout-bilan';

@NgModule({
  declarations: [
    AjoutBilanPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutBilanPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AjoutBilanPageModule {}
