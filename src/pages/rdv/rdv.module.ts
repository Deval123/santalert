import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RdvPage } from './rdv';

@NgModule({
  declarations: [
    RdvPage,
  ],
  imports: [
    IonicPageModule.forChild(RdvPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RdvPageModule {}
