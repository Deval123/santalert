import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParametresPage } from './parametres';

@NgModule({
  declarations: [
    ParametresPage,
  ],
  imports: [
    IonicPageModule.forChild(ParametresPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ParametresPageModule {}
