import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParametrePersonnelPage } from './parametre-personnel';

@NgModule({
  declarations: [
    ParametrePersonnelPage,
  ],
  imports: [
    IonicPageModule.forChild(ParametrePersonnelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ParametrePersonnelPageModule {}
