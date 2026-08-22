import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutAgendaPersonelPage } from './ajout-agenda-personel';

@NgModule({
  declarations: [
    AjoutAgendaPersonelPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutAgendaPersonelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AjoutAgendaPersonelPageModule {}
