import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAgendaPatientsPage } from './edit-agenda-patients';

@NgModule({
  declarations: [
    EditAgendaPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAgendaPatientsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditAgendaPatientsPageModule {}
