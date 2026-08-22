import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMaladieChroniquePage } from './edit-maladie-chronique';

@NgModule({
  declarations: [
    EditMaladieChroniquePage,
  ],
  imports: [
    IonicPageModule.forChild(EditMaladieChroniquePage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditMaladieChroniquePageModule {}
