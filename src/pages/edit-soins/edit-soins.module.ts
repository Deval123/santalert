import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSoinsPage } from './edit-soins';

@NgModule({
  declarations: [
    EditSoinsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSoinsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditSoinsPageModule {}
