import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutAgendaPage } from './ajout-agenda';

@NgModule({
  declarations: [
    AjoutAgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutAgendaPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AjoutAgendaPageModule {}
