import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPersonelPage } from './edit-personel';

@NgModule({
  declarations: [
    EditPersonelPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPersonelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditPersonelPageModule {}
