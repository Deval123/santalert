import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnfMerePage } from './enf-mere';

@NgModule({
  declarations: [
    EnfMerePage,
  ],
  imports: [
    IonicPageModule.forChild(EnfMerePage),
  ],  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class EnfMerePageModule {}
