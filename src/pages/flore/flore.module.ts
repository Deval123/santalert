import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlorePage } from './flore';

@NgModule({
  declarations: [
    FlorePage
  ],
  imports: [
    IonicPageModule.forChild(FlorePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FlorePageModule {}
