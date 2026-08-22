import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutRegimesPage } from './ajout-regimes';

@NgModule({
  declarations: [
    AjoutRegimesPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutRegimesPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AjoutRegimesPageModule {}
