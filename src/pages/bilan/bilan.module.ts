import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilanPage } from './bilan';

@NgModule({
  declarations: [
    BilanPage,
  ],
  imports: [
    IonicPageModule.forChild(BilanPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BilanPageModule {}
