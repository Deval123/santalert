import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRegimePage } from './edit-regime';

@NgModule({
  declarations: [
    EditRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(EditRegimePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditRegimePageModule {}
