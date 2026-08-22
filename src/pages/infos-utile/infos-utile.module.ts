import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfosUtilePage } from './infos-utile';

@NgModule({
  declarations: [
    InfosUtilePage,
  ],
  imports: [
    IonicPageModule.forChild(InfosUtilePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InfosUtilePageModule {}
