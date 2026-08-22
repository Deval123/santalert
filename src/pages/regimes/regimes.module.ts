import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegimesPage } from './regimes';

@NgModule({
  declarations: [
    RegimesPage,
  ],
  imports: [
    IonicPageModule.forChild(RegimesPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegimesPageModule {}
