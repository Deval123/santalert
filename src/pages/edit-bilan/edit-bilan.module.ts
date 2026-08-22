import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBilanPage } from './edit-bilan';

@NgModule({
  declarations: [
    EditBilanPage,
  ],
  imports: [
    IonicPageModule.forChild(EditBilanPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditBilanPageModule {}
