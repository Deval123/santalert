import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowOneSoinsPage } from './show-one-soins';

@NgModule({
  declarations: [
    ShowOneSoinsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowOneSoinsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowOneSoinsPageModule {}
