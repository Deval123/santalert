import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPatientsPage } from './edit-patients';

@NgModule({
  declarations: [
    EditPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPatientsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditPatientsPageModule {}
