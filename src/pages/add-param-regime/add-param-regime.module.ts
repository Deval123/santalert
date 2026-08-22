import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddParamRegimePage } from './add-param-regime';

@NgModule({
  declarations: [
    AddParamRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(AddParamRegimePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddParamRegimePageModule {}
