import {NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowOneRegimePage } from './show-one-regime';

@NgModule({
  declarations: [
    ShowOneRegimePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowOneRegimePage),
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ShowOneRegimePageModule {}
