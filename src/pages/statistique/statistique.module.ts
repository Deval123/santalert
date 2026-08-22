import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatistiquePage } from './statistique';

@NgModule({
  declarations: [
    StatistiquePage,
  ],
  imports: [
    IonicPageModule.forChild(StatistiquePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StatistiquePageModule {}
