import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';

@NgModule({
  declarations: [
    ResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResultPageModule {}
