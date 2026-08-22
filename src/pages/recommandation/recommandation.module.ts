import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommandationPage } from './recommandation';

@NgModule({
  declarations: [
    RecommandationPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommandationPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecommandationPageModule {}
