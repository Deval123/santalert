import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaladieChroniquePage } from './maladie-chronique';

@NgModule({
  declarations: [
    MaladieChroniquePage,
  ],
  imports: [
    IonicPageModule.forChild(MaladieChroniquePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MaladieChroniquePageModule {}
