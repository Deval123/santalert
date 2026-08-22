import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowLastAgendaPatientsPage } from './show-last-agenda-patients';

@NgModule({
  declarations: [
    ShowLastAgendaPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowLastAgendaPatientsPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowLastAgendaPatientsPageModule {}
