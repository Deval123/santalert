import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditParamRegimePage } from './edit-param-regime';

@NgModule({
  declarations: [
    EditParamRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(EditParamRegimePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditParamRegimePageModule {}
