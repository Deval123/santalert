import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPersonnelPage } from './agenda-personnel';

@NgModule({
  declarations: [
    AgendaPersonnelPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPersonnelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AgendaPersonnelPageModule {}
