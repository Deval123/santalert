import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowOneParamRegimePage } from './show-one-param-regime';

@NgModule({
  declarations: [
    ShowOneParamRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowOneParamRegimePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowOneParamRegimePageModule {}
