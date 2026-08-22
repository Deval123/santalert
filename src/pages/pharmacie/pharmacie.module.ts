import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmaciePage } from './pharmacie';

@NgModule({
  declarations: [
    PharmaciePage,
  ],
  imports: [
    IonicPageModule.forChild(PharmaciePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PharmaciePageModule {}
