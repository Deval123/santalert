import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfosUrgencePage } from './infos-urgence';

@NgModule({
  declarations: [
    InfosUrgencePage,
  ],
  imports: [
    IonicPageModule.forChild(InfosUrgencePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InfosUrgencePageModule {}
