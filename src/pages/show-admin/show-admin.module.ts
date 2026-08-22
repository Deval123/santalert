import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAdminPage } from './show-admin';

@NgModule({
  declarations: [
    ShowAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAdminPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShowAdminPageModule {}
