import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamenPage } from './examen';

@NgModule({
  declarations: [
    ExamenPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamenPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ExamenPageModule {}
