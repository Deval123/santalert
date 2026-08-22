import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParamRegimePage } from './param-regime';

@NgModule({
  declarations: [
    ParamRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(ParamRegimePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ParamRegimePageModule {}
