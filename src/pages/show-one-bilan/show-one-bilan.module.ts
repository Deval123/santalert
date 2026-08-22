import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowOneBilanPage } from './show-one-bilan';

@NgModule({
  declarations: [
    ShowOneBilanPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowOneBilanPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowOneBilanPageModule {}
