import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacieLaboPage } from './pharmacie-labo';

@NgModule({
  declarations: [
    PharmacieLaboPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacieLaboPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PharmacieLaboPageModule {}
